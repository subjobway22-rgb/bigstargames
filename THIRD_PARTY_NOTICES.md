# Third-party notices

Guild of Ash includes the following third-party software. Their licences require that these notices ship with the game
(this file is bundled in the app and shown under More > Open-source licenses).

---

## pixelfx 0.3.1

- Source: https://github.com/patch-gg/pixelfx (pinned to commit 044e12a45dc9cc312cec50ee606dfc98afe5adc2)
- Where: `third_party/pixelfx/` (code), and the pixel-art effect sprite sheets in `art/fx/` rendered from its effects.
- Licence: MIT

```
MIT License

Copyright (c) 2026 Patch
Copyright (c) 2026 Hugo Duprez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Code adapted inside pixelfx (also MIT)

pixelfx itself states (third_party/pixelfx/NOTICE.md) that it contains adapted work from:

- **Hugo Duprez / Sprite Fusion**: `src/core/sim.js` and the effects that say so at the top of their file adapt Sprite Fusion's
  open-source pixel art VFX (https://www.spritefusion.com/pixel-art-vfx). Copyright (c) 2026 Hugo Duprez, MIT License.
- **Hollow Crown (rehan-remade)**: `src/core/act.js` adapts how Hollow Crown plays its skills
  (https://github.com/rehan-remade/hollow-crown). Copyright (c) 2026 rehan-remade, MIT License.

The MIT permission notice above applies to these parts as well.

---

## What is deliberately NOT included

**The Patch Pixel typeface** (`gallery/fonts/PatchPixel-Regular.woff2` in the pixelfx repository) is (c) 2026 Patch, all rights
reserved, and is **not** covered by pixelfx's MIT licence. Guild of Ash does not contain, load or use it. The gallery tooling
that references it is not vendored, and `npm run fx:verify` fails if any font file or Patch Pixel reference appears in this
repository.

(The small pixel lettering visible inside some effects, for example "LEVEL UP!", is drawn by pixelfx's own bitmap font in
`src/core/font.js`, which is part of its MIT code.)
