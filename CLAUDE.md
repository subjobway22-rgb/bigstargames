# Guild of Ash - notes for Claude

Dark-fantasy idle guild game, **built for Google Play** (HTML5 game packaged for Android with Capacitor; see `docs/DESIGN.md`).
It must stay **playable in the Claude window for testing**: `npm start` -> http://localhost:8080 (tell the app the port with `report_preview_port`).
Game logic is pure JS in `js/game.js`; UI in `js/ui.js`; no server traffic during play (keep it that way).

## Pixel art effects: use pixelfx (project skill)

For anything about pixel VFX, hit/boss/upgrade effects, sprite sheets or animation, **use the `pixelfx` skill**
(`.claude/skills/pixelfx/SKILL.md`, also `/fx`). Do not hand-draw effects with ad-hoc shapes.

- pixelfx is **vendored at a pinned version** in `third_party/pixelfx/` (`third_party/pixelfx.lock.json`). **Never edit it** and do not move the pin unless asked.
- Pipeline: pick/make effect -> `npm run fx:preview` (LOOK at `build/fx-preview/**/contact.png`) -> register in `scripts/fx/presets.json`
  -> `npm run fx:presets` (writes `art/fx/`) -> trigger with `queueFx()` in `js/ui.js` -> test-play -> `npm run fx:verify`.
- **Licences:** MIT credits live in `THIRD_PARTY_NOTICES.md` (bundled in the app, shown under More > Open-source licenses). Keep them.
  **Never use the Patch Pixel font** (Patch's own, not MIT): no font files, no `@font-face`. `npm run fx:verify` enforces this.
- Details for people: `docs/PIXELFX.md`.
