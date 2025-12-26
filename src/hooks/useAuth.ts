"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      setLoading(false);

      if (currentUser) {
        console.log("✅ Usuário autenticado:", currentUser.id, currentUser.email);
      }
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      console.log("🔐 Auth event:", event, "| User:", currentUser?.id);
      
      // O profile é criado AUTOMATICAMENTE pelo trigger do Supabase
      // Não precisamos criar aqui - apenas logamos para debug
      if (currentUser && (event === "SIGNED_IN" || event === "USER_UPDATED")) {
        console.log("✅ Login detectado. Profile será criado automaticamente pelo trigger.");
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
      router.push("/quiz");
      return;
    }

    try {
      console.log("🚪 Iniciando logout...");
      
      // 1. Limpar estado local primeiro
      setUser(null);
      
      // 2. Executar signOut do Supabase (limpa cookies e sessão no servidor)
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Erro ao fazer logout:", error);
        throw error;
      }
      
      console.log("✅ Logout bem-sucedido no Supabase");
      
      // 3. Limpar qualquer dado em cache do localStorage
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("lumia-") || key.includes("supabase"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log("🗑️ Removido do localStorage:", key);
      });
      
      // 4. Redirecionar para página de login
      console.log("🔄 Redirecionando para /quiz...");
      router.push("/quiz");
      
      // 5. Forçar refresh para limpar qualquer estado residual
      setTimeout(() => {
        router.refresh();
      }, 100);
      
    } catch (error) {
      console.error("❌ Erro durante logout:", error);
      // Mesmo com erro, tentar redirecionar
      router.push("/quiz");
    }
  };

  return { user, loading, signOut };
}
