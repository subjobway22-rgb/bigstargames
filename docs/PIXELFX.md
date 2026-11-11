# pixelfx 연동 가이드 (Guild of Ash)

[pixelfx](https://github.com/patch-gg/pixelfx) (MIT)는 픽셀아트 이펙트 244개를 코드로 만든 라이브러리입니다.
이 게임(**플레이스토어 출시용 모바일 게임**, 이 Claude 창에서도 테스트 플레이 가능)에서는 이펙트를 **스프라이트 시트(PNG+JSON)로 렌더**해서 게임이 재생합니다.

## 구성 한눈에 보기
```
third_party/pixelfx.lock.json   고정 버전 (v0.3.1, 커밋 044e12a…)  ← 진실의 원천
third_party/pixelfx/            그 버전의 소스(src, tools, 문서). 수정 금지, MANIFEST.sha256로 체크섬 검증
.claude/skills/pixelfx/         Claude 스킬 (클라우드 세션에서도 항상 로드)
.claude/commands/fx.md          /fx 슬래시 명령
CLAUDE.md                       Claude가 항상 보는 프로젝트 규칙 (pixelfx 사용 지시)
scripts/fx/                     fetch · verify · list · preview · export · new · check · menu
scripts/fx/presets.json         게임 이벤트 ↔ 이펙트 연결표
fx/custom/                      우리가 새로 만드는 이펙트
art/fx/                         내보낸 시트 + index.json (앱에 포함)
js/fx.js                        런타임 재생기 (안드로이드 WebView / 브라우저 / Claude 미리보기 공통)
THIRD_PARTY_NOTICES.md          MIT 크레딧 (앱 더보기 > 오픈소스 라이선스에 표시)
```

## 1. Claude Code 플러그인 설치 (직접 입력 필요)
슬래시 명령은 사용자가 Claude Code 입력창에 직접 쳐야 합니다 (Claude가 대신 실행할 수 없음).
```
/plugin marketplace add patch-gg/pixelfx
/plugin install pixelfx@pixelfx
```
> 플러그인은 pixelfx의 최신 기본 브랜치를 따라가므로 **고정 버전이 아닙니다.**
> 이 저장소는 위 명령 없이도 `.claude/skills/pixelfx` + `third_party/pixelfx`(고정)만으로 클라우드 작업에서 모든 기능이 동작합니다.
> 플러그인은 내 PC에서 다른 프로젝트에도 쓰고 싶을 때만 설치하세요. 둘 다 켜면 스킬이 두 벌 보일 수 있으니 이 게임에서는 저장소 스킬을 기준으로 합니다.

## 2. 고정 버전과 업데이트
- 받기/복구: `npm run fx:fetch` (잠금 파일의 커밋만 받습니다. 커밋·버전·MIT 라이선스를 검증하고 폰트/갤러리는 복사하지 않음)
- 무결성 검사: `npm run fx:verify` (체크섬, 라이선스 고지, 폰트 금지, 시트/인덱스 일치)
- 버전 올리기(신중히): `npm run fx:fetch -- --update <커밋sha 40자> --version <x.y.z>` → diff 검토 → `npm run fx:presets` → `npm run fx:verify` → 플레이 확인

## 3. 렌더 → 시트 → 게임 (파이프라인)
| 단계 | 명령 |
|---|---|
| 찾기 | `npm run fx:list -- frost` |
| 눈으로 확인 | `npm run fx:preview -- fire/torch --gif` → `build/fx-preview/fire/torch/contact.png` |
| 시트로 내보내기 | `npm run fx:export -- ice/frost-nova --palette ice` → `art/fx/ice/frost-nova.png/json` |
| 게임 이벤트에 연결 | `scripts/fx/presets.json`에 항목 추가 후 `npm run fx:presets` |
| 코드에서 발동 | `js/ui.js`에서 `queueFx('프리셋이름')` |
| 메뉴로 한 번에 | `npm run fx:menu` (또는 Claude에서 `/fx`) |

현재 연결된 이벤트: `hit`(스테이지 클리어) · `bossDown`(보스 처치) · `enhance`(강화) · `guildUp`(길드 확장).
시트 JSON은 Aseprite 형식이라 나중에 Unity/Godot/Phaser로 옮겨도 그대로 읽힙니다 (이 프로젝트는 Unity가 아니라서 Unity 임포터는 만들지 않았습니다. 필요하면 요청하세요).

## 4. 새 이펙트 만들기
`npm run fx:new -- arcane/my-spell` → `fx/custom/…` 초안 → `fx:preview -- … --custom`으로 보고 고치고 → `fx:check -- … --custom` → `fx:export -- … --custom`.
Claude에게 "마도사 궁극기에 얼음 폭발 넣어줘"처럼 말하면 스킬이 초안 3~5개 → 렌더 → 관찰 → 수정 루프를 돕니다.

## 5. 앱 크기·데이터
- 서버 통신 0 (시트는 앱에 포함). 현재 4개 시트 합계 약 1.2 MB.
- 시트는 한 변 4096px 이하만 허용(초과 시 export 실패). 긴 이펙트는 `--fps 20`.
- 설정 > "픽셀 이펙트" 토글과 OS의 "동작 줄이기" 설정을 존중합니다.

## 6. 라이선스 (중요)
- pixelfx 코드·이펙트: **MIT** (c) 2026 Patch, Hugo Duprez. 내부에 Sprite Fusion(Hugo Duprez, MIT)과 Hollow Crown(rehan-remade, MIT) 코드가 포함되어 있어 `THIRD_PARTY_NOTICES.md`에 모두 기재했고, 앱 안에서도 볼 수 있습니다.
- **Patch Pixel 폰트는 MIT가 아니며(Patch 소유, 모든 권리 보유) 사용하지 않습니다.** 업스트림 `gallery/fonts/`에만 있고 우리는 `gallery/`를 받지 않습니다. 폰트 파일이나 `@font-face`가 생기면 `fx:verify`가 실패합니다.
- 이펙트 안의 "LEVEL UP!" 같은 글자는 pixelfx 코어의 자체 비트맵 폰트(MIT)로 그려진 것입니다.
- 이 스킬은 업스트림의 "Patch에 게임 게시" 단계를 제거했습니다 (이 게임은 구글 플레이로 출시).

## 7. 이 창에서 테스트 플레이
`npm start` → http://localhost:8080 (Claude 앱의 미리보기로 확인). 이펙트 디버그: 주소 뒤에 `?debug`를 붙이고 `window.__fx.play('bossDown')`.
