"use client";

import { Button } from "@/components/ui/button";
import { LumLogo } from "@/components/LumIcons";
import { Check, Shield, Clock, Heart } from "lucide-react";

interface CheckoutScreenProps {
  onCheckout: () => void;
}

export function CheckoutScreen({ onCheckout }: CheckoutScreenProps) {
  const handleCheckoutClick = () => {
    // Redirecionar para o link do checkout
    window.location.href = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LumLogo className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Escolha seu plano
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comece sua jornada de autoconhecimento hoje
          </p>
        </div>

        <div className="mb-8">
          {/* Plano Único */}
          <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-8 border-2 border-purple-500 dark:border-purple-400">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Plano Mensal
              </h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  R$ 27,90
                </span>
                <span className="text-gray-600 dark:text-gray-400">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Acesso ilimitado à Lum 24/7
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Conversas personalizadas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Ferramentas de autoconhecimento
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Cancele quando quiser
                </span>
              </li>
            </ul>

            <Button
              onClick={handleCheckoutClick}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              Assinar Agora
            </Button>
          </div>
        </div>

        {/* Garantias */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Shield className="w-10 h-10 text-purple-500" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Pagamento Seguro
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Seus dados protegidos
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Clock className="w-10 h-10 text-purple-500" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Cancele Quando Quiser
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sem compromisso
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Heart className="w-10 h-10 text-purple-500" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Garantia de 7 dias
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Satisfação garantida
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Ao continuar, você concorda com nossos termos de uso e política de privacidade
        </p>
      </div>
    </div>
  );
}
