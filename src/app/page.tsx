"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./components/ChatInterface";
import { QuizLibrary } from "./components/QuizLibrary";
import { ProfileView } from "./components/ProfileView";
import { useAuth } from "@/hooks/useAuth";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  LumLogo, 
  LumAvatar,
  QuizIcon,
  PersonalIcon
} from "@/components/LumIcons";

export type TabType = "inicio" | "quiz" | "perfil";

export default function Home() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("inicio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isClient, setIsClient] = useState(false);
  
  // Estado para tema/contexto ativo do chat
  const [activeTheme, setActiveTheme] = useState<string>("geral");

  // Marcar que estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // REGRA SIMPLES: Se não estiver logado, redirecionar para /quiz
  useEffect(() => {
    if (!loading && !user) {
      router.push("/quiz");
    }
  }, [user, loading, router]);

  // Carregar nome de exibição APENAS no cliente
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

  const handleSignOut = async () => {
    try {
      setActiveTab("inicio");
      setDisplayName("");
      await signOut();
      
      if (typeof window !== "undefined") {
        window.location.href = "/quiz";
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      if (typeof window !== "undefined") {
        window.location.href = "/quiz";
      }
    }
  };

  const fixedTabs = [
    { id: "quiz", name: "Quiz", icon: QuizIcon },
    { id: "perfil", name: "Perfil", icon: PersonalIcon },
  ];

  // Mostrar loading enquanto verifica autenticação
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

  // Se não estiver logado, não renderizar
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-[#1a1a1a] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#212121] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <LumLogo />
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Lum IA</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Seu conselheiro</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden h-9 w-9"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {fixedTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as TabType);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/20 text-purple-700 dark:text-purple-300 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Info & Logout */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-medium shrink-0 shadow-sm">
                  {displayName ? displayName[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {displayName || user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="h-8 w-8 shrink-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                title="Sair"
              >
                <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <LumAvatar />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Lum IA</span>
          </div>
          <ThemeToggle />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "quiz" ? (
            <QuizLibrary 
              onBack={() => setActiveTab("inicio")}
              onStartChat={() => setActiveTab("inicio")}
              userId={user?.id || ""}
            />
          ) : activeTab === "perfil" ? (
            <ProfileView 
              onBack={() => setActiveTab("inicio")}
              userId={user?.id || ""}
              userEmail={user?.email || ""}
            />
          ) : (
            <ChatInterface 
              activeTab={activeTheme}
              onCreateCustomTab={() => {}}
              userId={user?.id || ""}
              activeTheme={activeTheme}
              onThemeChange={setActiveTheme}
            />
          )}
        </div>
      </main>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}
