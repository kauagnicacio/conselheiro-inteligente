/**
 * Utilidades para normalizar e formatar timestamps de forma segura
 */

/**
 * Normaliza qualquer tipo de timestamp para um objeto Date válido
 * @param timestamp - Pode ser Date, string, number ou qualquer outro tipo
 * @returns Date válido ou Date atual se inválido
 */
export function normalizeTimestamp(timestamp: any): Date {
  // Se já é uma instância de Date válida, retornar
  if (timestamp instanceof Date && !isNaN(timestamp.getTime())) {
    return timestamp;
  }

  // Se for string ou number, tentar converter
  if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Se for objeto com propriedades de data (ex: {seconds, nanoseconds} do Firestore)
  if (timestamp && typeof timestamp === 'object') {
    // Formato Firestore Timestamp
    if ('seconds' in timestamp && 'nanoseconds' in timestamp) {
      return new Date(timestamp.seconds * 1000);
    }

    // Formato ISO/JSON serializado
    if ('_seconds' in timestamp || '_nanoseconds' in timestamp) {
      return new Date((timestamp._seconds || timestamp.seconds || 0) * 1000);
    }
  }

  // Fallback: retornar data atual se não conseguir converter
  console.warn('[TimestampUtils] Timestamp inválido detectado:', timestamp);
  return new Date();
}

/**
 * Formata timestamp de forma segura para exibição
 * @param timestamp - Timestamp a ser formatado
 * @param options - Opções de formatação (padrão: HH:MM)
 * @returns String formatada ou fallback "--:--"
 */
export function formatTimestamp(
  timestamp: any,
  options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
): string {
  try {
    const date = normalizeTimestamp(timestamp);
    return date.toLocaleTimeString('pt-BR', options);
  } catch (error) {
    console.error('[TimestampUtils] Erro ao formatar timestamp:', error);
    return '--:--';
  }
}

/**
 * Normaliza array de mensagens convertendo todos os timestamps
 * @param messages - Array de mensagens com timestamps
 * @returns Array de mensagens com timestamps normalizados
 */
export function normalizeMessages(messages: any[]): any[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages.map(msg => {
    if (!msg) return msg;

    return {
      ...msg,
      timestamp: normalizeTimestamp(msg.timestamp)
    };
  });
}
