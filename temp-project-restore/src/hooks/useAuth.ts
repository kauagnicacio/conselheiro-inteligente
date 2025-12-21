"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se Supabase não estiver configurado, usar modo local
    if (!isSupabaseConfigured || !supabase) {
      const localUser = localStorage.getItem("lumia-local-user");
      if (localUser) {
        try {
          setUser(JSON.parse(localUser) as User);
        } catch (e) {
          console.error("Erro ao carregar usuário local:", e);
        }
      }
      setLoading(false);
      return;
    }

    // Verificar sessão atual no Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Modo local - limpar localStorage
      localStorage.removeItem("lumia-local-user");
      setUser(null);
      window.location.reload();
      return;
    }

    await supabase.auth.signOut();
  };

  return { user, loading, signOut };
}
