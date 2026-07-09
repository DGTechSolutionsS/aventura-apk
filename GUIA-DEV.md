# Guia de desenvolvimento — App "Aventura com Jesus"

Guia pra quem vai mexer no app daqui pra frente. App pt-BR cristão infantil (histórias bíblicas, orações, meditações, narrações em áudio). É um **PWA vanilla** (HTML/CSS/JS, sem framework, sem build) empacotado num app **Android via Capacitor**, que **atualiza sozinho via OTA** (não precisa reinstalar pra mudar conteúdo/código).

## 🗺️ MAPA — LEIA ISTO PRIMEIRO (pra não misturar tudo)

São **3 peças**. Grave bem:

```
1) FUNIL  ................  repo "theo-quiz"  (GitHub: DGTechSolutionsS/theo-quiz)
   = o SITE DE VENDAS (aventuracomjesus.com). Vende a assinatura.
   ⚠️ mexer com MUITO cuidado — tem os robôs de email/WhatsApp dos clientes.
   → dentro dele tem a pasta /app = a versão WEB do app + a FONTE do app.

2) APP  ..................  é o PRODUTO que o cliente usa. Mora em DOIS lugares
   (é o MESMO app, copiado):
     • theo-quiz/app/    → versão WEB   (roda no navegador, aventuracomjesus.com/app)
     • aventura-apk/www/ → MESMA coisa, empacotada como APP ANDROID (o APK)
   O "aventura-apk" é o EMPACOTADOR que vira o APK. Repo próprio.

3) BACKEND  ..............  servidor na Railway.
   Guarda o progresso do usuário (sync) + os pacotes de atualização (OTA).
```

**Como um update chega no cliente:**
- Mudou o app? → edita em `theo-quiz/app/` → copia pro `aventura-apk/www/` → roda `publish-ota.mjs`.
  Isso atualiza o **app Android sozinho** (OTA), sem reinstalar.
- A **versão WEB** é atualizada separado (deploy do funil) — e hoje ela está **atrás** (sem OTA/sync). Não confunda: **web e Android são atualizados por caminhos diferentes.**

**Regra de ouro:** o **app Android** atualiza via **OTA** (mexe no `aventura-apk`). O **funil/web** é outra história — mexe com cuidado.

---

## 1) As peças (onde mora o quê)
- **Fonte do app:** `theo-quiz/app/` → `index.html`, `app.js` (~1700 linhas), `data.js` (todo o conteúdo), `app.css`, `sw.js`. **Essa é a fonte da verdade.**
- **APK (Android):** `aventura-apk/` → Capacitor 6, appId `br.com.aventuracomjesus`. Os arquivos do app ficam em `aventura-apk/www/` (espelho da fonte).
- **Backend (Railway):** Fastify + Postgres + Prisma (TypeScript/ESM). Faz: login/JWT, **sync** do progresso, webhook do Stripe e **hospeda os bundles OTA**. Base: `https://backendtheo-production.up.railway.app`. **Código:** repo `DGTechSolutionsS/BackendTheo` (privado), deploy automático na Railway a cada push. Endpoints OTA: `GET /v1/app/latest`, `GET /v1/app/bundle/:versao`, `POST /v1/app/bundle` (header `x-ota-secret`). ⚠️ Só mexe aqui pra **lógica de servidor** (auth/sync/OTA) — pro app do dia-a-dia **não precisa**.
- **Mídia:** áudios (`.m4a`) num projeto Vercel (`apk-download`); vídeos no **Cloudflare Stream**.
- **Funil (site de vendas):** projeto SEPARADO. **NÃO mexer sem cuidado** (tem engines de email/WhatsApp que nutrem os leads).

## 2) Fluxo do dia-a-dia: atualizar conteúdo/código (OTA)
Isso cobre 95% dos updates (texto, telas, lógica, novo conteúdo):
1. Edita os arquivos em `theo-quiz/app/` (a fonte).
2. Copia o que mudou pro APK: `cp theo-quiz/app/app.js aventura-apk/www/` (idem `data.js`, `index.html`, etc. se mudaram).
3. `cd aventura-apk && node scripts/publish-ota.mjs <versao> "notas"` — zipa o `www` e sobe pro backend.
4. Pronto. Os apps instalados pegam sozinhos: **baixam em 2º plano no boot e aplicam no boot seguinte** (abre → fecha → abre).

- **Versão:** use números crescentes (ex.: 143, 144...). Ver a atual: `curl https://backendtheo-production.up.railway.app/v1/app/latest`
- **Offline:** o app funciona sem net; só não recebe o novo. Conectou, atualiza.
- **Precisa do segredo:** o script lê `aventura-apk/.ota-secret` (gitignored) — tem que ser idêntico à env `OTA_ADMIN_SECRET` no backend (Railway). Use hex puro (sem char especial).

