// Service Worker para Lum IA PWA
// IMPORTANTE: A versão é atualizada automaticamente a cada deploy
const BUILD_TIME = '{{BUILD_TIME}}'; // Substituído no build
const CACHE_VERSION = BUILD_TIME || Date.now();
const CACHE_NAME = `lumia-v3-${CACHE_VERSION}`;
const RUNTIME_CACHE = `lumia-runtime-v3-${CACHE_VERSION}`;

// Arquivos essenciais para cache
const PRECACHE_URLS = [
  '/home', // Mudado de '/' para '/home'
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Estratégia de cache: Network First com fallback para cache
self.addEventListener('fetch', (event) => {
  // Ignorar requisições não-GET
  if (event.request.method !== 'GET') return;

  // Ignorar requisições para API (sempre buscar da rede)
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Para HTML, JS, CSS: sempre tentar rede primeiro (cache mais agressivo)
  const url = new URL(event.request.url);
  const isNavigationRequest = event.request.mode === 'navigate';
  const isAsset = /\.(js|css|html)$/.test(url.pathname);

  if (isNavigationRequest || isAsset) {
    // Network First: sempre tentar buscar da rede para evitar servir assets antigos
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cachear apenas se for sucesso
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Apenas em caso de erro de rede, usar cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              console.warn('[SW] Servindo do cache (offline):', event.request.url);
              return cachedResponse;
            }
            // Fallback para /home
            return caches.match('/home');
          });
        })
    );
    return;
  }

  // Para outros recursos (imagens, fontes): Cache First
  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((response) => {
          if (response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});

// Sincronização em background (opcional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  // Implementar lógica de sincronização de mensagens offline
  console.log('Sincronizando mensagens...');
}

// Notificações push (opcional para futuro)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova mensagem da Lum',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification('Lum IA', options)
  );
});
