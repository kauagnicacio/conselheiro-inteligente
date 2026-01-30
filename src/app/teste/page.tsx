"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "../components/ChatInterface";
import { QuizLibrary } from "../components/QuizLibrary";
import { ProfileView } from "../components/ProfileView";
import { ThemeSelector } from "../components/ThemeSelector";
import { ThemeChats } from "../components/ThemeChats";
import { DailyReflection } from "../components/DailyReflection";
import { EmocoesView } from "../components/EmocoesView";
import { CheckoutModal } from "@/components/CheckoutModal";
import { LumLogo } from "@/components/LumIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MessageCircle, BookOpen, Sparkles, Map, Heart, Home, Library } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { WeekCalendar } from "../components/WeekCalendar";
import { DailySteps } from "../components/DailySteps";
import { WeeklySummary } from "../components/WeeklySummary";
import { InicioView } from "../components/InicioView";
import { BibliotecaView } from "../components/BibliotecaView";

type ViewType = "inicio" | "chat-list" | "theme-chats" | "chat-active" | "perfil" | "quiz" | "reflexao" | "jornada" | "emocoes" | "biblioteca";
type SidebarTab = "inicio" | "chat" | "perfil" | "quiz" | "reflexao" | "jornada" | "emocoes" | "biblioteca";

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

// ID de usuário demo fixo
const DEMO_USER_ID = "demo-user";

// Função auxiliar para extrair o tema do chatId
function extractThemeFromChatId(chatId: string): string {
  if (chatId.startsWith("espaco-livre-")) return "espaco-livre";
  if (chatId.startsWith("relacionamento-")) return "relacionamento";
  if (chatId.startsWith("familia-")) return "familia";
  if (chatId.startsWith("trabalho-")) return "trabalho";
  if (chatId.startsWith("tomada-decisao-")) return "tomada-decisao";
  
  return chatId.split("-")[0];
}

