"use client";

import { X, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PaywallProps {
  onClose: () => void;
  trigger: "message" | "quiz";
}

export function Paywall({ onClose, trigger }: PaywallProps) {
  const handleCheckout = () => {
    // URL do checkout da Kirvano
    const checkoutUrl = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603";
    window.location.href = checkoutUrl;
  };

  const triggerText = trigger === "message" 
    ? "conversar com a Lum" 
    : "fazer quizzes personalizados";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <Card className="relative w-full max-w-lg bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Desbloqueie todo o potencial da Lum
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Para {triggerText}, você precisa ser um membro premium
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Conversas ilimitadas com a Lum
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Converse sobre qualquer tema, quando quiser
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Acesso a todos os quizzes
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Descubra mais sobre você com nossos questionários
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Perfil personalizado
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                A Lum aprende com você e se adapta ao seu jeito
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Suporte prioritário
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tire suas dúvidas com nossa equipe
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={handleCheckout}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-6 text-base shadow-lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Assinar agora
        </Button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          Cancele quando quiser, sem compromisso
        </p>
      </Card>
    </div>
  );
}
