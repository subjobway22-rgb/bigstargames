// Animated character sprites from the move+attack sheets in art/sheets (made by scripts/art/slice_sheet.py).
// Row 1 = move loop, row 2 = attack. One shared requestAnimationFrame loop drives every <canvas class="spr">.
// If a class has no sheet yet, spriteHtml() returns '' and the caller falls back to the static portrait.

let index = null, loading = null;
const imgs = new Map(), state = new WeakMap();

export function initSprites() {
  return (loading ??= fetch('art/sheets/index.json').then((r) => (r.ok ? r.json() : null)).catch(() => null)
    .then((j) => { index = j; if (j) requestAnimationFrame(loop); return !!j; }));
}
const sheetOf = (name) => index?.sheets?.[name];
function image(file) {
  if (!imgs.has(file)) { const im = new Image(); im.src = 'art/sheets/' + file; imgs.set(file, im); }
  return imgs.get(file);
}

/** HTML for an animated sprite `h` css-px tall, facing `face` ('right'|'left'); '' when there is no sheet. */
export function spriteHtml(name, h, face = 'right') {
  const s = sheetOf(name); if (!s) return '';
  const [fw, fh] = s.frameSize, w = Math.round((h * fw) / fh);
  const flip = s.facing !== face ? 'transform:scaleX(-1);' : '';
  return `<canvas class="spr" data-sheet="${name}" width="${fw}" height="${fh}" style="width:${w}px;height:${h}px;${flip}"></canvas>`;
}

/** Make every sprite on screen play its attack once (staggered a little so a party does not swing in lockstep). */
export function spriteAttack(stagger = 110) {
  document.querySelectorAll('canvas.spr').forEach((cv, i) => setTimeout(() => {
    const st = stateOf(cv); st.mode = 'attack'; st.t0 = performance.now(); st.last = -1;
  }, i * stagger));
}
function stateOf(cv) {
  let st = state.get(cv);
  if (!st) { st = { mode: 'move', t0: performance.now(), last: -1, phase: Math.random() * 600 }; state.set(cv, st); }
  return st;
}

function loop(now) {
  document.querySelectorAll('canvas.spr').forEach((cv) => {
    const s = sheetOf(cv.dataset.sheet), im = s && image(s.image);
    if (!s || !im || !im.complete || !im.naturalWidth) return;
    const st = stateOf(cv), anim = s.anims[st.mode], step = 1000 / anim.fps;
    let i = Math.floor((now - st.t0 + (st.mode === 'move' ? st.phase : 0)) / step);
    if (i >= anim.frames.length) {
      if (!anim.loop) { st.mode = 'move'; st.t0 = now; st.last = -1; return; }   // attack done -> back to marching
      i %= anim.frames.length;
    }
    if (i === st.last) return;
    st.last = i;
    const f = anim.frames[i], [fw, fh] = s.frameSize, ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, fw, fh);
    ctx.drawImage(im, (f % s.columns) * fw, Math.floor(f / s.columns) * fh, fw, fh, 0, 0, fw, fh);
  });
  requestAnimationFrame(loop);
}
