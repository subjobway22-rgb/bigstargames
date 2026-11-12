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

## Release (Google Play): AAB + APK + ZIP, built from GitHub

- Play needs an **AAB**. `npm run package:android` (or the GitHub Actions workflow `.github/workflows/android.yml`) produces AAB, debug APK, web ZIP, source ZIP and `SHA256SUMS.txt` in `dist/`. Full guide: `docs/RELEASE.md`.
- The AAB is only uploadable when **signed with the user's upload key** (GitHub secrets `ANDROID_KEYSTORE_*`). Never create, commit or print a real keystore; throwaway test keys only, deleted after use.
- Android project is `android/` (Capacitor 8, targetSdk 36, Java 21). After changing `js/`, `art/` or `index.html`: `npm run android:sync`. AdMob ids in the manifest and `js/admob.js` are Google TEST ids until the user replaces them.
- Building here needs the Android SDK (`ANDROID_HOME`, platform 36 + build-tools 36.0.0) and the `dl.google.com` network host; if blocked, rely on the GitHub workflow.
- Image prompts for the user live in `docs/ART_PROMPTS.md`, generated from `scripts/art/assets.json` (`node scripts/art/build-prompts.mjs`); every prompt is self-contained.
