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
        // FONTE ÚNICA DE VERDADE: profiles.is_subscriber
        // Buscar perfil do usuário logado usando user_id
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("is_subscriber, user_id")
          .eq("user_id", userId)
          .maybeSingle(); // Usar maybeSingle para não dar erro se não existir

        if (error) {
          console.error("Erro ao verificar assinatura:", error);
          setIsSubscribed(false);
          setLoading(false);
          return;
        }

        // Se perfil não existe, criar um novo com user_id correto
        if (!profile) {
          console.log("Perfil não encontrado, criando novo perfil para user_id:", userId);
          
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert({
              user_id: userId,
              is_subscriber: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select("is_subscriber")
            .single();

          if (createError) {
            console.error("Erro ao criar perfil:", createError);
            setIsSubscribed(false);
          } else {
            setIsSubscribed(newProfile?.is_subscriber || false);
          }
        } else {
          // Perfil existe - usar is_subscriber como fonte de verdade
          setIsSubscribed(profile.is_subscriber || false);
        }
      } catch (error) {
        console.error("Erro ao verificar assinatura:", error);
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();

    // REVALIDAÇÃO EM TEMPO REAL: Escutar mudanças na tabela profiles
    if (isSupabaseConfigured && supabase && userId) {
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
            console.log("Mudança detectada no perfil:", payload);
            
            // Atualizar estado imediatamente quando houver mudança
            if (payload.new && "is_subscriber" in payload.new) {
              setIsSubscribed(payload.new.is_subscriber || false);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [userId]);

  // Função para forçar revalidação (útil após login)
  const revalidate = async () => {
    if (!userId || !isSupabaseConfigured || !supabase) return;

    setLoading(true);
    
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_subscriber")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && profile) {
        setIsSubscribed(profile.is_subscriber || false);
      }
    } catch (error) {
      console.error("Erro ao revalidar assinatura:", error);
    } finally {
      setLoading(false);
    }
  };

  return { isSubscribed, loading, revalidate };
}
