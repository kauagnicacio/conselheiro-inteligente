"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LumLogo } from "@/components/LumIcons";
import { Button } from "@/components/ui/button";

interface ProtectedAreaProps {
  children: React.ReactNode;
}

export function ProtectedArea({ children }: ProtectedAreaProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Estado de carregamento
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1a1a1a]">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <LumLogo className="w-16 h-16 animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Não está logado - redirecionar para cadastro
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a] p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <LumLogo className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Bem-vindo à Lum IA
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Para acessar o app, você precisa criar uma conta.
          </p>
          <Button
            onClick={() => router.push("/cadastro")}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            Criar Conta
          </Button>
        </div>
      </div>
    );
  }

  // Está logado - renderizar conteúdo (sem verificar assinatura aqui)
  return <>{children}</>;
}
