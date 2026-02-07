"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Lock, Heart, Check, ChevronDown } from "lucide-react";
import { trackViewContent } from "@/lib/meta-pixel";

export default function RootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showLanding, setShowLanding] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/home");
      } else {
        setShowLanding(true);
        // Disparar ViewContent quando landing page é exibida
        trackViewContent('Landing Page - Lum IA');
      }
    }
  }, [user, loading, router]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (loading || !showLanding) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1a1a1a]">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      {/* HERO - Primeira dobra */}
      <section className="container mx-auto px-4 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Headline */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              O que é a Lum IA?
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Um chat 24h pra desabafar e organizar a cabeça — com privacidade e histórico salvo.
            </p>

            {/* CTA Principal */}
            <button
              onClick={() => router.push("/teste")}
              className="w-full md:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
            >
              Testar agora
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              2 minutos pra começar. É rápido.
            </p>
          </div>

          {/* Preview do App */}
          <div className="mb-12">
            <div className="bg-purple-50 dark:bg-[#1a1a1a] rounded-3xl p-8 md:p-12">
              <div className="max-w-sm mx-auto">
                {/* Mock de Celular */}
                <div className="relative mx-auto w-full max-w-[280px] aspect-[9/19] bg-gray-900 rounded-[36px] border-8 border-gray-900 shadow-2xl overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />

                  {/* Tela do App */}
                  <div className="w-full h-full bg-white dark:bg-[#0f0f0f] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full" />
                        <span className="font-semibold text-sm">Lum</span>
                      </div>
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 p-4 space-y-3 bg-gray-50 dark:bg-[#0a0a0a]">
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl rounded-tl-sm p-3 max-w-[80%] shadow-sm">
                          <p className="text-xs text-gray-800 dark:text-gray-200">
                            Como você está se sentindo hoje?
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%] shadow-sm">
                          <p className="text-xs">
                            Tô confusa sobre uma decisão...
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl rounded-tl-sm p-3 max-w-[80%] shadow-sm">
                          <p className="text-xs text-gray-800 dark:text-gray-200">
                            Conte mais sobre isso. O que te deixa confusa?
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#1a1a1a] rounded-full px-4 py-2">
                        <span className="text-xs text-gray-400 flex-1">Digite aqui...</span>
                        <div className="w-6 h-6 bg-purple-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-12 md:py-16 bg-purple-50 dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Como funciona
            </h2>

            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <Check className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Chat 24h sobre qualquer coisa
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Relacionamento, ansiedade, família, trabalho... Sem julgamento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <Check className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Lembra do contexto
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Não precisa recomeçar do zero. A Lum lembra das conversas anteriores.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <Check className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Perguntas guiadas / reflexões
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A Lum faz perguntas pra te ajudar a se entender melhor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <Check className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Quizzes rápidos com insights
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quer algo direcionado? Tem quiz sobre emoções, relacionamento e mais.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <Check className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Histórico salvo pra continuar depois
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Todas as conversas ficam salvas. Você volta quando quiser.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <Check className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Privado (sem feed, sem exposição)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ninguém vê suas conversas. Sem likes, sem print, sem julgamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Experimente agora
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Leva 2 minutos pra testar. Você vai ver como funciona.
            </p>
            <button
              onClick={() => router.push("/teste")}
              className="w-full md:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Testar a Lum agora
            </button>
          </div>
        </div>
      </section>

      {/* FAQ - Acordeão */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Dúvidas comuns
            </h2>

            <div className="space-y-3">
              {/* FAQ 1 */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(0)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#0f0f0f] transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    Isso é terapia?
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === 0 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === 0 ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      Não. É um espaço de autoconhecimento e apoio emocional, mas não substitui terapia ou acompanhamento profissional.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(1)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#0f0f0f] transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    Minhas conversas são privadas?
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === 1 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === 1 ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      Sim, totalmente. Ninguém acessa suas conversas. Não tem feed, não tem exposição.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(2)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#0f0f0f] transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    Como funciona o histórico das conversas?
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === 2 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === 2 ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      Tudo fica salvo. Você pode voltar e continuar a conversa de onde parou, e a Lum vai lembrar do contexto.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(3)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#0f0f0f] transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    Posso testar antes?
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === 3 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === 3 ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      Sim! Clique em "Testar agora" e você vai ver como funciona antes de decidir.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(4)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#0f0f0f] transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    Preciso de muito tempo pra usar?
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === 4 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === 4 ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      Não. Use quando quiser, quanto quiser. Pode ser 5 minutos ou 30 minutos. Você decide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Comece agora
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              2 minutos pra testar. Totalmente privado.
            </p>
            <button
              onClick={() => router.push("/teste")}
              className="w-full md:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Testar a Lum agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2024 Lum. Seu espaço seguro de autoconhecimento.</p>
      </footer>
    </div>
  );
}
