"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingQuiz } from "../components/OnboardingQuiz";
import { WelcomeMessage } from "../components/WelcomeMessage";

type QuizStep = "quiz" | "welcome";

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
    // Redirecionar para cadastro (SEM checkout)
    router.push("/cadastro");
  };

  if (step === "quiz") {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  if (step === "welcome") {
    return <WelcomeMessage responses={quizResponses} onContinue={handleWelcomeContinue} />;
  }

  return null;
}
