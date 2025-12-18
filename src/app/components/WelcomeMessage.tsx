"use client";

import { Button } from "@/components/ui/button";
import { LumAvatar } from "@/components/LumIcons";
import { Sparkles } from "lucide-react";

interface WelcomeMessageProps {
  responses: Record<string, string>;
  onContinue: () => void;
}

export function WelcomeMessage({ responses, onContinue }: WelcomeMessageProps) {
  // Gerar mensagem personalizada baseada nas respostas
  const generateMessage = () => {
    const momento = responses.momento_vida;
    const emocional = responses.rotina_emocional;
    const apoio = responses.apoio_emocional;
    const sensacao = responses.sensacao_predominante;

    let message = "";

    // Introdução acolhedora
    if (momento === "desafiador" || emocional === "sobrecarregado" || sensacao === "cansaco") {
      message = "Eu vejo que você está passando por um momento intenso. ";
    } else if (momento === "transicao" || sensacao === "confusao") {
      message = "Percebo que você está em um momento de mudanças e reflexões. ";
    } else if (momento === "equilibrado" || sensacao === "gratidao") {
      message = "Que bom sentir que você está em um momento mais leve. ";
    } else {
      message = "Obrigada por compartilhar um pouco do seu momento comigo. ";
    }

    // Reconhecimento emocional
    if (apoio === "pouco" || apoio === "nao") {
      message += "Sei que nem sempre é fácil encontrar alguém para conversar de verdade. ";
    } else if (emocional === "altos_baixos" || emocional === "ansioso") {
      message += "Entendo que lidar com essas oscilações pode ser cansativo. ";
    }

    // Acolhimento final
    message += "Aqui você pode ser você mesmo(a), sem julgamentos. A Lum é um espaço seguro para suas emoções, dúvidas e reflexões. Estou aqui para te ouvir e caminhar junto com você. 💜";

    return message;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Avatar e animação */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
            <LumAvatar className="w-24 h-24 relative" />
          </div>
        </div>

        {/* Mensagem personalizada */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                É muito bom te conhecer
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {generateMessage()}
              </p>
            </div>
          </div>
        </div>

        {/* Botão de continuar */}
        <div className="space-y-4">
          <Button
            onClick={onContinue}
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Começar minha jornada com a Lum
          </Button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            🔒 Suas conversas são privadas e seguras. Ninguém tem acesso ao que você escreve aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
