"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, X, Mail, Lock, Sparkles } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 dark:from-purple-900 dark:via-blue-900 dark:to-cyan-900 p-4 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Card className="w-full max-w-md backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 shadow-2xl border-0 relative z-10">
          <CardHeader className="space-y-3 pb-6">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Bem-vindo à Lum
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600 dark:text-gray-400">
              Sua jornada de autoconhecimento começa aqui
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                <TabsTrigger 
                  value="signin"
                  className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all duration-200"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all duration-200"
                >
                  Criar Conta
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-0">
                {!showForgotPassword ? (
                  <form onSubmit={handleSignIn} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="signin-email"
                          name="signin-email"
                          type="email"
                          placeholder="seu@email.com"
                          required
                          disabled={isLoading}
                          className="pl-10 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Senha
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="signin-password"
                          name="signin-password"
                          type="password"
                          placeholder="••••••••"
                          required
                          disabled={isLoading}
                          className="pl-10 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    {/* Link de recuperação de senha */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:underline transition-colors"
                      >
                        Esqueci minha senha
                      </button>
                    </div>

                    {error && (
                      <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="p-4 text-sm text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800">
                        {success}
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email para recuperação
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pl-10 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Enviaremos um link de recuperação para este email
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="p-4 text-sm text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800">
                        {success}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
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
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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

              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        disabled={isLoading}
                        className="pl-10 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="signup-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        disabled={isLoading}
                        className="pl-10 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Mínimo de 6 caracteres
                    </p>
                  </div>
                  {error && (
                    <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-4 text-sm text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800">
                      {success}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
            <p>
              Ao continuar, você concorda com nossos{" "}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:underline font-medium transition-colors"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Termos de Uso
              </h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conteúdo com scroll */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">1. Aceitação dos Termos</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Ao acessar e usar este serviço, você aceita e concorda em ficar vinculado aos
                  termos e condições deste acordo. Se você não concordar com qualquer parte destes
                  termos, não deverá usar nosso serviço.
                </p>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">2. Uso do Serviço</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Você concorda em usar o serviço apenas para fins legais e de acordo com estes
                  Termos de Uso. Você concorda em não usar o serviço:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>De qualquer forma que viole qualquer lei ou regulamento aplicável</li>
                  <li>Para transmitir qualquer material publicitário ou promocional não solicitado</li>
                  <li>Para se passar por outra pessoa ou entidade</li>
                  <li>Para interferir ou interromper o serviço ou servidores conectados ao serviço</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">3. Contas de Usuário</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Ao criar uma conta conosco, você deve nos fornecer informações precisas, completas
                  e atualizadas. A falha em fazê-lo constitui uma violação dos Termos, o que pode
                  resultar no encerramento imediato de sua conta em nosso serviço.
                </p>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">4. Privacidade</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Sua privacidade é importante para nós. Coletamos e usamos suas informações pessoais
                  de acordo com nossa Política de Privacidade. Ao usar o serviço, você concorda com
                  a coleta e uso de informações de acordo com essa política.
                </p>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">5. Propriedade Intelectual</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão
                  propriedade exclusiva da empresa e seus licenciadores. O serviço é protegido por
                  direitos autorais, marcas registradas e outras leis.
                </p>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">6. Limitação de Responsabilidade</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Em nenhum caso a empresa, nem seus diretores, funcionários, parceiros, agentes,
                  fornecedores ou afiliados, serão responsáveis por quaisquer danos indiretos,
                  incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação,
                  perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis.
                </p>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">7. Modificações dos Termos</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir
                  estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer
                  um aviso com pelo menos 30 dias de antecedência antes de quaisquer novos termos
                  entrarem em vigor.
                </p>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">8. Contato</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através
                  dos canais de suporte disponíveis no serviço.
                </p>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800">
              <Button
                onClick={() => setShowTermsModal(false)}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
