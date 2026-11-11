#!/usr/bin/env node
// Look at an effect: writes a contact sheet PNG (and a GIF with --gif) to build/fx-preview/<id>/.
// Open the PNG with your image tool. This is how you judge an effect: render, look, refine.
//   npm run fx:preview -- fire/torch [--gif] [--all] [--custom] [--act] [--opts JSON] [--palette NAME] [--seed N]
import { join } from 'node:path';
import { REPO, CUSTOM_DIR, lib, core, parseArgs } from './common.mjs';

const { pos, flags } = parseArgs(process.argv.slice(2));
if (!pos.length) { console.error('usage: npm run fx:preview -- <id|category|pattern>... [--gif] [--all] [--custom] [--act] [--opts JSON] [--palette NAME]'); process.exit(1); }
const L = await lib(), C = await core();
const pal = (o) => (typeof o.palette === 'string' ? { ...o, palette: C.PAL[o.palette] ?? (() => { throw new Error('unknown palette ' + o.palette); })() } : o);
const options = pal({ ...(flags.opts ? JSON.parse(flags.opts) : {}), ...(flags.palette ? { palette: flags.palette } : {}) });
let failed = 0;
for (const id of L.resolveIds(pos, flags.custom ? CUSTOM_DIR : undefined)) {
  try {
    const fx = await L.loadEffect(id, flags.custom ? CUSTOM_DIR : undefined), dir = join(REPO, 'build', 'fx-preview', id), made = [];
    if (flags.act) {
      const r = L.renderAct(fx, { fps: 60, options });
      const k = 3, cols = 8, step = 1 / 12, list = [];
      for (const f of r.frames) if (f.t + 1e-6 >= (list.length ? r.frames[0].t + list.length * step : -1e9)) list.push(f);
      const rows = Math.ceil(list.length / cols), img = L.canvas(cols * (r.w * k + 4), rows * (r.h * k + 18));
      list.forEach((f, j) => { const x = (j % cols) * (r.w * k + 4), y = Math.floor(j / cols) * (r.h * k + 18); img.text(f.t.toFixed(2), x + 2, y + 3, 2); img.paste(L.upscale(f.color, r.w, r.h, k), r.w * k, r.h * k, x, y + 16); });
      made.push(L.save(join(dir, 'act.png'), img.png()));
    } else {
      const r = L.renderFrames(fx, { options, seed: flags.seed ? +flags.seed : undefined });
      made.push(L.save(join(dir, 'contact.png'), L.contactSheet(fx, r, { max: flags.all ? 400 : 16 })));
      if (flags.gif) { const k = Math.max(2, Math.min(8, Math.floor(480 / Math.max(r.w, r.h)))); if (L.writeVideo(join(dir, 'anim.gif'), r, k, { loops: fx.meta.loop ? 2 : 1 })) made.push(join(dir, 'anim.gif')); else console.warn('ffmpeg not found: no GIF'); }
    }
    console.log(`${id}  ->  ${made.join('  ')}`);
  } catch (e) { failed++; console.error(`${id}: ${e.stack ?? e}`); }
}
process.exit(failed ? 1 : 0);
