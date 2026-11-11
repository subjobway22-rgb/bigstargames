#!/usr/bin/env node
// Download pixelfx at the PINNED commit from third_party/pixelfx.lock.json and vendor the files we use into
// third_party/pixelfx (plus MANIFEST.sha256). Refuses anything that is not exactly the pinned commit.
//
//   npm run fx:fetch                         re-vendor the pinned version (use this to repair a modified copy)
//   npm run fx:fetch -- --update <sha> --version 0.4.0     move the pin (review the diff afterwards!)
//
// Never copies gallery/ (it holds the Patch Pixel font, which is not MIT) or any font file.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, mkdirSync, cpSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { REPO, VENDOR, LOCK_FILE, MANIFEST, readLock, sha256, walk, parseArgs, FONT_FILE, PATCH_PIXEL } from './common.mjs';

const { flags } = parseArgs(process.argv.slice(2));
let lock = readLock();
if (flags.update) {
  if (!/^[0-9a-f]{40}$/.test(flags.update) || !flags.version) { console.error('usage: --update <40-hex commit> --version <x.y.z>'); process.exit(1); }
  lock = { ...lock, commit: flags.update, version: flags.version };
}
const git = (cwd, ...a) => execFileSync('git', a, { cwd, encoding: 'utf8', env: { ...process.env, GIT_LFS_SKIP_SMUDGE: '1' }, stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const tmp = mkdtempSync(join(tmpdir(), 'pixelfx-'));
try {
  console.log(`fetching ${lock.repository} @ ${lock.commit} ...`);
  git(tmp, 'init', '-q');
  git(tmp, 'remote', 'add', 'origin', lock.repository);
  git(tmp, 'fetch', '-q', '--depth', '1', 'origin', lock.commit);
  git(tmp, 'checkout', '-q', 'FETCH_HEAD');
  const head = git(tmp, 'rev-parse', 'HEAD');
  if (head !== lock.commit) throw new Error(`pinned ${lock.commit} but got ${head}`);
  const pkg = JSON.parse(readFileSync(join(tmp, 'package.json'), 'utf8'));
  if (pkg.version !== lock.version) throw new Error(`lock says version ${lock.version} but upstream package.json says ${pkg.version}`);
  const lic = readFileSync(join(tmp, 'LICENSE'), 'utf8');
  if (!/^MIT License/m.test(lic)) throw new Error('upstream LICENSE is not MIT: stop and review');

  if (flags.dry) { console.log('dry run OK (commit, version and license verified)'); process.exit(0); }
  rmSync(VENDOR, { recursive: true, force: true });
  mkdirSync(VENDOR, { recursive: true });
  const skip = new Set(lock.exclude);
  for (const item of lock.include) {
    cpSync(join(tmp, item), join(VENDOR, item), {
      recursive: true,
      filter: (src) => {
        const rel = src.slice(tmp.length + 1).split('\\').join('/');
        return !skip.has(rel) && !FONT_FILE.test(rel) && !PATCH_PIXEL.test(rel);
      },
    });
  }
  // keep upstream's skill text for reference, OUTSIDE .claude/skills so it is not loaded twice
  mkdirSync(join(VENDOR, 'upstream'), { recursive: true });
  cpSync(join(tmp, lock.upstreamSkill), join(VENDOR, 'upstream', 'SKILL.md'));

  // hard safety net: no font file, nothing named Patch Pixel, nothing that loads the font
  const files = walk(VENDOR).filter((f) => f !== 'MANIFEST.sha256');
  const bad = files.filter((f) => FONT_FILE.test(f) || PATCH_PIXEL.test(f) || f.startsWith('gallery/'));
  const loads = files.filter((f) => /\.(m?js|css|html)$/.test(f) && PATCH_PIXEL.test(readFileSync(join(VENDOR, f), 'utf8')));
  if (bad.length || loads.length) throw new Error('forbidden font content found: ' + [...bad, ...loads].join(', '));

  writeFileSync(MANIFEST, files.map((f) => `${sha256(readFileSync(join(VENDOR, f)))}  ${f}`).join('\n') + '\n');
  if (flags.update) writeFileSync(LOCK_FILE, JSON.stringify(lock, null, 2) + '\n');
  console.log(`vendored ${files.length} files of pixelfx ${lock.version} (${lock.commit.slice(0, 7)}) -> third_party/pixelfx`);
  console.log('next: npm run fx:verify');
} catch (e) {
  console.error('fx:fetch failed: ' + (e.stderr?.toString() || e.message));
  process.exitCode = 1;
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
