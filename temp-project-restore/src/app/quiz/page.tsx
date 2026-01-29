"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingQuiz } from "../components/OnboardingQuiz";
import { AppPreview } from "../components/AppPreview";

type QuizStep = "quiz" | "preview";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<QuizStep>("quiz");
  const [quizResponses, setQuizResponses] = useState<Record<string, string>>({});

  const handleQuizComplete = (responses: Record<string, string>) => {
    setQuizResponses(responses);
    
    // Salvar respostas como guest
    localStorage.setItem("lumia-guest-quiz-responses", JSON.stringify(responses));
    localStorage.setItem("lumia-guest-onboarding", "true");
    
    // Ir para preview do app
    setStep("preview");
  };

  const handleCheckout = () => {
    // Redirecionar para checkout (Kirvano)
    // TODO: Substituir pela URL real do checkout
    window.location.href = "https://pay.kirvano.com/seu-link-de-checkout";
  };

  if (step === "quiz") {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  if (step === "preview") {
    return <AppPreview responses={quizResponses} onCheckout={handleCheckout} />;
  }

  return null;
}
