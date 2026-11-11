---
name: pixelfx
description: Make, recolor, preview, export and wire pixel art effects and sprite animations for Guild of Ash with the pinned, vendored pixelfx library (244 ready-made effects in 20 categories - fire, explosions, magic, holy, shadow, impacts, melee, UI, pickups, status, weather, critters, transitions - each acted out with a wind-up, a freeze on contact and a recovery) plus a draft, render, look, refine loop for new ones. Use for ANY request about pixel art VFX, hit/impact/boss/upgrade effects, game juice, sprite sheets or sprite animation in this mobile (Play Store) game, instead of hand-drawing shapes.
license: MIT (pixelfx (c) 2026 Patch, Hugo Duprez). Adapted from the upstream pixelfx skill.
compatibility: Node 18+ (Node 22 here). ffmpeg optional (GIF previews). No network needed once vendored.
---

# pixelfx in Guild of Ash

Pixel art effects as code, vendored at a **pinned version** in `third_party/pixelfx/` (see `third_party/pixelfx.lock.json`:
v0.3.1, commit `044e12a`). Each effect is one file that draws into a **color** buffer and an additive **light** buffer. We
render effects to **sprite sheets** (transparent PNG + Aseprite-style JSON) in `art/fx/`, and `js/fx.js` plays them in the
game. Adapted from the upstream skill (full original: `third_party/pixelfx/upstream/SKILL.md`). The method is Hugo Duprez's
("How to make (good) pixel art effects with Claude"): code is clay, trust your eyes, feed your references, and
**draft -> render -> look -> refine**. One-shot prompts make mediocre effects.

## The game this serves

A dark-fantasy idle guild game for **Google Play** (HTML5 canvas/DOM game packaged for Android with Capacitor), which must also be
**playable right here in the Claude window** for testing: `npm start` serves it on http://localhost:8080 (`report_preview_port`
tells the app which port to preview). Everything pixelfx does here is offline and bundled; the game must stay light on data.

## Hard rules (these protect the licence and the pin)

1. **Never edit `third_party/pixelfx/`.** It is checksummed (`MANIFEST.sha256`). To change behaviour write your own effect in
   `fx/custom/`. To repair a modified copy: `npm run fx:fetch`.
2. **Do not move the pin** (`--update`) unless the user asks. A new version needs a review of the diff and `npm run fx:verify`.
3. **Never use the Patch Pixel font.** It is (c) Patch, not MIT, and lives only in upstream's `gallery/` which we do not vendor.
   No font files, no `@font-face`, no copying `gallery/`. The pixel lettering inside effects (e.g. "LEVEL UP!") comes from
   pixelfx's own MIT bitmap font in `src/core/font.js` and is fine.
4. **Keep the notices.** `THIRD_PARTY_NOTICES.md` (MIT texts for pixelfx / Hugo Duprez / Hollow Crown) ships in the app and is
   shown under More > Open-source licenses. Do not delete it or the Licenses button.
5. **Run `npm run fx:verify` before committing** anything that touches `third_party/`, `art/fx/` or `scripts/fx/`. It must pass.
6. Sheets must be **<= 4096 px** per side (mobile GPUs), drawn with **whole-number scale** (`image-rendering: pixelated`).
   Lower `--fps` (e.g. 20) for long effects. Keep total `art/fx/` small (it ships in the app).
