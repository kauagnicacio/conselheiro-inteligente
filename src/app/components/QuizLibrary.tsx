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
  },
  {
    id: "pressao",
    title: "Como Reage Sob Pressão",
    description: "Seu comportamento em momentos de estresse e urgência",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
    questions: [
      {
        id: 1,
        question: "Quando tem um prazo apertado, você:",
        options: [
          { text: "Trabalho melhor sob pressão", feedback: "Pressão te ativa." },
          { text: "Planejo e divido em etapas", feedback: "Você se organiza." },
          { text: "Fico ansioso mas entrego", feedback: "Você aguenta." },
          { text: "Procrastino até o último momento", feedback: "Você evita." }
        ]
      },
      {
        id: 2,
        question: "Em uma crise, você:",
        options: [
          { text: "Assumo o controle e lidero", feedback: "Você se fortalece." },
          { text: "Mantenho a calma e analiso", feedback: "Você racionaliza." },
          { text: "Busco apoio dos outros", feedback: "Você se conecta." },
          { text: "Sinto-me paralisado", feedback: "Você trava." }
        ]
      },
      {
        id: 3,
        question: "Quando várias coisas vão mal ao mesmo tempo:",
        options: [
          { text: "Priorizo e resolvo uma de cada vez", feedback: "Você mantém clareza." },
          { text: "Fico sobrecarregado", feedback: "Você se perde." },
          { text: "Delego ou peço ajuda", feedback: "Você reconhece limites." },
          { text: "Entro em modo sobrevivência", feedback: "Você se protege." }
        ]
      },
      {
        id: 4,
        question: "Sob estresse prolongado, você:",
        options: [
          { text: "Mantenho a performance", feedback: "Você aguenta bem." },
          { text: "Começo a cometer mais erros", feedback: "Você se desgasta." },
          { text: "Fico irritado e impaciente", feedback: "Você se desregula." },
          { text: "Me fecho e me isolo", feedback: "Você se recolhe." }
        ]
      },
      {
        id: 5,
        question: "Quando você está sobrecarregado:",
        options: [
          { text: "Continuo até terminar tudo", feedback: "Você persiste." },
          { text: "Peço ajuda ou extensão", feedback: "Você comunica limites." },
          { text: "Faço o que consigo", feedback: "Você é realista." },
          { text: "Entro em pânico", feedback: "Você se desorganiza." }
        ]
      },
      {
        id: 6,
        question: "Depois de um período intenso, você:",
        options: [
          { text: "Já parto para a próxima coisa", feedback: "Você não para." },
          { text: "Preciso de tempo para recuperar", feedback: "Você respeita limites." },
          { text: "Fico exausto por dias", feedback: "Você se esgota." },
          { text: "Reflito sobre o que aprendi", feedback: "Você processa." }
        ]
      },
      {
        id: 7,
        question: "Quando alguém te pressiona por resultados:",
        options: [
          { text: "Me motivo e entrego", feedback: "Pressão externa te ativa." },
          { text: "Fico ansioso e com medo", feedback: "Você sente o peso." },
          { text: "Comunico o que é realista", feedback: "Você estabelece limites." },
          { text: "Me rebelo internamente", feedback: "Você resiste." }
        ]
      },
      {
        id: 8,
        question: "Em situações de emergência, você:",
        options: [
          { text: "Ajo rápido e decisivamente", feedback: "Você não trava." },
          { text: "Fico calmo e penso antes", feedback: "Você mantém clareza." },
          { text: "Sigo instruções de quem sabe", feedback: "Você reconhece limites." },
          { text: "Congelo e não sei o que fazer", feedback: "Você paralisa." }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade sob pressão é:",
        options: [
          { text: "Manter a calma", feedback: "Emoções ficam intensas." },
          { text: "Não me cobrar demais", feedback: "Você é duro consigo." },
          { text: "Pedir ajuda quando preciso", feedback: "Você tenta sozinho." },
          { text: "Não procrastinar", feedback: "Você evita." }
        ]
      },
      {
        id: 10,
        question: "Depois de uma situação de alta pressão:",
        options: [
          { text: "Sinto orgulho de ter conseguido", feedback: "Você reconhece capacidade." },
          { text: "Fico exausto e preciso de tempo", feedback: "Você se esgota." },
          { text: "Analiso o que poderia melhorar", feedback: "Você busca crescer." },
          { text: "Evito situações parecidas", feedback: "Você se protege." }
        ]
      }
    ]
  },
  {
    id: "comunicacao",
    title: "Comunicação Emocional",
    description: "Como você se expressa quando as coisas ficam tensas",
    icon: MessageCircle,
    color: "from-cyan-500 to-blue-600",
    questions: [
      {
        id: 1,
        question: "Em uma discussão acalorada, você:",
        options: [
          { text: "Falo o que penso diretamente", feedback: "Você é direto." },
          { text: "Me calo para não piorar", feedback: "Você se protege." },
          { text: "Tento acalmar a situação", feedback: "Você busca paz." },
          { text: "Saio da situação", feedback: "Você se afasta." }
        ]
      },
      {
        id: 2,
        question: "Quando precisa dar uma notícia difícil:",
        options: [
          { text: "Falo diretamente, sem rodeios", feedback: "Você é honesto." },
          { text: "Preparo o terreno antes", feedback: "Você é cuidadoso." },
          { text: "Evito ou adia", feedback: "Você foge." },
          { text: "Peço ajuda de outra pessoa", feedback: "Você delega." }
        ]
      },
      {
        id: 3,
        question: "Quando alguém te magoa, você:",
        options: [
          { text: "Falo imediatamente", feedback: "Você comunica." },
          { text: "Guardo e processo sozinho", feedback: "Você internaliza." },
          { text: "Demonstro através do comportamento", feedback: "Você comunica indiretamente." },
          { text: "Finjo que está tudo bem", feedback: "Você esconde." }
        ]
      },
      {
        id: 4,
        question: "Sua comunicação sob estresse é:",
        options: [
          { text: "Clara e direta", feedback: "Você mantém clareza." },
          { text: "Confusa e desorganizada", feedback: "Você se desorganiza." },
          { text: "Agressiva ou defensiva", feedback: "Você se protege atacando." },
          { text: "Travada, não consigo me expressar", feedback: "Você paralisa." }
        ]
      },
      {
        id: 5,
        question: "Quando você discorda de alguém:",
        options: [
          { text: "Expresso minha opinião claramente", feedback: "Você se posiciona." },
          { text: "Evito confronto e concordo", feedback: "Você cede." },
          { text: "Busco entender o outro primeiro", feedback: "Você prioriza compreensão." },
          { text: "Me afasto da conversa", feedback: "Você evita." }
        ]
      },
      {
        id: 6,
        question: "Quando você precisa pedir ajuda:",
        options: [
          { text: "Peço sem problemas", feedback: "Você reconhece limites." },
          { text: "Tenho muita dificuldade", feedback: "Você se força sozinho." },
          { text: "Só peço em último caso", feedback: "Você resiste." },
          { text: "Comunico claramente", feedback: "Você é direto." }
        ]
      },
      {
        id: 7,
        question: "Quando alguém te critica:",
        options: [
          { text: "Ouço e considero", feedback: "Você é aberto." },
          { text: "Me defendo imediatamente", feedback: "Você se protege." },
          { text: "Fico magoado e me fecho", feedback: "Você se retrai." },
          { text: "Busco entender a intenção", feedback: "Você analisa." }
        ]
      },
      {
        id: 8,
        question: "Em conflitos, você tende a:",
        options: [
          { text: "Buscar resolução rápida", feedback: "Você não deixa arrastar." },
          { text: "Evitar até não ter escolha", feedback: "Você adia." },
          { text: "Analisar todos os lados", feedback: "Você é cuidadoso." },
          { text: "Ceder para manter a paz", feedback: "Você prioriza harmonia." }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade em comunicação é:",
        options: [
          { text: "Expressar o que realmente sinto", feedback: "Você trava." },
          { text: "Não ser agressivo quando irritado", feedback: "Você desloca raiva." },
          { text: "Ouvir sem interromper", feedback: "Você tem dificuldade em escutar." },
          { text: "Encontrar o momento certo", feedback: "Você tem dificuldade com timing." }
        ]
      },
      {
        id: 10,
        question: "Depois de uma conversa difícil:",
        options: [
          { text: "Sinto alívio por ter falado", feedback: "Você valoriza expressão." },
          { text: "Fico remoendo o que disse", feedback: "Você se questiona." },
          { text: "Analiso o que poderia melhorar", feedback: "Você busca crescer." },
          { text: "Evito situações parecidas", feedback: "Você se protege." }
        ]
      }
    ]
  },
  {
    id: "tomada-decisao",
    title: "Tomada de Decisão",
    description: "Como você decide e o que influencia suas escolhas",
    icon: Target,
    color: "from-indigo-500 to-purple-600",
    questions: [
      {
        id: 1,
        question: "Ao tomar uma decisão importante, você:",
        options: [
          { text: "Sigo minha intuição", feedback: "Você confia no que sente." },
          { text: "Faço listas de prós e contras", feedback: "Você analisa racionalmente." },
          { text: "Peço conselhos", feedback: "Você busca perspectivas." },
          { text: "Demoro muito para decidir", feedback: "Você tem dificuldade." }
        ]
      },
      {
        id: 2,
        question: "Você se arrepende de decisões:",
        options: [
          { text: "Raramente, aceito consequências", feedback: "Você assume escolhas." },
          { text: "Às vezes, mas aprendo", feedback: "Você transforma em aprendizado." },
          { text: "Frequentemente, fico remoendo", feedback: "Você carrega arrependimento." },
          { text: "Evito decidir para não me arrepender", feedback: "Você paralisa com medo." }
        ]
      },
      {
        id: 3,
        question: "Quando precisa decidir rápido:",
        options: [
          { text: "Confio no meu instinto", feedback: "Você age sem pensar muito." },
          { text: "Fico ansioso e inseguro", feedback: "Pressão te desestabiliza." },
          { text: "Analiso rapidamente e decido", feedback: "Você equilibra velocidade e análise." },
          { text: "Prefiro adiar se possível", feedback: "Você evita." }
        ]
      },
      {
        id: 4,
        question: "O que mais te influencia em decisões:",
        options: [
          { text: "Meus valores e princípios", feedback: "Você tem clareza." },
          { text: "O que os outros vão pensar", feedback: "Você se preocupa com julgamento." },
          { text: "Consequências práticas", feedback: "Você é pragmático." },
          { text: "O que sinto no momento", feedback: "Você decide pelo que sente." }
        ]
      },
      {
        id: 5,
        question: "Quando uma decisão dá errado:",
        options: [
          { text: "Assumo e busco consertar", feedback: "Você age para reparar." },
          { text: "Me culpo intensamente", feedback: "Você é duro consigo." },
          { text: "Analiso o que aprendi", feedback: "Você transforma em aprendizado." },
          { text: "Culpo circunstâncias externas", feedback: "Você externaliza." }
        ]
      },
      {
        id: 6,
        question: "Em decisões que afetam outros:",
        options: [
          { text: "Priorizo o bem coletivo", feedback: "Você pensa no grupo." },
          { text: "Equilibro interesses", feedback: "Você busca equilíbrio." },
          { text: "Priorizo minhas necessidades", feedback: "Você se coloca primeiro." },
          { text: "Fico paralisado pelo peso", feedback: "Você sente o peso." }
        ]
      },
      {
        id: 7,
        question: "Sobre mudanças grandes na vida:",
        options: [
          { text: "Abraço com entusiasmo", feedback: "Você não tem medo." },
          { text: "Resisto e prefiro estabilidade", feedback: "Você valoriza segurança." },
          { text: "Aceito quando necessário", feedback: "Você é pragmático." },
          { text: "Fico ansioso e inseguro", feedback: "Mudança te desestabiliza." }
        ]
      },
      {
        id: 8,
        question: "Quando tem que escolher entre segurança e risco:",
        options: [
          { text: "Escolho o risco se acredito", feedback: "Você arrisca." },
          { text: "Sempre escolho segurança", feedback: "Você se protege." },
          { text: "Analiso cuidadosamente", feedback: "Você equilibra." },
          { text: "Fico paralisado", feedback: "Você trava." }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade em decisões é:",
        options: [
          { text: "Lidar com possibilidade de errar", feedback: "Você tem medo de falhar." },
          { text: "Saber o que eu realmente quero", feedback: "Você tem dificuldade em se conectar." },
          { text: "Não me deixar influenciar", feedback: "Você se deixa afetar." },
          { text: "Agir depois de decidir", feedback: "Você decide mas não age." }
        ]
      },
      {
        id: 10,
        question: "Depois de tomar uma decisão importante:",
        options: [
          { text: "Sigo em frente sem olhar para trás", feedback: "Você não fica remoendo." },
          { text: "Fico questionando se fiz certo", feedback: "Você duvida." },
          { text: "Observo resultados e ajusto", feedback: "Você é flexível." },
          { text: "Sinto alívio por ter decidido", feedback: "Você valoriza fechamento." }
        ]
      }
    ]
  },
  {
    id: "ansiedade-social",
    title: "Ansiedade Social",
    description: "Como você se sente em situações sociais",
    icon: Users,
    color: "from-teal-500 to-green-600",
    questions: [
      {
        id: 1,
        question: "Em eventos sociais com muitas pessoas:",
        options: [
          { text: "Me sinto energizado", feedback: "Você se alimenta de interação." },
          { text: "Fico confortável depois de um tempo", feedback: "Você precisa se aquecer." },
          { text: "Fico ansioso e desconfortável", feedback: "Multidões te estressam." },
          { text: "Evito ao máximo", feedback: "Você foge de situações sociais." }
        ]
      },
      {
        id: 2,
        question: "Quando precisa falar em público:",
        options: [
          { text: "Fico tranquilo e confiante", feedback: "Você se sente à vontade." },
          { text: "Fico nervoso mas consigo", feedback: "Você aguenta." },
          { text: "Fico muito ansioso", feedback: "Exposição te paralisa." },
          { text: "Evito a qualquer custo", feedback: "Você foge." }
        ]
      },
      {
        id: 3,
        question: "Ao conhecer pessoas novas:",
        options: [
          { text: "Me abro facilmente", feedback: "Você é extrovertido." },
          { text: "Sou cauteloso no início", feedback: "Você observa primeiro." },
          { text: "Fico muito tímido", feedback: "Você se fecha." },
          { text: "Sinto muita ansiedade", feedback: "Novo te desestabiliza." }
        ]
      },
      {
        id: 4,
        question: "Quando todos olham para você:",
        options: [
          { text: "Não me incomodo", feedback: "Você não se intimida." },
          { text: "Fico um pouco desconfortável", feedback: "Você sente leve desconforto." },
          { text: "Fico muito ansioso", feedback: "Atenção te paralisa." },
          { text: "Quero desaparecer", feedback: "Você se sente exposto." }
        ]
      },
      {
        id: 5,
        question: "Em conversas em grupo:",
        options: [
          { text: "Participo ativamente", feedback: "Você se envolve." },
          { text: "Ouço mais do que falo", feedback: "Você observa." },
          { text: "Fico quieto e desconfortável", feedback: "Você se retrai." },
          { text: "Evito participar", feedback: "Você se isola." }
        ]
      },
      {
        id: 6,
        question: "Quando precisa pedir algo a estranhos:",
        options: [
          { text: "Faço sem problemas", feedback: "Você não se intimida." },
          { text: "Fico um pouco nervoso", feedback: "Você sente leve ansiedade." },
          { text: "Fico muito ansioso", feedback: "Interação te estresa." },
          { text: "Evito ou peço ajuda", feedback: "Você foge." }
        ]
      },
      {
        id: 7,
        question: "Depois de interações sociais:",
        options: [
          { text: "Me sinto energizado", feedback: "Você recarrega com pessoas." },
          { text: "Fico neutro", feedback: "Você não se afeta muito." },
          { text: "Preciso de tempo sozinho", feedback: "Você precisa recuperar." },
          { text: "Fico exausto por dias", feedback: "Interação te esgota." }
        ]
      },
      {
        id: 8,
        question: "Quando alguém te elogia em público:",
        options: [
          { text: "Aceito com naturalidade", feedback: "Você não se intimida." },
          { text: "Fico um pouco sem jeito", feedback: "Você sente leve desconforto." },
          { text: "Fico muito desconfortável", feedback: "Atenção te constrange." },
          { text: "Quero que acabe logo", feedback: "Você se sente exposto." }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade em situações sociais:",
        options: [
          { text: "Não tenho dificuldades", feedback: "Você se sente à vontade." },
          { text: "Iniciar conversas", feedback: "Você tem dificuldade em começar." },
          { text: "Manter conversas", feedback: "Você trava." },
          { text: "Estar presente", feedback: "Você quer fugir." }
        ]
      },
      {
        id: 10,
        question: "Quando precisa ir a um evento sozinho:",
        options: [
          { text: "Vou tranquilo", feedback: "Você não precisa de companhia." },
          { text: "Vou mas fico um pouco ansioso", feedback: "Você sente leve desconforto." },
          { text: "Fico muito ansioso", feedback: "Solidão social te estresa." },
          { text: "Não vou", feedback: "Você evita." }
        ]
      }
    ]
  },
  {
    id: "procrastinacao",
    title: "Gestão de Tempo e Procrastinação",
    description: "Como você lida com tarefas e prazos",
    icon: TrendingUp,
    color: "from-red-500 to-pink-600",
    questions: [
      {
        id: 1,
        question: "Quando tem uma tarefa importante:",
        options: [
          { text: "Faço logo", feedback: "Você não adia." },
          { text: "Planejo quando vou fazer", feedback: "Você se organiza." },
          { text: "Fico adiando", feedback: "Você procrastina." },
          { text: "Deixo para última hora", feedback: "Você evita até não ter escolha." }
        ]
      },
      {
        id: 2,
        question: "Sua relação com prazos é:",
        options: [
          { text: "Entrego sempre antes", feedback: "Você é adiantado." },
          { text: "Entrego no prazo", feedback: "Você cumpre." },
          { text: "Entrego em cima da hora", feedback: "Você deixa para última hora." },
          { text: "Frequentemente atraso", feedback: "Você não consegue cumprir." }
        ]
      },
      {
        id: 3,
        question: "Quando você procrastina:",
        options: [
          { text: "Raramente procrastino", feedback: "Você é disciplinado." },
          { text: "Procrastino mas entrego", feedback: "Você aguenta." },
          { text: "Procrastino e me sinto culpado", feedback: "Você carrega peso." },
          { text: "Procrastino constantemente", feedback: "Você tem dificuldade." }
        ]
      },
      {
        id: 4,
        question: "O que mais te faz procrastinar:",
        options: [
          { text: "Não procrastino muito", feedback: "Você é focado." },
          { text: "Tarefas chatas ou difíceis", feedback: "Você evita desconforto." },
          { text: "Medo de não fazer bem", feedback: "Você tem medo de falhar." },
          { text: "Falta de motivação", feedback: "Você não se conecta." }
        ]
      },
      {
        id: 5,
        question: "Como você organiza seu tempo:",
        options: [
          { text: "Tenho rotina estruturada", feedback: "Você se organiza." },
          { text: "Planejo mas nem sempre sigo", feedback: "Você tem dificuldade em executar." },
          { text: "Vou fazendo conforme surge", feedback: "Você é espontâneo." },
          { text: "Não consigo me organizar", feedback: "Você se perde." }
        ]
      },
      {
        id: 6,
        question: "Quando tem muitas tarefas:",
        options: [
          { text: "Priorizo e faço uma de cada vez", feedback: "Você mantém clareza." },
          { text: "Faço várias ao mesmo tempo", feedback: "Você se dispersa." },
          { text: "Fico paralisado", feedback: "Você trava." },
          { text: "Evito pensar nisso", feedback: "Você foge." }
        ]
      },
      {
        id: 7,
        question: "Sobre distrações:",
        options: [
          { text: "Consigo manter foco", feedback: "Você é disciplinado." },
          { text: "Me distraio mas volco", feedback: "Você se recupera." },
          { text: "Me distraio facilmente", feedback: "Você perde foco." },
          { text: "Busco distrações ativamente", feedback: "Você evita tarefas." }
        ]
      },
      {
        id: 8,
        question: "Quando termina uma tarefa:",
        options: [
          { text: "Parto para a próxima", feedback: "Você não para." },
          { text: "Faço uma pausa", feedback: "Você se recompensa." },
          { text: "Procrastino a próxima", feedback: "Você se esgota." },
          { text: "Fico exausto", feedback: "Você se desgasta." }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade com tempo:",
        options: [
          { text: "Não tenho dificuldades", feedback: "Você se organiza bem." },
          { text: "Começar tarefas", feedback: "Você tem dificuldade em iniciar." },
          { text: "Manter consistência", feedback: "Você oscila." },
          { text: "Cumprir prazos", feedback: "Você não consegue entregar." }
        ]
      },
      {
        id: 10,
        question: "Quando você não cumpre um prazo:",
        options: [
          { text: "Raramente acontece", feedback: "Você é confiável." },
          { text: "Me sinto mal mas aprendo", feedback: "Você processa." },
          { text: "Me culpo intensamente", feedback: "Você carrega peso." },
          { text: "Acontece com frequência", feedback: "Você tem dificuldade." }
        ]
      }
    ]
  },
  {
    id: "autoestima",
    title: "Autoestima e Autocrítica",
    description: "Como você se vê e se trata",
    icon: Shield,
    color: "from-violet-500 to-purple-600",
    questions: [
      {
        id: 1,
        question: "Quando você comete um erro:",
        options: [
          { text: "Me perdoo e sigo em frente", feedback: "Você é gentil consigo." },
          { text: "Fico me cobrando por dias", feedback: "Você é duro consigo." },
          { text: "Analiso o que aprendi", feedback: "Você transforma em aprendizado." },
          { text: "Tento esconder ou minimizar", feedback: "Você evita encarar." }
        ]
      },
      {
        id: 2,
        question: "Suas expectativas sobre você são:",
        options: [
          { text: "Realistas e alcançáveis", feedback: "Você se conhece bem." },
          { text: "Muito altas, quase impossíveis", feedback: "Você se cobra demais." },
          { text: "Baixas, para não me decepcionar", feedback: "Você se protege." },
          { text: "Variam muito", feedback: "Você oscila." }
        ]
      },
      {
        id: 3,
        question: "Quando não atinge um objetivo:",
        options: [
          { text: "Tento de novo com mais força", feedback: "Você é persistente." },
          { text: "Me sinto um fracasso", feedback: "Você se identifica com resultado." },
          { text: "Reavalio se faz sentido", feedback: "Você é flexível." },
          { text: "Desisto e evito tentar", feedback: "Você se protege desistindo." }
        ]
      },
      {
        id: 4,
        question: "Você se compara com outras pessoas:",
        options: [
          { text: "Raramente, foco no meu caminho", feedback: "Você tem clareza." },
          { text: "Frequentemente, e me sinto inferior", feedback: "Você se diminui." },
          { text: "Às vezes, para me inspirar", feedback: "Você usa de forma saudável." },
          { text: "Sempre, e me cobro", feedback: "Você compete constantemente." }
        ]
      },
      {
        id: 5,
        question: "Quando alguém te elogia:",
        options: [
          { text: "Aceito e agradeço", feedback: "Você recebe bem." },
          { text: "Minimizo ou descarto", feedback: "Você tem dificuldade em se valorizar." },
          { text: "Fico desconfortável", feedback: "Você não se acha merecedor." },
          { text: "Questiono se é verdade", feedback: "Você duvida." }
        ]
      },
      {
        id: 6,
        question: "Sobre descanso e pausas:",
        options: [
          { text: "Reconheço quando preciso", feedback: "Você se respeita." },
          { text: "Me sinto culpado quando paro", feedback: "Você associa descanso a preguiça." },
          { text: "Só paro quando não aguento", feedback: "Você ignora limites." },
          { text: "Valorizo meu bem-estar", feedback: "Você se cuida." }
        ]
      },
      {
        id: 7,
        question: "Quando você não é perfeito:",
        options: [
          { text: "Aceito como parte de ser humano", feedback: "Você é realista." },
          { text: "Me frustro e me cobro", feedback: "Você busca perfeição." },
          { text: "Tento melhorar para próxima", feedback: "Você busca crescimento." },
          { text: "Sinto que decepcionei", feedback: "Você carrega peso." }
        ]
      },
      {
        id: 8,
        question: "Sua voz interna é:",
        options: [
          { text: "Encorajadora e gentil", feedback: "Você é seu aliado." },
          { text: "Crítica e dura", feedback: "Você é seu inimigo." },
          { text: "Equilibrada", feedback: "Você se desafia sem se destruir." },
          { text: "Confusa e contraditória", feedback: "Você não tem clareza." }
        ]
      },
      {
        id: 9,
        question: "Quando você falha em algo importante:",
        options: [
          { text: "Vejo como oportunidade", feedback: "Você transforma em crescimento." },
          { text: "Me sinto devastado", feedback: "Você se identifica com resultado." },
          { text: "Busco entender o que aconteceu", feedback: "Você analisa sem se destruir." },
          { text: "Evito pensar nisso", feedback: "Você foge da dor." }
        ]
      },
      {
        id: 10,
        question: "Sua maior dificuldade consigo mesmo:",
        options: [
          { text: "Aceitar minhas limitações", feedback: "Você luta contra humanidade." },
          { text: "Não me cobrar tanto", feedback: "Você reconhece que é duro." },
          { text: "Reconhecer meu valor", feedback: "Você tem dificuldade em se valorizar." },
          { text: "Não me comparar", feedback: "Você se perde em comparações." }
        ]
      }
    ]
  },
  {
    id: "limites",
    title: "Limites Pessoais",
    description: "Como você estabelece e mantém seus limites",
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    questions: [
      {
        id: 1,
        question: "Quando alguém pede algo que você não quer fazer:",
        options: [
          { text: "Digo não sem problemas", feedback: "Você estabelece limites." },
          { text: "Fico em dúvida mas recuso", feedback: "Você hesita mas se protege." },
          { text: "Aceito para não desagradar", feedback: "Você cede." },
          { text: "Sempre aceito", feedback: "Você não consegue recusar." }
        ]
      },
      {
        id: 2,
        question: "Sobre suas necessidades:",
        options: [
          { text: "Comunico claramente", feedback: "Você se expressa." },
          { text: "Comunico mas me sinto culpado", feedback: "Você se cobra." },
          { text: "Tenho dificuldade em comunicar", feedback: "Você se guarda." },
          { text: "Ignoro minhas necessidades", feedback: "Você se negligencia." }
        ]
      },
      {
        id: 3,
        question: "Quando alguém ultrapassa seus limites:",
        options: [
          { text: "Falo imediatamente", feedback: "Você se protege." },
          { text: "Fico incomodado mas não falo", feedback: "Você guarda." },
          { text: "Me afasto da pessoa", feedback: "Você se distancia." },
          { text: "Aceito e me sinto mal", feedback: "Você não se defende." }
        ]
      },
      {
        id: 4,
        question: "Em relacionamentos, você:",
        options: [
          { text: "Mantenho minha individualidade", feedback: "Você se preserva." },
          { text: "Equilibro eu e nós", feedback: "Você balanceia." },
          { text: "Me perco um pouco no outro", feedback: "Você se dilui." },
          { text: "Me anulo pelo outro", feedback: "Você desaparece." }
        ]
      },
      {
        id: 5,
        question: "Quando você está sobrecarregado:",
        options: [
          { text: "Digo não a novas demandas", feedback: "Você se protege." },
          { text: "Tento dar conta de tudo", feedback: "Você se força." },
          { text: "Aceito mas sofro", feedback: "Você não estabelece limites." },
          { text: "Não consigo recusar", feedback: "Você se sobrecarrega." }
        ]
      },
      {
        id: 6,
        question: "Sobre seu tempo pessoal:",
        options: [
          { text: "Protejo e priorizo", feedback: "Você se valoriza." },
          { text: "Tento proteger mas cedo", feedback: "Você hesita." },
          { text: "Sacrifico pelos outros", feedback: "Você se anula." },
          { text: "Não tenho tempo pessoal", feedback: "Você se perde." }
        ]
      },
      {
        id: 7,
        question: "Quando alguém te desrespeita:",
        options: [
          { text: "Confronto e estabeleço limite", feedback: "Você se defende." },
          { text: "Fico magoado mas não falo", feedback: "Você guarda." },
          { text: "Me afasto sem explicar", feedback: "Você se distancia." },
          { text: "Aceito e normalizo", feedback: "Você não se protege." }
        ]
      },
      {
        id: 8,
        question: "Sobre culpa ao dizer não:",
        options: [
          { text: "Não me sinto culpado", feedback: "Você se respeita." },
          { text: "Sinto um pouco mas passa", feedback: "Você processa." },
          { text: "Me sinto muito culpado", feedback: "Você carrega peso." },
          { text: "Evito dizer não", feedback: "Você foge do desconforto." }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade com limites:",
        options: [
          { text: "Não tenho dificuldades", feedback: "Você se protege bem." },
          { text: "Dizer não sem culpa", feedback: "Você se cobra." },
          { text: "Identificar quando preciso", feedback: "Você não percebe." },
          { text: "Manter os limites", feedback: "Você cede." }
        ]
      },
      {
        id: 10,
        question: "Quando você estabelece um limite:",
        options: [
          { text: "Me sinto bem e respeitado", feedback: "Você se valoriza." },
          { text: "Me sinto culpado", feedback: "Você se cobra." },
          { text: "Fico em dúvida se fiz certo", feedback: "Você se questiona." },
          { text: "Raramente estabeleço", feedback: "Você não se protege." }
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
      pressao: {
        title: "Como Você Reage Sob Pressão",
        characteristics: [
          "Você tem consciência de como funciona sob estresse",
          "Reconhece seus limites",
          "Entende seus padrões de reação"
        ],
        strengths: [
          "Consciência de suas reações",
          "Capacidade de identificar gatilhos",
          "Busca de estratégias de enfrentamento"
        ],
        attentionPoints: [
          "Desenvolva mais estratégias de regulação",
          "Pratique autocuidado preventivo",
          "Aprenda a pedir ajuda"
        ]
      },
      comunicacao: {
        title: "Seu Estilo de Comunicação",
        characteristics: [
          "Você tem consciência de como se comunica",
          "Reconhece seus padrões de expressão",
          "Entende suas dificuldades"
        ],
        strengths: [
          "Consciência comunicacional",
          "Busca de clareza",
          "Abertura para melhorar"
        ],
        attentionPoints: [
          "Pratique expressão de emoções",
          "Desenvolva escuta ativa",
          "Trabalhe timing de comunicação"
        ]
      },
      "tomada-decisao": {
        title: "Seu Estilo de Decisão",
        characteristics: [
          "Você tem consciência de como decide",
          "Reconhece suas influências",
          "Entende seus padrões"
        ],
        strengths: [
          "Consciência do processo decisório",
          "Busca de equilíbrio",
          "Abertura para aprender"
        ],
        attentionPoints: [
          "Desenvolva confiança em si",
          "Pratique decisões menores",
          "Trabalhe medo de errar"
        ]
      },
      "ansiedade-social": {
        title: "Seu Perfil Social",
        characteristics: [
          "Você tem consciência de como se sente socialmente",
          "Reconhece seus limites",
          "Entende suas necessidades"
        ],
        strengths: [
          "Consciência de suas reações",
          "Busca de estratégias",
          "Respeito aos próprios limites"
        ],
        attentionPoints: [
          "Pratique exposição gradual",
          "Desenvolva estratégias de regulação",
          "Busque apoio se necessário"
        ]
      },
      procrastinacao: {
        title: "Seu Padrão de Gestão de Tempo",
        characteristics: [
          "Você tem consciência de seus padrões",
          "Reconhece suas dificuldades",
          "Entende seus gatilhos"
        ],
        strengths: [
          "Consciência do problema",
          "Busca de soluções",
          "Abertura para mudança"
        ],
        attentionPoints: [
          "Desenvolva rotinas",
          "Pratique começar pequeno",
          "Trabalhe perfeccionismo"
        ]
      },
      autoestima: {
        title: "Seu Perfil de Autoestima",
        characteristics: [
          "Você tem consciência de como se trata",
          "Reconhece seus padrões",
          "Entende suas dificuldades"
        ],
        strengths: [
          "Consciência de si",
          "Busca de crescimento",
          "Abertura para mudança"
        ],
        attentionPoints: [
          "Pratique autocompaixão",
          "Desenvolva voz interna gentil",
          "Trabalhe autocrítica"
        ]
      },
      limites: {
        title: "Seus Limites Pessoais",
        characteristics: [
          "Você tem consciência de seus limites",
          "Reconhece suas dificuldades",
          "Entende suas necessidades"
        ],
        strengths: [
          "Consciência de limites",
          "Busca de proteção",
          "Valorização de si"
        ],
        attentionPoints: [
          "Pratique dizer não",
          "Desenvolva comunicação de limites",
          "Trabalhe culpa"
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
