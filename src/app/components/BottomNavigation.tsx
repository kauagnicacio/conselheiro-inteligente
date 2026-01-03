"use client";

import { MessageCircle, User, HelpCircle } from "lucide-react";

export type BottomNavTab = "perfil" | "chat" | "quiz";

interface BottomNavigationProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "perfil" as BottomNavTab, icon: User, label: "Perfil" },
    { id: "chat" as BottomNavTab, icon: MessageCircle, label: "Chat" },
    { id: "quiz" as BottomNavTab, icon: HelpCircle, label: "Quiz" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* Glass/Floating Effect Container */}
      <div className="mx-4 mb-4">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-around px-2 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "animate-pulse" : ""}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