7. Do not publish the game anywhere from this skill. (Upstream's "publish on Patch" step is intentionally removed: this game ships on Google Play.)
8. Generic motifs are fine; never recreate another game's sprites, characters or logos.

## Commands

| do | command |
|---|---|
| find effects | `npm run fx:list -- frost` / `-- --categories` |
| look at one | `npm run fx:preview -- fire/torch [--gif] [--all] [--palette blood] [--opts '{"seed":3}']` then open `build/fx-preview/<id>/contact.png` |
| see it acted (body, target, freeze) | `npm run fx:preview -- melee/sword-slash --act` |
| export a sheet to `art/fx/` | `npm run fx:export -- ice/frost-nova [--palette ice] [--fps 20] [--act]` |
| export all game presets | `npm run fx:presets` |
| new effect of ours | `npm run fx:new -- arcane/my-spell [--loop]` -> `fx/custom/arcane/my-spell.js` |
| check quality | `npm run fx:check -- fire/torch` (custom: `-- my/id --custom`) |
| integrity + licences | `npm run fx:verify` |
| menu | `npm run fx:menu` (also the `/fx` slash command) |

Custom effects use `--custom` on preview/export/check (e.g. `npm run fx:export -- arcane/my-spell --custom`).

## 1. Look for an existing effect first

`npm run fx:list -- <words>` searches ids, names, tags and descriptions; `third_party/pixelfx/docs/CATALOG.md` lists everything. Render
the candidates and look at them. Most requests are an existing effect with other options:

- `palette`: dark-to-bright ramp. Any name in `PAL` (`third_party/pixelfx/src/core/color.js`): fire ember lava smoke dust ice water
  electric volt poison holy heal arcane shadow blood earth stone gold leaf wood metal bone neon cyber matrix candy night; or hex strings.
  Dark-fantasy defaults for this game: `blood`, `shadow`, `arcane`, `bone`, `ember`, `gold`.
- `seed` for another take, `flip` to face left, `angle`, `light` (glow), plus each effect's own knobs (`meta.options`).
- Try options without editing code: `npm run fx:preview -- fire/torch --opts '{"palette":["#102","#215","#43a","#8cf","#fff"]}'`.

## 2. Put it in the game (the pipeline)

1. **Choose** the effect and look at it (`fx:preview`).
2. **Register it** as a game event preset in `scripts/fx/presets.json`:
   `"bossDown": { "id": "explosions/plasma-explosion", "options": { "palette": "blood" }, "scale": 1, "anchor": "foe" }`
   (`anchor`: `foe` | `party` | `scene`; `scale`: integer; optional `dx`/`dy` px, `fps`, `act`).
3. **Export**: `npm run fx:presets` writes `art/fx/<id>.png|json` and `art/fx/index.json` (what the game reads).
4. **Trigger it** from game code with `queueFx('<preset>')` in `js/ui.js` (events already wired: `hit` every stage clear, `bossDown`
   when a boss falls, `enhance`, `guildUp`). `flushFx()` plays the queue after the DOM re-renders. `js/fx.js` does the playing
   (own layer `#fxlayer`, throttled, max 6 at once, respects the user's "Pixel effects" toggle and reduced-motion).
5. **Test play** (see below), then `npm run fx:verify`, then commit.

Sheet JSON: `meta.pixelfx` has `fps`, `loop`, `frameSize`, `columns`, `pivot` (the effect's origin, e.g. the feet / impact point) and,
for acts, `act` timing (`windup`, `recovery`, `hits[{t, freeze}]`). The JSON is Aseprite-style, so a Unity/Godot/Phaser port can read the same
sheets later (pivot = `meta.pixelfx.pivot`, nearest-neighbour filtering, no compression, play at `fps`).

## 3. Test-play it here

`npm start` (http://localhost:8080). Open `?debug` and call `window.__fx.play('bossDown')` from a Playwright script to fire a preset on demand,
or just play: tap Enhance (`enhance`), wait for a stage clear (`hit`), expand the guild (`guildUp`). Screenshot mid-animation with Playwright
(`require('playwright')` works from any directory; no install). Check for console errors, that `#fxlayer canvas` appears and is removed afterwards,
and that no `art/fx/*` request 404s. (404s for optional `art/hero_*`/`bg_*`/`foe_*` are the SVG fallback and are fine.)

## 4. Make a new effect

Read `third_party/pixelfx/docs/AUTHORING.md` first: the contract (meta; `draw(p, t, o)` for pure effects or `create(o)` for simulated ones;
local coordinates; seamless loops; ends empty), the toolkit and the quality bar. Then:

1. **Say it in one line** with art direction: what it is, how it moves, palette, timing.
2. **Find references**: `fx:list`, then read the two or three closest effect files and borrow techniques (`Particles`/`Bits` in `src/core/sim.js`,
   `p.disc` for translucent volumes, `cycle` for seamless particles, `tileFbm` for flames/water). Read `src/fx/melee/sword-slash.js`,
   `src/fx/ice/frost-nova.js`, `src/fx/explosions/small-explosion.js` for the bar.
3. **Draft**: `npm run fx:new -- <category>/<name>` (add `--loop`). When the direction is open, write 3 to 5 genuinely different drafts (`-a` .. `-e`),
   preview them all, look at every contact sheet, show the user the best two or three.
4. **Look, judge, fix.** `fx:preview -- <id> --custom`, open `build/fx-preview/<id>/contact.png`. Fix the worst thing, render again. Three rounds
   minimum. `--all` shows every frame, `--gif` shows motion.
5. **Act it out** if a character is involved (`export const act`, see "Acts" in AUTHORING.md): wind-up before t = 0, a pose change on release, a freeze on
   contact, a recovery. `fx:preview -- <id> --custom --act` shows consecutive 12 fps steps; judge motion from those, not a contact sheet's samples.
6. **Check**: `npm run fx:check -- <id> --custom` until clean. Delete drafts you did not keep. Then export and wire it as in section 2.

| you see | fix |
|---|---|
| it reads as mush at 1x | fewer colors, a clear silhouette, one focal point, bigger shapes |
| speckle: lone noise pixels inside shapes | threshold noise less, quantize with `at()`, no noise on small shapes |
| floaty, no punch | fast in, slow out (`ease.outQuart`/`outExpo`), a 1 to 2 frame white hero frame, shorter total time |
| stiff or mechanical | vary every particle (size, speed, delay, life), add secondary motion (sparks, smoke, debris) |
| washed out | less glow (k 0.2 to 0.5), darker edge steps, keep white for the hottest core only |
| flat | light from one side: brighter top-left, darker bottom-right step; a darker ramp step at the base |
| smooth gradients, vector look | hard ramp steps in color; softness only in light and in translucent smoke |
| a checkerboard where smoke should be | `SMOKE`, `VAPOUR` or `DUST` particles, or `p.disc`: truly translucent, lit on top |
| seam when a loop wraps | `cycle`, `loopNoise(phase)`, whole-cell `tileNoise` scrolls, `sin(phase * TAU * n)` |
| a one-shot that pops off | let it shrink, dither out or fall away before t = duration |
| a great effect on a dead character | give it an act: wind-up, release pose, freeze on contact, a target that reacts, recovery |
| the act feels weightless | a wind-up the opposite way to the blow, a longer freeze (up to 0.2 s), a bigger silhouette change, shake |

Directional effects face right, ground effects stand on y = 0, actor effects wrap `o.actor`, and nothing uses `Math.random`.

## 5. Acts and the game's own characters

An effect alone looks like a sticker. Effects with a character carry an `act`: when the body winds up, when to freeze, how the target reacts. Our
adventurers are SVG/PNG portraits, not the stock dummy, so for hits use the timing as data: read `meta.pixelfx.act` in the sheet JSON (`windup`,
`recovery`, `hits` with `t` and `freeze`), start our own wind-up that long before the effect, and pause the game's animations for `freeze` seconds at
each hit. `npm run fx:export -- <id> --act` bakes the stock character and straw target in if a self-contained clip is wanted.

## 6. Updating pixelfx (only when asked)

`npm run fx:fetch -- --update <40-hex-sha> --version <x.y.z>`, read the diff of `third_party/pixelfx`, re-run `npm run fx:presets`, `npm run fx:verify`,
and play the game before committing. Everything else about the pin is in `docs/PIXELFX.md`.
