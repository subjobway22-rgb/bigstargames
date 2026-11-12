#!/usr/bin/env node
// Regenerates the Android launcher icons, adaptive-icon foregrounds, splash screens and the Play Store 512px icon
// from icons/icon.svg.   Needs Playwright's Chromium (preinstalled in the Claude cloud env; `npx playwright install chromium` elsewhere).
//   node scripts/android/make-assets.mjs
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const RES = join(ROOT, 'android', 'app', 'src', 'main', 'res');
let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); }
catch { ({ chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright')); }

const BG = '#0b0a0d';
const full = readFileSync(join(ROOT, 'icons', 'icon.svg'), 'utf8');
// emblem only (no background square) for the adaptive-icon foreground
const emblem = full.replace(/<rect width="512" height="512" fill="#0b0a0d"\/>/, '');
// the clipping/padding lives on a wrapper div: `overflow` on <body> propagates to the viewport and would not clip
const svgDoc = (svg, size, extra = '') => `<!doctype html><html style="background:transparent"><body style="margin:0;background:transparent"><div style="width:${size}px;height:${size}px;${extra}">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</div></body></html>`;

const DENS = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const browser = await chromium.launch();
const page = await browser.newPage();
async function shot(html, w, h, file, { transparent = false } = {}) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html);
  mkdirSync(dirname(file), { recursive: true });
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
}
let n = 0;
for (const [d, k] of Object.entries(DENS)) {
  const L = Math.round(48 * k), F = Math.round(108 * k);
  // legacy square icon with softly rounded corners, and round icon
  await shot(svgDoc(full, L, `border-radius:${Math.round(L * 0.18)}px;overflow:hidden`), L, L, join(RES, `mipmap-${d}`, 'ic_launcher.png'), { transparent: true });
  await shot(svgDoc(full, L, `border-radius:50%;overflow:hidden`), L, L, join(RES, `mipmap-${d}`, 'ic_launcher_round.png'), { transparent: true });
  // adaptive foreground: 108dp canvas, emblem inside the 66% safe zone
  const inner = Math.round(F * 0.62), pad = Math.round((F - inner) / 2);
  await shot(`<!doctype html><html style="background:transparent"><body style="margin:0;background:transparent"><div style="width:${F}px;height:${F}px;display:flex;align-items:center;justify-content:center">${emblem.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body></html>`, F, F, join(RES, `mipmap-${d}`, 'ic_launcher_foreground.png'), { transparent: true });
  n += 3;
}
writeFileSync(join(RES, 'values', 'ic_launcher_background.xml'), `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${BG}</color>\n</resources>\n`);
// splash screens (same sizes Capacitor ships): dark background, emblem centred
const SPLASH = { 'drawable': [480, 320], 'drawable-land-mdpi': [480, 320], 'drawable-land-hdpi': [800, 480], 'drawable-land-xhdpi': [1280, 720], 'drawable-land-xxhdpi': [1600, 960], 'drawable-land-xxxhdpi': [1920, 1280],
  'drawable-port-mdpi': [320, 480], 'drawable-port-hdpi': [480, 800], 'drawable-port-xhdpi': [720, 1280], 'drawable-port-xxhdpi': [960, 1600], 'drawable-port-xxxhdpi': [1280, 1920] };
for (const [dir, [w, h]] of Object.entries(SPLASH)) {
  const s = Math.round(Math.min(w, h) * 0.38);
  await shot(`<!doctype html><body style="margin:0;width:${w}px;height:${h}px;background:${BG};display:flex;align-items:center;justify-content:center">${full.replace('<svg ', `<svg width="${s}" height="${s}" `)}</body>`, w, h, join(RES, dir, 'splash.png'));
  n++;
}
// Play Store listing icon: 512x512 PNG, square, full bleed, no transparency
await shot(svgDoc(full, 512), 512, 512, join(ROOT, 'store', 'icon-512.png'));
await browser.close();
console.log(`wrote ${n} Android resources + store/icon-512.png`);
