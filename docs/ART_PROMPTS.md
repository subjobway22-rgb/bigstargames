# 아트 제작 프롬프트 (Guild of Ash)

**이 문서의 모든 코드 블록은 그대로 한 번만 복사하면 됩니다.** (스타일·투명 배경 조건·금지 항목이 이미 각 프롬프트에 들어 있습니다.)
파일을 저장소의 표시된 경로에 **그 이름 그대로** 넣으면 적용됩니다. 없으면 기존 벡터(SVG) 그림이 대신 나옵니다.
이 문서는 `scripts/art/assets.json`에서 자동 생성됩니다 (`node scripts/art/build-prompts.mjs`). 직접 고치지 말고 JSON을 고치세요.

| 표시 | 뜻 |
|---|---|
| ✅ | 게임 코드가 이미 이 파일을 읽음 (넣으면 바로 적용) |
| 🔧 | 파일이 오면 코드에 연결해야 함 (경로·이름은 고정) |

## 먼저 읽기
- **투명 PNG가 필요한 항목**은 프롬프트에 `fully transparent background (PNG with alpha channel)`가 들어 있습니다. 모델에 **투명 배경 옵션**(예: 이미지 API의 `background: transparent`)이 있으면 켜세요.
  없으면 프롬프트의 `fully transparent background (PNG with alpha channel)`를 `on a flat solid pure magenta #FF00FF background, no gradient`로 바꿔 뽑은 뒤 **배경 제거 도구**(rembg, remove.bg, Photoshop)로 지웁니다. (녹색은 팔레트의 ghostfire와 섞여서 비추천)
- **배경(bg_*)과 스토어 아이콘·피처 그래픽은 불투명**입니다. 그 프롬프트는 이미 불투명 조건으로 들어 있습니다.
- **일관성:** 같은 모델·같은 세션에서 카테고리별로 한 번에, 한 장씩 뽑으세요. 첫 결과물 1장을 레퍼런스 이미지로 첨부하고 프롬프트 끝에 `Match the exact style, line weight and palette of the attached reference image.` 를 덧붙이면 일관성이 크게 좋아집니다.
- 이펙트(타격·보스 처치·강화)는 이미지가 필요 없습니다 (pixelfx 코드 이펙트, `docs/PIXELFX.md`).
- 우선순위: ① 모험가 초상 ② 보스 ③ 재화·탭·직업 아이콘 ④ 등급 프레임 ⑤ 배경 ⑥ 나머지. 앱 전체 이미지 합계 15MB 이내 목표.


---

## 모험가 초상 15장 ✅

**규격:** 4:5 세로 1024x1280 · 투명 PNG · 가슴 위 흉상 (카드 배경·등급 테두리는 게임이 그림)

### `art/hero_warrior_1.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, grizzled scarred veteran knight, dented iron helm with two broken bone horns, blood-stained tabard, glowing red eyes in the helmet slit. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_warrior_2.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, female berserker, half-shaved head, red war paint, spiked pauldrons, chain wrapped around the neck, grim stare, ember-orange eyes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_warrior_3.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, massive masked executioner in rusted plate and a black leather hood, sword hilt behind the shoulder, cold pale eyes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_rogue_1.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, hooded female assassin with a black cloth mask, cold teal glowing eyes, twin daggers crossed at her shoulders. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_rogue_2.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, gaunt male thief in a crow-feather cowl, stitched lips, amber eyes, lockpicks on a bandolier. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_rogue_3.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, young plague-scout, beaked leather mask pushed up on the forehead, soot on cheeks, green eyes, tattered cloak. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_mage_1.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, gaunt old mage, tattered violet robes, crooked witch hat with antler-like horns, glowing violet eyes, floating arcane runes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_mage_2.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, pale sorceress with a veil of chains and a crown of black thorns, blood-red eyes, crimson sigils orbiting her. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_mage_3.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, hollow-cheeked warlock with a third eye on the forehead, ash-grey robes, ink-black hands, blue ghostfire between the fingers. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_priest_1.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, blindfolded priest, cracked golden halo, crimson stitched cross over the blindfold, black tears, tattered white and grey vestments, censer chain. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_priest_2.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, young nun with eyes sewn shut, thorn rosary, burnt veil, faint holy glow cracking like porcelain. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_priest_3.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, bald inquisitor with a branded forehead, iron mask covering half the jaw, heavy chained book at the belt, bloodshot gold eyes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_heretic_1.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, necromancer in a bone skull mask with branching deer antlers, green ghostfire in the eye sockets, ritual sigils painted on dark robes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_heretic_2.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, cultist witch with a goat-skull headdress, black ritual paint dripping from her eyes, moth wings tattooed on the neck, violet glow. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/hero_heretic_3.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. bust portrait, head and shoulders, front to three-quarter view, face in the upper 60% of the frame, hunched ghoulish occultist, face wrapped in burial linen with a single glowing red eye, tooth necklace, dripping candle wax. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 일반 적 6장 ✅

