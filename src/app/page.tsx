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
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            POV: você precisa falar sobre isso, mas não sabe com quem
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Chat 24h pra desabafar, refletir e organizar a cabeça. Privado, seguro e sempre disponível.
          </p>

          {/* Bullets */}
          <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300"><strong>Chat 24h</strong> sobre qualquer coisa</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300"><strong>Sem exposição</strong> - sem feed, sem print</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300"><strong>Histórico salvo</strong> - continua depois</p>
            </div>
          </div>

          {/* CTA Principal */}
          <button
            onClick={() => router.push("/teste")}
            className="w-full md:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Testar agora
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            2 minutos pra começar. É rápido.
          </p>
        </div>
      </section>

      {/* SITUAÇÕES REAIS - Estilo meme/POV */}
      <section className="bg-purple-50 dark:bg-[#1a1a1a] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Quando você não sabe com quem falar sobre...
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  "Será que eu tô errada em não deixar meu namorado ir jogar bola?"
                </p>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  "Meu relacionamento tá chato, mas tenho medo de terminar"
                </p>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  "Tenho ansiedade mas não consigo contar pra ninguém"
                </p>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  "Preciso tomar uma decisão importante e tô perdida"
                </p>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  "Assuntos de família que não dá pra contar pros amigos"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA - Experiência do app */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Como funciona a Lum
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
              Um espaço feito pra você se entender melhor
            </p>

            <div className="space-y-6">
              {/* Chat 24h */}
              <div className="p-6 bg-purple-50 dark:bg-[#1a1a1a] rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  💬 Chat 24h disponível
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Fale sobre qualquer coisa: relacionamento, ansiedade, família, trabalho... sem julgamento.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A Lum lembra do contexto e continua a conversa de onde você parou.
                </p>
              </div>

              {/* Perguntas reflexivas */}
              <div className="p-6 bg-purple-50 dark:bg-[#1a1a1a] rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  🤔 Perguntas que te ajudam a pensar
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  A Lum não só ouve — ela faz perguntas pra você se entender melhor.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Como terapia, mas você conversa no seu tempo.
                </p>
              </div>

              {/* Quiz e dinâmicas */}
              <div className="p-6 bg-purple-50 dark:bg-[#1a1a1a] rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  ✨ Quiz e dinâmicas rápidas
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Quer algo mais direcionado? Tem quiz sobre emoções, relacionamento, autoconhecimento...
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Responde e recebe insights personalizados.
                </p>
              </div>

              {/* Privacidade */}
              <div className="p-6 bg-purple-50 dark:bg-[#1a1a1a] rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  🔒 Totalmente privado
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Sem feed, sem likes, sem exposição. Ninguém vê suas conversas.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pode até usar apelido se quiser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA INTERMEDIÁRIO */}
      <section className="bg-purple-600 dark:bg-purple-700 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Experimente agora
            </h2>
            <p className="text-lg text-purple-100 mb-6">
              Leva 2 minutos pra testar. Você vai ver como funciona.
            </p>
            <button
              onClick={() => router.push("/teste")}
              className="w-full md:w-auto px-8 py-4 bg-white text-purple-600 hover:bg-purple-50 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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
