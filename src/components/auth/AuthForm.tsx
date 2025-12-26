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

type AuthMode = "signup" | "login" | "reset";

export function AuthForm({ onAuthSuccess, signupOnly = false }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("signup"); // Padrão: Criar conta
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

      console.log("📝 Iniciando cadastro para:", email);

      // Criar conta no Supabase
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: false, // Não exigir confirmação de email
          },
        },
      });

      if (signupError) {
        // Log detalhado do erro para diagnóstico
        console.error("❌ Erro no cadastro:", {
          message: signupError.message,
          code: signupError.code,
          status: signupError.status,
          name: signupError.name,
          details: signupError
        });

        // Se o erro for "usuário já existe", mostrar mensagem amigável
        if (signupError.message.includes("already registered") || signupError.message.includes("User already registered")) {
          setMessage({
            type: "error",
            text: "Esse e-mail já está cadastrado. Tente fazer login.",
          });
          // Oferecer troca para modo login após 2 segundos
          setTimeout(() => {
            setMode("login");
            setMessage(null);
          }, 2000);
          return;
        }
        
        // Se for erro de banco de dados, mostrar mensagem específica
        if (signupError.message.includes("Database error") || signupError.code === "23505") {
          setMessage({
            type: "error",
            text: "Erro ao criar perfil. Por favor, tente novamente em alguns segundos.",
          });
          return;
        }
        
        throw signupError;
      }

      console.log("✅ Cadastro realizado com sucesso:", signupData.user?.id);

      // Fazer login automático após criar conta
      console.log("🔐 Fazendo login automático...");
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        console.error("❌ Erro no login automático:", loginError);
        throw loginError;
      }

      console.log("✅ Login automático bem-sucedido");

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
      // Log detalhado para diagnóstico
      console.error("❌ Erro no cadastro:", {
        message: error.message,
        code: error.code,
        status: error.status,
        name: error.name,
        details: error
      });
      
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
      // Verificar se Supabase está configurado
      if (!isSupabaseConfigured || !supabase) {
        // Modo local/demo - simular login
        console.log("Modo demo: Supabase não configurado");
        
        // Verificar se existe usuário local
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

      console.log("🔐 Iniciando login para:", email);

      // Login com Supabase
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Erro no login:", {
          message: error.message,
          code: error.code,
          status: error.status,
          details: error
        });
        throw error;
      }

      console.log("✅ Login bem-sucedido:", loginData.user?.id);

      setMessage({
        type: "success",
        text: "Login realizado com sucesso! Redirecionando...",
      });

      // Chamar callback de sucesso após breve delay
      setTimeout(() => {
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      }, 1000);
    } catch (error: any) {
      // Log detalhado para diagnóstico
      console.error("❌ Erro no login:", {
        message: error.message,
        code: error.code,
        status: error.status,
        name: error.name,
        details: error
      });
      
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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isSupabaseConfigured || !supabase) {
        setMessage({
          type: "error",
          text: "Recuperação de senha não disponível no modo demo.",
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Link de recuperação enviado para seu e-mail!",
      });

      // Voltar para login após 3 segundos
      setTimeout(() => {
        setMode("login");
        setMessage(null);
      }, 3000);
    } catch (error: any) {
      // Log detalhado para diagnóstico
      console.error("❌ Erro ao recuperar senha:", {
        message: error.message,
        code: error.code,
        status: error.status,
        name: error.name,
        details: error
      });
      
      setMessage({
        type: "error",
        text: error.message || "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      {!isSupabaseConfigured && (
        <Alert className="mb-4">
          <AlertDescription>
            Modo demonstração: As contas serão salvas localmente no seu navegador.
          </AlertDescription>
        </Alert>
      )}

      {/* Título dinâmico baseado no modo */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {mode === "signup" && "Crie sua conta para acessar a Lum"}
          {mode === "login" && "Bem-vindo de volta à Lum"}
          {mode === "reset" && "Recuperar senha"}
        </h2>
      </div>
      
      {/* Formulário de Cadastro */}
      {mode === "signup" && (
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
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
              "Criar conta"
            )}
          </Button>

          <div className="text-center space-y-3">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              Já tenho conta
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ao criar sua conta, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        </form>
      )}

      {/* Formulário de Login */}
      {mode === "login" && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-login">E-mail</Label>
            <Input
              id="email-login"
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
            <Label htmlFor="password-login">Senha</Label>
            <Input
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              disabled={loading}
              className="h-12"
            />
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
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => setMode("reset")}
              className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium block w-full"
            >
              Esqueci minha senha
            </button>
            
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Ainda não tenho conta? <span className="text-purple-600 dark:text-purple-400 font-medium">Criar conta</span>
            </button>
          </div>
        </form>
      )}

      {/* Formulário de Recuperação de Senha */}
      {mode === "reset" && (
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Digite seu e-mail para receber um link de recuperação de senha.
          </p>

          <div className="space-y-2">
            <Label htmlFor="email-reset">E-mail</Label>
            <Input
              id="email-reset"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
              className="h-12"
            />
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
                Enviando...
              </>
            ) : (
              "Enviar link de recuperação"
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Voltar para login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
