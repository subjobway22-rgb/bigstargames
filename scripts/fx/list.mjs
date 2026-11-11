#!/usr/bin/env node
// Find effects (built-in library + fx/custom): npm run fx:list -- frost   |   npm run fx:list -- --categories
import { existsSync } from 'node:fs';
import { CUSTOM_DIR, lib, parseArgs } from './common.mjs';
const { pos, flags } = parseArgs(process.argv.slice(2));
const L = await lib(), words = pos.map((w) => w.toLowerCase());
const rows = [];
for (const [dir, prefix] of [[undefined, ''], [CUSTOM_DIR, 'custom/']]) {
  if (dir && !existsSync(dir)) continue;
  for (const id of L.allIds(dir)) {
    let m; try { m = (await L.loadEffect(id, dir)).meta; } catch { continue; }
    rows.push({ id: prefix + id, m });
  }
}
if (flags.categories) {
  const c = {}; for (const r of rows) (c[r.id.split('/').slice(0, -1).join('/')] ??= []).push(r.id);
  for (const [k, v] of Object.entries(c)) console.log(k.padEnd(16), String(v.length).padStart(3));
  console.log(`\n${rows.length} effects`); process.exit(0);
}
let n = 0;
for (const { id, m } of rows) {
  if (!words.every((w) => [id, m.name, m.desc, ...m.tags].join(' ').toLowerCase().includes(w))) continue;
  n++; console.log(`${id.padEnd(32)} ${(m.loop ? 'loop ' : 'once ') + m.duration + 's'}`.padEnd(46) + `${m.size.join('x').padEnd(8)} ${m.actor ? 'actor ' : '      '}${m.desc}`);
}
console.log(`\n${n} effect${n === 1 ? '' : 's'}`);
