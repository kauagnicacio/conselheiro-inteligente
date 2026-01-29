"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";

/**
 * Componente de Debug para Diagnóstico de Assinatura
 * 
 * COMO USAR:
 * 1. Adicione este componente em src/app/page.tsx temporariamente:
 *    import { SubscriptionDebug } from "@/components/SubscriptionDebug";
 *    <SubscriptionDebug />
 * 
 * 2. Ele aparecerá no canto inferior direito da tela
 * 3. Use para diagnosticar problemas de assinatura em tempo real
 * 4. REMOVA após resolver o problema
 */

export function SubscriptionDebug() {
  const { user } = useAuth();
  const { isSubscribed, loading, revalidate } = useSubscription(user?.id);
  const [profileData, setProfileData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id && isSupabaseConfigured && supabase) {
      fetchProfileData();
    }
  }, [user?.id]);

  const fetchProfileData = async () => {
    if (!user?.id || !supabase) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        setProfileData({ error: error.message });
      } else {
        setProfileData(data);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      setProfileData({ error: String(error) });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProfileData();
    await revalidate();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleToggleSubscription = async () => {
    if (!user?.id || !supabase || !profileData) return;

    try {
      const newStatus = !profileData.is_subscriber;
      const { error } = await supabase
        .from("profiles")
        .update({ is_subscriber: newStatus, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);

      if (error) {
        console.error("Erro ao atualizar assinatura:", error);
        alert("Erro ao atualizar: " + error.message);
      } else {
        console.log("✅ Assinatura atualizada para:", newStatus);
        await handleRefresh();
      }
    } catch (error) {
      console.error("Erro ao atualizar assinatura:", error);
      alert("Erro: " + String(error));
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full shadow-lg bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          🔍 Debug
        </Button>
      ) : (
        <Card className="w-96 max-h-[600px] overflow-y-auto p-4 shadow-2xl bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              🔍 Debug de Assinatura
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              ✕
            </Button>
          </div>

          {/* Status Geral */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="text-sm font-medium">Supabase Configurado:</span>
              {isSupabaseConfigured ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="text-sm font-medium">Usuário Logado:</span>
              {user ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="text-sm font-medium">Status Hook:</span>
              {loading ? (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              ) : isSubscribed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Usuário:
            </h4>
            <div className="text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded font-mono break-all">
              <div><strong>ID:</strong> {user.id}</div>
              <div><strong>Email:</strong> {user.email}</div>
            </div>
          </div>

          {/* Dados do Perfil */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Perfil no Banco:
            </h4>
            {profileData ? (
              <div className="text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded font-mono break-all space-y-1">
                {profileData.error ? (
                  <div className="text-red-500">❌ Erro: {profileData.error}</div>
                ) : (
                  <>
                    <div><strong>Profile ID:</strong> {profileData.id}</div>
                    <div><strong>User ID:</strong> {profileData.user_id}</div>
                    <div>
                      <strong>is_subscriber:</strong>{" "}
                      <span className={profileData.is_subscriber ? "text-green-500" : "text-red-500"}>
                        {String(profileData.is_subscriber)}
                      </span>
                    </div>
                    <div><strong>Display Name:</strong> {profileData.display_name || "null"}</div>
                    <div><strong>Created:</strong> {new Date(profileData.created_at).toLocaleString()}</div>
                    <div><strong>Updated:</strong> {new Date(profileData.updated_at).toLocaleString()}</div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-500">Carregando...</div>
            )}
          </div>

          {/* Estado do Hook */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Estado do Hook:
            </h4>
            <div className="text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded font-mono">
              <div><strong>isSubscribed:</strong> {String(isSubscribed)}</div>
              <div><strong>loading:</strong> {String(loading)}</div>
            </div>
          </div>

          {/* Ações */}
          <div className="space-y-2">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full"
              variant="outline"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Recarregar Dados
            </Button>

            {profileData && !profileData.error && (
              <Button
                onClick={handleToggleSubscription}
                className="w-full"
                variant={profileData.is_subscriber ? "destructive" : "default"}
              >
                {profileData.is_subscriber ? "❌ Desativar" : "✅ Ativar"} Assinatura (Teste)
              </Button>
            )}
          </div>

          {/* Avisos */}
          <div className="mt-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
            <strong>⚠️ Modo Debug:</strong> Este componente é apenas para diagnóstico.
            Remova após resolver o problema.
          </div>
        </Card>
      )}
    </div>
  );
}
