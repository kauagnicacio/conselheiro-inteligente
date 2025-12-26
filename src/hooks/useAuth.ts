"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para garantir que o perfil existe com user_id correto
  const ensureProfile = async (userId: string) => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      // Verificar se perfil existe
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("id, user_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (fetchError) {
        console.error("Erro ao buscar perfil:", fetchError);
        return;
      }

      // Se perfil não existe, criar um novo
      if (!existingProfile) {
        console.log("Criando perfil para user_id:", userId);
        
        const { error: createError } = await supabase
          .from("profiles")
          .insert({
            user_id: userId,
            is_subscriber: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (createError) {
          console.error("Erro ao criar perfil:", createError);
        } else {
          console.log("Perfil criado com sucesso para user_id:", userId);
        }
      } else {
        console.log("Perfil já existe para user_id:", userId);
      }
    } catch (error) {
      console.error("Erro ao garantir perfil:", error);
    }
  };

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
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // Garantir que o perfil existe com user_id correto
      if (currentUser) {
        ensureProfile(currentUser.id);
      }
      
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // Garantir que o perfil existe quando usuário faz login
      if (currentUser && _event === "SIGNED_IN") {
        await ensureProfile(currentUser.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Modo local - limpar localStorage
      localStorage.removeItem("lumia-local-user");
      setUser(null);
      return;
    }

    try {
      // Limpar estado local primeiro
      setUser(null);
      
      // Executar signOut do Supabase (limpa cookies e sessão)
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Erro ao fazer logout:", error);
      }
      
      // Limpar qualquer dado em cache do localStorage relacionado ao usuário
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("lumia-") || key.includes("supabase"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
    } catch (error) {
      console.error("Erro durante logout:", error);
    }
  };

  return { user, loading, signOut };
}
