"use client";

import { useState, useEffect } from "react";
import { Brain, Compass, MessageSquare, Wrench, Heart, Check, Lock } from "lucide-react";
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
    prompt: "Que emoção está mais presente em você hoje? Pode ser alegria, tristeza, ansiedade, calma... o que vier.",
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
    prompt: "Pelo que você é grato hoje? Pode ser algo pequeno, mas que fez diferença.",
    color: "from-pink-500 to-rose-500",
  },
];

interface DailyStepsProps {
  selectedDay: number;
  userId: string;
  onDayComplete: (day: number, progress: number) => void;
  onDemoAction: () => void;
}

export function DailySteps({ selectedDay, userId, onDayComplete, onDemoAction }: DailyStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});

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

  const handleStepClick = (stepId: string) => {
    if (completedSteps.has(stepId)) {
      setExpandedStep(expandedStep === stepId ? null : stepId);
    } else {
      setExpandedStep(stepId);
    }
  };

  const handleCompleteStep = (stepId: string, response: string) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    
    const newResponses = { ...responses, [stepId]: response };
    
    setCompletedSteps(newCompleted);
    setResponses(newResponses);
    setExpandedStep(null);
    
    saveDayProgress(newCompleted, newResponses);
  };

  const handleStartChat = (step: Step) => {
    // Salvar mensagem inicial para abrir no chat
    localStorage.setItem('lum-initial-message', step.prompt);
    
    // Redirecionar para o chat
    window.location.href = '/teste';
  };

  const today = new Date().getDay();
  const isToday = selectedDay === today;
  const isFuture = selectedDay > today;

  const progress = (completedSteps.size / steps.length) * 100;

  return (
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
                onClick={() => !isLocked && handleStepClick(step.id)}
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
                  
                  {isCompleted && responses[step.id] && (
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

              {/* Área expandida */}
              {isExpanded && !isCompleted && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {step.prompt}
                  </p>
                  
                  <Button
                    onClick={() => handleStartChat(step)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Conversar com a Lum
                  </Button>
                </div>
              )}
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
  );
}
