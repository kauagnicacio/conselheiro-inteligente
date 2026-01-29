"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnsavedChatAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

export function UnsavedChatAlert({
  isOpen,
  onClose,
  onDiscard,
  onSave,
}: UnsavedChatAlertProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white dark:bg-[#212121] rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ícone de alerta */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
          </div>

          {/* Texto */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Chat não salvo
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Se você sair agora, este chat não será salvo.
              <br />
              Tem certeza que deseja sair?
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onSave}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              Salvar chat
            </Button>
            <Button
              onClick={onDiscard}
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Sair assim mesmo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
