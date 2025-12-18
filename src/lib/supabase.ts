import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
