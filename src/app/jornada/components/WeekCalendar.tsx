"use client";

import { Check, Sparkles } from "lucide-react";

interface WeekCalendarProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  weekProgress: Record<number, number>;
  onViewSummary: () => void;
  isWeekEnd: boolean;
}

const daysOfWeek = [
  { id: 0, short: "Dom", full: "Domingo" },
  { id: 1, short: "Seg", full: "Segunda" },
  { id: 2, short: "Ter", full: "Terça" },
  { id: 3, short: "Qua", full: "Quarta" },
  { id: 4, short: "Qui", full: "Quinta" },
  { id: 5, short: "Sex", full: "Sexta" },
  { id: 6, short: "Sáb", full: "Sábado" },
];

export function WeekCalendar({
  selectedDay,
  onSelectDay,
  weekProgress,
  onViewSummary,
  isWeekEnd,
}: WeekCalendarProps) {
  const today = new Date().getDay();

  const getDayStatus = (dayId: number) => {
    const progress = weekProgress[dayId] || 0;
    if (progress === 100) return "completed";
    if (dayId === today) return "current";
    if (dayId < today) return "past";
    return "future";
  };

  return (
    <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header com botão de resumo semanal */}
      {isWeekEnd && (
        <button
          onClick={onViewSummary}
          className="w-full mb-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all group"
        >
          <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Seu mapa emocional da semana está pronto</span>
          </div>
        </button>
      )}

      {/* Calendário */}
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => {
          const status = getDayStatus(day.id);
          const isSelected = selectedDay === day.id;
          const progress = weekProgress[day.id] || 0;

          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={`relative flex flex-col items-center p-3 rounded-xl transition-all ${
                isSelected
                  ? "bg-purple-500 text-white shadow-lg scale-105"
                  : status === "completed"
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20"
                  : status === "current"
                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 ring-2 ring-purple-500/50"
                  : status === "past"
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  : "bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {/* Dia da semana */}
              <span className="text-xs font-medium mb-1">{day.short}</span>

              {/* Indicador de status */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                {status === "completed" ? (
                  <Check className="w-5 h-5" />
                ) : status === "current" ? (
                  <div className="w-2 h-2 rounded-full bg-current" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-current opacity-30" />
                )}
              </div>

              {/* Barra de progresso (apenas para dias com progresso) */}
              {progress > 0 && progress < 100 && (
                <div className="absolute bottom-1 left-2 right-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span>Hoje</span>
        </div>
        <div className="flex items-center gap-1">
          <Check className="w-3 h-3 text-green-500" />
          <span>Completo</span>
        </div>
      </div>
    </div>
  );
}
