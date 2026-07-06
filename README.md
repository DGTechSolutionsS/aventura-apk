# aventura-apk — build do app Android (Capacitor)

Projeto que empacota o app web **Aventura com Jesus** num APK Android assinado.
`appId`: `br.com.aventuracomjesus` · assinado com a **keystore original** (mesma assinatura → updates instalam por cima).

> Recriado 2026-07-06 a partir da keystore + config do sócio (a pasta `android/` original não veio no zip). O insubstituível — a **keystore** (`aventura-release.jks`, SHA-256 confere com o APK atual) — está aqui.

## Estrutura
```
aventura-apk/
├── www/                     # o app (cópia de theo-clone/app, sem assets/audio — narração streama)
├── android/                 # projeto nativo Capacitor (gerado por `cap add android`)
│   ├── app/build.gradle     # config de build + ASSINATURA (versionCode 34 / 3.9.1)
│   └── keystore.properties  # caminho + senhas da chave  (NÃO vai pro git)
├── aventura-release.jks     # a CHAVE de assinatura         (NÃO vai pro git)
├── capacitor.config.json    # SplashScreen + LocalNotifications + GoogleAuth
├── package.json             # Capacitor 6 + plugins
└── build.sh                 # gera o APK assinado
```

## Pré-requisitos (instalar 1 vez)
- **Node 20+** (já tem)
- **JDK 17** (Temurin/Adoptium) — o Gradle do Android exige o 17 (não serve o 8)
- **Android SDK** (via Android Studio ou command-line tools) com `platforms;android-34` + `build-tools`

## Como gerar o APK
1. Abra `build.sh` e ajuste as 2 primeiras linhas (`JAVA_HOME` e `ANDROID_HOME`) pros caminhos da sua máquina.
2. Rode:
   ```bash
   ./build.sh
   ```
3. APK sai em: `android/app/build/outputs/apk/release/app-release.apk`

## Atualizar o app
1. Edite o app em **`www/`** (ou recopie de `theo-clone/app/`: `rm -rf www && cp -R ../theo-quiz/app/. www/ && rm -rf www/assets/audio`).
2. **Suba a versão** em `android/app/build.gradle` (`versionCode` e `versionName`) a cada release.
3. `./build.sh` → APK novo, mesma assinatura → **instala por cima** do anterior.

## 🔑 Segurança (IMPORTANTE)
- `aventura-release.jks` + `android/keystore.properties` estão no **`.gitignore`** — **nunca** commite.
- **Faça backup** desses 2 arquivos num cofre/Drive privado. Perder = nunca mais atualizar o app.
- Senha/alias estão no `LEIA-ME-keystore.txt` do zip original (guarde junto, fora do git).

## Login com Google (pendente)
O `capacitor.config.json` já tem a config do **GoogleAuth**, mas o plugin não foi reinstalado nesta recriação. O app funciona com **login por e-mail**; pra reativar o botão Google:
```bash
npm i @codetrix-studio/capacitor-google-auth && npx cap sync android
```
(o `serverClientId` já está na config; o SHA-1 da chave já está registrado no Google Cloud).
