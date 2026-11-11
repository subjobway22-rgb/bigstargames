#!/usr/bin/env node
// Render pixelfx effects to sprite sheets (transparent PNG + Aseprite-style JSON) in art/fx/, and keep
// art/fx/index.json (what js/fx.js reads) up to date.
//
//   npm run fx:export -- --preset                 every game preset in scripts/fx/presets.json
//   npm run fx:export -- ice/frost-nova           one effect (any id, category or pattern)
//   npm run fx:export -- fire --opts '{"palette":"ice"}' --fps 20
//   npm run fx:export -- melee/sword-slash --act  bake the character + target acting it out
//   npm run fx:export -- arcane/my-spell --custom an effect Claude wrote in fx/custom/
//
// Options: --preset  --act  --custom  --opts JSON (palette may be a PAL name)  --palette NAME  --seed N  --fps N  --out DIR
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { REPO, OUT_DIR, CUSTOM_DIR, PRESETS_FILE, readLock, lib, core, parseArgs } from './common.mjs';

const { pos, flags } = parseArgs(process.argv.slice(2));
const L = await lib(), C = await core(), lock = readLock();
const out = flags.out ? join(REPO, flags.out) : OUT_DIR;
const MAX_TEX = 4096; // widest texture we accept: mobile GPUs choke above this

const resolveOpts = (o = {}) => {
  const r = { ...o };
  if (typeof r.palette === 'string') {
    if (!C.PAL[r.palette]) throw new Error(`unknown palette "${r.palette}". Known: ${Object.keys(C.PAL).join(' ')}`);
    r.palette = C.PAL[r.palette];
  }
  return r;
};
const indexFile = join(out, 'index.json');
const index = existsSync(indexFile) ? JSON.parse(readFileSync(indexFile, 'utf8')) : { schema: 1, sheets: {}, presets: {} };
index.schema = 1;
index.pixelfx = { version: lock.version, commit: lock.commit };
index.sheets ??= {}; index.presets ??= {};

async function exportOne(id, { custom = false, act = false, options, seed, fps } = {}) {
  const dir = custom ? CUSTOM_DIR : undefined;
  const fx = await L.loadEffect(id, dir);
  const name = id.split('/')[1];
  let r, s;
  if (act) {
    r = L.renderAct(fx, { fps: fps ?? fx.meta.fps, bg: 'none', hold: 0, ...(seed !== undefined ? { seed } : {}), options });
    s = L.spriteSheet(fx, r, name);
    s.json.meta.pixelfx.pivot = r.pivot;
  } else {
    r = L.renderFrames(fx, { bg: 'none', fps, seed, options });
    s = L.spriteSheet(fx, r, name);
  }
  const { w: W, h: H } = s.json.meta.size;
  if (W > MAX_TEX || H > MAX_TEX) throw new Error(`${id}: sheet ${W}x${H} exceeds ${MAX_TEX}px. Lower --fps (now ${r.fps}) or pick a smaller effect.`);
  const key = (custom ? 'custom/' : '') + id + (act ? '#act' : '');
  const rel = key.replace('#act', '.act');
  mkdirSync(dirname(join(out, rel)), { recursive: true });
  writeFileSync(join(out, rel + '.png'), s.png);
  writeFileSync(join(out, rel + '.json'), JSON.stringify(s.json, null, 1));
  const px = s.json.meta.pixelfx;
  index.sheets[key] = { image: rel + '.png', json: rel + '.json', frames: px.frames, fps: px.fps, frameSize: px.frameSize, columns: px.columns, pivot: px.pivot, loop: !!px.loop, ...(px.act ? { act: px.act } : {}) };
  console.log(`${key.padEnd(34)} ${String(px.frames).padStart(3)} frames ${px.frameSize.join('x').padEnd(8)} sheet ${W}x${H}  ->  art/fx/${rel}.png (${Math.round(s.png.length / 1024)} KB)`);
  return key;
}

let failed = 0;
try {
  if (flags.preset) {
    const presets = JSON.parse(readFileSync(PRESETS_FILE, 'utf8'));
    index.presets = {};
    for (const [name, p] of Object.entries(presets)) {
      if (name.startsWith('_')) continue;
      try {
        const sheet = await exportOne(p.id, { act: !!p.act, options: resolveOpts(p.options), seed: p.seed, fps: p.fps });
        index.presets[name] = { sheet, scale: p.scale ?? 2, anchor: p.anchor ?? 'foe', ...(p.dx ? { dx: p.dx } : {}), ...(p.dy ? { dy: p.dy } : {}) };
      } catch (e) { failed++; console.error(`${name}: ${e.message}`); }
    }
  }
  if (pos.length) {
    const ids = L.resolveIds(pos, flags.custom ? CUSTOM_DIR : undefined);
    if (!ids.length) { console.error('nothing matched'); failed++; }
    const options = { ...resolveOpts(flags.opts ? JSON.parse(flags.opts) : {}), ...(flags.palette ? resolveOpts({ palette: flags.palette }) : {}) };
    for (const id of ids) {
      try { await exportOne(id, { custom: !!flags.custom, act: !!flags.act, options, seed: flags.seed ? +flags.seed : undefined, fps: flags.fps ? +flags.fps : undefined }); }
      catch (e) { failed++; console.error(`${id}: ${e.message}`); }
    }
  }
  if (!flags.preset && !pos.length) { console.error('usage: npm run fx:export -- --preset | <id|category|pattern>... [--act] [--custom] [--opts JSON] [--palette NAME] [--fps N]'); failed++; }
  mkdirSync(out, { recursive: true });
  writeFileSync(indexFile, JSON.stringify(index, null, 1) + '\n');
} catch (e) { console.error(e.message); failed++; }
process.exit(failed ? 1 : 0);
