"use client";

import { useState } from "react";
import { Brain, Heart, Target, Users, Briefcase, Shield, Lightbulb, Crown, Scale, Compass } from "lucide-react";
import { QuizInterface } from "./QuizInterface";

interface QuizLibraryProps {
  onSelectQuiz: (quizId: string) => void;
  isDemo?: boolean;
  onDemoAction?: () => void;
  onResetQuiz?: () => void;
}

export function QuizLibrary({ onSelectQuiz, isDemo = false, onDemoAction, onResetQuiz }: QuizLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<{ id: string; title: string } | null>(null);

  const quizzes = [
    {
      id: "autoconhecimento",
      title: "Autoconhecimento",
      description: "Descubra quem você realmente é",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      category: "pessoal",
    },
    {
      id: "inteligencia-emocional",
      title: "Inteligência Emocional",
      description: "Como você lida com suas emoções",
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      category: "pessoal",
    },
    {
      id: "proposito",
      title: "Propósito de Vida",
      description: "O que te move e te inspira",
      icon: Target,
      gradient: "from-amber-500 to-orange-500",
      category: "pessoal",
    },
    {
      id: "relacionamentos",
      title: "Relacionamentos",
      description: "Como você se conecta com os outros",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      category: "social",
    },
    {
      id: "carreira",
      title: "Carreira",
      description: "Seu caminho profissional",
      icon: Briefcase,
      gradient: "from-indigo-500 to-purple-500",
      category: "profissional",
    },
    {
      id: "resiliencia",
      title: "Resiliência",
      description: "Sua capacidade de superar desafios",
      icon: Shield,
      gradient: "from-emerald-500 to-teal-500",
      category: "pessoal",
    },
    {
      id: "criatividade",
      title: "Criatividade",
      description: "Como você expressa sua originalidade",
      icon: Lightbulb,
      gradient: "from-yellow-500 to-amber-500",
      category: "pessoal",
    },
    {
      id: "lideranca",
      title: "Liderança",
      description: "Seu estilo de influenciar e guiar",
      icon: Crown,
      gradient: "from-violet-500 to-purple-500",
      category: "profissional",
    },
    {
      id: "equilibrio",
      title: "Equilíbrio de Vida",
      description: "Como você balanceia diferentes áreas",
      icon: Scale,
      gradient: "from-cyan-500 to-blue-500",
      category: "pessoal",
    },
    {
      id: "valores",
      title: "Valores Pessoais",
      description: "O que realmente importa pra você",
      icon: Compass,
      gradient: "from-pink-500 to-rose-500",
      category: "pessoal",
    },
  ];

  const categories = [
    { id: "todos", label: "Todos" },
    { id: "pessoal", label: "Pessoal" },
    { id: "social", label: "Social" },
    { id: "profissional", label: "Profissional" },
  ];

  const filteredQuizzes = selectedCategory && selectedCategory !== "todos"
    ? quizzes.filter((quiz) => quiz.category === selectedCategory)
    : quizzes;

  const handleQuizClick = (quizId: string, quizTitle: string) => {
    // Abrir o quiz diretamente
    setActiveQuiz({ id: quizId, title: quizTitle });
  };

  const handleBackToLibrary = () => {
    setActiveQuiz(null);
  };

  const handleDemoActionWithReset = () => {
    // Chamar o popup do checkout
    if (onDemoAction) {
      onDemoAction();
    }
    // Resetar o quiz imediatamente para que quando o popup fechar, já esteja na biblioteca
    setActiveQuiz(null);
  };

  // Se um quiz está ativo, mostrar o QuizInterface
  if (activeQuiz) {
    return (
      <QuizInterface
        quizId={activeQuiz.id}
        quizTitle={activeQuiz.title}
        onBack={handleBackToLibrary}
        isDemo={isDemo}
        onDemoAction={handleDemoActionWithReset}
      />
    );
  }

  // Caso contrário, mostrar a biblioteca de quizzes
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-900/20 via-[#1a1a1a] to-[#1a1a1a]">
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-12 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-100 leading-relaxed">
            Escolha um tema
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-light max-w-md mx-auto">
            Cada quiz tem 10 perguntas pra te ajudar a se conhecer melhor
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category.id || (!selectedCategory && category.id === "todos")
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de Quizzes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredQuizzes.map((quiz) => {
            const Icon = quiz.icon;
            return (
              <button
                key={quiz.id}
                onClick={() => handleQuizClick(quiz.id, quiz.title)}
                className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 text-left"
              >
                <div className="p-6 space-y-4">
                  {/* Ícone */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quiz.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Texto */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-100 mb-1 group-hover:text-white transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {quiz.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
