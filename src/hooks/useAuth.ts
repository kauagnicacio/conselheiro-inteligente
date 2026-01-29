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
      // CORREÇÃO: Verificar se window está disponível antes de acessar localStorage
      if (typeof window !== "undefined") {
        const localUser = localStorage.getItem("lumia-local-user");
        if (localUser) {
          try {
            setUser(JSON.parse(localUser) as User);
          } catch (e) {
            console.error("Erro ao carregar usuário local:", e);
          }
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
      if (typeof window !== "undefined") {
        localStorage.removeItem("lumia-local-user");
      }
      setUser(null);
      router.push("/login");
      return;
    }

    try {
      console.log("🚪 Iniciando logout...");
      
      // 1. Executar signOut do Supabase (limpa cookies e sessão no servidor)
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Erro ao fazer logout:", error);
        throw error;
      }
      
      console.log("✅ Logout bem-sucedido no Supabase");
      
      // 2. Limpar estado local
      setUser(null);
      
      // 3. Limpar qualquer dado em cache do localStorage (APENAS NO CLIENTE)
      if (typeof window !== "undefined") {
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
      }
      
      // 4. Redirecionar para página de login
      console.log("🔄 Redirecionando para /login...");
      router.replace("/login");
      
      // 5. Forçar refresh para limpar qualquer estado residual
      router.refresh();
      
    } catch (error) {
      console.error("❌ Erro durante logout:", error);
      // Mesmo com erro, limpar estado e redirecionar
      setUser(null);
      router.replace("/login");
      router.refresh();
    }
  };

  return { user, loading, signOut };
}
