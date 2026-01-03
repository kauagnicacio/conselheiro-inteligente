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
  description: string;
  color: string;
  glowColor: string;
}

const themes: Theme[] = [
  {
    id: "espaco-livre",
    name: "Espaço Livre",
    icon: MessageCircle,
    description: "Para conversar sobre qualquer coisa",
    color: "text-blue-400",
    glowColor: "border-blue-500/50 hover:shadow-blue-500/20"
  },
  {
    id: "relacionamento",
    name: "Relacionamento",
    icon: Heart,
    description: "Amor, namoro e conexões afetivas",
    color: "text-pink-400",
    glowColor: "border-pink-500/50 hover:shadow-pink-500/20"
  },
  {
    id: "familia",
    name: "Família",
    icon: Users,
    description: "Relações familiares e vínculos",
    color: "text-emerald-400",
    glowColor: "border-emerald-500/50 hover:shadow-emerald-500/20"
  },
  {
    id: "trabalho",
    name: "Trabalho",
    icon: Briefcase,
    description: "Carreira, projetos e vida profissional",
    color: "text-amber-400",
    glowColor: "border-amber-500/50 hover:shadow-amber-500/20"
  },
  {
    id: "tomada-decisao",
    name: "Tomada de decisão",
    icon: Target,
    description: "Escolhas importantes e dilemas",
    color: "text-purple-400",
    glowColor: "border-purple-500/50 hover:shadow-purple-500/20"
  }
];

interface ThemeSelectorProps {
  onSelectTheme: (themeId: string) => void;
}

export function ThemeSelector({ onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="h-full overflow-y-auto bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">
            Suas Conversas
          </h1>
          <p className="text-base md:text-lg text-gray-400">
            Escolha um tema para começar ou continuar
          </p>
        </div>

        {/* Grid de Temas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {themes.map((theme) => {
            const Icon = theme.icon;

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[#212121] border ${theme.glowColor}`}
              >
                {/* Content */}
                <div className="relative p-6 flex flex-col items-start text-left min-h-[180px]">
                  {/* Icon com cor do tema */}
                  <div className={`mb-4 p-3 bg-gray-800/50 rounded-xl backdrop-blur-sm group-hover:bg-${theme.color.split('-')[1]}-500/10 transition-colors`}>
                    <Icon className={`w-7 h-7 ${theme.color} transition-colors`} />
                  </div>

                  {/* Title com acento de cor */}
                  <h3 className={`text-xl font-bold text-gray-100 mb-2 group-hover:${theme.color} transition-colors`}>
                    {theme.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-3 flex-1">
                    {theme.description}
                  </p>

                  {/* Indicador de continuidade */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium">
                      Conversa contínua
                    </span>
                  </div>
                </div>

                {/* Hover Effect com cor do tema */}
                <div className={`absolute inset-0 bg-${theme.color.split('-')[1]}-500/0 group-hover:bg-${theme.color.split('-')[1]}-500/5 transition-colors pointer-events-none`} />
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            💡 Organize sua vida por contextos emocionais
          </p>
        </div>
      </div>
    </div>
  );
}
