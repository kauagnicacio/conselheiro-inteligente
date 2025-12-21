"use client";

import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  onAuthSuccess?: () => void;
  signupOnly?: boolean; // Modo apenas cadastro (após checkout)
}

export function AuthForm({ onAuthSuccess, signupOnly = false }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Verificar se Supabase está configurado
      if (!isSupabaseConfigured || !supabase) {
        // Modo local/demo - simular criação de conta
        console.log("Modo demo: Supabase não configurado");
        
        // Criar usuário local simulado
        const mockUser = {
          id: `local-${Date.now()}`,
          email,
          created_at: new Date().toISOString(),
        };
        
        // Salvar no localStorage
        localStorage.setItem("lumia-local-user", JSON.stringify(mockUser));
        
        setMessage({
          type: "success",
          text: "Conta criada com sucesso! Redirecionando...",
        });

        // Chamar callback de sucesso após breve delay
        setTimeout(() => {
          if (onAuthSuccess) {
            onAuthSuccess();
          }
          // Recarregar página para atualizar estado de autenticação
          window.location.reload();
        }, 1000);
        
        return;
      }

      // Criar conta no Supabase
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: false, // Não exigir confirmação de email
          },
        },
      });

      if (signupError) throw signupError;

      // Fazer login automático após criar conta
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      setMessage({
        type: "success",
        text: "Conta criada com sucesso! Redirecionando...",
      });

      // Chamar callback de sucesso após breve delay
      setTimeout(() => {
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      }, 1000);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
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
      {!isSupabaseConfigured && (
        <Alert className="mb-4">
          <AlertDescription>
            Modo demonstração: As contas serão salvas localmente no seu navegador.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSignup} className="space-y-4">
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

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
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
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Crie uma senha com no mínimo 6 caracteres
          </p>
        </div>

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
              Criando sua conta...
            </>
          ) : (
            "Criar conta e acessar"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Ao criar sua conta, você concorda com nossos termos de uso e política de privacidade
        </p>
      </div>
    </div>
  );
}
