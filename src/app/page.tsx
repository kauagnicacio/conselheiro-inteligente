"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Lock, Heart, Check, ChevronDown } from "lucide-react";

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
            Um lugar só seu pra desabafar{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              sem medo de julgamento
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
            Converse, escreva e organize a cabeça em minutos — com perguntas guiadas, quizzes e histórico salvo.
          </p>

          {/* Bullets */}
          <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">Sem exposição. Sem feed. Sem 'print'.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">Tudo fica salvo pra você continuar depois.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">Você pode usar apelido.</p>
            </div>
          </div>

          {/* CTA Principal */}
          <button
            onClick={() => router.push("/quiz")}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Começar o quiz (2 min)
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Leva menos de 2 minutos pra começar.
          </p>
        </div>
      </section>

      {/* IDENTIFICAÇÃO - Dor real */}
      <section className="bg-purple-50 dark:bg-[#1a1a1a] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Se você tá assim, você não tá sozinha.
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Tem dia que a cabeça não desliga. Você quer falar, mas não quer incomodar ninguém — e muito menos ser julgada. A Lum é esse espaço seguro pra colocar tudo pra fora e se entender melhor.
            </p>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO - Quando a mente tá barulhenta */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Quando a mente tá barulhenta…
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
              Praqueles momentos em que você só queria colocar tudo pra fora sem se sentir julgada.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  quando você só quer um lugar pra desabafar sem ser julgada
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  quando seu relacionamento está ficando chato
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  quando precisa falar sobre assuntos delicados da sua família
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  quando precisa tomar uma decisão importante que só você sabe
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  quando seu trabalho está sugando sua energia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS - Bullets específicos */}
      <section className="bg-purple-50 dark:bg-[#1a1a1a] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              O que a Lum faz por você
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Desabafar com contexto</strong> (sem recomeçar do zero)
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Perguntas reflexivas</strong> que destravam sua mente
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Quizzes rápidos</strong> com insights sobre seu momento
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Histórico salvo</strong> pra acompanhar sua evolução
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0f0f0f] rounded-xl">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Um lugar privado</strong> pra organizar pensamentos em 5 minutos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACIDADE - Derrubar medo */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                100% privado
              </h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Nada do que você escreve vira público.
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Ninguém tem acesso ao conteúdo das conversas.
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-[#1a1a1a] rounded-xl">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Seu espaço é seu — sem julgamento.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic">
              A Lum não substitui terapia. Se você estiver em crise, procure ajuda profissional.
            </p>
          </div>
        </div>
      </section>

      {/* PREÇO - Suave, depois do valor */}
      <section className="bg-purple-50 dark:bg-[#1a1a1a] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-[#0f0f0f] p-8 rounded-3xl shadow-xl text-center border border-purple-100 dark:border-purple-900/30">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Acesso completo
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Um espaço que vale mais que o silêncio que você vem guardando.
            </p>
            
            <div className="mb-6">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                R$ 37,90<span className="text-2xl text-gray-500 dark:text-gray-400">/mês</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cancele quando quiser.
              </p>
            </div>

            <button
              onClick={() => router.push("/quiz")}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-3"
            >
              Começar o quiz (2 min)
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Primeiro o quiz (2 min). Depois você experimenta a Lum.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ - Acordeão */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Perguntas frequentes
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
                      Não. É um app de autoconhecimento e apoio emocional. Não substitui acompanhamento profissional.
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
                    É privado mesmo? Alguém pode ver minhas conversas?
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
                      Não. O conteúdo é privado e ninguém acessa suas conversas.
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
                    Por que é assinatura?
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
                      Pra manter o app funcionando e em evolução, com acesso completo todos os dias.
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
                    Posso cancelar quando quiser?
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
                      Sim. Cancelamento a qualquer momento.
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
                    E se eu não me adaptar?
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
                      Você pode cancelar quando quiser.
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
