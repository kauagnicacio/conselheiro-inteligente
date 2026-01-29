"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LumLogo } from "@/components/LumIcons";

export default function RootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Usuário logado: redirecionar para /home (app principal)
        router.replace("/home");
      } else {
        // Usuário não logado: redirecionar para /quiz (onboarding)
        router.replace("/quiz");
      }
    }
  }, [user, loading, router]);

  // Tela de loading enquanto verifica autenticação
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