## 3) Adicionar mídia
- **Áudio (narração):** sobe o `.m4a` no host `apk-download` (pasta `/audio/`, nome = `<id>.m4a`) e adiciona o `id` nas listas `NARRATED`/`DR_NARRATED` do `data.js`. Áudio é **streamado** (não entra no bundle → mantém o app leve; mas precisa de net pra tocar a 1ª vez).

  **Como subir o áudio no `apk-download` (IMPORTANTE — tem pegadinha):** o `apk-download` é um projeto **Vercel deployado por CLI** (não por git). Ele guarda `index.html` + o APK + `audio/*.m4a`. **Cada deploy é um snapshot COMPLETO** — se você deployar uma pasta faltando arquivos, **apaga os que faltaram** (some áudio do ar!). Então:
  1. Precisa de **acesso ao projeto Vercel `apk-download`** (`vercel login` na conta que o gerencia).
  2. Monta uma pasta com **TUDO que já está no ar + o áudio novo**. Como não guardamos a fonte, dá pra **re-baixar os áudios atuais** do próprio ar (são os `<id>.m4a` das listas `NARRATED`/`DR_NARRATED`): `curl -o audio/<id>.m4a https://apk-download-eight.vercel.app/audio/<id>.m4a` pra cada um.
  3. Na pasta, linka ao projeto e deploya: `vercel link --project apk-download --yes && vercel deploy --prod --yes`.
  4. Confere: `curl -I https://apk-download-eight.vercel.app/audio/<id-novo>.m4a` → tem que dar **200**.
  5. Só então referencia o `id` no `data.js` e publica o OTA (passo 2).
  - **Rollback:** deu ruim (sumiu áudio)? O Vercel guarda os deploys → re-promove o anterior (`vercel ls apk-download` → promove o de antes). Instantâneo.
- **Vídeo:** sobe no Cloudflare Stream, pega o ID e cola no campo `video:` do item no `data.js`.
- **Imagem de capa:** imagem pequena pode ir no app (`www/assets`) → entra no bundle. Imagem grande é melhor streamar (senão engorda o download de toda atualização).
- Depois de referenciar no `data.js` → publica OTA (passo 2).

## 4) OTA vs Nativo (o limite)
- **DÁ por OTA (só publicar bundle, sem reinstalar):** telas, textos, lógica (`app.js`), conteúdo (`data.js`), estilos, imagens do bundle. **Notificação LOCAL** já tem o plugin embutido → dá pra ligar/agendar por OTA.
- **NÃO dá por OTA (exige APK novo):** trocar **ícone**, **permissões**, **plugin nativo novo**, **push do servidor** (FCM/Firebase). Isso precisa buildar e redistribuir o APK (ou, no futuro na Play, atualiza sozinho).

## 5) Buildar o APK (só quando mexer em NATIVO)
- **Ambiente:** `JAVA_HOME` = JDK embutido do Android Studio (`.../Android Studio/jbr`, é JDK 21); `ANDROID_HOME` = `~/AppData/Local/Android/Sdk`. Precisa do **SDK Platform 35** instalado.
- **Config:** `android/variables.gradle` → `compileSdk 35`, `minSdk 23`, `targetSdk 34` (o Capgo exige compileSdk 35 e minSdk 23). `android.suppressUnsupportedCompileSdk=35` no `gradle.properties`.
- **BUMPA o `versionCode`** em `android/app/build.gradle` — tem que ser **MAIOR** que o do APK anterior, senão o Android recusa a atualização.
- **Copia o www:** `npx cap copy android` antes de buildar (senão o `www` novo não entra no APK).
- **Build assinado:** `cd android && ./gradlew assembleRelease` → sai `android/app/build/outputs/apk/release/app-release.apk`.
- **Assinatura:** SEMPRE a mesma keystore `aventura-release.jks` (cert SHA-256 `027c2e2e01e7d9bd785490ec3c559c4e8cab1f47cf477273845bb035f569655f`). Se mudar a assinatura, **não instala por cima** do app dos usuários. Confere com `apksigner verify --print-certs app-release.apk`.
- **Distribuir:** troca o arquivo `aventura-com-jesus.apk` no host de download (Vercel `apk-download`, mesma URL) e avisa quem já tem o app pra baixar de novo (instala por cima, mantém os dados).

## 6) Regras de ouro / cuidados
- 🔑 **A keystore `aventura-release.jks` é insubstituível** → faz **backup fora da máquina**. Perdeu = nunca mais atualiza o app.
- 🚫 **Não deployar o funil local em produção** — o funil em prod diverge do git (tem código deployado direto). Deploy do local por cima **quebra/reverte o site**.
- 🔒 **Segredos** (`.ota-secret`, `keystore.properties`, chaves de API) são gitignorados → **nunca commitar**.
- 📦 O OTA usa **bundle cheio** (~15MB): cada atualização re-baixa tudo (não só a diferença). Ok pra escala pequena; o Capgo limpa bundles antigos.
- 🌐 Versão WEB (site): se atualizar o app no site, bumpa `?v=` no `index.html` **E** o `V` no `sw.js` juntos (senão o service worker serve o cache velho).

## 7) Comandos rápidos
```bash
# publicar update de conteúdo/código (o normal do dia-a-dia)
cd aventura-apk && node scripts/publish-ota.mjs <versao> "notas"

# ver versão OTA publicada agora
curl https://backendtheo-production.up.railway.app/v1/app/latest

# buildar APK novo (só quando mexer em nativo)
cd aventura-apk && npx cap copy android && cd android && ./gradlew assembleRelease
```
