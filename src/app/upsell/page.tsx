"use client";

import { Check, MessageCircle, Sparkles, Clock, Shield, Lock, Heart, Map, BookOpen } from "lucide-react";

export default function UpsellPage() {
  const handleCheckout = () => {
    window.open("https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603", "_blank");
  };

  const handleSkip = () => {
    window.location.href = "/quiz";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      {/* Header com contexto pós-compra */}
      <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-green-700 dark:text-green-400">
          ✅ Compra confirmada! Aproveite essa oferta exclusiva antes de continuar.
        </p>
      </div>

      {/* Hero */}
      <section className="px-4 pt-10 pb-6 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-full mb-5">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">
            Oferta única — só aparece uma vez
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          Você acabou de dar o primeiro passo. Agora vá além com a Lum IA.
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Um app de saúde emocional com chat 24h, dinâmicas guiadas e ferramentas práticas — criado pra te acompanhar todos os dias, no seu ritmo.
        </p>
      </section>

      {/* O que você tem acesso */}
      <section className="px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 rounded-2xl p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            O que você desbloqueia com a Lum IA:
          </h2>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Chat 24h com a Lum</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Desabafe, organize a cabeça e receba apoio emocional a qualquer hora.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Reflexão guiada diária</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Uma pergunta poderosa por dia para aprofundar seu autoconhecimento.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Jornada das 7 Emoções</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Aprenda a identificar, nomear e lidar com cada emoção no seu dia.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Minha Jornada Semanal</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Acompanhe seu progresso dia a dia com etapas guiadas e resumo semanal.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Biblioteca de conteúdos</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Materiais exclusivos de autoconhecimento, ansiedade e equilíbrio emocional.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Perfil emocional personalizado</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  A Lum aprende com você e adapta cada conversa ao seu momento.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Conversas 100% privadas</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Ninguém tem acesso ao que você escreve. Só você e a Lum.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Ícones de funcionalidades */}
      <section className="px-4 pb-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <MessageCircle className="w-6 h-6 text-purple-500 mb-1.5" />
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Chat 24h</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <Sparkles className="w-6 h-6 text-purple-500 mb-1.5" />
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Reflexão diária</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <Heart className="w-6 h-6 text-purple-500 mb-1.5" />
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">7 Emoções</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <Map className="w-6 h-6 text-purple-500 mb-1.5" />
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Jornada</p>
          </div>
        </div>
      </section>

      {/* Preço + CTA */}
      <section className="px-4 pb-8 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Assinatura mensal — cancele quando quiser
          </p>
          <div className="mb-1">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ 32,90</span>
            <span className="text-lg text-gray-500 dark:text-gray-400">/mês</span>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-5">
            Acesso completo a todas as funcionalidades
          </p>

          <button
            onClick={handleCheckout}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-lg font-bold rounded-xl transition-colors duration-200 shadow-md mb-3"
          >
            Quero a Lum IA agora
          </button>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Acesso imediato</span>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="text-sm text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Não, obrigado — pular essa oferta
          </button>
        </div>
      </section>

      {/* Reforço final */}
      <section className="px-4 pb-12 max-w-2xl mx-auto text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Mais de um app de saúde emocional — um espaço seguro que te acompanha todos os dias, sem julgamentos e sem limites.
        </p>
      </section>
    </div>
  );
}
