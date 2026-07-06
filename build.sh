#!/bin/bash
set -e
# >>> AJUSTE estes 2 caminhos pra sua maquina (uma vez):
export JAVA_HOME="${JAVA_HOME:-/c/Program Files/Eclipse Adoptium/jdk-17}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/AppData/Local/Android/Sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
cd "$(dirname "$0")"
echo ">> cap sync (copia www + plugins)..."
npx cap sync android
echo ">> build release assinado..."
cd android && ./gradlew assembleRelease --no-daemon
echo ""
echo "APK pronto: android/app/build/outputs/apk/release/app-release.apk"
