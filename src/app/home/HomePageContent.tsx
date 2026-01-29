"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LumLogo } from "@/components/LumIcons";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [checkAttempts, setCheckAttempts] = useState(0);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Aguardar o hook de auth completar
      if (loading) {
        return;
      }

      // No iOS standalone, às vezes a sessão demora para carregar
      // Vamos tentar algumas vezes antes de desistir
      const maxAttempts = 3;
      
      if (!user && checkAttempts < maxAttempts) {
        // Tentar restaurar sessão manualmente
        if (isSupabaseConfigured && supabase) {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              console.log("✅ Sessão restaurada manualmente no iOS standalone");
              // Aguardar um pouco para o hook atualizar
              await new Promise(resolve => setTimeout(resolve, 500));
              setCheckAttempts(prev => prev + 1);
              return;
            }
          } catch (error) {
            console.error("Erro ao restaurar sessão:", error);
          }
        } else {
          // Modo local - verificar localStorage
          if (typeof window !== "undefined") {
            const localUser = localStorage.getItem("lumia-local-user");
            if (localUser) {
              console.log("✅ Usuário local encontrado");
              await new Promise(resolve => setTimeout(resolve, 500));
              setCheckAttempts(prev => prev + 1);
              return;
            }
          }
        }
        
        // Incrementar tentativas e tentar novamente
        setCheckAttempts(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
      }

      // Após todas as tentativas, decidir o redirecionamento
      const isPWA = searchParams.get("source") === "pwa";
      
      if (user) {
        // Usuário autenticado - redirecionar para a página principal do app
        console.log("✅ Usuário autenticado, redirecionando para app principal", {
          isPWA,
          userId: user.id
        });
        router.replace("/");
      } else {
        // Não autenticado - redirecionar para quiz/onboarding
        console.log("❌ Usuário não autenticado após tentativas, redirecionando para quiz");
        router.replace("/quiz");
      }
      
      setIsChecking(false);
    };

    checkAuthAndRedirect();
  }, [user, loading, router, searchParams, checkAttempts]);

  // Tela de loading enquanto verifica autenticação
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1a1a1a]">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <LumLogo className="w-16 h-16 animate-pulse" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {isChecking ? "Verificando sessão..." : "Redirecionando..."}
        </p>
        {checkAttempts > 0 && checkAttempts < 3 && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Restaurando sessão... ({checkAttempts}/3)
          </p>
        )}
      </div>
    </div>
  );
}
