"use client";

import { 
  MessageCircle, 
  Heart, 
  Users, 
  Briefcase, 
  Target
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
    id: "espaco-livre",
    name: "Espaço Livre",
    icon: MessageCircle,
    gradient: "from-purple-500 to-purple-600",
    description: "Para conversar sobre qualquer coisa"
  },
  {
    id: "relacionamento",
    name: "Relacionamento",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    description: "Amor, namoro e conexões afetivas"
  },
  {
    id: "familia",
    name: "Família",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    description: "Relações familiares e vínculos"
  },
  {
    id: "trabalho",
    name: "Trabalho",
    icon: Briefcase,
    gradient: "from-blue-500 to-indigo-600",
    description: "Carreira, projetos e vida profissional"
  },
  {
    id: "tomada-decisao",
    name: "Tomada de decisão",
    icon: Target,
    gradient: "from-amber-500 to-orange-600",
    description: "Escolhas importantes e dilemas"
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
            Suas Conversas
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Escolha um tema para começar ou continuar
          </p>
        </div>

        {/* Grid de Temas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
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
                <div className="relative p-6 flex flex-col items-start text-left min-h-[180px]">
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
                      {count === 0 ? "Começar" : `${count} conversa${count !== 1 ? "s" : ""}`}
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
            💡 Organize sua vida por contextos emocionais
          </p>
        </div>
      </div>
    </div>
  );
}
