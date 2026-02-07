"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CheckoutContext =
  | "chat-limit"
  | "quiz-result"
  | "reflexao-continue"
  | "jornada-gratitude"
  | "emocoes-complete"
  | "image-blocked"
  | "audio-blocked"
  | "default";

interface CheckoutModalContextualProps {
  isOpen: boolean;
  onClose: () => void;
  context?: CheckoutContext;
  checkoutUrl?: string;
}

const contextMessages: Record<CheckoutContext, { title: string; description: string }> = {
  "chat-limit": {
    title: "Você atingiu o limite de mensagens no modo teste 💬",
    description: "Assine para ter conversas ilimitadas com a Lum, 24h por dia, sempre que precisar."
  },
  "quiz-result": {
    title: "Assine para ver seu resultado completo ✨",
    description: "Descubra insights profundos sobre você e continue sua jornada de autoconhecimento."
  },
  "reflexao-continue": {
    title: "Assine para salvar e continuar essa conversa 🌟",
    description: "Aprofunde suas reflexões e salve todos os seus momentos de conexão com a Lum."
  },
  "jornada-gratitude": {
    title: "Para finalizar a sua jornada diária, assine a Lum IA 🙏",
    description: "Tenha acesso completo ao exercício de Gratidão do dia e todos os recursos para sua transformação pessoal."
  },
  "emocoes-complete": {
    title: "Assine para concluir sua jornada e destravar o próximo passo 💜",
    description: "Finalize o processo de reconhecimento das suas emoções e converse sobre isso com a Lum."
  },
  "image-blocked": {
    title: "Para mandar imagens ilimitadas, assine já 📸",
    description: "Compartilhe fotos e imagens com a Lum sem limites para aprofundar suas conversas."
  },
  "audio-blocked": {
    title: "Para mandar áudios ilimitados, assine já 🎤",
    description: "Envie áudios e fale livremente com a Lum sempre que precisar se expressar."
  },
  "default": {
    title: "Libere seu acesso completo à Lum IA ✨",
    description: "Assine para ter acesso ilimitado a todas as funcionalidades e conversar sem limites."
  }
};

export function CheckoutModalContextual({
  isOpen,
  onClose,
  context = "default",
  checkoutUrl = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603"
}: CheckoutModalContextualProps) {
  if (!isOpen) return null;

  const { title, description } = contextMessages[context];

  const handleCheckout = () => {
    window.open(checkoutUrl, "_blank");
  };

  const handleClose = () => {
    window.dispatchEvent(new Event('checkout-modal-closed'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 sm:mx-6 bg-white dark:bg-[#212121] rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="text-center space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 pr-8">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>

            <div className="py-3 px-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                R$ 37,90/mês
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Um espaço que vale mais que o silêncio que você vem guardando.
              </p>
            </div>

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

            <div className="space-y-3 pt-4">
              <Button
                onClick={handleCheckout}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-5 sm:py-6 text-sm sm:text-base"
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

            <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
              Você pode explorar à vontade. Pra enviar mensagens e interagir, precisa desbloquear.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
