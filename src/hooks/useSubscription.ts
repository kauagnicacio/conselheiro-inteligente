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

      // Se Supabase não estiver configurado, verificar localStorage
      if (!isSupabaseConfigured || !supabase) {
        const localSubscription = localStorage.getItem(`lumia-subscription-${userId}`);
        setIsSubscribed(localSubscription === "active");
        setLoading(false);
        return;
      }

      try {
        console.log("🔍 Verificando assinatura para user_id:", userId);
        
        // FONTE ÚNICA DE VERDADE: profiles.is_subscriber
        // Buscar perfil do usuário logado usando user_id
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("is_subscriber, user_id, id")
          .eq("user_id", userId)
          .maybeSingle();

        if (error) {
          console.error("❌ Erro ao verificar assinatura:", error);
          setIsSubscribed(false);
          setLoading(false);
          return;
        }

        // Se perfil não existe, NÃO criar aqui (deixar para useAuth)
        // Apenas retornar false
        if (!profile) {
          console.log("⚠️ Perfil não encontrado para user_id:", userId);
          setIsSubscribed(false);
          setLoading(false);
          return;
        }

        // Perfil existe - usar is_subscriber como fonte de verdade
        const subscriptionStatus = profile.is_subscriber || false;
        console.log("✅ Status de assinatura:", subscriptionStatus, "| Profile ID:", profile.id);
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
    if (!userId || !isSupabaseConfigured || !supabase) return;

    console.log("🔄 Revalidando assinatura manualmente para user_id:", userId);
    setLoading(true);
    
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_subscriber")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && profile) {
        const newStatus = profile.is_subscriber || false;
        console.log("✅ Revalidação concluída. Novo status:", newStatus);
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
