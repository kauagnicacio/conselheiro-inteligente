/**
 * Gerenciador de Cache e Storage
 * Limpa cache antigo e valida storage ao carregar o app
 */

const APP_VERSION = "3.0.0"; // Incrementar a cada deploy significativo
const VERSION_KEY = "lumia-app-version";

/**
 * Inicializa o gerenciador de cache
 * Deve ser chamado uma única vez ao carregar o app
 */
export async function initializeCacheManager(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const savedVersion = localStorage.getItem(VERSION_KEY);

    // Se a versão mudou, limpar cache antigo
    if (savedVersion !== APP_VERSION) {
      console.log(`[CacheManager] Nova versão detectada: ${savedVersion} -> ${APP_VERSION}`);
      await clearOldCache();
      validateAndCleanStorage();
      localStorage.setItem(VERSION_KEY, APP_VERSION);
      console.log('[CacheManager] Cache atualizado com sucesso');
    }
  } catch (error) {
    console.error('[CacheManager] Erro ao inicializar:', error);
    // Em caso de erro, tentar limpar tudo
    try {
      await clearAllCaches();
    } catch (e) {
      console.error('[CacheManager] Erro ao limpar cache de emergência:', e);
    }
  }
}

/**
 * Limpa cache antigo do Service Worker
 */
async function clearOldCache(): Promise<void> {
  if (!('caches' in window)) return;

  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(
      name => !name.includes('v3') // Manter apenas v3
    );

    await Promise.all(
      oldCaches.map(cacheName => {
        console.log(`[CacheManager] Deletando cache antigo: ${cacheName}`);
        return caches.delete(cacheName);
      })
    );

    console.log(`[CacheManager] ${oldCaches.length} caches antigos removidos`);
  } catch (error) {
    console.error('[CacheManager] Erro ao limpar cache:', error);
  }
}

/**
 * Valida e limpa localStorage corrompido
 */
function validateAndCleanStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    const keysToRemove: string[] = [];

    // Iterar por todas as chaves
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      try {
        const value = localStorage.getItem(key);
        if (!value) {
          keysToRemove.push(key);
          continue;
        }

        // Tentar parsear para validar
        JSON.parse(value);
      } catch (e) {
        // Se não conseguir parsear, marcar para remoção
        console.warn(`[CacheManager] Chave corrompida detectada: ${key}`);
        keysToRemove.push(key);
      }
    }

    // Remover chaves inválidas
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
        console.log(`[CacheManager] Removida chave corrompida: ${key}`);
      } catch (e) {
        console.error(`[CacheManager] Erro ao remover chave "${key}":`, e);
      }
    });

    if (keysToRemove.length > 0) {
      console.log(`[CacheManager] ${keysToRemove.length} chaves corrompidas removidas`);
    }
  } catch (error) {
    console.error('[CacheManager] Erro ao validar storage:', error);
  }
}

/**
 * Limpa todos os caches (emergência)
 */
async function clearAllCaches(): Promise<void> {
  if (!('caches' in window)) return;

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    console.log('[CacheManager] Todos os caches foram limpos (modo emergência)');
  } catch (error) {
    console.error('[CacheManager] Erro ao limpar todos os caches:', error);
  }
}

/**
 * Força reload completo ignorando cache
 * Útil para debugging
 */
export function forceHardReload(): void {
  if (typeof window === 'undefined') return;

  try {
    // Desregistrar service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => registration.unregister());
      });
    }

    // Limpar todos os caches
    clearAllCaches().then(() => {
      // Reload forçado
      window.location.reload();
    });
  } catch (error) {
    console.error('[CacheManager] Erro ao forçar reload:', error);
    window.location.reload();
  }
}

/**
 * Monitora erros globais relacionados a storage
 */
export function setupStorageErrorHandling(): void {
  if (typeof window === 'undefined') return;

  // Capturar erros de quota exceeded
  window.addEventListener('error', (event) => {
    if (event.error?.name === 'QuotaExceededError') {
      console.error('[CacheManager] Quota excedida. Limpando storage antigo...');
      validateAndCleanStorage();
      event.preventDefault();
    }
  });

  // Capturar erros não tratados de storage
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (reason?.name === 'QuotaExceededError' || reason?.message?.includes('quota')) {
      console.error('[CacheManager] Erro de quota detectado:', reason);
      validateAndCleanStorage();
      event.preventDefault();
    }
  });
}
