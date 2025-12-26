"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Função centralizada para garantir que o perfil existe com user_id correto
  const ensureProfile = async (userId: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;

    try {
      // Verificar se perfil existe
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("id, user_id, is_subscriber")
        .eq("user_id", userId)
        .maybeSingle();

      if (fetchError) {
        console.error("❌ Erro ao buscar perfil:", fetchError);
        return false;
      }

      // Se perfil não existe, criar um novo
      if (!existingProfile) {
        console.log("🔄 Criando perfil para user_id:", userId);
        
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            user_id: userId,
            is_subscriber: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select("id, user_id, is_subscriber")
          .single();

        if (createError) {
          console.error("❌ Erro ao criar perfil:", createError);
          return false;
        } else {
          console.log("✅ Perfil criado com sucesso:", newProfile);
          return true;
        }
      } else {
        console.log("✅ Perfil já existe para user_id:", userId, "| is_subscriber:", existingProfile.is_subscriber);
        return true;
      }
    } catch (error) {
      console.error("❌ Erro ao garantir perfil:", error);
      return false;
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
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // Garantir que o perfil existe com user_id correto
      if (currentUser) {
        await ensureProfile(currentUser.id);
      }
      
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      console.log("🔐 Auth event:", event, "| User:", currentUser?.id);
      
      // Garantir que o perfil existe quando usuário faz login ou se registra
      if (currentUser && (event === "SIGNED_IN" || event === "USER_UPDATED")) {
        const profileCreated = await ensureProfile(currentUser.id);
        
        if (profileCreated) {
          console.log("✅ Perfil garantido após", event);
        }
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
      console.log("🚪 Iniciando logout...");
      
      // Limpar estado local primeiro
      setUser(null);
      
      // Executar signOut do Supabase (limpa cookies e sessão)
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Erro ao fazer logout:", error);
      } else {
        console.log("✅ Logout bem-sucedido");
      }
      
      // Limpar qualquer dado em cache do localStorage relacionado ao usuário
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("lumia-") || key.includes("supabase"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log("🗑️ Removido:", key);
      });
      
    } catch (error) {
      console.error("❌ Erro durante logout:", error);
    }
  };

  return { user, loading, signOut };
}
