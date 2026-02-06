"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "../components/ChatInterface";
import { QuizLibrary } from "../components/QuizLibrary";
import { ProfileView } from "../components/ProfileView";
import { ThemeSelector } from "../components/ThemeSelector";
import { ThemeChats } from "../components/ThemeChats";
import { DailyReflection } from "../components/DailyReflection";
import { UnsavedChatAlert } from "../components/UnsavedChatAlert";
import { EmocoesView } from "../components/EmocoesView";
import { useAuth } from "@/hooks/useAuth";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LumLogo } from "@/components/LumIcons";
import { MessageCircle, BookOpen, Sparkles, Map, Heart, Home, Library, Users } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { WeekCalendar } from "../components/WeekCalendar";
import { DailySteps } from "../components/DailySteps";
import { WeeklySummary } from "../components/WeeklySummary";
import { InicioView } from "../components/InicioView";
import { BibliotecaView } from "../components/BibliotecaView";
import { PsicologosView } from "../components/PsicologosView";
import { SupportButton } from "@/components/SupportButton";

type ViewType = "inicio" | "chat-list" | "theme-chats" | "chat-active" | "perfil" | "quiz" | "reflexao" | "jornada" | "emocoes" | "biblioteca" | "psicologos";
type SidebarTab = "inicio" | "chat" | "perfil" | "quiz" | "reflexao" | "jornada" | "emocoes" | "biblioteca" | "psicologos";

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

// Temas que são salvos automaticamente (não precisam de popup)
const AUTO_SAVED_THEMES = ["relacionamento", "familia", "trabalho", "tomada-decisao"];

// Função auxiliar para extrair o tema do chatId
function extractThemeFromChatId(chatId: string): string {
  // Formato esperado: "tema-uuid" ou "tema-composto-uuid"
  // Temas possíveis: espaco-livre, relacionamento, familia, trabalho, tomada-decisao
  
  if (chatId.startsWith("espaco-livre-")) return "espaco-livre";
  if (chatId.startsWith("relacionamento-")) return "relacionamento";
  if (chatId.startsWith("familia-")) return "familia";
  if (chatId.startsWith("trabalho-")) return "trabalho";
  if (chatId.startsWith("tomada-decisao-")) return "tomada-decisao";
  
  // Fallback: tentar extrair o primeiro segmento
  return chatId.split("-")[0];
}

