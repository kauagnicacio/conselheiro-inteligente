"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Lock, Heart, Check, ChevronDown } from "lucide-react";
import { trackViewContent } from "@/lib/meta-pixel";
import { AppScreenshots } from "@/components/AppScreenshots";

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
      <section className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            {/* Headline FORTE */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Quando sua cabeça tá barulhenta, você precisa de um lugar seguro
            </h1>

            {/* Subheadline - Benefício + Diferencial */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Chat 24h pra desabafar e se entender melhor, com perguntas guiadas, quizzes e histórico salvo. A Lum lembra do contexto — você não precisa repetir tudo.
            </p>

            {/* CTA Principal MAIOR */}
            <button
              onClick={() => router.push("/teste")}
              className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105 mb-3"
            >
              Testar agora
            </button>
            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
              Comece a testar agora. 100% privado.
            </p>
          </div>

          {/* Carrossel com prints reais do app */}
          <div className="mb-16">
            <div className="bg-purple-50 dark:bg-[#1a1a1a] rounded-3xl p-8 md:p-12">
              <AppScreenshots />
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS - Copy vendável */}
      <section className="py-16 md:py-24 bg-purple-50 dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Por que a Lum é diferente
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto">
              Não é só mais um chatbot. É um espaço privado que entende você e cresce com você.
            </p>

            <div className="grid gap-5">
              <div className="flex items-start gap-5 p-6 bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Check className="w-7 h-7 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Chat 24h sobre qualquer assunto
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Relacionamento, ansiedade, família, trabalho... Desabafe sem julgamento, a qualquer hora.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Check className="w-7 h-7 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    A Lum lembra do contexto
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Não precisa repetir sua história toda vez. Ela lembra das conversas anteriores e continua de onde parou.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Check className="w-7 h-7 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Perguntas que destravam sua mente
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Quando você tá travado, a Lum faz perguntas guiadas pra te ajudar a organizar o que tá sentindo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Check className="w-7 h-7 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Quizzes rápidos pra organizar a cabeça em 2 min
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Quer algo direcionado? Responda quizzes sobre emoções, relacionamento, ansiedade e receba insights na hora.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Check className="w-7 h-7 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Histórico salvo pra continuar depois
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Todas as conversas ficam salvas automaticamente. Você volta quando quiser e continua de onde parou.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Check className="w-7 h-7 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    100% privado — sem feed, sem exposição
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Ninguém vê suas conversas. Sem likes, sem prints, sem julgamento. É só você e a Lum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA INTERMEDIÁRIO (após diferenciais) */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Quer ver como funciona?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto">
              Teste gratuitamente. Abra e veja como funciona na prática.
            </p>
            <button
              onClick={() => router.push("/teste")}
              className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105"
            >
              Testar agora
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

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2024 Lum. Seu espaço seguro de autoconhecimento.</p>
      </footer>
    </div>
  );
}
