"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Plus, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Chat {
  id: string;
  name: string;
  themeId: string;
  createdAt: number;
  lastMessage?: string;
}

interface ThemeChatsProps {
  themeId: string;
  themeName: string;
  userId: string;
  onBack: () => void;
  onSelectChat: (chatId: string) => void;
}

export function ThemeChats({ themeId, themeName, userId, onBack, onSelectChat }: ThemeChatsProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  // Carregar chats do tema
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`lumia-theme-chats-${themeId}-${userId}`);
        if (saved) {
          setChats(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Erro ao carregar chats:", e);
      }
    }
  }, [themeId, userId]);

  // Salvar chats
  useEffect(() => {
    if (typeof window !== "undefined" && chats.length > 0) {
      try {
        localStorage.setItem(`lumia-theme-chats-${themeId}-${userId}`, JSON.stringify(chats));
      } catch (e) {
        console.error("Erro ao salvar chats:", e);
      }
    }
  }, [chats, themeId, userId]);

  const handleCreateChat = () => {
    if (!newChatName.trim()) return;

    const newChat: Chat = {
      id: `${themeId}-${Date.now()}`,
      name: newChatName.trim(),
      themeId,
      createdAt: Date.now(),
    };

    setChats((prev) => [newChat, ...prev]);
    setNewChatName("");
    setIsCreating(false);
    onSelectChat(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    if (confirm("Tem certeza que deseja excluir esta conversa? Todo o histórico será perdido.")) {
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
      
      // Remover histórico do chat
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(`lumia-chat-history-${chatId}-${userId}`);
        } catch (e) {
          console.error("Erro ao remover histórico:", e);
        }
      }
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#212121]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {themeName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chats.length} conversa{chats.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Botão Nova Conversa */}
          {!isCreating && (
            <Button
              onClick={() => setIsCreating(true)}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Conversa
            </Button>
          )}

          {/* Input para criar nova conversa */}
          {isCreating && (
            <div className="flex gap-2">
              <Input
                type="text"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Nome da conversa..."
                className="flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateChat();
                  if (e.key === "Escape") {
                    setIsCreating(false);
                    setNewChatName("");
                  }
                }}
              />
              <Button onClick={handleCreateChat} disabled={!newChatName.trim()}>
                Criar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewChatName("");
                }}
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Lista de Conversas */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          {chats.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Nenhuma conversa ainda
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Crie sua primeira conversa sobre {themeName.toLowerCase()}
              </p>
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Começar Agora
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="group bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onSelectChat(chat.id)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-purple-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {chat.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(chat.createdAt)}
                      </p>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteChat(chat.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
