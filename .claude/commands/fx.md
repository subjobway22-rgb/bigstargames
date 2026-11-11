---
description: pixelfx menu - find, preview, export and wire pixel art effects for the game (usage: /fx [list|preview|export|presets|new|check|verify] ...)
argument-hint: "[list <words> | preview <id> | export <id> | presets | new <cat/name> | check <id> | verify]"
---

Use the `pixelfx` skill (`.claude/skills/pixelfx/SKILL.md`) and its rules (never edit `third_party/pixelfx`, never use the Patch Pixel font).

Request: $ARGUMENTS

- no argument: show this menu and ask what to do:
  1. list/search effects  2. preview one (look at the contact sheet)  3. export one to `art/fx/`  4. export all game presets
  5. new custom effect  6. quality check  7. verify integrity + licences  8. wire an effect to a game event
- `list <words>`   -> `npm run fx:list -- <words>`
- `preview <id>`   -> `npm run fx:preview -- <id> --gif`, then READ `build/fx-preview/<id>/contact.png` with the image reader and describe what you see
- `export <id>`    -> `npm run fx:export -- <id>`
- `presets`        -> `npm run fx:presets`
- `new <cat/name>` -> `npm run fx:new -- <cat/name>`, then draft, preview, refine as the skill describes
- `check <id>`     -> `npm run fx:check -- <id>`
- `verify`         -> `npm run fx:verify`

After exporting or wiring, test-play the game (`npm start`, Playwright screenshot mid-effect) and run `npm run fx:verify` before committing.
