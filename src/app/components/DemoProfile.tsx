"use client";

import { useState, useEffect } from "react";
import { User, Camera, Edit2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DemoProfileProps {
  onDemoAction: () => void;
}

interface CharacteristicData {
  summary: string;
  positives: string[];
  challenges: string[];
}

const CHARACTERISTIC_LABELS = {
  humor: "Humor",
  temperament: "Temperamento",
  emotions: "Forma de lidar com emoções",
  decisions: "Tomada de decisão",
};

interface QuizQuestion {
  question: string;
  type: "multiple" | "open";
  options?: string[];
}

export function DemoProfile({ onDemoAction }: DemoProfileProps) {
  const [activeQuiz, setActiveQuiz] = useState<keyof typeof CHARACTERISTIC_LABELS | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Detectar quando modal fecha e voltar para perfil principal
  useEffect(() => {
    if (showResult) {
      const handleModalClose = () => {
        handleCancelQuiz();
      };

      window.addEventListener('checkout-modal-closed', handleModalClose);

      return () => {
        window.removeEventListener('checkout-modal-closed', handleModalClose);
      };
    }
  }, [showResult]);

  const handleStartQuiz = (characteristic: keyof typeof CHARACTERISTIC_LABELS) => {
    setActiveQuiz(characteristic);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const handleAnswer = () => {
    if (!activeQuiz) return;

    const questions = getQuestionsForCharacteristic(activeQuiz);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Chegou no final do quiz - mostrar resultado desfocado e abrir checkout
      setShowResult(true);
      setTimeout(() => {
        onDemoAction();
      }, 100);
    }
  };

  const handleCancelQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  // Se está em um quiz
  if (activeQuiz) {
    const questions = getQuestionsForCharacteristic(activeQuiz);
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#1a1a1a] overflow-y-auto relative">
        {/* Overlay desfocado quando mostra resultado */}
        {showResult && (
          <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10" />
        )}

        <div className={`max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 ${showResult ? 'blur-sm' : ''}`}>
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleCancelQuiz}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center gap-2"
              disabled={showResult}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {CHARACTERISTIC_LABELS[activeQuiz]}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Pergunta {currentQuestion + 1} de {questions.length}
            </p>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Pergunta */}
          <div className="space-y-6">
            <h3 className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Opções múltipla escolha */}
            {currentQ.type === "multiple" && currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={handleAnswer}
                    className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-[#212121] border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Campo aberto */}
            {currentQ.type === "open" && (
              <div className="space-y-4">
                <textarea
                  className="w-full min-h-[120px] p-4 rounded-xl bg-gray-50 dark:bg-[#212121] border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-900 dark:text-gray-100 resize-none"
                  placeholder="Escreva sua resposta..."
                />
                <Button
                  onClick={handleAnswer}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Continuar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Visualização principal do perfil
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a1a] overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Header com foto e nome */}
        <div className="flex flex-col items-center mb-8">
          {/* Foto de perfil */}
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-4 ring-purple-500/20">
              <User className="w-12 h-12 text-white" />
            </div>
            <button
              onClick={onDemoAction}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Nome editável */}
          <button
            onClick={onDemoAction}
            className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-purple-500 dark:hover:text-purple-400 transition-colors group"
          >
            <span>Usuário Anônimo</span>
            <Edit2 className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Suas Características */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Suas Características
          </h2>
          
          {/* Blocos de características */}
          <div className="space-y-4">
            {(Object.keys(CHARACTERISTIC_LABELS) as Array<keyof typeof CHARACTERISTIC_LABELS>).map((key) => {
              const label = CHARACTERISTIC_LABELS[key];

              return (
                <div
                  key={key}
                  className="bg-gray-50 dark:bg-[#212121] rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                    {label}
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                      Ainda em construção
                    </p>
                    <Button
                      onClick={() => handleStartQuiz(key)}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Explorar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Função para obter perguntas por característica
function getQuestionsForCharacteristic(characteristic: string): QuizQuestion[] {
  const questionsMap: Record<string, QuizQuestion[]> = {
    humor: [
      {
        question: "Como você descreveria seu humor na maior parte do tempo?",
        type: "multiple",
        options: [
          "Geralmente estável e equilibrado",
          "Varia bastante ao longo do dia",
          "Depende muito do que está acontecendo ao redor",
          "Tendo a ser mais introspectivo e reflexivo",
        ],
      },
      {
        question: "O que mais influencia seu humor no dia a dia?",
        type: "multiple",
        options: [
          "Interações sociais e relacionamentos",
          "Conquistas e resultados do trabalho",
          "Meu estado físico e energia",
          "Pensamentos e reflexões internas",
        ],
      },
      {
        question: "Quando seu humor muda, como você costuma reagir?",
        type: "multiple",
        options: [
          "Procuro entender o que causou a mudança",
          "Deixo passar naturalmente",
          "Tento mudar fazendo algo que gosto",
          "Converso com alguém sobre isso",
        ],
      },
      {
        question: "Há algo específico que sempre melhora seu humor?",
        type: "open",
      },
    ],
    temperament: [
      {
        question: "Como você reage quando as coisas não saem como planejado?",
        type: "multiple",
        options: [
          "Fico frustrado, mas logo busco soluções",
          "Aceito com tranquilidade e me adapto",
          "Preciso de um tempo para processar",
          "Fico irritado e preciso desabafar",
        ],
      },
      {
        question: "Em situações de pressão, você tende a:",
        type: "multiple",
        options: [
          "Manter a calma e focar no que precisa ser feito",
          "Sentir ansiedade, mas conseguir agir",
          "Ficar paralisado ou sobrecarregado",
          "Reagir de forma impulsiva",
        ],
      },
      {
        question: "Como você lida com críticas ou feedbacks negativos?",
        type: "multiple",
        options: [
          "Reflito e tento aprender com eles",
          "Me sinto mal no momento, mas supero",
          "Tendo a levar para o lado pessoal",
          "Questiono e defendo meu ponto de vista",
        ],
      },
      {
        question: "Descreva uma situação recente em que você precisou controlar seu temperamento.",
        type: "open",
      },
    ],
    emotions: [
      {
        question: "Quando você sente uma emoção forte, o que costuma fazer?",
        type: "multiple",
        options: [
          "Paro para entender o que estou sentindo",
          "Expresso imediatamente para alguém",
          "Guardo para mim e processo sozinho",
          "Tento distrair minha mente",
        ],
      },
      {
        question: "Como você se sente ao compartilhar suas emoções com outras pessoas?",
        type: "multiple",
        options: [
          "Confortável, é natural para mim",
          "Depende da pessoa e do momento",
          "Prefiro não compartilhar muito",
          "Tenho dificuldade, mas tento",
        ],
      },
      {
        question: "O que você faz quando percebe que está se sentindo sobrecarregado emocionalmente?",
        type: "multiple",
        options: [
          "Busco apoio de pessoas próximas",
          "Faço atividades que me acalmam",
          "Tento racionalizar e organizar meus pensamentos",
          "Deixo o tempo passar até me sentir melhor",
        ],
      },
      {
        question: "Existe alguma emoção que você tem mais dificuldade em lidar? Por quê?",
        type: "open",
      },
    ],
    decisions: [
      {
        question: "Como você costuma tomar decisões importantes?",
        type: "multiple",
        options: [
          "Analiso todas as opções racionalmente",
          "Confio na minha intuição",
          "Busco conselhos de pessoas que confio",
          "Avalio prós e contras, mas também ouço meu coração",
        ],
      },
      {
        question: "Quando você precisa decidir algo rapidamente, você:",
        type: "multiple",
        options: [
          "Consigo decidir com facilidade",
          "Fico ansioso, mas tomo uma decisão",
          "Prefiro ter mais tempo para pensar",
          "Sigo meu instinto do momento",
        ],
      },
      {
        question: "Depois de tomar uma decisão, você:",
        type: "multiple",
        options: [
          "Fico tranquilo e sigo em frente",
          "Às vezes fico pensando se foi a escolha certa",
          "Raramente questiono minhas decisões",
          "Costumo rever e ajustar se necessário",
        ],
      },
      {
        question: "Conte sobre uma decisão difícil que você tomou recentemente e como se sentiu.",
        type: "open",
      },
    ],
  };

  return questionsMap[characteristic] || [];
}
