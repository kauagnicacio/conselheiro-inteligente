"use client";

import { Button } from "@/components/ui/button";
import { LumLogo } from "@/components/LumIcons";
import { Sparkles } from "lucide-react";

interface WelcomeMessageProps {
  responses: Record<string, string>;
  onContinue: () => void;
}

export function WelcomeMessage({ responses, onContinue }: WelcomeMessageProps) {
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
        </div>

        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-8 md:p-10 mb-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
              Obrigada por responder 💜 Já deu pra perceber algumas coisas sobre seu jeito de lidar com as situações. Se você criar sua conta, a Lum consegue salvar seu histórico e te acompanhar de verdade.
            </p>
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg"
        >
          Criar conta e continuar
          <Sparkles className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
