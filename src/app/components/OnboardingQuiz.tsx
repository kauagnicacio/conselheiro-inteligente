"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LumLogo, LumAvatar } from "@/components/LumIcons";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
  }[];
}

const questions: Question[] = [
  {
    id: "momento_vida",
    question: "Como você descreveria o momento atual da sua vida?",
    options: [
      { value: "crescimento", label: "Em crescimento e evolução" },
      { value: "transicao", label: "Em transição ou mudança" },
      { value: "estagnado", label: "Estagnado ou sem direção clara" },
      { value: "desafiador", label: "Desafiador e intenso" },
      { value: "equilibrado", label: "Equilibrado e tranquilo" },
    ],
  },
  {
    id: "rotina_emocional",
    question: "Como tem sido sua rotina emocional nos últimos dias?",
    options: [
      { value: "estavel", label: "Estável, me sinto no controle" },
      { value: "altos_baixos", label: "Com altos e baixos frequentes" },
      { value: "sobrecarregado", label: "Sobrecarregado(a) e exausto(a)" },
      { value: "ansioso", label: "Ansioso(a) e preocupado(a)" },
      { value: "leve", label: "Leve e em paz" },
    ],
  },
  {
    id: "apoio_emocional",
    question: "Você sente que tem apoio emocional suficiente?",
    options: [
      { value: "sim_muito", label: "Sim, tenho pessoas em quem confio" },
      { value: "as_vezes", label: "Às vezes, mas nem sempre" },
      { value: "pouco", label: "Pouco, me sinto sozinho(a)" },
      { value: "nao", label: "Não, sinto falta de alguém para conversar" },
      { value: "nao_sei", label: "Não sei dizer ao certo" },
    ],
  },
  {
    id: "preocupacoes",
    question: "O que mais tem ocupado seus pensamentos ultimamente?",
    options: [
      { value: "trabalho", label: "Trabalho e carreira" },
      { value: "relacionamentos", label: "Relacionamentos e afetos" },
      { value: "familia", label: "Família e dinâmicas familiares" },
      { value: "futuro", label: "Futuro e incertezas" },
      { value: "autoconhecimento", label: "Autoconhecimento e propósito" },
    ],
  },
  {
    id: "sensacao_predominante",
    question: "Qual sensação tem sido mais presente em você?",
    options: [
      { value: "esperanca", label: "Esperança e motivação" },
      { value: "medo", label: "Medo ou insegurança" },
      { value: "cansaco", label: "Cansaço emocional" },
      { value: "confusao", label: "Confusão ou dúvida" },
      { value: "gratidao", label: "Gratidão e leveza" },
    ],
  },
  {
    id: "situacao_familiar",
    question: "Como você descreveria sua situação familiar/relacional atual?",
    options: [
      { value: "harmoniosa", label: "Harmoniosa e conectada" },
      { value: "distante", label: "Distante ou desconectada" },
      { value: "conflituosa", label: "Conflituosa ou tensa" },
      { value: "em_construcao", label: "Em construção ou mudança" },
      { value: "independente", label: "Independente e autônoma" },
    ],
  },
  {
    id: "busca_principal",
    question: "O que você mais busca neste momento?",
    options: [
      { value: "clareza", label: "Clareza mental e direção" },
      { value: "acolhimento", label: "Acolhimento e compreensão" },
      { value: "motivacao", label: "Motivação e energia" },
      { value: "paz", label: "Paz interior e equilíbrio" },
      { value: "transformacao", label: "Transformação e crescimento" },
    ],
  },
  {
    id: "como_se_sente",
    question: "Ao pensar em compartilhar suas emoções, como você se sente?",
    options: [
      { value: "confortavel", label: "Confortável e aberto(a)" },
      { value: "receoso", label: "Receoso(a) mas disposto(a)" },
      { value: "vulneravel", label: "Vulnerável e com medo de julgamento" },
      { value: "aliviado", label: "Aliviado(a) por ter um espaço seguro" },
      { value: "esperancoso", label: "Esperançoso(a) por mudanças" },
    ],
  },
];

interface OnboardingQuizProps {
  onComplete: (responses: Record<string, string>) => void;
}

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (!selectedOption) return;

    const newResponses = {
      ...responses,
      [questions[currentQuestion].id]: selectedOption,
    };
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      onComplete(newResponses);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(responses[questions[currentQuestion - 1].id] || "");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LumLogo className="w-16 h-16" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Responda algumas perguntas rápidas pra Lum te conhecer melhor ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            Esse questionário vai te ajudar a refletir sobre você e mostrar padrões da sua vida que às vezes passam despercebidos.
          </p>
          
          {/* Bullets */}
          <div className="bg-white dark:bg-[#212121] rounded-xl p-4 max-w-md mx-auto mb-6">
            <ul className="text-left space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">✓</span>
                <span>Entender melhor como você reage em situações</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">✓</span>
                <span>Reconhecer padrões emocionais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">✓</span>
                <span>Ter conversas mais personalizadas com a Lum</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedOption(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option.value
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedOption === option.value
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedOption === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-12 text-base"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`h-12 text-base bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 ${
              currentQuestion === 0 ? "flex-1" : "flex-1"
            }`}
          >
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          🔒 Suas respostas são privadas e seguras. Ninguém tem acesso ao que você compartilha aqui.
        </p>
      </div>
    </div>
  );
}
