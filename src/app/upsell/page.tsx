"use client";

import { Check, Sparkles, MessageCircle, Heart, Map, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpsellPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/teste");
  };

  const handleSkip = () => {
    router.push("/quiz");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">

        {/* Badge de confirmação */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-full mb-5">
            <span className="text-sm font-semibold text-green-400">
              ✅ Compra confirmada!
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Você ganhou um teste grátis da Lum IA 🎉
          </h1>

          <p className="text-base text-gray-400 leading-relaxed">
            Pra te ajudar a aplicar o eBook na prática e sentir diferença no dia a dia.
          </p>
        </div>

        {/* Bullets do que vai testar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-300 mb-1">O que você vai testar:</p>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm text-gray-200">
              <span className="font-medium">Chat 24h</span> pra desabafar e organizar a mente
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm text-gray-200">
              <span className="font-medium">Perguntas guiadas</span> quando você travar
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm text-gray-200">
              <span className="font-medium">Reflexão do dia</span> pra destravar clareza
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm text-gray-200">
              <span className="font-medium">Minha Jornada</span> — rotina curta diária
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm text-gray-200">
              <span className="font-medium">Psicólogos online</span> quando quiser ajuda profissional
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleStart}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-lg font-bold rounded-xl transition-colors duration-200 shadow-lg shadow-purple-900/40"
          >
            Começar meu teste grátis
          </button>

          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors py-2"
          >
            Não agora, voltar depois
          </button>
        </div>

      </div>
    </div>
  );
}
