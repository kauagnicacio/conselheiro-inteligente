"use client";

import { useState } from "react";
import { MessageCircle, ListChecks, FileQuestion, BookOpen, Users } from "lucide-react";

const tabs = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    preview: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/283409e0-0231-47be-98c2-ce0ecf515642.jpeg",
    description: "Converse 24h sobre qualquer assunto"
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: ListChecks,
    preview: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/a0ea9293-73d2-4e83-a76e-4bdce86356e8.jpeg",
    description: "Quizzes rápidos para organizar a mente"
  },
  {
    id: "perguntas",
    label: "Perguntas reflexivas",
    icon: FileQuestion,
    preview: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/fdff7927-b05d-4c52-9be8-211cccf0d0f1.jpeg",
    description: "Perguntas guiadas que destravam sua mente"
  },
  {
    id: "jornada",
    label: "Minha jornada",
    icon: BookOpen,
    preview: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/0fa56f2c-37b2-4000-8a3a-3126bfd5cbb7.jpeg",
    description: "Histórico salvo da sua evolução"
  },
  {
    id: "psicologos",
    label: "Psicólogos",
    icon: Users,
    preview: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/5344bdfe-7341-451e-884e-178e0debd295.jpeg",
    description: "Encontre profissionais quando precisar"
  }
];

export function AppPreviewTabs() {
  const [activeTab, setActiveTab] = useState("chat");

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

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

      {/* Preview da aba selecionada */}
      <div className="relative mx-auto w-full max-w-[300px] aspect-[9/19] bg-gray-900 rounded-[40px] border-[10px] border-gray-900 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20" />

        {/* Screen Content */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={currentTab.preview}
            alt={currentTab.description}
            className="w-full h-full object-cover transition-all duration-300"
          />
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
