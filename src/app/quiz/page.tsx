"use client";

import { useState } from "react";
import { Menu, Brain, Heart, MessageCircle, Briefcase, Users, Sparkles, Target, Coffee } from "lucide-react";

type QuizCategory = "all" | "pessoal" | "social" | "profissional";

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  category: QuizCategory[];
}

const quizzes: Quiz[] = [
  {
    id: "autoconhecimento",
    title: "Autoconhecimento",
    description: "Descubra quem você realmente é",
    icon: <Brain className="w-6 h-6 text-white" />,
    iconBg: "bg-purple-500",
    category: ["all", "pessoal"],
  },
  {
    id: "inteligencia-emocional",
    title: "Inteligência Emocional",
    description: "Como você lida com suas emoções",
    icon: <Heart className="w-6 h-6 text-white" />,
    iconBg: "bg-pink-500",
    category: ["all", "pessoal"],
  },
  {
    id: "comunicacao",
    title: "Comunicação",
    description: "Como você se expressa e escuta",
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    iconBg: "bg-blue-500",
    category: ["all", "social"],
  },
  {
    id: "relacionamentos",
    title: "Relacionamentos",
    description: "Amor, amizade e conexões afetivas",
    icon: <Users className="w-6 h-6 text-white" />,
    iconBg: "bg-rose-500",
    category: ["all", "social"],
  },
  {
    id: "produtividade",
    title: "Produtividade",
    description: "Como você gerencia seu tempo e energia",
    icon: <Target className="w-6 h-6 text-white" />,
    iconBg: "bg-orange-500",
    category: ["all", "profissional"],
  },
  {
    id: "lideranca",
    title: "Liderança",
    description: "Seu estilo de influenciar e guiar",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    iconBg: "bg-amber-500",
    category: ["all", "profissional"],
  },
  {
    id: "equilibrio-vida",
    title: "Equilíbrio Vida-Trabalho",
    description: "Como você balanceia suas prioridades",
    icon: <Coffee className="w-6 h-6 text-white" />,
    iconBg: "bg-green-500",
    category: ["all", "profissional", "pessoal"],
  },
  {
    id: "carreira",
    title: "Carreira",
    description: "Seus objetivos e ambições profissionais",
    icon: <Briefcase className="w-6 h-6 text-white" />,
    iconBg: "bg-indigo-500",
    category: ["all", "profissional"],
  },
];

const categories = [
  { id: "all" as QuizCategory, label: "Todos" },
  { id: "pessoal" as QuizCategory, label: "Pessoal" },
  { id: "social" as QuizCategory, label: "Social" },
  { id: "profissional" as QuizCategory, label: "Profissional" },
];

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("all");

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.category.includes(selectedCategory)
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center justify-between px-4 py-4">
          <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Quiz</h1>
          <div className="w-10" /> {/* Spacer para centralizar o título */}
        </div>
      </header>

      {/* Content */}
      <main className="pt-16 pb-24 px-4">
        {/* Hero Section */}
        <div className="text-center py-8 space-y-3">
          <h2 className="text-3xl font-bold">Escolha um tema</h2>
          <p className="text-zinc-400 text-sm">
            Cada quiz tem 10 perguntas pra te ajudar a se conhecer melhor
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Quiz Cards */}
        <div className="space-y-3">
          {filteredQuizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all cursor-pointer group animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${quiz.iconBg} rounded-2xl p-3 shrink-0`}>
                  {quiz.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{quiz.description}</p>
                </div>

                {/* Arrow indicator */}
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500">
              Nenhum quiz encontrado nesta categoria
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-zinc-900 border-t border-zinc-800" />
    </div>
  );
}
