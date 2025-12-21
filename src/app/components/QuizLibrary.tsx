"use client";

import { useState } from "react";
import { Brain, Heart, Briefcase, Users, ArrowLeft, MessageCircle, Zap, Target, Shield, TrendingUp, Wind, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  text: string;
  feedback: string;
}

interface QuizResult {
  title: string;
  characteristics: string[];
  strengths: string[];
  attentionPoints: string[];
}

const quizzes: Quiz[] = [
  {
    id: "autoconhecimento",
    title: "Autoconhecimento",
    description: "Descubra mais sobre você mesmo e seus padrões de comportamento",
    icon: Brain,
    color: "from-purple-500 to-purple-700",
    questions: [
      {
        id: 1,
        question: "Como você costuma reagir em situações de estresse?",
        options: [
          { text: "Busco resolver imediatamente", feedback: "Você age rápido. Isso pode ser eficiente." },
          { text: "Preciso de um tempo sozinho", feedback: "Você se recolhe pra processar. Isso é válido." },
          { text: "Converso com alguém próximo", feedback: "Você busca apoio. Isso cria conexão." },
          { text: "Tento ignorar e seguir em frente", feedback: "Você evita. Cuidado pra não acumular." }
        ]
      },
      {
        id: 2,
        question: "O que mais te motiva no dia a dia?",
        options: [
          { text: "Alcançar meus objetivos", feedback: "Você é movido por conquistas." },
          { text: "Ajudar outras pessoas", feedback: "Você se realiza através dos outros." },
          { text: "Aprender coisas novas", feedback: "Você valoriza crescimento." },
          { text: "Ter estabilidade e segurança", feedback: "Você busca previsibilidade." }
        ]
      },
      {
        id: 3,
        question: "Como você prefere tomar decisões importantes?",
        options: [
          { text: "Analiso todos os dados disponíveis", feedback: "Você é racional e cuidadoso." },
          { text: "Sigo minha intuição", feedback: "Você confia no que sente." },
          { text: "Peço conselhos a pessoas de confiança", feedback: "Você valoriza outras perspectivas." },
          { text: "Avalio prós e contras cuidadosamente", feedback: "Você equilibra razão e emoção." }
        ]
      },
      {
        id: 4,
        question: "O que você valoriza mais em relacionamentos?",
        options: [
          { text: "Honestidade e transparência", feedback: "Você prioriza verdade." },
          { text: "Apoio emocional", feedback: "Você busca acolhimento." },
          { text: "Diversão e leveza", feedback: "Você valoriza alegria." },
          { text: "Lealdade e compromisso", feedback: "Você busca segurança." }
        ]
      },
      {
        id: 5,
        question: "Como você lida com mudanças inesperadas?",
        options: [
          { text: "Adapto-me rapidamente", feedback: "Você é flexível." },
          { text: "Preciso de tempo para processar", feedback: "Você precisa de espaço." },
          { text: "Vejo como oportunidade", feedback: "Você é otimista." },
          { text: "Sinto-me desconfortável", feedback: "Mudança te desestabiliza." }
        ]
      },
      {
        id: 6,
        question: "O que te faz sentir realizado?",
        options: [
          { text: "Conquistar metas pessoais", feedback: "Você se realiza através de conquistas." },
          { text: "Ver outras pessoas felizes", feedback: "Você se realiza através dos outros." },
          { text: "Criar algo novo", feedback: "Você valoriza criatividade." },
          { text: "Ter reconhecimento", feedback: "Você busca validação." }
        ]
      },
      {
        id: 7,
        question: "Como você prefere passar seu tempo livre?",
        options: [
          { text: "Sozinho, relaxando", feedback: "Você recarrega na solidão." },
          { text: "Com amigos e família", feedback: "Você recarrega com pessoas." },
          { text: "Fazendo atividades produtivas", feedback: "Você não para." },
          { text: "Explorando novos lugares", feedback: "Você busca novidade." }
        ]
      },
      {
        id: 8,
        question: "O que mais te incomoda em outras pessoas?",
        options: [
          { text: "Falta de compromisso", feedback: "Você valoriza responsabilidade." },
          { text: "Desonestidade", feedback: "Você valoriza verdade." },
          { text: "Negatividade", feedback: "Você valoriza positividade." },
          { text: "Falta de empatia", feedback: "Você valoriza sensibilidade." }
        ]
      },
      {
        id: 9,
        question: "Como você se vê daqui a 5 anos?",
        options: [
          { text: "Realizado profissionalmente", feedback: "Você prioriza carreira." },
          { text: "Com relacionamentos sólidos", feedback: "Você prioriza conexões." },
          { text: "Vivendo com mais equilíbrio", feedback: "Você busca harmonia." },
          { text: "Explorando novas possibilidades", feedback: "Você busca crescimento." }
        ]
      },
      {
        id: 10,
        question: "O que você faria se tivesse total liberdade?",
        options: [
          { text: "Viajaria pelo mundo", feedback: "Você busca experiências." },
          { text: "Dedicaria tempo a causas sociais", feedback: "Você busca propósito." },
          { text: "Desenvolveria projetos pessoais", feedback: "Você busca realização." },
          { text: "Passaria mais tempo com quem amo", feedback: "Você valoriza conexões." }
        ]
      }
    ]
  },
  {
    id: "inteligencia-emocional",
    title: "Inteligência Emocional",
    description: "Avalie sua capacidade de reconhecer e gerenciar emoções",
    icon: Heart,
    color: "from-pink-500 to-pink-700",
    questions: [
      {
        id: 1,
        question: "Quando alguém te critica, qual sua primeira reação?",
        options: [
          { text: "Fico na defensiva", feedback: "Você se protege rapidamente." },
          { text: "Reflito sobre o feedback", feedback: "Você busca aprender." },
          { text: "Sinto-me magoado", feedback: "Você é sensível." },
          { text: "Tento entender o ponto de vista", feedback: "Você busca compreensão." }
        ]
      },
      {
        id: 2,
        question: "Como você identifica suas emoções?",
        options: [
          { text: "Facilmente, sei o que estou sentindo", feedback: "Você tem clareza emocional." },
          { text: "Às vezes me confundo", feedback: "Você ainda está aprendendo." },
          { text: "Preciso de tempo para entender", feedback: "Você processa devagar." },
          { text: "Tenho dificuldade em nomear", feedback: "Você se desconecta das emoções." }
        ]
      },
      {
        id: 3,
        question: "O que você faz quando está muito ansioso?",
        options: [
          { text: "Pratico técnicas de respiração", feedback: "Você tem estratégias." },
          { text: "Converso com alguém", feedback: "Você busca apoio." },
          { text: "Tento me distrair", feedback: "Você evita sentir." },
          { text: "Deixo passar naturalmente", feedback: "Você aceita." }
        ]
      },
      {
        id: 4,
        question: "Como você reage à felicidade dos outros?",
        options: [
          { text: "Fico genuinamente feliz", feedback: "Você tem empatia positiva." },
          { text: "Às vezes sinto inveja", feedback: "Você se compara." },
          { text: "Depende da situação", feedback: "Você é contextual." },
          { text: "Comparo com minha vida", feedback: "Você se mede pelos outros." }
        ]
      },
      {
        id: 5,
        question: "Quando comete um erro, você:",
        options: [
          { text: "Assume e aprende", feedback: "Você é maduro." },
          { text: "Sente-se culpado por muito tempo", feedback: "Você carrega peso." },
          { text: "Tenta justificar", feedback: "Você se protege." },
          { text: "Esquece rapidamente", feedback: "Você não processa." }
        ]
      },
      {
        id: 6,
        question: "Como você expressa suas emoções?",
        options: [
          { text: "Abertamente, sem filtros", feedback: "Você é transparente." },
          { text: "De forma controlada", feedback: "Você filtra." },
          { text: "Tenho dificuldade em expressar", feedback: "Você se guarda." },
          { text: "Depende de com quem estou", feedback: "Você é seletivo." }
        ]
      },
      {
        id: 7,
        question: "O que você faz quando percebe que magoou alguém?",
        options: [
          { text: "Peço desculpas imediatamente", feedback: "Você é responsável." },
          { text: "Reflito sobre o que aconteceu", feedback: "Você processa." },
          { text: "Sinto-me muito mal", feedback: "Você carrega culpa." },
          { text: "Tento justificar minha ação", feedback: "Você se defende." }
        ]
      },
      {
        id: 8,
        question: "Como você lida com conflitos?",
        options: [
          { text: "Enfrento diretamente", feedback: "Você é direto." },
          { text: "Evito ao máximo", feedback: "Você foge." },
          { text: "Busco mediação", feedback: "Você busca equilíbrio." },
          { text: "Espero passar", feedback: "Você aguarda." }
        ]
      },
      {
        id: 9,
        question: "Você consegue perceber as emoções dos outros?",
        options: [
          { text: "Sim, facilmente", feedback: "Você é empático." },
          { text: "Na maioria das vezes", feedback: "Você percebe bem." },
          { text: "Às vezes me confundo", feedback: "Você ainda aprende." },
          { text: "Tenho dificuldade", feedback: "Você se desconecta." }
        ]
      },
      {
        id: 10,
        question: "Como você se motiva em dias difíceis?",
        options: [
          { text: "Lembro dos meus objetivos", feedback: "Você é focado." },
          { text: "Busco apoio de outros", feedback: "Você busca conexão." },
          { text: "Pratico autocuidado", feedback: "Você se cuida." },
          { text: "Simplesmente sigo em frente", feedback: "Você persiste." }
        ]
      }
    ]
  },
  {
    id: "estilo-trabalho",
    title: "Estilo de Trabalho",
    description: "Entenda como você funciona melhor no ambiente profissional",
    icon: Briefcase,
    color: "from-blue-500 to-blue-700",
    questions: [
      {
        id: 1,
        question: "Como você prefere trabalhar?",
        options: [
          { text: "Sozinho, no meu ritmo", feedback: "Você valoriza autonomia." },
          { text: "Em equipe, colaborando", feedback: "Você valoriza conexão." },
          { text: "Com autonomia mas apoio disponível", feedback: "Você equilibra." },
          { text: "Com diretrizes claras", feedback: "Você valoriza estrutura." }
        ]
      },
      {
        id: 2,
        question: "O que te deixa mais produtivo?",
        options: [
          { text: "Prazos definidos", feedback: "Você funciona com urgência." },
          { text: "Ambiente organizado", feedback: "Você precisa de ordem." },
          { text: "Desafios estimulantes", feedback: "Você busca crescimento." },
          { text: "Reconhecimento do trabalho", feedback: "Você busca validação." }
        ]
      },
      {
        id: 3,
        question: "Como você lida com prazos apertados?",
        options: [
          { text: "Trabalho melhor sob pressão", feedback: "Pressão te ativa." },
          { text: "Fico estressado mas entrego", feedback: "Você aguenta." },
          { text: "Preciso planejar com antecedência", feedback: "Você se organiza." },
          { text: "Tenho dificuldade", feedback: "Pressão te paralisa." }
        ]
      },
      {
        id: 4,
        question: "O que você valoriza em um líder?",
        options: [
          { text: "Clareza e organização", feedback: "Você valoriza estrutura." },
          { text: "Empatia e apoio", feedback: "Você valoriza acolhimento." },
          { text: "Visão estratégica", feedback: "Você valoriza direção." },
          { text: "Autonomia que concede", feedback: "Você valoriza liberdade." }
        ]
      },
      {
        id: 5,
        question: "Como você prefere receber feedback?",
        options: [
          { text: "Direto e objetivo", feedback: "Você valoriza clareza." },
          { text: "De forma construtiva e gentil", feedback: "Você valoriza cuidado." },
          { text: "Com exemplos práticos", feedback: "Você valoriza concretude." },
          { text: "Em particular", feedback: "Você valoriza privacidade." }
        ]
      },
      {
        id: 6,
        question: "O que te motiva profissionalmente?",
        options: [
          { text: "Crescimento na carreira", feedback: "Você busca evolução." },
          { text: "Propósito do trabalho", feedback: "Você busca significado." },
          { text: "Remuneração", feedback: "Você busca segurança." },
          { text: "Ambiente de trabalho", feedback: "Você busca bem-estar." }
        ]
      },
      {
        id: 7,
        question: "Como você lida com mudanças no trabalho?",
        options: [
          { text: "Adapto-me facilmente", feedback: "Você é flexível." },
          { text: "Preciso de tempo", feedback: "Você precisa de espaço." },
          { text: "Vejo como oportunidade", feedback: "Você é otimista." },
          { text: "Prefiro estabilidade", feedback: "Você valoriza previsibilidade." }
        ]
      },
      {
        id: 8,
        question: "Qual seu maior desafio profissional?",
        options: [
          { text: "Gestão de tempo", feedback: "Você se desorganiza." },
          { text: "Relacionamento com colegas", feedback: "Você tem dificuldade social." },
          { text: "Equilíbrio vida-trabalho", feedback: "Você se sobrecarrega." },
          { text: "Desenvolvimento de habilidades", feedback: "Você busca crescer." }
        ]
      },
      {
        id: 9,
        question: "Como você celebra conquistas profissionais?",
        options: [
          { text: "Compartilho com a equipe", feedback: "Você valoriza conexão." },
          { text: "Reflito sobre o aprendizado", feedback: "Você processa." },
          { text: "Parto para o próximo desafio", feedback: "Você não para." },
          { text: "Faço algo especial para mim", feedback: "Você se recompensa." }
        ]
      },
      {
        id: 10,
        question: "O que te faria mudar de emprego?",
        options: [
          { text: "Falta de crescimento", feedback: "Você busca evolução." },
          { text: "Ambiente tóxico", feedback: "Você valoriza bem-estar." },
          { text: "Melhor proposta financeira", feedback: "Você valoriza segurança." },
          { text: "Desalinhamento de valores", feedback: "Você valoriza propósito." }
        ]
      }
    ]
  },
  {
    id: "relacionamentos",
    title: "Padrões de Relacionamento",
    description: "Descubra como você se conecta com outras pessoas",
    icon: Users,
    color: "from-green-500 to-green-700",
    questions: [
      {
        id: 1,
        question: "Como você faz novas amizades?",
        options: [
          { text: "Facilmente, sou extrovertido", feedback: "Você se abre facilmente." },
          { text: "Leva tempo, sou seletivo", feedback: "Você é cauteloso." },
          { text: "Depende do contexto", feedback: "Você é contextual." },
          { text: "Tenho dificuldade", feedback: "Você se fecha." }
        ]
      },
      {
        id: 2,
        question: "O que você busca em um relacionamento amoroso?",
        options: [
          { text: "Companheirismo", feedback: "Você busca parceria." },
          { text: "Paixão e intensidade", feedback: "Você busca emoção." },
          { text: "Estabilidade", feedback: "Você busca segurança." },
          { text: "Crescimento mútuo", feedback: "Você busca evolução." }
        ]
      },
      {
        id: 3,
        question: "Como você lida com conflitos em relacionamentos?",
        options: [
          { text: "Converso abertamente", feedback: "Você é direto." },
          { text: "Evito confrontos", feedback: "Você foge." },
          { text: "Busco compromisso", feedback: "Você equilibra." },
          { text: "Preciso de tempo sozinho", feedback: "Você se recolhe." }
        ]
      },
      {
        id: 4,
        question: "Qual seu maior medo em relacionamentos?",
        options: [
          { text: "Ser abandonado", feedback: "Você teme rejeição." },
          { text: "Perder minha liberdade", feedback: "Você teme prisão." },
          { text: "Não ser compreendido", feedback: "Você teme solidão." },
          { text: "Ser traído", feedback: "Você teme deslealdade." }
        ]
      },
      {
        id: 5,
        question: "Como você demonstra afeto?",
        options: [
          { text: "Com palavras", feedback: "Você verbaliza." },
          { text: "Com ações e gestos", feedback: "Você age." },
          { text: "Com presença e tempo", feedback: "Você está presente." },
          { text: "Com presentes", feedback: "Você materializa." }
        ]
      },
      {
        id: 6,
        question: "O que você faz quando se sente rejeitado?",
        options: [
          { text: "Reflito sobre o que aconteceu", feedback: "Você processa." },
          { text: "Busco validação em outros", feedback: "Você compensa." },
          { text: "Me afasto emocionalmente", feedback: "Você se protege." },
          { text: "Converso sobre meus sentimentos", feedback: "Você se abre." }
        ]
      },
      {
        id: 7,
        question: "Como você mantém relacionamentos à distância?",
        options: [
          { text: "Comunicação constante", feedback: "Você se esforça." },
          { text: "Visitas regulares", feedback: "Você prioriza presença." },
          { text: "Tenho dificuldade", feedback: "Você precisa de proximidade." },
          { text: "Qualidade sobre quantidade", feedback: "Você valoriza intensidade." }
        ]
      },
      {
        id: 8,
        question: "O que te faz se sentir amado?",
        options: [
          { text: "Palavras de afirmação", feedback: "Você precisa ouvir." },
          { text: "Atos de serviço", feedback: "Você precisa ver." },
          { text: "Tempo de qualidade", feedback: "Você precisa presença." },
          { text: "Toque físico", feedback: "Você precisa contato." }
        ]
      },
      {
        id: 9,
        question: "Como você lida com ciúmes?",
        options: [
          { text: "Converso sobre minha insegurança", feedback: "Você se abre." },
          { text: "Tento controlar", feedback: "Você age." },
          { text: "Reflito sobre a origem", feedback: "Você processa." },
          { text: "Ignoro o sentimento", feedback: "Você evita." }
        ]
      },
      {
        id: 10,
        question: "O que te faria terminar um relacionamento?",
        options: [
          { text: "Falta de confiança", feedback: "Você valoriza verdade." },
          { text: "Desrespeito", feedback: "Você valoriza dignidade." },
          { text: "Crescimento em direções diferentes", feedback: "Você valoriza alinhamento." },
          { text: "Falta de comunicação", feedback: "Você valoriza conexão." }
        ]
      }
    ]
  }
];

