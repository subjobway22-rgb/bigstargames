#!/usr/bin/env node
// Start a NEW effect of our own in fx/custom/<category>/<name>.js (never inside third_party/, which is pinned and checksummed).
//   npm run fx:new -- arcane/my-spell [--loop]
// Template adapted from pixelfx tools/new.mjs (MIT, (c) 2026 Patch / Hugo Duprez).
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { CUSTOM_DIR, parseArgs } from './common.mjs';
const { pos, flags } = parseArgs(process.argv.slice(2));
const id = pos[0], loop = !!flags.loop;
if (!id || !/^[a-z0-9-]+\/[a-z0-9-]+$/.test(id)) { console.error('usage: npm run fx:new -- <category>/<name> [--loop]   (kebab-case)'); process.exit(1); }
const file = join(CUSTOM_DIR, id + '.js');
if (existsSync(file)) { console.error(file + ' already exists'); process.exit(1); }
const name = id.split('/')[1].replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
const body = loop
  ? `  // a loop: everything is a function of the phase, so t = 0 and t = duration match
  const C = ramp(o.palette), ph = t / meta.duration;
  cycle(t, meta.duration, 12, o.seed, 0.8, (age, life, r) => {
    const k = age / life, a = r.range(0, TAU) + ph * TAU, rad = 6 + k * 12;
    p.px(Math.cos(a) * rad, Math.sin(a) * rad - 8, at(C.slice(2), 1 - k));
  });
  p.circle(0, -8, 4 + Math.sin(ph * TAU) * 1.5, C[5]);
  p.glow(0, -8, 20, C[4], 0.35);`
  : `  // a one-shot: a hero frame, then everything falls away and is gone by t = duration
  const C = ramp(o.palette);
  if (t < 0.06) p.circle(0, -8, 6, WHITE);
  burst(14, o.seed, (r) => {
    const a = r.range(0, TAU), sp = r.range(40, 90), life = r.range(0.3, 0.6);
    if (t > life) return;
    const [x, y] = fly(0, -8, Math.cos(a) * sp, Math.sin(a) * sp, t, 120, 2);
    p.px(x, y, at(C.slice(2), 1 - t / life));
    p.light(x, y, C[4], 0.5 * (1 - t / life));
  });
  p.glow(0, -8, 24, C[4], 0.5 * (1 - seg(t, 0, 0.4)));`;
const src = `// Custom effect for Guild of Ash. Core imported from the pinned, vendored pixelfx (MIT).
import { PAL, ramp, at, ${loop ? 'cycle' : 'burst, fly, seg, WHITE'}, TAU } from "../../../third_party/pixelfx/src/core/index.js";

export const meta = {
  name: "${name}",
  desc: "One line: what it is, how it moves.",
  tags: ["${id.split('/')[0]}"],
  size: [48, 48],
  origin: [24, 32],
  duration: ${loop ? 1.2 : 0.7},
  loop: ${loop},
  fps: 30,
  bg: "dark",
  options: { palette: PAL.arcane, seed: 1 },
};

export function draw(p, t, o) {
${body}
}
`;
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, src);
console.log(`wrote fx/custom/${id}.js\nnext: npm run fx:preview -- ${id} --custom   then open build/fx-preview/${id}/contact.png\nthen: npm run fx:check -- ${id}   and   npm run fx:export -- ${id} --custom`);
