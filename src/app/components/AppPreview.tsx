"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LumLogo, LumAvatar } from "@/components/LumIcons";
import { 
  Sparkles, 
  MessageCircle, 
  Briefcase, 
  Heart, 
  Users, 
  User,
  Target,
  CheckCircle2,
  Lock,
  ChevronRight
} from "lucide-react";

interface AppPreviewProps {
  responses: Record<string, string>;
}

export function AppPreview({ responses }: AppPreviewProps) {
  const [activePreview, setActivePreview] = useState<"chat" | "quiz" | "categories">("chat");

  // Gerar insight personalizado baseado nas respostas
  const generateInsight = () => {
    const momento = responses.momento_vida;
    const emocional = responses.rotina_emocional;
    const busca = responses.busca_principal;

    let insight = "Percebi que você está ";

    if (momento === "transicao" || momento === "desafiador") {
      insight += "passando por um momento de mudanças. ";
    } else if (momento === "estagnado") {
      insight += "buscando uma nova direção. ";
    } else if (momento === "crescimento") {
      insight += "em um momento de evolução. ";
    } else {
      insight += "em um momento importante da sua vida. ";
    }

    if (emocional === "sobrecarregado" || emocional === "ansioso") {
      insight += "A intensidade emocional tem sido alta, e isso pede cuidado. ";
    } else if (emocional === "altos_baixos") {
      insight += "As oscilações emocionais são naturais, mas merecem atenção. ";
    }

    if (busca === "clareza") {
      insight += "Você busca clareza, e isso já é um grande passo. ";
    } else if (busca === "acolhimento") {
      insight += "Você busca acolhimento, e merece esse espaço seguro. ";
    } else if (busca === "paz") {
      insight += "Você busca paz interior, e isso é possível. ";
    } else if (busca === "transformacao") {
      insight += "Você busca transformação, e está no caminho certo. ";
    }

    insight += "A Lum está aqui para te acompanhar nessa jornada. 💜";

    return insight;
  };

  const handleCheckout = () => {
    window.location.href = "https://pay.kirvano.com/7b8cc79c-b462-4502-b453-3397e525b603";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <LumLogo className="w-20 h-20" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Sua primeira leitura
          </h1>
        </div>

        {/* Insight Personalizado */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <LumAvatar className="w-12 h-12 shrink-0" />
            <div className="flex-1">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {generateInsight()}
              </p>
            </div>
          </div>
        </div>

        {/* Preview do App */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Tabs de Preview */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActivePreview("chat")}
                className={`flex-1 px-4 py-4 text-sm font-medium transition-colors ${
                  activePreview === "chat"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <MessageCircle className="w-5 h-5 mx-auto mb-1" />
                Chat
              </button>
              <button
                onClick={() => setActivePreview("categories")}
                className={`flex-1 px-4 py-4 text-sm font-medium transition-colors ${
                  activePreview === "categories"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Target className="w-5 h-5 mx-auto mb-1" />
                Categorias
              </button>
              <button
                onClick={() => setActivePreview("quiz")}
                className={`flex-1 px-4 py-4 text-sm font-medium transition-colors ${
                  activePreview === "quiz"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Sparkles className="w-5 h-5 mx-auto mb-1" />
                Quizzes
              </button>
            </div>
          </div>

          {/* Conteúdo do Preview */}
          <div className="p-6 md:p-8 relative">
            {/* Overlay de bloqueio */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900 z-10 flex items-end justify-center pb-8">
              <div className="text-center">
                <Lock className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Desbloqueie para acessar
                </p>
              </div>
            </div>

            {/* Preview do Chat */}
            {activePreview === "chat" && (
              <div className="space-y-4 opacity-60">
                <div className="flex gap-3">
                  <LumAvatar className="w-8 h-8 shrink-0" />
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Olá! Como posso te ajudar hoje? 💜
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-4 max-w-[80%]">
                    <p className="text-gray-700 dark:text-gray-300">
                      Estou me sentindo sobrecarregada...
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <LumAvatar className="w-8 h-8 shrink-0" />
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Entendo. Vamos conversar sobre isso com calma...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Preview das Categorias */}
            {activePreview === "categories" && (
              <div className="grid grid-cols-2 gap-4 opacity-60">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-4">
                  <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Trabalho</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Carreira e desafios profissionais</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/10 rounded-xl p-4">
                  <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Relacionamento</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Afetos e conexões</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-xl p-4">
                  <Users className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Família</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dinâmicas familiares</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl p-4">
                  <User className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Pessoal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Autoconhecimento</p>
                </div>
              </div>
            )}

            {/* Preview dos Quizzes */}
            {activePreview === "quiz" && (
              <div className="space-y-4 opacity-60">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Como você lida com conflitos?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Descubra seu estilo de resolução
                      </p>
                    </div>
                    <Sparkles className="w-6 h-6 text-purple-500 shrink-0" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Qual é seu padrão emocional?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Entenda suas reações
                      </p>
                    </div>
                    <Sparkles className="w-6 h-6 text-blue-500 shrink-0" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Como você se relaciona?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Padrões de conexão
                      </p>
                    </div>
                    <Sparkles className="w-6 h-6 text-green-500 shrink-0" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benefícios */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
            O que você ganha com acesso total
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Chat ilimitado 24/7</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Converse sempre que precisar, sem limites</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Quizzes personalizados</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Descubra padrões e ganhe autoconhecimento</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Histórico completo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Acompanhe sua evolução ao longo do tempo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Categorias especializadas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trabalho, relacionamento, família e mais</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <Button
          onClick={handleCheckout}
          className="w-full h-16 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
        >
          Desbloquear acesso completo
          <ChevronRight className="w-6 h-6 ml-2" />
        </Button>

        {/* Nota de segurança */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          🔒 Pagamento seguro • Cancele quando quiser
        </p>
      </div>
    </div>
  );
}
