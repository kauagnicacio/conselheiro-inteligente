"use client";

import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";

export default function BackRedirectPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("CUPOM30");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckout = () => {
    window.location.href = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603";
  };

  const handleWhatsApp = () => {
    window.location.href = "https://wa.me/5511949156613?text=Preciso%20de%20ajuda%20antes%20de%20finalizar.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        {/* Headline */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Você estava a um passo de destravar seu espaço. Agora com 30% OFF exclusivo.
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            A Lum já entendeu seu momento pelo quiz. Agora você pode seguir com um chat privado, no seu ritmo.
          </p>
        </div>

        {/* Preço com desconto */}
        <div className="py-2">
          <p className="text-gray-400 text-sm line-through mb-1">
            R$ 37,90/mês
          </p>
          <p className="text-purple-400 font-bold text-2xl">
            R$ 26,53/mês
          </p>
          <p className="text-gray-400 text-xs mt-1">Cancele quando quiser.</p>
        </div>

        {/* Cupom - compacto */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 space-y-2 border border-purple-500/30">
          <p className="text-white font-semibold text-base">
            Cupom de 30% OFF liberado:
          </p>
          <div className="bg-gray-900/80 rounded-lg px-4 py-2 border border-purple-500/50">
            <p className="text-xl font-bold text-purple-400 tracking-wider">
              CUPOM30
            </p>
          </div>
          <button
            onClick={handleCopyCoupon}
            className="w-full bg-gray-700/50 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-gray-600"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Cupom copiado!
              </>
            ) : (
              <>
                Copiar CUPOM30
              </>
            )}
          </button>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          {/* CTA Principal */}
          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
          >
            <Check className="w-5 h-5" />
            Finalizar com 30% OFF (R$ 26,53/mês)
          </button>

          {/* CTA Secundário */}
          <button
            onClick={handleWhatsApp}
            className="w-full bg-gray-800/50 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-gray-700"
          >
            <MessageCircle className="w-5 h-5" />
            Tirar dúvida no WhatsApp
          </button>
        </div>

        {/* Rodapé */}
        <p className="text-gray-400 text-xs pt-2">
          Se você saiu por engano, tudo bem. Você ainda pode continuar agora.
        </p>
      </div>
    </div>
  );
}
