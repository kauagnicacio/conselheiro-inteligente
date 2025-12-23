"use client";

import { useState } from "react";
import { Brain, Heart, Briefcase, Users, ArrowLeft, MessageCircle, Zap, Target, Shield, TrendingUp, Wind, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Paywall } from "@/components/Paywall";
import { useSubscription } from "@/hooks/useSubscription";

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
  },
  {
    id: "resiliencia",
    title: "Resiliência",
    description: "Descubra como você lida com adversidades e desafios",
    icon: Shield,
    color: "from-orange-500 to-orange-700",
    questions: [
      {
        id: 1,
        question: "Como você reage quando algo não sai como planejado?",
        options: [
          { text: "Busco alternativas rapidamente", feedback: "Você é adaptável." },
          { text: "Fico frustrado mas sigo em frente", feedback: "Você processa e continua." },
          { text: "Preciso de tempo para me recompor", feedback: "Você respeita seu ritmo." },
          { text: "Desisto facilmente", feedback: "Você se desanima rápido." }
        ]
      },
      {
        id: 2,
        question: "O que te ajuda a superar momentos difíceis?",
        options: [
          { text: "Apoio de pessoas próximas", feedback: "Você busca conexão." },
          { text: "Foco em soluções práticas", feedback: "Você é pragmático." },
          { text: "Tempo para processar sozinho", feedback: "Você se recolhe." },
          { text: "Lembrar de superações passadas", feedback: "Você se inspira em si." }
        ]
      },
      {
        id: 3,
        question: "Como você lida com críticas construtivas?",
        options: [
          { text: "Vejo como oportunidade de crescer", feedback: "Você é aberto." },
          { text: "Fico na defensiva inicialmente", feedback: "Você se protege." },
          { text: "Reflito bastante antes de aceitar", feedback: "Você pondera." },
          { text: "Me sinto atacado", feedback: "Você leva pro pessoal." }
        ]
      },
      {
        id: 4,
        question: "Quando você falha em algo importante:",
        options: [
          { text: "Analiso o que deu errado e tento de novo", feedback: "Você aprende." },
          { text: "Me culpo por muito tempo", feedback: "Você carrega peso." },
          { text: "Busco apoio para seguir em frente", feedback: "Você pede ajuda." },
          { text: "Evito pensar no assunto", feedback: "Você foge." }
        ]
      },
      {
        id: 5,
        question: "O que te mantém motivado em períodos difíceis?",
        options: [
          { text: "Meus objetivos de longo prazo", feedback: "Você tem visão." },
          { text: "Pessoas que dependem de mim", feedback: "Você se motiva pelos outros." },
          { text: "Saber que tudo passa", feedback: "Você tem perspectiva." },
          { text: "Tenho dificuldade em me manter motivado", feedback: "Você se desanima." }
        ]
      },
      {
        id: 6,
        question: "Como você se recupera de uma decepção?",
        options: [
          { text: "Rapidamente, foco no próximo passo", feedback: "Você segue em frente." },
          { text: "Preciso de tempo para processar", feedback: "Você respeita sua dor." },
          { text: "Converso com alguém de confiança", feedback: "Você compartilha." },
          { text: "Guardo pra mim e sigo", feedback: "Você engole." }
        ]
      },
      {
        id: 7,
        question: "Diante de um grande desafio, você:",
        options: [
          { text: "Fico animado com a possibilidade", feedback: "Você é desafiador." },
          { text: "Sinto medo mas enfrento", feedback: "Você é corajoso." },
          { text: "Avalio se vale a pena", feedback: "Você é estratégico." },
          { text: "Prefiro evitar", feedback: "Você se protege." }
        ]
      },
      {
        id: 8,
        question: "Como você lida com mudanças bruscas na vida?",
        options: [
          { text: "Adapto-me com facilidade", feedback: "Você é flexível." },
          { text: "Levo tempo mas me ajusto", feedback: "Você processa." },
          { text: "Busco manter algum controle", feedback: "Você se organiza." },
          { text: "Fico muito desestabilizado", feedback: "Mudança te abala." }
        ]
      },
      {
        id: 9,
        question: "O que você faz quando se sente sobrecarregado?",
        options: [
          { text: "Priorizo o essencial", feedback: "Você é prático." },
          { text: "Peço ajuda", feedback: "Você reconhece limites." },
          { text: "Tento dar conta de tudo", feedback: "Você se força." },
          { text: "Paro tudo e descanso", feedback: "Você se cuida." }
        ]
      },
      {
        id: 10,
        question: "Como você vê os obstáculos na sua vida?",
        options: [
          { text: "Como oportunidades de aprendizado", feedback: "Você é otimista." },
          { text: "Como parte natural da jornada", feedback: "Você aceita." },
          { text: "Como testes da minha capacidade", feedback: "Você se desafia." },
          { text: "Como impedimentos ao meu sucesso", feedback: "Você se vitimiza." }
        ]
      }
    ]
  },
  {
    id: "criatividade",
    title: "Criatividade",
    description: "Explore como você pensa e resolve problemas de forma criativa",
    icon: Lightbulb,
    color: "from-yellow-500 to-yellow-700",
    questions: [
      {
        id: 1,
        question: "Como você costuma ter suas melhores ideias?",
        options: [
          { text: "Em momentos de relaxamento", feedback: "Você cria no ócio." },
          { text: "Conversando com outras pessoas", feedback: "Você cria na troca." },
          { text: "Quando estou focado em resolver algo", feedback: "Você cria sob demanda." },
          { text: "De forma espontânea e imprevisível", feedback: "Você cria no caos." }
        ]
      },
      {
        id: 2,
        question: "Diante de um problema, você:",
        options: [
          { text: "Busco soluções já testadas", feedback: "Você é pragmático." },
          { text: "Tento abordagens diferentes", feedback: "Você é experimental." },
          { text: "Combino ideias existentes", feedback: "Você é sintetizador." },
          { text: "Crio algo completamente novo", feedback: "Você é inovador." }
        ]
      },
      {
        id: 3,
        question: "O que mais te inspira criativamente?",
        options: [
          { text: "Arte e cultura", feedback: "Você se inspira no belo." },
          { text: "Natureza e experiências", feedback: "Você se inspira no real." },
          { text: "Conversas e histórias", feedback: "Você se inspira no humano." },
          { text: "Desafios e limitações", feedback: "Você se inspira na restrição." }
        ]
      },
      {
        id: 4,
        question: "Como você lida com bloqueios criativos?",
        options: [
          { text: "Faço uma pausa e volto depois", feedback: "Você respeita o processo." },
          { text: "Forço até sair algo", feedback: "Você persiste." },
          { text: "Busco inspiração externa", feedback: "Você se alimenta." },
          { text: "Mudo completamente de abordagem", feedback: "Você se reinventa." }
        ]
      },
      {
        id: 5,
        question: "Você prefere trabalhar em projetos:",
        options: [
          { text: "Com estrutura clara", feedback: "Você cria com direção." },
          { text: "Com total liberdade", feedback: "Você cria sem amarras." },
          { text: "Com algumas diretrizes", feedback: "Você equilibra." },
          { text: "Que me desafiam tecnicamente", feedback: "Você cria resolvendo." }
        ]
      },
      {
        id: 6,
        question: "Como você reage a críticas sobre suas ideias?",
        options: [
          { text: "Uso para melhorar", feedback: "Você é receptivo." },
          { text: "Defendo minha visão", feedback: "Você é convicto." },
          { text: "Fico desanimado", feedback: "Você é sensível." },
          { text: "Considero e adapto", feedback: "Você é flexível." }
        ]
      },
      {
        id: 7,
        question: "O que te motiva a criar algo novo?",
        options: [
          { text: "Resolver um problema real", feedback: "Você cria com propósito." },
          { text: "Expressar uma ideia", feedback: "Você cria pra comunicar." },
          { text: "O prazer de criar", feedback: "Você cria pelo processo." },
          { text: "Ser reconhecido", feedback: "Você cria pra validação." }
        ]
      },
      {
        id: 8,
        question: "Como você organiza suas ideias?",
        options: [
          { text: "De forma estruturada e sistemática", feedback: "Você é organizado." },
          { text: "Deixo fluir naturalmente", feedback: "Você é orgânico." },
          { text: "Uso ferramentas visuais", feedback: "Você é visual." },
          { text: "Não organizo muito", feedback: "Você é caótico." }
        ]
      },
      {
        id: 9,
        question: "Você se considera mais:",
        options: [
          { text: "Visionário (ideias grandes)", feedback: "Você pensa grande." },
          { text: "Executor (tira do papel)", feedback: "Você realiza." },
          { text: "Refinador (melhora o existente)", feedback: "Você aperfeiçoa." },
          { text: "Explorador (testa possibilidades)", feedback: "Você experimenta." }
        ]
      },
      {
        id: 10,
        question: "Como você sabe que uma ideia é boa?",
        options: [
          { text: "Quando resolve um problema real", feedback: "Você valida na prática." },
          { text: "Quando me emociona", feedback: "Você valida no sentir." },
          { text: "Quando outros validam", feedback: "Você valida no externo." },
          { text: "Quando é diferente do comum", feedback: "Você valida na originalidade." }
        ]
      }
    ]
  },
  {
    id: "lideranca",
    title: "Liderança",
    description: "Entenda seu estilo de liderança e influência",
    icon: Target,
    color: "from-indigo-500 to-indigo-700",
    questions: [
      {
        id: 1,
        question: "Como você motiva outras pessoas?",
        options: [
          { text: "Pelo exemplo", feedback: "Você lidera fazendo." },
          { text: "Com palavras inspiradoras", feedback: "Você lidera comunicando." },
          { text: "Reconhecendo conquistas", feedback: "Você lidera valorizando." },
          { text: "Criando desafios", feedback: "Você lidera provocando." }
        ]
      },
      {
        id: 2,
        question: "Diante de um conflito na equipe, você:",
        options: [
          { text: "Medeia buscando consenso", feedback: "Você é conciliador." },
          { text: "Toma uma decisão firme", feedback: "Você é decisivo." },
          { text: "Deixa as partes resolverem", feedback: "Você dá autonomia." },
          { text: "Busco entender todos os lados", feedback: "Você é empático." }
        ]
      },
      {
        id: 3,
        question: "Como você delega tarefas?",
        options: [
          { text: "Confio e dou autonomia total", feedback: "Você empodera." },
          { text: "Acompanho de perto", feedback: "Você supervisiona." },
          { text: "Dou diretrizes claras", feedback: "Você estrutura." },
          { text: "Prefiro fazer eu mesmo", feedback: "Você centraliza." }
        ]
      },
      {
        id: 4,
        question: "O que você valoriza mais em uma equipe?",
        options: [
          { text: "Resultados e eficiência", feedback: "Você é orientado a metas." },
          { text: "Colaboração e harmonia", feedback: "Você é orientado a pessoas." },
          { text: "Inovação e criatividade", feedback: "Você é orientado a ideias." },
          { text: "Comprometimento e lealdade", feedback: "Você é orientado a valores." }
        ]
      },
      {
        id: 5,
        question: "Como você lida com erros da equipe?",
        options: [
          { text: "Vejo como oportunidade de aprendizado", feedback: "Você é educador." },
          { text: "Corrijo e sigo em frente", feedback: "Você é prático." },
          { text: "Analiso para evitar repetição", feedback: "Você é preventivo." },
          { text: "Assumo a responsabilidade", feedback: "Você protege." }
        ]
      },
      {
        id: 6,
        question: "Seu estilo de comunicação é:",
        options: [
          { text: "Direto e objetivo", feedback: "Você é claro." },
          { text: "Inspirador e motivacional", feedback: "Você é carismático." },
          { text: "Consultivo e colaborativo", feedback: "Você é inclusivo." },
          { text: "Estratégico e visionário", feedback: "Você é pensador." }
        ]
      },
      {
        id: 7,
        question: "Como você toma decisões importantes?",
        options: [
          { text: "Consulto a equipe", feedback: "Você é democrático." },
          { text: "Analiso dados e decido", feedback: "Você é analítico." },
          { text: "Confio na minha experiência", feedback: "Você é intuitivo." },
          { text: "Busco consenso", feedback: "Você é conciliador." }
        ]
      },
      {
        id: 8,
        question: "O que te faz um bom líder?",
        options: [
          { text: "Capacidade de inspirar", feedback: "Você mobiliza." },
          { text: "Competência técnica", feedback: "Você ensina." },
          { text: "Empatia e escuta", feedback: "Você acolhe." },
          { text: "Visão estratégica", feedback: "Você direciona." }
        ]
      },
      {
        id: 9,
        question: "Como você desenvolve sua equipe?",
        options: [
          { text: "Dou desafios crescentes", feedback: "Você desenvolve fazendo." },
          { text: "Ofereço feedback constante", feedback: "Você desenvolve orientando." },
          { text: "Crio oportunidades de aprendizado", feedback: "Você desenvolve ensinando." },
          { text: "Dou autonomia para experimentar", feedback: "Você desenvolve liberando." }
        ]
      },
      {
        id: 10,
        question: "Qual seu maior desafio como líder?",
        options: [
          { text: "Equilibrar resultados e pessoas", feedback: "Você busca equilíbrio." },
          { text: "Delegar e confiar", feedback: "Você busca soltar." },
          { text: "Manter a equipe motivada", feedback: "Você busca engajar." },
          { text: "Tomar decisões difíceis", feedback: "Você busca coragem." }
        ]
      }
    ]
  },
  {
    id: "comunicacao",
    title: "Comunicação",
    description: "Descubra seu estilo de comunicação e expressão",
    icon: MessageCircle,
    color: "from-cyan-500 to-cyan-700",
    questions: [
      {
        id: 1,
        question: "Como você prefere se comunicar?",
        options: [
          { text: "Pessoalmente, olho no olho", feedback: "Você valoriza presença." },
          { text: "Por mensagens escritas", feedback: "Você valoriza reflexão." },
          { text: "Por áudio ou vídeo", feedback: "Você valoriza expressão." },
          { text: "Depende da situação", feedback: "Você é adaptável." }
        ]
      },
      {
        id: 2,
        question: "Em uma conversa difícil, você:",
        options: [
          { text: "Vou direto ao ponto", feedback: "Você é direto." },
          { text: "Preparo cuidadosamente o que vou dizer", feedback: "Você é cuidadoso." },
          { text: "Evito ao máximo", feedback: "Você foge." },
          { text: "Busco o momento certo", feedback: "Você é estratégico." }
        ]
      },
      {
        id: 3,
        question: "Como você lida com mal-entendidos?",
        options: [
          { text: "Esclareço imediatamente", feedback: "Você é proativo." },
          { text: "Reflito antes de responder", feedback: "Você é ponderado." },
          { text: "Fico chateado", feedback: "Você é sensível." },
          { text: "Tento entender a perspectiva do outro", feedback: "Você é empático." }
        ]
      },
      {
        id: 4,
        question: "Você se considera um bom ouvinte?",
        options: [
          { text: "Sim, escuto atentamente", feedback: "Você está presente." },
          { text: "Às vezes me distraio", feedback: "Você se dispersa." },
          { text: "Escuto mas já penso na resposta", feedback: "Você antecipa." },
          { text: "Tenho dificuldade em apenas ouvir", feedback: "Você quer falar." }
        ]
      },
      {
        id: 5,
        question: "Como você expressa discordância?",
        options: [
          { text: "De forma clara e respeitosa", feedback: "Você é assertivo." },
          { text: "Evito confronto", feedback: "Você é passivo." },
          { text: "De forma indireta", feedback: "Você é diplomático." },
          { text: "Às vezes de forma agressiva", feedback: "Você se exalta." }
        ]
      },
      {
        id: 6,
        question: "Em grupo, você costuma:",
        options: [
          { text: "Falar bastante e compartilhar ideias", feedback: "Você é expressivo." },
          { text: "Ouvir mais do que falar", feedback: "Você é observador." },
          { text: "Mediar e facilitar a conversa", feedback: "Você é facilitador." },
          { text: "Falar apenas quando necessário", feedback: "Você é seletivo." }
        ]
      },
      {
        id: 7,
        question: "Como você pede ajuda?",
        options: [
          { text: "Diretamente, sem rodeios", feedback: "Você é claro." },
          { text: "Com dificuldade", feedback: "Você se guarda." },
          { text: "Explico bem o contexto", feedback: "Você contextualiza." },
          { text: "Prefiro resolver sozinho", feedback: "Você é independente." }
        ]
      },
      {
        id: 8,
        question: "Você é mais:",
        options: [
          { text: "Objetivo e direto", feedback: "Você é pragmático." },
          { text: "Detalhista e explicativo", feedback: "Você é minucioso." },
          { text: "Emotivo e expressivo", feedback: "Você é intenso." },
          { text: "Conciso e sintético", feedback: "Você é econômico." }
        ]
      },
      {
        id: 9,
        question: "Como você recebe feedback?",
        options: [
          { text: "Agradeço e reflito", feedback: "Você é receptivo." },
          { text: "Fico na defensiva", feedback: "Você se protege." },
          { text: "Peço exemplos específicos", feedback: "Você busca clareza." },
          { text: "Levo pro pessoal", feedback: "Você se machuca." }
        ]
      },
      {
        id: 10,
        question: "Qual seu maior desafio na comunicação?",
        options: [
          { text: "Ser mais claro e objetivo", feedback: "Você se perde." },
          { text: "Ouvir sem interromper", feedback: "Você se adianta." },
          { text: "Expressar emoções", feedback: "Você se guarda." },
          { text: "Lidar com conflitos", feedback: "Você evita." }
        ]
      }
    ]
  },
  {
    id: "proposito",
    title: "Propósito de Vida",
    description: "Explore o que dá sentido e direção à sua vida",
    icon: Wind,
    color: "from-teal-500 to-teal-700",
    questions: [
      {
        id: 1,
        question: "O que te faz sentir que sua vida tem sentido?",
        options: [
          { text: "Contribuir para algo maior", feedback: "Você busca impacto." },
          { text: "Crescer e evoluir constantemente", feedback: "Você busca desenvolvimento." },
          { text: "Ter relacionamentos significativos", feedback: "Você busca conexão." },
          { text: "Realizar meus sonhos pessoais", feedback: "Você busca realização." }
        ]
      },
      {
        id: 2,
        question: "Se pudesse dedicar sua vida a uma causa, seria:",
        options: [
          { text: "Ajudar pessoas necessitadas", feedback: "Você é solidário." },
          { text: "Criar algo inovador", feedback: "Você é criador." },
          { text: "Educar e inspirar", feedback: "Você é educador." },
          { text: "Proteger o meio ambiente", feedback: "Você é guardião." }
        ]
      },
      {
        id: 3,
        question: "O que você gostaria que dissessem sobre você?",
        options: [
          { text: "Que fiz diferença na vida das pessoas", feedback: "Você valoriza impacto." },
          { text: "Que fui autêntico e verdadeiro", feedback: "Você valoriza autenticidade." },
          { text: "Que alcancei grandes feitos", feedback: "Você valoriza conquistas." },
          { text: "Que vivi intensamente", feedback: "Você valoriza experiência." }
        ]
      },
      {
        id: 4,
        question: "O que te deixa mais realizado?",
        options: [
          { text: "Ver outras pessoas felizes por minha causa", feedback: "Você se realiza no outro." },
          { text: "Superar meus próprios limites", feedback: "Você se realiza no desafio." },
          { text: "Criar algo do zero", feedback: "Você se realiza na criação." },
          { text: "Estar em paz comigo mesmo", feedback: "Você se realiza no ser." }
        ]
      },
      {
        id: 5,
        question: "Como você quer ser lembrado?",
        options: [
          { text: "Pelo bem que fiz", feedback: "Você quer deixar legado." },
          { text: "Pela minha essência", feedback: "Você quer ser autêntico." },
          { text: "Pelas minhas conquistas", feedback: "Você quer ser admirado." },
          { text: "Pelo amor que compartilhei", feedback: "Você quer ser amado." }
        ]
      },
      {
        id: 6,
        question: "O que te tira da cama todos os dias?",
        options: [
          { text: "Meus objetivos e sonhos", feedback: "Você é movido por metas." },
          { text: "As pessoas que amo", feedback: "Você é movido por afeto." },
          { text: "Curiosidade pelo novo dia", feedback: "Você é movido por descoberta." },
          { text: "Responsabilidades", feedback: "Você é movido por dever." }
        ]
      },
      {
        id: 7,
        question: "Se tivesse recursos ilimitados, você:",
        options: [
          { text: "Criaria projetos de impacto social", feedback: "Você busca transformar." },
          { text: "Viveria experiências pelo mundo", feedback: "Você busca viver." },
          { text: "Desenvolveria seus talentos", feedback: "Você busca excelência." },
          { text: "Cuidaria de quem amo", feedback: "Você busca cuidar." }
        ]
      },
      {
        id: 8,
        question: "O que te faz sentir vivo?",
        options: [
          { text: "Desafios e superações", feedback: "Você vive na intensidade." },
          { text: "Conexões profundas", feedback: "Você vive na relação." },
          { text: "Momentos de criação", feedback: "Você vive na expressão." },
          { text: "Paz e tranquilidade", feedback: "Você vive na serenidade." }
        ]
      },
      {
        id: 9,
        question: "Qual seu maior medo existencial?",
        options: [
          { text: "Não fazer diferença", feedback: "Você teme irrelevância." },
          { text: "Não ser autêntico", feedback: "Você teme falsidade." },
          { text: "Não realizar meu potencial", feedback: "Você teme desperdício." },
          { text: "Morrer sem ter vivido", feedback: "Você teme vazio." }
        ]
      },
      {
        id: 10,
        question: "O que define uma vida bem vivida pra você?",
        options: [
          { text: "Ter contribuído positivamente", feedback: "Você valoriza legado." },
          { text: "Ter sido fiel a mim mesmo", feedback: "Você valoriza autenticidade." },
          { text: "Ter amado e sido amado", feedback: "Você valoriza amor." },
          { text: "Ter vivido plenamente", feedback: "Você valoriza experiência." }
        ]
      }
    ]
  },
  {
    id: "gestao-tempo",
    title: "Gestão de Tempo",
    description: "Entenda como você organiza e prioriza seu tempo",
    icon: TrendingUp,
    color: "from-red-500 to-red-700",
    questions: [
      {
        id: 1,
        question: "Como você planeja seu dia?",
        options: [
          { text: "Faço lista detalhada de tarefas", feedback: "Você é estruturado." },
          { text: "Tenho ideia geral do que fazer", feedback: "Você é flexível." },
          { text: "Vou fazendo conforme surge", feedback: "Você é espontâneo." },
          { text: "Uso ferramentas de produtividade", feedback: "Você é sistemático." }
        ]
      },
      {
        id: 2,
        question: "Como você lida com prazos?",
        options: [
          { text: "Começo com antecedência", feedback: "Você é preventivo." },
          { text: "Trabalho melhor sob pressão", feedback: "Você é reativo." },
          { text: "Distribuo o trabalho ao longo do tempo", feedback: "Você é equilibrado." },
          { text: "Frequentemente atraso", feedback: "Você procrastina." }
        ]
      },
      {
        id: 3,
        question: "O que mais consome seu tempo?",
        options: [
          { text: "Trabalho e responsabilidades", feedback: "Você prioriza dever." },
          { text: "Redes sociais e entretenimento", feedback: "Você se distrai." },
          { text: "Relacionamentos e pessoas", feedback: "Você prioriza conexão." },
          { text: "Desenvolvimento pessoal", feedback: "Você prioriza crescimento." }
        ]
      },
      {
        id: 4,
        question: "Como você prioriza tarefas?",
        options: [
          { text: "Pelo que é mais urgente", feedback: "Você é urgente." },
          { text: "Pelo que é mais importante", feedback: "Você é estratégico." },
          { text: "Pelo que é mais fácil", feedback: "Você busca momentum." },
          { text: "Pelo que me dá mais prazer", feedback: "Você busca satisfação." }
        ]
      },
      {
        id: 5,
        question: "Você consegue dizer não?",
        options: [
          { text: "Sim, quando necessário", feedback: "Você tem limites." },
          { text: "Tenho dificuldade", feedback: "Você se sobrecarrega." },
          { text: "Depende de quem pede", feedback: "Você é seletivo." },
          { text: "Raramente digo não", feedback: "Você se doa demais." }
        ]
      },
      {
        id: 6,
        question: "Como você lida com interrupções?",
        options: [
          { text: "Me adaptou e retomo depois", feedback: "Você é flexível." },
          { text: "Fico irritado", feedback: "Você valoriza foco." },
          { text: "Estabeleço momentos sem interrupção", feedback: "Você se protege." },
          { text: "Não me incomodo muito", feedback: "Você é tranquilo." }
        ]
      },
      {
        id: 7,
        question: "Você reserva tempo para você?",
        options: [
          { text: "Sim, é prioridade", feedback: "Você se cuida." },
          { text: "Quando sobra tempo", feedback: "Você se negligencia." },
          { text: "Tento mas nem sempre consigo", feedback: "Você se esforça." },
          { text: "Raramente", feedback: "Você se esquece." }
        ]
      },
      {
        id: 8,
        question: "Como você lida com multitarefas?",
        options: [
          { text: "Consigo fazer várias coisas ao mesmo tempo", feedback: "Você é multitarefa." },
          { text: "Prefiro focar em uma coisa por vez", feedback: "Você é focado." },
          { text: "Depende da complexidade", feedback: "Você avalia." },
          { text: "Acabo não fazendo nada bem", feedback: "Você se dispersa." }
        ]
      },
      {
        id: 9,
        question: "Qual seu maior desafio com tempo?",
        options: [
          { text: "Procrastinação", feedback: "Você adia." },
          { text: "Falta de planejamento", feedback: "Você se desorganiza." },
          { text: "Excesso de compromissos", feedback: "Você se sobrecarrega." },
          { text: "Dificuldade em priorizar", feedback: "Você se confunde." }
        ]
      },
      {
        id: 10,
        question: "Como você se sente em relação ao seu tempo?",
        options: [
          { text: "Tenho controle sobre ele", feedback: "Você é empoderado." },
          { text: "Nunca tenho tempo suficiente", feedback: "Você se pressiona." },
          { text: "Equilibrado na maioria das vezes", feedback: "Você está bem." },
          { text: "Perdido e desorganizado", feedback: "Você precisa de estrutura." }
        ]
      }
    ]
  },
  {
    id: "valores",
    title: "Valores Pessoais",
    description: "Identifique o que realmente importa para você",
    icon: Zap,
    color: "from-violet-500 to-violet-700",
    questions: [
      {
        id: 1,
        question: "O que você não abre mão na sua vida?",
        options: [
          { text: "Honestidade e integridade", feedback: "Você valoriza verdade." },
          { text: "Liberdade e autonomia", feedback: "Você valoriza independência." },
          { text: "Família e relacionamentos", feedback: "Você valoriza conexão." },
          { text: "Crescimento e evolução", feedback: "Você valoriza desenvolvimento." }
        ]
      },
      {
        id: 2,
        question: "O que te deixa mais indignado?",
        options: [
          { text: "Injustiça e desigualdade", feedback: "Você valoriza justiça." },
          { text: "Desonestidade e mentira", feedback: "Você valoriza verdade." },
          { text: "Desrespeito e falta de empatia", feedback: "Você valoriza respeito." },
          { text: "Desperdício e irresponsabilidade", feedback: "Você valoriza responsabilidade." }
        ]
      },
      {
        id: 3,
        question: "Como você toma decisões éticas?",
        options: [
          { text: "Pelo que é certo, independente das consequências", feedback: "Você é principista." },
          { text: "Pelo que causa menos dano", feedback: "Você é consequencialista." },
          { text: "Pelo que meu coração diz", feedback: "Você é intuitivo." },
          { text: "Pelo que a maioria considera certo", feedback: "Você é social." }
        ]
      },
      {
        id: 4,
        question: "O que define uma pessoa de caráter pra você?",
        options: [
          { text: "Coerência entre fala e ação", feedback: "Você valoriza integridade." },
          { text: "Capacidade de assumir erros", feedback: "Você valoriza humildade." },
          { text: "Respeito pelos outros", feedback: "Você valoriza empatia." },
          { text: "Compromisso com a verdade", feedback: "Você valoriza honestidade." }
        ]
      },
      {
        id: 5,
        question: "O que você admira nas pessoas?",
        options: [
          { text: "Autenticidade", feedback: "Você valoriza genuinidade." },
          { text: "Coragem", feedback: "Você valoriza bravura." },
          { text: "Generosidade", feedback: "Você valoriza doação." },
          { text: "Sabedoria", feedback: "Você valoriza conhecimento." }
        ]
      },
      {
        id: 6,
        question: "Como você quer ser visto pelos outros?",
        options: [
          { text: "Como alguém confiável", feedback: "Você valoriza confiança." },
          { text: "Como alguém inspirador", feedback: "Você valoriza impacto." },
          { text: "Como alguém autêntico", feedback: "Você valoriza verdade." },
          { text: "Como alguém competente", feedback: "Você valoriza excelência." }
        ]
      },
      {
        id: 7,
        question: "O que te faz perder o respeito por alguém?",
        options: [
          { text: "Mentira e falsidade", feedback: "Você não tolera desonestidade." },
          { text: "Deslealdade", feedback: "Você não tolera traição." },
          { text: "Falta de palavra", feedback: "Você não tolera irresponsabilidade." },
          { text: "Desrespeito", feedback: "Você não tolera desconsideração." }
        ]
      },
      {
        id: 8,
        question: "Como você lida com dilemas morais?",
        options: [
          { text: "Sigo meus princípios", feedback: "Você é firme." },
          { text: "Avalio caso a caso", feedback: "Você é contextual." },
          { text: "Busco conselho", feedback: "Você é prudente." },
          { text: "Sigo meu coração", feedback: "Você é emocional." }
        ]
      },
      {
        id: 9,
        question: "O que define sucesso pra você?",
        options: [
          { text: "Viver de acordo com meus valores", feedback: "Você valoriza coerência." },
          { text: "Fazer diferença no mundo", feedback: "Você valoriza impacto." },
          { text: "Ser feliz e em paz", feedback: "Você valoriza bem-estar." },
          { text: "Realizar meus sonhos", feedback: "Você valoriza realização." }
        ]
      },
      {
        id: 10,
        question: "O que você não faria por dinheiro?",
        options: [
          { text: "Comprometer meus valores", feedback: "Você tem princípios." },
          { text: "Prejudicar outras pessoas", feedback: "Você tem empatia." },
          { text: "Mentir ou enganar", feedback: "Você tem integridade." },
          { text: "Abrir mão da minha liberdade", feedback: "Você tem autonomia." }
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
  const [showPaywall, setShowPaywall] = useState(false);

  const { isSubscribed, loading: subscriptionLoading } = useSubscription(userId);

  const handleSelectQuiz = (quiz: Quiz) => {
    // VERIFICAR ASSINATURA ANTES DE INICIAR QUIZ
    if (!subscriptionLoading && !isSubscribed) {
      setShowPaywall(true);
      return;
    }

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
      },
      resiliencia: {
        title: "Seu Perfil de Resiliência",
        characteristics: [
          "Você demonstra capacidade de adaptação",
          "Tem consciência de seus recursos internos",
          "Reconhece seus padrões de superação"
        ],
        strengths: [
          "Capacidade de se recuperar de adversidades",
          "Flexibilidade diante de mudanças",
          "Consciência de suas estratégias de enfrentamento"
        ],
        attentionPoints: [
          "Continue desenvolvendo recursos de enfrentamento",
          "Pratique autocuidado em momentos difíceis",
          "Busque apoio quando necessário"
        ]
      },
      criatividade: {
        title: "Seu Perfil Criativo",
        characteristics: [
          "Você tem consciência do seu processo criativo",
          "Reconhece suas fontes de inspiração",
          "Entende como suas ideias surgem"
        ],
        strengths: [
          "Capacidade de pensar de forma original",
          "Abertura para experimentação",
          "Consciência de seus bloqueios e facilitadores"
        ],
        attentionPoints: [
          "Continue explorando novas formas de criar",
          "Pratique regularmente sua criatividade",
          "Busque ambientes que estimulem suas ideias"
        ]
      },
      lideranca: {
        title: "Seu Estilo de Liderança",
        characteristics: [
          "Você tem consciência do seu estilo de influência",
          "Reconhece como motiva outras pessoas",
          "Entende seus pontos fortes como líder"
        ],
        strengths: [
          "Capacidade de inspirar e mobilizar",
          "Consciência de como toma decisões",
          "Clareza sobre seus valores de liderança"
        ],
        attentionPoints: [
          "Continue desenvolvendo suas habilidades de liderança",
          "Pratique escuta ativa com sua equipe",
          "Busque feedback sobre seu estilo"
        ]
      },
      comunicacao: {
        title: "Seu Estilo de Comunicação",
        characteristics: [
          "Você tem consciência de como se expressa",
          "Reconhece seus padrões de comunicação",
          "Entende como se relaciona através da palavra"
        ],
        strengths: [
          "Capacidade de se expressar",
          "Consciência de como ouve os outros",
          "Clareza sobre seus desafios comunicacionais"
        ],
        attentionPoints: [
          "Continue praticando escuta ativa",
          "Desenvolva clareza na expressão",
          "Busque feedback sobre como se comunica"
        ]
      },
      proposito: {
        title: "Seu Senso de Propósito",
        characteristics: [
          "Você tem consciência do que dá sentido à sua vida",
          "Reconhece seus valores mais profundos",
          "Entende o que te move existencialmente"
        ],
        strengths: [
          "Clareza sobre o que importa pra você",
          "Consciência de seus valores essenciais",
          "Capacidade de refletir sobre sentido"
        ],
        attentionPoints: [
          "Continue explorando seu propósito",
          "Alinhe suas ações com seus valores",
          "Busque experiências que deem sentido"
        ]
      },
      "gestao-tempo": {
        title: "Seu Estilo de Gestão de Tempo",
        characteristics: [
          "Você tem consciência de como usa seu tempo",
          "Reconhece seus padrões de organização",
          "Entende seus desafios com produtividade"
        ],
        strengths: [
          "Consciência de suas prioridades",
          "Clareza sobre o que consome seu tempo",
          "Capacidade de identificar melhorias"
        ],
        attentionPoints: [
          "Continue desenvolvendo organização",
          "Pratique priorização consciente",
          "Busque equilíbrio entre fazer e ser"
        ]
      },
      valores: {
        title: "Seus Valores Essenciais",
        characteristics: [
          "Você tem clareza sobre o que não abre mão",
          "Reconhece seus princípios fundamentais",
          "Entende o que te guia eticamente"
        ],
        strengths: [
          "Firmeza em seus valores",
          "Consciência de seus princípios",
          "Capacidade de agir com integridade"
        ],
        attentionPoints: [
          "Continue vivendo de acordo com seus valores",
          "Pratique coerência entre fala e ação",
          "Busque ambientes alinhados com seus princípios"
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
      {/* Paywall */}
      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          trigger="quiz"
        />
      )}

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
