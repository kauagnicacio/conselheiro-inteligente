"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface StandardHeaderProps {
  title: string;
  onMenuClick: () => void;
  rightIcon?: React.ReactNode;
}

export function StandardHeader({ title, onMenuClick, rightIcon }: StandardHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]">
      <div className="flex items-center gap-3">
        {/* Botão Hambúrguer */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="h-9 w-9"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {rightIcon}
        <ThemeToggle />
      </div>
    </header>
  );
}
