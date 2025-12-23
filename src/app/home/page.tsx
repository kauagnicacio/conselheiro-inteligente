"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Home from "../page";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Se não estiver logado, redirecionar para /quiz
  useEffect(() => {
    if (!loading && !user) {
      router.push("/quiz");
    }
  }, [user, loading, router]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1a1a1a]">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver logado, não renderizar (o useEffect vai redirecionar)
  if (!user) {
    return null;
  }

  // Se estiver logado, renderizar o app principal
  return <Home />;
}
