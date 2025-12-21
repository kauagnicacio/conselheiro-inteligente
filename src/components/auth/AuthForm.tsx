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
  signupOnly?: boolean;
}

type AuthMode = "signup" | "login" | "reset";

export function AuthForm({ onAuthSuccess, signupOnly = false }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(signupOnly ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isSupabaseConfigured || !supabase) {
        // Modo local/demo
        const mockUser = {
          id: `local-${Date.now()}`,
          email,
          created_at: new Date().toISOString(),
        };
        
        localStorage.setItem("lumia-local-user", JSON.stringify(mockUser));
        
        setMessage({
          type: "success",
          text: "Conta criada com sucesso! Redirecionando...",
        });

        setTimeout(() => {
          if (onAuthSuccess) {
            onAuthSuccess();
          }
          window.location.reload();
        }, 1000);
        
        return;
      }

      // Criar conta no Supabase
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: false,
          },
        },
      });

      if (signupError) {
        // Se o usuário já existe, mostrar mensagem amigável
        if (signupError.message.includes("already registered") || 
            signupError.message.includes("User already registered")) {
          setMessage({
            type: "error",
            text: "Esse e-mail já está cadastrado.",
          });
          // Adicionar botão para trocar para login
          setTimeout(() => {
            setMessage({
              type: "error",
              text: "Esse e-mail já está cadastrado. Clique no botão abaixo para entrar.",
            });
          }, 100);
          return;
        }
        throw signupError;
      }

      // Fazer login automático após criar conta
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      // Criar perfil do usuário na tabela profiles com is_subscriber = false
      if (loginData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            user_id: loginData.user.id,
            is_subscriber: false,
          });

        if (profileError && profileError.code !== "23505") {
          console.error("Erro ao criar perfil:", profileError);
        }
      }

      setMessage({
        type: "success",
        text: "Conta criada com sucesso! Redirecionando...",
      });

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isSupabaseConfigured || !supabase) {
        // Modo local/demo
        const localUser = localStorage.getItem("lumia-local-user");
        if (localUser) {
          setMessage({
            type: "success",
            text: "Login realizado com sucesso! Redirecionando...",
          });
          setTimeout(() => {
            if (onAuthSuccess) {
              onAuthSuccess();
            }
            window.location.reload();
          }, 1000);
        } else {
          setMessage({
            type: "error",
            text: "Usuário não encontrado. Crie uma conta primeiro.",
          });
        }
        return;
      }

      // Login com Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Login realizado com sucesso! Redirecionando...",
      });

      setTimeout(() => {
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      }, 1000);
    } catch (error: any) {
      console.error("Erro no login:", error);
      setMessage({
        type: "error",
        text: error.message === "Invalid login credentials" 
          ? "E-mail ou senha incorretos." 
          : error.message || "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isSupabaseConfigured || !supabase) {
        setMessage({
          type: "error",
          text: "Recuperação de senha não disponível no modo demonstração.",
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Link de recuperação enviado! Verifique seu e-mail.",
      });

      // Voltar para login após 3 segundos
      setTimeout(() => {
        setMode("login");
        setMessage(null);
      }, 3000);
    } catch (error: any) {
      console.error("Erro ao recuperar senha:", error);
      setMessage({
        type: "error",
        text: error.message || "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (mode === "signup") {
      handleSignup(e);
    } else if (mode === "login") {
      handleLogin(e);
    } else {
      handleResetPassword(e);
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder={mode === "signup" ? "Mínimo 6 caracteres" : "Digite sua senha"}
              required
              disabled={loading}
              minLength={6}
              className="h-12"
            />
            {mode === "signup" && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Crie uma senha com no mínimo 6 caracteres
              </p>
            )}
          </div>
        )}

        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Botão para trocar para login quando e-mail já existe */}
        {message?.type === "error" && message.text.includes("já está cadastrado") && (
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => {
              setMode("login");
              setMessage(null);
            }}
          >
            Clique aqui para entrar
          </Button>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {mode === "signup" ? "Criando sua conta..." : mode === "login" ? "Entrando..." : "Enviando..."}
            </>
          ) : (
            <>
              {mode === "signup" ? "Criar conta e acessar" : mode === "login" ? "Entrar" : "Enviar link de recuperação"}
            </>
          )}
        </Button>

        {/* Links de navegação entre modos */}
        <div className="space-y-2 text-center">
          {mode === "login" && (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode("reset");
                  setMessage(null);
                }}
                className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
                disabled={loading}
              >
                Esqueci minha senha
              </button>
              {!signupOnly && (
                <>
                  <br />
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setMessage(null);
                    }}
                    className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    disabled={loading}
                  >
                    Não tem conta? Criar conta
                  </button>
                </>
              )}
            </>
          )}

          {mode === "signup" && !signupOnly && (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage(null);
              }}
              className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              disabled={loading}
            >
              Já tem conta? Entrar
            </button>
          )}

          {mode === "reset" && (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage(null);
              }}
              className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              disabled={loading}
            >
              Voltar para login
            </button>
          )}
        </div>
      </form>

      {mode === "signup" && (
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ao criar sua conta, você concorda com nossos termos de uso e política de privacidade
          </p>
        </div>
      )}
    </div>
  );
}
