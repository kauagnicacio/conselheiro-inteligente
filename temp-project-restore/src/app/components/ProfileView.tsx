"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Edit2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

interface ProfileViewProps {
  onBack: () => void;
  userId: string;
  userEmail: string;
}

interface CharacteristicData {
  summary: string;
  positives: string[];
  challenges: string[];
}

interface ProfileData {
  displayName: string;
  avatar: string | null;
  characteristics: {
    humor: CharacteristicData | null;
    temperament: CharacteristicData | null;
    emotions: CharacteristicData | null;
    decisions: CharacteristicData | null;
  };
}

const CHARACTERISTIC_LABELS = {
  humor: "Humor",
  temperament: "Temperamento",
  emotions: "Forma de lidar com emoções",
  decisions: "Tomada de decisão",
};

export function ProfileView({ onBack, userId, userEmail }: ProfileViewProps) {
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    displayName: "",
    avatar: null,
    characteristics: {
      humor: null,
      temperament: null,
      emotions: null,
      decisions: null,
    },
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [activeQuiz, setActiveQuiz] = useState<keyof typeof CHARACTERISTIC_LABELS | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Carregar perfil do localStorage
    const storageKey = `lumia-profile-${userId}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setTempName(parsed.displayName || "");
      } catch (e) {
        console.error("Erro ao carregar perfil:", e);
        // Inicializar com nome do email
        const emailName = userEmail.split("@")[0];
        setProfile({ ...profile, displayName: emailName });
        setTempName(emailName);
      }
    } else {
      // Primeira vez - usar nome do email
      const emailName = userEmail.split("@")[0];
      setProfile({ ...profile, displayName: emailName });
      setTempName(emailName);
    }
  }, [userId, userEmail]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const updatedProfile = { ...profile, avatar: result };
        setProfile(updatedProfile);
        
        // Salvar no localStorage
        const storageKey = `lumia-profile-${userId}`;
        localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
        
        // Também salvar no avatar global
        localStorage.setItem("lumia-user-avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    const updatedProfile = { ...profile, displayName: tempName.trim() };
    setProfile(updatedProfile);
    
    // Salvar no localStorage
    const storageKey = `lumia-profile-${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
    
    setIsEditingName(false);
  };

  const handleStartQuiz = (characteristic: keyof typeof CHARACTERISTIC_LABELS) => {
    setActiveQuiz(characteristic);
  };

  const handleCompleteQuiz = (characteristic: keyof typeof CHARACTERISTIC_LABELS, data: CharacteristicData) => {
    const updatedProfile = {
      ...profile,
      characteristics: {
        ...profile.characteristics,
        [characteristic]: data,
      },
    };
    setProfile(updatedProfile);
    
    // Salvar no localStorage
    const storageKey = `lumia-profile-${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
    
    setActiveQuiz(null);
  };

  if (activeQuiz) {
    return (
      <CharacteristicQuiz
        characteristic={activeQuiz}
        label={CHARACTERISTIC_LABELS[activeQuiz]}
        onComplete={(data) => handleCompleteQuiz(activeQuiz, data)}
        onCancel={() => setActiveQuiz(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a1a] overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Header com foto e nome */}
        <div className="flex flex-col items-center mb-8">
          {/* Foto de perfil */}
          <div className="relative group mb-4">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-4 ring-purple-500/20">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Nome editável */}
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="text-center text-xl font-semibold"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") setIsEditingName(false);
                }}
              />
              <Button
                onClick={handleSaveName}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600"
              >
                Salvar
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-purple-500 dark:hover:text-purple-400 transition-colors group"
            >
              <span>{profile.displayName || "Clique para editar"}</span>
              <Edit2 className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>

        {/* Suas Características */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Suas Características
          </h2>
          
          {/* Blocos de características */}
          <div className="space-y-4">
            {(Object.keys(CHARACTERISTIC_LABELS) as Array<keyof typeof CHARACTERISTIC_LABELS>).map((key) => {
              const data = profile.characteristics[key];
              const label = CHARACTERISTIC_LABELS[key];

              return (
                <div
                  key={key}
                  className="bg-gray-50 dark:bg-[#212121] rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                    {label}
                  </h3>

                  {!data ? (
                    <div className="space-y-4">
                      <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                        Ainda em construção
                      </p>
                      <Button
                        onClick={() => handleStartQuiz(key)}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        Explorar
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {data.summary}
                      </p>

                      {data.positives.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                            Pontos positivos
                          </h4>
                          <ul className="space-y-1">
                            {data.positives.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                              >
                                <span className="text-emerald-500 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {data.challenges.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                            Pontos de atenção
                          </h4>
                          <ul className="space-y-1">
                            {data.challenges.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                              >
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button
                        onClick={() => handleStartQuiz(key)}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        Refazer
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Quiz para cada característica
interface CharacteristicQuizProps {
  characteristic: string;
  label: string;
  onComplete: (data: CharacteristicData) => void;
  onCancel: () => void;
}

function CharacteristicQuiz({ characteristic, label, onComplete, onCancel }: CharacteristicQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Perguntas por característica (exemplo - podem ser ajustadas)
  const questions = getQuestionsForCharacteristic(characteristic);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finalizar quiz - gerar resultado baseado nas respostas
      const result = generateCharacteristicResult(characteristic, answers);
      onComplete(result);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a1a] overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
          >
            ← Voltar
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {label}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pergunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        {/* Pergunta */}
        <div className="space-y-6">
          <h3 className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Opções */}
          {currentQ.type === "multiple" && currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-[#212121] border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all"
                >
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Campo aberto */}
          {currentQ.type === "open" && (
            <div className="space-y-4">
              <textarea
                className="w-full min-h-[120px] p-4 rounded-xl bg-gray-50 dark:bg-[#212121] border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-900 dark:text-gray-100 resize-none"
                placeholder="Escreva sua resposta..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey && e.currentTarget.value.trim()) {
                    handleAnswer(e.currentTarget.value.trim());
                  }
                }}
              />
              <Button
                onClick={(e) => {
                  const textarea = e.currentTarget.previousElementSibling as HTMLTextAreaElement;
                  if (textarea.value.trim()) {
                    handleAnswer(textarea.value.trim());
                  }
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Continuar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Função para obter perguntas por característica
function getQuestionsForCharacteristic(characteristic: string) {
  const questionsMap: Record<string, Array<{ question: string; type: "multiple" | "open"; options?: string[] }>> = {
    humor: [
      {
        question: "Como você descreveria seu humor na maior parte do tempo?",
        type: "multiple",
        options: [
          "Geralmente estável e equilibrado",
          "Varia bastante ao longo do dia",
          "Depende muito do que está acontecendo ao redor",
          "Tendo a ser mais introspectivo e reflexivo",
        ],
      },
      {
        question: "O que mais influencia seu humor no dia a dia?",
        type: "multiple",
        options: [
          "Interações sociais e relacionamentos",
          "Conquistas e resultados do trabalho",
          "Meu estado físico e energia",
          "Pensamentos e reflexões internas",
        ],
      },
      {
        question: "Quando seu humor muda, como você costuma reagir?",
        type: "multiple",
        options: [
          "Procuro entender o que causou a mudança",
          "Deixo passar naturalmente",
          "Tento mudar fazendo algo que gosto",
          "Converso com alguém sobre isso",
        ],
      },
      {
        question: "Há algo específico que sempre melhora seu humor?",
        type: "open",
      },
    ],
    temperament: [
      {
        question: "Como você reage quando as coisas não saem como planejado?",
        type: "multiple",
        options: [
          "Fico frustrado, mas logo busco soluções",
          "Aceito com tranquilidade e me adapto",
          "Preciso de um tempo para processar",
          "Fico irritado e preciso desabafar",
        ],
      },
      {
        question: "Em situações de pressão, você tende a:",
        type: "multiple",
        options: [
          "Manter a calma e focar no que precisa ser feito",
          "Sentir ansiedade, mas conseguir agir",
          "Ficar paralisado ou sobrecarregado",
          "Reagir de forma impulsiva",
        ],
      },
      {
        question: "Como você lida com críticas ou feedbacks negativos?",
        type: "multiple",
        options: [
          "Reflito e tento aprender com eles",
          "Me sinto mal no momento, mas supero",
          "Tendo a levar para o lado pessoal",
          "Questiono e defendo meu ponto de vista",
        ],
      },
      {
        question: "Descreva uma situação recente em que você precisou controlar seu temperamento.",
        type: "open",
      },
    ],
    emotions: [
      {
        question: "Quando você sente uma emoção forte, o que costuma fazer?",
        type: "multiple",
        options: [
          "Paro para entender o que estou sentindo",
          "Expresso imediatamente para alguém",
          "Guardo para mim e processo sozinho",
          "Tento distrair minha mente",
        ],
      },
      {
        question: "Como você se sente ao compartilhar suas emoções com outras pessoas?",
        type: "multiple",
        options: [
          "Confortável, é natural para mim",
          "Depende da pessoa e do momento",
          "Prefiro não compartilhar muito",
          "Tenho dificuldade, mas tento",
        ],
      },
      {
        question: "O que você faz quando percebe que está se sentindo sobrecarregado emocionalmente?",
        type: "multiple",
        options: [
          "Busco apoio de pessoas próximas",
          "Faço atividades que me acalmam",
          "Tento racionalizar e organizar meus pensamentos",
          "Deixo o tempo passar até me sentir melhor",
        ],
      },
      {
        question: "Existe alguma emoção que você tem mais dificuldade em lidar? Por quê?",
        type: "open",
      },
    ],
    decisions: [
      {
        question: "Como você costuma tomar decisões importantes?",
        type: "multiple",
        options: [
          "Analiso todas as opções racionalmente",
          "Confio na minha intuição",
          "Busco conselhos de pessoas que confio",
          "Avalio prós e contras, mas também ouço meu coração",
        ],
      },
      {
        question: "Quando você precisa decidir algo rapidamente, você:",
        type: "multiple",
        options: [
          "Consigo decidir com facilidade",
          "Fico ansioso, mas tomo uma decisão",
          "Prefiro ter mais tempo para pensar",
          "Sigo meu instinto do momento",
        ],
      },
      {
        question: "Depois de tomar uma decisão, você:",
        type: "multiple",
        options: [
          "Fico tranquilo e sigo em frente",
          "Às vezes fico pensando se foi a escolha certa",
          "Raramente questiono minhas decisões",
          "Costumo rever e ajustar se necessário",
        ],
      },
      {
        question: "Conte sobre uma decisão difícil que você tomou recentemente e como se sentiu.",
        type: "open",
      },
    ],
  };

  return questionsMap[characteristic] || [];
}

// Função para gerar resultado baseado nas respostas
function generateCharacteristicResult(characteristic: string, answers: Record<number, string>): CharacteristicData {
  // Esta é uma implementação simplificada
  // Em produção, você pode usar IA ou lógica mais sofisticada
  
  const resultsMap: Record<string, CharacteristicData> = {
    humor: {
      summary: "Você demonstra um humor equilibrado, com capacidade de adaptação às situações do dia a dia.",
      positives: [
        "Consegue manter estabilidade emocional na maioria das situações",
        "Reconhece os fatores que influenciam seu estado de humor",
        "Busca ativamente formas de melhorar quando necessário",
      ],
      challenges: [
        "Pode ser afetado por mudanças externas inesperadas",
        "Às vezes precisa de tempo para processar mudanças de humor",
      ],
    },
    temperament: {
      summary: "Seu temperamento mostra flexibilidade e capacidade de adaptação diante de desafios.",
      positives: [
        "Consegue manter a calma em situações de pressão",
        "Busca soluções práticas quando as coisas não saem como planejado",
        "Está aberto a aprender com feedbacks",
      ],
      challenges: [
        "Pode sentir frustração inicial diante de imprevistos",
        "Precisa de momentos para processar situações difíceis",
      ],
    },
    emotions: {
      summary: "Você tem consciência das suas emoções e busca formas saudáveis de lidar com elas.",
      positives: [
        "Reconhece e nomeia suas emoções com clareza",
        "Busca apoio quando necessário",
        "Tem estratégias para lidar com sobrecarga emocional",
      ],
      challenges: [
        "Pode ter dificuldade em compartilhar emoções mais vulneráveis",
        "Às vezes guarda sentimentos por tempo demais",
      ],
    },
    decisions: {
      summary: "Sua forma de tomar decisões equilibra razão e intuição de maneira consciente.",
      positives: [
        "Avalia diferentes perspectivas antes de decidir",
        "Confia em sua capacidade de escolha",
        "Está aberto a ajustar decisões quando necessário",
      ],
      challenges: [
        "Pode sentir ansiedade em decisões rápidas",
        "Às vezes questiona escolhas já tomadas",
      ],
    },
  };

  return resultsMap[characteristic] || {
    summary: "Característica em desenvolvimento.",
    positives: [],
    challenges: [],
  };
}
