#!/usr/bin/env bash
# Create YOUR Google Play UPLOAD KEY, once, on YOUR OWN computer (never in a cloud/CI session, never commit it).
#   bash scripts/android/make-keystore.sh
# Then follow docs/RELEASE.md > "GitHub Secrets" to hand it to the build. Back the .jks file up somewhere safe.
set -euo pipefail
OUT="${1:-guild-of-ash-upload.jks}"
ALIAS="${2:-upload}"
[ -e "$OUT" ] && { echo "$OUT already exists - refusing to overwrite"; exit 1; }
command -v keytool >/dev/null || { echo "keytool not found: install a JDK (17 or 21)"; exit 1; }
echo "You will be asked for a keystore password, a key password and your name/organisation."
keytool -genkeypair -v -keystore "$OUT" -alias "$ALIAS" -keyalg RSA -keysize 2048 -validity 10000
echo
echo "Created $OUT (alias: $ALIAS). Base64 for the GitHub secret ANDROID_KEYSTORE_BASE64:"
echo "  base64 -w0 $OUT        (macOS: base64 -i $OUT)"
