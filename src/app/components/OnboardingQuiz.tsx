"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LumLogo } from "@/components/LumIcons";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Tipos de etapas: 'question' (pergunta normal) ou 'transition' (mensagem animada)
interface Step {
  type: "question" | "transition";
  id: string;
  question?: string;
  transitionMessage?: string;
  inputType?: "text" | "options";
  options?: {
    value: string;
    label: string;
  }[];
}

const steps: Step[] = [
  // Pergunta 1: Nome
  {
    type: "question",
    id: "nome",
    question: "Antes de começar, como posso te chamar?",
    inputType: "text",
  },
  // Pergunta 2: Preferência de tratamento
  {
    type: "question",
    id: "tratamento",
    question: "Como você prefere que eu me dirija a você?",
    inputType: "options",
    options: [
      { value: "feminino", label: "No feminino (ex: você é única)" },
      { value: "masculino", label: "No masculino (ex: você é único)" },
      { value: "neutro", label: "De forma neutra" },
    ],
  },
  // Transição 1
  {
    type: "transition",
    id: "transition_1",
    transitionMessage: "Agora estamos personalizando o ambiente para você...",
  },
  // Pergunta 3: O que mais pesa hoje
  {
    type: "question",
    id: "peso_emocional",
    question: "O que mais pesa hoje?",
    inputType: "options",
    options: [
      { value: "ansiedade", label: "Ansiedade" },
      { value: "overthinking", label: "Overthinking (pensar demais)" },
      { value: "cansaco", label: "Cansaço emocional" },
      { value: "inseguranca", label: "Insegurança" },
      { value: "desanimo", label: "Desânimo" },
      { value: "raiva", label: "Raiva ou frustração" },
    ],
  },
  // Pergunta 4: Estilo de resposta
  {
    type: "question",
    id: "estilo_resposta",
    question: "Você prefere respostas mais diretas ou mais reflexivas?",
    inputType: "options",
    options: [
      { value: "diretas", label: "Diretas e objetivas" },
      { value: "reflexivas", label: "Reflexivas e profundas" },
      { value: "equilibradas", label: "Um equilíbrio entre as duas" },
    ],
  },
  // Transição 2
  {
    type: "transition",
    id: "transition_2",
    transitionMessage: "Vou adaptar a Lum ao seu jeito de pensar e ao momento que você está vivendo...",
  },
  // Pergunta 5: O que você quer agora
  {
    type: "question",
    id: "necessidade_atual",
    question: "O que você mais precisa agora?",
    inputType: "options",
    options: [
      { value: "clareza", label: "Clareza sobre o que fazer" },
      { value: "acolhimento", label: "Acolhimento e compreensão" },
      { value: "plano_pratico", label: "Um plano prático" },
      { value: "desabafo", label: "Espaço para desabafar" },
    ],
  },
  // Pergunta 6: Momento de vida
  {
    type: "question",
    id: "momento_vida",
    question: "Se você tivesse que resumir o momento que está vivendo em uma palavra, qual seria?",
    inputType: "options",
    options: [
      { value: "transicao", label: "Transição" },
      { value: "crescimento", label: "Crescimento" },
      { value: "estagnacao", label: "Estagnação" },
      { value: "caos", label: "Caos" },
      { value: "reconstrucao", label: "Reconstrução" },
      { value: "descoberta", label: "Descoberta" },
    ],
  },
  // Transição 3
  {
    type: "transition",
    id: "transition_3",
    transitionMessage: "Criando um espaço seguro para você...",
  },
  // Pergunta 7: Padrão emocional
  {
    type: "question",
    id: "padrao_emocional",
    question: "Você sente que suas emoções te controlam ou você consegue observá-las de fora?",
    inputType: "options",
    options: [
      { value: "controlam", label: "Elas me controlam completamente" },
      { value: "as_vezes", label: "Às vezes consigo observar, às vezes não" },
      { value: "observo", label: "Consigo observá-las na maior parte do tempo" },
      { value: "nao_sei", label: "Não sei dizer" },
    ],
  },
  // Pergunta 8: Relacionamento consigo
  {
    type: "question",
    id: "autocritica",
    question: "Como você costuma falar consigo mesmo(a) quando erra ou falha?",
    inputType: "options",
    options: [
      { value: "duro", label: "Sou muito duro(a) e crítico(a)" },
      { value: "compreensivo", label: "Tento ser compreensivo(a)" },
      { value: "ignoro", label: "Ignoro e sigo em frente" },
      { value: "varia", label: "Varia muito dependendo do dia" },
    ],
  },
  // Transição 4
  {
    type: "transition",
    id: "transition_4",
    transitionMessage: "Organizando seus primeiros insights...",
  },
  // Pergunta 9: Expectativa
  {
    type: "question",
    id: "expectativa",
    question: "O que você espera ao conversar com a Lum?",
    inputType: "options",
    options: [
      { value: "compreensao", label: "Ser compreendido(a) sem julgamentos" },
      { value: "orientacao", label: "Receber orientação prática" },
      { value: "desabafo", label: "Ter um espaço seguro para desabafar" },
      { value: "clareza", label: "Ganhar clareza sobre minhas questões" },
      { value: "transformacao", label: "Iniciar uma transformação real" },
    ],
  },
  // Transição final
  {
    type: "transition",
    id: "transition_final",
    transitionMessage: "Preparando sua primeira leitura personalizada...",
  },
];

