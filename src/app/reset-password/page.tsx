"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LumLogo } from "@/components/LumIcons";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    // Verificar se há um token de recuperação válido na URL
    const checkToken = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setMessage({
          type: "error",
          text: "Recuperação de senha não disponível no modo demonstração.",
        });
        return;
      }

      // Verificar se há um hash na URL (token de recuperação)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");

      if (accessToken && type === "recovery") {
        setIsValidToken(true);
      } else {
        setMessage({
          type: "error",
          text: "Link de recuperação inválido ou expirado. Solicite um novo link.",
        });
        setTimeout(() => {
          router.push("/cadastro");
        }, 3000);
      }
    };

    checkToken();
  }, [router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validar senhas
    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        text: "As senhas não coincidem.",
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "A senha deve ter no mínimo 6 caracteres.",
      });
      setLoading(false);
      return;
    }

    try {
      if (!isSupabaseConfigured || !supabase) {
        setMessage({
          type: "error",
          text: "Recuperação de senha não disponível no modo demonstração.",
        });
        return;
      }

      // Atualizar senha no Supabase
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Senha redefinida com sucesso! Redirecionando...",
      });

      // Redirecionar para a página principal após 2 segundos
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao redefinir senha:", error);
      setMessage({
        type: "error",
        text: error.message || "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isValidToken && !message) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a]">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <LumLogo className="w-16 h-16 animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Verificando link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a1a1a] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <LumLogo className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Redefinir senha
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Escolha uma nova senha para sua conta
          </p>
        </div>

        <div className="w-full max-w-md mx-auto p-6">
          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-4">
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {isValidToken && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  disabled={loading}
                  minLength={6}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  required
                  disabled={loading}
                  minLength={6}
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redefinindo senha...
                  </>
                ) : (
                  "Redefinir senha"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push("/cadastro")}
                  className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  disabled={loading}
                >
                  Voltar para login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
