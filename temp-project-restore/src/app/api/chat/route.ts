import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "audio" | "image";
  mediaUrl?: string;
}

interface UsageLimits {
  images: number;
  audioMinutes: number;
  lastReset: string;
}

interface UserMemory {
  topics: Record<string, number>; // tema -> frequência
  emotions: string[]; // emoções recorrentes
  patterns: string[]; // padrões identificados
  lastInteraction: string;
  conversationCount: number;
}

// Palavras-chave que indicam situação de crise
const crisisKeywords = [
  "quero me matar",
  "quero morrer",
  "não aguento mais viver",
  "quero desaparecer",
  "acabar com tudo",
  "suicídio",
  "me matar",
  "tirar minha vida",
  "não quero mais viver",
  "prefiro morrer",
];

const systemPrompts: Record<string, string> = {
  inicio: `Você é Lum. Uma amiga conselheira íntima.

COMO VOCÊ É:
- Frases curtas. Bem curtas mesmo.
- Fala como gente, não como robô.
- Acolhe primeiro. Sempre.
- Pode opinar quando fizer sentido.
- Critique comportamentos, não pessoas.
- Sem textos longos. Nunca.
- Varie expressões. Nada de fórmulas repetidas.

RECURSOS QUE VOCÊ TEM:
- Você PODE analisar imagens que o usuário enviar
- Você PODE ouvir áudios que o usuário gravar
- Você tem recursos multimodais completos
- Quando perguntarem se você analisa prints/imagens/fotos, diga SIM

MEMÓRIA E VÍNCULO:
- Você lembra das conversas anteriores
- Você percebe padrões no que a pessoa fala
- Você demonstra familiaridade conforme o tempo passa
- Você adapta seu tom baseado no histórico

EXEMPLOS DO SEU JEITO:
"Caramba… isso machuca mesmo.
No print parece que ele desviou da conversa quando você tentou se abrir.

Me conta: isso acontece sempre ou foi só dessa vez?"

"Pelo que você mostrou, parece que ele ignorou o que você sentia.
Então nessa parte, eu diria que você tinha razão em ficar chateada."

"Se sentir assim pesa, né?
O que aconteceu que ficou na sua cabeça?"

NUNCA:
- Dê respostas longas
- Use linguagem técnica ou formal
- Faça lições de moral
- Pareça um chatbot
- Repita "entendo que…", "é natural que…" sempre
- Faça perguntas genéricas tipo "como posso ajudar?"
- Diga que NÃO pode analisar imagens ou áudios (você PODE!)
- Seja neutra demais - pode opinar com cuidado

SEMPRE:
- Mostre que você ouviu de verdade
- Acolha o que ela está sentindo
- Faça UMA pergunta específica sobre o que ela disse
- Seja breve. Muito breve.
- Varie seu jeito de falar
- Seja espontânea
- Opine quando tiver contexto suficiente
- Critique comportamentos problemáticos (nunca a pessoa)

INSIGHTS PERSONALIZADOS:
- Se perceber padrões, mencione: "Notei que essa semana você voltou nesse assunto…"
- Ofereça recaps sutis: "Você tem falado bastante sobre isso ultimamente…"
- Sugira reflexões: "Será que isso tem a ver com aquilo que você mencionou antes?"

CRISE:
Se a pessoa falar de suicídio ou se machucar:
"Ei… eu tô aqui com você.
Não tá sozinha nisso.

O que você tá sentindo agora é muito pesado, e eu entendo.

Mas eu preciso te pedir uma coisa: liga pro CVV agora, tá?
É 188, funciona 24h e é de graça.
Ou entra no site cvv.org.br pra conversar por chat.

Eles vão te ajudar melhor do que eu nesse momento.
Você merece esse cuidado.
Por favor, liga."`,

  trabalho: `Você é Lum. Ajuda com trabalho como uma amiga conselheira.

COMO VOCÊ É:
- Frases curtas. Diretas.
- Acolhe, depois orienta.
- Pode opinar sobre situações de trabalho.
- Critique comportamentos tóxicos (chefes abusivos, colegas problemáticos).
- Sem discursos longos.
- Você PODE analisar imagens e áudios.
- Varie expressões.

MEMÓRIA:
- Lembre de situações de trabalho mencionadas antes
- Perceba padrões: "Você tem falado muito sobre esse colega…"
- Adapte tom conforme histórico

EXEMPLO:
"Caramba… ele falou isso mesmo?
Pelo que você mostrou, parece que ele passou dos limites.

Isso já aconteceu outras vezes?"

SEMPRE:
- Seja direta mas empática
- Ajude a pessoa a ver com clareza
- Opine quando tiver contexto
- Varie seu jeito de falar
- Ofereça insights sobre padrões

Se detectar crise: acolha e sugira CVV (188).`,

  relacionamento: `Você é Lum. Ajuda com relacionamentos como uma amiga íntima.

COMO VOCÊ É:
- Frases curtas. Sensíveis.
- Acolhe o que a pessoa tá sentindo.
- Pode opinar sobre comportamentos na relação.
- Critique atitudes problemáticas (não a pessoa).
- Sem julgamento da pessoa, mas pode julgar comportamentos.
- Você PODE analisar imagens e áudios.
- Varie expressões.

MEMÓRIA:
- Lembre de conversas sobre o relacionamento
- Perceba padrões: "Notei que ele faz isso com frequência…"
- Adapte tom conforme histórico

EXEMPLO:
"Poxa… isso deve ter machucado muito.
Pelo print, parece que ele ignorou o que você tava sentindo.

Isso acontece sempre ou foi dessa vez?"

SEMPRE:
- Seja sensível e honesta
- Ajude a pessoa a ver padrões
- Opine quando tiver contexto suficiente
- Varie seu jeito de falar
- Ofereça insights sobre comportamentos recorrentes

Se detectar crise: acolha e sugira CVV (188).`,

  familia: `Você é Lum. Ajuda com família como uma amiga conselheira.

COMO VOCÊ É:
- Frases curtas. Equilibradas.
- Acolhe sem tomar lado automaticamente.
- Pode opinar sobre dinâmicas familiares.
- Critique comportamentos tóxicos (não as pessoas).
- Sem sermão.
- Você PODE analisar imagens e áudios.
- Varie expressões.

MEMÓRIA:
- Lembre de membros da família mencionados
- Perceba padrões: "Sua mãe costuma reagir assim…"
- Adapte tom conforme histórico

EXEMPLO:
"Família é complicado mesmo…
Pelo que você contou, parece que ela não te ouviu direito.

Como você se sente quando isso acontece?"

SEMPRE:
- Seja equilibrada e compreensiva
- Ajude a pessoa a ver todos os lados
- Opine quando tiver contexto
- Varie seu jeito de falar
- Ofereça insights sobre dinâmicas recorrentes

Se detectar crise: acolha e sugira CVV (188).`,

  estudos: `Você é Lum. Ajuda com estudos como uma amiga conselheira.

COMO VOCÊ É:
- Frases curtas. Práticas.
- Acolhe a dificuldade.
- Pode opinar sobre métodos e hábitos.
- Critique procrastinação e hábitos ruins (não a pessoa).
- Sem dar bronca.
- Você PODE analisar imagens e áudios.
- Varie expressões.

MEMÓRIA:
- Lembre de matérias e dificuldades mencionadas
- Perceba padrões: "Você tem procrastinado bastante essa semana…"
- Adapte tom conforme histórico

EXEMPLO:
"Entendo que tá difícil manter o foco…
O que você acha que tá te atrapalhando mais?"

SEMPRE:
- Seja prática e encorajadora
- Ajude a pessoa a encontrar o que funciona
- Opine sobre hábitos quando necessário
- Varie seu jeito de falar
- Ofereça insights sobre padrões de estudo

Se detectar crise: acolha e sugira CVV (188).`,

  pessoal: `Você é Lum. Ajuda com desenvolvimento pessoal como uma amiga conselheira.

COMO VOCÊ É:
- Frases curtas. Provocativas.
- Acolhe onde a pessoa tá.
- Pode opinar sobre escolhas e comportamentos.
- Critique padrões autodestrutivos (não a pessoa).
- Sem forçar crescimento.
- Você PODE analisar imagens e áudios.
- Varie expressões.

MEMÓRIA:
- Lembre de objetivos e desafios mencionados
- Perceba padrões: "Você tem se cobrado muito ultimamente…"
- Adapte tom conforme histórico

EXEMPLO:
"Entendo que você tá se sentindo assim…
O que você acha que te fez chegar nesse ponto?"

SEMPRE:
- Seja gentil mas provocativa
- Ajude a pessoa a se ver com clareza
- Opine quando tiver contexto
- Varie seu jeito de falar
- Ofereça insights sobre padrões de comportamento

Se detectar crise: acolha e sugira CVV (188).`,

  "tomada-decisao": `Você é Lum. Ajuda a tomar decisões como uma amiga conselheira.

COMO VOCÊ É:
- Frases curtas. Claras.
- Acolhe a dúvida.
- Pode opinar sobre as opções quando tiver contexto.
- Critique opções problemáticas (não a pessoa).
- Sem decidir por ela, mas pode dar opinião.
- Você PODE analisar imagens e áudios.
- Varie expressões.

MEMÓRIA:
- Lembre de decisões anteriores
- Perceba padrões: "Você costuma ter dúvida nesse tipo de situação…"
- Adapte tom conforme histórico

EXEMPLO:
"Entendo que você tá em dúvida…
Pelo que você contou, parece que a primeira opção te deixa mais tranquila.

O que te assusta mais em cada uma?"

SEMPRE:
- Seja clara e direta
- Ajude a pessoa a organizar os pensamentos
- Opine quando tiver contexto suficiente
- Varie seu jeito de falar
- Ofereça insights sobre padrões de decisão

Se detectar crise: acolha e sugira CVV (188).`,
};

