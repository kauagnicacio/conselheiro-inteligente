import { createClient } from '@supabase/supabase-js';

// Verificar se as variáveis de ambiente estão disponíveis
// IMPORTANTE: Suportar tanto VITE_ quanto NEXT_PUBLIC_ (para compatibilidade)
const getSupabaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Cliente: tentar várias fontes
    return (
      (window as any).ENV?.VITE_SUPABASE_URL ||
      (window as any).ENV?.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      ''
    );
  }
  // Servidor: usar process.env
  return process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
};

const getSupabaseAnonKey = () => {
  if (typeof window !== 'undefined') {
    // Cliente: tentar várias fontes
    return (
      (window as any).ENV?.VITE_SUPABASE_ANON_KEY ||
      (window as any).ENV?.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      ''
    );
  }
  // Servidor: usar process.env
  return process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

// Log para debug (apenas no desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Supabase Config:', {
    url: supabaseUrl ? '✅ Configurado' : '❌ Não configurado',
    key: supabaseAnonKey ? '✅ Configurado' : '❌ Não configurado',
  });
}

// Criar cliente apenas se as credenciais estiverem disponíveis
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Flag para verificar se Supabase está configurado
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Tipos para o banco de dados
export interface UserProfile {
  id: string;
  user_id: string;
  characteristics?: Record<string, any>;
  patterns?: Record<string, any>;
  preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  tab_id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'audio' | 'image';
  media_url?: string;
  created_at: string;
}

export interface CustomTab {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface QuizResponse {
  id: string;
  user_id: string;
  quiz_id: string;
  responses: Record<string, any>;
  completed_at: string;
}
