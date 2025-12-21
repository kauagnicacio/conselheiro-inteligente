"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { LumLogo } from "@/components/LumIcons";
import { useAuth } from "@/hooks/useAuth";

export default function CadastroPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Se já estiver logado, redirecionar para o app
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleAuthSuccess = () => {
    // Após autenticação bem-sucedida, redirecionar para a área principal (SEM checkout)
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a]">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <LumLogo className="w-16 h-16 animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <LumLogo className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Bem-vindo à Lum
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Entre ou crie sua conta para continuar
          </p>
        </div>
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
}
