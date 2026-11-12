#!/usr/bin/env node
// Expands scripts/art/assets.json into docs/ART_PROMPTS.md: every image gets ONE self-contained prompt block
// (style + subject + transparent-background requirement + avoid-list already merged), so you copy it once.
//   node scripts/art/build-prompts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const A = JSON.parse(readFileSync(join(__dirname_(), 'assets.json'), 'utf8'));
function __dirname_() { return join(ROOT, 'scripts', 'art'); }
const tail = (k, it) => { const m = it.extra ?? k; return m === 'O' ? A.opaque : m === 'F' ? A.transparentFrame : A.transparent; };
const out = [];
out.push(`# 아트 제작 프롬프트 (Guild of Ash)

**이 문서의 모든 코드 블록은 그대로 한 번만 복사하면 됩니다.** (스타일·투명 배경 조건·금지 항목이 이미 각 프롬프트에 들어 있습니다.)
파일을 저장소의 표시된 경로에 **그 이름 그대로** 넣으면 적용됩니다. 없으면 기존 벡터(SVG) 그림이 대신 나옵니다.
이 문서는 \`scripts/art/assets.json\`에서 자동 생성됩니다 (\`node scripts/art/build-prompts.mjs\`). 직접 고치지 말고 JSON을 고치세요.

| 표시 | 뜻 |
|---|---|
| ✅ | 게임 코드가 이미 이 파일을 읽음 (넣으면 바로 적용) |
| 🔧 | 파일이 오면 코드에 연결해야 함 (경로·이름은 고정) |

## 먼저 읽기
- **지금은 \`docs/ART_PROMPTS_BATCH1.md\`(UI · 캐릭터 3종 · 몬스터 3종, 이동+공격 시트)부터 만드세요.** 이 문서는 전체 목록(나머지)입니다.
- **투명 PNG가 필요한 항목**은 프롬프트에 \`fully transparent background (PNG with alpha channel)\`가 들어 있습니다. 모델에 **투명 배경 옵션**(예: 이미지 API의 \`background: transparent\`)이 있으면 켜세요.
  없으면 프롬프트의 \`fully transparent background (PNG with alpha channel)\`를 \`on a flat solid pure magenta #FF00FF background, no gradient\`로 바꿔 뽑은 뒤 **배경 제거 도구**(rembg, remove.bg, Photoshop)로 지웁니다. (녹색은 팔레트의 ghostfire와 섞여서 비추천)
- **배경(bg_*)과 스토어 아이콘·피처 그래픽은 불투명**입니다. 그 프롬프트는 이미 불투명 조건으로 들어 있습니다.
- **일관성:** 같은 모델·같은 세션에서 카테고리별로 한 번에, 한 장씩 뽑으세요. 첫 결과물 1장을 레퍼런스 이미지로 첨부하고 프롬프트 끝에 \`Match the exact style, line weight and palette of the attached reference image.\` 를 덧붙이면 일관성이 크게 좋아집니다.
- 이펙트(타격·보스 처치·강화)는 이미지가 필요 없습니다 (pixelfx 코드 이펙트, \`docs/PIXELFX.md\`).
- 우선순위: ① 모험가 초상 ② 보스 ③ 재화·탭·직업 아이콘 ④ 등급 프레임 ⑤ 배경 ⑥ 나머지. 앱 전체 이미지 합계 15MB 이내 목표.
`);
let n = 0;
for (const g of A.groups) {
  out.push(`\n---\n\n## ${g.title} ${g.wired ? '✅' : '🔧'}\n\n**규격:** ${g.spec}\n`);
  for (const it of g.items) {
    n++;
    const subject = it.desc.replace(/^\((.*?)\)\s*/, '');
    const use = (it.desc.match(/^\((.*?)\)/) || [])[1];
    const isStore = g.id === 'store';
    const body = isStore
      ? `${A.style}. ${it.desc.replace(/^STYLE /, '')}. ${tail(g.suffix, it)}. ${A.avoid}.`
      : `${A.style}. ${g.lead ? g.lead + ' ' : ''}${subject}. ${tail(g.suffix, it)}. ${A.avoid}.`;
    out.push(`### \`${it.file}\`${use ? ` — ${use}` : ''}${it.size ? ` — ${it.size}` : ''}\n\`\`\`\n${body.replace(/\s+/g, ' ').replace(/\.\./g, '.')}\n\`\`\`\n`);
  }
}
out.push(`\n---\n\n## 납품 규격 · 용량\n- 투명 PNG는 **원본 그대로** 전달 (용량을 줄이려면 WebP, 투명 유지, 품질 80 → 확장자만 알려주면 코드를 바꿉니다).\n- 목표 용량: 초상 ≤150KB, 적/보스 ≤250KB, 아이콘 ≤40KB, 프레임/버튼 ≤60KB, 배경 JPG ≤180KB.\n- 총 ${n}장. 장비 아이템은 이 게임에 없습니다(모험가 + 재화 구조). 장비 시스템이 생기면 \`item_weapon_*\` 등을 추가 설계합니다.\n- 스크린샷(1080×1920)은 생성하지 않고 이미지 적용 후 실제 게임 화면을 캡처합니다.\n`);
writeFileSync(join(ROOT, 'docs', 'ART_PROMPTS.md'), out.join('\n'));
console.log(`docs/ART_PROMPTS.md: ${n} self-contained prompts`);