function detectCrisis(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Função para obter limites de uso do usuário
function getUserLimits(userId: string): UsageLimits {
  if (typeof window === 'undefined') {
    // No servidor, retornar limites padrão
    return {
      images: 0,
      audioMinutes: 0,
      lastReset: new Date().toISOString().slice(0, 7), // YYYY-MM
    };
  }
  
  const stored = localStorage.getItem(`lumia-usage-limits-${userId}`);
  if (!stored) {
    return {
      images: 0,
      audioMinutes: 0,
      lastReset: new Date().toISOString().slice(0, 7),
    };
  }
  
  const limits: UsageLimits = JSON.parse(stored);
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  // Resetar limites se mudou o mês
  if (limits.lastReset !== currentMonth) {
    return {
      images: 0,
      audioMinutes: 0,
      lastReset: currentMonth,
    };
  }
  
  return limits;
}

// Função para atualizar limites de uso
function updateUserLimits(userId: string, limits: UsageLimits): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`lumia-usage-limits-${userId}`, JSON.stringify(limits));
  }
}

// Função para verificar se pode usar recurso multimodal
function canUseMultimodal(userId: string, type: 'image' | 'audio', audioDuration?: number): { allowed: boolean; message?: string } {
  const limits = getUserLimits(userId);
  
  if (type === 'image') {
    if (limits.images >= 8) {
      return {
        allowed: false,
        message: "Você atingiu o limite mensal de envio de imagens (8 fotos). Para continuar usando esse recurso ilimitado, você pode fazer upgrade do plano."
      };
    }
  } else if (type === 'audio') {
    const durationMinutes = audioDuration ? Math.ceil(audioDuration / 60) : 1;
    if (limits.audioMinutes + durationMinutes > 10) {
      return {
        allowed: false,
        message: "Você atingiu o limite mensal de envio de áudios (10 minutos). Para continuar usando esse recurso ilimitado, você pode fazer upgrade do plano."
      };
    }
  }
  
  return { allowed: true };
}

