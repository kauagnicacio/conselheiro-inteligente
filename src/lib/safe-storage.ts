/**
 * Utilitário seguro para localStorage/sessionStorage
 * Previne crashes por dados corrompidos, cache antigo ou storage indisponível
 */

type StorageType = 'local' | 'session';

/**
 * Obtém valor do storage de forma segura
 */
export function safeGetStorage<T = any>(
  key: string,
  defaultValue: T,
  type: StorageType = 'local'
): T {
  // Guard: só executar no client
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const item = storage.getItem(key);

    if (item === null) {
      return defaultValue;
    }

    // Tentar parsear JSON
    const parsed = JSON.parse(item);

    // Validar estrutura básica
    if (parsed === null || parsed === undefined) {
      console.warn(`[SafeStorage] Valor nulo/undefined para chave: ${key}`);
      storage.removeItem(key); // Limpar dado inválido
      return defaultValue;
    }

    return parsed as T;
  } catch (error) {
    console.error(`[SafeStorage] Erro ao ler "${key}":`, error);
    // Limpar chave corrompida
    try {
      const storage = type === 'local' ? localStorage : sessionStorage;
      storage.removeItem(key);
    } catch (e) {
      console.error(`[SafeStorage] Erro ao limpar chave corrompida "${key}":`, e);
    }
    return defaultValue;
  }
}

/**
 * Define valor no storage de forma segura
 */
export function safeSetStorage<T = any>(
  key: string,
  value: T,
  type: StorageType = 'local'
): boolean {
  // Guard: só executar no client
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const serialized = JSON.stringify(value);
    storage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[SafeStorage] Erro ao salvar "${key}":`, error);

    // Se for quota exceeded, tentar limpar storage antigo
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('[SafeStorage] Quota excedida. Limpando storage antigo...');
      try {
        clearOldStorage(type);
        // Tentar novamente
        const storage = type === 'local' ? localStorage : sessionStorage;
        storage.setItem(key, JSON.stringify(value));
        return true;
      } catch (retryError) {
        console.error('[SafeStorage] Erro ao salvar após limpeza:', retryError);
      }
    }

    return false;
  }
}

/**
 * Remove valor do storage de forma segura
 */
export function safeRemoveStorage(key: string, type: StorageType = 'local'): boolean {
  // Guard: só executar no client
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[SafeStorage] Erro ao remover "${key}":`, error);
    return false;
  }
}

/**
 * Limpa storage antigo (dados com mais de 30 dias ou chaves órfãs)
 */
function clearOldStorage(type: StorageType = 'local'): void {
  if (typeof window === 'undefined') return;

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const keysToRemove: string[] = [];
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    // Iterar por todas as chaves
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (!key) continue;

      try {
        const value = storage.getItem(key);
        if (!value) {
          keysToRemove.push(key);
          continue;
        }

        // Tentar identificar timestamp
        const parsed = JSON.parse(value);

        // Se tem timestamp ou date, verificar idade
        if (parsed?.timestamp || parsed?.date) {
          const itemDate = new Date(parsed.timestamp || parsed.date).getTime();
          if (now - itemDate > THIRTY_DAYS) {
            keysToRemove.push(key);
          }
        }
      } catch (e) {
        // Se não conseguir parsear, marcar para remoção
        keysToRemove.push(key);
      }
    }

    // Remover chaves antigas
    keysToRemove.forEach(key => {
      try {
        storage.removeItem(key);
        console.log(`[SafeStorage] Removida chave antiga: ${key}`);
      } catch (e) {
        console.error(`[SafeStorage] Erro ao remover chave antiga "${key}":`, e);
      }
    });

    console.log(`[SafeStorage] Limpeza concluída. ${keysToRemove.length} chaves removidas.`);
  } catch (error) {
    console.error('[SafeStorage] Erro durante limpeza de storage:', error);
  }
}

/**
 * Valida se uma chave existe e tem valor válido
 */
export function hasValidStorage(key: string, type: StorageType = 'local'): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const value = storage.getItem(key);

    if (!value) return false;

    // Tentar parsear para validar
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Limpa todo o storage (útil para debugging ou reset)
 */
export function clearAllStorage(type: StorageType = 'local'): void {
  if (typeof window === 'undefined') return;

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.clear();
    console.log(`[SafeStorage] ${type}Storage limpo completamente.`);
  } catch (error) {
    console.error(`[SafeStorage] Erro ao limpar ${type}Storage:`, error);
  }
}

/**
 * Migra storage antigo para nova versão (útil após mudanças de estrutura)
 */
export function migrateStorage(migrations: Record<string, (oldValue: any) => any>): void {
  if (typeof window === 'undefined') return;

  Object.entries(migrations).forEach(([key, migrateFn]) => {
    try {
      const oldValue = safeGetStorage(key, null);
      if (oldValue !== null) {
        const newValue = migrateFn(oldValue);
        safeSetStorage(key, newValue);
        console.log(`[SafeStorage] Migrada chave: ${key}`);
      }
    } catch (error) {
      console.error(`[SafeStorage] Erro ao migrar "${key}":`, error);
      safeRemoveStorage(key); // Remover se migração falhar
    }
  });
}
