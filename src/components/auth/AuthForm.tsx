"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

type AuthMode = "login" | "signup" | "reset";

interface AuthFormProps {
  onAuthSuccess?: () => void;
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              email_confirm: false, // Não exigir confirmação de email
            },
          },
        });

        if (error) throw error;

        setMessage({
          type: "success",
          text: "Conta criada com sucesso! Você já pode usar o app.",
        });
        
        // Fazer login automático após criar conta
        setTimeout(async () => {
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!loginError && onAuthSuccess) {
            onAuthSuccess();
          }
        }, 1000);
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage({
          type: "success",
          text: "Login realizado com sucesso!",
        });
        
        // Chamar callback de sucesso
        if (onAuthSuccess) {
          setTimeout(() => {
            onAuthSuccess();
          }, 500);
        }
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) throw error;

        setMessage({
          type: "success",
          text: "Email de recuperação enviado! Verifique sua caixa de entrada.",
        });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={loading}
            className="h-12"
          />
        </div>

        {mode !== "reset" && (
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={6}
              className="h-12"
            />
          </div>
        )}

        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processando...
            </>
          ) : mode === "login" ? (
            "Entrar"
          ) : mode === "signup" ? (
            "Criar conta"
          ) : (
            "Enviar link"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        {mode === "login" && (
          <>
            <button
              type="button"
              onClick={() => setMode("reset")}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
              disabled={loading}
            >
              Esqueceu sua senha?
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Não tem uma conta?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                disabled={loading}
              >
                Criar conta
              </button>
            </div>
          </>
        )}

        {mode === "signup" && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
              disabled={loading}
            >
              Entrar
            </button>
          </div>
        )}

        {mode === "reset" && (
          <button
            type="button"
            onClick={() => setMode("login")}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            disabled={loading}
          >
            Voltar para login
          </button>
        )}
      </div>
    </div>
  );
}
