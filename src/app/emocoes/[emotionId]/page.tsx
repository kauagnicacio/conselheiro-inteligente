"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  Check,
  Star,
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
  color: string;
  gradient: string;
  messages: {
    intro: string;
    question1: string;
    understanding: string;
    question2: string;
    exercise: string;
    exerciseQuestion: string;
  };
}

const emotionsData: Record<string, Emotion> = {
  ansiedade: {
    id: "ansiedade",
    name: "Ansiedade",
    icon: Circle,
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    messages: {
      intro: "Você não está errada por sentir isso. A ansiedade é uma emoção natural que aparece quando algo importante pra você está em jogo. Vamos entender juntas o que ela quer te mostrar.",
      question1: "O que despertou essa ansiedade hoje?",
      understanding: "A ansiedade geralmente aparece quando você se importa profundamente com algo. Ela está tentando te preparar para o que vem pela frente.",
      question2: "O que essa ansiedade está tentando te proteger ou te avisar?",
      exercise: "Vamos acalmar juntas. Respire fundo 3 vezes, bem devagar.",
      exerciseQuestion: "Qual atitude pequena você pode tomar agora para cuidar de si?",
    },
  },
  raiva: {
    id: "raiva",
    name: "Raiva",
    icon: Flame,
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-orange-500",
    messages: {
      intro: "Você não está errada por sentir isso. A raiva aparece quando seus limites foram ultrapassados. Vamos entender juntas o que ela quer te mostrar.",
      question1: "O que despertou essa raiva hoje?",
      understanding: "A raiva geralmente aparece quando algo que é importante pra você foi desrespeitado ou ignorado. Ela está te mostrando onde você precisa colocar limites.",
      question2: "O que essa raiva está tentando te proteger ou te avisar?",
      exercise: "Vamos acalmar juntas. Respire fundo 3 vezes e sinta seu corpo relaxar.",
      exerciseQuestion: "Qual atitude pequena você pode tomar agora para cuidar de si?",
    },
  },
  tristeza: {
    id: "tristeza",
    name: "Tristeza",
    icon: Droplets,
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
    messages: {
      intro: "Você não está errada por sentir isso. A tristeza aparece quando algo que você valorizava se foi ou mudou. Vamos entender juntas o que ela quer te mostrar.",
      question1: "O que despertou essa tristeza hoje?",
      understanding: "A tristeza geralmente aparece quando você está processando uma perda ou uma mudança. Ela está te dando espaço para sentir e se reorganizar.",
      question2: "O que essa tristeza está tentando te mostrar sobre o que é importante pra você?",
      exercise: "Vamos acalmar juntas. Respire fundo 3 vezes e permita-se sentir.",
      exerciseQuestion: "Qual atitude pequena você pode tomar agora para cuidar de si?",
    },
  },
  medo: {
    id: "medo",
    name: "Medo",
    icon: AlertTriangle,
    color: "text-yellow-600 dark:text-yellow-400",
    gradient: "from-yellow-500 to-amber-500",
    messages: {
      intro: "Você não está errada por sentir isso. O medo aparece quando você percebe algo que pode te machucar. Vamos entender juntas o que ele quer te mostrar.",
      question1: "O que despertou esse medo hoje?",
      understanding: "O medo geralmente aparece quando você está diante de algo desconhecido ou ameaçador. Ele está tentando te proteger.",
      question2: "O que esse medo está tentando te proteger ou te avisar?",
      exercise: "Vamos acalmar juntas. Respire fundo 3 vezes e sinta-se segura aqui.",
      exerciseQuestion: "Qual atitude pequena você pode tomar agora para cuidar de si?",
    },
  },
  culpa: {
    id: "culpa",
    name: "Culpa",
    icon: FrownIcon,
    color: "text-gray-600 dark:text-gray-400",
    gradient: "from-gray-500 to-slate-500",
    messages: {
      intro: "Você não está errada por sentir isso. A culpa aparece quando você acha que fez algo que vai contra seus valores. Vamos entender juntas o que ela quer te mostrar.",
      question1: "O que despertou essa culpa hoje?",
      understanding: "A culpa geralmente aparece quando você está tentando ser uma pessoa melhor. Ela está te mostrando seus valores e o que importa pra você.",
      question2: "O que essa culpa está tentando te mostrar sobre quem você quer ser?",
      exercise: "Vamos acalmar juntas. Respire fundo 3 vezes e seja gentil consigo mesma.",
      exerciseQuestion: "Qual atitude pequena você pode tomar agora para cuidar de si?",
    },
  },
  vergonha: {
    id: "vergonha",
    name: "Vergonha",
    icon: EyeOff,
    color: "text-pink-600 dark:text-pink-400",
    gradient: "from-pink-500 to-rose-500",
    messages: {
      intro: "Você não está errada por sentir isso. A vergonha aparece quando você acha que há algo errado com você. Vamos entender juntas o que ela quer te mostrar.",
      question1: "O que despertou essa vergonha hoje?",
      understanding: "A vergonha geralmente aparece quando você está se comparando com um padrão impossível. Ela está te mostrando onde você precisa de mais compaixão consigo mesma.",
      question2: "O que essa vergonha está tentando te proteger de sentir?",
      exercise: "Vamos acalmar juntas. Respire fundo 3 vezes e lembre-se: você é humana.",
      exerciseQuestion: "Qual atitude pequena você pode tomar agora para cuidar de si?",
    },
  },
  confusao: {
    id: "confusao",
    name: "Confusão",
    icon: HelpCircleIcon,
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-fuchsia-500",
    messages: {
      intro: "Você não está errada por sentir isso. A confusão aparece quando você está processando muita coisa ao mesmo tempo. Vamos entender juntas o que ela quer te mostrar.",
      question1: "O que despertou essa confusão hoje?",
      understanding: "A confusão geralmente aparece quando você está diante de muitas opções ou informações. Ela está te pedindo para desacelerar e organizar seus pensamentos.",
      question2: "O que essa confusão está tentando te mostrar sobre o que você precisa?",
      exercise: "Vamos acalmar juntas. Respire fundo 3 vezes e permita-se não saber tudo agora.",
      exerciseQuestion: "Qual atitude pequena você pode tomar agora para cuidar de si?",
    },
  },
};

