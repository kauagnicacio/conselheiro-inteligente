"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { LumLogo } from "@/components/LumIcons";
import { useAuth } from "@/hooks/useAuth";

export default function CadastroPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Verificar se tem assinatura antes de permitir cadastro
  useEffect(() => {
    if (!loading) {
      // Verificar se completou o quiz (guest onboarding)
      const guestOnboarding = localStorage.getItem("lumia-guest-onboarding");
      
      if (!guestOnboarding) {
        // Se não completou o quiz, redirecionar para /quiz
        router.push("/quiz");
        return;
      }

      // Se já estiver logado, verificar se tem assinatura
      if (user) {
        const hasSubscription = localStorage.getItem(`lumia-subscription-${user.id}`);
        if (hasSubscription === "true") {
          // Se já tem assinatura, redirecionar para o app
          router.push("/");
        } else {
          // Se não tem assinatura, redirecionar para checkout
          router.push("/quiz");
        }
      }
    }
  }, [user, loading, router]);

  const handleAuthSuccess = () => {
    // Após criar conta, verificar se tem assinatura
    // Por enquanto, assumir que veio do checkout e tem assinatura
    // Em produção, isso será validado via webhook
    if (user) {
      localStorage.setItem(`lumia-subscription-${user.id}`, "true");
    }
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
            Quase lá!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Crie sua conta para acessar a Lum
          </p>
        </div>
        <AuthForm onAuthSuccess={handleAuthSuccess} signupOnly={true} />
      </div>
    </div>
  );
}
