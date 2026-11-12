# 캐릭터·몬스터 애니메이션 시트 (이동 + 공격)

AI로 만든 4×2 시트(위 줄 이동 4프레임, 아래 줄 공격 4프레임)를 게임이 재생하는 형식으로 바꿉니다.

```bash
python3 scripts/art/slice_sheet.py hero_rogue path/to/sheet.png --facing right --scale 0.5 --debug build/sheetdbg
# 흰 배경(불투명) 시트면: --alpha-from-white
# 결과: art/sheets/hero_rogue.webp + art/sheets/index.json 항목. build/sheetdbg/*_aligned.png 로 정렬 확인
```
- 프레임을 **칸이 아니라 형체로** 찾아서 칸 경계를 넘는 무기(단검 등)가 잘리지 않습니다. 8개로 분리되지 않으면(캐릭터가 서로 닿음) 중단하고 알려 줍니다. `SLICE_R=1`로 합치는 반경을 줄여 볼 수 있습니다.
- 모든 프레임을 **발 위치**(가장 아래 픽셀들의 평균 x, 가장 아래 y)에 맞춰 정렬 → 재생 중 흔들리지 않음.
- 파일 이름 규칙: 캐릭터 `hero_<직업>` (warrior/rogue/mage/priest/heretic), 몬스터 `foe_<종류>`. `--facing`은 원본 시트가 바라보는 방향(캐릭터 right, 몬스터 left). 게임이 필요하면 좌우를 뒤집습니다.
- 재생: `js/sprites.js`. 파티는 이동 루프를 계속 재생하고 스테이지 클리어 때 공격 1회 후 이동으로 복귀. 시트가 없는 직업은 기존 정적 초상으로 대체됩니다.
- 현재 시트: `hero_rogue`. (워리어·마도사·몬스터 3종 대기 중)
