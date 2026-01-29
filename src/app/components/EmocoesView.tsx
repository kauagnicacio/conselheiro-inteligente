"use client";

import { useState, useEffect } from "react";
import { 
  Circle, 
  Flame, 
  Droplets, 
  AlertTriangle, 
  Frown as FrownIcon, 
  EyeOff,
  HelpCircle as HelpCircleIcon,
  Check,
  ChevronLeft,
  Sparkles,
  Heart,
  Brain,
  Wind,
  Lightbulb,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Emotion {
  id: string;
  name: string;
  icon: any;
  color: string;
  gradient: string;
  journey: {
    recognize: {
      question: string;
      placeholder: string;
    };
    understand: {
      message: string;
      question: string;
      placeholder: string;
    };
    express: {
      question: string;
      placeholder: string;
    };
    welcome: {
      message: string;
    };
    transform: {
      type: "breathing" | "perspective" | "anchor" | "action";
      title: string;
      instruction: string;
      question: string;
      placeholder: string;
    };
  };
}

const emotions: Emotion[] = [
  {
    id: "ansiedade",
    name: "Ansiedade",
    icon: Circle,
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    journey: {
      recognize: {
        question: "Em que momento do seu dia essa ansiedade costuma aparecer?",
        placeholder: "Descreva quando você percebe a ansiedade chegando..."
      },
      understand: {
        message: "A ansiedade não é sua inimiga. Ela aparece quando algo importante está em jogo, tentando te preparar para o que vem pela frente.",
        question: "O que essa ansiedade está tentando te proteger ou te mostrar?",
        placeholder: "Reflita sobre o que ela quer te dizer..."
      },
      express: {
        question: "Se essa ansiedade pudesse falar, o que ela diria agora?",
        placeholder: "Dê voz à sua ansiedade..."
      },
      welcome: {
        message: "Eu vejo você. Eu vejo essa ansiedade que aperta o peito, que acelera os pensamentos. E eu quero que você saiba: você não está sozinha nisso. O que você está sentindo é real, é válido, e merece ser acolhido com gentileza."
      },
      transform: {
        type: "breathing",
        title: "Respiração 4-7-8",
        instruction: "Inspire contando até 4, segure por 7, expire lentamente por 8. Repita 3 vezes.",
        question: "Como você se sente agora, depois de respirar?",
        placeholder: "Descreva o que mudou..."
      }
    }
  },
  {
    id: "raiva",
    name: "Raiva",
    icon: Flame,
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-orange-500",
    journey: {
      recognize: {
        question: "Em que momento do seu dia essa raiva costuma aparecer?",
        placeholder: "Descreva quando você percebe a raiva surgindo..."
      },
      understand: {
        message: "A raiva é uma mensageira poderosa. Ela aparece quando seus limites foram ultrapassados, quando algo importante para você foi desrespeitado.",
        question: "O que essa raiva está tentando te proteger ou te mostrar?",
        placeholder: "Reflita sobre o que ela quer te dizer..."
      },
      express: {
        question: "Se essa raiva pudesse falar, o que ela diria agora?",
        placeholder: "Dê voz à sua raiva..."
      },
      welcome: {
        message: "Eu vejo você. Eu vejo essa raiva que queima, que pede espaço. E eu quero que você saiba: sentir raiva não te faz uma pessoa ruim. Ela está te mostrando onde você precisa colocar limites, onde você precisa se defender."
      },
      transform: {
        type: "action",
        title: "Ação Consciente",
        instruction: "A raiva pede movimento. Ela precisa ser transformada em ação consciente.",
        question: "Que limite você precisa colocar? Que conversa você precisa ter?",
        placeholder: "Escreva uma ação pequena e concreta..."
      }
    }
  },
  {
    id: "tristeza",
    name: "Tristeza",
    icon: Droplets,
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
    journey: {
      recognize: {
        question: "Em que momento do seu dia essa tristeza costuma aparecer?",
        placeholder: "Descreva quando você percebe a tristeza chegando..."
      },
      understand: {
        message: "A tristeza é uma emoção de profundidade. Ela aparece quando algo que você valorizava se foi ou mudou, te dando espaço para processar e se reorganizar.",
        question: "O que essa tristeza está tentando te mostrar sobre o que é importante para você?",
        placeholder: "Reflita sobre o que ela quer te dizer..."
      },
      express: {
        question: "Se essa tristeza pudesse falar, o que ela diria agora?",
        placeholder: "Dê voz à sua tristeza..."
      },
      welcome: {
        message: "Eu vejo você. Eu vejo essa tristeza que pesa, que embaça os olhos. E eu quero que você saiba: chorar não é fraqueza. Sentir tristeza não é falha. É humano, é real, e você tem todo o direito de sentir."
      },
      transform: {
        type: "anchor",
        title: "Frase de Ancoragem",
        instruction: "Quando a tristeza apertar, você pode voltar a esta frase para se lembrar de quem você é.",
        question: "Complete: 'Mesmo triste, eu ainda sou...'",
        placeholder: "Ex: forte, capaz, amada, suficiente..."
      }
    }
  },
  {
    id: "medo",
    name: "Medo",
    icon: AlertTriangle,
    color: "text-yellow-600 dark:text-yellow-400",
    gradient: "from-yellow-500 to-amber-500",
    journey: {
      recognize: {
        question: "Em que momento do seu dia esse medo costuma aparecer?",
        placeholder: "Descreva quando você percebe o medo surgindo..."
      },
      understand: {
        message: "O medo é um guardião antigo. Ele aparece quando você percebe algo que pode te machucar, tentando te manter segura.",
        question: "O que esse medo está tentando te proteger ou te avisar?",
        placeholder: "Reflita sobre o que ele quer te dizer..."
      },
      express: {
        question: "Se esse medo pudesse falar, o que ele diria agora?",
        placeholder: "Dê voz ao seu medo..."
      },
      welcome: {
        message: "Eu vejo você. Eu vejo esse medo que paralisa, que faz você querer se esconder. E eu quero que você saiba: ter medo não te faz covarde. Ter medo e ainda assim continuar, isso sim é coragem."
      },
      transform: {
        type: "perspective",
        title: "Mudança de Perspectiva",
        instruction: "O medo muitas vezes aumenta o perigo na nossa mente. Vamos olhar de outro ângulo.",
        question: "Se sua melhor amiga estivesse sentindo esse medo, o que você diria a ela?",
        placeholder: "Escreva com a compaixão que você teria por alguém que ama..."
      }
    }
  },
  {
    id: "culpa",
    name: "Culpa",
    icon: FrownIcon,
    color: "text-gray-600 dark:text-gray-400",
    gradient: "from-gray-500 to-slate-500",
    journey: {
      recognize: {
        question: "Em que momento do seu dia essa culpa costuma aparecer?",
        placeholder: "Descreva quando você percebe a culpa pesando..."
      },
      understand: {
        message: "A culpa aparece quando você acha que fez algo que vai contra seus valores. Ela está te mostrando quem você quer ser.",
        question: "O que essa culpa está tentando te mostrar sobre seus valores?",
        placeholder: "Reflita sobre o que ela quer te dizer..."
      },
      express: {
        question: "Se essa culpa pudesse falar, o que ela diria agora?",
        placeholder: "Dê voz à sua culpa..."
      },
      welcome: {
        message: "Eu vejo você. Eu vejo essa culpa que pesa nos ombros, que não te deixa em paz. E eu quero que você saiba: sentir culpa mostra que você se importa, que você quer ser melhor. Mas você não precisa carregar esse peso sozinha."
      },
      transform: {
        type: "action",
        title: "Reparação Consciente",
        instruction: "A culpa pede reparação. Não punição, mas ação consciente para alinhar quem você é com quem você quer ser.",
        question: "Que pequena ação você pode fazer hoje para se alinhar com seus valores?",
        placeholder: "Escreva algo pequeno e possível..."
      }
    }
  },
  {
    id: "vergonha",
    name: "Vergonha",
    icon: EyeOff,
    color: "text-pink-600 dark:text-pink-400",
    gradient: "from-pink-500 to-rose-500",
    journey: {
      recognize: {
        question: "Em que momento do seu dia essa vergonha costuma aparecer?",
        placeholder: "Descreva quando você percebe a vergonha apertando..."
      },
      understand: {
        message: "A vergonha aparece quando você acha que há algo fundamentalmente errado com você. Mas ela está mentindo. Você não é seus erros.",
        question: "O que essa vergonha está tentando te proteger de sentir?",
        placeholder: "Reflita sobre o que ela quer te dizer..."
      },
      express: {
        question: "Se essa vergonha pudesse falar, o que ela diria agora?",
        placeholder: "Dê voz à sua vergonha..."
      },
      welcome: {
        message: "Eu vejo você. Eu vejo essa vergonha que faz você querer desaparecer, que sussurra que você não é suficiente. E eu quero que você saiba: você é humana. Você é imperfeita. E você é digna de amor exatamente como está."
      },
      transform: {
        type: "anchor",
        title: "Autocompaixão",
        instruction: "A vergonha se dissolve na luz da autocompaixão. Vamos praticar juntas.",
        question: "Complete: 'Eu me perdoo por...' e 'Eu me aceito porque...'",
        placeholder: "Escreva com gentileza para si mesma..."
      }
    }
  },
  {
    id: "confusao",
    name: "Confusão",
    icon: HelpCircleIcon,
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-fuchsia-500",
    journey: {
      recognize: {
        question: "Em que momento do seu dia essa confusão costuma aparecer?",
        placeholder: "Descreva quando você percebe a confusão tomando conta..."
      },
      understand: {
        message: "A confusão aparece quando você está processando muita coisa ao mesmo tempo. Ela está te pedindo para desacelerar.",
        question: "O que essa confusão está tentando te mostrar sobre o que você precisa?",
        placeholder: "Reflita sobre o que ela quer te dizer..."
      },
      express: {
        question: "Se essa confusão pudesse falar, o que ela diria agora?",
        placeholder: "Dê voz à sua confusão..."
      },
      welcome: {
        message: "Eu vejo você. Eu vejo essa confusão que embaralha os pensamentos, que te faz sentir perdida. E eu quero que você saiba: não saber tudo agora não significa que você está falhando. Significa que você está processando."
      },
      transform: {
        type: "action",
        title: "Próximo Passo Pequeno",
        instruction: "A confusão se dissolve quando você foca em um passo de cada vez, não no caminho todo.",
        question: "Qual é o menor próximo passo que você pode dar agora?",
        placeholder: "Algo bem pequeno e concreto..."
      }
    }
  }
];

type FlowStep = "intro" | "selection" | "free-write" | "ai-suggestion" | "journey";
type JourneyStep = "recognize" | "understand" | "express" | "welcome" | "transform";

interface EmocoesViewProps {
  userId: string;
  onBack: () => void;
  onNavigateToChat?: (initialMessage: string) => void;
  isDemo?: boolean;
  onDemoAction?: () => void;
}

export function EmocoesView({ userId, onBack, onNavigateToChat, isDemo = false, onDemoAction }: EmocoesViewProps) {
  const [flowStep, setFlowStep] = useState<FlowStep>("intro");
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [journeyStep, setJourneyStep] = useState<JourneyStep>("recognize");
  const [freeWriteText, setFreeWriteText] = useState("");
  const [suggestedEmotion, setSuggestedEmotion] = useState<Emotion | null>(null);
  const [journeyAnswers, setJourneyAnswers] = useState({
    recognize: "",
    understand: "",
    express: "",
    transform: ""
  });

  // Simular análise de IA do texto livre
  const analyzeEmotionFromText = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Palavras-chave para cada emoção
    const keywords = {
      ansiedade: ["ansiedade", "ansiosa", "preocupada", "nervosa", "inquieta", "agitada", "tensa"],
      raiva: ["raiva", "irritada", "brava", "furiosa", "revoltada", "indignada", "injustiça"],
      tristeza: ["triste", "tristeza", "melancolia", "vazio", "sozinha", "perdida", "chorar"],
      medo: ["medo", "assustada", "ameaçada", "insegura", "vulnerável", "perigo"],
      culpa: ["culpa", "culpada", "arrependida", "errei", "deveria", "não deveria"],
      vergonha: ["vergonha", "envergonhada", "humilhada", "inadequada", "não sou suficiente"],
      confusao: ["confusa", "perdida", "não sei", "dúvida", "incerta", "desorientada"]
    };

    // Contar matches para cada emoção
    let maxMatches = 0;
    let detectedEmotion = emotions[0]; // default: ansiedade

    emotions.forEach(emotion => {
      const emotionKeywords = keywords[emotion.id as keyof typeof keywords] || [];
      const matches = emotionKeywords.filter(keyword => lowerText.includes(keyword)).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedEmotion = emotion;
      }
    });

    return detectedEmotion;
  };

  const handleFreeWriteSubmit = () => {
    if (freeWriteText.trim().length < 10) return;
    
    // No modo demo, bloquear ao clicar em Continuar depois da escrita livre
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }
    
    const detected = analyzeEmotionFromText(freeWriteText);
    setSuggestedEmotion(detected);
    setFlowStep("ai-suggestion");
  };

  const handleConfirmSuggestion = () => {
    if (suggestedEmotion) {
      setSelectedEmotion(suggestedEmotion);
      setFlowStep("journey");
      setJourneyStep("recognize");
    }
  };

  const handleRejectSuggestion = () => {
    setFreeWriteText("");
    setSuggestedEmotion(null);
    setFlowStep("free-write");
  };

  const handleSelectEmotion = (emotion: Emotion) => {
    // No modo demo, bloquear ao clicar em qualquer uma das 7 emoções
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }
    
    setSelectedEmotion(emotion);
    setFlowStep("journey");
    setJourneyStep("recognize");
  };

  const handleJourneyNext = () => {
    const steps: JourneyStep[] = ["recognize", "understand", "express", "welcome", "transform"];
    const currentIndex = steps.indexOf(journeyStep);
    
    if (currentIndex < steps.length - 1) {
      setJourneyStep(steps[currentIndex + 1]);
    }
  };

  const handleJourneyBack = () => {
    const steps: JourneyStep[] = ["recognize", "understand", "express", "welcome", "transform"];
    const currentIndex = steps.indexOf(journeyStep);
    
    if (currentIndex > 0) {
      setJourneyStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = () => {
    if (!selectedEmotion) return;

    // Salvar no histórico
    const historyKey = `emotion-journey-${selectedEmotion.id}-${userId}`;
    const existingHistory = localStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];

    const newEntry = {
      date: new Date().toISOString(),
      emotion: selectedEmotion.name,
      answers: journeyAnswers
    };

    history.push(newEntry);
    localStorage.setItem(historyKey, JSON.stringify(history));

    // Reset
    setFlowStep("intro");
    setSelectedEmotion(null);
    setJourneyStep("recognize");
    setJourneyAnswers({
      recognize: "",
      understand: "",
      express: "",
      transform: ""
    });
    setFreeWriteText("");
    setSuggestedEmotion(null);
  };

  const handleContinueToChat = () => {
    if (!selectedEmotion) return;

    // Mensagens variadas para continuidade emocional
    const messages = [
      `Agora que você passou por esse exercício de ${selectedEmotion.name}, talvez ainda exista algo aí dentro que queira ser dito. Quer me contar como você se sentiu durante esse processo?`,
      `Você acabou de cuidar de uma emoção importante: ${selectedEmotion.name}. Estou aqui pra te ouvir, se quiser continuar falando sobre isso.`,
      `Às vezes, depois de lidar com ${selectedEmotion.name}, a gente sente vontade de aprofundar. O que ficou aí dentro agora?`
    ];

    // Escolher mensagem aleatória
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Navegar para o chat com mensagem inicial
    if (onNavigateToChat) {
      onNavigateToChat(randomMessage);
    }
  };

  const canProceed = () => {
    if (journeyStep === "recognize") return journeyAnswers.recognize.trim().length > 0;
    if (journeyStep === "understand") return journeyAnswers.understand.trim().length > 0;
    if (journeyStep === "express") return journeyAnswers.express.trim().length > 0;
    if (journeyStep === "welcome") return true; // Apenas leitura
    if (journeyStep === "transform") return journeyAnswers.transform.trim().length > 0;
    return false;
  };

  // TELA 1: Introdução
  if (flowStep === "intro") {
    return (
      <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-950 via-purple-900 to-[#1a1a1a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-full flex flex-col justify-center">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Ícone central */}
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>

            {/* Título */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-4">
                As 7 Emoções
              </h1>
              <p className="text-base sm:text-lg text-purple-200 leading-relaxed max-w-xl mx-auto px-4">
                Cada emoção carrega uma mensagem. Aqui você não vai apenas responder perguntas, você vai aprender a reconhecer, entender e atravessar o que está sentindo.
              </p>
            </div>

            {/* Pergunta principal */}
            <div className="pt-6 sm:pt-8 px-4">
              <p className="text-lg sm:text-xl text-white font-medium mb-6 sm:mb-8">
                Qual emoção você está sentindo agora?
              </p>

              {/* Botões de ação */}
              <div className="space-y-3 sm:space-y-4">
                <Button
                  onClick={() => setFlowStep("selection")}
                  className="w-full max-w-md mx-auto bg-white text-purple-900 hover:bg-purple-50 text-base sm:text-lg py-5 sm:py-6 rounded-xl shadow-lg"
                >
                  Escolher uma das 7 emoções
                </Button>

                <Button
                  onClick={() => setFlowStep("free-write")}
                  variant="outline"
                  className="w-full max-w-md mx-auto border-2 border-purple-300 text-white hover:bg-purple-800/50 text-base sm:text-lg py-5 sm:py-6 rounded-xl"
                >
                  Não sei, quero escrever livremente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TELA 2: Seleção de emoção
  if (flowStep === "selection") {
    return (
      <div className="h-full overflow-y-auto bg-[#1a1a1a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Botão voltar */}
          <Button
            onClick={() => setFlowStep("intro")}
            variant="ghost"
            className="text-gray-400 hover:text-white -ml-2"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Voltar
          </Button>

          {/* Grid de emoções */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {emotions.map((emotion) => {
              const Icon = emotion.icon;

              return (
                <button
                  key={emotion.id}
                  onClick={() => handleSelectEmotion(emotion)}
                  className="bg-[#212121] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all text-left group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${emotion.gradient} flex-shrink-0`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        {emotion.name}
                      </h3>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // TELA 3: Escrita livre
  if (flowStep === "free-write") {
    return (
      <div className="h-full overflow-y-auto bg-[#1a1a1a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Botão voltar */}
          <Button
            onClick={() => setFlowStep("intro")}
            variant="ghost"
            className="text-gray-400 hover:text-white -ml-2"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Voltar
          </Button>

          {/* Card de escrita */}
          <div className="bg-[#212121] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700 space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Descreva o que você está sentindo
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Não precisa ser perfeito. Apenas escreva o que vem à mente. A Lum vai te ajudar a entender.
              </p>
            </div>

            <textarea
              value={freeWriteText}
              onChange={(e) => setFreeWriteText(e.target.value)}
              placeholder="Estou me sentindo..."
              className="w-full min-h-[180px] sm:min-h-[200px] p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base"
              autoFocus
            />

            <Button
              onClick={handleFreeWriteSubmit}
              disabled={freeWriteText.trim().length < 10}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed py-5 sm:py-6 text-base sm:text-lg"
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // TELA 4: Sugestão da IA
  if (flowStep === "ai-suggestion" && suggestedEmotion) {
    const Icon = suggestedEmotion.icon;

    return (
      <div className="h-full overflow-y-auto bg-[#1a1a1a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-full flex flex-col justify-center">
          <div className="bg-[#212121] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700 space-y-6 sm:space-y-8">
            {/* Ícone da emoção detectada */}
            <div className="flex justify-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${suggestedEmotion.gradient}`}>
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>

            {/* Mensagem da Lum */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center gap-2 text-purple-400">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Lum analisou</span>
              </div>
              
              <p className="text-lg sm:text-xl text-white leading-relaxed px-2">
                Pelo que você descreveu, isso se parece mais com{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {suggestedEmotion.name}
                </span>
              </p>
            </div>

            {/* Botões de confirmação */}
            <div className="space-y-3 pt-2 sm:pt-4">
              <Button
                onClick={handleConfirmSuggestion}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-5 sm:py-6 text-base sm:text-lg"
              >
                Sim, é isso que estou sentindo
              </Button>

              <Button
                onClick={handleRejectSuggestion}
                variant="outline"
                className="w-full border-2 border-gray-700 text-gray-300 hover:bg-gray-800 py-5 sm:py-6 text-base sm:text-lg"
              >
                Não sinto isso, quero escrever novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TELA 5: Jornada emocional (5 etapas)
  if (flowStep === "journey" && selectedEmotion) {
    const Icon = selectedEmotion.icon;
    const journey = selectedEmotion.journey;
    const steps: JourneyStep[] = ["recognize", "understand", "express", "welcome", "transform"];
    const currentStepIndex = steps.indexOf(journeyStep);
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    // Ícones para cada etapa
    const stepIcons = {
      recognize: Brain,
      understand: Lightbulb,
      express: Heart,
      welcome: Sparkles,
      transform: Wind
    };

    const StepIcon = stepIcons[journeyStep];

    return (
      <div className="h-full overflow-y-auto bg-[#1a1a1a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Header com progresso */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <Button
                onClick={() => {
                  if (journeyStep === "recognize") {
                    setFlowStep("intro");
                    setSelectedEmotion(null);
                  } else {
                    handleJourneyBack();
                  }
                }}
                variant="ghost"
                className="text-gray-400 hover:text-white -ml-2 h-9 w-9 p-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${selectedEmotion.gradient}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Etapa {currentStepIndex + 1} de {steps.length}
                  </p>
                  <p className="text-sm sm:text-base text-white font-semibold">
                    {selectedEmotion.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${selectedEmotion.gradient} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Conteúdo da etapa */}
          <div className="bg-[#212121] rounded-xl sm:rounded-2xl border border-gray-700 overflow-hidden">
            {/* ETAPA 1: Reconhecer */}
            {journeyStep === "recognize" && (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      Reconhecer
                    </h3>
                    <p className="text-sm text-gray-400">
                      O primeiro passo é identificar quando e como essa emoção aparece na sua vida.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base text-white font-medium">
                    {journey.recognize.question}
                  </label>
                  <textarea
                    value={journeyAnswers.recognize}
                    onChange={(e) => setJourneyAnswers({ ...journeyAnswers, recognize: e.target.value })}
                    placeholder={journey.recognize.placeholder}
                    className="w-full min-h-[140px] sm:min-h-[150px] p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base"
                    autoFocus
                  />
                </div>

                <Button
                  onClick={handleJourneyNext}
                  disabled={!canProceed()}
                  className={`w-full bg-gradient-to-r ${selectedEmotion.gradient} hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed py-5 sm:py-6 text-base sm:text-lg`}
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* ETAPA 2: Entender */}
            {journeyStep === "understand" && (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      Entender
                    </h3>
                    <p className="text-sm text-gray-400">
                      Toda emoção tem uma mensagem. Vamos descobrir o que ela quer te dizer.
                    </p>
                  </div>
                </div>

                {/* Mensagem de compreensão */}
                <div className="p-3 sm:p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg sm:rounded-xl">
                  <p className="text-sm sm:text-base text-purple-200 leading-relaxed">
                    {journey.understand.message}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base text-white font-medium">
                    {journey.understand.question}
                  </label>
                  <textarea
                    value={journeyAnswers.understand}
                    onChange={(e) => setJourneyAnswers({ ...journeyAnswers, understand: e.target.value })}
                    placeholder={journey.understand.placeholder}
                    className="w-full min-h-[140px] sm:min-h-[150px] p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base"
                    autoFocus
                  />
                </div>

                <Button
                  onClick={handleJourneyNext}
                  disabled={!canProceed()}
                  className={`w-full bg-gradient-to-r ${selectedEmotion.gradient} hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed py-5 sm:py-6 text-base sm:text-lg`}
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* ETAPA 3: Expressar */}
            {journeyStep === "express" && (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      Expressar
                    </h3>
                    <p className="text-sm text-gray-400">
                      Dê voz ao que você está sentindo. Deixe a emoção falar.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base text-white font-medium">
                    {journey.express.question}
                  </label>
                  <textarea
                    value={journeyAnswers.express}
                    onChange={(e) => setJourneyAnswers({ ...journeyAnswers, express: e.target.value })}
                    placeholder={journey.express.placeholder}
                    className="w-full min-h-[140px] sm:min-h-[150px] p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base"
                    autoFocus
                  />
                </div>

                <Button
                  onClick={handleJourneyNext}
                  disabled={!canProceed()}
                  className={`w-full bg-gradient-to-r ${selectedEmotion.gradient} hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed py-5 sm:py-6 text-base sm:text-lg`}
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* ETAPA 4: Acolher */}
            {journeyStep === "welcome" && (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      Acolher
                    </h3>
                    <p className="text-sm text-gray-400">
                      Você não está sozinha. A Lum está aqui com você.
                    </p>
                  </div>
                </div>

                {/* Mensagem de acolhimento */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg sm:rounded-xl">
                  <p className="text-base sm:text-lg text-white leading-relaxed">
                    {journey.welcome.message}
                  </p>
                </div>

                <Button
                  onClick={handleJourneyNext}
                  className={`w-full bg-gradient-to-r ${selectedEmotion.gradient} hover:opacity-90 text-white py-5 sm:py-6 text-base sm:text-lg`}
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* ETAPA 5: Transformar */}
            {journeyStep === "transform" && (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      Transformar
                    </h3>
                    <p className="text-sm text-gray-400">
                      Agora vamos transformar essa emoção em ação consciente.
                    </p>
                  </div>
                </div>

                {/* Exercício */}
                <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg sm:rounded-xl space-y-2 sm:space-y-3">
                  <h4 className="text-sm sm:text-base text-green-400 font-semibold">
                    {journey.transform.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-green-200">
                    {journey.transform.instruction}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base text-white font-medium">
                    {journey.transform.question}
                  </label>
                  <textarea
                    value={journeyAnswers.transform}
                    onChange={(e) => setJourneyAnswers({ ...journeyAnswers, transform: e.target.value })}
                    placeholder={journey.transform.placeholder}
                    className="w-full min-h-[140px] sm:min-h-[150px] p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base"
                    autoFocus
                  />
                </div>

                {/* Dois botões na última etapa */}
                <div className="space-y-3">
                  <Button
                    onClick={handleComplete}
                    disabled={!canProceed()}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed py-5 sm:py-6 text-base sm:text-lg"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Concluir Jornada
                  </Button>

                  <Button
                    onClick={handleContinueToChat}
                    disabled={!canProceed()}
                    variant="outline"
                    className="w-full border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed py-5 sm:py-6 text-base sm:text-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Vamos conversar sobre isso
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Card informativo */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-purple-200 text-center">
              Tudo que você escrever aqui fica salvo no seu histórico emocional. Você pode voltar depois para ver sua evolução.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
