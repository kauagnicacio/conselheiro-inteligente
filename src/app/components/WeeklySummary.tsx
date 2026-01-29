"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Calendar, Heart, Brain, Sparkles, TrendingUp, MessageCircle, Lock } from "lucide-react";
import { generateWeeklyAnalysis, type DayData, type WeeklyData } from "@/lib/weekly-analysis";

interface WeeklySummaryProps {
  weekProgress: Record<number, number>;
  onClose: () => void;
  userId: string;
}

export function WeeklySummary({ weekProgress, onClose, userId }: WeeklySummaryProps) {
  const [weekData, setWeekData] = useState<Record<number, DayData>>({});
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    loadWeekData();
  }, []);

  const loadWeekData = async () => {
    setLoading(true);
    
    // Carregar dados de cada dia da semana
    const weekDataMap: Record<number, DayData> = {};
    
    for (let day = 0; day < 7; day++) {
      const saved = localStorage.getItem(`journey-day-${day}-${userId}`);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          weekDataMap[day] = {
            date: data.date,
            completed: data.completed || [],
            responses: data.responses || {},
          };
        } catch (e) {
          console.error(`Erro ao carregar dia ${day}:`, e);
        }
      }
    }
    
    setWeekData(weekDataMap);
    
    // Gerar análise com IA APENAS se semana estiver completa
    if (isWeekComplete(weekDataMap)) {
      const weeklyData: WeeklyData = {
        days: weekDataMap,
        userId,
      };
      
      const analysisText = await generateWeeklyAnalysis(weeklyData);
      setAnalysis(analysisText);
    }
    
    setLoading(false);
  };

  // Verificar se a semana está completa (todos os 7 dias com 100% de progresso)
  const isWeekComplete = (data: Record<number, DayData>) => {
    for (let day = 0; day < 7; day++) {
      const dayData = data[day];
      if (!dayData || dayData.completed.length < 5) {
        return false;
      }
    }
    return true;
  };

  const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  const completedDays = Object.values(weekProgress).filter(p => p === 100).length;
  const daysWithData = Object.keys(weekData).length;
  const weekComplete = isWeekComplete(weekData);

  const getDayEmoji = (dayIndex: number) => {
    const data = weekData[dayIndex];
    if (!data || data.completed.length === 0) return "⚪";
    
    const progress = (data.completed.length / 5) * 100;
    if (progress === 100) return "✅";
    if (progress >= 60) return "🟡";
    return "🟠";
  };

  const renderDayDetail = (dayIndex: number) => {
    const data = weekData[dayIndex];
    if (!data || data.completed.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Nenhum registro neste dia
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {data.responses.mood && (
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3 sm:p-4 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Humor</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic break-words">"{data.responses.mood}"</p>
          </div>
        )}

        {data.responses.emotions && (
          <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-3 sm:p-4 border border-purple-100 dark:border-purple-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Emoções</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic break-words">"{data.responses.emotions}"</p>
          </div>
        )}

        {data.responses.question && (
          <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-3 sm:p-4 border border-orange-100 dark:border-orange-800/30">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Reflexão</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic break-words">"{data.responses.question}"</p>
          </div>
        )}

        {data.responses.exercise && (
          <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-3 sm:p-4 border border-green-100 dark:border-green-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Exercício</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic break-words">"{data.responses.exercise}"</p>
          </div>
        )}

        {data.responses.gratitude && (
          <div className="bg-pink-50 dark:bg-pink-900/10 rounded-xl p-3 sm:p-4 border border-pink-100 dark:border-pink-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-pink-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gratidão</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic break-words">"{data.responses.gratitude}"</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Seu Mapa Emocional da Semana
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white dark:bg-[#212121] rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {daysWithData}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Dias registrados
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#212121] rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {completedDays}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Dias completos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualização da semana */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            Sua Semana
          </h2>
          
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
            {dayNamesShort.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                className={`flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl transition-all ${
                  selectedDay === index
                    ? "bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500"
                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400">
                  {day}
                </span>
                <span className="text-lg sm:text-2xl">{getDayEmoji(index)}</span>
              </button>
            ))}
          </div>

          {/* Detalhes do dia selecionado */}
          {selectedDay !== null && (
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 text-sm sm:text-base">
                {dayNames[selectedDay]}
              </h3>
              {renderDayDetail(selectedDay)}
            </div>
          )}
        </div>

        {/* Análise Interpretativa da Lum - APENAS SE SEMANA COMPLETA */}
        {weekComplete ? (
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Mensagem da Lum
                </h2>
                <p className="text-xs sm:text-sm text-white/80 truncate">
                  Sua análise emocional da semana
                </p>
              </div>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-white/20 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20">
                <p className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-line break-words">
                  {analysis}
                </p>
              </div>
            )}
          </div>
        ) : (
          // Mensagem quando semana NÃO está completa
          <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Semana em Andamento
                </h2>
                <p className="text-xs sm:text-sm text-white/80">
                  Complete todos os dias para desbloquear
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20">
              <p className="text-white text-sm sm:text-base leading-relaxed text-center">
                Você ainda não concluiu sua semana emocional. Complete seus dias para liberar sua leitura completa.
              </p>
              <div className="mt-4 text-center">
                <p className="text-white/90 text-xs sm:text-sm font-medium">
                  Dias completos: {completedDays}/7
                </p>
                <div className="mt-2 w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${(completedDays / 7) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legenda */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">✅</span>
              <span className="text-gray-600 dark:text-gray-400">Completo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">🟡</span>
              <span className="text-gray-600 dark:text-gray-400">Parcial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">🟠</span>
              <span className="text-gray-600 dark:text-gray-400">Iniciado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">⚪</span>
              <span className="text-gray-600 dark:text-gray-400">Vazio</span>
            </div>
          </div>
        </div>

        {/* Botão de ação */}
        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-5 sm:py-6 text-base sm:text-lg"
        >
          Continuar Jornada
        </Button>
      </div>
    </div>
  );
}
