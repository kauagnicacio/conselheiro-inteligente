"use client";

import { useRouter } from "next/navigation";
import { OnboardingQuiz } from "../components/OnboardingQuiz";

export default function QuizPage() {
  const router = useRouter();

  const handleQuizComplete = (responses: Record<string, string>) => {
    // Salvar respostas no localStorage
    localStorage.setItem('quiz-responses', JSON.stringify(responses));
    
    // Redirecionar para /teste (primeira leitura)
    router.push('/teste');
  };

  return <OnboardingQuiz onComplete={handleQuizComplete} />;
}
