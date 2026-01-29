"use client";

import { MessageCircle, User, HelpCircle, Sparkles } from "lucide-react";

export type BottomNavTab = "perfil" | "chat" | "quiz" | "reflexao";

interface BottomNavigationProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "perfil" as BottomNavTab, icon: User, label: "Perfil" },
    { id: "chat" as BottomNavTab, icon: MessageCircle, label: "Chat" },
    { id: "quiz" as BottomNavTab, icon: HelpCircle, label: "Quiz" },
    { id: "reflexao" as BottomNavTab, icon: Sparkles, label: "Reflexão" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* Glass/Floating Effect Container */}
      <div className="mx-4 mb-4">
        <div className="bg-[#212121]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-around px-2 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-purple-500/20 text-purple-400 shadow-lg scale-105 border border-purple-500/30"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "" : ""}`} />
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
