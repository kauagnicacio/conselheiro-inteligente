"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Brain, Heart, Zap, Users, Target, Shield, TrendingUp, MessageSquare, Lightbulb, Wind } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    feedback: string;
  }[];
}

interface QuizResult {
  title: string;
  description: string;
  strengths: string[];
  attentionPoints: string[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  purpose: string;
  icon: any;
  questions: QuizQuestion[];
  getResult: (answers: number[]) => QuizResult;
}

const quizzes: Quiz[] = [
  {
    id: "conflicts",
    title: "Como você lida com conflitos",
    description: "Descubra seu padrão de reação em situações difíceis",
    purpose: "Entender como você reage quando as coisas ficam tensas",
    icon: Brain,
    questions: [
      {
        id: 1,
        question: "Quando alguém te critica, sua primeira reação é:",
        options: [
          {
            text: "Defender meu ponto de vista imediatamente",
            feedback: "Você tende a proteger sua posição rapidamente. Isso mostra força, mas pode dificultar ouvir o outro lado."
          },
          {
            text: "Refletir sobre o que foi dito antes de responder",
            feedback: "Você valoriza entender antes de reagir. Isso traz maturidade, mas pode fazer você guardar coisas demais."
          },
          {
            text: "Sentir-me magoado e me afastar",
            feedback: "Críticas te afetam emocionalmente. Isso mostra sensibilidade, mas pode te fazer evitar conversas necessárias."
          },
          {
            text: "Buscar entender a intenção da pessoa",
            feedback: "Você procura o contexto por trás das palavras. Isso é valioso, mas cuidado para não justificar tudo."
          }
        ]
      },
      {
        id: 2,
        question: "Em uma discussão acalorada, você tende a:",
        options: [
          {
            text: "Elevar o tom e defender meu ponto com firmeza",
            feedback: "Você não foge do confronto. Isso pode resolver rápido, mas também pode escalar o conflito."
          },
          {
            text: "Me calar e esperar passar",
            feedback: "Você evita o embate direto. Isso preserva a paz momentânea, mas pode acumular ressentimentos."
          },
          {
            text: "Tentar acalmar a situação e buscar acordo",
            feedback: "Você prioriza a harmonia. Isso é importante, mas às vezes você pode ceder demais."
          },
          {
            text: "Sair da situação para não piorar",
            feedback: "Você se protege se afastando. Isso evita danos imediatos, mas pode deixar coisas sem resolver."
          }
        ]
      },
      {
        id: 3,
        question: "Depois de um conflito, você:",
        options: [
          {
            text: "Sigo em frente rapidamente",
            feedback: "Você não fica remoendo. Isso é saudável, mas cuidado para não ignorar o que precisa ser processado."
          },
          {
            text: "Fico pensando no que aconteceu por dias",
            feedback: "Você processa profundamente. Isso ajuda a aprender, mas pode te prender no passado."
          },
          {
            text: "Busco conversar para resolver de vez",
            feedback: "Você valoriza o fechamento. Isso é maduro, mas nem sempre o outro está pronto para isso."
          },
          {
            text: "Evito a pessoa por um tempo",
            feedback: "Você precisa de distância para se recuperar. Isso é válido, mas pode criar afastamentos permanentes."
          }
        ]
      },
      {
        id: 4,
        question: "Quando você está errado em um conflito:",
        options: [
          {
            text: "Tenho dificuldade em admitir",
            feedback: "Reconhecer erros é difícil para você. Isso protege seu ego, mas pode prejudicar relações."
          },
          {
            text: "Admito, mas me sinto péssimo depois",
            feedback: "Você reconhece, mas carrega culpa. Isso mostra responsabilidade, mas pode ser pesado demais."
          },
          {
            text: "Peço desculpas e tento consertar",
            feedback: "Você age para reparar. Isso é valioso, mas cuidado para não se desculpar por tudo."
          },
          {
            text: "Demoro para perceber que estava errado",
            feedback: "Você precisa de tempo para ver seu papel. Isso é humano, mas pode atrasar resoluções."
          }
        ]
      },
      {
        id: 5,
        question: "Em conflitos no trabalho, você:",
        options: [
          {
            text: "Foco no problema, não nas pessoas",
            feedback: "Você separa questões profissionais de pessoais. Isso é profissional, mas pode parecer frio."
          },
          {
            text: "Levo para o lado pessoal facilmente",
            feedback: "Conflitos profissionais te afetam emocionalmente. Isso mostra envolvimento, mas pode drenar você."
          },
          {
            text: "Evito confrontos e busco soluções sozinho",
            feedback: "Você prefere resolver sem embate. Isso mantém a paz, mas pode te sobrecarregar."
          },
          {
            text: "Busco mediação ou ajuda de terceiros",
            feedback: "Você valoriza perspectivas externas. Isso é sábio, mas pode criar dependência de validação."
          }
        ]
      },
      {
        id: 6,
        question: "Quando alguém próximo te decepciona:",
        options: [
          {
            text: "Confronto diretamente sobre o que aconteceu",
            feedback: "Você não deixa passar. Isso é honesto, mas pode criar tensão se não for no momento certo."
          },
          {
            text: "Me afasto sem explicar muito",
            feedback: "Você se protege com distância. Isso preserva você, mas pode deixar o outro sem entender."
          },
          {
            text: "Tento entender o lado da pessoa",
            feedback: "Você busca empatia antes de julgar. Isso é generoso, mas cuidado para não ignorar seus limites."
          },
          {
            text: "Guardo mágoa mas não falo",
            feedback: "Você internaliza a dor. Isso evita conflito imediato, mas pode envenenar a relação."
          }
        ]
      },
      {
        id: 7,
        question: "Em conflitos familiares, você:",
        options: [
          {
            text: "Digo o que penso, mesmo que doa",
            feedback: "Você prioriza a verdade. Isso é corajoso, mas pode machucar quem você ama."
          },
          {
            text: "Evito para não piorar a situação",
            feedback: "Você protege a harmonia familiar. Isso é nobre, mas pode te fazer engolir muito."
          },
          {
            text: "Tento mediar e acalmar todos",
            feedback: "Você assume o papel de pacificador. Isso ajuda, mas pode te esgotar emocionalmente."
          },
          {
            text: "Me fecho e sofro sozinho",
            feedback: "Você processa internamente. Isso te protege, mas pode criar solidão e incompreensão."
          }
        ]
      },
      {
        id: 8,
        question: "Quando você sente que está sendo injustiçado:",
        options: [
          {
            text: "Luto pelos meus direitos imediatamente",
            feedback: "Você não aceita injustiça passivamente. Isso é forte, mas pode gerar desgaste constante."
          },
          {
            text: "Fico remoendo mas não faço nada",
            feedback: "Você sente, mas não age. Isso evita conflito, mas pode gerar frustração acumulada."
          },
          {
            text: "Busco formas diplomáticas de resolver",
            feedback: "Você equilibra assertividade e tato. Isso é maduro, mas pode demorar mais que o necessário."
          },
          {
            text: "Me questiono se realmente foi injustiça",
            feedback: "Você duvida da sua percepção. Isso mostra humildade, mas pode te fazer aceitar o inaceitável."
          }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade em conflitos é:",
        options: [
          {
            text: "Controlar minha raiva ou frustração",
            feedback: "Suas emoções são intensas. Isso mostra paixão, mas pode prejudicar sua comunicação."
          },
          {
            text: "Expressar o que realmente sinto",
            feedback: "Você tem dificuldade em se abrir. Isso te protege, mas pode deixar você incompreendido."
          },
          {
            text: "Não levar tudo para o lado pessoal",
            feedback: "Você se envolve emocionalmente. Isso mostra cuidado, mas pode amplificar pequenos problemas."
          },
          {
            text: "Saber quando vale a pena brigar",
            feedback: "Você questiona suas batalhas. Isso é sábio, mas pode te fazer desistir de lutas importantes."
          }
        ]
      },
      {
        id: 10,
        question: "Depois de resolver um conflito, você:",
        options: [
          {
            text: "Volto ao normal rapidamente",
            feedback: "Você não guarda rancor. Isso é saudável, mas certifique-se de que realmente resolveu."
          },
          {
            text: "Fico com um desconforto residual",
            feedback: "Você carrega a energia do conflito. Isso mostra sensibilidade, mas pode te impedir de seguir em frente."
          },
          {
            text: "Analiso o que aprendi com a situação",
            feedback: "Você transforma conflito em aprendizado. Isso é valioso, mas cuidado para não intelectualizar demais."
          },
          {
            text: "Evito situações parecidas no futuro",
            feedback: "Você se protege evitando. Isso é natural, mas pode limitar suas experiências e relações."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Confrontador Direto",
          description: "Você não foge de conflitos e tende a enfrentá-los de frente. Sua abordagem é direta e você valoriza resolver as coisas rapidamente, mesmo que isso gere desconforto momentâneo.",
          strengths: [
            "Não deixa problemas se acumularem",
            "Comunica claramente o que pensa",
            "Não tem medo de defender suas posições",
            "Resolve conflitos com agilidade"
          ],
          attentionPoints: [
            "Pode ser intenso demais para algumas pessoas",
            "Nem sempre é o momento certo para confrontar",
            "Pode escalar conflitos desnecessariamente",
            "Precisa equilibrar honestidade com empatia"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Reflexivo Estratégico",
          description: "Você pensa antes de agir em conflitos. Valoriza entender todos os lados e busca soluções que façam sentido para todos. Sua abordagem é mais cerebral que emocional.",
          strengths: [
            "Não age por impulso",
            "Busca soluções equilibradas",
            "Consegue ver múltiplas perspectivas",
            "Mantém a calma em situações tensas"
          ],
          attentionPoints: [
            "Pode demorar demais para agir",
            "Às vezes paralisa analisando demais",
            "Pode intelectualizar emoções importantes",
            "Precisa confiar mais na intuição"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Pacificador Empático",
          description: "Você prioriza a harmonia e busca entender os sentimentos de todos os envolvidos. Conflitos te afetam emocionalmente e você faz o possível para restaurar a paz.",
          strengths: [
            "Cria ambientes de confiança",
            "Consegue mediar conflitos entre outros",
            "Valoriza os sentimentos das pessoas",
            "Busca soluções que preservem relações"
          ],
          attentionPoints: [
            "Pode ceder demais para evitar conflito",
            "Às vezes ignora suas próprias necessidades",
            "Pode assumir responsabilidade emocional dos outros",
            "Precisa estabelecer limites mais claros"
          ]
        };
      } else {
        return {
          title: "Evitador Protetor",
          description: "Você tende a se afastar de conflitos para se proteger emocionalmente. Prefere processar as coisas internamente e precisa de tempo e espaço para lidar com situações difíceis.",
          strengths: [
            "Não escala conflitos desnecessariamente",
            "Processa profundamente antes de agir",
            "Protege sua energia emocional",
            "Evita danos impulsivos"
          ],
          attentionPoints: [
            "Pode deixar problemas sem resolver",
            "Às vezes se isola demais",
            "Pode acumular ressentimentos não expressos",
            "Precisa aprender a se posicionar mais"
          ]
        };
      }
    }
  },
  {
    id: "relationships",
    title: "Seu padrão em relacionamentos",
    description: "Como você se conecta e se relaciona com as pessoas",
    purpose: "Entender como você ama e o que você busca em conexões",
    icon: Heart,
    questions: [
      {
        id: 1,
        question: "Em um relacionamento, você valoriza mais:",
        options: [
          {
            text: "Liberdade e independência",
            feedback: "Você precisa de espaço para ser você. Isso é saudável, mas pode fazer o outro se sentir distante."
          },
          {
            text: "Segurança e estabilidade",
            feedback: "Você busca previsibilidade. Isso traz conforto, mas pode limitar espontaneidade."
          },
          {
            text: "Conexão emocional profunda",
            feedback: "Você quer intimidade real. Isso cria vínculos fortes, mas pode assustar quem não está pronto."
          },
          {
            text: "Diversão e espontaneidade",
            feedback: "Você valoriza leveza. Isso mantém as coisas vivas, mas pode evitar conversas necessárias."
          }
        ]
      },
      {
        id: 2,
        question: "Quando há um conflito no relacionamento:",
        options: [
          {
            text: "Confronto diretamente para resolver",
            feedback: "Você não deixa problemas crescerem. Isso é maduro, mas precisa de timing e tom adequados."
          },
          {
            text: "Evito até me acalmar",
            feedback: "Você precisa de tempo para processar. Isso é válido, mas pode deixar o outro ansioso."
          },
          {
            text: "Busco entender o lado do outro primeiro",
            feedback: "Você prioriza empatia. Isso é lindo, mas não esqueça de validar seus próprios sentimentos."
          },
          {
            text: "Cedo para manter a paz",
            feedback: "Você evita ruptura. Isso preserva a relação, mas pode te fazer perder sua voz."
          }
        ]
      },
      {
        id: 3,
        question: "Você demonstra afeto principalmente através de:",
        options: [
          {
            text: "Palavras e elogios",
            feedback: "Você expressa verbalmente. Isso é claro, mas nem todos recebem amor dessa forma."
          },
          {
            text: "Ações e gestos práticos",
            feedback: "Você mostra através do que faz. Isso é concreto, mas pode não ser percebido como afeto."
          },
          {
            text: "Tempo de qualidade juntos",
            feedback: "Você valoriza presença. Isso cria conexão, mas exige disponibilidade mútua."
          },
          {
            text: "Contato físico e proximidade",
            feedback: "Você se conecta pelo toque. Isso é íntimo, mas precisa respeitar o espaço do outro."
          }
        ]
      },
      {
        id: 4,
        question: "Quando você gosta de alguém:",
        options: [
          {
            text: "Demonstro claramente meu interesse",
            feedback: "Você não joga jogos. Isso é honesto, mas pode assustar quem é mais reservado."
          },
          {
            text: "Fico inseguro e espero sinais",
            feedback: "Você tem medo de rejeição. Isso te protege, mas pode fazer você perder oportunidades."
          },
          {
            text: "Vou devagar e observo a reciprocidade",
            feedback: "Você é cauteloso. Isso é inteligente, mas pode ser interpretado como desinteresse."
          },
          {
            text: "Me entrego rapidamente",
            feedback: "Você sente intensamente. Isso é bonito, mas pode te deixar vulnerável cedo demais."
          }
        ]
      },
      {
        id: 5,
        question: "Sua maior insegurança em relacionamentos é:",
        options: [
          {
            text: "Não ser suficiente para a pessoa",
            feedback: "Você questiona seu valor. Isso pode te fazer aceitar menos do que merece."
          },
          {
            text: "Perder minha independência",
            feedback: "Você teme se perder no outro. Isso te protege, mas pode criar distância."
          },
          {
            text: "Ser abandonado ou rejeitado",
            feedback: "Você tem medo de perder. Isso pode te fazer se apegar demais ou se afastar preventivamente."
          },
          {
            text: "Não conseguir confiar plenamente",
            feedback: "Você tem dificuldade em se entregar. Isso te protege, mas pode impedir intimidade real."
          }
        ]
      },
      {
        id: 6,
        question: "Quando o relacionamento fica rotineiro:",
        options: [
          {
            text: "Busco formas de renovar e surpreender",
            feedback: "Você investe ativamente. Isso mantém a chama, mas pode cansar se for só você fazendo isso."
          },
          {
            text: "Fico entediado e questiono a relação",
            feedback: "Você precisa de estímulo constante. Isso pode te fazer desistir de coisas boas cedo demais."
          },
          {
            text: "Aceito como parte natural da convivência",
            feedback: "Você valoriza estabilidade. Isso traz paz, mas pode deixar a relação sem vida."
          },
          {
            text: "Converso sobre o que estou sentindo",
            feedback: "Você comunica suas necessidades. Isso é maduro e abre espaço para mudanças conjuntas."
          }
        ]
      },
      {
        id: 7,
        question: "Em relação a ciúmes, você:",
        options: [
          {
            text: "Sinto, mas tento controlar",
            feedback: "Você reconhece o sentimento. Isso é honesto, mas precisa trabalhar a raiz da insegurança."
          },
          {
            text: "Não sinto ou sinto muito pouco",
            feedback: "Você confia ou se desapega facilmente. Isso pode ser saudável ou sinal de pouco investimento."
          },
          {
            text: "Sinto intensamente e demonstro",
            feedback: "Seus ciúmes são visíveis. Isso mostra envolvimento, mas pode sufocar a relação."
          },
          {
            text: "Guardo para mim e sofro sozinho",
            feedback: "Você internaliza. Isso evita conflito, mas pode criar distância e ressentimento."
          }
        ]
      },
      {
        id: 8,
        question: "Quando você está apaixonado:",
        options: [
          {
            text: "A pessoa vira minha prioridade absoluta",
            feedback: "Você se entrega completamente. Isso é intenso, mas pode te fazer negligenciar outras áreas."
          },
          {
            text: "Mantenho minha vida e rotina normais",
            feedback: "Você preserva sua individualidade. Isso é saudável, mas pode parecer frieza para o outro."
          },
          {
            text: "Fico ansioso e inseguro",
            feedback: "Amor te deixa vulnerável. Isso é humano, mas pode sabotar a relação com medo."
          },
          {
            text: "Sinto, mas tenho dificuldade em demonstrar",
            feedback: "Você guarda seus sentimentos. Isso te protege, mas pode deixar o outro sem certeza."
          }
        ]
      },
      {
        id: 9,
        question: "Sobre términos, você:",
        options: [
          {
            text: "Sofro muito e demoro para superar",
            feedback: "Você se vincula profundamente. Isso mostra capacidade de amar, mas pode te prender no passado."
          },
          {
            text: "Sigo em frente relativamente rápido",
            feedback: "Você se recupera bem. Isso é resiliente, mas pode ser fuga de processar a dor."
          },
          {
            text: "Fico remoendo o que deu errado",
            feedback: "Você busca entender. Isso ajuda a aprender, mas pode te impedir de fechar ciclos."
          },
          {
            text: "Evito pensar e me distraio",
            feedback: "Você foge da dor. Isso alivia no curto prazo, mas pode deixar feridas não curadas."
          }
        ]
      },
      {
        id: 10,
        question: "O que você mais precisa em um relacionamento:",
        options: [
          {
            text: "Sentir que sou prioridade",
            feedback: "Você precisa de validação constante. Isso é legítimo, mas pode criar pressão no outro."
          },
          {
            text: "Ter meu espaço respeitado",
            feedback: "Você valoriza autonomia. Isso é importante, mas pode ser interpretado como distância."
          },
          {
            text: "Ser compreendido profundamente",
            feedback: "Você busca conexão real. Isso é lindo, mas pode frustrar se suas expectativas forem muito altas."
          },
          {
            text: "Sentir segurança e estabilidade",
            feedback: "Você precisa de previsibilidade. Isso traz paz, mas pode limitar crescimento e mudanças."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Independente Autônomo",
          description: "Você valoriza sua liberdade e individualidade acima de tudo. Relacionamentos são importantes, mas você não abre mão de quem você é. Precisa de espaço e autonomia para se sentir bem.",
          strengths: [
            "Não perde sua identidade em relacionamentos",
            "Comunica suas necessidades claramente",
            "Não cria dependência emocional",
            "Mantém vida própria e interesses"
          ],
          attentionPoints: [
            "Pode parecer distante ou desinteressado",
            "Às vezes evita intimidade profunda",
            "Pode ter dificuldade em se comprometer",
            "Precisa equilibrar independência com conexão"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Equilibrado Consciente",
          description: "Você busca equilíbrio entre conexão e autonomia. Valoriza relacionamentos profundos, mas não se perde neles. Sua abordagem é madura e você busca crescimento mútuo.",
          strengths: [
            "Equilibra bem suas necessidades e as do outro",
            "Comunica de forma madura",
            "Não cria dramas desnecessários",
            "Busca relações saudáveis e construtivas"
          ],
          attentionPoints: [
            "Pode ser muito racional às vezes",
            "Às vezes evita conflitos necessários",
            "Pode ter expectativas muito altas",
            "Precisa permitir mais espontaneidade"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Conectado Emocional",
          description: "Você valoriza conexão profunda e intimidade emocional. Relacionamentos são centrais na sua vida e você se entrega de verdade. Busca ser compreendido e compreender o outro.",
          strengths: [
            "Cria vínculos profundos e verdadeiros",
            "Demonstra afeto e cuidado",
            "Está presente emocionalmente",
            "Valoriza e investe nas relações"
          ],
          attentionPoints: [
            "Pode se perder no outro",
            "Às vezes negligencia suas próprias necessidades",
            "Pode criar expectativas muito altas",
            "Precisa fortalecer sua individualidade"
          ]
        };
      } else {
        return {
          title: "Intenso Vulnerável",
          description: "Você sente tudo de forma profunda e intensa. Relacionamentos te afetam muito e você pode oscilar entre entrega total e medo de se machucar. Sua sensibilidade é grande.",
          strengths: [
            "Ama com intensidade e verdade",
            "É profundamente leal quando se compromete",
            "Valoriza conexões reais",
            "Não tem medo de sentir"
          ],
          attentionPoints: [
            "Pode se machucar facilmente",
            "Às vezes cria dependência emocional",
            "Pode oscilar entre extremos",
            "Precisa trabalhar segurança interna"
          ]
        };
      }
    }
  },
  {
    id: "pressure",
    title: "Como você reage sob pressão",
    description: "Seu comportamento em momentos de estresse e urgência",
    purpose: "Entender como você funciona quando as coisas apertam",
    icon: Zap,
    questions: [
      {
        id: 1,
        question: "Quando tem um prazo apertado, você:",
        options: [
          {
            text: "Trabalho melhor sob pressão",
            feedback: "A urgência te ativa. Isso pode gerar bons resultados, mas pode virar um padrão de procrastinação."
          },
          {
            text: "Planejo e divido em etapas menores",
            feedback: "Você se organiza para lidar com a pressão. Isso é inteligente e reduz ansiedade."
          },
          {
            text: "Fico ansioso mas consigo entregar",
            feedback: "Você sente o peso, mas não paralisa. Isso mostra resiliência, mas pode te desgastar."
          },
          {
            text: "Procrastino até o último momento",
            feedback: "Você evita até não ter escolha. Isso pode funcionar, mas gera estresse desnecessário."
          }
        ]
      },
      {
        id: 2,
        question: "Em uma crise, você:",
        options: [
          {
            text: "Assumo o controle e lidero",
            feedback: "Você se fortalece na urgência. Isso é valioso, mas pode te sobrecarregar."
          },
          {
            text: "Mantenho a calma e analiso",
            feedback: "Você não age por impulso. Isso evita erros, mas pode demorar demais em situações críticas."
          },
          {
            text: "Busco apoio dos outros",
            feedback: "Você reconhece que não precisa fazer tudo sozinho. Isso é sábio e cria conexão."
          },
          {
            text: "Sinto-me paralisado",
            feedback: "A pressão te trava. Isso é humano, mas pode te impedir de agir quando necessário."
          }
        ]
      },
      {
        id: 3,
        question: "Quando várias coisas vão mal ao mesmo tempo:",
        options: [
          {
            text: "Priorizo e resolvo uma de cada vez",
            feedback: "Você mantém clareza no caos. Isso é uma grande força e evita você se perder."
          },
          {
            text: "Fico sobrecarregado e não sei por onde começar",
            feedback: "Você se sente perdido. Isso é compreensível, mas pode te paralisar quando mais precisa agir."
          },
          {
            text: "Delego ou peço ajuda",
            feedback: "Você reconhece seus limites. Isso é maduro e evita colapso."
          },
          {
            text: "Entro em modo sobrevivência e faço o mínimo",
            feedback: "Você se protege reduzindo demandas. Isso é válido, mas pode deixar coisas importantes de lado."
          }
        ]
      },
      {
        id: 4,
        question: "Sob estresse prolongado, você:",
        options: [
          {
            text: "Mantenho a performance",
            feedback: "Você aguenta bem. Isso é resiliente, mas cuidado para não normalizar sobrecarga."
          },
          {
            text: "Começo a cometer mais erros",
            feedback: "O estresse te afeta. Isso é um sinal importante de que você precisa de pausa."
          },
          {
            text: "Fico irritado e impaciente",
            feedback: "Suas emoções ficam à flor da pele. Isso é humano, mas pode prejudicar relações."
          },
          {
            text: "Me fecho e me isolo",
            feedback: "Você se recolhe para se proteger. Isso pode ajudar, mas também pode te deixar sem apoio."
          }
        ]
      },
      {
        id: 5,
        question: "Quando você está sobrecarregado:",
        options: [
          {
            text: "Continuo até terminar tudo",
            feedback: "Você não desiste. Isso é admirável, mas pode te levar ao esgotamento."
          },
          {
            text: "Peço ajuda ou extensão de prazo",
            feedback: "Você comunica seus limites. Isso é saudável e evita colapso."
          },
          {
            text: "Faço o que consigo e aceito que não será perfeito",
            feedback: "Você é realista. Isso te protege de perfeccionismo paralisante."
          },
          {
            text: "Entro em pânico e não consigo pensar direito",
            feedback: "A sobrecarga te desorganiza. Isso mostra que você precisa de estratégias para lidar com pressão."
          }
        ]
      },
      {
        id: 6,
        question: "Depois de um período intenso, você:",
        options: [
          {
            text: "Já parto para a próxima coisa",
            feedback: "Você não para. Isso pode ser produtivo, mas pode te impedir de recuperar energia."
          },
          {
            text: "Preciso de tempo para me recuperar",
            feedback: "Você respeita seus limites. Isso é essencial para sustentabilidade."
          },
          {
            text: "Fico exausto por dias",
            feedback: "Você se esgota completamente. Isso mostra que você ultrapassa seus limites com frequência."
          },
          {
            text: "Reflito sobre o que aprendi",
            feedback: "Você transforma experiência em aprendizado. Isso é valioso para crescimento."
          }
        ]
      },
      {
        id: 7,
        question: "Quando alguém te pressiona por resultados:",
        options: [
          {
            text: "Me motivo e entrego",
            feedback: "Pressão externa te ativa. Isso pode ser útil, mas pode criar dependência de validação."
          },
          {
            text: "Fico ansioso e com medo de falhar",
            feedback: "Você sente o peso da expectativa. Isso pode te paralisar ou te fazer errar mais."
          },
          {
            text: "Comunico o que é realista",
            feedback: "Você estabelece limites claros. Isso é profissional e te protege de sobrecarga."
          },
          {
            text: "Me rebelo internamente",
            feedback: "Você resiste à pressão externa. Isso pode te proteger, mas pode criar conflitos."
          }
        ]
      },
      {
        id: 8,
        question: "Em situações de emergência, você:",
        options: [
          {
            text: "Ajo rápido e decisivamente",
            feedback: "Você não trava. Isso é valioso em crises, mas certifique-se de não agir por impulso."
          },
          {
            text: "Fico calmo e penso antes de agir",
            feedback: "Você mantém clareza. Isso evita erros, mas pode demorar demais em situações críticas."
          },
          {
            text: "Sigo instruções de quem sabe mais",
            feedback: "Você reconhece quando não é o momento de liderar. Isso é humilde e inteligente."
          },
          {
            text: "Congelo e não sei o que fazer",
            feedback: "Você paralisa. Isso é uma resposta natural de estresse, mas pode ser perigoso."
          }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade sob pressão é:",
        options: [
          {
            text: "Manter a calma",
            feedback: "Suas emoções ficam intensas. Isso é humano, mas pode prejudicar sua capacidade de agir."
          },
          {
            text: "Não me cobrar demais",
            feedback: "Você é duro consigo mesmo. Isso pode te motivar, mas também pode te paralisar."
          },
          {
            text: "Pedir ajuda quando preciso",
            feedback: "Você tenta fazer tudo sozinho. Isso pode te sobrecarregar desnecessariamente."
          },
          {
            text: "Não procrastinar",
            feedback: "Você evita até não ter escolha. Isso cria estresse desnecessário e pode prejudicar resultados."
          }
        ]
      },
      {
        id: 10,
        question: "Depois de uma situação de alta pressão:",
        options: [
          {
            text: "Sinto orgulho de ter conseguido",
            feedback: "Você reconhece sua capacidade. Isso fortalece sua confiança e resiliência."
          },
          {
            text: "Fico exausto e preciso de tempo",
            feedback: "Você se esgota. Isso mostra que você dá tudo de si, mas precisa aprender a dosar."
          },
          {
            text: "Analiso o que poderia ter feito melhor",
            feedback: "Você busca melhorar. Isso é valioso, mas cuidado para não ignorar o que fez bem."
          },
          {
            text: "Evito situações parecidas no futuro",
            feedback: "Você se protege. Isso é natural, mas pode limitar suas oportunidades de crescimento."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Resiliente Ativado",
          description: "Você funciona bem sob pressão e até se fortalece em situações de urgência. Sua capacidade de manter clareza e agir em momentos críticos é notável.",
          strengths: [
            "Mantém clareza em situações de crise",
            "Age decisivamente quando necessário",
            "Não paralisa sob pressão",
            "Inspira confiança em momentos difíceis"
          ],
          attentionPoints: [
            "Pode normalizar sobrecarga",
            "Às vezes age rápido demais",
            "Pode não reconhecer quando precisa de pausa",
            "Precisa aprender a desacelerar"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Estratégico Organizado",
          description: "Você lida com pressão através de planejamento e organização. Sua abordagem é estruturada e você busca reduzir o caos através de clareza e priorização.",
          strengths: [
            "Planeja bem mesmo sob pressão",
            "Prioriza com clareza",
            "Não age por impulso",
            "Mantém organização em momentos difíceis"
          ],
          attentionPoints: [
            "Pode demorar demais para agir",
            "Às vezes paralisa analisando demais",
            "Pode ser inflexível quando planos mudam",
            "Precisa confiar mais na intuição"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Sensível Funcional",
          description: "Você sente o peso da pressão, mas consegue continuar. Sua sensibilidade te faz perceber quando está no limite, o que é importante para não se esgotar completamente.",
          strengths: [
            "Reconhece seus limites",
            "Busca apoio quando necessário",
            "Não ignora sinais de sobrecarga",
            "Equilibra fazer e cuidar de si"
          ],
          attentionPoints: [
            "Pode se desgastar emocionalmente",
            "Às vezes duvida da própria capacidade",
            "Pode precisar de muito apoio externo",
            "Precisa fortalecer confiança interna"
          ]
        };
      } else {
        return {
          title: "Vulnerável à Sobrecarga",
          description: "Pressão te afeta intensamente e você pode paralisar ou se desorganizar em situações de alta demanda. Isso não é fraqueza, mas mostra que você precisa de estratégias para lidar com estresse.",
          strengths: [
            "Reconhece quando não está bem",
            "Não força além dos limites",
            "Valoriza equilíbrio e bem-estar",
            "Busca ambientes mais tranquilos"
          ],
          attentionPoints: [
            "Pode evitar desafios necessários",
            "Às vezes paralisa em momentos críticos",
            "Pode se sentir incapaz com frequência",
            "Precisa desenvolver resiliência gradualmente"
          ]
        };
      }
    }
  },
  {
    id: "emotional-style",
    title: "Seu estilo emocional",
    description: "Como você processa e expressa suas emoções",
    purpose: "Entender como você sente e lida com o que sente",
    icon: Heart,
    questions: [
      {
        id: 1,
        question: "Quando está triste ou chateado, você:",
        options: [
          {
            text: "Prefiro ficar sozinho",
            feedback: "Você processa internamente. Isso te dá espaço, mas pode criar solidão."
          },
          {
            text: "Busco conversar com alguém",
            feedback: "Você precisa de conexão. Isso ajuda a processar, mas pode criar dependência de validação."
          },
          {
            text: "Tento me distrair",
            feedback: "Você evita sentir. Isso alivia no momento, mas pode deixar emoções não processadas."
          },
          {
            text: "Deixo a emoção passar naturalmente",
            feedback: "Você aceita o que sente. Isso é saudável e permite processamento genuíno."
          }
        ]
      },
      {
        id: 2,
        question: "Você expressa suas emoções:",
        options: [
          {
            text: "Abertamente e sem filtro",
            feedback: "Você é transparente. Isso é autêntico, mas pode assustar ou sobrecarregar outros."
          },
          {
            text: "De forma controlada e medida",
            feedback: "Você filtra o que mostra. Isso te protege, mas pode criar distância."
          },
          {
            text: "Apenas com pessoas muito próximas",
            feedback: "Você é seletivo. Isso cria intimidade real, mas pode te isolar."
          },
          {
            text: "Com dificuldade, mesmo quando quero",
            feedback: "Você trava. Isso te protege, mas pode te deixar incompreendido."
          }
        ]
      },
      {
        id: 3,
        question: "Quando alguém te magoa:",
        options: [
          {
            text: "Falo imediatamente",
            feedback: "Você não guarda. Isso é saudável, mas precisa de timing e tom adequados."
          },
          {
            text: "Guardo e processo sozinho",
            feedback: "Você internaliza. Isso te dá tempo, mas pode criar ressentimento."
          },
          {
            text: "Demonstro através do meu comportamento",
            feedback: "Você comunica indiretamente. Isso pode confundir o outro."
          },
          {
            text: "Finjo que está tudo bem",
            feedback: "Você esconde. Isso evita conflito, mas pode te fazer explodir depois."
          }
        ]
      },
      {
        id: 4,
        question: "Suas emoções são:",
        options: [
          {
            text: "Intensas e profundas",
            feedback: "Você sente tudo amplificado. Isso te conecta com a vida, mas pode te esgotar."
          },
          {
            text: "Equilibradas e controláveis",
            feedback: "Você mantém estabilidade. Isso te protege, mas pode desconectar você de si mesmo."
          },
          {
            text: "Variáveis e imprevisíveis",
            feedback: "Você oscila. Isso é humano, mas pode confundir você e os outros."
          },
          {
            text: "Difíceis de identificar",
            feedback: "Você tem dificuldade em nomear o que sente. Isso pode te deixar perdido."
          }
        ]
      },
      {
        id: 5,
        question: "Quando está com raiva:",
        options: [
          {
            text: "Explodo na hora",
            feedback: "Você não segura. Isso libera a pressão, mas pode machucar e criar arrependimento."
          },
          {
            text: "Me afasto até me acalmar",
            feedback: "Você se protege. Isso evita danos, mas pode deixar coisas sem resolver."
          },
          {
            text: "Expresso de forma assertiva",
            feedback: "Você comunica sem agredir. Isso é maduro e resolve sem destruir."
          },
          {
            text: "Guardo e fica remoendo",
            feedback: "Você internaliza. Isso pode virar ressentimento e afetar sua saúde."
          }
        ]
      },
      {
        id: 6,
        question: "Você chora:",
        options: [
          {
            text: "Com facilidade, quando algo me toca",
            feedback: "Você se permite sentir. Isso é saudável e libera emoções."
          },
          {
            text: "Raramente, só em situações extremas",
            feedback: "Você segura muito. Isso pode criar acúmulo emocional."
          },
          {
            text: "Sozinho, nunca na frente de outros",
            feedback: "Você se protege. Isso te dá controle, mas pode criar solidão."
          },
          {
            text: "Tenho dificuldade, mesmo quando quero",
            feedback: "Você trava. Isso pode impedir liberação emocional necessária."
          }
        ]
      },
      {
        id: 7,
        question: "Quando está ansioso:",
        options: [
          {
            text: "Fico agitado e não consigo parar",
            feedback: "Sua ansiedade é física. Isso mostra que você precisa de formas de descarregar energia."
          },
          {
            text: "Minha mente não para de pensar",
            feedback: "Sua ansiedade é mental. Isso pode te esgotar e impedir sono e descanso."
          },
          {
            text: "Busco formas de me acalmar",
            feedback: "Você tem estratégias. Isso é saudável e mostra autoconhecimento."
          },
          {
            text: "Paraliso e não consigo fazer nada",
            feedback: "Ansiedade te trava. Isso pode te impedir de agir quando mais precisa."
          }
        ]
      },
      {
        id: 8,
        question: "Sobre vulnerabilidade, você:",
        options: [
          {
            text: "Me abro facilmente",
            feedback: "Você não tem medo de se mostrar. Isso cria conexão, mas pode te deixar exposto."
          },
          {
            text: "Tenho muita dificuldade em me abrir",
            feedback: "Você se protege. Isso te mantém seguro, mas pode criar solidão."
          },
          {
            text: "Me abro com pessoas certas",
            feedback: "Você é seletivo. Isso é sábio e cria intimidade real."
          },
          {
            text: "Vejo como fraqueza",
            feedback: "Você associa vulnerabilidade a perigo. Isso te protege, mas pode te isolar."
          }
        ]
      },
      {
        id: 9,
        question: "Quando está feliz:",
        options: [
          {
            text: "Demonstro abertamente",
            feedback: "Você compartilha sua alegria. Isso contagia e cria conexão."
          },
          {
            text: "Guardo para mim",
            feedback: "Você é reservado. Isso te protege, mas pode fazer você parecer distante."
          },
          {
            text: "Fico desconfiado, esperando algo ruim",
            feedback: "Você tem dificuldade em confiar na felicidade. Isso pode te impedir de aproveitar."
          },
          {
            text: "Aproveito intensamente o momento",
            feedback: "Você se entrega. Isso é lindo e te conecta com a vida."
          }
        ]
      },
      {
        id: 10,
        question: "Sua maior dificuldade emocional é:",
        options: [
          {
            text: "Controlar a intensidade do que sinto",
            feedback: "Você sente muito. Isso te conecta com a vida, mas pode te esgotar."
          },
          {
            text: "Identificar o que estou sentindo",
            feedback: "Você tem dificuldade em nomear emoções. Isso pode te deixar confuso."
          },
          {
            text: "Expressar o que sinto",
            feedback: "Você sente, mas não consegue comunicar. Isso pode te deixar incompreendido."
          },
          {
            text: "Lidar com emoções negativas",
            feedback: "Você evita o desconforto. Isso é natural, mas pode impedir processamento."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Expressivo Transparente",
          description: "Você sente e expressa suas emoções de forma aberta e autêntica. Não tem medo de mostrar o que está sentindo e valoriza conexões emocionais genuínas.",
          strengths: [
            "Autenticidade emocional",
            "Não acumula ressentimentos",
            "Cria conexões profundas",
            "Inspira outros a se abrirem"
          ],
          attentionPoints: [
            "Pode sobrecarregar outros com intensidade",
            "Às vezes age por impulso emocional",
            "Pode se arrepender de exposições",
            "Precisa aprender a dosar expressão"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Equilibrado Consciente",
          description: "Você tem consciência emocional e escolhe como e quando expressar o que sente. Sua abordagem é equilibrada entre sentir e controlar.",
          strengths: [
            "Inteligência emocional desenvolvida",
            "Sabe quando e como se expressar",
            "Não age por impulso",
            "Mantém relações saudáveis"
          ],
          attentionPoints: [
            "Pode ser muito controlado às vezes",
            "Às vezes racionaliza demais emoções",
            "Pode perder espontaneidade",
            "Precisa permitir mais vulnerabilidade"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Reservado Seletivo",
          description: "Você é cuidadoso com quem compartilha suas emoções. Prefere processar internamente e só se abre com pessoas muito próximas.",
          strengths: [
            "Protege sua intimidade",
            "Cria vínculos profundos com poucos",
            "Não se expõe desnecessariamente",
            "Processa com profundidade"
          ],
          attentionPoints: [
            "Pode se isolar demais",
            "Às vezes carrega peso sozinho",
            "Pode parecer distante",
            "Precisa permitir mais conexão"
          ]
        };
      } else {
        return {
          title: "Contido Protetor",
          description: "Você tem dificuldade em expressar e às vezes até identificar suas emoções. Tende a guardar tudo dentro e pode se sentir incompreendido.",
          strengths: [
            "Não cria dramas desnecessários",
            "Mantém privacidade emocional",
            "Não sobrecarrega outros",
            "Aparenta estabilidade"
          ],
          attentionPoints: [
            "Pode acumular emoções não processadas",
            "Às vezes se sente sozinho",
            "Pode explodir inesperadamente",
            "Precisa aprender a se expressar"
          ]
        };
      }
    }
  },
  {
    id: "decisions",
    title: "Tomada de decisões",
    description: "Como você decide e o que influencia suas escolhas",
    purpose: "Entender como você escolhe e o que te guia",
    icon: Target,
    questions: [
      {
        id: 1,
        question: "Ao tomar uma decisão importante, você:",
        options: [
          {
            text: "Sigo minha intuição",
            feedback: "Você confia no que sente. Isso pode ser poderoso, mas pode te fazer ignorar fatos importantes."
          },
          {
            text: "Faço listas de prós e contras",
            feedback: "Você analisa racionalmente. Isso traz clareza, mas pode te paralisar."
          },
          {
            text: "Peço conselhos de pessoas que confio",
            feedback: "Você busca perspectivas. Isso é sábio, mas pode criar dependência de validação."
          },
          {
            text: "Demoro muito para decidir",
            feedback: "Você tem dificuldade em escolher. Isso pode te fazer perder oportunidades."
          }
        ]
      },
      {
        id: 2,
        question: "Você se arrepende de decisões:",
        options: [
          {
            text: "Raramente, aceito as consequências",
            feedback: "Você assume suas escolhas. Isso é maduro e te libera do passado."
          },
          {
            text: "Às vezes, mas aprendo com elas",
            feedback: "Você transforma erro em aprendizado. Isso é valioso para crescimento."
          },
          {
            text: "Frequentemente, fico remoendo",
            feedback: "Você carrega arrependimento. Isso pode te prender e afetar decisões futuras."
          },
          {
            text: "Evito decidir para não me arrepender",
            feedback: "Você paralisa com medo. Isso pode te fazer perder oportunidades importantes."
          }
        ]
      },
      {
        id: 3,
        question: "Quando precisa decidir rápido:",
        options: [
          {
            text: "Confio no meu instinto",
            feedback: "Você age sem pensar muito. Isso pode ser eficiente, mas pode gerar erros."
          },
          {
            text: "Fico ansioso e inseguro",
            feedback: "Pressão te desestabiliza. Isso pode te fazer escolher mal ou paralisar."
          },
          {
            text: "Analiso rapidamente e decido",
            feedback: "Você equilibra velocidade e análise. Isso é uma habilidade valiosa."
          },
          {
            text: "Prefiro adiar se possível",
            feedback: "Você evita decidir sob pressão. Isso pode te fazer perder timing."
          }
        ]
      },
      {
        id: 4,
        question: "O que mais te influencia em decisões:",
        options: [
          {
            text: "Meus valores e princípios",
            feedback: "Você tem clareza do que importa. Isso te guia com coerência."
          },
          {
            text: "O que os outros vão pensar",
            feedback: "Você se preocupa com julgamento. Isso pode te fazer ignorar suas necessidades."
          },
          {
            text: "Consequências práticas",
            feedback: "Você é pragmático. Isso é inteligente, mas pode te fazer ignorar emoções."
          },
          {
            text: "O que sinto no momento",
            feedback: "Você decide pelo que sente. Isso é autêntico, mas pode ser instável."
          }
        ]
      },
      {
        id: 5,
        question: "Quando uma decisão dá errado:",
        options: [
          {
            text: "Assumo e busco consertar",
            feedback: "Você age para reparar. Isso é responsável e construtivo."
          },
          {
            text: "Me culpo intensamente",
            feedback: "Você é duro consigo mesmo. Isso pode te paralisar e afetar autoestima."
          },
          {
            text: "Analiso o que aprendi",
            feedback: "Você transforma erro em aprendizado. Isso é valioso para crescimento."
          },
          {
            text: "Culpo circunstâncias externas",
            feedback: "Você externaliza responsabilidade. Isso te protege, mas impede aprendizado."
          }
        ]
      },
      {
        id: 6,
        question: "Em decisões que afetam outros:",
        options: [
          {
            text: "Priorizo o bem coletivo",
            feedback: "Você pensa no grupo. Isso é generoso, mas pode te fazer ignorar suas necessidades."
          },
          {
            text: "Equilibro meus interesses e dos outros",
            feedback: "Você busca equilíbrio. Isso é maduro e sustentável."
          },
          {
            text: "Priorizo minhas necessidades",
            feedback: "Você se coloca primeiro. Isso é importante, mas pode criar conflitos."
          },
          {
            text: "Fico paralisado pelo peso da responsabilidade",
            feedback: "Você sente o peso. Isso mostra empatia, mas pode te impedir de agir."
          }
        ]
      },
      {
        id: 7,
        question: "Sobre mudanças grandes na vida:",
        options: [
          {
            text: "Abraço com entusiasmo",
            feedback: "Você não tem medo de novo. Isso te abre portas, mas pode ser impulsivo."
          },
          {
            text: "Resisto e prefiro estabilidade",
            feedback: "Você valoriza segurança. Isso te protege, mas pode te prender."
          },
          {
            text: "Aceito quando necessário",
            feedback: "Você é pragmático. Isso é equilibrado e adaptável."
          },
          {
            text: "Fico ansioso e inseguro",
            feedback: "Mudança te desestabiliza. Isso é humano, mas pode te paralisar."
          }
        ]
      },
      {
        id: 8,
        question: "Quando tem que escolher entre segurança e risco:",
        options: [
          {
            text: "Escolho o risco se acredito no potencial",
            feedback: "Você arrisca. Isso pode trazer grandes ganhos, mas também grandes perdas."
          },
          {
            text: "Sempre escolho segurança",
            feedback: "Você se protege. Isso te mantém estável, mas pode limitar crescimento."
          },
          {
            text: "Analiso cuidadosamente antes de decidir",
            feedback: "Você equilibra. Isso é sábio e reduz arrependimentos."
          },
          {
            text: "Fico paralisado entre as opções",
            feedback: "Você trava. Isso pode te fazer perder oportunidades de ambos os lados."
          }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade em decisões é:",
        options: [
          {
            text: "Lidar com a possibilidade de errar",
            feedback: "Você tem medo de falhar. Isso pode te paralisar e impedir ação."
          },
          {
            text: "Saber o que eu realmente quero",
            feedback: "Você tem dificuldade em se conectar com seus desejos. Isso pode te deixar perdido."
          },
          {
            text: "Não me deixar influenciar demais pelos outros",
            feedback: "Você se deixa afetar por opiniões. Isso pode te fazer ignorar sua voz."
          },
          {
            text: "Agir depois de decidir",
            feedback: "Você decide, mas não age. Isso pode te fazer ficar preso em intenções."
          }
        ]
      },
      {
        id: 10,
        question: "Depois de tomar uma decisão importante:",
        options: [
          {
            text: "Sigo em frente sem olhar para trás",
            feedback: "Você não fica remoendo. Isso é saudável e te libera para o presente."
          },
          {
            text: "Fico questionando se fiz a escolha certa",
            feedback: "Você duvida. Isso pode te impedir de aproveitar o caminho escolhido."
          },
          {
            text: "Observo os resultados e ajusto se necessário",
            feedback: "Você é flexível. Isso é inteligente e permite correção de rota."
          },
          {
            text: "Sinto alívio por ter decidido",
            feedback: "Você valoriza fechamento. Isso te traz paz e clareza."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Decisor Intuitivo",
          description: "Você confia na sua intuição e age com base no que sente. Suas decisões são rápidas e você não fica preso em análises intermináveis.",
          strengths: [
            "Age com confiança",
            "Não paralisa analisando demais",
            "Confia em si mesmo",
            "Aproveita oportunidades"
          ],
          attentionPoints: [
            "Pode ser impulsivo às vezes",
            "Às vezes ignora fatos importantes",
            "Pode se arrepender de decisões rápidas",
            "Precisa equilibrar intuição com análise"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Analítico Equilibrado",
          description: "Você equilibra análise e intuição. Pensa antes de agir, mas não paralisa. Sua abordagem é madura e você busca tomar decisões conscientes.",
          strengths: [
            "Equilibra razão e emoção",
            "Pensa nas consequências",
            "Não age por impulso",
            "Aprende com erros"
          ],
          attentionPoints: [
            "Pode demorar demais às vezes",
            "Às vezes racionaliza demais",
            "Pode perder oportunidades por cautela",
            "Precisa confiar mais na intuição"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Cauteloso Reflexivo",
          description: "Você pensa muito antes de decidir e valoriza segurança. Prefere ter certeza antes de agir e busca minimizar riscos.",
          strengths: [
            "Evita erros por impulsividade",
            "Pensa nas consequências",
            "Valoriza estabilidade",
            "Não se arrepende facilmente"
          ],
          attentionPoints: [
            "Pode perder oportunidades por demora",
            "Às vezes paralisa analisando demais",
            "Pode ter dificuldade com mudanças",
            "Precisa arriscar mais às vezes"
          ]
        };
      } else {
        return {
          title: "Indeciso Questionador",
          description: "Você tem dificuldade em tomar decisões e tende a questionar suas escolhas. O medo de errar pode te paralisar e fazer você perder oportunidades.",
          strengths: [
            "Pensa muito antes de agir",
            "Considera múltiplas perspectivas",
            "Não age por impulso",
            "Valoriza fazer a escolha certa"
          ],
          attentionPoints: [
            "Paralisa com frequência",
            "Perde oportunidades por indecisão",
            "Carrega arrependimento",
            "Precisa desenvolver confiança em si"
          ]
        };
      }
    }
  },
  {
    id: "self-demand",
    title: "Seu nível de autocobrança",
    description: "Como você se cobra e lida com expectativas sobre si mesmo",
    purpose: "Entender se você é gentil ou duro consigo mesmo",
    icon: TrendingUp,
    questions: [
      {
        id: 1,
        question: "Quando você comete um erro:",
        options: [
          {
            text: "Me perdoo e sigo em frente",
            feedback: "Você é gentil consigo. Isso é saudável e te permite aprender sem se destruir."
          },
          {
            text: "Fico me cobrando por dias",
            feedback: "Você é duro consigo. Isso pode te paralisar e afetar sua autoestima."
          },
          {
            text: "Analiso o que aprendi",
            feedback: "Você transforma erro em aprendizado. Isso é construtivo e te faz crescer."
          },
          {
            text: "Tento esconder ou minimizar",
            feedback: "Você evita encarar. Isso te protege, mas impede aprendizado real."
          }
        ]
      },
      {
        id: 2,
        question: "Suas expectativas sobre você são:",
        options: [
          {
            text: "Realistas e alcançáveis",
            feedback: "Você se conhece bem. Isso te mantém motivado sem se esgotar."
          },
          {
            text: "Muito altas, quase impossíveis",
            feedback: "Você se cobra demais. Isso pode te levar ao esgotamento e frustração."
          },
          {
            text: "Baixas, para não me decepcionar",
            feedback: "Você se protege. Isso evita frustração, mas pode limitar seu potencial."
          },
          {
            text: "Variam muito dependendo do momento",
            feedback: "Você oscila. Isso pode te confundir e dificultar planejamento."
          }
        ]
      },
      {
        id: 3,
        question: "Quando não atinge um objetivo:",
        options: [
          {
            text: "Tento de novo com mais força",
            feedback: "Você é persistente. Isso é admirável, mas cuidado para não se esgotar."
          },
          {
            text: "Me sinto um fracasso",
            feedback: "Você se identifica com o resultado. Isso pode destruir sua autoestima."
          },
          {
            text: "Reavalio se o objetivo faz sentido",
            feedback: "Você é flexível. Isso é sábio e permite ajustes necessários."
          },
          {
            text: "Desisto e evito tentar de novo",
            feedback: "Você se protege desistindo. Isso evita dor, mas pode te fazer perder muito."
          }
        ]
      },
      {
        id: 4,
        question: "Você se compara com outras pessoas:",
        options: [
          {
            text: "Raramente, foco no meu próprio caminho",
            feedback: "Você tem clareza do seu processo. Isso te libera de competição desnecessária."
          },
          {
            text: "Frequentemente, e me sinto inferior",
            feedback: "Você se diminui. Isso pode destruir sua autoestima e motivação."
          },
          {
            text: "Às vezes, para me inspirar",
            feedback: "Você usa comparação de forma saudável. Isso pode te motivar sem te destruir."
          },
          {
            text: "Sempre, e me cobro para ser melhor",
            feedback: "Você compete constantemente. Isso pode te esgotar e nunca te satisfazer."
          }
        ]
      },
      {
        id: 5,
        question: "Quando alguém te elogia:",
        options: [
          {
            text: "Aceito e agradeço",
            feedback: "Você recebe bem. Isso mostra autoestima saudável."
          },
          {
            text: "Minimizo ou descarto",
            feedback: "Você tem dificuldade em se valorizar. Isso pode manter você em autossabotagem."
          },
          {
            text: "Fico desconfortável",
            feedback: "Você não se acha merecedor. Isso pode te impedir de reconhecer seu valor."
          },
          {
            text: "Questiono se é verdade",
            feedback: "Você duvida. Isso pode te impedir de internalizar reconhecimento."
          }
        ]
      },
      {
        id: 6,
        question: "Sobre descanso e pausas:",
        options: [
          {
            text: "Reconheço quando preciso e paro",
            feedback: "Você se respeita. Isso é essencial para sustentabilidade."
          },
          {
            text: "Me sinto culpado quando paro",
            feedback: "Você associa descanso a preguiça. Isso pode te levar ao esgotamento."
          },
          {
            text: "Só paro quando não aguento mais",
            feedback: "Você ignora seus limites. Isso pode te fazer colapsar."
          },
          {
            text: "Valorizo e priorizo meu bem-estar",
            feedback: "Você entende que descanso é produtivo. Isso te mantém saudável."
          }
        ]
      },
      {
        id: 7,
        question: "Quando você não é perfeito:",
        options: [
          {
            text: "Aceito como parte de ser humano",
            feedback: "Você é realista. Isso te libera de pressão impossível."
          },
          {
            text: "Me frustro e me cobro",
            feedback: "Você busca perfeição. Isso pode te esgotar e nunca te satisfazer."
          },
          {
            text: "Tento melhorar para a próxima",
            feedback: "Você busca crescimento. Isso é saudável e construtivo."
          },
          {
            text: "Sinto que decepcionei a mim e aos outros",
            feedback: "Você carrega peso excessivo. Isso pode te paralisar."
          }
        ]
      },
      {
        id: 8,
        question: "Sua voz interna é:",
        options: [
          {
            text: "Encorajadora e gentil",
            feedback: "Você é seu próprio aliado. Isso te fortalece e te faz crescer."
          },
          {
            text: "Crítica e dura",
            feedback: "Você é seu próprio inimigo. Isso pode te destruir por dentro."
          },
          {
            text: "Equilibrada entre apoio e cobrança",
            feedback: "Você se desafia sem se destruir. Isso é saudável e produtivo."
          },
          {
            text: "Confusa e contraditória",
            feedback: "Você não tem clareza. Isso pode te deixar perdido e inseguro."
          }
        ]
      },
      {
        id: 9,
        question: "Quando você falha em algo importante:",
        options: [
          {
            text: "Vejo como oportunidade de aprender",
            feedback: "Você transforma falha em crescimento. Isso é uma grande força."
          },
          {
            text: "Me sinto devastado",
            feedback: "Você se identifica com o resultado. Isso pode te destruir emocionalmente."
          },
          {
            text: "Busco entender o que aconteceu",
            feedback: "Você analisa sem se destruir. Isso é maduro e construtivo."
          },
          {
            text: "Evito pensar nisso",
            feedback: "Você foge da dor. Isso te protege, mas impede aprendizado."
          }
        ]
      },
      {
        id: 10,
        question: "Sua maior dificuldade consigo mesmo é:",
        options: [
          {
            text: "Aceitar minhas limitações",
            feedback: "Você luta contra sua humanidade. Isso pode te esgotar tentando ser mais do que é."
          },
          {
            text: "Não me cobrar tanto",
            feedback: "Você reconhece que é duro consigo. Isso é o primeiro passo para mudança."
          },
          {
            text: "Reconhecer meu valor",
            feedback: "Você tem dificuldade em se valorizar. Isso pode te fazer aceitar menos do que merece."
          },
          {
            text: "Não me comparar com outros",
            feedback: "Você se perde em comparações. Isso pode te fazer nunca se sentir suficiente."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Autocompaixão Saudável",
          description: "Você é gentil consigo mesmo e reconhece que erros fazem parte do processo. Sua autocobrança é equilibrada e te permite crescer sem se destruir.",
          strengths: [
            "Se perdoa e aprende com erros",
            "Tem autoestima saudável",
            "Não se compara destrutivamente",
            "Respeita seus limites"
          ],
          attentionPoints: [
            "Pode ser complacente demais às vezes",
            "Às vezes evita desafios necessários",
            "Pode não se esforçar o suficiente",
            "Precisa equilibrar gentileza com crescimento"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Equilibrado Realista",
          description: "Você se desafia sem se destruir. Sua autocobrança é saudável e te motiva a crescer, mas você também reconhece quando precisa de gentileza consigo mesmo.",
          strengths: [
            "Equilibra cobrança e compaixão",
            "Busca crescimento sustentável",
            "Aprende com erros sem se destruir",
            "Tem expectativas realistas"
          ],
          attentionPoints: [
            "Pode oscilar entre extremos às vezes",
            "Às vezes duvida se está fazendo o suficiente",
            "Pode ser duro consigo em momentos de estresse",
            "Precisa manter o equilíbrio conscientemente"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Autocrítico Exigente",
          description: "Você é duro consigo mesmo e tem expectativas altas. Sua autocobrança é intensa e você pode se sentir nunca suficiente, mesmo quando está indo bem.",
          strengths: [
            "Busca excelência",
            "Não se acomoda",
            "Tem padrões altos",
            "Se esforça muito"
          ],
          attentionPoints: [
            "Pode se esgotar emocionalmente",
            "Às vezes se sente nunca suficiente",
            "Pode ter dificuldade em reconhecer conquistas",
            "Precisa aprender autocompaixão"
          ]
        };
      } else {
        return {
          title: "Perfeccionista Severo",
          description: "Você é extremamente duro consigo mesmo e pode se sentir um fracasso mesmo quando está indo bem. Sua autocobrança é destrutiva e pode estar te impedindo de viver plenamente.",
          strengths: [
            "Tem padrões muito altos",
            "Não aceita mediocridade",
            "Se esforça ao máximo",
            "Busca sempre melhorar"
          ],
          attentionPoints: [
            "Pode estar se destruindo por dentro",
            "Nunca se sente suficiente",
            "Pode estar em risco de esgotamento",
            "Precisa urgentemente de autocompaixão"
          ]
        };
      }
    }
  },
  {
    id: "frustrations",
    title: "Como você lida com frustrações",
    description: "Seu padrão quando as coisas não saem como esperado",
    purpose: "Entender como você reage quando a vida não coopera",
    icon: Wind,
    questions: [
      {
        id: 1,
        question: "Quando algo não sai como planejado:",
        options: [
          {
            text: "Me adapto e busco alternativas",
            feedback: "Você é flexível. Isso te ajuda a não travar, mas certifique-se de processar a frustração."
          },
          {
            text: "Fico frustrado e irritado",
            feedback: "Você sente intensamente. Isso é humano, mas pode te fazer reagir de formas que se arrepende."
          },
          {
            text: "Desisto e deixo para lá",
            feedback: "Você se protege desistindo. Isso evita mais frustração, mas pode te fazer perder muito."
          },
          {
            text: "Insisto até conseguir",
            feedback: "Você é persistente. Isso é admirável, mas pode te esgotar se não souber quando parar."
          }
        ]
      },
      {
        id: 2,
        question: "Sua tolerância à frustração é:",
        options: [
          {
            text: "Alta, consigo lidar bem",
            feedback: "Você aguenta bem. Isso é uma força, mas cuidado para não normalizar situações ruins."
          },
          {
            text: "Baixa, me irrito facilmente",
            feedback: "Você se frustra rápido. Isso pode te fazer desistir de coisas importantes cedo demais."
          },
          {
            text: "Varia muito dependendo do contexto",
            feedback: "Você é contextual. Isso é natural, mas pode te confundir sobre seus limites."
          },
          {
            text: "Média, depende do que está em jogo",
            feedback: "Você é realista. Isso te ajuda a dosar energia de forma inteligente."
          }
        ]
      },
      {
        id: 3,
        question: "Quando você se sente impotente:",
        options: [
          {
            text: "Busco o que está no meu controle",
            feedback: "Você foca no que pode fazer. Isso é sábio e te mantém ativo."
          },
          {
            text: "Fico ansioso e desesperado",
            feedback: "Você se desorganiza. Isso pode te paralisar quando mais precisa agir."
          },
          {
            text: "Aceito e espero passar",
            feedback: "Você se rende. Isso pode trazer paz, mas pode te fazer passivo demais."
          },
          {
            text: "Fico remoendo e sofrendo",
            feedback: "Você se prende. Isso pode te esgotar emocionalmente sem resolver nada."
          }
        ]
      },
      {
        id: 4,
        question: "Quando alguém te decepciona:",
        options: [
          {
            text: "Converso sobre o que aconteceu",
            feedback: "Você busca resolução. Isso é maduro e pode fortalecer relações."
          },
          {
            text: "Me afasto e guardo mágoa",
            feedback: "Você se protege. Isso evita mais dor, mas pode envenenar relações."
          },
          {
            text: "Tento entender o lado da pessoa",
            feedback: "Você busca empatia. Isso é generoso, mas não ignore seus próprios sentimentos."
          },
          {
            text: "Fico magoado mas não falo",
            feedback: "Você internaliza. Isso evita conflito, mas pode criar ressentimento."
          }
        ]
      },
      {
        id: 5,
        question: "Quando você falha repetidamente:",
        options: [
          {
            text: "Continuo tentando de formas diferentes",
            feedback: "Você é resiliente. Isso é admirável, mas certifique-se de que vale a pena."
          },
          {
            text: "Começo a duvidar de mim",
            feedback: "Você internaliza falha. Isso pode destruir sua autoestima."
          },
          {
            text: "Reavalio se faz sentido continuar",
            feedback: "Você é realista. Isso é sábio e evita desgaste desnecessário."
          },
          {
            text: "Desisto e evito tentar de novo",
            feedback: "Você se protege desistindo. Isso evita mais dor, mas pode te fazer perder muito."
          }
        ]
      },
      {
        id: 6,
        question: "Quando você está frustrado:",
        options: [
          {
            text: "Expresso o que estou sentindo",
            feedback: "Você comunica. Isso é saudável e evita acúmulo."
          },
          {
            text: "Guardo e fico remoendo",
            feedback: "Você internaliza. Isso pode virar ressentimento e afetar sua saúde."
          },
          {
            text: "Busco formas de descarregar",
            feedback: "Você processa ativamente. Isso é inteligente e te ajuda a seguir em frente."
          },
          {
            text: "Explodo com quem não tem nada a ver",
            feedback: "Você desloca. Isso pode prejudicar relações importantes."
          }
        ]
      },
      {
        id: 7,
        question: "Sobre expectativas não atendidas:",
        options: [
          {
            text: "Ajusto e sigo em frente",
            feedback: "Você é flexível. Isso te ajuda a não travar, mas processe a decepção."
          },
          {
            text: "Fico decepcionado por muito tempo",
            feedback: "Você carrega. Isso pode te prender no passado e afetar o presente."
          },
          {
            text: "Questiono se minhas expectativas eram realistas",
            feedback: "Você reflete. Isso é maduro e te ajuda a calibrar melhor."
          },
          {
            text: "Evito criar expectativas para não me decepcionar",
            feedback: "Você se protege. Isso evita dor, mas pode te fazer perder esperança."
          }
        ]
      },
      {
        id: 8,
        question: "Quando você se sente injustiçado:",
        options: [
          {
            text: "Luto pelos meus direitos",
            feedback: "Você age. Isso é forte, mas escolha suas batalhas."
          },
          {
            text: "Fico magoado mas não faço nada",
            feedback: "Você se paralisa. Isso pode te fazer aceitar o inaceitável."
          },
          {
            text: "Busco formas diplomáticas de resolver",
            feedback: "Você equilibra. Isso é maduro e eficaz."
          },
          {
            text: "Me questiono se realmente foi injustiça",
            feedback: "Você duvida. Isso pode te fazer ignorar seus limites."
          }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade com frustrações é:",
        options: [
          {
            text: "Não desistir cedo demais",
            feedback: "Você tem dificuldade em persistir. Isso pode te fazer perder oportunidades."
          },
          {
            text: "Não me deixar abater",
            feedback: "Frustração te afeta muito. Isso pode te paralisar e afetar autoestima."
          },
          {
            text: "Saber quando vale a pena insistir",
            feedback: "Você tem dificuldade em calibrar. Isso pode te fazer desperdiçar energia."
          },
          {
            text: "Não explodir com os outros",
            feedback: "Você desloca frustração. Isso pode prejudicar relações importantes."
          }
        ]
      },
      {
        id: 10,
        question: "Depois de uma grande frustração:",
        options: [
          {
            text: "Me recupero relativamente rápido",
            feedback: "Você é resiliente. Isso te ajuda a seguir em frente sem ficar preso."
          },
          {
            text: "Demoro muito para superar",
            feedback: "Você carrega. Isso pode te prender no passado e afetar o presente."
          },
          {
            text: "Analiso o que aprendi",
            feedback: "Você transforma em aprendizado. Isso é valioso para crescimento."
          },
          {
            text: "Evito situações parecidas no futuro",
            feedback: "Você se protege. Isso é natural, mas pode limitar suas experiências."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Resiliente Adaptável",
          description: "Você lida bem com frustrações e consegue se adaptar quando as coisas não saem como esperado. Sua flexibilidade é uma grande força.",
          strengths: [
            "Se adapta facilmente",
            "Não trava com imprevistos",
            "Busca alternativas",
            "Mantém clareza em situações difíceis"
          ],
          attentionPoints: [
            "Pode não processar frustrações adequadamente",
            "Às vezes aceita situações que não deveria",
            "Pode parecer que nada te afeta",
            "Precisa permitir sentir decepção"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Equilibrado Realista",
          description: "Você sente frustração, mas não deixa que ela te paralise. Sua abordagem é equilibrada entre sentir e agir.",
          strengths: [
            "Processa emoções sem se perder",
            "Equilibra persistência e flexibilidade",
            "Aprende com frustrações",
            "Não desiste facilmente"
          ],
          attentionPoints: [
            "Pode oscilar entre extremos às vezes",
            "Às vezes duvida se está reagindo bem",
            "Pode ser duro consigo em momentos difíceis",
            "Precisa confiar mais no seu processo"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Sensível Afetado",
          description: "Frustrações te afetam profundamente e você pode levar tempo para se recuperar. Sua sensibilidade te faz sentir tudo intensamente.",
          strengths: [
            "Processa profundamente",
            "Não ignora o que sente",
            "Aprende com experiências difíceis",
            "Valoriza quando as coisas dão certo"
          ],
          attentionPoints: [
            "Pode se abater facilmente",
            "Às vezes carrega frustração por muito tempo",
            "Pode desistir cedo demais",
            "Precisa desenvolver resiliência"
          ]
        };
      } else {
        return {
          title: "Vulnerável a Frustrações",
          description: "Você tem baixa tolerância à frustração e pode se sentir facilmente sobrecarregado quando as coisas não saem como esperado. Isso pode estar te impedindo de persistir em coisas importantes.",
          strengths: [
            "Reconhece seus limites",
            "Não força além do que aguenta",
            "Busca ambientes mais previsíveis",
            "Valoriza estabilidade"
          ],
          attentionPoints: [
            "Pode desistir muito facilmente",
            "Às vezes evita desafios necessários",
            "Pode se sentir impotente com frequência",
            "Precisa desenvolver tolerância gradualmente"
          ]
        };
      }
    }
  },
  {
    id: "communication",
    title: "Comunicação em momentos difíceis",
    description: "Como você se expressa quando as coisas ficam tensas",
    purpose: "Entender como você se comunica sob pressão emocional",
    icon: MessageSquare,
    questions: [
      {
        id: 1,
        question: "Em uma discussão acalorada, você:",
        options: [
          {
            text: "Falo o que penso diretamente",
            feedback: "Você é direto. Isso traz clareza, mas pode machucar se não tiver cuidado com o tom."
          },
          {
            text: "Me calo para não piorar",
            feedback: "Você se protege. Isso evita escalada, mas pode deixar coisas sem resolver."
          },
          {
            text: "Tento acalmar a situação",
            feedback: "Você busca paz. Isso é valioso, mas não ignore suas próprias necessidades."
          },
          {
            text: "Saio da situação",
            feedback: "Você se afasta. Isso te protege, mas pode deixar o outro sem entender."
          }
        ]
      },
      {
        id: 2,
        question: "Quando precisa dar uma notícia difícil:",
        options: [
          {
            text: "Falo diretamente, sem rodeios",
            feedback: "Você é honesto. Isso é respeitoso, mas pode ser duro demais às vezes."
          },
          {
            text: "Preparo o terreno antes",
            feedback: "Você é cuidadoso. Isso demonstra empatia e suaviza o impacto."
          },
          {
            text: "Evito ou adia o máximo possível",
            feedback: "Você foge. Isso te protege, mas pode piorar a situação."
          },
          {
            text: "Peço ajuda de outra pessoa",
            feedback: "Você delega. Isso pode ser sábio, mas às vezes você precisa enfrentar."
          }
        ]
      },
      {
        id: 3,
        question: "Quando alguém te magoa, você:",
        options: [
          {
            text: "Falo imediatamente sobre o que senti",
            feedback: "Você comunica. Isso é saudável, mas certifique-se do timing e tom."
          },
          {
            text: "Guardo e processo sozinho",
            feedback: "Você internaliza. Isso te dá tempo, mas pode criar ressentimento."
          },
          {
            text: "Demonstro através do meu comportamento",
            feedback: "Você comunica indiretamente. Isso pode confundir o outro."
          },
          {
            text: "Finjo que está tudo bem",
            feedback: "Você esconde. Isso evita conflito, mas pode te fazer explodir depois."
          }
        ]
      },
      {
        id: 4,
        question: "Sua comunicação sob estresse é:",
        options: [
          {
            text: "Clara e direta",
            feedback: "Você mantém clareza. Isso é valioso, mas cuidado com o tom."
          },
          {
            text: "Confusa e desorganizada",
            feedback: "Você se desorganiza. Isso pode dificultar resolução de problemas."
          },
          {
            text: "Agressiva ou defensiva",
            feedback: "Você se protege atacando. Isso pode escalar conflitos desnecessariamente."
          },
          {
            text: "Travada, não consigo me expressar",
            feedback: "Você paralisa. Isso pode te deixar incompreendido e frustrado."
          }
        ]
      },
      {
        id: 5,
        question: "Quando você discorda de alguém:",
        options: [
          {
            text: "Expresso minha opinião claramente",
            feedback: "Você se posiciona. Isso é importante, mas respeite a opinião do outro."
          },
          {
            text: "Evito confronto e concordo",
            feedback: "Você cede. Isso mantém paz, mas pode te fazer perder sua voz."
          },
          {
            text: "Busco entender o ponto de vista do outro primeiro",
            feedback: "Você prioriza compreensão. Isso é maduro e abre diálogo."
          },
          {
            text: "Me afasto da conversa",
            feedback: "Você evita. Isso te protege, mas pode criar distância."
          }
        ]
      },
      {
        id: 6,
        question: "Quando você precisa pedir ajuda:",
        options: [
          {
            text: "Peço sem problemas",
            feedback: "Você reconhece limites. Isso é saudável e cria conexão."
          },
          {
            text: "Tenho muita dificuldade em pedir",
            feedback: "Você se força a fazer sozinho. Isso pode te sobrecarregar."
          },
          {
            text: "Só peço em último caso",
            feedback: "Você resiste. Isso pode te fazer sofrer desnecessariamente."
          },
          {
            text: "Comunico minhas necessidades claramente",
            feedback: "Você é direto. Isso facilita para quem quer te ajudar."
          }
        ]
      },
      {
        id: 7,
        question: "Quando alguém te critica:",
        options: [
          {
            text: "Ouço e considero o feedback",
            feedback: "Você é aberto. Isso te ajuda a crescer, mas não aceite tudo sem filtro."
          },
          {
            text: "Me defendo imediatamente",
            feedback: "Você se protege. Isso é natural, mas pode te impedir de aprender."
          },
          {
            text: "Fico magoado e me fecho",
            feedback: "Você se retrai. Isso te protege, mas pode criar distância."
          },
          {
            text: "Busco entender a intenção da pessoa",
            feedback: "Você analisa. Isso é sábio, mas não ignore o que sentiu."
          }
        ]
      },
      {
        id: 8,
        question: "Em conflitos, você tende a:",
        options: [
          {
            text: "Buscar resolução rápida",
            feedback: "Você não deixa arrastar. Isso é eficiente, mas certifique-se de resolver de verdade."
          },
          {
            text: "Evitar até não ter escolha",
            feedback: "Você adia. Isso pode fazer pequenos problemas virarem grandes."
          },
          {
            text: "Analisar todos os lados antes de falar",
            feedback: "Você é cuidadoso. Isso evita erros, mas pode demorar demais."
          },
          {
            text: "Ceder para manter a paz",
            feedback: "Você prioriza harmonia. Isso é nobre, mas não ignore suas necessidades."
          }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade em comunicação é:",
        options: [
          {
            text: "Expressar o que realmente sinto",
            feedback: "Você trava. Isso pode te deixar incompreendido e frustrado."
          },
          {
            text: "Não ser agressivo quando estou irritado",
            feedback: "Você desloca raiva. Isso pode prejudicar relações importantes."
          },
          {
            text: "Ouvir sem interromper ou julgar",
            feedback: "Você tem dificuldade em escutar. Isso pode criar conflitos desnecessários."
          },
          {
            text: "Encontrar o momento certo para falar",
            feedback: "Você tem dificuldade com timing. Isso pode fazer boas intenções darem errado."
          }
        ]
      },
      {
        id: 10,
        question: "Depois de uma conversa difícil:",
        options: [
          {
            text: "Sinto alívio por ter falado",
            feedback: "Você valoriza expressão. Isso te libera e traz clareza."
          },
          {
            text: "Fico remoendo o que disse",
            feedback: "Você se questiona. Isso pode te fazer evitar conversas necessárias."
          },
          {
            text: "Analiso o que poderia ter feito diferente",
            feedback: "Você busca melhorar. Isso é valioso, mas não ignore o que fez bem."
          },
          {
            text: "Evito situações parecidas no futuro",
            feedback: "Você se protege. Isso é natural, mas pode limitar suas relações."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Comunicador Direto",
          description: "Você se expressa de forma clara e direta, mesmo em momentos difíceis. Sua honestidade é uma força, mas precisa equilibrar com empatia.",
          strengths: [
            "Comunica claramente",
            "Não deixa coisas sem resolver",
            "É honesto e autêntico",
            "Não tem medo de conversas difíceis"
          ],
          attentionPoints: [
            "Pode ser duro demais às vezes",
            "Às vezes não considera o timing",
            "Pode machucar sem intenção",
            "Precisa equilibrar honestidade com empatia"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Comunicador Equilibrado",
          description: "Você equilibra honestidade e empatia. Sua comunicação é madura e você busca resolver conflitos de forma construtiva.",
          strengths: [
            "Equilibra clareza e empatia",
            "Escolhe bem o momento de falar",
            "Ouve antes de responder",
            "Busca resolução construtiva"
          ],
          attentionPoints: [
            "Pode demorar demais para falar às vezes",
            "Às vezes analisa demais",
            "Pode evitar conflitos necessários",
            "Precisa confiar mais na espontaneidade"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Comunicador Cauteloso",
          description: "Você é cuidadoso com suas palavras e pode ter dificuldade em se expressar em momentos de tensão. Sua cautela te protege, mas pode criar distância.",
          strengths: [
            "Não machuca impulsivamente",
            "Pensa antes de falar",
            "Valoriza harmonia",
            "Não cria conflitos desnecessários"
          ],
          attentionPoints: [
            "Pode guardar coisas demais",
            "Às vezes não se posiciona",
            "Pode criar ressentimentos",
            "Precisa aprender a se expressar mais"
          ]
        };
      } else {
        return {
          title: "Comunicador Travado",
          description: "Você tem grande dificuldade em se expressar, especialmente em momentos difíceis. Isso pode estar criando solidão e mal-entendidos nas suas relações.",
          strengths: [
            "Não cria conflitos",
            "Protege sua privacidade",
            "Não machuca outros",
            "Mantém a paz"
          ],
          attentionPoints: [
            "Pode se sentir incompreendido",
            "Às vezes acumula ressentimentos",
            "Pode criar distância nas relações",
            "Precisa desenvolver expressão gradualmente"
          ]
        };
      }
    }
  },
  {
    id: "emotional-organization",
    title: "Organização emocional no dia a dia",
    description: "Como você lida com suas emoções na rotina",
    purpose: "Entender como você gerencia o que sente no cotidiano",
    icon: Lightbulb,
    questions: [
      {
        id: 1,
        question: "Quando você acorda de mau humor:",
        options: [
          {
            text: "Tento identificar o motivo",
            feedback: "Você busca entender. Isso te dá clareza e permite agir na causa."
          },
          {
            text: "Aceito e sigo com o dia",
            feedback: "Você não luta contra. Isso é saudável, mas não ignore padrões."
          },
          {
            text: "Fico irritado o dia todo",
            feedback: "Você carrega. Isso pode afetar tudo ao seu redor e te esgotar."
          },
          {
            text: "Busco formas de melhorar meu estado",
            feedback: "Você age ativamente. Isso te dá controle e melhora seu dia."
          }
        ]
      },
      {
        id: 2,
        question: "Você tem consciência das suas emoções:",
        options: [
          {
            text: "Sim, consigo identificar facilmente",
            feedback: "Você tem clareza. Isso é uma grande força e te permite agir adequadamente."
          },
          {
            text: "Às vezes, depende da intensidade",
            feedback: "Você percebe quando é forte. Isso é natural, mas desenvolva percepção de emoções sutis."
          },
          {
            text: "Raramente, só percebo depois",
            feedback: "Você tem dificuldade em tempo real. Isso pode te fazer reagir sem entender por quê."
          },
          {
            text: "Não, tenho dificuldade em nomear",
            feedback: "Você se desconecta. Isso pode te deixar confuso e sem saber como agir."
          }
        ]
      },
      {
        id: 3,
        question: "Quando você está sobrecarregado emocionalmente:",
        options: [
          {
            text: "Paro e cuido de mim",
            feedback: "Você se respeita. Isso é essencial para não colapsar."
          },
          {
            text: "Continuo até não aguentar mais",
            feedback: "Você ignora sinais. Isso pode te levar ao esgotamento."
          },
          {
            text: "Busco apoio de alguém",
            feedback: "Você reconhece que precisa de ajuda. Isso é saudável e cria conexão."
          },
          {
            text: "Me isolo e sofro sozinho",
            feedback: "Você se fecha. Isso pode intensificar o sofrimento."
          }
        ]
      },
      {
        id: 4,
        question: "Você tem rituais ou práticas para cuidar das suas emoções:",
        options: [
          {
            text: "Sim, tenho rotinas que me ajudam",
            feedback: "Você se cuida ativamente. Isso é essencial para sustentabilidade emocional."
          },
          {
            text: "Às vezes, quando lembro",
            feedback: "Você sabe o que ajuda, mas não prioriza. Isso pode te deixar vulnerável."
          },
          {
            text: "Não, só lido quando fica insuportável",
            feedback: "Você é reativo. Isso pode te fazer sofrer desnecessariamente."
          },
          {
            text: "Não sei o que me ajuda",
            feedback: "Você está perdido. Isso pode te deixar sem recursos quando precisa."
          }
        ]
      },
      {
        id: 5,
        question: "Quando você percebe um padrão emocional negativo:",
        options: [
          {
            text: "Busco entender e mudar",
            feedback: "Você age ativamente. Isso te dá controle e permite crescimento."
          },
          {
            text: "Reconheço mas não sei como mudar",
            feedback: "Você tem consciência, mas não ação. Isso pode te frustrar."
          },
          {
            text: "Ignoro e espero passar",
            feedback: "Você evita. Isso pode fazer padrões se fortalecerem."
          },
          {
            text: "Me culpo por não conseguir mudar",
            feedback: "Você se cobra. Isso pode te paralisar em vez de te motivar."
          }
        ]
      },
      {
        id: 6,
        question: "Sobre autocuidado emocional:",
        options: [
          {
            text: "É prioridade na minha vida",
            feedback: "Você se valoriza. Isso é essencial para bem-estar sustentável."
          },
          {
            text: "Sei que é importante, mas não faço",
            feedback: "Você sabe, mas não age. Isso pode te deixar vulnerável."
          },
          {
            text: "Só cuido quando estou mal",
            feedback: "Você é reativo. Isso pode te fazer sofrer desnecessariamente."
          },
          {
            text: "Vejo como luxo ou egoísmo",
            feedback: "Você se negligencia. Isso pode te levar ao esgotamento."
          }
        ]
      },
      {
        id: 7,
        question: "Quando você está ansioso:",
        options: [
          {
            text: "Tenho estratégias que me acalmam",
            feedback: "Você tem recursos. Isso te dá controle e reduz sofrimento."
          },
          {
            text: "Fico paralisado, não sei o que fazer",
            feedback: "Você trava. Isso pode intensificar a ansiedade."
          },
          {
            text: "Tento me distrair",
            feedback: "Você evita. Isso alivia momentaneamente, mas não resolve."
          },
          {
            text: "Busco entender o que está causando",
            feedback: "Você investiga. Isso te dá clareza e permite agir na causa."
          }
        ]
      },
      {
        id: 8,
        question: "Você consegue regular suas emoções:",
        options: [
          {
            text: "Sim, consigo me acalmar quando necessário",
            feedback: "Você tem controle. Isso é uma grande força e te protege."
          },
          {
            text: "Às vezes, depende da intensidade",
            feedback: "Você tem limites. Isso é natural, mas desenvolva mais recursos."
          },
          {
            text: "Raramente, sou levado pelas emoções",
            feedback: "Você é reativo. Isso pode te fazer agir de formas que se arrepende."
          },
          {
            text: "Não, me sinto refém do que sinto",
            feedback: "Você se sente impotente. Isso pode te deixar vulnerável e desgastado."
          }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade emocional no dia a dia é:",
        options: [
          {
            text: "Lidar com imprevistos emocionais",
            feedback: "Você se desorganiza com surpresas. Isso pode te deixar vulnerável."
          },
          {
            text: "Manter estabilidade emocional",
            feedback: "Você oscila. Isso pode te cansar e confundir."
          },
          {
            text: "Não deixar emoções afetarem tudo",
            feedback: "Você se deixa dominar. Isso pode prejudicar várias áreas da vida."
          },
          {
            text: "Pedir ajuda quando preciso",
            feedback: "Você tenta fazer sozinho. Isso pode te sobrecarregar."
          }
        ]
      },
      {
        id: 10,
        question: "Sobre suas emoções, você:",
        options: [
          {
            text: "Sinto que tenho controle e clareza",
            feedback: "Você está bem consigo. Isso é uma grande conquista."
          },
          {
            text: "Estou aprendendo a lidar melhor",
            feedback: "Você está em processo. Isso é valioso e mostra crescimento."
          },
          {
            text: "Me sinto perdido e confuso",
            feedback: "Você está desorientado. Isso pode te deixar vulnerável."
          },
          {
            text: "Evito pensar muito nisso",
            feedback: "Você se desconecta. Isso pode te deixar sem recursos quando precisa."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Organizado Consciente",
          description: "Você tem clareza emocional e sabe cuidar do que sente. Sua organização emocional é uma grande força e te permite viver de forma mais equilibrada.",
          strengths: [
            "Tem consciência emocional",
            "Cuida ativamente de si",
            "Tem estratégias que funcionam",
            "Consegue regular emoções"
          ],
          attentionPoints: [
            "Pode ser muito controlado às vezes",
            "Às vezes intelectualiza demais",
            "Pode evitar emoções intensas",
            "Precisa permitir mais espontaneidade"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Em Desenvolvimento",
          description: "Você está aprendendo a lidar com suas emoções. Tem consciência e busca melhorar, o que é valioso. Continue desenvolvendo seus recursos.",
          strengths: [
            "Está em processo de crescimento",
            "Reconhece o que precisa melhorar",
            "Busca formas de se cuidar",
            "Tem momentos de clareza"
          ],
          attentionPoints: [
            "Ainda oscila bastante",
            "Às vezes não age no que sabe",
            "Pode se frustrar com o processo",
            "Precisa ser paciente consigo"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Desorganizado Reativo",
          description: "Você tem dificuldade em lidar com suas emoções no dia a dia e tende a ser reativo. Isso pode estar te deixando vulnerável e desgastado.",
          strengths: [
            "Reconhece que precisa de ajuda",
            "Não ignora completamente",
            "Está aberto a aprender",
            "Valoriza bem-estar"
          ],
          attentionPoints: [
            "Pode se sentir refém das emoções",
            "Às vezes não sabe o que fazer",
            "Pode sofrer desnecessariamente",
            "Precisa desenvolver recursos"
          ]
        };
      } else {
        return {
          title: "Desconectado Vulnerável",
          description: "Você tem grande dificuldade em lidar com suas emoções e pode estar se desconectando delas. Isso pode estar te deixando muito vulnerável e sem recursos.",
          strengths: [
            "Está aqui buscando entender",
            "Reconhece que algo não está bem",
            "Tem potencial para crescer",
            "Pode aprender novas formas"
          ],
          attentionPoints: [
            "Pode estar em sofrimento constante",
            "Às vezes se sente perdido",
            "Pode precisar de apoio profissional",
            "Precisa urgentemente desenvolver recursos"
          ]
        };
      }
    }
  },
  {
    id: "adaptability",
    title: "Como você se adapta a mudanças",
    description: "Seu padrão quando a vida muda de direção",
    purpose: "Entender como você lida quando tudo muda",
    icon: Wind,
    questions: [
      {
        id: 1,
        question: "Quando algo muda inesperadamente na sua vida:",
        options: [
          {
            text: "Me adapto rapidamente",
            feedback: "Você é flexível. Isso te ajuda a não travar, mas processe o que mudou."
          },
          {
            text: "Fico ansioso e resistente",
            feedback: "Mudança te desestabiliza. Isso é natural, mas pode te paralisar."
          },
          {
            text: "Preciso de tempo para processar",
            feedback: "Você precisa de espaço. Isso é válido, mas não fique preso demais."
          },
          {
            text: "Busco entender e me reorganizar",
            feedback: "Você age conscientemente. Isso te dá controle e clareza."
          }
        ]
      },
      {
        id: 2,
        question: "Sobre mudanças planejadas:",
        options: [
          {
            text: "Abraço com entusiasmo",
            feedback: "Você não tem medo. Isso te abre portas, mas avalie riscos."
          },
          {
            text: "Planejo cuidadosamente antes",
            feedback: "Você se prepara. Isso reduz ansiedade e aumenta chances de sucesso."
          },
          {
            text: "Fico ansioso mesmo sabendo que vem",
            feedback: "Você antecipa. Isso pode te esgotar antes mesmo de acontecer."
          },
          {
            text: "Evito mudanças sempre que possível",
            feedback: "Você resiste. Isso te mantém seguro, mas pode te prender."
          }
        ]
      },
      {
        id: 3,
        question: "Quando sua rotina é interrompida:",
        options: [
          {
            text: "Me adapto sem problemas",
            feedback: "Você é flexível. Isso te ajuda a não travar com imprevistos."
          },
          {
            text: "Fico irritado e desorganizado",
            feedback: "Você depende de rotina. Isso pode te deixar vulnerável a imprevistos."
          },
          {
            text: "Aceito mas fico desconfortável",
            feedback: "Você tolera. Isso é funcional, mas desenvolva mais flexibilidade."
          },
          {
            text: "Busco restabelecer a rotina rapidamente",
            feedback: "Você valoriza estrutura. Isso te organiza, mas pode te enrijecer."
          }
        ]
      },
      {
        id: 4,
        question: "Em ambientes novos, você:",
        options: [
          {
            text: "Me sinto confortável rapidamente",
            feedback: "Você se adapta bem. Isso te abre muitas portas e oportunidades."
          },
          {
            text: "Preciso de tempo para me ambientar",
            feedback: "Você é cauteloso. Isso é natural, mas não deixe que te paralise."
          },
          {
            text: "Fico ansioso e desconfortável",
            feedback: "Novo te desestabiliza. Isso pode te limitar em experiências."
          },
          {
            text: "Observo antes de me envolver",
            feedback: "Você analisa primeiro. Isso é sábio, mas não fique só observando."
          }
        ]
      },
      {
        id: 5,
        question: "Quando precisa mudar de planos:",
        options: [
          {
            text: "Ajusto facilmente",
            feedback: "Você é flexível. Isso te ajuda a não travar com imprevistos."
          },
          {
            text: "Fico frustrado mas me adapto",
            feedback: "Você sente, mas age. Isso é funcional e realista."
          },
          {
            text: "Insisto no plano original",
            feedback: "Você resiste. Isso pode te fazer perder oportunidades melhores."
          },
          {
            text: "Fico perdido sem saber o que fazer",
            feedback: "Você trava. Isso pode te deixar vulnerável a imprevistos."
          }
        ]
      },
      {
        id: 6,
        question: "Sobre sair da zona de conforto:",
        options: [
          {
            text: "Busco ativamente",
            feedback: "Você não tem medo. Isso te faz crescer, mas avalie riscos."
          },
          {
            text: "Aceito quando necessário",
            feedback: "Você é pragmático. Isso é equilibrado e funcional."
          },
          {
            text: "Evito sempre que possível",
            feedback: "Você se protege. Isso te mantém seguro, mas pode te prender."
          },
          {
            text: "Fico ansioso só de pensar",
            feedback: "Você tem medo. Isso pode te limitar em crescimento e oportunidades."
          }
        ]
      },
      {
        id: 7,
        question: "Quando tudo muda ao mesmo tempo:",
        options: [
          {
            text: "Priorizo e lido uma coisa de cada vez",
            feedback: "Você mantém clareza. Isso te ajuda a não se perder no caos."
          },
          {
            text: "Fico sobrecarregado e paralisado",
            feedback: "Você trava. Isso pode te deixar vulnerável quando mais precisa agir."
          },
          {
            text: "Busco apoio para lidar",
            feedback: "Você reconhece limites. Isso é sábio e te protege de colapso."
          },
          {
            text: "Entro em modo sobrevivência",
            feedback: "Você se protege. Isso é natural, mas pode te fazer perder oportunidades."
          }
        ]
      },
      {
        id: 8,
        question: "Sua relação com o desconhecido é:",
        options: [
          {
            text: "Curiosidade e abertura",
            feedback: "Você abraça. Isso te abre muitas portas e experiências."
          },
          {
            text: "Cautela e análise",
            feedback: "Você avalia. Isso é sábio, mas não deixe que te paralise."
          },
          {
            text: "Ansiedade e medo",
            feedback: "Você teme. Isso pode te limitar em crescimento e oportunidades."
          },
          {
            text: "Evitação sempre que possível",
            feedback: "Você foge. Isso te mantém seguro, mas pode te prender."
          }
        ]
      },
      {
        id: 9,
        question: "Sua maior dificuldade com mudanças é:",
        options: [
          {
            text: "Lidar com a incerteza",
            feedback: "Você precisa de previsibilidade. Isso pode te deixar vulnerável a imprevistos."
          },
          {
            text: "Deixar ir o que era antes",
            feedback: "Você se apega. Isso pode te impedir de abraçar o novo."
          },
          {
            text: "Não saber como agir",
            feedback: "Você trava. Isso pode te deixar perdido quando mais precisa de clareza."
          },
          {
            text: "Confiar que vai dar certo",
            feedback: "Você tem medo. Isso pode te paralisar e impedir ação."
          }
        ]
      },
      {
        id: 10,
        question: "Depois de uma grande mudança:",
        options: [
          {
            text: "Me adapto e sigo em frente",
            feedback: "Você é resiliente. Isso te ajuda a não ficar preso no passado."
          },
          {
            text: "Demoro para me ajustar",
            feedback: "Você precisa de tempo. Isso é natural, mas não fique preso demais."
          },
          {
            text: "Fico nostálgico do que era antes",
            feedback: "Você se apega. Isso pode te impedir de aproveitar o presente."
          },
          {
            text: "Analiso o que aprendi",
            feedback: "Você transforma em aprendizado. Isso é valioso para crescimento."
          }
        ]
      }
    ],
    getResult: (answers: number[]) => {
      const sum = answers.reduce((acc, val) => acc + val, 0);
      const avg = sum / answers.length;

      if (avg <= 1) {
        return {
          title: "Adaptável Flexível",
          description: "Você lida bem com mudanças e se adapta facilmente a novas situações. Sua flexibilidade é uma grande força e te abre muitas portas.",
          strengths: [
            "Se adapta rapidamente",
            "Não trava com imprevistos",
            "Abraça o novo",
            "Não se apega ao passado"
          ],
          attentionPoints: [
            "Pode mudar demais e perder raízes",
            "Às vezes não processa o que mudou",
            "Pode parecer instável para outros",
            "Precisa equilibrar mudança com estabilidade"
          ]
        };
      } else if (avg <= 1.5) {
        return {
          title: "Equilibrado Consciente",
          description: "Você equilibra abertura e cautela com mudanças. Sua abordagem é madura e você se adapta sem perder sua essência.",
          strengths: [
            "Equilibra flexibilidade e estabilidade",
            "Avalia antes de agir",
            "Se adapta conscientemente",
            "Aprende com mudanças"
          ],
          attentionPoints: [
            "Pode demorar demais às vezes",
            "Às vezes analisa demais",
            "Pode perder oportunidades por cautela",
            "Precisa confiar mais no processo"
          ]
        };
      } else if (avg <= 2.5) {
        return {
          title: "Resistente Cauteloso",
          description: "Você tem dificuldade com mudanças e prefere estabilidade. Sua cautela te protege, mas pode estar te limitando em crescimento e oportunidades.",
          strengths: [
            "Valoriza estabilidade",
            "Não muda por impulso",
            "Pensa nas consequências",
            "Mantém raízes"
          ],
          attentionPoints: [
            "Pode se prender demais ao conhecido",
            "Às vezes perde oportunidades",
            "Pode sofrer muito com imprevistos",
            "Precisa desenvolver mais flexibilidade"
          ]
        };
      } else {
        return {
          title: "Rígido Vulnerável",
          description: "Você tem grande dificuldade com mudanças e pode paralisar quando as coisas mudam. Isso pode estar te deixando muito vulnerável e limitando suas experiências.",
          strengths: [
            "Valoriza consistência",
            "Não age por impulso",
            "Busca segurança",
            "Mantém estabilidade"
          ],
          attentionPoints: [
            "Pode estar preso demais",
            "Às vezes paralisa com mudanças",
            "Pode perder muitas oportunidades",
            "Precisa urgentemente desenvolver flexibilidade"
          ]
        };
      }
    }
  }
];

interface QuizAreaProps {
  onStartChat?: (context: string) => void;
}

export function QuizArea({ onStartChat }: QuizAreaProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState("");

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
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setCurrentFeedback("");
  };

  const handleChatConnection = () => {
    if (!selectedQuiz || !showResult) return;
    
    const result = selectedQuiz.getResult(answers);
    const context = `O usuário acabou de completar o quiz "${selectedQuiz.title}". 

Resultado: ${result.title}

${result.description}

Pontos fortes identificados:
${result.strengths.map(s => `- ${s}`).join('\n')}

Pontos de atenção:
${result.attentionPoints.map(a => `- ${a}`).join('\n')}

Inicie a conversa de forma acolhedora, perguntando o que mais fez sentido para a pessoa nesse resultado.`;

    if (onStartChat) {
      onStartChat(context);
    }
  };

  // Library view
  if (!selectedQuiz) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
        <header className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-5 sm:py-6">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100">Biblioteca de Quizzes</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Escolha um quiz para conhecer mais sobre você
          </p>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 sm:gap-5">
            {quizzes.map((quiz) => {
              const Icon = quiz.icon;
              return (
                <button
                  key={quiz.id}
                  onClick={() => setSelectedQuiz(quiz)}
                  className="group text-left p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                        {quiz.description}
                      </p>
                      <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 italic">
                        {quiz.purpose}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-sm text-purple-600 dark:text-purple-400 font-medium">
                        <span>{quiz.questions.length} perguntas</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
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

  // Result view
  if (showResult) {
    const result = selectedQuiz.getResult(answers);

    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
        <header className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-5 sm:py-6">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100">Seu Resultado</h2>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">{result.title}</h3>
              </div>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {result.description}
              </p>

              {/* Pontos Fortes */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-base sm:text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Pontos fortes
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pontos de Atenção */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-base sm:text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Pontos de atenção
                </h4>
                <ul className="space-y-2">
                  {result.attentionPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botão de Conexão com Chat */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-5 mb-6">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong className="text-purple-700 dark:text-purple-400">Esse resultado diz bastante coisa sobre você.</strong>{" "}
                  Quer conversar sobre isso?
                </p>
                <Button
                  onClick={handleChatConnection}
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white h-12 text-base rounded-xl"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Vamos conversar sobre isso?
                </Button>
              </div>

              <Button
                onClick={resetQuiz}
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 h-12 text-base"
              >
                Voltar para biblioteca
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const question = selectedQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
      <header className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-5 sm:py-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{selectedQuiz.title}</h2>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Pergunta {currentQuestion + 1} de {selectedQuiz.questions.length}
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 mb-6 leading-relaxed">
              {question.question}
            </h3>

            {showFeedback ? (
              <div className="animate-fade-in bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentFeedback}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-4 sm:p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
                  >
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                      {option.text}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
