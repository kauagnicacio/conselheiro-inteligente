"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl?: string;
}

export function CheckoutModal({ isOpen, onClose, checkoutUrl = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603" }: CheckoutModalProps) {
  if (!isOpen) return null;

  const handleCheckout = () => {
    // APENAS redirecionar para a Kirvano
    // A Kirvano dispara InitiateCheckout automaticamente
    // NÃO disparar nenhum evento aqui
    window.open(checkoutUrl, "_blank");
  };

  const handleClose = () => {
    // Disparar evento global para notificar componentes
    window.dispatchEvent(new Event('checkout-modal-closed'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal com margens laterais e responsivo */}
      <div className="relative w-full max-w-md mx-4 sm:mx-6 bg-white dark:bg-[#212121] rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Container com padding e rolagem interna */}
        <div className="p-6 sm:p-8">
          {/* Botão Fechar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Conteúdo */}
          <div className="text-center space-y-6">
            {/* Título */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 pr-8">
              Pra continuar essa conversa, libere seu acesso completo ✨
            </h2>

            {/* Subtítulo */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Você já deu o primeiro passo no quiz — agora é só destravar pra conversar de verdade com a Lum, sem limites.
            </p>

            {/* Preço */}
            <div className="py-3 px-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                R$ 42,70/mês
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Um espaço que vale mais que o silêncio que você vem guardando.
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">🔒</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    Conversas 100% privadas
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Ninguém tem acesso ao que você escreve.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">💬</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    Chat contínuo e sem limites
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Converse sempre que precisar, 24/7.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">❌</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    Cancele quando quiser
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Sem fidelidade e sem burocracia.
                  </p>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-5 sm:py-6 text-sm sm:text-base"
              >
                Liberar acesso completo
              </Button>

              <Button
                onClick={handleClose}
                variant="ghost"
                className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm sm:text-base"
              >
                Continuar explorando
              </Button>
            </div>

            {/* Microcopy */}
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
              Você pode explorar à vontade. Pra enviar mensagens e interagir, precisa desbloquear.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
