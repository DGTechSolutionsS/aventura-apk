// Publica um bundle OTA: zipa o www e sobe pro backend (Railway).
// Uso:  OTA_ADMIN_SECRET=xxxx  node scripts/publish-ota.mjs [versao] [notas]
//   - versao: opcional (default = timestamp yyyymmddHHMMSS)
//   - OTA_API: opcional (default = backend de produção)
// O zip é montado com barras "/" (adm-zip) pra descompactar certo no Android.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import AdmZip from 'adm-zip';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WWW = path.join(ROOT, 'www');
const API = (process.env.OTA_API || 'https://backendtheo-production.up.railway.app/v1').replace(/\/$/, '');
// segredo: do ambiente OU de um arquivo local .ota-secret (gitignored) — nunca no repo
let SECRET = process.env.OTA_ADMIN_SECRET;
if (!SECRET) { try { SECRET = fs.readFileSync(path.join(ROOT, '.ota-secret'), 'utf8').trim(); } catch { /* noop */ } }
const VERSION = process.argv[2] || new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const NOTES = process.argv[3] || '';

if (!SECRET) { console.error('❌ Defina OTA_ADMIN_SECRET no ambiente (o mesmo valor setado na Railway).'); process.exit(1); }
if (!fs.existsSync(path.join(WWW, 'index.html'))) { console.error('❌ www/index.html não encontrado.'); process.exit(1); }

// zip do CONTEÚDO do www (index.html na raiz do zip)
const zip = new AdmZip();
zip.addLocalFolder(WWW);
const buf = zip.toBuffer();
const checksum = createHash('sha256').update(buf).digest('hex');
console.log(`📦 bundle  versao=${VERSION}  tamanho=${(buf.length / 1024 / 1024).toFixed(2)}MB  sha256=${checksum.slice(0, 12)}…`);

const url = `${API}/app/bundle?version=${encodeURIComponent(VERSION)}&notes=${encodeURIComponent(NOTES)}`;
const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/octet-stream', 'x-ota-secret': SECRET },
  body: buf,
});
const body = await res.text();
if (res.ok) console.log(`✅ publicado:`, body);
else { console.error(`❌ falhou (HTTP ${res.status}):`, body); process.exit(1); }
