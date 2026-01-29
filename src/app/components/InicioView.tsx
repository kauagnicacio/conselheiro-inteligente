"use client";

import { MessageCircle, Brain, Pen, Sprout, Heart } from "lucide-react";

interface InicioViewProps {
  onNavigate: (destination: "chat" | "quiz" | "reflexao" | "jornada" | "emocoes") => void;
}

export function InicioView({ onNavigate }: InicioViewProps) {
  const intentions = [
    {
      icon: MessageCircle,
      label: "Conversar com a Lum",
      description: "Espaço Livre",
      destination: "chat" as const,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Brain,
      label: "Me entender melhor",
      description: "Quiz",
      destination: "quiz" as const,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Pen,
      label: "Refletir um pouco",
      description: "Reflexão do Dia",
      destination: "reflexao" as const,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Sprout,
      label: "Cuidar da minha jornada",
      description: "Minha Jornada",
      destination: "jornada" as const,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Heart,
      label: "Explorar minhas emoções",
      description: "As 7 Emoções",
      destination: "emocoes" as const,
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-900/20 via-[#1a1a1a] to-[#1a1a1a]">
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-12 space-y-8">
        {/* Header Emocional */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-100 leading-relaxed">
            Como você quer cuidar de você hoje?
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-light max-w-md mx-auto">
            Escolha a forma que mais faz sentido agora
          </p>
        </div>

        {/* Botões de Intenção */}
        <div className="space-y-4">
          {intentions.map((intention) => {
            const Icon = intention.icon;
            return (
              <button
                key={intention.destination}
                onClick={() => onNavigate(intention.destination)}
                className="w-full group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="flex items-center gap-4 p-6">
                  {/* Ícone com Gradiente */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${intention.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Texto */}
                  <div className="flex-1 text-left">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-100 mb-1 group-hover:text-white transition-colors">
                      {intention.label}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {intention.description}
                    </p>
                  </div>

                  {/* Seta Sutil */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mensagem de Rodapé Emocional */}
        <div className="text-center pt-8">
          <p className="text-sm text-gray-500 font-light italic max-w-md mx-auto leading-relaxed">
            Você não está entrando num app.
            <br />
            Você está entrando num espaço seu.
          </p>
        </div>
      </div>
    </div>
  );
}
