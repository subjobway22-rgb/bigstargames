#!/usr/bin/env node
// Run pixelfx's quality checker (spills, seams, unseeded randomness, slow frames).
// Built-in effects: checked in place. Custom effects (fx/custom): mirrored into a throw-away copy of the vendored
// tree so third_party/ is never touched.   npm run fx:check -- [ids...] [--custom]
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { VENDOR, CUSTOM_DIR, walk, parseArgs } from './common.mjs';
const { pos, flags } = parseArgs(process.argv.slice(2));
if (!flags.custom) {
  const r = spawnSync(process.execPath, [join(VENDOR, 'tools', 'check.mjs'), ...pos], { stdio: 'inherit' });
  process.exit(r.status ?? 1);
}
if (!existsSync(CUSTOM_DIR)) { console.error('no fx/custom yet'); process.exit(1); }
const tmp = mkdtempSync(join(tmpdir(), 'pixelfx-check-'));
try {
  cpSync(VENDOR, tmp, { recursive: true });
  const ids = [];
  for (const f of walk(CUSTOM_DIR).filter((f) => f.endsWith('.js') && !f.split('/').pop().startsWith('_'))) {
    const id = f.slice(0, -3);
    if (pos.length && !pos.some((p) => id === p || id.startsWith(p + '/'))) continue;
    const dest = join(tmp, 'src', 'fx', f);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, readFileSync(join(CUSTOM_DIR, f), 'utf8').replace(/["'](\.\.\/)+third_party\/pixelfx\/src\/core\/index\.js["']/g, '"../../core/index.js"'));
    ids.push(id);
  }
  if (!ids.length) { console.error('no custom effect matched'); process.exit(1); }
  const r = spawnSync(process.execPath, [join(tmp, 'tools', 'check.mjs'), ...ids], { stdio: 'inherit' });
  process.exitCode = r.status ?? 1;
} finally { rmSync(tmp, { recursive: true, force: true }); }
