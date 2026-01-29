"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { StandardHeader } from "@/components/custom/StandardHeader";
import { 
  Circle, 
  Flame, 
  Droplets, 
  AlertTriangle, 
  Frown as FrownIcon, 
  EyeOff,
  HelpCircle as HelpCircleIcon,
  TrendingUp as TrendingUpIcon,
  Menu,
  X,
  LogOut,
  User,
  MessageCircle,
  BookOpen,
  Sparkles,
  Map,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LumLogo } from "@/components/LumIcons";

interface Emotion {
  id: string;
  name: string;
  icon: any;
  phrase: string;
  color: string;
  gradient: string;
}

const emotions: Emotion[] = [
  {
    id: "ansiedade",
    name: "Ansiedade",
    icon: Circle,
    phrase: "Quando a ansiedade aparece...",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "raiva",
    name: "Raiva",
    icon: Flame,
    phrase: "Quando a raiva pede espaço...",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "tristeza",
    name: "Tristeza",
    icon: Droplets,
    phrase: "Quando a tristeza chega...",
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "medo",
    name: "Medo",
    icon: AlertTriangle,
    phrase: "Quando o medo aparece...",
    color: "text-yellow-600 dark:text-yellow-400",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "culpa",
    name: "Culpa",
    icon: FrownIcon,
    phrase: "Quando a culpa pesa...",
    color: "text-gray-600 dark:text-gray-400",
    gradient: "from-gray-500 to-slate-500",
  },
  {
    id: "vergonha",
    name: "Vergonha",
    icon: EyeOff,
    phrase: "Quando a vergonha aperta...",
    color: "text-pink-600 dark:text-pink-400",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "confusao",
    name: "Confusão",
    icon: HelpCircleIcon,
    phrase: "Quando a confusão toma conta...",
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-fuchsia-500",
  },
];

type SidebarTab = "chat" | "perfil" | "quiz" | "reflexao" | "jornada" | "emocoes";

export default function EmocoesPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [emotionStats, setEmotionStats] = useState<Record<string, number>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
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
          setDisplayName(user.email?.split("@")[0] || "Usuário");
        }
      } catch (e) {
        console.error("Erro ao carregar perfil:", e);
        setDisplayName(user.email?.split("@")[0] || "Usuário");
      }
    }
  }, [user, isClient]);

  useEffect(() => {
    loadEmotionStats();
  }, [user]);

  const loadEmotionStats = () => {
    if (!user) return;

    const stats: Record<string, number> = {};
    emotions.forEach((emotion) => {
      const history = localStorage.getItem(`emotion-${emotion.id}-${user.uid}`);
      if (history) {
        const data = JSON.parse(history);
        stats[emotion.id] = data.length || 0;
      } else {
        stats[emotion.id] = 0;
      }
    });
    setEmotionStats(stats);
  };

  const handleEmotionClick = (emotion: Emotion) => {
    router.push(`/emocoes/${emotion.id}`);
  };

  const handleSidebarTabChange = (tab: SidebarTab) => {
    setIsSidebarOpen(false);
    
    if (tab === "emocoes") {
      // Já está na página de emoções
      return;
    }
    
    // Navegar para /home com query parameter para definir a aba
    router.push(`/home?tab=${tab}`);
  };

  const handleLogout = async () => {
    if (confirm("Tem certeza que deseja sair?")) {
      await signOut();
    }
  };

  const handleOpenProfile = () => {
    setIsSidebarOpen(false);
    router.push("/home?tab=perfil");
  };

  if (loading) {
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Chat</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("quiz")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Quiz</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("reflexao")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Reflexão do Dia</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("jornada")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Map className="w-5 h-5" />
            <span className="font-medium">Minha Jornada</span>
          </button>

          <button
            onClick={() => handleSidebarTabChange("emocoes")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-purple-500/10 text-purple-500"
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">As 7 Emoções</span>
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
        {/* Header Padrão */}
        <StandardHeader 
          title="As 7 Emoções" 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            {/* Card de introdução */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Cada emoção tem algo importante pra te dizer. Aqui você vai aprender a reconhecer o que está sentindo, entender por que isso está acontecendo e encontrar formas de cuidar de si mesma.
              </p>
            </div>

            {/* Grid de emoções */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emotions.map((emotion) => {
                const Icon = emotion.icon;
                const count = emotionStats[emotion.id] || 0;

                return (
                  <button
                    key={emotion.id}
                    onClick={() => handleEmotionClick(emotion)}
                    className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all text-left group"
                  >
                    {/* Ícone e nome */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${emotion.gradient} flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {emotion.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {emotion.phrase}
                        </p>
                      </div>
                    </div>

                    {/* Estatística */}
                    {count > 0 && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <TrendingUpIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Trabalhada {count} {count === 1 ? "vez" : "vezes"}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Card informativo */}
            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Como funciona?
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>1. Reconhecer:</strong> Identifique o que despertou essa emoção
                </p>
                <p>
                  <strong>2. Entender:</strong> Descubra o que ela está tentando te mostrar
                </p>
                <p>
                  <strong>3. Acalmar:</strong> Encontre uma forma de cuidar de si mesma
                </p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-4 italic">
                Tudo fica salvo no seu histórico para você acompanhar sua evolução emocional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
