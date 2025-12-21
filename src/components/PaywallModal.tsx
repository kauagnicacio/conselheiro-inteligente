"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export function PaywallModal({ isOpen, onClose, feature }: PaywallModalProps) {
  const handleSubscribe = () => {
    window.location.href = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Desbloqueie o Acesso Completo
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Para {feature}, você precisa de uma assinatura ativa.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Conversas ilimitadas com a Lum
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Acesso a todos os quizzes e análises
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Resultados completos e personalizados
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Apoio emocional 24/7
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              R$ 27,90<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/mês</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cancele quando quiser, sem compromisso
            </p>
          </div>

          <Button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-6 text-lg"
          >
            Assinar Agora
          </Button>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
          >
            Voltar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