interface OnboardingQuizProps {
  onComplete: (responses: Record<string, string>) => void;
}

// Função para gerar mensagem personalizada baseada nas respostas
function generatePersonalizedMessage(responses: Record<string, string>): string {
  const nome = responses.nome || "você";
  const tratamento = responses.tratamento || "neutro";
  const momentoVida = responses.momento_vida || "";
  const necessidadeAtual = responses.necessidade_atual || "";

  // Ajusta pronomes baseado no tratamento
  const pronomes = {
    feminino: { pronto: "pronta" },
    masculino: { pronto: "pronto" },
    neutro: { pronto: "pronte" }
  };

  const p = pronomes[tratamento as keyof typeof pronomes] || pronomes.neutro;

  // Mapeia momentos para frases curtas
  const momentoMap: Record<string, string> = {
    transicao: "está em transição",
    crescimento: "está crescendo",
    estagnacao: "sente que está parad" + (tratamento === "feminino" ? "a" : tratamento === "masculino" ? "o" : "e"),
    caos: "está em um momento intenso",
    reconstrucao: "está se reconstruindo",
    descoberta: "está se descobrindo"
  };

  const necessidadeMap: Record<string, string> = {
    clareza: "precisa de clareza",
    acolhimento: "precisa de acolhimento",
    plano_pratico: "quer um plano prático",
    desabafo: "precisa de espaço para se expressar"
  };

  // Constrói mensagem curta e personalizada
  let mensagem = `${nome}, `;

  if (momentoVida && momentoMap[momentoVida]) {
    mensagem += `vi que você ${momentoMap[momentoVida]}`;
  } else {
    mensagem += `vi suas respostas`;
  }

  if (necessidadeAtual && necessidadeMap[necessidadeAtual]) {
    mensagem += ` e ${necessidadeMap[necessidadeAtual]}`;
  }

  mensagem += `.\n\nA Lum vai usar isso para adaptar cada conversa ao seu momento. Seu espaço está ${p.pronto}.`;

  return mensagem;
}

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessageText, setFinalMessageText] = useState("");

  const currentStepData = steps[currentStep];
  const isQuestion = currentStepData?.type === "question";
  const isTransition = currentStepData?.type === "transition";

  // Efeito de digitação para mensagens de transição
  useEffect(() => {
    if (isTransition && currentStepData.transitionMessage) {
      setIsTransitioning(true);
      setDisplayedText("");
      
      const message = currentStepData.transitionMessage;
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          // Após terminar de digitar, aguarda 2s e avança automaticamente
          setTimeout(() => {
            setIsTransitioning(false);
            handleNextStep();
          }, 2000);
        }
      }, 30); // Velocidade de digitação

      return () => clearInterval(typingInterval);
    }
  }, [currentStep, isTransition]);

  // Efeito de digitação para mensagem final personalizada
  useEffect(() => {
    if (showFinalMessage && finalMessageText) {
      setDisplayedText("");
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < finalMessageText.length) {
          setDisplayedText(finalMessageText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 20); // Velocidade de digitação mais rápida para texto longo

      return () => clearInterval(typingInterval);
    }
  }, [showFinalMessage, finalMessageText]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption("");
      setTextInput("");
    } else {
      // Quiz finalizado - mostra mensagem personalizada
      const personalizedMessage = generatePersonalizedMessage(responses);
      setFinalMessageText(personalizedMessage);
      setShowFinalMessage(true);
    }
  };

  const handleNext = () => {
    if (isQuestion) {
      const value = currentStepData.inputType === "text" ? textInput : selectedOption;
      
      if (!value) return;

      const newResponses = {
        ...responses,
        [currentStepData.id]: value,
      };
      setResponses(newResponses);
    }

    handleNextStep();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      // Pula transições ao voltar
      let prevStep = currentStep - 1;
      while (prevStep >= 0 && steps[prevStep].type === "transition") {
        prevStep--;
      }
      
      if (prevStep >= 0) {
        setCurrentStep(prevStep);
        const prevStepData = steps[prevStep];
        if (prevStepData.type === "question") {
          if (prevStepData.inputType === "text") {
            setTextInput(responses[prevStepData.id] || "");
          } else {
            setSelectedOption(responses[prevStepData.id] || "");
          }
        }
      }
    }
  };

  const handleStartQuiz = () => {
    setShowWelcome(false);
  };

  const handleCompleteFinal = () => {
    onComplete(responses);
  };

  // Calcula progresso apenas com perguntas (ignora transições)
  const questionSteps = steps.filter(s => s.type === "question");
  const currentQuestionIndex = steps.slice(0, currentStep + 1).filter(s => s.type === "question").length;
  const progress = (currentQuestionIndex / questionSteps.length) * 100;

  // Tela de mensagem final personalizada
  if (showFinalMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-8 md:p-10">
            <div className="flex justify-center mb-6">
              <LumLogo className="w-16 h-16" />
            </div>
            
            <div className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line mb-8">
              {displayedText}
            </div>

            {displayedText === finalMessageText && (
              <div className="space-y-4">
                <Button
                  onClick={handleCompleteFinal}
                  className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Continuar para a Lum
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Seu espaço personalizado está pronto ✨
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Tela de boas-vindas
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <LumLogo className="w-20 h-20" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Vamos nos conhecer melhor? ✨
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
              Isso leva menos de 1 minuto e muda totalmente sua experiência com a Lum.
            </p>
            
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 max-w-md mx-auto mb-8 shadow-lg">
              <ul className="text-left space-y-3 text-base text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-0.5 text-xl">✓</span>
                  <span>Entender o momento que você está vivendo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-0.5 text-xl">✓</span>
                  <span>Adaptar as respostas ao seu jeito de pensar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-0.5 text-xl">✓</span>
                  <span>Criar um espaço verdadeiramente personalizado</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={handleStartQuiz}
              className="h-14 px-8 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              Começar agora
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
              🔒 Suas respostas são privadas e seguras.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de transição (mensagem animada)
  if (isTransition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8">
            <LumLogo className="w-16 h-16 mx-auto animate-pulse" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 min-h-[80px] flex items-center justify-center px-4">
            {displayedText}
          </h2>
        </div>
      </div>
    );
  }

  // Tela de pergunta
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Pergunta {currentQuestionIndex} de {questionSteps.length}
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
            {currentStepData.question}
          </h2>

          {/* Input de texto */}
          {currentStepData.inputType === "text" && (
            <Input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Digite aqui..."
              className="w-full h-12 text-base px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500"
              autoFocus
            />
          )}

          {/* Opções de múltipla escolha */}
          {currentStepData.inputType === "options" && (
            <div className="space-y-3">
              {currentStepData.options?.map((option) => (
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
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQuestionIndex > 1 && (
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
            disabled={
              currentStepData.inputType === "text"
                ? !textInput.trim()
                : !selectedOption
            }
            className={`h-12 text-base bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 ${
              currentQuestionIndex === 1 ? "flex-1" : "flex-1"
            }`}
          >
            Continuar
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          🔒 Suas respostas são privadas e seguras.
        </p>
      </div>
    </div>
  );
}