export default function HomePage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>("inicio");
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>("inicio");
  const [activeTheme, setActiveTheme] = useState<string>("");
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [displayName, setDisplayName] = useState("");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [chatCounts, setChatCounts] = useState<Record<string, number>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Estados para o popup de chat não salvo
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  const [chatHasMessages, setChatHasMessages] = useState(false);

  // Estados para Jornada
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [weekProgress, setWeekProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Limpar query params da URL - manter apenas /home
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      router.replace('/home');
    }
  }, [router]);

  // Redirecionar para /quiz APENAS se não estiver logado
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
          setDisplayName(profile.displayName || user.email?.split("@")[0] || "Usuário");
          setUserAvatar(profile.avatar || null);
        } else {
          // Primeira vez - usar nome do email
          setDisplayName(user.email?.split("@")[0] || "Usuário");
        }
      } catch (e) {
        console.error("Erro ao carregar perfil:", e);
        setDisplayName(user.email?.split("@")[0] || "Usuário");
      }
    }
  }, [user, isClient]);

  // Atualizar avatar e nome quando mudar no perfil
  useEffect(() => {
    if (isClient && user) {
      const handleStorageChange = () => {
        try {
          const saved = localStorage.getItem(`lumia-profile-${user.id}`);
          if (saved) {
            const profile = JSON.parse(saved);
            setDisplayName(profile.displayName || user.email?.split("@")[0] || "Usuário");
            setUserAvatar(profile.avatar || null);
          }
        } catch (e) {
          console.error("Erro ao atualizar perfil:", e);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
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

  // Carregar progresso da semana para Jornada
  useEffect(() => {
    if (isClient && user && currentView === "jornada") {
      loadWeekProgress();
    }
  }, [isClient, user, currentView]);

  const loadWeekProgress = () => {
    if (!user) return;
    const saved = localStorage.getItem(`journey-week-${user.id}`);
    if (saved) {
      setWeekProgress(JSON.parse(saved));
    }
  };

  const saveWeekProgress = (progress: Record<number, number>) => {
    if (!user) return;
    localStorage.setItem(`journey-week-${user.id}`, JSON.stringify(progress));
    setWeekProgress(progress);
  };

  const handleDayComplete = (day: number, progress: number) => {
    const newProgress = { ...weekProgress, [day]: progress };
    saveWeekProgress(newProgress);
  };

  // Verificar se chat tem mensagens do usuário - ATUALIZAÇÃO EM TEMPO REAL
  useEffect(() => {
    if (!isClient || !user || !activeChatId || currentView !== "chat-active") {
      setChatHasMessages(false);
      return;
    }

    const historyKey = `lumia-chat-history-${activeChatId}-${user.id}`;
    
    // Função para verificar mensagens
    const checkMessages = () => {
      const history = localStorage.getItem(historyKey);
      
      if (history) {
        try {
          const messages = JSON.parse(history);
          // Verificar se há mensagens do usuário (role: "user")
          const hasUserMessages = messages.some((msg: any) => msg.role === "user");
          setChatHasMessages(hasUserMessages);
        } catch (e) {
          setChatHasMessages(false);
        }
      } else {
        setChatHasMessages(false);
      }
    };

    // Verificar imediatamente
    checkMessages();

    // Monitorar mudanças no localStorage (quando usuário envia mensagem)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === historyKey) {
        checkMessages();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Polling a cada 500ms para capturar mudanças locais
    const interval = setInterval(checkMessages, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [isClient, user, activeChatId, currentView]);

  // Verificar se o chat atual precisa de alerta ao sair
  const needsUnsavedAlert = () => {
    // Não mostrar popup se não estiver em chat ativo
    if (currentView !== "chat-active" || !activeChatId) {
      return false;
    }

    // Não mostrar popup se não houver mensagens do usuário
    if (!chatHasMessages) {
      return false;
    }

    // Extrair o tema do chatId usando função auxiliar
    const themeId = extractThemeFromChatId(activeChatId);
    
    // Se for tema auto-salvo, não precisa de alerta
    if (AUTO_SAVED_THEMES.includes(themeId)) {
      return false;
    }

    // Verificar se o chat já está salvo na lista de conversas
    const storageKey = `lumia-saved-conversations-${user?.id}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const chatExists = parsed.some((conv: any) => conv.id === activeChatId && conv.isSaved);
        
        // Se chat já existe na lista de salvos, não precisa de alerta
        if (chatExists) {
          return false;
        }
      } catch (e) {
        // Se erro ao parsear, assumir que precisa de alerta
      }
    }

    // Chat não salvo em tema que não é auto-salvo (Espaço Livre, Quiz, Reflexão)
    return true;
  };

  // Interceptar navegação e mostrar popup se necessário
  const handleNavigationWithCheck = (navigationFn: () => void) => {
    if (needsUnsavedAlert()) {
      setPendingNavigation(() => navigationFn);
      setShowUnsavedAlert(true);
    } else {
      navigationFn();
    }
  };

  const handleSidebarTabChange = (tab: SidebarTab) => {
    const navigationFn = () => {
      setActiveSidebarTab(tab);
      setIsSidebarOpen(false);

      if (tab === "inicio") {
        setCurrentView("inicio");
      } else if (tab === "chat") {
        setCurrentView("chat-list");
      } else if (tab === "perfil") {
        setCurrentView("perfil");
      } else if (tab === "quiz") {
        setCurrentView("quiz");
      } else if (tab === "reflexao") {
        setCurrentView("reflexao");
      } else if (tab === "jornada") {
        setCurrentView("jornada");
        setShowWeeklySummary(false);
      } else if (tab === "emocoes") {
        setCurrentView("emocoes");
      } else if (tab === "biblioteca") {
        setCurrentView("biblioteca");
      } else if (tab === "psicologos") {
        setCurrentView("psicologos");
      }
    };

    handleNavigationWithCheck(navigationFn);
  };

  const handleSelectTheme = (themeId: string) => {
    const navigationFn = () => {
      // Para temas auto-salvos, usar sempre o mesmo chat ID fixo por usuário
      let chatId: string;
      
      if (AUTO_SAVED_THEMES.includes(themeId)) {
        // Chat ID fixo para temas permanentes (baseado no tema + userId)
        chatId = `${themeId}-${user?.id}`;
      } else {
        // Chat ID único para temas temporários
        chatId = `${themeId}-${uuidv4()}`;
      }

      // Verificar se já existe histórico para este chat
      const historyKey = `lumia-chat-history-${chatId}-${user?.id}`;
      const existingHistory = localStorage.getItem(historyKey);

      // Se não existe histórico, criar mensagem inicial
      if (!existingHistory) {
        const greeting = themeGreetings[themeId] || themeGreetings["espaco-livre"];
        const initialMessage = {
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        };
        
        localStorage.setItem(historyKey, JSON.stringify([initialMessage]));
      }

      // Abrir chat diretamente
      setActiveTheme(themeId);
      setActiveChatId(chatId);
      setCurrentView("chat-active");
    };

    handleNavigationWithCheck(navigationFn);
  };

  const handleSelectChat = (chatId: string) => {
    const navigationFn = () => {
      setActiveChatId(chatId);
      setCurrentView("chat-active");
    };

    handleNavigationWithCheck(navigationFn);
  };

  const handleBackToThemeList = () => {
    const navigationFn = () => {
      setCurrentView("chat-list");
      setActiveSidebarTab("chat");
      setActiveTheme("");
      setActiveChatId("");
    };

    handleNavigationWithCheck(navigationFn);
  };

  const handleBackToThemeChats = () => {
    const navigationFn = () => {
      setCurrentView("theme-chats");
      setActiveChatId("");
    };

    handleNavigationWithCheck(navigationFn);
  };

  const handleStartChatFromReflection = (question: string, answer: string) => {
    const navigationFn = () => {
      // Criar novo chat no tema "Espaço Livre" com contexto da reflexão
      const themeId = "espaco-livre";
      const newChatId = `${themeId}-${uuidv4()}`;
      
      // NÃO salvar automaticamente - deixar para o usuário decidir
      // (Espaço Livre não é auto-salvo)

      // Criar histórico inicial com contexto da reflexão
      const initialMessages = [
        {
          role: "user",
          content: `Pergunta da reflexão: "${question}"\n\nMinha resposta: ${answer}`,
          timestamp: new Date(),
        },
        {
          role: "assistant",
          content: "Conte-me mais sobre isso.",
          timestamp: new Date(),
        }
      ];
      
      const historyKey = `lumia-chat-history-${newChatId}-${user?.id}`;
      localStorage.setItem(historyKey, JSON.stringify(initialMessages));

      // Abrir chat diretamente
      setActiveTheme(themeId);
      setActiveChatId(newChatId);
      setCurrentView("chat-active");
      setActiveSidebarTab("chat");
    };

    handleNavigationWithCheck(navigationFn);
  };

  const handleLogout = async () => {
    if (confirm("Tem certeza que deseja sair?")) {
      await signOut();
    }
  };

  const handleOpenProfile = () => {
    const navigationFn = () => {
      setCurrentView("perfil");
      setActiveSidebarTab("perfil");
      setIsSidebarOpen(false);
    };

    handleNavigationWithCheck(navigationFn);
  };

  // Handlers do popup de chat não salvo
  const handleDiscardChat = () => {
    // Remover histórico do chat temporário
    if (user && activeChatId) {
      const historyKey = `lumia-chat-history-${activeChatId}-${user.id}`;
      localStorage.removeItem(historyKey);
    }

    setShowUnsavedAlert(false);
    
    // Executar navegação pendente
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleSaveChat = () => {
    if (!user || !activeChatId) return;

    // Extrair tema do chatId usando função auxiliar
    const themeId = extractThemeFromChatId(activeChatId);
    
    // Pedir nome para o chat
    const chatName = prompt("Dê um nome para esta conversa:", `Conversa em ${themeNames[themeId]}`);
    
    // Se usuário cancelou, não salvar e não executar navegação
    if (chatName === null) {
      setShowUnsavedAlert(false);
      return;
    }
    
    // Se usuário deixou vazio, usar nome padrão
    const finalName = chatName.trim() || `Conversa em ${themeNames[themeId]}`;
    
    const now = new Date().toISOString();
    
    // 1. Salvar na lista de conversas salvas (para ThemeSelector)
    const savedConversationsKey = `lumia-saved-conversations-${user.id}`;
    const existingSaved = localStorage.getItem(savedConversationsKey);
    let savedConversations = [];
    
    if (existingSaved) {
      try {
        savedConversations = JSON.parse(existingSaved);
      } catch (e) {
        savedConversations = [];
      }
    }
    
    // Verificar se já existe (evitar duplicatas)
    const alreadyExists = savedConversations.some((conv: any) => conv.id === activeChatId);
    
    if (!alreadyExists) {
      const savedChat = {
        id: activeChatId,
        themeId: themeId,
        name: finalName,
        isSaved: true,
        createdAt: now,
        updatedAt: now,
      };
      
      savedConversations.unshift(savedChat);
      localStorage.setItem(savedConversationsKey, JSON.stringify(savedConversations));
    } else {
      // Se já existe, atualizar o nome
      const index = savedConversations.findIndex((conv: any) => conv.id === activeChatId);
      if (index !== -1) {
        savedConversations[index].name = finalName;
        savedConversations[index].isSaved = true;
        savedConversations[index].updatedAt = now;
        localStorage.setItem(savedConversationsKey, JSON.stringify(savedConversations));
      }
    }
    
    // 2. Também salvar na lista de chats do tema (para compatibilidade)
    const themeChatsKey = `lumia-theme-chats-${themeId}-${user.id}`;
    const existingThemeChats = localStorage.getItem(themeChatsKey);
    let themeChats = [];
    
    if (existingThemeChats) {
      try {
        themeChats = JSON.parse(existingThemeChats);
      } catch (e) {
        themeChats = [];
      }
    }
    
    // Verificar se já existe no tema
    const existsInTheme = themeChats.some((chat: any) => chat.id === activeChatId);
    
    if (!existsInTheme) {
      const themeChat = {
        id: activeChatId,
        name: finalName,
        timestamp: new Date(),
      };
      
      themeChats.unshift(themeChat);
      localStorage.setItem(themeChatsKey, JSON.stringify(themeChats));
    }

    // 3. Atualizar contadores para refletir o novo chat salvo
    setChatCounts(prev => ({
      ...prev,
      [themeId]: (prev[themeId] || 0) + 1
    }));

    // 4. Disparar evento de storage para atualizar outras abas/componentes
    window.dispatchEvent(new Event('storage'));
    
    // 5. Forçar reload do componente ThemeSelector
    window.dispatchEvent(new StorageEvent('storage', {
      key: savedConversationsKey,
      newValue: localStorage.getItem(savedConversationsKey),
      url: window.location.href
    }));

    setShowUnsavedAlert(false);
    
    // Executar navegação pendente
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  // Handler para navegação da aba Início
  const handleInicioNavigate = (destination: "chat" | "quiz" | "reflexao" | "jornada" | "emocoes" | "biblioteca" | "psicologos") => {
    handleSidebarTabChange(destination);
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

  // Obter nome do tema atual para exibir no header
  const getHeaderTitle = () => {
    if (!activeChatId) return "Chat";
    
    const themeId = extractThemeFromChatId(activeChatId);
    const themeName = themeNames[themeId] || "Chat";
    
    // Verificar se é tema auto-salvo (permanente)
    if (AUTO_SAVED_THEMES.includes(themeId)) {
      return `${themeName} – conversa permanente`;
    }
    
    // Verificar se é chat salvo manualmente
    const storageKey = `lumia-saved-conversations-${user?.id}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const chatExists = parsed.find((conv: any) => conv.id === activeChatId && conv.isSaved);
        
        if (chatExists) {
          return `${chatExists.name} – conversa salva`;
        }
      } catch (e) {
        // Ignorar erro
      }
    }
    
    // Chat temporário
    return themeName;
  };
  
  const currentThemeName = getHeaderTitle();

  // Verificar se é final de semana (quinta-feira ou depois)
  const today = new Date().getDay();
  const isWeekEnd = today >= 4;

  return (
    <div className="flex h-screen bg-white dark:bg-[#1a1a1a] overflow-hidden">
      {/* Sidebar - Menu Lateral */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#212121] border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <LumLogo className="w-8 h-8" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Lum IA</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="h-8 w-8"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => handleSidebarTabChange("inicio")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "inicio"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Início</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("chat")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "chat"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Chat</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("quiz")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "quiz"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Quiz</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("reflexao")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "reflexao"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Reflexão do Dia</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("jornada")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "jornada"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Map className="w-5 h-5" />
            <span className="font-medium">Minha Jornada</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("emocoes")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "emocoes"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">As 7 Emoções</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("biblioteca")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "biblioteca"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Library className="w-5 h-5" />
            <span className="font-medium">Meu Material</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("psicologos")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSidebarTab === "psicologos"
                ? "bg-purple-500/10 text-purple-500"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Psicólogos</span>
          </button>
        </nav>

        {/* User Area - Parte Inferior */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {/* Foto e Nome (clicável para abrir perfil) */}
          <button
            onClick={handleOpenProfile}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-600"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-gray-300 dark:ring-gray-600">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ver perfil
              </p>
            </div>
          </button>

          {/* Botão de Logout */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Overlay para fechar sidebar no mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header - Fixo no topo */}
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]">
          <div className="flex items-center gap-3">
            {/* Botão Hambúrguer */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="h-9 w-9"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Botão Voltar (apenas em chat ativo) */}
            {currentView === "chat-active" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToThemeList}
                className="h-9 w-9"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}

            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {currentView === "inicio" && "Início"}
                {currentView === "chat-list" && "Escolha um tema"}
                {currentView === "theme-chats" && themeNames[activeTheme]}
                {currentView === "chat-active" && currentThemeName}
                {currentView === "perfil" && "Suas Características"}
                {currentView === "quiz" && "Quiz"}
                {currentView === "reflexao" && "Reflexão do Dia"}
                {currentView === "jornada" && (showWeeklySummary ? "Seu Mapa da Semana" : "Minha Jornada")}
                {currentView === "emocoes" && "As 7 Emoções"}
                {currentView === "biblioteca" && "Meu Material"}
                {currentView === "psicologos" && "Psicólogos"}
              </h1>
            </div>
          </div>

          {/* Ícone do Instagram no lado direito */}
          <div className="flex items-center">
            <a
              href="https://instagram.com/app_lumia"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Instagram @app_lumia"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
          </div>
        </header>

        {/* Content Area - Conteúdo rola por baixo do header */}
        <main className="flex-1 overflow-y-auto">
          {currentView === "inicio" && (
            <InicioView onNavigate={handleInicioNavigate} />
          )}

          {currentView === "chat-list" && (
            <ThemeSelector 
              onSelectTheme={handleSelectTheme}
              onSelectChat={handleSelectChat}
              userId={user?.id}
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
              onBack={() => handleSidebarTabChange("chat")}
              userId={user?.id || ""}
              userEmail={user?.email || ""}
            />
          )}
          
          {currentView === "quiz" && (
            <QuizLibrary
              onSelectQuiz={(quizId) => {
                // Quiz agora é gerenciado internamente pelo QuizLibrary
                // Não precisa fazer nada aqui
              }}
            />
          )}

          {currentView === "reflexao" && (
            <DailyReflection
              onBack={() => handleSidebarTabChange("chat")}
              onStartChat={handleStartChatFromReflection}
              userId={user?.id || ""}
            />
          )}

          {currentView === "jornada" && (
            showWeeklySummary ? (
              <WeeklySummary
                weekProgress={weekProgress}
                onClose={() => setShowWeeklySummary(false)}
                userId={user?.id || ""}
              />
            ) : (
              <div className="h-full overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
                <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
                  {/* Calendário Semanal */}
                  <WeekCalendar
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                    weekProgress={weekProgress}
                    onViewSummary={() => setShowWeeklySummary(true)}
                    isWeekEnd={isWeekEnd}
                  />

                  {/* Etapas Diárias */}
                  <DailySteps
                    selectedDay={selectedDay}
                    userId={user?.id || ""}
                    onDayComplete={handleDayComplete}
                    onDemoAction={() => {}}
                  />
                </div>
              </div>
            )
          )}

          {currentView === "emocoes" && (
            <EmocoesView
              userId={user?.id || ""}
              onBack={() => handleSidebarTabChange("chat")}
              onNavigateToChat={(initialMessage: string) => {
                // Criar novo chat no tema "Espaço Livre" com mensagem inicial da Lum
                const themeId = "espaco-livre";
                const newChatId = `${themeId}-${uuidv4()}`;

                // Criar histórico inicial com mensagem da Lum
                const initialMessages = [
                  {
                    role: "assistant",
                    content: initialMessage,
                    timestamp: new Date(),
                  }
                ];

                const historyKey = `lumia-chat-history-${newChatId}-${user?.id}`;
                localStorage.setItem(historyKey, JSON.stringify(initialMessages));

                // Abrir chat diretamente
                setActiveTheme(themeId);
                setActiveChatId(newChatId);
                setCurrentView("chat-active");
                setActiveSidebarTab("chat");
              }}
            />
          )}

          {currentView === "biblioteca" && (
            <BibliotecaView userId={user?.id || ""} />
          )}

          {currentView === "psicologos" && (
            <PsicologosView userId={user?.id || ""} />
          )}
        </main>
      </div>

      {/* Popup de Chat Não Salvo */}
      <UnsavedChatAlert
        isOpen={showUnsavedAlert}
        onClose={() => setShowUnsavedAlert(false)}
        onDiscard={handleDiscardChat}
        onSave={handleSaveChat}
      />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Botão Flutuante de Suporte - Oculto apenas em chat ativo */}
      {currentView !== "chat-active" && <SupportButton />}
    </div>
  );
}
