#!/usr/bin/env node
// Interactive menu for the pixelfx pipeline (search -> preview -> export -> game). npm run fx:menu
import { createInterface } from 'node:readline/promises';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { REPO } from './common.mjs';

const run = (script, ...args) => spawnSync(process.execPath, [join(REPO, 'scripts', 'fx', script), ...args], { stdio: 'inherit' });
const ITEMS = [
  ['1', 'Search effects (keyword)', async (ask) => run('list.mjs', ...(await ask('keywords: ')).split(/\s+/).filter(Boolean))],
  ['2', 'List categories', async () => run('list.mjs', '--categories')],
  ['3', 'Preview an effect (contact sheet + GIF)', async (ask) => run('preview.mjs', (await ask('effect id (e.g. fire/torch): ')).trim(), '--gif')],
  ['4', 'Export an effect to art/fx (sprite sheet PNG+JSON)', async (ask) => run('export.mjs', (await ask('effect id / category: ')).trim())],
  ['5', 'Export ALL game presets (scripts/fx/presets.json)', async () => run('export.mjs', '--preset')],
  ['6', 'New custom effect skeleton (fx/custom)', async (ask) => run('new.mjs', (await ask('category/name (kebab-case): ')).trim())],
  ['7', 'Quality-check built-in effect(s)', async (ask) => run('check.mjs', (await ask('effect id (blank = all): ')).trim())],
  ['8', 'Verify integrity + licences', async () => run('verify.mjs')],
  ['9', 'Re-vendor the pinned pixelfx version', async () => run('fetch.mjs')],
];
if (!process.stdin.isTTY) {
  console.log('pixelfx menu (run in a terminal), or use the npm scripts directly:');
  console.log('  npm run fx:list -- <words> | fx:preview -- <id> | fx:export -- <id>|--preset | fx:new -- <cat/name> | fx:check | fx:verify | fx:fetch');
  process.exit(0);
}
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => rl.question(q);
for (;;) {
  console.log('\n=== pixelfx -> Guild of Ash ===');
  for (const [k, label] of ITEMS) console.log(` ${k}) ${label}`);
  console.log(' 0) quit');
  const c = (await ask('> ')).trim();
  if (c === '0' || c === 'q') break;
  const item = ITEMS.find(([k]) => k === c);
  if (item) await item[2](ask); else console.log('?');
}
rl.close();