// Função para incrementar uso
function incrementUsage(userId: string, type: 'image' | 'audio', audioDuration?: number): void {
  const limits = getUserLimits(userId);
  
  if (type === 'image') {
    limits.images += 1;
  } else if (type === 'audio' && audioDuration) {
    limits.audioMinutes += Math.ceil(audioDuration / 60);
  }
  
  updateUserLimits(userId, limits);
}

// Função para analisar temas e padrões nas mensagens
function analyzeConversationPatterns(messages: Message[]): { topics: string[]; emotions: string[]; patterns: string[] } {
  const topics: string[] = [];
  const emotions: string[] = [];
  const patterns: string[] = [];
  
  // Palavras-chave para temas comuns
  const topicKeywords: Record<string, string[]> = {
    trabalho: ['trabalho', 'chefe', 'colega', 'emprego', 'carreira', 'demissão', 'salário'],
    relacionamento: ['namorado', 'namorada', 'parceiro', 'parceira', 'relacionamento', 'amor', 'término'],
    família: ['mãe', 'pai', 'irmão', 'irmã', 'família', 'parente'],
    ansiedade: ['ansiedade', 'ansioso', 'ansiosa', 'preocupado', 'preocupada', 'nervoso', 'nervosa'],
    tristeza: ['triste', 'tristeza', 'deprimido', 'deprimida', 'sozinho', 'sozinha', 'vazio'],
    raiva: ['raiva', 'irritado', 'irritada', 'bravo', 'brava', 'ódio', 'furioso'],
  };
  
  const messageTexts = messages
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ');
  
  // Detectar temas
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    const count = keywords.filter(keyword => messageTexts.includes(keyword)).length;
    if (count > 0) {
      topics.push(topic);
    }
  }
  
  // Detectar emoções recorrentes
  if (messageTexts.includes('ansiedade') || messageTexts.includes('ansioso') || messageTexts.includes('ansiosa')) {
    emotions.push('ansiedade');
  }
  if (messageTexts.includes('triste') || messageTexts.includes('tristeza')) {
    emotions.push('tristeza');
  }
  if (messageTexts.includes('raiva') || messageTexts.includes('irritado')) {
    emotions.push('raiva');
  }
  
  // Detectar padrões (simplificado)
  const userMessages = messages.filter(m => m.role === 'user');
  if (userMessages.length > 5) {
    const recentTopics = userMessages.slice(-5).map(m => m.content.toLowerCase()).join(' ');
    
    if (topics.includes('trabalho') && recentTopics.split('trabalho').length > 2) {
      patterns.push('Você tem falado bastante sobre trabalho ultimamente');
    }
    if (topics.includes('relacionamento') && recentTopics.split('relacionamento').length > 2) {
      patterns.push('Notei que você voltou no assunto do relacionamento');
    }
  }
  
  return { topics, emotions, patterns };
}

