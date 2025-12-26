"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";

export function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;

    try {
      console.log("🔵 Iniciando signup...", { email });

      // Apenas criar usuário - o trigger cria o profile automaticamente
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        console.error("❌ Erro no signUp:", {
          message: signUpError.message,
          status: signUpError.status,
          code: (signUpError as any).code,
          details: signUpError,
        });
        throw signUpError;
      }

      if (!data.user) {
        console.error("❌ Usuário não foi criado");
        throw new Error("Usuário não foi criado");
      }

      console.log("✅ Usuário criado com sucesso:", {
        userId: data.user.id,
        email: data.user.email,
      });

      setSuccess("Conta criada com sucesso! Verifique seu email para confirmar.");
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);

    } catch (err: any) {
      console.error("❌ Erro completo no signup:", err);
      setError(err.message || "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signin-email") as string;
    const password = formData.get("signin-password") as string;

    try {
      console.log("🔵 Iniciando login...", { email });

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("❌ Erro no signIn:", {
          message: signInError.message,
          status: signInError.status,
          code: (signInError as any).code,
          details: signInError,
        });
        throw signInError;
      }

      if (!data.user) {
        console.error("❌ Usuário não encontrado");
        throw new Error("Usuário não encontrado");
      }

      console.log("✅ Login bem-sucedido:", {
        userId: data.user.id,
        email: data.user.email,
      });

      setSuccess("Login realizado com sucesso!");
      
      // Redirecionar imediatamente
      router.push("/");
      router.refresh();

    } catch (err: any) {
      console.error("❌ Erro completo no login:", err);
      setError(err.message || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        throw resetError;
      }

      setSuccess("Email de recuperação enviado! Verifique sua caixa de entrada.");
      setResetEmail("");
      
      // Fechar o formulário de recuperação após 2 segundos
      setTimeout(() => {
        setShowForgotPassword(false);
        setSuccess(null);
      }, 2000);

    } catch (err: any) {
      console.error("❌ Erro ao enviar email de recuperação:", err);
      setError(err.message || "Erro ao enviar email de recuperação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
            <CardDescription className="text-center">
              Entre ou crie sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                {!showForgotPassword ? (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        name="signin-email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Senha</Label>
                      <Input
                        id="signin-password"
                        name="signin-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    {/* Link de recuperação de senha */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
                      >
                        Esqueci minha senha
                      </button>
                    </div>

                    {error && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-md">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded-md">
                        {success}
                      </div>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email para recuperação</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Enviaremos um link de recuperação para este email
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-md">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded-md">
                        {success}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetEmail("");
                          setError(null);
                          setSuccess(null);
                        }}
                        disabled={isLoading}
                      >
                        Voltar
                      </Button>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar Email"
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-md">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded-md">
                      {success}
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      "Criar Conta"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Ao continuar, você concorda com nossos{" "}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:underline font-medium"
              >
                Termos de Uso
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Modal de Termos de Uso */}
      {showTermsModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Termos de Uso
              </h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Conteúdo com scroll */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">1. Aceitação dos Termos</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Ao acessar e usar este serviço, você aceita e concorda em ficar vinculado aos
                  termos e condições deste acordo. Se você não concordar com qualquer parte destes
                  termos, não deverá usar nosso serviço.
                </p>

                <h3 className="text-lg font-semibold mb-3">2. Uso do Serviço</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Você concorda em usar o serviço apenas para fins legais e de acordo com estes
                  Termos de Uso. Você concorda em não usar o serviço:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li>De qualquer forma que viole qualquer lei ou regulamento aplicável</li>
                  <li>Para transmitir qualquer material publicitário ou promocional não solicitado</li>
                  <li>Para se passar por outra pessoa ou entidade</li>
                  <li>Para interferir ou interromper o serviço ou servidores conectados ao serviço</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">3. Contas de Usuário</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Ao criar uma conta conosco, você deve nos fornecer informações precisas, completas
                  e atualizadas. A falha em fazê-lo constitui uma violação dos Termos, o que pode
                  resultar no encerramento imediato de sua conta em nosso serviço.
                </p>

                <h3 className="text-lg font-semibold mb-3">4. Privacidade</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Sua privacidade é importante para nós. Coletamos e usamos suas informações pessoais
                  de acordo com nossa Política de Privacidade. Ao usar o serviço, você concorda com
                  a coleta e uso de informações de acordo com essa política.
                </p>

                <h3 className="text-lg font-semibold mb-3">5. Propriedade Intelectual</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão
                  propriedade exclusiva da empresa e seus licenciadores. O serviço é protegido por
                  direitos autorais, marcas registradas e outras leis.
                </p>

                <h3 className="text-lg font-semibold mb-3">6. Limitação de Responsabilidade</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Em nenhum caso a empresa, nem seus diretores, funcionários, parceiros, agentes,
                  fornecedores ou afiliados, serão responsáveis por quaisquer danos indiretos,
                  incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação,
                  perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis.
                </p>

                <h3 className="text-lg font-semibold mb-3">7. Modificações dos Termos</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir
                  estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer
                  um aviso com pelo menos 30 dias de antecedência antes de quaisquer novos termos
                  entrarem em vigor.
                </p>

                <h3 className="text-lg font-semibold mb-3">8. Contato</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através
                  dos canais de suporte disponíveis no serviço.
                </p>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={() => setShowTermsModal(false)}
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
