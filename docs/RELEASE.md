# 릴리스 가이드 (Google Play · AAB / APK / ZIP · GitHub)

## 1. 산출물 3종
| 파일 | 용도 | 서명 |
|---|---|---|
| `guild-of-ash-v<버전>-release.aab` | **구글 플레이 콘솔에 올리는 파일.** 신규 앱은 AAB만 등록 가능 | 업로드 키로 서명 (키스토어 시크릿 필요) |
| `guild-of-ash-v<버전>-debug.apk` | 내 폰에 바로 설치해 테스트 (구글 플레이에는 못 올림) | 디버그 키 (항상 만들어짐) |
| `guild-of-ash-v<버전>-release.apk` | 서명된 릴리스 APK (스토어 외 배포·QA용) | 업로드 키 (키스토어 시크릿이 있을 때만) |
| `guild-of-ash-v<버전>-web.zip` | 앱에 들어가는 웹 빌드. 압축 풀고 http로 서빙하면 브라우저에서 플레이 | - |
| `guild-of-ash-v<버전>-source.zip` | 현재 커밋의 깨끗한 소스 스냅샷 | - |
| `SHA256SUMS.txt` | 위 파일들의 해시 | - |

## 2. 받는 곳 (GitHub)
저장소의 **Actions → "Android release build"** 실행 결과의 *Artifacts* 에서 받습니다. 모든 push / PR / 수동 실행(Run workflow)이 빌드합니다.
버전 태그를 푸시하면 **초안 Release**가 자동으로 만들어지고 파일이 모두 첨부됩니다. 검토 후 Publish 하세요.
```bash
# package.json 의 version 과 같아야 합니다 (예: 0.1.0)
git tag v0.1.0 && git push origin v0.1.0
```

## 3. 처음 한 번: 업로드 키 만들기 + GitHub 시크릿 (직접 해야 합니다)
키는 **본인 PC에서** 만들고 절대 커밋/공유하지 마세요. (Claude 클라우드 세션에서 만들지 않습니다.)
1. `bash scripts/android/make-keystore.sh` → `guild-of-ash-upload.jks` 생성. **파일과 비밀번호를 안전한 곳에 백업**하세요(분실 시 업데이트가 어려워집니다. Play App Signing을 쓰면 구글이 앱 서명 키를 따로 보관하므로 업로드 키는 재설정 요청이 가능합니다).
2. GitHub 저장소 → Settings → Secrets and variables → Actions → *New repository secret*:

| Secret | 값 |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | `base64 -w0 guild-of-ash-upload.jks` 출력 (macOS: `base64 -i …`) |
| `ANDROID_KEYSTORE_PASSWORD` | 키스토어 비밀번호 |
| `ANDROID_KEY_ALIAS` | `upload` (스크립트 기본값) |
| `ANDROID_KEY_PASSWORD` | 키 비밀번호 |

3. 선택: Variables에 `VERSION_CODE_OFFSET` (숫자). 플레이는 **versionCode가 계속 증가**해야 하며, 워크플로는 `run 번호 + 오프셋`을 씁니다.
시크릿이 없으면 AAB는 **서명되지 않아 플레이에 올릴 수 없고**, 빌드 로그에 경고가 표시됩니다 (debug APK와 ZIP은 정상 생성).

## 4. 로컬에서 빌드하려면
```bash
npm ci
export ANDROID_HOME=/path/to/android-sdk     # platforms;android-36, build-tools;36.0.0 필요
npm run package                 # ZIP 2종만
npm run package:android         # + debug APK + AAB (키스토어 환경변수가 있으면 서명된 release APK/AAB)
# 서명하려면: ANDROID_KEYSTORE_FILE / ANDROID_KEYSTORE_PASSWORD / ANDROID_KEY_ALIAS / ANDROID_KEY_PASSWORD
```
결과는 `dist/`. (`dist/`는 git에 올라가지 않습니다.)

## 5. 출시 전 반드시 바꿀 것 (플레이스홀더)
| 항목 | 위치 | 상태 |
|---|---|---|
| **AdMob 앱 ID** | `android/app/src/main/AndroidManifest.xml` `com.google.android.gms.ads.APPLICATION_ID` | 지금은 **구글 공식 테스트 ID**. 실제 ID로 교체 |
| **AdMob 광고 단위 ID** | `js/admob.js` (`UNIT`, `initializeForTesting`) | 테스트 ID. 교체 + 테스트 모드 해제 |
| **패키지 이름** | `capacitor.config.json` `appId`, `android/app/build.gradle` `applicationId/namespace` | 임시 `com.bigstargames.guildofash`. **출시 후에는 변경 불가**이므로 지금 확정 |
| 앱 이름·아이콘 | `capacitor.config.json`, `icons/icon.svg` → `npm run android:assets` | 임시 엠블럼. 최종 아트로 교체 |
| 클라우드 백업 서버 | `window.BSG_API` | 미사용이면 UI를 숨기거나 HTTPS 서버 배포 |

## 6. 플레이 콘솔 체크리스트
- 앱 만들기 → **내부 테스트 트랙**에 AAB 업로드 → 테스터 설치 확인 → 프로덕션.
- **Play App Signing** 사용(기본). 우리가 올리는 키는 *업로드 키*.
- 타깃 API: 현재 **targetSdk 36**, minSdk 24 (Capacitor 8 기본값). 구글의 신규 앱 요구 수준은 해마다 오르니 출시 시점에 확인.
- **개인정보처리방침 URL**(필수, 광고 사용), **데이터 보안(Data safety)** 양식: 광고 ID 사용 신고, 플레이 중 서버 전송 없음(백업 사용 시 저장 데이터 전송), 콘텐츠 등급(판타지 폭력), "광고 포함" 표시.
- EU/영국 사용자 대상이면 **UMP 동의(GDPR)**, 미국 일부 주 CCPA: AdMob 플러그인의 consent API 연동 필요 (**아직 미구현**).
- 스토어 등록 정보: 아이콘 512×512 → `store/icon-512.png`, 피처 그래픽 1024×500, 스크린샷(폰 2장 이상), 짧은/긴 설명, 10개 언어는 필요한 만큼.
- 새 개인 개발자 계정은 프로덕션 전에 **비공개 테스트 12명·14일** 요건이 있을 수 있음(계정 종류에 따라 다름 — 콘솔 안내 확인).

## 7. 아직 안 된 것 / 알아둘 점
- 플레이용 **서명된 AAB는 사용자 업로드 키가 있어야** 만들어집니다 (위 3번). 키 없이 만든 AAB는 서명되지 않은 파일입니다.
- 실제 기기·에뮬레이터 설치 테스트는 하지 못했습니다(이 환경에는 에뮬레이터가 없음). APK를 폰에 설치해 확인해 주세요.
- 광고는 테스트 ID 상태입니다. 실광고·동의 흐름은 미구현.
- 이미지는 아직 임시 SVG입니다 (`docs/ART_PROMPTS.md`).
