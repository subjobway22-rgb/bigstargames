# 아트 제작 프롬프트 (Guild of Ash)

생성한 파일을 저장소 `art/` 폴더에 **아래 파일명 그대로** 넣으면 코드 수정 없이 자동 적용됩니다.
(없는 파일은 기존 벡터 그림이 대신 표시됩니다.) 영어 프롬프트 권장.

## 0. 공통 스타일 (모든 프롬프트 앞에 붙이기)
UI가 **파스텔 라벤더 톤**(Cosmoa 시안 참고)으로 바뀌어, 아트도 "밝은 애니풍 + 다크 판타지 소재"(파스텔 고딕)로 맞춥니다.
```
STYLE: polished 2D anime game illustration, clean confident lineart, soft cel shading with delicate gradients, pastel lavender, white and soft pink palette with deep violet and black accents, glowing star and sparkle motifs, bright airy lighting with gentle rim light, gothic dark-fantasy costume details (horns, chains, ribbons, thorns, skulls) rendered cute and stylish, consistent style across the set, no text, no watermark, no logo
```
**공통 네거티브**: `photorealistic, 3d render, muddy dark colors, gore, extra fingers, deformed hands, text, watermark, signature, blurry, low quality`

> 일관성 팁: 같은 모델·같은 STYLE 문구·첫 결과물을 레퍼런스로 계속 사용하세요. 한 장씩 뽑는 것이 시트보다 품질이 좋습니다.
> 배경(`bg_*`)은 밝은 황혼/파스텔 하늘 톤, 적·보스는 약간 어두운 대비색을 허용하되 라벤더 팔레트와 어울리게.

---
## 1. 모험가 초상 — 15장 `hero_{직업}_{1|2|3}.png`
- 규격: **4:5 세로, 1024×1280**, 가슴 위 흉상, 배경은 어두운 연기/안개(불투명). 앱에서 모서리가 둥글게 잘리고 등급색 테두리가 얹힙니다. 얼굴이 가운데 상단 60% 안에 오게.
- 직업마다 3종(성별·나이·외형 다르게). 프롬프트 = `STYLE` + 아래 + `bust portrait, centered, plain dark smoky background`

| 파일 | 프롬프트 |
|---|---|
| hero_warrior_1 | grizzled scarred veteran knight, dented iron helm with two broken bone horns, blood-stained tabard, glowing red eyes in the helmet slit |
| hero_warrior_2 | female berserker with half-shaved head and war paint, spiked pauldrons, chain-wrapped neck, grim stare, ember-orange eyes |
| hero_warrior_3 | massive masked executioner in rusted plate and a black leather hood, sword hilt behind shoulder, cold pale eyes |
| hero_rogue_1 | hooded female assassin with black cloth mask, cold teal glowing eyes, twin daggers crossed at shoulders |
| hero_rogue_2 | gaunt male thief with crow-feather cowl and stitched lips, amber eyes, lockpicks on bandolier |
| hero_rogue_3 | young plague-doctor-style scout with beaked leather mask pushed up, soot on cheeks, green eyes, tattered cloak |
| hero_mage_1 | gaunt old mage in tattered violet robes and crooked witch hat with antler-like horns, glowing violet eyes, floating arcane runes |
| hero_mage_2 | pale female sorceress with a veil of chains and a crown of black thorns, blood-red eyes, crimson sigils orbiting |
| hero_mage_3 | hollow-cheeked warlock with a third eye on his forehead, ash-grey robes, ink-black hands, blue ghostfire between fingers |
| hero_priest_1 | blindfolded priest, cracked golden halo, crimson stitched cross over the blindfold, black tears, tattered white and grey vestments, censer chain |
| hero_priest_2 | young nun with eyes sewn shut, thorn rosary, burnt veil, faint holy glow cracking like porcelain |
| hero_priest_3 | bald inquisitor with a branded forehead, iron mask half covering jaw, heavy book chained to belt, bloodshot gold eyes |
| hero_heretic_1 | necromancer wearing a bone skull mask with branching deer antlers, green ghostfire in eye sockets, ritual sigils painted on dark robes |
| hero_heretic_2 | cultist witch with a goat-skull headdress, black ritual paint dripping from her eyes, moth wings tattooed on neck, violet glow |
| hero_heretic_3 | hunched ghoul-like occultist, face wrapped in burial linen with a single glowing red eye, teeth necklace, candle wax dripping |

---
## 2. 일반 적 — 6장 `foe_{imp|skel|wraith|beast|knight|lord}.png`
- 규격: **1:1, 1024×1024, 투명 배경 PNG** (전신, 정면 또는 3/4, 발끝까지 보이게, 가운데 정렬). 투명 미지원 모델은 단색 배경 생성 후 rembg/remove.bg로 제거.
- 프롬프트 = `STYLE` + 아래 + `full body, centered, transparent background, game enemy sprite`

| 파일 | 프롬프트 |
|---|---|
| foe_imp | small hunched horned imp with bat wings, sooty red skin, needle teeth, glowing yellow eyes, clutching a rusted dagger |
| foe_skel | skeleton soldier in rotted chainmail with a notched sword and splintered shield, green ghostfire in eye sockets |
| foe_wraith | tattered hooded wraith floating, hollow black face with two pale blue eyes, ragged robe dissolving into smoke, skeletal hands |
| foe_beast | emaciated hellhound with exposed ribs, cracked bone armor plates, dripping jaws, three glowing red eyes |
| foe_knight | towering fallen knight in blackened horned plate armor, glowing red visor slit, huge notched greatsword dragging on ground |
| foe_lord | demonic general with curved ram horns, scarred obsidian skin, tattered war cape, molten cracks glowing orange |

