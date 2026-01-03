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
}

const themes: Theme[] = [
  {
    id: "espaco-livre",
    name: "Espaço Livre",
    icon: MessageCircle,
    description: "Para conversar sobre qualquer coisa"
  },
  {
    id: "relacionamento",
    name: "Relacionamento",
    icon: Heart,
    description: "Amor, namoro e conexões afetivas"
  },
  {
    id: "familia",
    name: "Família",
    icon: Users,
    description: "Relações familiares e vínculos"
  },
  {
    id: "trabalho",
    name: "Trabalho",
    icon: Briefcase,
    description: "Carreira, projetos e vida profissional"
  },
  {
    id: "tomada-decisao",
    name: "Tomada de decisão",
    icon: Target,
    description: "Escolhas importantes e dilemas"
  }
];

interface ThemeSelectorProps {
  onSelectTheme: (themeId: string) => void;
  chatCounts: Record<string, number>;
}

export function ThemeSelector({ onSelectTheme, chatCounts }: ThemeSelectorProps) {
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
            const count = chatCounts[theme.id] || 0;

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[#212121] border border-gray-800 hover:border-purple-500/50"
              >
                {/* Content */}
                <div className="relative p-6 flex flex-col items-start text-left min-h-[180px]">
                  {/* Icon */}
                  <div className="mb-4 p-3 bg-gray-800/50 rounded-xl backdrop-blur-sm group-hover:bg-purple-500/10 transition-colors">
                    <Icon className="w-7 h-7 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    {theme.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-3 flex-1">
                    {theme.description}
                  </p>

                  {/* Count Badge */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <span className="font-medium">
                      {count === 0 ? "Começar" : `${count} conversa${count !== 1 ? "s" : ""}`}
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors pointer-events-none" />
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
