import { supabase } from './supabase';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'audio' | 'image';
  mediaUrl?: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  theme_id: string;
  name: string;
  is_saved: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Salvar mensagem no banco de dados
 */
export async function saveMessage(
  conversationId: string,
  userId: string,
  message: Message
): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase não configurado, usando localStorage');
    return false;
  }

  try {
    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      user_id: userId,
      role: message.role,
      content: message.content,
      type: message.type || 'text',
      media_url: message.mediaUrl,
      created_at: message.timestamp.toISOString(),
    });

    if (error) {
      console.error('Erro ao salvar mensagem:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    return false;
  }
}

/**
 * Carregar mensagens de uma conversa
 */
export async function loadMessages(
  conversationId: string,
  userId: string
): Promise<Message[]> {
  if (!supabase) {
    console.warn('Supabase não configurado, usando localStorage');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erro ao carregar mensagens:', error);
      return [];
    }

    return (data || []).map((msg: any) => ({
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.created_at),
      type: msg.type,
      mediaUrl: msg.media_url,
    }));
  } catch (error) {
    console.error('Erro ao carregar mensagens:', error);
    return [];
  }
}

/**
 * Criar ou atualizar conversa
 */
export async function saveConversation(
  conversationId: string,
  userId: string,
  themeId: string,
  name: string,
  isSaved: boolean = false
): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase não configurado, usando localStorage');
    return false;
  }

  try {
    const { error } = await supabase.from('conversations').upsert({
      id: conversationId,
      user_id: userId,
      theme_id: themeId,
      name,
      is_saved: isSaved,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Erro ao salvar conversa:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao salvar conversa:', error);
    return false;
  }
}

/**
 * Carregar conversas de um tema
 */
export async function loadConversations(
  userId: string,
  themeId?: string
): Promise<Conversation[]> {
  if (!supabase) {
    console.warn('Supabase não configurado, usando localStorage');
    return [];
  }

  try {
    let query = supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (themeId) {
      query = query.eq('theme_id', themeId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao carregar conversas:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao carregar conversas:', error);
    return [];
  }
}

/**
 * Atualizar nome da conversa
 */
export async function updateConversationName(
  conversationId: string,
  userId: string,
  newName: string
): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase não configurado, usando localStorage');
    return false;
  }

  try {
    const { error } = await supabase
      .from('conversations')
      .update({ 
        name: newName,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId)
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao atualizar nome da conversa:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar nome da conversa:', error);
    return false;
  }
}

/**
 * Marcar conversa como salva (para Espaço Livre)
 */
export async function markConversationAsSaved(
  conversationId: string,
  userId: string,
  name: string
): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase não configurado, usando localStorage');
    return false;
  }

  try {
    const { error } = await supabase
      .from('conversations')
      .update({ 
        is_saved: true,
        name,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId)
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao marcar conversa como salva:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao marcar conversa como salva:', error);
    return false;
  }
}

/**
 * Sistema híbrido: tenta salvar no banco, mas mantém localStorage como fallback
 */
export async function saveMessageHybrid(
  conversationId: string,
  userId: string,
  message: Message,
  messages: Message[]
): Promise<void> {
  // Sempre salvar no localStorage (fallback)
  const storageKey = `lumia-chat-history-${conversationId}-${userId}`;
  localStorage.setItem(storageKey, JSON.stringify(messages));

  // Tentar salvar no banco
  await saveMessage(conversationId, userId, message);
}

/**
 * Carregar mensagens do banco ou localStorage
 */
export async function loadMessagesHybrid(
  conversationId: string,
  userId: string
): Promise<Message[]> {
  // Tentar carregar do banco primeiro
  const dbMessages = await loadMessages(conversationId, userId);
  
  if (dbMessages.length > 0) {
    return dbMessages;
  }

  // Fallback para localStorage
  const storageKey = `lumia-chat-history-${conversationId}-${userId}`;
  const savedHistory = localStorage.getItem(storageKey);
  
  if (savedHistory) {
    try {
      const parsed = JSON.parse(savedHistory);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    } catch (e) {
      console.error('Erro ao carregar do localStorage:', e);
      return [];
    }
  }

  return [];
}
