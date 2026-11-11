// pixelfx sprite-sheet player. Plays the sheets exported by `npm run fx:export` (art/fx/*.png + art/fx/index.json).
// Same code runs in the Android WebView (Capacitor) and in a desktop/Claude preview browser. No network: files are bundled.
// Effects are pixel art, so the canvas is scaled by a whole number with image-rendering: pixelated.
// pixelfx is MIT (c) 2026 Patch / Hugo Duprez: see THIRD_PARTY_NOTICES.md.

let index = null, loading = null, enabled = true, active = 0;
const sheets = new Map(), lastAt = {};
const MAX_ACTIVE = 6, MIN_GAP_MS = 220;
const reduced = () => matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const setFxEnabled = (v) => { enabled = !!v; };
export const fxReady = () => !!index;

export function initFx() {
  return (loading ??= fetch('art/fx/index.json').then((r) => (r.ok ? r.json() : null)).catch(() => null).then((j) => { index = j; return !!j; }));
}
function loadSheet(file) {
  if (!sheets.has(file)) {
    sheets.set(file, new Promise((res) => {
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = () => res(null);
      im.src = 'art/fx/' + file;
    }));
  }
  return sheets.get(file);
}
function layer() {
  let l = document.getElementById('fxlayer');
  if (!l) { l = document.createElement('div'); l.id = 'fxlayer'; document.body.append(l); }
  return l;
}

/**
 * Play a game preset (see scripts/fx/presets.json). `where(anchorName)` returns viewport {x, y} or null.
 * Returns { stop() } or null when skipped (disabled, throttled, missing art).
 */
export async function playFx(name, where) {
  if (!enabled || reduced()) return null;
  if (!index && !(await initFx())) return null;
  const p = index.presets?.[name], s = p && index.sheets?.[p.sheet];
  if (!s) return null;
  const now = performance.now();
  if (active >= MAX_ACTIVE || now - (lastAt[name] ?? -1e9) < MIN_GAP_MS) return null;
  const pos = where(p.anchor);
  if (!pos) return null;
  const img = await loadSheet(s.image);
  if (!img) return null;
  lastAt[name] = now; active++;

  const [fw, fh] = s.frameSize, k = p.scale ?? 2, [px, py] = s.pivot;
  const cv = document.createElement('canvas');
  cv.width = fw; cv.height = fh;
  cv.style.cssText = `width:${fw * k}px;height:${fh * k}px;left:${Math.round(pos.x - px * k + (p.dx ?? 0))}px;top:${Math.round(pos.y - py * k + (p.dy ?? 0))}px`;
  layer().append(cv);
  const ctx = cv.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const step = 1000 / s.fps, t0 = performance.now();
  let stopped = false, last = -1;
  const done = () => { if (cv.isConnected) { cv.remove(); active--; } };
  const tick = (t) => {
    if (stopped) return done();
    let i = Math.floor((t - t0) / step);
    if (i >= s.frames) { if (!s.loop) return done(); i %= s.frames; }
    if (i !== last) {
      ctx.clearRect(0, 0, fw, fh);
      ctx.drawImage(img, (i % s.columns) * fw, Math.floor(i / s.columns) * fh, fw, fh, 0, 0, fw, fh);
      last = i;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  return { stop() { stopped = true; } };
}
