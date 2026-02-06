"use client";

import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizInterfaceProps {
  quizId: string;
  quizTitle: string;
  onBack: () => void;
  isDemo?: boolean;
  onDemoAction?: (context?: string) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface QuizResult {
  profile: string;
  description: string;
  strengths: string[];
  improvements: string[];
  message: string;
}

export function QuizInterface({ quizId, quizTitle, onBack, isDemo = false, onDemoAction }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Perguntas do quiz (10 perguntas genéricas que se adaptam ao tema)
  const questions: Question[] = [
    {
      id: 1,
      question: "Como você se sente em relação a este aspecto da sua vida?",
      options: [
        "Muito satisfeito(a) e realizado(a)",
        "Satisfeito(a), mas com espaço para crescer",
        "Neutro(a), sem grandes emoções",
        "Insatisfeito(a) e buscando mudanças"
      ]
    },
    {
      id: 2,
      question: "Com que frequência você reflete sobre isso?",
      options: [
        "Diariamente, é parte da minha rotina",
        "Algumas vezes por semana",
        "Raramente, só quando necessário",
        "Quase nunca penso sobre isso"
      ]
    },
    {
      id: 3,
      question: "Qual é o seu maior desafio nesta área?",
      options: [
        "Falta de clareza sobre o que quero",
        "Dificuldade em tomar decisões",
        "Medo de mudanças ou do desconhecido",
        "Falta de tempo ou recursos"
      ]
    },
    {
      id: 4,
      question: "Como você costuma lidar com obstáculos?",
      options: [
        "Enfrento de frente com determinação",
        "Busco ajuda e conselhos",
        "Evito ou procrastino",
        "Sinto-me paralisado(a) e inseguro(a)"
      ]
    },
    {
      id: 5,
      question: "O que mais te motiva neste momento?",
      options: [
        "Crescimento pessoal e autoconhecimento",
        "Reconhecimento e validação externa",
        "Estabilidade e segurança",
        "Liberdade e autonomia"
      ]
    },
    {
      id: 6,
      question: "Como você se vê daqui a um ano?",
      options: [
        "Muito melhor, com grandes avanços",
        "Um pouco melhor, com progresso gradual",
        "Igual, sem grandes mudanças",
        "Incerto(a), não consigo visualizar"
      ]
    },
    {
      id: 7,
      question: "Qual é a sua maior força nesta área?",
      options: [
        "Resiliência e capacidade de adaptação",
        "Clareza de propósito e objetivos",
        "Empatia e conexão com outros",
        "Criatividade e pensamento inovador"
      ]
    },
    {
      id: 8,
      question: "O que você mais precisa desenvolver?",
      options: [
        "Autoconfiança e autoestima",
        "Habilidades práticas e conhecimento",
        "Inteligência emocional",
        "Disciplina e consistência"
      ]
    },
    {
      id: 9,
      question: "Como você lida com suas emoções?",
      options: [
        "Reconheço e expresso de forma saudável",
        "Tento entender, mas nem sempre consigo",
        "Evito ou reprimo",
        "Sinto-me sobrecarregado(a) por elas"
      ]
    },
    {
      id: 10,
      question: "O que você espera alcançar?",
      options: [
        "Paz interior e equilíbrio",
        "Realização de objetivos específicos",
        "Melhores relacionamentos",
        "Maior clareza sobre meu caminho"
      ]
    }
  ];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Última pergunta - mostrar resultado
      if (isDemo && onDemoAction) {
        // No modo demo, bloquear o resultado
        onDemoAction();
      } else {
        setShowResult(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const newAnswers = [...answers];
      const previousAnswer = newAnswers.pop();
      setAnswers(newAnswers);
      setSelectedOption(previousAnswer ?? null);
    }
  };

  // Calcular resultado baseado nas respostas
  const calculateResult = (): QuizResult => {
    const sum = answers.reduce((acc, val) => acc + val, 0);
    const avg = sum / answers.length;

    if (avg <= 1) {
      return {
        profile: "Pessoa em Harmonia",
        description: "Você demonstra um alto nível de autoconhecimento e equilíbrio emocional. Está em sintonia com seus valores e propósitos.",
        strengths: [
          "Alta capacidade de autorreflexão",
          "Clareza sobre seus objetivos e valores",
          "Resiliência emocional desenvolvida",
          "Proatividade em buscar crescimento"
        ],
        improvements: [
          "Continue cultivando essa conexão consigo mesmo(a)",
          "Compartilhe suas experiências para inspirar outros",
          "Explore novos desafios para manter o crescimento"
        ],
        message: "Você está em um caminho lindo de autoconhecimento. Continue honrando sua jornada e celebrando cada passo. Sua consciência é sua maior aliada."
      };
    } else if (avg <= 2) {
      return {
        profile: "Pessoa em Desenvolvimento",
        description: "Você está em um processo ativo de crescimento pessoal. Reconhece áreas de melhoria e está disposto(a) a evoluir.",
        strengths: [
          "Abertura para aprender e crescer",
          "Consciência de pontos de melhoria",
          "Equilíbrio entre satisfação e ambição",
          "Capacidade de reflexão"
        ],
        improvements: [
          "Desenvolva mais autoconfiança em suas decisões",
          "Pratique a consistência em suas ações",
          "Busque apoio quando necessário",
          "Celebre pequenas vitórias no caminho"
        ],
        message: "Você está exatamente onde precisa estar. Cada passo que você dá em direção ao autoconhecimento é valioso. Confie no seu processo e seja gentil consigo mesmo(a)."
      };
    } else if (avg <= 3) {
      return {
        profile: "Pessoa em Transição",
        description: "Você está em um momento de questionamento e busca. Há uma sensação de que mudanças são necessárias, mas o caminho ainda não está totalmente claro.",
        strengths: [
          "Coragem para questionar e buscar mudanças",
          "Honestidade consigo mesmo(a)",
          "Potencial de transformação",
          "Disposição para explorar novas possibilidades"
        ],
        improvements: [
          "Desenvolva clareza sobre seus valores e prioridades",
          "Pratique pequenas ações diárias de autocuidado",
          "Busque apoio profissional se necessário",
          "Cultive paciência com seu processo",
          "Fortaleça sua inteligência emocional"
        ],
        message: "Momentos de transição são desafiadores, mas também são oportunidades de renascimento. Você tem a força necessária para atravessar este momento. Permita-se sentir, questionar e, aos poucos, encontrar seu caminho."
      };
    } else {
      return {
        profile: "Pessoa em Busca de Clareza",
        description: "Você está em um momento de intensa busca interior. Há muitas dúvidas e incertezas, mas isso também mostra sua coragem de olhar para dentro.",
        strengths: [
          "Coragem de reconhecer suas dificuldades",
          "Honestidade emocional",
          "Abertura para mudanças profundas",
          "Potencial de transformação significativa"
        ],
        improvements: [
          "Busque apoio profissional (terapia, coaching)",
          "Comece com pequenos passos diários",
          "Pratique autocompaixão e gentileza consigo",
          "Desenvolva uma rotina de autocuidado",
          "Conecte-se com pessoas que te apoiam",
          "Explore práticas de mindfulness e meditação"
        ],
        message: "Reconhecer que você precisa de ajuda é um ato de coragem e sabedoria. Você não precisa passar por isso sozinho(a). Cada dia é uma nova oportunidade de cuidar de si e dar pequenos passos em direção ao bem-estar. Você é mais forte do que imagina."
      };
    }
  };

  const result = showResult ? calculateResult() : null;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-900/20 via-[#1a1a1a] to-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-9 w-9"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-100">{quizTitle}</h2>
          {!showResult && (
            <p className="text-sm text-gray-400">
              Pergunta {currentQuestion + 1} de {questions.length}
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {!showResult && (
        <div className="px-4 pt-4">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {!showResult ? (
            // Quiz Questions
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <h3 className="text-2xl sm:text-3xl font-light text-gray-100 leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-3 mt-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      selectedOption === index
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-[1.02]"
                        : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedOption === index
                            ? "border-white bg-white"
                            : "border-gray-400"
                        }`}
                      >
                        {selectedOption === index && (
                          <Check className="w-4 h-4 text-purple-500" />
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                {currentQuestion > 0 && (
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className={`flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white ${
                    currentQuestion === 0 ? "w-full" : ""
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? "Ver Resultado" : "Próxima"}
                </Button>
              </div>
            </div>
          ) : (
            // Quiz Result
            result && (
              <div className="space-y-6">
                {/* Profile Badge */}
                <div className="text-center space-y-4">
                  <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">
                    {result.profile}
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
                    {result.description}
                  </p>
                </div>

                {/* Strengths */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-semibold text-gray-100 mb-4">
                    ✨ Seus Pontos Fortes
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-semibold text-gray-100 mb-4">
                    🌱 Áreas de Crescimento
                  </h4>
                  <ul className="space-y-2">
                    {result.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-pink-400 mt-1">•</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Personal Message */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <h4 className="text-xl font-semibold text-gray-100 mb-3">
                    💜 Mensagem para Você
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {result.message}
                  </p>
                </div>

                {/* Action Button */}
                <div className="text-center pt-4">
                  <Button
                    onClick={onBack}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
                  >
                    Fazer Outro Quiz
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
