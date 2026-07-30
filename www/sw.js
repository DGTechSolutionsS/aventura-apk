/* Service Worker — Aventura com Jesus (cache offline simples) */
const V = '154';   // ⚠️ BUMPAR a cada release, junto com o ?v= do index.html — senão offline serve versão velha
const CACHE = 'aventura-v' + V;
const CORE = [
  './', './index.html', `./app.css?v=${V}`, `./app.js?v=${V}`, `./data.js?v=${V}`,
  './manifest.json', './assets/img/logos/logo_aventura_branco.webp',
  './assets/img/pet_donkey.webp?v=13', './assets/img/pet_room_bg.webp?v=2'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  // cache resiliente: cada arquivo é independente (um que falhe não impede os outros)
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(CORE.map(u => c.add(u)))));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* cache-first p/ assets do app (imagens, anim, som, fontes); network-first p/ o resto */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // ignora CDN (lottie)
  const isAsset = /\/assets\/|\.(webp|png|jpg|jpeg|json|mp3|wav|ttf|css|js)(\?|$)/.test(url.pathname + url.search);
  if (isAsset) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => hit))
    );
  } else {
    e.respondWith(fetch(req).catch(() => caches.match(req).then(h => h || caches.match('./index.html'))));
  }
});
