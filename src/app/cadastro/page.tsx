"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { LumLogo } from "@/components/LumIcons";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { CheckCircle2 } from "lucide-react";

function CadastroContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const checkoutSuccess = searchParams.get("checkout") === "success";
  const sessionId = searchParams.get("session_id");

  // Se já estiver logado, redirecionar para home
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleAuthSuccess = async () => {
    // Após autenticação bem-sucedida, marcar como pagante
    if (checkoutSuccess && user) {
      console.log("✅ Usuário criou conta após checkout - marcando como pagante");
      
      try {
        // Atualizar perfil para marcar como pagante
        const { error } = await supabase
          .from("profiles")
          .update({ 
            is_subscriber: true,
            updated_at: new Date().toISOString()
          })
          .eq("user_id", user.id);

        if (error) {
          console.error("❌ Erro ao marcar como pagante:", error);
        } else {
          console.log("✅ Usuário marcado como pagante com sucesso");
        }
      } catch (error) {
        console.error("❌ Erro ao atualizar perfil:", error);
      }
    }

    // Mostrar mensagem de sucesso
    setShowSuccess(true);
    
    // Redirecionar para home após 2 segundos
    setTimeout(() => {
      router.push("/");
    }, 2000);
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

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a] p-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Conta criada com sucesso!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Redirecionando para o app...
          </p>
          <div className="flex justify-center">
            <LumLogo className="w-12 h-12 animate-pulse" />
          </div>
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
          {checkoutSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✅ Pagamento confirmado! Crie sua conta para acessar.
              </p>
            </div>
          )}
        </div>
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a]">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <LumLogo className="w-16 h-16 animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    }>
      <CadastroContent />
    </Suspense>
  );
}
