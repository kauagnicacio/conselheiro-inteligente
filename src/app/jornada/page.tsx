"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LumLogo } from "@/components/LumIcons";
import { MessageCircle, BookOpen, Sparkles, Map } from "lucide-react";
import { CheckoutModal } from "@/components/CheckoutModal";
import { WeekCalendar } from "./components/WeekCalendar";
import { DailySteps } from "./components/DailySteps";
import { WeeklySummary } from "./components/WeeklySummary";

type SidebarTab = "chat" | "quiz" | "reflexao" | "jornada" | "profile";

const DEMO_USER_ID = "demo-user";

export default function JornadaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>("jornada");
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [weekProgress, setWeekProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    setIsClient(true);
    loadWeekProgress();
  }, []);

  const loadWeekProgress = () => {
    // Carregar progresso da semana do localStorage
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

  const openCheckoutModal = () => {
    setShowCheckoutModal(true);
  };

  const handleCloseCheckoutModal = () => {
    setShowCheckoutModal(false);
  };

  const handleSidebarTabChange = (tab: SidebarTab) => {
    setActiveSidebarTab(tab);
    setIsSidebarOpen(false);
    
    if (tab === "chat") {
      window.location.href = "/teste";
    } else if (tab === "quiz") {
      window.location.href = "/teste";
    } else if (tab === "reflexao") {
      window.location.href = "/teste";
    } else if (tab === "profile") {
      window.location.href = "/teste";
    }
  };

  const handleOpenProfile = () => {
    window.location.href = "/teste";
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

  // Verificar se é final de semana (quinta-feira ou depois)
  const today = new Date().getDay();
  const isWeekEnd = today >= 4; // Quinta (4) em diante

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
        </nav>

        {/* User Area - Parte Inferior */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
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
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="h-9 w-9"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {showWeeklySummary ? "Seu Mapa da Semana" : "Minha Jornada"}
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
          {showWeeklySummary ? (
            <WeeklySummary
              weekProgress={weekProgress}
              onClose={() => setShowWeeklySummary(false)}
              userId={DEMO_USER_ID}
            />
          ) : (
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
                userId={DEMO_USER_ID}
                onDayComplete={handleDayComplete}
                onDemoAction={openCheckoutModal}
              />
            </div>
          )}
        </main>
      </div>

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseCheckoutModal}
      />
    </div>
  );
}
