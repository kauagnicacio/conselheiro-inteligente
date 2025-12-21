"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingQuiz } from "../components/OnboardingQuiz";
import { WelcomeMessage } from "../components/WelcomeMessage";
import { CheckoutScreen } from "../components/CheckoutScreen";

type QuizStep = "quiz" | "welcome" | "checkout";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<QuizStep>("quiz");
  const [quizResponses, setQuizResponses] = useState<Record<string, string>>({});

  const handleQuizComplete = (responses: Record<string, string>) => {
    setQuizResponses(responses);
    
    // Salvar respostas como guest
    localStorage.setItem("lumia-guest-quiz-responses", JSON.stringify(responses));
    localStorage.setItem("lumia-guest-onboarding", "true");
    
    setStep("welcome");
  };

  const handleWelcomeContinue = () => {
    setStep("checkout");
  };

  const handleCheckout = () => {
    // Redirecionar para o checkout real
    window.location.href = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603";
  };

  if (step === "quiz") {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  if (step === "welcome") {
    return <WelcomeMessage responses={quizResponses} onContinue={handleWelcomeContinue} />;
  }

  if (step === "checkout") {
    return <CheckoutScreen onCheckout={handleCheckout} />;
  }

  return null;
}
