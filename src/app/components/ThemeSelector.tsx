"use client";

import { 
  Heart, 
  Sparkles, 
  Target, 
  Users, 
  Briefcase, 
  BookOpen,
  Brain,
  Smile
} from "lucide-react";

interface Theme {
  id: string;
  name: string;
  icon: any;
  gradient: string;
  description: string;
}

const themes: Theme[] = [
  {
    id: "emocoes",
    name: "Emoções",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    description: "Sentimentos e estados emocionais"
  },
  {
    id: "gratidao",
    name: "Gratidão",
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-600",
    description: "Momentos de reconhecimento"
  },
  {
    id: "medo",
    name: "Medo",
    icon: Brain,
    gradient: "from-indigo-500 to-purple-600",
    description: "Ansiedades e preocupações"
  },
  {
    id: "desejos",
    name: "Desejos",
    icon: Target,
    gradient: "from-cyan-500 to-blue-600",
    description: "Sonhos e objetivos"
  },
  {
    id: "relacionamentos",
    name: "Relacionamentos",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    description: "Conexões e vínculos"
  },
  {
    id: "trabalho",
    name: "Trabalho",
    icon: Briefcase,
    gradient: "from-violet-500 to-purple-600",
    description: "Carreira e projetos"
  },
  {
    id: "crescimento",
    name: "Crescimento",
    icon: BookOpen,
    gradient: "from-green-500 to-emerald-600",
    description: "Aprendizado e evolução"
  },
  {
    id: "bem-estar",
    name: "Bem-estar",
    icon: Smile,
    gradient: "from-yellow-500 to-amber-600",
    description: "Saúde e autocuidado"
  }
];

interface ThemeSelectorProps {
  onSelectTheme: (themeId: string) => void;
  chatCounts: Record<string, number>;
}

export function ThemeSelector({ onSelectTheme, chatCounts }: ThemeSelectorProps) {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-[#1a1a1a] dark:via-[#212121] dark:to-[#1a1a1a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Seus Espaços Mentais
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Escolha um tema para começar ou continuar suas conversas
          </p>
        </div>

        {/* Grid de Temas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const count = chatCounts[theme.id] || 0;

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
                
                {/* Content */}
                <div className="relative p-6 flex flex-col items-start text-left min-h-[160px]">
                  {/* Icon */}
                  <div className="mb-4 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {theme.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/90 mb-3 flex-1">
                    {theme.description}
                  </p>

                  {/* Count Badge */}
                  <div className="flex items-center gap-2 text-xs text-white/90 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <span className="font-medium">
                      {count === 0 ? "Novo" : `${count} conversa${count !== 1 ? "s" : ""}`}
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            💡 Cada tema organiza suas conversas de forma independente
          </p>
        </div>
      </div>
    </div>
  );
}
