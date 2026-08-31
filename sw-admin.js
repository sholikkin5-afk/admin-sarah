const CACHE_NAME = 'sarahmart-admin-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  'manifest-admin.json'
];

// INSTALL - Simpen file penting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATE - Hapus cache lawas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH - Ambil dari internet, nek gagal baru ambil cache
self.addEventListener('fetch', (event) => {
  // Abaikan upload gambar ke supabase
  if (event.request.url.includes('supabase.co')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});