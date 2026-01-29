"use client";

import { useState, useEffect } from "react";
import { Brain, Compass, MessageSquare, Wrench, Heart, Check, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
  id: string;
  icon: any;
  title: string;
  description: string;
  prompt: string;
  color: string;
}

const steps: Step[] = [
  {
    id: "mood",
    icon: Brain,
    title: "Checagem de Humor",
    description: "Como você está hoje?",
    prompt: "Como você está se sentindo agora, de verdade?",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "emotions",
    icon: Compass,
    title: "Explore suas emoções",
    description: "Vamos entender melhor o que está passando aí dentro.",
    prompt: "Que emoção está mais presente em você hoje?",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "question",
    icon: MessageSquare,
    title: "Pergunta do dia",
    description: "Uma pergunta simples pra organizar sua mente.",
    prompt: "Se você pudesse mudar uma coisa no seu dia hoje, o que seria?",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "exercise",
    icon: Wrench,
    title: "Um exercício pra você",
    description: "Um pequeno passo que faz diferença.",
    prompt: "Vamos fazer um exercício rápido: Respire fundo 3 vezes. Depois, escreva uma frase que te alivia agora.",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "gratitude",
    icon: Heart,
    title: "Gratidão do dia",
    description: "Uma coisa boa do seu dia.",
    prompt: "O que aconteceu hoje que merece sua gratidão?\nPode ser algo pequeno: um olhar, um sorriso, uma conversa, um abraço, uma frase que te marcou, ou até um momento de silêncio.\n\nO importante é que seja algo deste dia, algo que fez você se sentir um pouco melhor.",
    color: "from-pink-500 to-rose-500",
  },
];

// Opções de emoções para a etapa "emotions"
const emotionOptions = [
  "Ansiedade",
  "Raiva",
  "Tristeza",
  "Medo",
  "Culpa",
  "Vergonha",
  "Outro"
];

interface DailyStepsProps {
  selectedDay: number;
  userId: string;
  onDayComplete: (day: number, progress: number) => void;
  onDemoAction?: () => void;
  isDemo?: boolean;
}