**규격:** 1:1 1024x1024 · 투명 PNG · 전신

### `art/foe_imp.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body game enemy sprite, three-quarter view facing left, feet visible, small hunched horned imp with bat wings, sooty red skin, needle teeth, glowing yellow eyes, clutching a rusted dagger. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/foe_skel.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body game enemy sprite, three-quarter view facing left, feet visible, skeleton soldier in rotted chainmail with a notched sword and splintered shield, green ghostfire in the eye sockets. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/foe_wraith.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body game enemy sprite, three-quarter view facing left, feet visible, tattered hooded wraith floating, hollow black face with two pale blue eyes, ragged robe dissolving into smoke, skeletal hands. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/foe_beast.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body game enemy sprite, three-quarter view facing left, feet visible, emaciated hellhound, exposed ribs, cracked bone armor plates, dripping jaws, three glowing red eyes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/foe_knight.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body game enemy sprite, three-quarter view facing left, feet visible, towering fallen knight in blackened horned plate armor, glowing red visor slit, huge notched greatsword dragging on the ground. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/foe_lord.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body game enemy sprite, three-quarter view facing left, feet visible, demonic general with curved ram horns, scarred obsidian skin, tattered war cape, molten cracks glowing orange. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 지역 보스 12장 ✅

**규격:** 1:1 1024x1024 · 투명 PNG · 전신 · 일반 적보다 크고 위압적 (오라도 투명 배경 위에)

### `art/boss_01.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Grak the Hollow: obese starving ogre with a hollow belly full of candles and skulls, chains and a butcher cleaver. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_02.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Morwen of Crows: witch whose cloak is made of hundreds of crows, antlered skull crown, glowing white eyes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_03.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Osk, Fen King: giant bog corpse king crowned with rusted iron, ribcage throne roots, swamp moss and leeches. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_04.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Veil the Sealed: gigantic priest bound in iron chains and wax seals, mouth sewn shut, bleeding stained-glass halo. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_05.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Drog Ashbound: colossal knight whose armor is welded from melted swords, ash falling from the joints, ember eyes. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_06.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Gorge Butcher: four-armed flayed brute holding hooks and cleavers, apron of stitched skin, blood-soaked. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_07.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, General Kael Undying: skeletal commander in a tattered crimson cloak and cracked golden armor, spectral banner. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_08.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Serpha Sandeye: serpentine sand queen with a coiled lower body, many glass-shard eyes, a veil of fine chains. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_09.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Ysel the Rimelich: frost-encrusted lich with an icicle crown, hollow chest holding a frozen heart, pale cyan glow. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_10.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Barzak Gatekeeper: three-headed hellhound-demon inside a molten iron gate frame, burning chains, lava drool. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_11.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Azath, Eye of the Deep: floating mass of black tentacles around one enormous bloodshot eye, runic rings. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/boss_12.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. full body boss, imposing, large scale, three-quarter view facing left, Malkhar, Demon Lord: towering demon king, immense curved horns, obsidian crown, four glowing eyes, tattered black wings, molten sigils across the chest, final-boss presence. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 지역 배경 12장 (유일하게 불투명 JPG) ✅

**규격:** 2:1 가로 1536x768 · 불투명 JPG · 아래 1/3은 비움(캐릭터가 서는 지면) · 인물·글자 없음 · 어둡게

### `art/bg_01.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, burnt ruined village at dusk, collapsed cottages, blood-red sky, crooked fence. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_02.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, dead black forest, crows on bare branches, pale moon through fog. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_03.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, misty bog with half-sunken bones and will-o-wisps, green haze. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_04.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, ruined abbey interior, shattered stained glass, candlelight, dust. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_05.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, endless grey ash wasteland, dead trees, ember-lit horizon. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_06.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, deep red canyon with jagged cliffs, hanging chains, blood-colored river. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_07.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, dark fortress courtyard with broken battlements and spectral torches. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_08.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, desert of glass shards under an eclipse, violet sky. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_09.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, frozen necropolis with ice-covered crypts and cyan fog. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_10.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, hellgate pass with a huge molten gate, lava cracks, black smoke. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_11.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, abyssal hall of black columns and floating eyes, void-purple light. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/bg_12.jpg`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. wide environment background, empty foreground ground in the lower third, no characters, demon lord's throne keep, vast obsidian hall, red braziers, towering throne silhouette. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 재화 아이콘 3장 🔧

