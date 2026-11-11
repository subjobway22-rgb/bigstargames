// Shared helpers for the pixelfx tooling in this repo.
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const VENDOR = join(REPO, 'third_party', 'pixelfx');
export const LOCK_FILE = join(REPO, 'third_party', 'pixelfx.lock.json');
export const MANIFEST = join(VENDOR, 'MANIFEST.sha256');
export const CUSTOM_DIR = join(REPO, 'fx', 'custom');
export const OUT_DIR = join(REPO, 'art', 'fx');
export const PRESETS_FILE = join(REPO, 'scripts', 'fx', 'presets.json');

export const readLock = () => JSON.parse(readFileSync(LOCK_FILE, 'utf8'));
export const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
export const lib = () => import(pathToFileURL(join(VENDOR, 'tools', 'lib', 'fxlib.mjs')).href);
export const core = () => import(pathToFileURL(join(VENDOR, 'src', 'core', 'index.js')).href);

/** Files under dir (posix relative paths), skipping names in `skip` (.git, node_modules by default). */
export function walk(dir, skip = ['.git', 'node_modules'], base = dir) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    if (skip.includes(name)) continue;
    const p = join(dir, name), st = lstatSync(p);
    if (st.isSymbolicLink()) continue;
    if (st.isDirectory()) out.push(...walk(p, skip, base));
    else out.push(p.slice(base.length + 1).split('\\').join('/'));
  }
  return out;
}

// The Patch Pixel typeface is (c) Patch and is NOT MIT-licensed. This repo must never contain or use it.
export const FONT_FILE = /\.(woff2?|ttf|otf|eot)$/i;
export const PATCH_PIXEL = /patch[-_ ]?pixel/i;

export function parseArgs(argv) {
  const pos = [], flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      if (i + 1 < argv.length && !argv[i + 1].startsWith('--') && !['dry', 'all', 'act', 'custom', 'gif', 'force', 'quiet'].includes(k)) flags[k] = argv[++i];
      else flags[k] = true;
    } else pos.push(a);
  }
  return { pos, flags };
}
