"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./components/ChatInterface";
import { QuizLibrary } from "./components/QuizLibrary";
import { ProfileView } from "./components/ProfileView";
import { ThemeSelector } from "./components/ThemeSelector";
import { ThemeChats } from "./components/ThemeChats";
import { BottomNavigation, BottomNavTab } from "./components/BottomNavigation";
import { useAuth } from "@/hooks/useAuth";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LumLogo } from "@/components/LumIcons";
import { v4 as uuidv4 } from "uuid";

type ViewType = "chat-list" | "theme-chats" | "chat-active" | "perfil" | "quiz";

const themeNames: Record<string, string> = {
  "espaco-livre": "Espaço Livre",
  "relacionamento": "Relacionamento",
  "familia": "Família",
  "trabalho": "Trabalho",
  "tomada-decisao": "Tomada de decisão"
};

const themeGreetings: Record<string, string> = {
  "espaco-livre": "Esse é seu espaço. Me conta o que você está sentindo.",
  "relacionamento": "Vamos conversar sobre seus relacionamentos? Como você está se sentindo?",
  "familia": "Como estão as coisas com sua família?",
  "trabalho": "O que está acontecendo no trabalho?",
  "tomada-decisao": "Que decisão está te ocupando agora?",
};

export default function Home() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>("chat-list");
  const [activeBottomTab, setActiveBottomTab] = useState<BottomNavTab>("chat");
  const [activeTheme, setActiveTheme] = useState<string>("");
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [displayName, setDisplayName] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [chatCounts, setChatCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/quiz");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (isClient && user) {
      try {
        const saved = localStorage.getItem(`lumia-profile-${user.id}`);
        if (saved) {
          const profile = JSON.parse(saved);
          setDisplayName(profile.displayName || "");
        }
      } catch (e) {
        console.error("Erro ao carregar perfil:", e);
      }
    }
  }, [user, isClient]);

  // Calcular contadores de conversas por tema
  useEffect(() => {
    if (isClient && user) {
      const themes = ["espaco-livre", "relacionamento", "familia", "trabalho", "tomada-decisao"];
      const counts: Record<string, number> = {};
      
      themes.forEach(theme => {
        const storageKey = `lumia-theme-chats-${theme}-${user.id}`;
        const chats = localStorage.getItem(storageKey);
        if (chats) {
          try {
            const parsed = JSON.parse(chats);
            counts[theme] = parsed.length || 0;
          } catch (e) {
            counts[theme] = 0;
          }
        } else {
          counts[theme] = 0;
        }
      });
      
      setChatCounts(counts);
    }
  }, [isClient, user, currentView]);

  const handleBottomNavChange = (tab: BottomNavTab) => {
    setActiveBottomTab(tab);
    
    if (tab === "chat") {
      setCurrentView("chat-list");
    } else if (tab === "perfil") {
      setCurrentView("perfil");
    } else if (tab === "quiz") {
      setCurrentView("quiz");
    }
  };

  const handleSelectTheme = (themeId: string) => {
    // Criar novo chat automaticamente e abrir direto
    const newChatId = `${themeId}-${uuidv4()}`;
    const newChat = {
      id: newChatId,
      name: `Conversa em ${themeNames[themeId]}`,
      timestamp: new Date(),
    };

    // Salvar na lista de chats do tema
    const storageKey = `lumia-theme-chats-${themeId}-${user?.id}`;
    const existingChats = localStorage.getItem(storageKey);
    let chats = [];
    
    if (existingChats) {
      try {
        chats = JSON.parse(existingChats);
      } catch (e) {
        chats = [];
      }
    }
    
    chats.unshift(newChat);
    localStorage.setItem(storageKey, JSON.stringify(chats));

    // Criar histórico inicial com mensagem da Lum
    const greeting = themeGreetings[themeId] || themeGreetings["espaco-livre"];
    const initialMessage = {
      role: "assistant",
      content: greeting,
      timestamp: new Date(),
    };
    
    const historyKey = `lumia-chat-history-${newChatId}-${user?.id}`;
    localStorage.setItem(historyKey, JSON.stringify([initialMessage]));

    // Abrir chat diretamente
    setActiveTheme(themeId);
    setActiveChatId(newChatId);
    setCurrentView("chat-active");
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setCurrentView("chat-active");
  };

  const handleBackToThemeList = () => {
    setCurrentView("chat-list");
    setActiveBottomTab("chat");
    setActiveTheme("");
    setActiveChatId("");
  };

  const handleBackToThemeChats = () => {
    setCurrentView("theme-chats");
    setActiveChatId("");
  };

  if (loading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1a1a1a]">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <LumLogo className="w-16 h-16 animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]">
        <div className="flex items-center gap-3">
          {(currentView === "theme-chats" || currentView === "chat-active") && (
            <Button
              variant="ghost"
              size="icon"
              onClick={currentView === "chat-active" ? handleBackToThemeList : handleBackToThemeList}
              className="h-9 w-9"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <LumLogo className="w-8 h-8" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Lum IA</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentView === "chat-list" && "Escolha um tema"}
              {currentView === "theme-chats" && themeNames[activeTheme]}
              {currentView === "chat-active" && "Conversando"}
              {currentView === "perfil" && "Seu perfil"}
              {currentView === "quiz" && "Biblioteca de quizzes"}
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-hidden pb-24">
        {currentView === "chat-list" && (
          <ThemeSelector 
            onSelectTheme={handleSelectTheme}
            chatCounts={chatCounts}
          />
        )}
        
        {currentView === "theme-chats" && (
          <ThemeChats
            themeId={activeTheme}
            themeName={themeNames[activeTheme]}
            userId={user?.id || ""}
            onBack={handleBackToThemeList}
            onSelectChat={handleSelectChat}
          />
        )}
        
        {currentView === "chat-active" && (
          <ChatInterface
            activeTab={activeChatId}
            onCreateCustomTab={() => {}}
            userId={user?.id || ""}
            activeTheme={activeChatId}
            onThemeChange={setActiveChatId}
            onBack={handleBackToThemeList}
          />
        )}
        
        {currentView === "perfil" && (
          <ProfileView
            onBack={() => handleBottomNavChange("chat")}
            userId={user?.id || ""}
            userEmail={user?.email || ""}
          />
        )}
        
        {currentView === "quiz" && (
          <QuizLibrary
            onBack={() => handleBottomNavChange("chat")}
            onStartChat={() => {
              setCurrentView("chat-list");
              setActiveBottomTab("chat");
            }}
            userId={user?.id || ""}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeBottomTab}
        onTabChange={handleBottomNavChange}
      />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}
