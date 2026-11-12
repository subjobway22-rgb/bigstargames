#!/usr/bin/env node
// Batch 1 of the image prompts (UI + 3 heroes + 3 monsters as animation sprite sheets) -> docs/ART_PROMPTS_BATCH1.md
// Every prompt is fully self-contained: copy ONE block per image.
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const STYLE = 'dark fantasy occult 2D game art, hand-painted look, bold clean dark outlines, visible brush texture, desaturated palette (ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, void violet #463368), soft key light from the upper left, consistent line weight across the whole set';
const AVOID = 'Avoid: photorealistic, 3D render, anime, chibi, neon colors, glossy plastic, blurry, low quality.';
const OBJ = 'single isolated object, centered with 10% margin, fully transparent background (PNG with alpha channel), no ground shadow, no text or letters, no watermark, clean edges, nothing cropped';
const UI = 'single isolated UI element, centered, fully transparent background (PNG with alpha channel), no text or letters, no watermark, clean edges, nothing cropped';
const SHEET = (who, facing, move, attack) =>
  `${STYLE}. Game sprite sheet of ${who}, drawn as a full-body side view facing ${facing}. Canvas 2:1 (2048x1024) divided into exactly 4 columns by 2 rows of equal square cells (512x512 each), no grid lines, no labels, no numbers. TOP ROW = movement, a 4-frame looping walk cycle: ${move}. BOTTOM ROW = attack, 4 frames in order: 1 wind-up, 2 strike, 3 impact with follow-through, 4 recovery: ${attack}. In all 8 cells the character has the exact same design, outfit, colors, proportions and scale; the feet rest on the same ground line about 12% above the bottom of each cell; the body is centered horizontally in its cell; nothing crosses a cell border; no spell or hit effects, only the character and the weapon. Fully transparent background (PNG with alpha channel), no ground shadow, no text, no watermark. ${AVOID}`;

