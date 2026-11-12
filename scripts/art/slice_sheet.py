#!/usr/bin/env python3
"""Cut an AI-generated 4x2 move+attack sprite sheet into aligned frames and pack it for the game.

  python3 scripts/art/slice_sheet.py <name> <source.(png|webp)> --facing right|left [--scale 0.5] [--debug DIR]

 * Frames are found by SHAPE (connected components), not by a fixed grid, so weapons that cross a cell border are kept.
 * Every frame is aligned on the feet (anchor = mean x of the lowest pixels, ground = lowest pixel), so the character
   does not jitter when the animation plays.
 * Output: art/sheets/<name>.webp (RGBA grid, 4 columns) + an entry in art/sheets/index.json.
Row 1 (frames 0-3) = move loop, row 2 (frames 4-7) = attack.
"""
import argparse, json, os, sys
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('name'); ap.add_argument('src')
ap.add_argument('--facing', choices=['right', 'left'], required=True)
ap.add_argument('--scale', type=float, default=0.5)
ap.add_argument('--debug')
ap.add_argument('--alpha-from-white', action='store_true', help='source has an opaque white background: key it out')
a = ap.parse_args()
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

im = Image.open(a.src).convert('RGBA')
arr = np.array(im)
if a.alpha_from_white:
    white = (arr[..., :3] >= 240).all(axis=2)
    arr[..., 3] = np.where(white, 0, 255)
H, W = arr.shape[:2]
mask = arr[..., 3] > 16

# ---- label shapes on a 4x downsampled, dilated mask (merges a figure with its cloak/weapon fragments)
S = 4
h, w = H // S, W // S
small = mask[:h * S, :w * S].reshape(h, S, w, S).any(axis=(1, 3))
R = int(os.environ.get("SLICE_R", "2"))
dil = small.copy()
for dy in range(-R, R + 1):
    for dx in range(-R, R + 1):
        dil |= np.roll(np.roll(small, dy, 0), dx, 1)