type SidebarTab = "chat" | "perfil" | "quiz" | "reflexao" | "jornada" | "emocoes";

export default function EmotionJourneyPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading, signOut } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    trigger: "",
    protection: "",
    action: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const emotionId = params.emotionId as string;
  const emotion = emotionsData[emotionId];

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

  const handleSidebarTabChange = (tab: SidebarTab) => {
    setIsSidebarOpen(false);
    
    if (tab === "emocoes") {
      router.push("/emocoes");
    } else {
      // Navegar para /home e definir a aba ativa via query parameter
      router.push(`/home?tab=${tab}`);
    }
  };

  const handleLogout = async () => {
    if (confirm("Tem certeza que deseja sair?")) {
      await signOut();
    }
  };

  const handleOpenProfile = () => {
    setIsSidebarOpen(false);
    router.push("/home");
  };

  if (loading || !emotion) {
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

  const Icon = emotion.icon;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (!user) return;

    // Salvar no histórico
    const historyKey = `emotion-${emotionId}-${user.uid}`;
    const existingHistory = localStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];

    const newEntry = {
      date: new Date().toISOString(),
      trigger: answers.trigger,
      protection: answers.protection,
      action: answers.action,
    };

    history.push(newEntry);
    localStorage.setItem(historyKey, JSON.stringify(history));

    // Voltar para a página de emoções
    router.push("/emocoes");
  };

  const canProceed = () => {
    if (currentStep === 1) return answers.trigger.trim().length > 0;
    if (currentStep === 2) return answers.protection.trim().length > 0;
    if (currentStep === 3) return answers.action.trim().length > 0;
    return false;
  };

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
          title={`${emotion.name} - Etapa ${currentStep} de 3`}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
              <div
                className={`h-full bg-gradient-to-r ${emotion.gradient} transition-all duration-500`}
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>

            <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Parte 1 - Reconhecer */}
              {currentStep === 1 && (
                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {emotion.messages.intro}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                      {emotion.messages.question1}
                    </label>
                    <textarea
                      value={answers.trigger}
                      onChange={(e) => setAnswers({ ...answers, trigger: e.target.value })}
                      placeholder="Escreva aqui o que aconteceu..."
                      className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      autoFocus
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`w-full bg-gradient-to-r ${emotion.gradient} hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {/* Parte 2 - Entender */}
              {currentStep === 2 && (
                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl">
                    <Star className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {emotion.messages.understanding}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                      {emotion.messages.question2}
                    </label>
                    <textarea
                      value={answers.protection}
                      onChange={(e) => setAnswers({ ...answers, protection: e.target.value })}
                      placeholder="Escreva aqui sua reflexão..."
                      className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`flex-1 bg-gradient-to-r ${emotion.gradient} hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Parte 3 - Acalmar */}
              {currentStep === 3 && (
                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl">
                    <Star className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {emotion.messages.exercise}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                      {emotion.messages.exerciseQuestion}
                    </label>
                    <textarea
                      value={answers.action}
                      onChange={(e) => setAnswers({ ...answers, action: e.target.value })}
                      placeholder="Ex: Tomar um chá, dar uma volta, conversar com alguém..."
                      className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={handleComplete}
                      disabled={!canProceed()}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Concluir
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Card informativo */}
            <div className="mt-6 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 rounded-2xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                Tudo que você escrever aqui fica salvo no seu histórico emocional. Você pode voltar depois para ver sua evolução.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
