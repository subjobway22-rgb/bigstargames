#!/usr/bin/env node
// Integrity + licence guard. Fails (exit 1) if: the vendored pixelfx differs from its checksum manifest or the pinned
// version, an MIT notice is missing, a font file / the Patch Pixel typeface appears anywhere in the repo, or the
// exported sheets and index.json disagree.      npm run fx:verify
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { REPO, VENDOR, MANIFEST, OUT_DIR, readLock, sha256, walk, FONT_FILE, PATCH_PIXEL } from './common.mjs';

const res = [];
const check = (name, ok, detail = '') => res.push({ name, ok, detail });
const read = (p) => readFileSync(p, 'utf8');
const lock = readLock();

// 1. vendored tree == manifest == pinned version
check('lock has a full commit sha + version', /^[0-9a-f]{40}$/.test(lock.commit) && !!lock.version);
if (existsSync(MANIFEST)) {
  const listed = new Map(read(MANIFEST).trim().split('\n').map((l) => { const [h, ...f] = l.split('  '); return [f.join('  '), h]; }));
  const actual = walk(VENDOR).filter((f) => f !== 'MANIFEST.sha256');
  const changed = [...listed].filter(([f, h]) => !existsSync(join(VENDOR, f)) || sha256(readFileSync(join(VENDOR, f))) !== h).map(([f]) => f);
  const extra = actual.filter((f) => !listed.has(f));
  check(`vendored pixelfx matches checksum manifest (${listed.size} files)`, !changed.length && !extra.length, [...changed.map((f) => 'changed: ' + f), ...extra.map((f) => 'extra: ' + f)].slice(0, 6).join('; '));
  const ver = JSON.parse(read(join(VENDOR, 'package.json'))).version;
  check(`vendored version ${ver} == pinned ${lock.version}`, ver === lock.version);
} else check('MANIFEST.sha256 exists (run npm run fx:fetch)', false);

// 2. licences
const lic = existsSync(join(VENDOR, 'LICENSE')) ? read(join(VENDOR, 'LICENSE')) : '';
check('third_party/pixelfx/LICENSE is MIT (c) Patch + Hugo Duprez', /^MIT License/m.test(lic) && lic.includes('Patch') && lic.includes('Hugo Duprez'));
check('third_party/pixelfx/NOTICE.md present', existsSync(join(VENDOR, 'NOTICE.md')));
const tpn = existsSync(join(REPO, 'THIRD_PARTY_NOTICES.md')) ? read(join(REPO, 'THIRD_PARTY_NOTICES.md')) : '';
for (const needle of ['patch-gg/pixelfx', 'Hugo Duprez', 'Sprite Fusion', 'rehan-remade', 'Hollow Crown', 'Permission is hereby granted', 'Patch Pixel'])
  check(`THIRD_PARTY_NOTICES.md mentions "${needle}"`, tpn.includes(needle));

// 3. the Patch Pixel font must never be in this repo or used by the game
const all = walk(REPO, ['.git', 'node_modules', 'build', 'www', 'android']);
const fonts = all.filter((f) => FONT_FILE.test(f) || PATCH_PIXEL.test(f));
check('no font files / Patch Pixel files anywhere in the repo', !fonts.length, fonts.slice(0, 5).join(', '));
const runtime = all.filter((f) => /^(js\/|index\.html$|style\.css$|manifest\.webmanifest$|sw\.js$)/.test(f) || /^art\/.*\.json$/.test(f));
const usesFont = runtime.filter((f) => PATCH_PIXEL.test(read(join(REPO, f))) || /@font-face/.test(read(join(REPO, f))));
check('game runtime (js/, html, css, art json) does not reference Patch Pixel or load web fonts', !usesFont.length, usesFont.join(', '));

// 4. skill + exported sheets
check('.claude/skills/pixelfx/SKILL.md present', existsSync(join(REPO, '.claude', 'skills', 'pixelfx', 'SKILL.md')));
const idx = join(OUT_DIR, 'index.json');
if (existsSync(idx)) {
  const I = JSON.parse(read(idx)), problems = [];
  if (I.pixelfx?.commit !== lock.commit) problems.push('index.json was exported from a different pixelfx commit: re-run npm run fx:export -- --preset');
  for (const [k, s] of Object.entries(I.sheets ?? {})) {
    if (!existsSync(join(OUT_DIR, s.image)) || !existsSync(join(OUT_DIR, s.json))) problems.push(`${k}: sheet files missing`);
    else { const sh = JSON.parse(read(join(OUT_DIR, s.json))).meta.size; if (sh.w > 4096 || sh.h > 4096) problems.push(`${k}: sheet ${sh.w}x${sh.h} > 4096`); }
  }
  for (const [n, p] of Object.entries(I.presets ?? {})) if (!I.sheets?.[p.sheet]) problems.push(`preset ${n} -> missing sheet ${p.sheet}`);
  check(`art/fx/index.json consistent (${Object.keys(I.sheets ?? {}).length} sheets, ${Object.keys(I.presets ?? {}).length} presets)`, !problems.length, problems.join('; '));
} else check('art/fx/index.json (run npm run fx:export -- --preset)', false);

let bad = 0;
for (const r of res) { if (!r.ok) bad++; console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : '\n      ' + r.detail}`); }
console.log(bad ? `\n${bad} problem(s)` : '\nall checks passed');
process.exit(bad ? 1 : 0);
