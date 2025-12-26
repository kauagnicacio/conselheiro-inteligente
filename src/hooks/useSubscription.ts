"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useSubscription(userId?: string) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSubscription() {
      if (!userId) {
        setIsSubscribed(false);
        setLoading(false);
        return;
      }

      // VERIFICAÇÃO ÚNICA E DETERMINÍSTICA: Supabase é a fonte única de verdade
      if (!isSupabaseConfigured || !supabase) {
        console.error("❌ CRÍTICO: Supabase não configurado. Sistema não pode funcionar sem banco de dados.");
        setIsSubscribed(false);
        setLoading(false);
        return;
      }

      try {
        console.log("🔍 Verificando assinatura no Supabase para user_id:", userId);
        
        // FONTE ÚNICA DE VERDADE: profiles.is_subscriber
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("is_subscriber, user_id, id, email")
          .eq("user_id", userId)
          .maybeSingle();

        if (error) {
          console.error("❌ Erro ao verificar assinatura:", error);
          setIsSubscribed(false);
          setLoading(false);
          return;
        }

        if (!profile) {
          console.log("⚠️ Perfil não encontrado para user_id:", userId);
          console.log("⏳ Aguardando criação automática pelo trigger...");
          
          // Aguardar 2 segundos e tentar novamente (trigger pode estar processando)
          setTimeout(async () => {
            const { data: retryProfile } = await supabase
              .from("profiles")
              .select("is_subscriber, email")
              .eq("user_id", userId)
              .maybeSingle();
            
            if (retryProfile) {
              const status = retryProfile.is_subscriber || false;
              console.log("✅ Perfil encontrado após retry:", status, "| Email:", retryProfile.email);
              setIsSubscribed(status);
            } else {
              console.log("❌ Perfil ainda não existe após retry");
              setIsSubscribed(false);
            }
            setLoading(false);
          }, 2000);
          
          return;
        }

        // Perfil existe - usar is_subscriber como fonte de verdade
        const subscriptionStatus = profile.is_subscriber || false;
        console.log("✅ Status de assinatura:", subscriptionStatus, "| Email:", profile.email, "| Profile ID:", profile.id);
        setIsSubscribed(subscriptionStatus);
        
      } catch (error) {
        console.error("❌ Erro ao verificar assinatura:", error);
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();

    // REVALIDAÇÃO EM TEMPO REAL: Escutar mudanças na tabela profiles
    if (isSupabaseConfigured && supabase && userId) {
      console.log("👂 Escutando mudanças no perfil para user_id:", userId);
      
      const channel = supabase
        .channel(`profile-changes-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*", // Escutar INSERT, UPDATE, DELETE
            schema: "public",
            table: "profiles",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            console.log("🔔 Mudança detectada no perfil:", payload);
            
            // Atualizar estado imediatamente quando houver mudança
            if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
              if (payload.new && "is_subscriber" in payload.new) {
                const newStatus = payload.new.is_subscriber || false;
                console.log("🔄 Atualizando status de assinatura para:", newStatus);
                setIsSubscribed(newStatus);
              }
            } else if (payload.eventType === "DELETE") {
              console.log("🗑️ Perfil deletado, definindo assinatura como false");
              setIsSubscribed(false);
            }
          }
        )
        .subscribe((status) => {
          console.log("📡 Status da subscription realtime:", status);
        });

      return () => {
        console.log("🔌 Desconectando listener de mudanças do perfil");
        supabase.removeChannel(channel);
      };
    }
  }, [userId]);

  // Função para forçar revalidação (útil após login ou atualização manual)
  const revalidate = async () => {
    if (!userId) return;

    console.log("🔄 Revalidando assinatura manualmente para user_id:", userId);
    setLoading(true);

    // Verificar Supabase (fonte única de verdade)
    if (!isSupabaseConfigured || !supabase) {
      console.error("❌ Supabase não configurado");
      setIsSubscribed(false);
      setLoading(false);
      return;
    }
    
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_subscriber, email")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && profile) {
        const newStatus = profile.is_subscriber || false;
        console.log("✅ Revalidação concluída. Novo status:", newStatus, "| Email:", profile.email);
        setIsSubscribed(newStatus);
      } else {
        console.log("⚠️ Perfil não encontrado durante revalidação");
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("❌ Erro ao revalidar assinatura:", error);
    } finally {
      setLoading(false);
    }
  };

  return { isSubscribed, loading, revalidate };
}
