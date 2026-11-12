#!/usr/bin/env node
// Build the release deliverables into dist/.
//
//   npm run package                 ZIPs only (web build + source)           -> works anywhere
//   npm run package -- --android    + debug APK, + signed release APK and AAB when the keystore env vars are set
//                                     (needs the Android SDK; GitHub Actions does this for you, see .github/workflows/android.yml)
//
// Outputs (v = version from package.json):
//   guild-of-ash-v<v>-release.aab         Google Play upload (AAB). Signed only if ANDROID_KEYSTORE_* are set.
//   guild-of-ash-v<v>-release.apk         signed release APK (only with a keystore)
//   guild-of-ash-v<v>-debug.apk           installable test APK (debug-signed)
//   guild-of-ash-v<v>-web.zip             the playable web build (what ships inside the app)
//   guild-of-ash-v<v>-source.zip          clean source snapshot of the current commit (git archive)
//   SHA256SUMS.txt
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, readFileSync, writeFileSync, copyFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..'), DIST = join(ROOT, 'dist');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const args = process.argv.slice(2), wantAndroid = args.includes('--android');
const versionName = process.env.VERSION_NAME || pkg.version;
const versionCode = process.env.VERSION_CODE || String(1 + (+execFileSync('git', ['rev-list', '--count', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim() || 0));
const base = `guild-of-ash-v${versionName}`;
const run = (cmd, a, opts = {}) => { const r = spawnSync(cmd, a, { cwd: ROOT, stdio: 'inherit', ...opts }); if (r.status !== 0) throw new Error(`${cmd} ${a.join(' ')} failed (${r.status})`); };

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
const made = [];

// 1) the web build + ZIP
run(process.execPath, ['scripts/build-www.js']);
run('zip', ['-q', '-r', '-X', join(DIST, `${base}-web.zip`), '.'], { cwd: join(ROOT, 'www') });
made.push(`${base}-web.zip`);

// 2) clean source ZIP of the committed tree (uncommitted changes are NOT included: say so)
const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' }).trim();
if (dirty) console.warn('WARNING: uncommitted changes are not in the source ZIP (git archive uses HEAD).');
run('git', ['archive', '--format=zip', `--prefix=guild-of-ash/`, '-o', join(DIST, `${base}-source.zip`), 'HEAD']);
made.push(`${base}-source.zip`);

// 3) Android
if (wantAndroid) {
  if (!process.env.ANDROID_HOME && !process.env.ANDROID_SDK_ROOT) throw new Error('Android SDK not found (set ANDROID_HOME). Use the GitHub Actions workflow instead: docs/RELEASE.md');
  run('npx', ['cap', 'sync', 'android']);
  const gradle = join(ROOT, 'android', process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
  const props = [`-PversionName=${versionName}`, `-PversionCode=${versionCode}`];
  const signed = !!process.env.ANDROID_KEYSTORE_FILE;
  const tasks = [':app:assembleDebug', ...(signed ? [':app:assembleRelease', ':app:bundleRelease'] : [':app:bundleRelease'])];
  run(gradle, [...tasks, ...props, '--no-daemon'], { cwd: join(ROOT, 'android') });
  const out = join(ROOT, 'android', 'app', 'build', 'outputs');
  const take = (from, name) => { if (existsSync(from)) { copyFileSync(from, join(DIST, name)); made.push(name); } else console.warn('missing: ' + from); };
  take(join(out, 'apk', 'debug', 'app-debug.apk'), `${base}-debug.apk`);
  if (signed) take(join(out, 'apk', 'release', 'app-release.apk'), `${base}-release.apk`);
  take(join(out, 'bundle', 'release', 'app-release.aab'), `${base}-release.aab`);
  if (!signed) console.warn('NOTE: no ANDROID_KEYSTORE_FILE -> the AAB is UNSIGNED and cannot be uploaded to Google Play. See docs/RELEASE.md (upload key).');
}

// 4) checksums
const sums = made.map((f) => `${createHash('sha256').update(readFileSync(join(DIST, f))).digest('hex')}  ${f}`).join('\n') + '\n';
writeFileSync(join(DIST, 'SHA256SUMS.txt'), sums);
console.log(`\nversion ${versionName} (code ${versionCode}) -> dist/`);
for (const f of made) console.log(`  ${f.padEnd(44)} ${(statSync(join(DIST, f)).size / 1048576).toFixed(2)} MB`);
