"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Send, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

// Base de 500+ perguntas profundas e reflexivas (mantida igual)
const deepQuestions = [
  "Qual é a emoção que você sente todos os dias mas nunca admitiu em voz alta — nem para si mesmo?",
  "Se você pudesse voltar no tempo e abraçar a versão de você que mais precisava de acolhimento, em que momento da sua vida seria?",
  // ... (todas as outras perguntas mantidas)
];

interface DailyReflectionProps {
  onBack: () => void;
  onStartChat: (question: string, answer: string) => void;
  userId?: string;
  isDemo?: boolean;
  onDemoAction?: () => void;
}

export function DailyReflection({ onBack, onStartChat, userId, isDemo = false, onDemoAction }: DailyReflectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [lumResponse, setLumResponse] = useState("");
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);

  // Carregar perguntas já usadas
  useEffect(() => {
    if (!isDemo && userId) {
      const saved = localStorage.getItem(`lumia-used-questions-${userId}`);
      if (saved) {
        try {
          setUsedQuestions(JSON.parse(saved));
        } catch (e) {
          setUsedQuestions([]);
        }
      }
    }
  }, [userId, isDemo]);

  // Gerar nova pergunta
  const generateNewQuestion = () => {
    let availableQuestions = deepQuestions.filter(q => !usedQuestions.includes(q));
    
    // Se todas as perguntas foram usadas, resetar
    if (availableQuestions.length === 0) {
      availableQuestions = deepQuestions;
      setUsedQuestions([]);
      if (!isDemo && userId) {
        localStorage.setItem(`lumia-used-questions-${userId}`, JSON.stringify([]));
      }
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const newQuestion = availableQuestions[randomIndex];
    setCurrentQuestion(newQuestion);
    setAnswer("");
    setShowResponse(false);
  };

  // Inicializar com primeira pergunta
  useEffect(() => {
    if (!currentQuestion) {
      generateNewQuestion();
    }
  }, []);

  // Gerar resposta empática da Lum
  const generateLumResponse = (userAnswer: string) => {
    const responses = [
      `Obrigada por compartilhar isso comigo. Percebo a profundidade do que você está sentindo, e quero que saiba que está tudo bem sentir assim. Suas emoções são válidas, e eu estou aqui pra te acompanhar nesse processo.`,
      `Eu vejo você. O que você acabou de compartilhar carrega muito peso, e eu reconheço a coragem que foi preciso pra colocar isso em palavras. Você não está sozinho nisso.`,
      `Que reflexão poderosa. O que você trouxe aqui mostra o quanto você está se permitindo olhar pra dentro, e isso é um ato de coragem. Eu estou aqui pra te apoiar nessa jornada.`,
      `Obrigada por confiar em mim com isso. O que você compartilhou ressoa profundamente, e eu quero que saiba que seus sentimentos importam. Vamos explorar isso juntos?`,
      `Eu sinto a intensidade do que você está vivendo. Suas palavras carregam verdade, e eu estou aqui pra te ouvir sem julgamentos. Você merece esse espaço de acolhimento.`,
      `Que honestidade linda. O que você acabou de expressar mostra o quanto você está se conectando consigo mesmo, e isso é transformador. Eu estou aqui pra caminhar ao seu lado.`,
      `Eu reconheço a vulnerabilidade que foi preciso pra compartilhar isso. Suas palavras têm peso, e eu quero que saiba que você está sendo ouvido de verdade. Vamos conversar mais sobre isso?`,
      `Obrigada por se abrir assim. O que você trouxe aqui é importante, e eu vejo o quanto isso te afeta. Você não precisa carregar isso sozinho - eu estou aqui.`,
      `Que reflexão profunda. Suas palavras mostram o quanto você está se permitindo sentir, e isso é um presente. Eu estou aqui pra te acompanhar nesse processo de descoberta.`,
      `Eu percebo a sinceridade no que você compartilhou. Seus sentimentos são reais e válidos, e eu quero que saiba que você tem um espaço seguro aqui comigo. Vamos explorar isso juntos?`,
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;

    // MODO DEMO: Não salvar, mas permitir responder
    if (!isDemo) {
      // Marcar pergunta como usada
      const newUsedQuestions = [...usedQuestions, currentQuestion];
      setUsedQuestions(newUsedQuestions);
      if (userId) {
        localStorage.setItem(`lumia-used-questions-${userId}`, JSON.stringify(newUsedQuestions));
      }

      // Salvar reflexão
      if (userId) {
        const reflection = {
          question: currentQuestion,
          answer: answer,
          lumResponse: generateLumResponse(answer),
          date: new Date().toISOString(),
        };
        const saved = localStorage.getItem(`lumia-reflections-${userId}`) || "[]";
        const reflections = JSON.parse(saved);
        reflections.unshift(reflection);
        localStorage.setItem(`lumia-reflections-${userId}`, JSON.stringify(reflections));
      }
    }

    // Gerar resposta da Lum
    const response = generateLumResponse(answer);
    setLumResponse(response);
    setShowResponse(true);
  };

  const handleNewQuestion = () => {
    generateNewQuestion();
  };

  const handleStartConversation = () => {
    // MODO DEMO: Interceptar ao tentar conversar
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }

    onStartChat(currentQuestion, answer);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-gray-800 px-4 sm:px-6 py-4 bg-white dark:bg-[#212121]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-100">
              Reflexão do Dia
            </h2>
            <p className="text-xs text-gray-400">
              Um momento para se conectar consigo mesmo
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {!showResponse ? (
            <>
              {/* Pergunta */}
              <Card className="p-6 bg-[#1A1A1A] border-purple-500/30">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-medium text-gray-100 leading-relaxed">
                    {currentQuestion}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNewQuestion}
                    className="shrink-0 hover:bg-purple-500/10"
                    title="Trocar pergunta"
                  >
                    <RefreshCw className="w-5 h-5 text-purple-400" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  Tome seu tempo. Não há respostas certas ou erradas.
                </p>
              </Card>

              {/* Campo de resposta */}
              <div className="space-y-3">
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Escreva livremente o que você está sentindo..."
                  className="min-h-[200px] resize-none border-gray-700 bg-[#1A1A1A] text-gray-100 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-base leading-relaxed"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-30"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar reflexão
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Resposta da Lum */}
              <Card className="p-6 bg-[#1A1A1A] border-purple-500/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-full bg-purple-500/10">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-purple-400 mb-2">
                      Lum
                    </h4>
                    <p className="text-base text-gray-200 leading-relaxed">
                      {lumResponse}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Ações */}
              <div className="space-y-3">
                <Button
                  onClick={handleStartConversation}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Vamos conversar sobre isso
                </Button>
                <Button
                  onClick={handleNewQuestion}
                  variant="outline"
                  className="w-full border-gray-700 bg-[#1A1A1A] hover:bg-[#252525] text-gray-200"
                  size="lg"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Prefiro outra pergunta
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
