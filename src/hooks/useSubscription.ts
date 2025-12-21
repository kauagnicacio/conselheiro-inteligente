"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useSubscription() {
  const { user } = useAuth();
  const [isSubscriber, setIsSubscriber] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSubscription() {
      if (!user) {
        setIsSubscriber(null);
        setLoading(false);
        return;
      }

      // Se Supabase não estiver configurado, usar localStorage como fallback
      if (!isSupabaseConfigured || !supabase) {
        const localSubscription = localStorage.getItem(`lumia-subscription-${user.id}`);
        setIsSubscriber(localSubscription === "true");
        setLoading(false);
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
        setLoading(false);
      }
    }

    checkSubscription();
  }, [user]);

  return { isSubscriber, loading };
}
