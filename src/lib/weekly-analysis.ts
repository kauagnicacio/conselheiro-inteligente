export interface DayData {
  date: string;
  completed: string[];
  responses: {
    mood?: string;
    emotions?: string;
    question?: string;
    exercise?: string;
    gratitude?: string;
  };
}

export interface WeeklyData {
  days: Record<number, DayData>;
  userId: string;
}

export async function generateWeeklyAnalysis(weekData: WeeklyData): Promise<string> {
  // Preparar contexto para a IA
  const daysWithData = Object.entries(weekData.days)
    .filter(([_, data]) => data.completed.length > 0)
    .map(([dayIndex, data]) => {
      const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
      return {
        day: dayNames[parseInt(dayIndex)],
        mood: data.responses.mood || "Não registrado",
        emotions: data.responses.emotions || "Não registrado",
        question: data.responses.question || "Não registrado",
        exercise: data.responses.exercise || "Não registrado",
        gratitude: data.responses.gratitude || "Não registrado",
      };
    });

  if (daysWithData.length === 0) {
    return "Você ainda não completou nenhum dia esta semana. Comece sua jornada e volte aqui no final da semana para ver sua evolução! 💜";
  }

  // Criar prompt para a IA
  const prompt = `Você é a Lum, uma assistente de saúde mental empática e acolhedora. Analise os registros emocionais da semana abaixo e crie uma mensagem interpretativa profunda e personalizada.

Dados da semana:
${daysWithData.map(day => `
${day.day}:
- Humor: ${day.mood}
- Emoções: ${day.emotions}
- Reflexão: ${day.question}
- Exercício: ${day.exercise}
- Gratidão: ${day.gratitude}
`).join('\n')}

Crie uma análise que:
1. Identifique padrões emocionais ao longo da semana (ex: "começou mais sobrecarregada, mas ganhou clareza")
2. Destaque a evolução ou mudanças significativas
3. Reconheça pontos positivos e conquistas emocionais
4. Aponte gentilmente áreas que merecem atenção
5. Termine com uma mensagem de encorajamento genuína e personalizada

Tom: Acolhedor, empático, como uma amiga que realmente te conhece. Use "você" para se dirigir à pessoa.
Tamanho: 3-4 parágrafos curtos, diretos e emocionalmente impactantes.
Evite: Frases genéricas, clichês de autoajuda, tom professoral.

Análise:`;

  try {
    // Verificar se a chave da OpenAI está disponível
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.warn('OpenAI API key não configurada - usando análise básica');
      return generateBasicAnalysis(daysWithData);
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Você é a Lum, uma assistente de saúde mental empática, acolhedora e profunda. Suas análises são personalizadas, emocionalmente inteligentes e fazem as pessoas se sentirem verdadeiramente vistas e compreendidas.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.warn('Erro na resposta da OpenAI - usando análise básica');
      return generateBasicAnalysis(daysWithData);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.warn('Erro ao gerar análise com IA - usando análise básica:', error);

    // Fallback: análise básica sem IA
    return generateBasicAnalysis(daysWithData);
  }
}

function generateBasicAnalysis(daysWithData: any[]): string {
  const totalDays = daysWithData.length;
  const firstDay = daysWithData[0];
  const lastDay = daysWithData[daysWithData.length - 1];

  let analysis = `Ao longo desta semana, você se dedicou a se conhecer melhor em ${totalDays} ${totalDays === 1 ? 'dia' : 'dias'}. `;

  if (totalDays >= 5) {
    analysis += `Sua consistência é admirável – aparecer para si mesma todos os dias é um ato de coragem e autocuidado. `;
  } else if (totalDays >= 3) {
    analysis += `Você está construindo um hábito importante de parar e se ouvir. Continue assim! `;
  }

  analysis += `\n\nPercebo que você tem dado espaço para reconhecer suas emoções e refletir sobre o que realmente importa. `;
  
  if (lastDay.gratitude && lastDay.gratitude !== "Não registrado") {
    analysis += `O fato de você conseguir encontrar gratidão mesmo em dias difíceis mostra uma força interior linda. `;
  }

  analysis += `\n\nSeu próximo passo pode ser continuar cultivando essa gentileza com você mesma. Lembre-se: cada dia que você aparece aqui é uma vitória. Continue se permitindo sentir, refletir e crescer. 💜`;

  return analysis;
}
