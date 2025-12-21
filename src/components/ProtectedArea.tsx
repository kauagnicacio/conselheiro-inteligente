"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { LumLogo } from "@/components/LumIcons";
import { Button } from "@/components/ui/button";

interface ProtectedAreaProps {
  children: React.ReactNode;
}

export function ProtectedArea({ children }: ProtectedAreaProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isSubscriber, setIsSubscriber] = useState<boolean | null>(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  // Verificar assinatura no Supabase
  useEffect(() => {
    async function checkSubscription() {
      if (!user) {
        setCheckingSubscription(false);
        return;
      }

      // Se Supabase não estiver configurado, usar localStorage como fallback
      if (!isSupabaseConfigured || !supabase) {
        const localSubscription = localStorage.getItem(`lumia-subscription-${user.id}`);
        setIsSubscriber(localSubscription === "true");
        setCheckingSubscription(false);
        return;
      }

      try {
        // Buscar perfil do usuário no Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select("is_subscriber")
          .eq("user_id", user.id)
          .single();

        if (error) {
          // Se não encontrou o perfil, criar um novo com is_subscriber = false
          if (error.code === "PGRST116") {
            const { error: insertError } = await supabase
              .from("profiles")
              .insert({
                user_id: user.id,
                is_subscriber: false,
              });

            if (insertError) {
              console.error("Erro ao criar perfil:", insertError);
            }
            setIsSubscriber(false);
          } else {
            console.error("Erro ao buscar perfil:", error);
            setIsSubscriber(false);
          }
        } else {
          setIsSubscriber(data?.is_subscriber || false);
        }
      } catch (error) {
        console.error("Erro ao verificar assinatura:", error);
        setIsSubscriber(false);
      } finally {
        setCheckingSubscription(false);
      }
    }

    checkSubscription();
  }, [user]);

  // Estado de carregamento
  if (authLoading || checkingSubscription) {
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

  // Está logado mas não é assinante - mostrar paywall
  if (isSubscriber === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a] p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <LumLogo className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Assine para Continuar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Para ter acesso completo à Lum IA e todas as suas funcionalidades, você precisa de uma assinatura ativa.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Desbloqueie conversas ilimitadas, análises personalizadas e muito mais!
          </p>
          <Button
            onClick={() => window.location.href = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603"}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            Assinar Agora - R$ 27,90/mês
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Cancele quando quiser, sem compromisso.
          </p>
        </div>
      </div>
    );
  }

  // É assinante - renderizar conteúdo protegido
  return <>{children}</>;
}
