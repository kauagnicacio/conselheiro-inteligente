"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, Heart, Brain, Sparkles } from "lucide-react";

interface WeeklySummaryProps {
  weekProgress: Record<number, number>;
  onClose: () => void;
  userId: string;
}

export function WeeklySummary({ weekProgress, onClose, userId }: WeeklySummaryProps) {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = () => {
    // Simular geração de insights baseado no progresso
    const completedDays = Object.values(weekProgress).filter(p => p === 100).length;
    const avgProgress = Object.values(weekProgress).reduce((a, b) => a + b, 0) / 7;

    const generatedInsights = [];

    if (completedDays >= 5) {
      generatedInsights.push("Você mostrou uma consistência impressionante essa semana! 🌟");
    } else if (completedDays >= 3) {
      generatedInsights.push("Você está construindo um bom hábito de autocuidado.");
    }

    if (avgProgress > 70) {
      generatedInsights.push("Sua dedicação ao autoconhecimento está crescendo.");
    }

    if (completedDays > 0) {
      generatedInsights.push("Cada dia que você se dedica é um passo em direção ao equilíbrio emocional.");
    }

    generatedInsights.push("Continue assim! A jornada de autoconhecimento é contínua.");

    setInsights(generatedInsights);
    setLoading(false);
  };

  const completedDays = Object.values(weekProgress).filter(p => p === 100).length;
  const totalProgress = Object.values(weekProgress).reduce((a, b) => a + b, 0) / 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Seu Mapa Emocional da Semana
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {completedDays}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Dias completos
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round(totalProgress)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Progresso total
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Insights da Semana
            </h2>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30"
                >
                  <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gráfico visual da semana */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Sua Semana em Números
          </h2>
          
          <div className="space-y-3">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => {
              const progress = weekProgress[index] || 0;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                    {day}
                  </div>
                  <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${progress}%` }}
                    >
                      {progress > 0 && (
                        <span className="text-xs font-medium text-white">
                          {Math.round(progress)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botão de ação */}
        <div className="mt-6">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
          >
            Continuar Jornada
          </Button>
        </div>
      </div>
    </div>
  );
}