const sheets = [
  ['art/sheets/hero_warrior.png', '전사 (시작 파티) · 오른쪽을 봄',
    SHEET('a grizzled scarred veteran knight, dented iron helm with two broken bone horns, blood-stained tabard over dark chainmail, glowing red eyes in the helmet slit, holding a notched broadsword and a small round shield', 'right',
      'heavy armored steps, sword held low at the side, slight body bob',
      'he raises the sword back over his shoulder, slashes diagonally down and forward, the blade ends low in front, then he pulls back to a guard stance')],
  ['art/sheets/hero_rogue.png', '도적 (시작 파티) · 오른쪽을 봄',
    SHEET('a hooded female assassin with a black cloth mask, cold teal glowing eyes, dark teal leather and tattered cloak, a curved dagger in each hand', 'right',
      'fast light crouched steps, daggers held back, cloak trailing behind',
      'she crouches and pulls both daggers back, lunges forward with a double stab, the daggers fully extended in front, then springs back to a low stance')],
  ['art/sheets/hero_mage.png', '마도사 (시작 파티) · 오른쪽을 봄',
    SHEET('a gaunt old mage in tattered violet robes and a crooked witch hat with antler-like horns, glowing violet eyes, a gnarled staff with a glowing violet orb on top', 'right',
      'slow gliding steps, robe hem swaying, staff held upright, small bob',
      'he lifts the staff overhead and gathers the orb light, thrusts the staff forward pointing it at the enemy, holds the pose with the orb bright, then lowers the staff and steps back')],
  ['art/sheets/foe_imp.png', '임프 (1지역) · 왼쪽을 봄',
    SHEET('a small hunched horned imp with bat wings, sooty red skin, needle teeth, glowing yellow eyes, clutching a rusted dagger', 'left',
      'quick scampering hops, wings flapping, tail swinging',
      'it crouches and pulls the dagger back, leaps forward and stabs, the arm fully extended with wings spread, then hops back and crouches')],
  ['art/sheets/foe_beast.png', '지옥견 (2지역) · 왼쪽을 봄',
    SHEET('an emaciated hellhound with exposed ribs, cracked bone armor plates, dripping jaws and three glowing red eyes', 'left',
      'a four-legged prowling trot, head low, ribs showing, tail swaying',
      'it coils back low on its haunches, lunges forward with jaws wide open, the bite lands with its whole body stretched forward, then recoils back to a growling crouch')],
  ['art/sheets/foe_skel.png', '해골 병사 (3지역) · 왼쪽을 봄',
    SHEET('a skeleton soldier in rotted chainmail with a notched sword and a splintered shield, green ghostfire in the eye sockets', 'left',
      'stiff clattering marching steps, shield forward, sword down, jaw slightly open',
      'it raises the sword high overhead, chops straight down, the blade ends low in front with the shield pulled back, then it lifts the sword back to guard')],
];
const ui = [
  ['art/ui/ico_gold.png', '골드 아이콘 · 1:1 256px', `${STYLE}. Game UI icon, flat front view, thick dark outline, readable at 48px: a single heavy tarnished-gold coin with an embossed horned skull and a cracked rim. ${OBJ}. ${AVOID}`],
  ['art/ui/ico_soul.png', '영혼 아이콘 · 1:1 256px', `${STYLE}. Game UI icon, flat front view, thick dark outline, readable at 48px: a floating soul wisp, a pale violet-white flame shaped like a teardrop with a tiny screaming face inside. ${OBJ}. ${AVOID}`],
  ['art/ui/ico_essence.png', '영혼의 정수 아이콘 · 1:1 256px', `${STYLE}. Game UI icon, flat front view, thick dark outline, readable at 48px: a blood-red diamond crystal wrapped in a thin black thorn ring, a rune glowing inside. ${OBJ}. ${AVOID}`],
  ['art/ui/tab_quest.png', '탭: 원정 · 1:1 128px', `${STYLE}. Game UI tab icon, flat front view, readable at 40px, single tone bone white (#d8cfb8) with a dark outline: two crossed swords over a small skull. ${OBJ}. ${AVOID}`],
  ['art/ui/tab_guild.png', '탭: 길드 · 1:1 128px', `${STYLE}. Game UI tab icon, flat front view, readable at 40px, single tone bone white (#d8cfb8) with a dark outline: a heater shield with a horned emblem. ${OBJ}. ${AVOID}`],
  ['art/ui/tab_recruit.png', '탭: 영입 · 1:1 128px', `${STYLE}. Game UI tab icon, flat front view, readable at 40px, single tone bone white (#d8cfb8) with a dark outline: a hooded silhouette holding a rolled contract scroll with a wax seal. ${OBJ}. ${AVOID}`],
  ['art/ui/tab_more.png', '탭: 더보기 · 1:1 128px', `${STYLE}. Game UI tab icon, flat front view, readable at 40px, single tone bone white (#d8cfb8) with a dark outline: three glowing runic dots in a row inside a thin circle. ${OBJ}. ${AVOID}`],
  ['art/ui/frame_C.png', '등급 프레임: 일반 · 4:5 세로 512x640', `${STYLE}. Game UI portrait card frame, 4:5 vertical ornate border only, the whole inside of the frame is empty and fully transparent, border thickness about 8% of the width, the same layout and thickness as the other rarity frames of the set: a plain worn iron frame, scratched, ash grey. ${UI}. ${AVOID}`],
  ['art/ui/frame_R.png', '등급 프레임: 희귀 · 4:5 세로 512x640', `${STYLE}. Game UI portrait card frame, 4:5 vertical ornate border only, the whole inside of the frame is empty and fully transparent, border thickness about 8% of the width, the same layout and thickness as the other rarity frames of the set: a steel frame with small blue-grey gems in the corners and a thin silver inlay. ${UI}. ${AVOID}`],
  ['art/ui/frame_E.png', '등급 프레임: 영웅 · 4:5 세로 512x640', `${STYLE}. Game UI portrait card frame, 4:5 vertical ornate border only, the whole inside of the frame is empty and fully transparent, border thickness about 8% of the width, the same layout and thickness as the other rarity frames of the set: a dark violet metal frame with thorny vines and glowing purple runes on the corners. ${UI}. ${AVOID}`],
  ['art/ui/frame_L.png', '등급 프레임: 전설 · 4:5 세로 512x640', `${STYLE}. Game UI portrait card frame, 4:5 vertical ornate border only, the whole inside of the frame is empty and fully transparent, border thickness about 8% of the width, the same layout and thickness as the other rarity frames of the set: an ornate tarnished-gold frame with horns on the top corners, a small third-eye gem at the top center and a faint ember glow. ${UI}. ${AVOID}`],
  ['art/ui/btn_primary.png', '버튼: 기본(붉은색) · 3:1 가로 384x128', `${STYLE}. Game UI button, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, wide 3:1 pill shape, empty (no text): dried-blood red enamel with a dark iron rim and tiny rivets. ${UI}. ${AVOID}`],
  ['art/ui/btn_secondary.png', '버튼: 보조(회색) · 3:1 가로 384x128', `${STYLE}. Game UI button, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, wide 3:1 pill shape, empty (no text): ash-grey stone with a dark iron rim and tiny rivets. ${UI}. ${AVOID}`],
  ['art/ui/btn_ad.png', '버튼: 광고(금색) · 3:1 가로 384x128', `${STYLE}. Game UI button, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, wide 3:1 pill shape, empty (no text): tarnished gold with a dark rim and a faint ember glow. ${UI}. ${AVOID}`],
  ['art/ui/panel_card.png', '카드 패널 · 2:1 가로 512x256', `${STYLE}. Game UI card panel, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, 2:1 landscape, empty inside: dark iron-bound parchment with worn edges and subtle corner studs. ${UI}. ${AVOID}`],
  ['art/ui/bar_frame.png', '진행 바 틀 · 16:1 가로 1024x64', `${STYLE}. Game UI progress bar frame, very wide 16:1 strip, flat front view, the interior is empty and fully transparent: dark iron with small studs. ${UI}. ${AVOID}`],
  ['art/ui/bar_fill.png', '진행 바 채움 · 8:1 가로 256x32', `${STYLE}. Game UI progress bar fill, very wide 8:1 strip, flat front view, seamless horizontally: a blood-red to ember-orange gradient with a glossy top edge. ${UI}. ${AVOID}`],
];

