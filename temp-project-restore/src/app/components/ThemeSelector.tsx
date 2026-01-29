"use client";

import { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Heart, 
  Users, 
  Briefcase, 
  Target,
  ChevronRight,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadConversations, type Conversation } from "@/lib/chat-storage";

interface Theme {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
  glowColor: string;
}

const themes: Theme[] = [
  {
    id: "espaco-livre",
    name: "Espaço Livre",
    icon: MessageCircle,
    description: "Para conversar sobre qualquer coisa",
    color: "text-blue-400",
    glowColor: "border-blue-500/50 hover:shadow-blue-500/20"
  },
  {
    id: "relacionamento",
    name: "Relacionamento",
    icon: Heart,
    description: "Amor, namoro e conexões afetivas",
    color: "text-pink-400",
    glowColor: "border-pink-500/50 hover:shadow-pink-500/20"
  },
  {
    id: "familia",
    name: "Família",
    icon: Users,
    description: "Relações familiares e vínculos",
    color: "text-emerald-400",
    glowColor: "border-emerald-500/50 hover:shadow-emerald-500/20"
  },
  {
    id: "trabalho",
    name: "Trabalho",
    icon: Briefcase,
    description: "Carreira, projetos e vida profissional",
    color: "text-amber-400",
    glowColor: "border-amber-500/50 hover:shadow-amber-500/20"
  },
  {
    id: "tomada-decisao",
    name: "Tomada de decisão",
    icon: Target,
    description: "Escolhas importantes e dilemas",
    color: "text-purple-400",
    glowColor: "border-purple-500/50 hover:shadow-purple-500/20"
  }
];

interface ThemeSelectorProps {
  onSelectTheme: (themeId: string) => void;
  onSelectChat?: (chatId: string) => void;
  userId?: string;
}

export function ThemeSelector({ onSelectTheme, onSelectChat, userId }: ThemeSelectorProps) {
  const [savedConversations, setSavedConversations] = useState<Conversation[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && userId) {
      loadSavedConversations();
      
      // Escutar mudanças no localStorage para atualizar lista
      const handleStorageChange = () => {
        console.log('[ThemeSelector] Storage event detectado - recarregando conversas');
        loadSavedConversations();
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      // Polling a cada 1 segundo para garantir atualização
      const interval = setInterval(() => {
        loadSavedConversations();
      }, 1000);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [isClient, userId]);

  const loadSavedConversations = async () => {
    if (!userId) return;

    // Priorizar localStorage (mais rápido e confiável)
    const storageKey = `lumia-saved-conversations-${userId}`;
    const saved = localStorage.getItem(storageKey);
    
    console.log('[ThemeSelector] Carregando conversas salvas');
    console.log('[ThemeSelector] Storage key:', storageKey);
    console.log('[ThemeSelector] Dados brutos:', saved);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('[ThemeSelector] Conversas parseadas:', parsed);
        
        // Filtrar apenas conversas com isSaved = true
        const savedOnly = parsed.filter((conv: any) => conv.isSaved);
        console.log('[ThemeSelector] Conversas filtradas (isSaved=true):', savedOnly);
        
        const mapped = savedOnly.map((conv: any) => ({
          id: conv.id,
          user_id: userId,
          theme_id: conv.themeId || "espaco-livre",
          name: conv.name,
          is_saved: true,
          created_at: conv.createdAt || new Date().toISOString(),
          updated_at: conv.updatedAt || new Date().toISOString(),
        }));
        
        console.log('[ThemeSelector] Conversas mapeadas:', mapped);
        console.log('[ThemeSelector] Total de conversas salvas:', mapped.length);
        setSavedConversations(mapped);
        return;
      } catch (e) {
        console.error("[ThemeSelector] Erro ao carregar conversas salvas:", e);
      }
    } else {
      console.log('[ThemeSelector] Nenhuma conversa salva encontrada no localStorage');
    }

    // Fallback para banco de dados
    try {
      const dbConversations = await loadConversations(userId);
      console.log('[ThemeSelector] Conversas do banco:', dbConversations);
      
      if (dbConversations.length > 0) {
        // Filtrar apenas conversas salvas (is_saved = true)
        const saved = dbConversations.filter(conv => conv.is_saved);
        console.log('[ThemeSelector] Conversas salvas do banco:', saved);
        setSavedConversations(saved);
      }
    } catch (e) {
      console.error("[ThemeSelector] Erro ao carregar do banco:", e);
    }
  };

  const handleDeleteSavedChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm("Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita.")) {
      return;
    }

    // Remover do estado
    setSavedConversations(prev => prev.filter(conv => conv.id !== chatId));

    // Remover do localStorage
    if (userId) {
      const storageKey = `lumia-saved-conversations-${userId}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const updated = parsed.filter((conv: any) => conv.id !== chatId);
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (e) {
          console.error("Erro ao remover conversa:", e);
        }
      }

      // Remover histórico
      const historyKey = `lumia-chat-history-${chatId}-${userId}`;
      localStorage.removeItem(historyKey);
    }
  };

  const getThemeInfo = (themeId: string) => {
    return themes.find(t => t.id === themeId) || themes[0];
  };

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">
            Suas Conversas
          </h1>
          <p className="text-base md:text-lg text-gray-400">
            Escolha um tema para começar ou continuar
          </p>
        </div>

        {/* Temas Fixos */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-100 mb-4 px-2">
            Temas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {themes.map((theme) => {
              const Icon = theme.icon;

              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[#212121] border ${theme.glowColor}`}
                >
                  {/* Content */}
                  <div className="relative p-6 flex flex-col items-start text-left min-h-[180px]">
                    {/* Icon com cor do tema */}
                    <div className={`mb-4 p-3 bg-gray-800/50 rounded-xl backdrop-blur-sm group-hover:bg-${theme.color.split('-')[1]}-500/10 transition-colors`}>
                      <Icon className={`w-7 h-7 ${theme.color} transition-colors`} />
                    </div>

                    {/* Title com acento de cor */}
                    <h3 className={`text-xl font-bold text-gray-100 mb-2 group-hover:${theme.color} transition-colors`}>
                      {theme.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-3 flex-1">
                      {theme.description}
                    </p>

                    {/* Indicador de continuidade */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium">
                        Conversa contínua
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect com cor do tema */}
                  <div className={`absolute inset-0 bg-${theme.color.split('-')[1]}-500/0 group-hover:bg-${theme.color.split('-')[1]}-500/5 transition-colors pointer-events-none`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversas Salvas */}
        {savedConversations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 px-2">
              Conversas Salvas ({savedConversations.length})
            </h2>
            <div className="space-y-3">
              {savedConversations.map((conv) => {
                const themeInfo = getThemeInfo(conv.theme_id);
                const Icon = themeInfo.icon;

                return (
                  <button
                    key={conv.id}
                    onClick={() => onSelectChat?.(conv.id)}
                    className="w-full group relative overflow-hidden rounded-xl bg-[#212121] border border-gray-700 hover:border-purple-600 shadow-sm hover:shadow-md transition-all p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`p-2 rounded-lg bg-gray-800/50`}>
                          <Icon className={`w-5 h-5 ${themeInfo.color}`} />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className="font-medium text-gray-100 truncate">
                            {conv.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(conv.updated_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDeleteSavedChat(conv.id, e)}
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            💡 Organize sua vida por contextos emocionais
          </p>
        </div>
      </div>
    </div>
  );
}
