"use client";

import { Button } from "@/components/ui/button";
import { LumLogo } from "@/components/LumIcons";
import { Sparkles } from "lucide-react";

interface WelcomeMessageProps {
  responses: Record<string, string>;
  onContinue: () => void;
}

export function WelcomeMessage({ responses, onContinue }: WelcomeMessageProps) {
  // Gerar mensagem personalizada baseada nas respostas
  const generateMessage = () => {
    const momento = responses.momento_vida;
    const busca = responses.busca_principal;
    
    let message = "Obrigada por compartilhar um pouco sobre você. ";
    
    if (momento === "crescimento") {
      message += "É inspirador ver que você está em um momento de crescimento. ";
    } else if (momento === "transicao") {
      message += "Mudanças podem ser desafiadoras, mas também trazem novas oportunidades. ";
    } else if (momento === "desafiador") {
      message += "Reconheço que este é um momento intenso para você. ";
    }
    
    if (busca === "clareza") {
      message += "Vou te ajudar a encontrar a clareza que você busca.";
    } else if (busca === "acolhimento") {
      message += "Estou aqui para te acolher e compreender.";
    } else if (busca === "paz") {
      message += "Juntos, vamos trabalhar para trazer mais paz à sua vida.";
    } else if (busca === "transformacao") {
      message += "Vou te apoiar nessa jornada de transformação.";
    } else {
      message += "Estou aqui para te apoiar no que você precisar.";
    }
    
    return message;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <LumLogo className="w-20 h-20" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Prazer em te conhecer! ✨
          </h1>
        </div>

        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-8 md:p-10 mb-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {generateMessage()}
            </p>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Como a Lum pode te ajudar:
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Conversas profundas e acolhedoras 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Orientação prática para seus desafios diários</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Apoio emocional personalizado baseado no seu perfil</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Ferramentas para autoconhecimento e crescimento</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-center">
              Pronto para começar essa jornada comigo?
            </p>
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg"
        >
          Continuar
          <Sparkles className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