interface QuizLibraryProps {
  onBack: () => void;
  onStartChat: () => void;
  userId?: string;
}

export function QuizLibrary({ onBack, onStartChat, userId }: QuizLibraryProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState("");

  const handleSelectQuiz = (quiz: Quiz) => {
    // Permitir iniciar quiz livremente (sem verificação de assinatura)
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setCurrentFeedback("");
  };

  const handleAnswer = (optionIndex: number) => {
    if (!selectedQuiz) return;

    const feedback = selectedQuiz.questions[currentQuestion].options[optionIndex].feedback;
    setCurrentFeedback(feedback);
    setShowFeedback(true);

    setTimeout(() => {
      const newAnswers = [...answers, optionIndex];
      setAnswers(newAnswers);
      setShowFeedback(false);

      if (currentQuestion < selectedQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        // Salvar resultado
        if (userId && selectedQuiz) {
          const result = {
            quizId: selectedQuiz.id,
            answers: newAnswers,
            date: new Date().toISOString()
          };
          const saved = localStorage.getItem(`lumia-quiz-results-${userId}`) || "[]";
          const results = JSON.parse(saved);
          results.push(result);
          localStorage.setItem(`lumia-quiz-results-${userId}`, JSON.stringify(results));
        }
      }
    }, 2000);
  };

  const generateResult = (): QuizResult => {
    if (!selectedQuiz) return { title: "", characteristics: [], strengths: [], attentionPoints: [] };

    // Análise simples baseada nas respostas
    const avgScore = answers.reduce((acc, val) => acc + val, 0) / answers.length;

    const results: Record<string, QuizResult> = {
      autoconhecimento: {
        title: "Seu Perfil de Autoconhecimento",
        characteristics: [
          "Você demonstra consciência sobre seus padrões",
          "Tem clareza sobre suas motivações",
          "Reconhece seus valores e prioridades"
        ],
        strengths: [
          "Capacidade de reflexão sobre si mesmo",
          "Abertura para entender suas reações",
          "Consciência de suas necessidades"
        ],
        attentionPoints: [
          "Continue explorando aspectos menos conhecidos",
          "Pratique observação de padrões",
          "Mantenha um diário para aprofundar"
        ]
      },
      "inteligencia-emocional": {
        title: "Seu Perfil de Inteligência Emocional",
        characteristics: [
          "Você mostra consciência emocional",
          "Tem estratégias para lidar com emoções",
          "Demonstra empatia nas relações"
        ],
        strengths: [
          "Capacidade de reconhecer emoções",
          "Habilidade de regular estados emocionais",
          "Sensibilidade às emoções dos outros"
        ],
        attentionPoints: [
          "Continue praticando regulação emocional",
          "Desenvolva mais estratégias",
          "Trabalhe expressão saudável"
        ]
      },
      "estilo-trabalho": {
        title: "Seu Estilo de Trabalho",
        characteristics: [
          "Você tem clareza sobre como funciona melhor",
          "Conhece seus gatilhos de produtividade",
          "Entende suas necessidades no trabalho"
        ],
        strengths: [
          "Consciência do seu ritmo",
          "Clareza sobre motivações profissionais",
          "Capacidade de identificar ambientes favoráveis"
        ],
        attentionPoints: [
          "Busque ambientes alinhados",
          "Comunique suas necessidades",
          "Desenvolva flexibilidade"
        ]
      },
      relacionamentos: {
        title: "Seus Padrões de Relacionamento",
        characteristics: [
          "Você tem consciência de como se conecta",
          "Reconhece suas necessidades relacionais",
          "Entende seus padrões de vínculo"
        ],
        strengths: [
          "Clareza sobre o que busca",
          "Consciência de sua forma de demonstrar afeto",
          "Capacidade de identificar limites"
        ],
        attentionPoints: [
          "Trabalhe comunicação de necessidades",
          "Desenvolva resolução de conflitos",
          "Pratique vulnerabilidade saudável"
        ]
      }
    };

    return results[selectedQuiz.id] || results.autoconhecimento;
  };

  if (showResult && selectedQuiz) {
    const result = generateResult();
    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedQuiz(null);
              setShowResult(false);
            }}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para biblioteca
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {result.title}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Suas Características
              </h3>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Seus Pontos Fortes
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800 border-amber-200 dark:border-amber-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Pontos de Atenção
              </h3>
              <ul className="space-y-2">
                {result.attentionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Button
              onClick={onStartChat}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Vamos conversar sobre isso?
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedQuiz(null)}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {selectedQuiz.title}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} de {selectedQuiz.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {question.question}
              </h3>
              {showFeedback ? (
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 animate-fade-in">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {currentFeedback}
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                    >
                      <span className="text-base">{option.text}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <Button variant="ghost" onClick={onBack} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Biblioteca de Quizzes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Descubra mais sobre você através de questionários guiados
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => {
            const Icon = quiz.icon;
            return (
              <Card
                key={quiz.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-2 hover:border-purple-300 dark:hover:border-purple-700"
                onClick={() => handleSelectQuiz(quiz)}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${quiz.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {quiz.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{quiz.questions.length} perguntas</span>
                  <span>~5 min</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
