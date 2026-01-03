"use client";

import { useState, useEffect } from "react";
import { Plus, MessageCircle, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp: Date;
}

interface ThemeChatsProps {
  themeId: string;
  themeName: string;
  userId: string;
  onBack: () => void;
  onSelectChat: (chatId: string) => void;
}

const themeGreetings: Record<string, string> = {
  "espaco-livre": "Esse é seu espaço. Me conta o que você está sentindo.",
  "relacionamento": "Vamos conversar sobre seus relacionamentos? Como você está se sentindo?",
  "familia": "Como estão as coisas com sua família?",
  "trabalho": "O que está acontecendo no trabalho?",
  "tomada-decisao": "Que decisão está te ocupando agora?",
};

export function ThemeChats({ themeId, themeName, userId, onBack, onSelectChat }: ThemeChatsProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    loadChats();
  }, [themeId, userId]);

  const loadChats = () => {
    const storageKey = `lumia-theme-chats-${themeId}-${userId}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const converted = parsed.map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp),
        }));
        setChats(converted);
      } catch (e) {
        console.error("Erro ao carregar conversas:", e);
        setChats([]);
      }
    }
  };

  const handleNewChat = () => {
    const newChatId = `${themeId}-${uuidv4()}`;
    const newChat: Chat = {
      id: newChatId,
      name: `Conversa em ${themeName}`,
      timestamp: new Date(),
    };

    const storageKey = `lumia-theme-chats-${themeId}-${userId}`;
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    localStorage.setItem(storageKey, JSON.stringify(updatedChats));

    // Criar histórico inicial com mensagem da Lum
    const greeting = themeGreetings[themeId] || themeGreetings["espaco-livre"];
    const initialMessage = {
      role: "assistant",
      content: greeting,
      timestamp: new Date(),
    };
    
    const historyKey = `lumia-chat-history-${newChatId}-${userId}`;
    localStorage.setItem(historyKey, JSON.stringify([initialMessage]));

    onSelectChat(newChatId);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (confirm("Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita.")) {
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      setChats(updatedChats);
      
      const storageKey = `lumia-theme-chats-${themeId}-${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedChats));
      
      const historyKey = `lumia-chat-history-${chatId}-${userId}`;
      localStorage.removeItem(historyKey);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-[#1a1a1a] dark:via-[#212121] dark:to-[#1a1a1a]">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {themeName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Suas conversas sobre este tema
          </p>
        </div>

        {/* New Chat Button */}
        <Button
          onClick={handleNewChat}
          className="w-full mb-6 h-14 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Conversa
        </Button>

        {/* Chats List */}
        {chats.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Nenhuma conversa ainda
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Clique em "Nova Conversa" para começar
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className="w-full group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-sm hover:shadow-md transition-all p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {chat.name}
                      </h3>
                      {chat.lastMessage && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {chat.lastMessage}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {chat.timestamp.toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </Button>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