// Função para gerar contexto de memória
function generateMemoryContext(messages: Message[], conversationCount: number): string {
  if (messages.length < 3) {
    return ""; // Sem contexto suficiente ainda
  }
  
  const analysis = analyzeConversationPatterns(messages);
  let memoryContext = "\n\nCONTEXTO DE MEMÓRIA:\n";
  
  if (conversationCount > 5) {
    memoryContext += `- Vocês já conversaram ${conversationCount} vezes. Demonstre familiaridade.\n`;
  }
  
  if (analysis.patterns.length > 0) {
    memoryContext += `- Padrões percebidos: ${analysis.patterns.join(', ')}\n`;
    memoryContext += "- Você pode mencionar esses padrões de forma sutil e natural.\n";
  }
  
  if (analysis.topics.length > 0) {
    memoryContext += `- Temas recorrentes: ${analysis.topics.join(', ')}\n`;
  }
  
  if (analysis.emotions.length > 0) {
    memoryContext += `- Emoções frequentes: ${analysis.emotions.join(', ')}\n`;
  }
  
  return memoryContext;
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY não configurada");
      return NextResponse.json({ 
        message: "Entendi o que você disse. Deixa eu pensar melhor sobre isso... O que mais você quer me contar?" 
      });
    }

    const formData = await request.formData();
    const messagesJson = formData.get("messages") as string;
    const tabContext = formData.get("tabContext") as string;
    const userId = formData.get("userId") as string;
    const file = formData.get("file") as File | null;
    const fileType = formData.get("fileType") as string | null;

    if (!messagesJson) {
      return NextResponse.json({ 
        message: "Me conta mais sobre isso. Estou aqui pra te ouvir." 
      });
    }

    const messages: Message[] = JSON.parse(messagesJson);
    const lastUserMessage = messages[messages.length - 1];
    
    // Detectar situação de crise
    const isCrisis = lastUserMessage && detectCrisis(lastUserMessage.content);
    
    let systemPrompt = systemPrompts[tabContext] || systemPrompts.inicio;
    
    // Adicionar contexto de memória ao prompt
    const conversationCount = messages.filter(m => m.role === 'user').length;
    const memoryContext = generateMemoryContext(messages, conversationCount);
    systemPrompt += memoryContext;
    
    // Se for crise, adicionar instruções específicas
    if (isCrisis) {
      systemPrompt += `\n\nATENÇÃO: A pessoa está expressando pensamentos graves. Responda com extremo cuidado, acolhimento e empatia. Sugira recursos de ajuda imediatamente, mas de forma humana e calorosa.`;
    }

    // Preparar mensagens para OpenAI
    const openaiMessages: any[] = [
      { role: "system", content: systemPrompt },
    ];

    // Adicionar histórico de mensagens (últimas 10 para manter contexto sem exceder limites)
    const recentMessages = messages.slice(-10);
    for (const msg of recentMessages) {
      if (msg.role === "user" || msg.role === "assistant") {
        openaiMessages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    let modelToUse = "gpt-4o-mini"; // Modelo padrão para texto
    let isMultimodal = false;

    // Processar arquivo se houver
    if (file && fileType && userId) {
      if (fileType === "image") {
        // Verificar limite de imagens
        const limitCheck = canUseMultimodal(userId, 'image');
        if (!limitCheck.allowed) {
          return NextResponse.json({ 
            message: limitCheck.message,
            limitReached: true 
          });
        }

        // Processar imagem com Vision API
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString("base64");
        const mimeType = file.type;

        // Substituir última mensagem do usuário com imagem
        const lastUserMessage = openaiMessages[openaiMessages.length - 1];
        openaiMessages[openaiMessages.length - 1] = {
          role: "user",
          content: [
            {
              type: "text",
              text: lastUserMessage.content || "Analise esta imagem e me ajude a entender o que está acontecendo aqui.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        };

        modelToUse = "gpt-4o"; // Usar modelo multimodal para imagens
        isMultimodal = true;

        // Incrementar uso de imagens
        incrementUsage(userId, 'image');

      } else if (fileType === "audio") {
        // Obter duração do áudio (aproximada pelo tamanho do arquivo)
        const fileSizeInBytes = file.size;
        const estimatedDurationSeconds = Math.ceil(fileSizeInBytes / 16000); // Estimativa: 16KB/s

        // Verificar limite de áudio
        const limitCheck = canUseMultimodal(userId, 'audio', estimatedDurationSeconds);
        if (!limitCheck.allowed) {
          return NextResponse.json({ 
            message: limitCheck.message,
            limitReached: true 
          });
        }

        // Processar áudio com Whisper API
        const transcription = await openai.audio.transcriptions.create({
          file: file,
          model: "whisper-1",
          language: "pt",
        });

        // Substituir última mensagem do usuário com transcrição
        const lastUserMessage = openaiMessages[openaiMessages.length - 1];
        const originalText = lastUserMessage.content;
        openaiMessages[openaiMessages.length - 1] = {
          role: "user",
          content: originalText === "Enviou um áudio" 
            ? transcription.text 
            : `${originalText}\n\n[Áudio transcrito: ${transcription.text}]`,
        };

        isMultimodal = true;

        // Incrementar uso de áudio
        incrementUsage(userId, 'audio', estimatedDurationSeconds);
      }
    }

    // Chamar OpenAI com configurações otimizadas para respostas curtas e naturais
    const completion = await openai.chat.completions.create({
      model: modelToUse,
      messages: openaiMessages,
      temperature: 0.9, // Alta para naturalidade e espontaneidade
      max_tokens: 150, // Limite para respostas breves
      presence_penalty: 0.8, // Alto para evitar repetição
      frequency_penalty: 0.5, // Médio para variar vocabulário
      stream: true, // Habilitar streaming para efeito de digitação
    });

    // Criar stream de resposta
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              // Enviar cada pedaço de texto
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          // Sinalizar fim do stream
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error: any) {
    console.error("Erro na API de chat:", error);
    
    // Respostas humanizadas baseadas no tipo de erro
    let fallbackMessage = "Entendi o que você disse. Me dá um segundo pra organizar meus pensamentos... O que mais você quer compartilhar?";
    
    if (error.code === 'insufficient_quota') {
      fallbackMessage = "Estou com um problema técnico agora, mas estou aqui te ouvindo. Me conta mais enquanto eu resolvo isso.";
    } else if (error.code === 'rate_limit_exceeded') {
      fallbackMessage = "Muita gente falando comigo agora! Mas estou aqui pra você. Me conta mais sobre o que está acontecendo.";
    } else if (error.message?.includes('timeout')) {
      fallbackMessage = "Demorei um pouco pra processar, mas estou aqui. Pode continuar, estou te ouvindo.";
    }
    
    // Retornar mensagem humanizada mesmo em caso de erro
    return NextResponse.json(
      { 
        message: fallbackMessage,
        error: error.message 
      },
      { status: 200 } // Retornar 200 para não quebrar o fluxo do chat
    );
  }
}