const out = [`# 아트 제작 프롬프트 — 1차 묶음 (UI · 캐릭터 3종 · 몬스터 3종)

**각 코드 블록 하나가 이미지 한 장 분량의 완결 프롬프트입니다. 블록을 통째로 한 번만 복사하세요.** (스타일·투명 배경·금지 항목 포함)
전체 목록(81장)은 \`docs/ART_PROMPTS.md\`. 이 문서는 \`node scripts/art/build-batch1.mjs\`로 생성됩니다.

## A. 캐릭터·몬스터 애니메이션 시트 (이동 + 공격, 한 장)
**한 장의 시트에 이동 4프레임(위 줄) + 공격 4프레임(아래 줄)** 이 들어갑니다. 캐릭터 3종은 **오른쪽**, 몬스터 3종은 **왼쪽**을 봅니다.
- 캔버스 **2048×1024 (2:1)**, 512×512 칸 4열×2행, 투명 PNG. 저장 경로는 각 블록 제목.
- 칸 정렬이 맞도록 **레이아웃 가이드 이미지**를 함께 첨부하세요: \`art/templates/sheet_4x2_guide.png\` (파란 줄=이동, 붉은 줄=공격, 빨간 선=발 위치, 파란 선=중앙). 첨부 시 프롬프트 맨 끝에 \`Use the attached image only as a layout guide for the cell positions and the ground line; do not draw its lines, colors or labels.\` 를 덧붙이세요.
- 시트 방식이 어긋나면(프레임마다 캐릭터가 달라지는 경우) **가장 잘 나온 결과를 레퍼런스로 첨부**하고 \`Keep the exact same character design in all 8 frames.\` 를 덧붙여 다시 생성하세요. 그래도 안 되면 **이동 줄(4칸 1024×... )과 공격 줄을 따로** 뽑아 이어 붙여도 됩니다(제가 합쳐 드립니다).
- 시트는 게임의 스프라이트 플레이어(pixelfx 시트와 같은 형식)에 연결하는 작업이 필요합니다. 파일이 오면 제가 칸을 자르고 재생 설정까지 합니다.
`];
for (const [file, label, p] of sheets) out.push(`### \`${file}\` — ${label}\n\`\`\`\n${p}\n\`\`\`\n`);
out.push(`## B. UI (17장, 전부 투명 PNG)\n규격은 각 제목에 있습니다. 모델의 가로세로 비율 설정도 제목 비율로 맞추세요.\n`);
for (const [file, label, p] of ui) out.push(`### \`${file}\` — ${label}\n\`\`\`\n${p}\n\`\`\`\n`);
out.push(`## 공통 안내\n- **투명 배경 옵션**(예: \`background: transparent\`)이 있으면 켜세요. 없으면 프롬프트의 \`fully transparent background (PNG with alpha channel)\`를 \`on a flat solid pure magenta #FF00FF background, no gradient\`로 바꿔 뽑고 배경 제거 도구(rembg, remove.bg 등)로 지웁니다.\n- 같은 모델·같은 세션에서 연속으로 뽑고, 첫 결과물을 레퍼런스로 첨부하면 스타일이 일관됩니다 (\`Match the exact style, line weight and palette of the attached reference image.\` 덧붙이기).\n- 효과(타격·폭발 등)는 이미지가 필요 없습니다 (pixelfx).\n`);
writeFileSync(join(ROOT, 'docs', 'ART_PROMPTS_BATCH1.md'), out.join('\n'));
console.log(`docs/ART_PROMPTS_BATCH1.md: ${sheets.length} sheets + ${ui.length} UI = ${sheets.length + ui.length} prompts`);