export function DailySteps({ selectedDay, userId, onDayComplete, onDemoAction, isDemo = false }: DailyStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [modalInput, setModalInput] = useState("");
  
  // Estados para exercício guiado em 3 passos
  const [exerciseStep, setExerciseStep] = useState(1);

  // Estados para seleção de emoções
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [showCustomEmotion, setShowCustomEmotion] = useState(false);

  useEffect(() => {
    loadDayProgress();
  }, [selectedDay]);

  const loadDayProgress = () => {
    const saved = localStorage.getItem(`journey-day-${selectedDay}-${userId}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedSteps(new Set(data.completed || []));
      setResponses(data.responses || {});
    } else {
      setCompletedSteps(new Set());
      setResponses({});
    }
  };

  const saveDayProgress = (completed: Set<string>, newResponses: Record<string, string>) => {
    const data = {
      completed: Array.from(completed),
      responses: newResponses,
      date: new Date().toISOString(),
    };
    localStorage.setItem(`journey-day-${selectedDay}-${userId}`, JSON.stringify(data));
    
    // Calcular progresso
    const progress = (completed.size / steps.length) * 100;
    onDayComplete(selectedDay, progress);
  };

  const handleStepClick = (step: Step) => {
    // No modo demo, bloquear qualquer clique
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }

    const isCompleted = completedSteps.has(step.id);
    
    if (isCompleted) {
      setExpandedStep(expandedStep === step.id ? null : step.id);
    } else {
      // Abrir modal para responder
      setCurrentStep(step);
      setModalInput("");
      setExerciseStep(1); // Resetar para passo 1
      setSelectedEmotion(null);
      setShowCustomEmotion(false);
      setShowModal(true);
    }
  };

  const handleSubmitResponse = () => {
    if (!currentStep) return;

    // Para etapa de emoções, validar seleção
    if (currentStep.id === "emotions") {
      if (!selectedEmotion) return;
      if (selectedEmotion === "Outro" && !modalInput.trim()) return;
    } else {
      // Para outras etapas, validar input de texto
      if (!modalInput.trim()) return;
    }

    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep.id);
    
    // Salvar resposta apropriada
    let responseText = "";
    if (currentStep.id === "emotions") {
      responseText = selectedEmotion === "Outro" ? modalInput.trim() : selectedEmotion;
    } else {
      responseText = modalInput.trim();
    }
    
    const newResponses = { ...responses, [currentStep.id]: responseText };
    
    setCompletedSteps(newCompleted);
    setResponses(newResponses);
    setShowModal(false);
    setCurrentStep(null);
    setModalInput("");
    setExerciseStep(1);
    setSelectedEmotion(null);
    setShowCustomEmotion(false);
    
    saveDayProgress(newCompleted, newResponses);
  };

  const handleNextExerciseStep = () => {
    if (exerciseStep < 3) {
      setExerciseStep(exerciseStep + 1);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStep(null);
    setModalInput("");
    setExerciseStep(1);
    setSelectedEmotion(null);
    setShowCustomEmotion(false);
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    
    if (emotion === "Outro") {
      setShowCustomEmotion(true);
    } else {
      setShowCustomEmotion(false);
      setModalInput("");
    }
  };

  const today = new Date().getDay();
  const isToday = selectedDay === today;
  const isFuture = selectedDay > today;

  const progress = (completedSteps.size / steps.length) * 100;

  // Renderizar conteúdo do modal baseado na etapa
  const renderModalContent = () => {
    if (!currentStep) return null;

    // Modal especial para seleção de emoções
    if (currentStep.id === "emotions") {
      return (
        <>
          <div className="p-6 space-y-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {currentStep.prompt}
            </p>

            {/* Grid de opções de emoções */}
            <div className="grid grid-cols-2 gap-3">
              {emotionOptions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => handleEmotionSelect(emotion)}
                  className={`p-4 rounded-xl border-2 transition-all text-center font-medium ${
                    selectedEmotion === emotion
                      ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-600"
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>

            {/* Campo de texto customizado (apenas se "Outro" for selecionado) */}
            {showCustomEmotion && (
              <div className="mt-4">
                <textarea
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  placeholder="Escreva qual emoção você está sentindo..."
                  className="w-full min-h-[100px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className="px-6 pb-6 flex gap-3">
            <Button
              onClick={handleCloseModal}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitResponse}
              disabled={!selectedEmotion || (selectedEmotion === "Outro" && !modalInput.trim())}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Salvar
            </Button>
          </div>
        </>
      );
    }

    // Exercício guiado em 3 passos
    if (currentStep.id === "exercise") {
      if (exerciseStep === 1) {
        return (
          <>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Vamos começar desacelerando seu corpo.<br />
                Inspire pelo nariz, segure 2 segundos e solte pela boca.<br />
                Repita isso 3 vezes, no seu ritmo.
              </p>
            </div>

            <div className="px-6 pb-6">
              <Button
                onClick={handleNextExerciseStep}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Já respirei
              </Button>
            </div>
          </>
        );
      }

      if (exerciseStep === 2) {
        return (
          <>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Agora pense: o que mais está te pesando neste momento?<br />
                Não precisa explicar, só reconhecer.
              </p>
            </div>

            <div className="px-6 pb-6">
              <Button
                onClick={handleNextExerciseStep}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Já identifiquei
              </Button>
            </div>
          </>
        );
      }

      if (exerciseStep === 3) {
        return (
          <>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Agora escreva uma frase pra você mesma, como se estivesse falando com alguém que você ama.
              </p>

              <textarea
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                placeholder="Ex:&#10;'Eu posso ir com calma.'&#10;'Tá tudo bem não dar conta de tudo hoje.'&#10;'Isso vai passar.'&#10;'Estou fazendo o meu melhor.'"
                className="w-full min-h-[140px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                autoFocus
              />
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <Button
                onClick={handleCloseModal}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitResponse}
                disabled={!modalInput.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar
              </Button>
            </div>
          </>
        );
      }
    }

    // Modal padrão para outras etapas (incluindo gratidão com novo texto)
    return (
      <>
        <div className="p-6 space-y-4">
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {currentStep.prompt}
          </p>

          <textarea
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            placeholder="Escreva aqui como você está se sentindo..."
            className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            autoFocus
          />
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <Button
            onClick={handleCloseModal}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmitResponse}
            disabled={!modalInput.trim()}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="space-y-4">
        {/* Header do dia */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {isFuture ? "Dia bloqueado" : isToday ? "Hoje" : "Dia anterior"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isFuture
                  ? "Volte quando esse dia chegar"
                  : `${completedSteps.size} de ${steps.length} etapas concluídas`}
              </p>
            </div>
            {!isFuture && (
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(progress)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Progresso</div>
              </div>
            )}
          </div>

          {/* Barra de progresso */}
          {!isFuture && (
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Lista de etapas */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            const isExpanded = expandedStep === step.id;
            const isLocked = isFuture || (index > 0 && !completedSteps.has(steps[index - 1].id));
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className={`bg-white dark:bg-[#212121] rounded-xl shadow-sm border transition-all ${
                  isCompleted
                    ? "border-green-500/30 bg-green-500/5"
                    : isLocked
                    ? "border-gray-200 dark:border-gray-700 opacity-50"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-500/30"
                }`}
              >
                <button
                  onClick={() => !isLocked && handleStepClick(step)}
                  disabled={isLocked}
                  className="w-full p-4 flex items-start gap-4 text-left"
                >
                  {/* Ícone */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${step.color}`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                    
                    {isCompleted && responses[step.id] && isExpanded && (
                      <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                          "{responses[step.id]}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    {isCompleted && (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Mensagem de conclusão */}
        {progress === 100 && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Dia completo! 🎉
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Você concluiu todas as etapas de hoje. Volte amanhã para continuar sua jornada.
            </p>
          </div>
        )}
      </div>

      {/* Modal para responder etapa */}
      {showModal && currentStep && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#212121] rounded-2xl max-w-lg w-full shadow-2xl">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentStep.color}`}>
                  <currentStep.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {currentStep.title}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Modal (dinâmico baseado na etapa) */}
            {renderModalContent()}
          </div>
        </div>
      )}
    </>
  );
}