**규격:** 256x256 · 투명 PNG

### `art/ui/ico_gold.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI icon, flat front view, thick dark outline, readable at 48px, a single heavy tarnished-gold coin with an embossed horned skull and a cracked rim. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/ico_soul.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI icon, flat front view, thick dark outline, readable at 48px, a floating soul wisp: a pale violet-white flame shaped like a teardrop with a tiny screaming face inside. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/ico_essence.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI icon, flat front view, thick dark outline, readable at 48px, a blood-red diamond crystal wrapped in a thin black thorn ring, a rune glowing inside. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 하단 탭 아이콘 4장 🔧

**규격:** 128x128 · 투명 PNG · 밝은 뼈색 한 톤 + 어두운 외곽선 (활성/비활성은 게임이 밝기로 처리)

### `art/ui/tab_quest.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI icon, flat front view, thick dark outline, readable at 48px, two crossed swords over a small skull, single-tone bone white #d8cfb8 with a dark outline. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/tab_guild.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI icon, flat front view, thick dark outline, readable at 48px, a heater shield with a horned emblem, single-tone bone white #d8cfb8 with a dark outline. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/tab_recruit.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI icon, flat front view, thick dark outline, readable at 48px, a hooded silhouette holding a rolled contract scroll with a wax seal, single-tone bone white #d8cfb8 with a dark outline. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/tab_more.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI icon, flat front view, thick dark outline, readable at 48px, three glowing runic dots in a row inside a thin circle, single-tone bone white #d8cfb8 with a dark outline. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 직업 엠블럼 5장 🔧

**규격:** 256x256 · 투명 PNG · 5장 모두 같은 메달 틀

### `art/ui/class_warrior.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI class emblem, circular medal with the same black iron rim and bone-white edge on every emblem, flat front view, readable at 48px, a broken horned helmet in the center of the medal. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/class_rogue.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI class emblem, circular medal with the same black iron rim and bone-white edge on every emblem, flat front view, readable at 48px, a crossed pair of daggers and a crow feather in the center of the medal. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/class_mage.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI class emblem, circular medal with the same black iron rim and bone-white edge on every emblem, flat front view, readable at 48px, a witch hat and a violet star in the center of the medal. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/class_priest.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI class emblem, circular medal with the same black iron rim and bone-white edge on every emblem, flat front view, readable at 48px, a cracked halo over a blindfold in the center of the medal. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/class_heretic.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI class emblem, circular medal with the same black iron rim and bone-white edge on every emblem, flat front view, readable at 48px, an antlered skull and a green flame in the center of the medal. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 등급 프레임 4장 🔧

**규격:** 512x640 (4:5) · 투명 PNG · 가운데가 완전히 뚫린 테두리 · 4장 같은 구도·두께

### `art/ui/frame_C.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI portrait card frame, 4:5 vertical ornate border only, the entire inside of the frame is empty and fully transparent, border thickness about 8% of the width, same layout and thickness as the rest of the set, plain worn iron frame, scratched, ash grey. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/frame_R.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI portrait card frame, 4:5 vertical ornate border only, the entire inside of the frame is empty and fully transparent, border thickness about 8% of the width, same layout and thickness as the rest of the set, steel frame with small blue-grey gems in the corners, thin silver inlay. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/frame_E.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI portrait card frame, 4:5 vertical ornate border only, the entire inside of the frame is empty and fully transparent, border thickness about 8% of the width, same layout and thickness as the rest of the set, dark violet metal frame with thorny vines and glowing purple runes on the corners. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/frame_L.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI portrait card frame, 4:5 vertical ornate border only, the entire inside of the frame is empty and fully transparent, border thickness about 8% of the width, same layout and thickness as the rest of the set, ornate tarnished-gold frame with horns on the top corners, a small third-eye gem at the top center, faint ember glow. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 버튼·패널·바 (9-slice 틀) 🔧

**규격:** 각 크기는 표 참고 · 투명 PNG · 글자 없음 · 모서리만 장식, 가운데·변은 단순하게

