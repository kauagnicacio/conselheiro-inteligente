"use client";

import { Check, Shield, Zap, BookOpen, Clock, Star } from "lucide-react";

export default function EbookPage() {
  const handleCheckout = () => {
    window.open("https://pay.kirvano.com/81f427d1-e27a-4a7a-a569-00c800265671", "_blank");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      {/* Hero */}
      <section className="px-4 pt-12 pb-8 max-w-2xl mx-auto text-center">
        {/* Badge de oferta exclusiva */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-full mb-6">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
            Oferta exclusiva para clientes do produto físico
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          O Guia Definitivo Para Vencer a Ansiedade no Dia a Dia
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
          Um eBook prático, direto ao ponto — com técnicas aplicáveis no seu dia a dia pra desacelerar a mente, controlar o corpo e retomar o equilíbrio.
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Criado para complementar o produto que você já recebeu. Juntos, eles formam um protocolo completo.
        </p>
      </section>

      {/* O que você vai receber */}
      <section className="px-4 py-8 max-w-2xl mx-auto">
        <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              O que você vai receber
            </h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Técnicas de respiração anti-ansiedade
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Exercícios validados que acalmam o sistema nervoso em minutos.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Protocolo para noites de insônia
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Rotina passo a passo para desligar a mente e dormir com qualidade.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Como parar de pensar demais (ruminação)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Estratégias práticas para sair do loop de pensamentos negativos.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Rotina matinal para iniciar o dia sem ansiedade
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  5 minutos que mudam o tom emocional de todo o seu dia.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Gatilhos de ansiedade: como identificar e neutralizar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Entenda o que ativa sua ansiedade e como agir antes que ela tome conta.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Plano de 7 dias para retomar o equilíbrio emocional
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Um guia diário com ações simples e progressivas para sentir diferença rápido.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Diferenciais rápidos */}
      <section className="px-4 pb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <Zap className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Acesso imediato</p>
            <p className="text-xs text-gray-400 mt-0.5">Leia agora mesmo</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <Clock className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Acesso vitalício</p>
            <p className="text-xs text-gray-400 mt-0.5">Sem prazo de expiração</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <Shield className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Garantia de 7 dias</p>
            <p className="text-xs text-gray-400 mt-0.5">100% do dinheiro de volta</p>
          </div>
        </div>
      </section>

      {/* Preço + CTA — âncora principal */}
      <section className="px-4 pb-12 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm text-center">
          {/* Preço */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Oferta exclusiva para quem já comprou o produto físico
          </p>
          <div className="mb-1">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ 27,90</span>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-5">
            Pagamento único · Acesso vitalício
          </p>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-lg font-bold rounded-xl transition-colors duration-200 shadow-md"
          >
            Quero meu eBook agora
          </button>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            Pagamento seguro · Você recebe o acesso na hora
          </p>
        </div>
      </section>

      {/* Reforço final */}
      <section className="px-4 pb-12 max-w-2xl mx-auto text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Você já deu o primeiro passo com o produto físico. O eBook completa a jornada — dando a você as ferramentas mentais e práticas para lidar com a ansiedade no seu dia a dia, de forma simples e acessível.
        </p>
      </section>
    </div>
  );
}
