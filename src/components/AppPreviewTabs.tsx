"use client";

import { useState } from "react";
import { MessageCircle, ListChecks, FileQuestion, BookOpen, Users, Heart, Sparkles, Map } from "lucide-react";

const tabs = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    description: "Converse 24h sobre qualquer assunto"
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: ListChecks,
    description: "Quizzes rápidos para organizar a mente"
  },
  {
    id: "perguntas",
    label: "Perguntas reflexivas",
    icon: FileQuestion,
    description: "Perguntas guiadas que destravam sua mente"
  },
  {
    id: "jornada",
    label: "Minha jornada",
    icon: BookOpen,
    description: "Histórico salvo da sua evolução"
  },
  {
    id: "psicologos",
    label: "Psicólogos",
    icon: Users,
    description: "Encontre profissionais quando precisar"
  }
];

// Componentes de preview simplificados (sem interação)
function ChatPreview() {
  return (
    <div className="w-full h-full bg-white dark:bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-[#212121]">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Escolha um tema</h2>
      </div>

      {/* Lista de temas */}
      <div className="flex-1 overflow-hidden p-3 space-y-2">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Espaço Livre</span>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">Converse sobre qualquer coisa</p>
        </div>

        <div className="bg-white dark:bg-[#212121] rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Relacionamento</span>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">Seus afetos e conexões</p>
        </div>

        <div className="bg-white dark:bg-[#212121] rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Família</span>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">Dinâmicas familiares</p>
        </div>
      </div>
    </div>
  );
}

function QuizPreview() {
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-[#212121]">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Quiz</h2>
      </div>

      {/* Cards de quiz */}
      <div className="flex-1 overflow-hidden p-3 space-y-2">
        <div className="bg-white dark:bg-[#212121] rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">Identificando gatilhos</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">5 perguntas • 3 min</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#212121] rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">Mapeando suas emoções</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">7 perguntas • 4 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerguntasPreview() {
  return (
    <div className="w-full h-full bg-white dark:bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-[#212121]">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Reflexão do Dia</h2>
      </div>

      {/* Card de reflexão */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Hoje</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            O que você está evitando sentir hoje?
          </h3>
          <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
            Às vezes, nos mantemos ocupados para não encarar algo...
          </p>
        </div>
      </div>
    </div>
  );
}

function JornadaPreview() {
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-[#212121]">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Minha Jornada</h2>
      </div>

      {/* Calendário simplificado */}
      <div className="flex-1 overflow-hidden p-3">
        <div className="bg-white dark:bg-[#212121] rounded-lg p-3 mb-2">
          <div className="flex justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Semana 1</span>
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">3/7 dias</span>
          </div>
          <div className="flex gap-1 justify-between">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-500 dark:text-gray-400">{day}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] ${
                  i < 3
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}>
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#212121] rounded-lg p-3">
          <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">Etapas de hoje</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded-full bg-purple-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-gray-600 dark:text-gray-400">Reflexão matinal</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600" />
              <span className="text-gray-400 dark:text-gray-500">Check-in do meio-dia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PsicologosPreview() {
  return (
    <div className="w-full h-full bg-white dark:bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-[#212121]">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Psicólogos</h2>
      </div>

      {/* Cards de psicólogos */}
      <div className="flex-1 overflow-hidden p-3 space-y-2">
        <div className="bg-white dark:bg-[#212121] rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-200 dark:bg-purple-900/30 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">Dra. Ana Silva</h3>
              <p className="text-[10px] text-gray-600 dark:text-gray-400">Ansiedade • Relacionamentos</p>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 mt-1">CRP 12345-6</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#212121] rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-200 dark:bg-purple-900/30 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">Dr. Carlos Lima</h3>
              <p className="text-[10px] text-gray-600 dark:text-gray-400">Autoestima • Trabalho</p>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 mt-1">CRP 67890-1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppPreviewTabs() {
  const [activeTab, setActiveTab] = useState("chat");

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  // Renderizar preview correto baseado na aba ativa
  const renderPreview = () => {
    switch (activeTab) {
      case "chat":
        return <ChatPreview />;
      case "quiz":
        return <QuizPreview />;
      case "perguntas":
        return <PerguntasPreview />;
      case "jornada":
        return <JornadaPreview />;
      case "psicologos":
        return <PsicologosPreview />;
      default:
        return <ChatPreview />;
    }
  };

  return (
    <div className="w-full">
      {/* Navegação de abas */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Preview real da aba selecionada - SEM mockup de celular */}
      <div className="relative mx-auto w-full max-w-sm aspect-[9/16] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Bloqueio de interação (overlay invisível) */}
        <div className="absolute inset-0 z-50 cursor-not-allowed" />

        {/* Conteúdo real do preview */}
        <div className="w-full h-full relative">
          {renderPreview()}
        </div>
      </div>

      {/* Descrição da aba */}
      <div className="text-center mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {currentTab.description}
        </p>
      </div>
    </div>
  );
}