## 3. 지역 보스 — 12장 `boss_01.png` ~ `boss_12.png`
- 규격: **1:1, 1024×1024, 투명 PNG**, 일반 적보다 훨씬 크고 위압적으로(전신, 오라 허용). 프롬프트 = `STYLE` + 아래 + `full body boss, centered, transparent background, imposing, large scale`

| 파일 | 지역 | 프롬프트 |
|---|---|---|
| boss_01 | 변방 폐촌 | Grak the Hollow: obese starving ogre with a hollow gut full of candles and skulls, chains and a butcher cleaver |
| boss_02 | 까마귀 숲 | Morwen of Crows: witch whose cloak is made of hundreds of crows, antlered skull crown, glowing white eyes |
| boss_03 | 뼈의 늪 | Osk, Fen King: giant bog corpse king crowned with rusted iron, rib-cage throne roots, swamp moss and leeches |
| boss_04 | 침묵의 수도원 | Veil the Sealed: gigantic priest bound in iron chains and wax seals, mouth sewn shut, bleeding stained-glass halo |
| boss_05 | 재의 광야 | Drog Ashbound: colossal knight whose armor is welded with melted swords, ash falling from joints, ember eyes |
| boss_06 | 핏빛 협곡 | Gorge Butcher: four-armed flayed brute holding hooks and cleavers, apron of stitched skin, blood-soaked |
| boss_07 | 망자의 성채 | General Kael Undying: skeletal commander in tattered crimson cloak and cracked golden armor, spectral banner |
| boss_08 | 유리 사막 | Serpha Sandeye: serpentine sand-queen with a coiled lower body, many glass-shard eyes, veil of fine chains |
| boss_09 | 얼어붙은 묘역 | Ysel the Rimelich: frost-encrusted lich with an icicle crown, hollow chest holding a frozen heart, pale cyan glow |
| boss_10 | 지옥불 관문 | Barzak Gatekeeper: three-headed hellhound-demon in a molten iron gate frame, burning chains, lava drool |
| boss_11 | 심연의 회랑 | Azath, Eye of the Deep: floating mass of black tentacles around one enormous bloodshot eye, runic rings |
| boss_12 | 마왕성 | Malkhar, Demon Lord: towering demon king with immense curved horns, obsidian crown, four glowing eyes, tattered black wings, molten sigils across chest, final-boss presence |

---
## 4. 지역 배경 — 12장 `bg_01.jpg` ~ `bg_12.jpg`
- 규격: **2:1 가로, 1536×768 JPG**. 앞쪽 하단 1/3은 비교적 비워둘 것(캐릭터가 서는 지면), 인물·텍스트 없음, 어둡게(UI 가독성).
- 프롬프트 = `STYLE` + `wide environment background, empty foreground ground, no characters,` + 아래

| 파일 | 장면 |
|---|---|
| bg_01 | burnt ruined village at dusk, collapsed cottages, blood-red sky, crooked fence |
| bg_02 | dead black forest, crows on bare branches, pale moon through fog |
| bg_03 | misty bog with half-sunken bones and will-o-wisps, green haze |
| bg_04 | ruined abbey interior, shattered stained-glass, candlelight, dust |
| bg_05 | endless grey ash wasteland, dead trees, ember-lit horizon |
| bg_06 | deep red canyon with jagged cliffs, hanging chains, blood-colored river |
| bg_07 | dark fortress courtyard with broken battlements and spectral torches |
| bg_08 | desert of glass shards under an eclipse, violet sky |
| bg_09 | frozen necropolis with ice-covered crypts and cyan fog |
| bg_10 | hellgate pass with a huge molten gate, lava cracks, black smoke |
| bg_11 | abyssal hall of black columns and floating eyes, void-purple light |
| bg_12 | demon lord's throne keep, vast obsidian hall, red braziers, towering throne silhouette |

---
## 5. 스토어/앱 에셋
| 용도 | 규격 | 프롬프트 |
|---|---|---|
| 앱 아이콘 `icons/icon-512.png` | 512×512 (원본 1024), 중요 요소는 중앙 70% | `STYLE` + horned skull-masked guild emblem, ritual circle with a sword, centered, dark crimson background, bold readable silhouette, app icon |
| 피처 그래픽 | 1024×500 | `STYLE` + party of five dark-fantasy adventurers marching toward a distant demon-lord castle under a blood moon, cinematic wide shot, empty left space for logo |
| 스크린샷 | 1080×1920 | 실제 게임 화면 캡처 (이미지 적용 후) |

## 6. 파일 용량 가이드 (최소 데이터/앱 용량)
- 전체 약 45장 → PNG는 **WebP로 변환** 권장(품질 80, 초상 ≤120KB, 적/보스 ≤200KB, 배경 JPG ≤150KB). WebP로 쓸 경우 알려 주시면 확장자만 바꿔 드립니다.
- AAB 총 이미지 합계 10MB 이내 목표.
