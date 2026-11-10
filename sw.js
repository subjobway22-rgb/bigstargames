const C = 'goa-v1', FILES = ['./', 'index.html', 'style.css', 'manifest.webmanifest', 'icons/icon.svg', 'js/ui.js', 'js/game.js', 'js/data.js', 'js/art.js', 'js/i18n.js', 'js/ads.js', 'js/sync.js'];
self.addEventListener('install', (e) => e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => { if (e.request.method !== 'GET' || new URL(e.request.url).pathname.startsWith('/api/')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
