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
        // Verificar no Supabase se o usuário tem assinatura ativa
        const { data, error } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", userId)
          .eq("status", "active")
          .single();

        if (error) {
          console.error("Erro ao verificar assinatura:", error);
          setIsSubscribed(false);
        } else {
          setIsSubscribed(!!data);
        }
      } catch (error) {
        console.error("Erro ao verificar assinatura:", error);
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();
  }, [userId]);

  return { isSubscribed, loading };
}
