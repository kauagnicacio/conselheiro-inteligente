"use client";

import { MessageCircle, Brain, Pen, Sprout, Heart, BookOpen, Users } from "lucide-react";

interface InicioViewProps {
  onNavigate: (destination: "chat" | "quiz" | "reflexao" | "jornada" | "emocoes" | "biblioteca" | "psicologos") => void;
  isDemo?: boolean;
  onDemoAction?: (context?: string) => void;
}

export function InicioView({ onNavigate, isDemo, onDemoAction }: InicioViewProps) {
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
    {
      icon: BookOpen,
      label: "Meu Material",
      description: "Ebooks e áudios",
      destination: "biblioteca" as const,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Users,
      label: "Psicólogos",
      description: "Profissionais indicados",
      destination: "psicologos" as const,
      gradient: "from-violet-500 to-fuchsia-500",
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

        {/* Instagram */}
        <div className="text-center pt-6">
          <a
            href="https://instagram.com/app_lumia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-purple-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
            <span>Acompanhe: @app_lumia</span>
          </a>
        </div>
      </div>
    </div>
  );
}
