"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LumLogo } from "@/components/LumIcons";
import { ChevronRight, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: "text" | "question" | "input" | "processing";
  content: string;
  options?: { value: string; label: string }[];
  inputType?: "text" | "name";
}

interface OnboardingQuizProps {
  onComplete: (responses: Record<string, string>) => void;
}

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Fluxo de mensagens do onboarding
  const conversationFlow: Message[] = [
    {
      id: "welcome",
      type: "text",
      content: "Olá! Eu sou a Lum 👋",
    },
    {
      id: "intro",
      type: "text",
      content: "Vou te fazer algumas perguntas rápidas para personalizar sua experiência.",
    },
    {
      id: "name_question",
      type: "input",
      content: "Como posso te chamar?",
      inputType: "name",
    },
    {
      id: "greeting",
      type: "text",
      content: "", // Será preenchido dinamicamente com o nome
    },
    {
      id: "pronoun_question",
      type: "question",
      content: "Como devo me dirigir a você?",
      options: [
        { value: "feminino", label: "No feminino (você é única)" },
        { value: "masculino", label: "No masculino (você é único)" },
        { value: "neutro", label: "De forma neutra" },
      ],
    },
    {
      id: "personalizing",
      type: "text",
      content: "Agora estamos personalizando o ambiente para você.",
    },
    {
      id: "adapting",
      type: "text",
      content: "Vou adaptar a Lum ao seu jeito de pensar e ao momento que você está vivendo.",
    },
    {
      id: "time_info",
      type: "text",
      content: "Isso leva menos de 1 minuto e muda totalmente sua experiência.",
    },
    {
      id: "main_feeling",
      type: "question",
      content: "O que mais pesa hoje?",
      options: [
        { value: "ansiedade", label: "Ansiedade" },
        { value: "overthinking", label: "Overthinking" },
        { value: "cansaco", label: "Cansaço" },
        { value: "inseguranca", label: "Insegurança" },
        { value: "desanimo", label: "Desânimo" },
        { value: "raiva", label: "Raiva" },
      ],
    },
    {
      id: "response_style",
      type: "question",
      content: "Você prefere respostas mais diretas ou mais reflexivas?",
      options: [
        { value: "diretas", label: "Diretas e práticas" },
        { value: "reflexivas", label: "Reflexivas e profundas" },
        { value: "equilibradas", label: "Um equilíbrio entre as duas" },
      ],
    },
    {
      id: "need_now",
      type: "question",
      content: "O que você precisa agora?",
      options: [
        { value: "clareza", label: "Clareza mental" },
        { value: "acolhimento", label: "Acolhimento" },
        { value: "plano", label: "Um plano prático" },
      ],
    },
    {
      id: "processing_1",
      type: "processing",
      content: "Criando um espaço seguro...",
    },
    {
      id: "processing_2",
      type: "processing",
      content: "Organizando seus primeiros insights...",
    },
    {
      id: "processing_3",
      type: "processing",
      content: "Preparando sua primeira leitura...",
    },
    {
      id: "final_reading",
      type: "text",
      content: "", // Será preenchido dinamicamente com base nas respostas
    },
  ];

  // Iniciar o fluxo
  useEffect(() => {
    if (messages.length === 0) {
      showNextMessage();
    }
  }, []);

  // Mostrar próxima mensagem com efeito de digitação
  const showNextMessage = () => {
    if (currentMessageIndex >= conversationFlow.length) {
      // Finalizar onboarding
      generateFinalReading();
      return;
    }

    setIsTyping(true);
    
    // Simular delay de digitação
    setTimeout(() => {
      const nextMessage = conversationFlow[currentMessageIndex];
      
      // Personalizar mensagem de saudação
      if (nextMessage.id === "greeting" && responses.name) {
        nextMessage.content = `Prazer em te conhecer, ${responses.name}! ✨`;
      }

      setMessages((prev) => [...prev, nextMessage]);
      setIsTyping(false);
      
      // Se for input ou question, mostrar interface de resposta
      if (nextMessage.type === "input") {
        setShowInput(true);
      } else if (nextMessage.type === "question") {
        setShowInput(true);
      } else if (nextMessage.type === "processing") {
        // Auto-avançar mensagens de processamento
        setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
          showNextMessage();
        }, 1500);
      } else {
        // Auto-avançar mensagens de texto
        setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
          showNextMessage();
        }, 1200);
      }
    }, 800);
  };

  // Lidar com resposta de input
  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;

    const currentMessage = conversationFlow[currentMessageIndex];
    
    if (currentMessage.inputType === "name") {
      setResponses((prev) => ({ ...prev, name: inputValue }));
    }

    setInputValue("");
    setShowInput(false);
    setCurrentMessageIndex((prev) => prev + 1);
    showNextMessage();
  };

  // Lidar com resposta de opção
  const handleOptionSelect = (value: string) => {
    const currentMessage = conversationFlow[currentMessageIndex];
    setResponses((prev) => ({ ...prev, [currentMessage.id]: value }));
    setSelectedOption("");
    setShowInput(false);
    setCurrentMessageIndex((prev) => prev + 1);
    
    setTimeout(() => {
      showNextMessage();
    }, 300);
  };

  // Gerar leitura final personalizada
  const generateFinalReading = () => {
    const { main_feeling, response_style, need_now, pronoun_question } = responses;
    
    let reading = "";
    const userName = responses.name || "você";
    
    // Construir leitura baseada nas respostas
    if (main_feeling === "ansiedade") {
      reading = `Pelo que você respondeu, ${userName}, parece que a ansiedade tem ocupado muito espaço na sua mente. `;
    } else if (main_feeling === "overthinking") {
      reading = `Pelo que você respondeu, ${userName}, parece que você tem pensado demais sobre as coisas. `;
    } else if (main_feeling === "cansaco") {
      reading = `Pelo que você respondeu, ${userName}, parece que você está carregando um peso emocional grande. `;
    } else if (main_feeling === "inseguranca") {
      reading = `Pelo que você respondeu, ${userName}, parece que a insegurança tem te impedido de avançar. `;
    } else if (main_feeling === "desanimo") {
      reading = `Pelo que você respondeu, ${userName}, parece que você está sem energia para seguir. `;
    } else {
      reading = `Pelo que você respondeu, ${userName}, parece que a raiva tem sido uma companheira constante. `;
    }

    if (need_now === "clareza") {
      reading += "O padrão que aparece aqui é a necessidade de organizar os pensamentos e ter mais clareza mental. ";
    } else if (need_now === "acolhimento") {
      reading += "O padrão que aparece aqui é a necessidade de se sentir compreendido e acolhido. ";
    } else {
      reading += "O padrão que aparece aqui é a necessidade de ter um plano concreto para seguir. ";
    }

    reading += "Se você quiser, a gente pode começar por entender melhor o que está acontecendo e encontrar caminhos juntos.";

    // Adicionar mensagem final
    const finalMessage: Message = {
      id: "final_reading",
      type: "text",
      content: reading,
    };

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, finalMessage]);
      setIsTyping(false);
      
      // Aguardar 3 segundos e finalizar
      setTimeout(() => {
        onComplete(responses);
      }, 3000);
    }, 1000);
  };

  // Scroll automático para última mensagem
  useEffect(() => {
    const container = document.getElementById("messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  const currentMessage = conversationFlow[currentMessageIndex];
  const isQuestion = currentMessage?.type === "question";
  const isInput = currentMessage?.type === "input";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header com logo */}
      <div className="flex justify-center pt-6 pb-4">
        <LumLogo className="w-12 h-12" />
      </div>

      {/* Container de mensagens */}
      <div
        id="messages-container"
        className="flex-1 overflow-y-auto px-4 pb-32 pt-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={`${message.id}-${index}`}
            className="animate-[slideUp_0.5s_ease-out] opacity-0"
            style={{
              animation: "slideUp 0.5s ease-out forwards",
              animationDelay: "0.1s",
            }}
          >
            {message.type === "processing" ? (
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{message.content}</span>
              </div>
            ) : (
              <div className="bg-[#1a1a1a] rounded-2xl p-4 md:p-5 max-w-2xl">
                <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                  {message.content}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Indicador de digitação */}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input/Opções fixas na parte inferior */}
      {showInput && !isTyping && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent p-4 md:p-6">
          <div className="max-w-2xl mx-auto">
            {isInput && (
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
                  placeholder="Digite aqui..."
                  className="flex-1 h-12 md:h-14 bg-[#1a1a1a] border-gray-700 text-gray-100 text-base md:text-lg"
                  autoFocus
                />
                <Button
                  onClick={handleInputSubmit}
                  disabled={!inputValue.trim()}
                  className="h-12 md:h-14 px-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {isQuestion && currentMessage.options && (
              <div className="space-y-2">
                {currentMessage.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className="w-full text-left p-4 rounded-xl bg-[#1a1a1a] border border-gray-700 hover:border-purple-500 hover:bg-[#212121] transition-all text-gray-100 text-base md:text-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
