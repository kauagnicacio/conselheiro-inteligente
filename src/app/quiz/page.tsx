"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { QuizAppPreview } from "@/components/QuizAppPreview";
import { OnboardingQuiz } from "@/app/components/OnboardingQuiz";

export default function QuizPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (responses: Record<string, string>) => {
    // O OnboardingQuiz já cuida do redirecionamento para /teste
    console.log("Quiz completo", responses);
  };

  // Se o quiz foi iniciado, mostrar o componente OnboardingQuiz
  if (showQuiz) {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  // Página inicial com o CTA para iniciar o quiz
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Passo 1 para testar o app
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Faça o quiz e comece a testar a Lum
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Um quiz rápido personaliza a Lum pra você — e logo depois você já testa o app de verdade, com chat 24h, dinâmicas guiadas e histórico salvo.
            </p>

            {/* CTA Button with Gradient */}
            <button
              onClick={handleStartQuiz}
              className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-xl font-bold rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105 mb-3"
            >
              Fazer o quiz
            </button>
            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
              Leva 2 minutos. Depois você já acessa o app completo.
            </p>
          </div>

          {/* App Preview with Tabs */}
          <div className="bg-purple-50 dark:bg-[#1a1a1a] rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Veja o que você vai testar logo depois do quiz
            </h2>
            <QuizAppPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