export default function TestePage() {
  const [currentView, setCurrentView] = useState<ViewType>("inicio");
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>("inicio");
  const [activeTheme, setActiveTheme] = useState<string>("");
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Estados para Jornada
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [weekProgress, setWeekProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Carregar progresso da semana para Jornada
  useEffect(() => {
    if (isClient && currentView === "jornada") {
      loadWeekProgress();
    }
  }, [isClient, currentView]);

  const loadWeekProgress = () => {
    const saved = localStorage.getItem(`journey-week-${DEMO_USER_ID}`);
    if (saved) {
      setWeekProgress(JSON.parse(saved));
    }
  };

  const saveWeekProgress = (progress: Record<number, number>) => {
    localStorage.setItem(`journey-week-${DEMO_USER_ID}`, JSON.stringify(progress));
    setWeekProgress(progress);
  };

  const handleDayComplete = (day: number, progress: number) => {
    const newProgress = { ...weekProgress, [day]: progress };
    saveWeekProgress(newProgress);
  };

  // Função para abrir modal de checkout (intercepta todas as ações)
  const openCheckoutModal = () => {
    setShowCheckoutModal(true);
  };

  const handleSidebarTabChange = (tab: SidebarTab) => {
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
    }
  };

  const handleSelectTheme = (themeId: string) => {
    // Criar chat ID temporário para visualização
    const chatId = `${themeId}-${uuidv4()}`;
    
    // Abrir chat diretamente
    setActiveTheme(themeId);
    setActiveChatId(chatId);
    setCurrentView("chat-active");
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setCurrentView("chat-active");
  };

  const handleBackToThemeList = () => {
    setCurrentView("chat-list");
    setActiveSidebarTab("chat");
    setActiveTheme("");
    setActiveChatId("");
  };

  const handleBackToThemeChats = () => {
    setCurrentView("theme-chats");
    setActiveChatId("");
  };

  const handleStartChatFromReflection = (question: string, answer: string) => {
    // Criar novo chat no tema "Espaço Livre" com contexto da reflexão
    const themeId = "espaco-livre";
    const newChatId = `${themeId}-${uuidv4()}`;
    
    // Abrir chat diretamente
    setActiveTheme(themeId);
    setActiveChatId(newChatId);
    setCurrentView("chat-active");
    setActiveSidebarTab("chat");
  };

  const handleOpenProfile = () => {
    setCurrentView("perfil");
    setActiveSidebarTab("perfil");
    setIsSidebarOpen(false);
  };

  // Handler para navegação da aba Início
  const handleInicioNavigate = (destination: "chat" | "quiz" | "reflexao" | "jornada" | "emocoes" | "biblioteca") => {
    handleSidebarTabChange(destination);
  };

  if (!isClient) {
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

  // Obter nome do tema atual para exibir no header
  const getHeaderTitle = () => {
    if (!activeChatId) return "Chat";
    
    const themeId = extractThemeFromChatId(activeChatId);
    const themeName = themeNames[themeId] || "Chat";
    
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
        </nav>

        {/* User Area - Parte Inferior */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {/* Foto e Nome (clicável para abrir perfil) */}
          <button
            onClick={handleOpenProfile}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-gray-300 dark:ring-gray-600">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                Visitante
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ver perfil
              </p>
            </div>
          </button>

          {/* Botão de Logout */}
          <Button
            onClick={openCheckoutModal}
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
              </h1>
            </div>
          </div>

          {/* Ícone do tema no lado direito */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </header>

        {/* Content Area - Conteúdo rola por baixo do header */}
        <main className="flex-1 overflow-y-auto">
          {currentView === "inicio" && (
            <InicioView onNavigate={handleInicioNavigate} isDemo={true} onDemoAction={openCheckoutModal} />
          )}

          {currentView === "chat-list" && (
            <ThemeSelector 
              onSelectTheme={handleSelectTheme}
              onSelectChat={handleSelectChat}
              userId={DEMO_USER_ID}
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}
          
          {currentView === "theme-chats" && (
            <ThemeChats
              themeId={activeTheme}
              themeName={themeNames[activeTheme]}
              userId={DEMO_USER_ID}
              onBack={handleBackToThemeList}
              onSelectChat={handleSelectChat}
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}
          
          {currentView === "chat-active" && (
            <ChatInterface
              activeTab={activeChatId}
              onCreateCustomTab={() => {}}
              userId={DEMO_USER_ID}
              activeTheme={activeChatId}
              onThemeChange={setActiveChatId}
              onBack={handleBackToThemeList}
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}
          
          {currentView === "perfil" && (
            <ProfileView
              onBack={() => handleSidebarTabChange("chat")}
              userId={DEMO_USER_ID}
              userEmail="visitante@demo.com"
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}
          
          {currentView === "quiz" && (
            <QuizLibrary
              onSelectQuiz={(quizId) => {
                // Quiz agora é gerenciado internamente pelo QuizLibrary
                // O bloqueio acontece no QuizInterface quando tentar ver o resultado
              }}
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}

          {currentView === "reflexao" && (
            <DailyReflection
              onBack={() => handleSidebarTabChange("chat")}
              onStartChat={handleStartChatFromReflection}
              userId={DEMO_USER_ID}
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}

          {currentView === "jornada" && (
            showWeeklySummary ? (
              <WeeklySummary
                weekProgress={weekProgress}
                onClose={() => setShowWeeklySummary(false)}
                userId={DEMO_USER_ID}
                isDemo={true}
                onDemoAction={openCheckoutModal}
              />
            ) : (
              <div className="h-full overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
                <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
                  {/* Calendário Semanal */}
                  <WeekCalendar
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                    weekProgress={weekProgress}
                    onViewSummary={() => openCheckoutModal()} // Bloquear resultado semanal
                    isWeekEnd={isWeekEnd}
                    isDemo={true}
                    onDemoAction={openCheckoutModal}
                  />

                  {/* Etapas Diárias - Bloquear qualquer clique */}
                  <DailySteps
                    selectedDay={selectedDay}
                    userId={DEMO_USER_ID}
                    onDayComplete={handleDayComplete}
                    onDemoAction={openCheckoutModal}
                    isDemo={true}
                  />
                </div>
              </div>
            )
          )}

          {currentView === "emocoes" && (
            <EmocoesView
              userId={DEMO_USER_ID}
              onBack={() => handleSidebarTabChange("chat")}
              onNavigateToChat={(initialMessage: string) => {
                // Criar novo chat no tema "Espaço Livre" com mensagem inicial da Lum
                const themeId = "espaco-livre";
                const newChatId = `${themeId}-${uuidv4()}`;

                // Abrir chat diretamente
                setActiveTheme(themeId);
                setActiveChatId(newChatId);
                setCurrentView("chat-active");
                setActiveSidebarTab("chat");
              }}
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}

          {currentView === "biblioteca" && (
            <BibliotecaView
              userId={DEMO_USER_ID}
              isDemo={true}
              onDemoAction={openCheckoutModal}
            />
          )}
        </main>
      </div>

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
      />
    </div>
  );
}