### `art/ui/btn_primary.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, pill-shaped button 384x128, dried-blood red enamel with a dark iron rim and tiny rivets. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/btn_secondary.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, pill-shaped button 384x128, ash-grey stone with a dark iron rim and tiny rivets. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/btn_ad.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, pill-shaped button 384x128, tarnished gold with a dark rim and a faint ember glow. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/panel_card.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, card panel 512x256, dark iron-bound parchment, worn edges, subtle corner studs. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/panel_modal.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, large pop-up panel 512x512, ornate dark iron border with bone-white corner skulls, plain center. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/bar_frame.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, long thin progress-bar frame 1024x64, dark iron with studs, empty transparent interior. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/bar_fill.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, progress bar fill 256x32, blood-red to ember gradient with a glossy top edge, seamless horizontally. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/banner_boss.png`
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game UI element, 9-slice friendly: ornate corners only with a plain stretchable center and plain straight edges, flat front view, no text, torn black war banner ribbon 1024x256 with a skull crown in the center, empty cloth area, no text. isolated single UI element, centered, fully transparent background (PNG with alpha channel), no ground shadow, no scene backdrop, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 광고 보상 · 아이템 9장 🔧

**규격:** 256x256 · 투명 PNG

### `art/ui/item_boost.png` — 골드 2배 광고
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, an hourglass with golden sand and a glowing double-strike rune (a rune, no letters or digits), cracked bone frame. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_scroll.png` — 새 지원자 명단
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, a rolled parchment contract with a blood-red wax seal and a quill. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_souls.png` — 영혼 +5
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, a small leather pouch spilling glowing violet soul wisps. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_chest.png` — 오프라인 보상
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, a closed iron-bound treasure chest with a skull lock, faint gold light leaking through the seam. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_chest_open.png` — 보상 수령
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, the same chest opened, gold coins and a violet gem spilling out, golden light rays. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_summon.png` — 영혼 소환
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, a floating violet soul crystal in a ritual circle of runes, glowing. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_gold_s.png` — 골드 소
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, a tiny pile of five tarnished gold coins. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_gold_m.png` — 골드 중
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, a medium pile of gold coins and a goblet. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `art/ui/item_gold_l.png` — 골드 대
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. game item icon, flat front view, thick dark outline, readable at 64px, a heap of gold coins, jewels and a crown. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 앱 아이콘 · 스토어 🔧

**규격:** 파일별 규격 참고 (아이콘은 불투명, 전경은 투명)

### `store/icon-1024.png` — 1024x1024 · 불투명
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. app icon with a bold silhouette readable at 48px: a horned skull-masked guild emblem inside a blood-red ritual circle with a gold dashed inner ring, dark background fully opaque, centered, no text. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `store/icon-foreground.png` — 1024x1024 · 투명
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. the same horned skull-masked guild emblem and ritual circle only, with no background, kept entirely inside the central 66% of the canvas (Android adaptive icon safe zone), no text. isolated single subject, centered with about 10% empty margin, fully transparent background (PNG with alpha channel), no ground shadow, no backdrop, no frame, no text, no letters, no watermark, no signature, clean edges, nothing cropped. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```

### `store/feature-1024x500.png` — 1024x500 · 불투명
```
dark fantasy occult 2D game asset, hand-painted look with bold clean dark outlines and visible brush texture, slightly stylized proportions (Darkest Dungeon and Hades inspired), limited desaturated palette of ash grey #2b2830, dried-blood red #8c1d2b, bone white #d8cfb8, tarnished gold #b8923a, ember orange #c4572b, ghostfire green #6f8f5a and void violet #463368, single soft key light from the upper left with a darker lower-right edge, consistent line weight and rendering across the whole set. cinematic wide key art of a party of five dark-fantasy adventurers marching toward a distant demon lord castle under a blood moon, empty area on the left for a logo, no text. fully opaque full-frame image, no transparency, no text, no letters, no watermark, no signature. Avoid: photorealistic, 3d render, anime, chibi, cute, glossy plastic, neon colors, bright cheerful lighting, blurry, low quality, extra fingers, deformed hands.
```


---

## 납품 규격 · 용량
- 투명 PNG는 **원본 그대로** 전달 (용량을 줄이려면 WebP, 투명 유지, 품질 80 → 확장자만 알려주면 코드를 바꿉니다).
- 목표 용량: 초상 ≤150KB, 적/보스 ≤250KB, 아이콘 ≤40KB, 프레임/버튼 ≤60KB, 배경 JPG ≤180KB.
- 총 81장. 장비 아이템은 이 게임에 없습니다(모험가 + 재화 구조). 장비 시스템이 생기면 `item_weapon_*` 등을 추가 설계합니다.
- 스크린샷(1080×1920)은 생성하지 않고 이미지 적용 후 실제 게임 화면을 캡처합니다.