lab = np.zeros((h, w), int); n = 0; areas = {}
for y in range(h):
    for x in range(w):
        if dil[y, x] and not lab[y, x]:
            n += 1; stack = [(y, x)]; lab[y, x] = n; c = 0
            while stack:
                cy, cx = stack.pop(); c += 1
                for ny in (cy - 1, cy, cy + 1):
                    for nx in (cx - 1, cx, cx + 1):
                        if 0 <= ny < h and 0 <= nx < w and dil[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = n; stack.append((ny, nx))
            areas[n] = c
big = sorted(areas, key=areas.get, reverse=True)[:8]
print(f'{n} shapes; 8 largest areas: {[areas[b] for b in big]}; next: {sorted(areas.values(), reverse=True)[8:11]}')
if len(big) < 8 or areas[big[7]] < 0.3 * areas[big[0]]:
    sys.exit('could not find 8 separate frames (figures touching, or fewer than 8). Ask for a sheet with more space between frames.')

def centroid(b):
    ys, xs = np.nonzero(lab == b); return ys.mean() * S, xs.mean() * S
cent = {b: centroid(b) for b in big}
order = sorted(big, key=lambda b: cent[b][0])
rows = [sorted(order[:4], key=lambda b: cent[b][1]), sorted(order[4:], key=lambda b: cent[b][1])]
frames_ids = rows[0] + rows[1]
# the 8 big shapes own their pixels; leftovers (tiny dilation orphans) go to the nearest big shape
full = np.kron(lab, np.ones((S, S), int)); full = np.pad(full, ((0, H - full.shape[0]), (0, W - full.shape[1])))
owner = np.zeros((H, W), int)
for fi, b in enumerate(frames_ids): owner[(full == b) & mask] = fi + 1
for b, ar in areas.items():
    if b in big: continue
    ys, xs = np.nonzero((full == b) & mask)
    if len(ys) == 0: continue
    cy, cx = ys.mean(), xs.mean()
    fi = min(range(8), key=lambda i: (cent[frames_ids[i]][0] - cy) ** 2 + (cent[frames_ids[i]][1] - cx) ** 2)
    owner[(full == b) & mask] = fi + 1

crops = []
for fi in range(8):
    m = owner == fi + 1
    ys, xs = np.nonzero(m)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    low = ys > y1 - max(6, int((y1 - y0) * 0.08))
    ax = float(xs[low].mean())                     # feet anchor x
    piece = arr[y0:y1 + 1, x0:x1 + 1].copy()
    piece[~m[y0:y1 + 1, x0:x1 + 1]] = 0
    crops.append(dict(img=piece, ax=ax - x0, gy=y1 - y0, w=x1 - x0 + 1, h=y1 - y0 + 1))
left = max(c['ax'] for c in crops); right = max(c['w'] - c['ax'] for c in crops)
top = max(c['gy'] for c in crops)
PAD = 6
cw, ch = int(round(left + right)) + PAD * 2, int(round(top)) + PAD * 2 + 2
pivot = (left + PAD, top + PAD)
canvas = []
for c in crops:
    f = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    f.alpha_composite(Image.fromarray(c['img']), (int(round(pivot[0] - c['ax'])), int(round(pivot[1] - c['gy']))))
    canvas.append(f)

def shrink(img, k):
    if k == 1: return img
    p = np.array(img).astype(np.float32); p[..., :3] *= p[..., 3:4] / 255      # premultiply: no dark halos
    t = Image.fromarray(np.clip(p, 0, 255).astype(np.uint8), 'RGBA')
    t = t.resize((max(1, round(img.width * k)), max(1, round(img.height * k))), Image.LANCZOS)
    q = np.array(t).astype(np.float32); al = np.maximum(q[..., 3:4], 1)
    q[..., :3] = np.clip(q[..., :3] * 255 / al, 0, 255)
    return Image.fromarray(q.astype(np.uint8), 'RGBA')
canvas = [shrink(f, a.scale) for f in canvas]
fw, fh = canvas[0].size
cols = 4
sheet = Image.new('RGBA', (fw * cols, fh * 2), (0, 0, 0, 0))
for i, f in enumerate(canvas): sheet.alpha_composite(f, ((i % cols) * fw, (i // cols) * fh))
out = os.path.join(ROOT, 'art', 'sheets', a.name + '.webp')
os.makedirs(os.path.dirname(out), exist_ok=True)
sheet.save(out, 'WEBP', quality=88, method=6, alpha_quality=100)
idx_file = os.path.join(ROOT, 'art', 'sheets', 'index.json')
idx = json.load(open(idx_file)) if os.path.exists(idx_file) else {'schema': 1, 'sheets': {}}
idx['sheets'][a.name] = dict(image=a.name + '.webp', frameSize=[fw, fh], columns=cols, frames=8,
    pivot=[round(float(pivot[0]) * a.scale, 1), round(float(pivot[1]) * a.scale, 1)], facing=a.facing,
    anims=dict(move=dict(frames=[0, 1, 2, 3], fps=8, loop=True), attack=dict(frames=[4, 5, 6, 7], fps=12, loop=False)))
json.dump(idx, open(idx_file, 'w'), indent=1); open(idx_file, 'a').write('\n')
print(f'{a.name}: 8 frames of {fw}x{fh}, sheet {sheet.size}, pivot (feet) {idx["sheets"][a.name]["pivot"]}, {os.path.getsize(out)//1024} KB -> art/sheets/{a.name}.webp')
if a.debug:
    os.makedirs(a.debug, exist_ok=True)
    prev = Image.new('RGBA', sheet.size, (70, 62, 80, 255)); prev.alpha_composite(sheet)
    d = Image.fromarray(np.array(prev)[..., :3]); 
    from PIL import ImageDraw
    dr = ImageDraw.Draw(d)
    for i in range(8):
        x0, y0 = (i % cols) * fw, (i // cols) * fh
        dr.rectangle((x0, y0, x0 + fw - 1, y0 + fh - 1), outline=(120, 200, 120))
        px, py = x0 + idx['sheets'][a.name]['pivot'][0], y0 + idx['sheets'][a.name]['pivot'][1]
        dr.line((px - 12, py, px + 12, py), fill=(255, 60, 60), width=2); dr.line((px, py - 12, px, py + 12), fill=(255, 60, 60), width=2)
    d.save(os.path.join(a.debug, a.name + '_aligned.png'))
