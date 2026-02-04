"use client";

import { useState } from "react";
import { Users, ChevronRight } from "lucide-react";
import { Psychologist } from "@/types/psychologist";
import { PsychologistProfile } from "./PsychologistProfile";

interface PsicologosViewProps {
  userId: string;
}

// Dados dos psicólogos autorizados
const psychologists: Psychologist[] = [
  {
    id: "yasmin-tavares-francisco",
    name: "Yasmin Tavares Francisco",
    profession: "Psicóloga",
    crp: "06/196881",
    photo: "/yasmin-tavares.webp",
    price: "R$ 30",
    tags: [
      "Acompanhamento terapêutico",
      "Ansiedade",
      "Depressão",
      "Relacionamentos",
      "Angústia",
      "Autoestima",
      "Alterações de humor",
      "Morte e luto",
      "Procrastinação",
      "Estresse"
    ],
    approach: "Fenomenológica-existencial",
    audience: ["Adolescentes", "Adultos", "Idosos"],
    about: "Me chamo Yasmin, sou formada em Psicologia, apesar de não ser especializada, sigo na abordagem fenomenológica existencial, que se baseia em deixar o paciente ditar seu próprio \"eu\", sem deixar estigmas definirem-o. Farei o possível para ajudar você a se encontrar, não tenho vergonha de procurar por ajuda, todo sofrimento é válido! Vamos juntos?",
    phone: "11951948441"
  },
  {
    id: "laiana-macedo-de-amorim",
    name: "Laiana Macêdo de Amorim",
    profession: "Psicóloga",
    crp: "03/34332",
    photo: "/laiana-macedo.webp",
    price: "R$ 30",
    tags: [
      "Angústia",
      "Procrastinação",
      "Doenças crônicas",
      "Autismo",
      "Ciúmes",
      "Alterações de humor",
      "Compulsões",
      "Depressão",
      "Ansiedade",
      "Acompanhamento psicológico"
    ],
    approach: "Terapia Cognitivo Comportamental - TCC",
    audience: ["Adolescentes", "Adultos", "Idosos"],
    about: "Sou Laiana Macêdo, psicóloga graduada pela Universidade Estadual de Feira de Santana (UEFS). Acredito que a terapia é um espaço de encontro e escuta, onde cada pessoa pode se escutar com gentileza, se compreender com mais profundidade e se permitir viver com mais leveza.\n\nMeu trabalho é guiado por uma escuta sensível, empática e respeitosa, que reconhece a singularidade de cada história e o valor de cada experiência humana. Nos encontramos sobre, um mesmo teto, sem pressa, sem julgamentos, e com o cuidado que você merece. Acredito na potência do vínculo terapêutico e no poder da palavra quando encontramos um espaço seguro para nos expressar, sentir e reconstruir o que a vida, às vezes, fragmenta.\n\nAcredito que o cuidado psicológico é um processo de construção conjunta — um espaço de escuta, aprendizado e transformação. Meu compromisso é caminhar ao seu lado, ajudando você a encontrar novas saídas, caminhos ou formas para o que te leva a estar conosco como mundo. Vejo o processo terapêutico como um espaço para reconhecer as próprias forças, acolher as dores e ressignificar experiências, construindo, assim, novas saídas de ser e viver com mais autenticidade, sentido e liberdade.\n\nMinha prática clínica é fundamentada na Terapia Cognitivo-Comportamental (TCC), uma abordagem que compreende a relação entre pensamentos, emoções e comportamentos. A partir dessa perspectiva, o processo terapêutico busca identificar padrões de pensamento que podem gerar sofrimento e, de forma colaborativa, desenvolver novas formas de lidar com as situações da vida. A TCC valoriza o autoconhecimento e o fortalecimento emocional, promovendo uma compreensão mais gentil e realista de si mesmo.\n\nDurante o acompanhamento, trabalhamos juntos(as) para ampliar a consciência sobre o que você sente, pensa e faz — construindo estratégias que favoreçam o bem-estar, a autonomia e uma vida com mais equilíbrio e sentido.",
    phone: "75991572543"
  },
  {
    id: "beatriz-abade-souza",
    name: "Beatriz Abade Souza",
    profession: "Psicóloga",
    crp: "06/212862",
    photo: "/beatriz-abade.webp",
    price: "R$ 30",
    tags: [
      "Acompanhamento psicológico",
      "Angústia",
      "Ansiedade",
      "Autoconhecimento",
      "Avaliação psicológica",
      "Casais",
      "Compulsões",
      "Depressão",
      "Estresse",
      "Dependência emocional"
    ],
    approach: "Psicanálise",
    audience: ["Adolescentes", "Adultos", "Casais", "Idosos"],
    about: "Psicóloga com formação em Psicanálise, dedicada ao cuidado emocional de adolescentes, adultos, casais e idosos.\n\nAtuo com escuta qualificada, ética e empatia, promovendo o autoconhecimento e o fortalecimento psíquico ao longo do processo terapêutico, respeitando as demandas e a especificidade de cada indivíduo.",
    phone: "11994627052"
  },
  {
    id: "joele-pereira-pantoja",
    name: "Joele Pereira Pantoja",
    profession: "Psicóloga",
    crp: "08/43005",
    photo: "/joele-pereira.webp",
    price: "R$ 30",
    tags: [
      "Ansiedade",
      "Depressão",
      "Autoestima",
      "Relacionamentos",
      "Dependência emocional",
      "Violência doméstica",
      "Violência sexual",
      "Maternidade",
      "Puerpério",
      "Sexualidade"
    ],
    approach: "Psicanálise",
    audience: ["Adolescentes", "Adultos", "Idosos"],
    about: "Olá, eu sou Joele Pantoja, psicóloga formada pela UniGuairacá, pós-graduanda em Psicologia Clínica pela PUC-PR e pós-graduanda em Psicanálise pelo Instituto ESPE.\n\nAtuo a partir da psicanálise, com experiência no acompanhamento de mulheres em situações de violência doméstica e sexual, em vivências da maternidade, na preparação psicossocial de pretendentes à adoção e em demandas relacionadas a relacionamentos, autoestima, corpo, identidade e sexualidade.\n\nTambém acolho mulheres que enfrentam ansiedade, depressão, sobrecarga emocional, culpa, medos, crises, conflitos afetivos e dificuldades para se colocar, se priorizar e se reconhecer na própria história.\n\nMeu propósito é oferecer um espaço seguro, sensível e acolhedor, onde cada mulher possa falar com liberdade, compreender seus sentimentos, fortalecer-se emocionalmente e reconstruir caminhos com respeito ao seu tempo e à sua singularidade.\n\nAtendimento presencial e online.",
    phone: "41992613919"
  },
  {
    id: "marcia-goncalves",
    name: "Márcia Gonçalves",
    profession: "Psicóloga",
    crp: "06/201241",
    photo: "/marcia-goncalves.webp",
    price: "R$ 30",
    tags: [
      "LGBTQIA+",
      "Mudança de país",
      "Autoconhecimento",
      "Acompanhamento psicológico",
      "Autonomia",
      "Autoaceitação",
      "Relacionamentos",
      "Empoderamento",
      "Dependência emocional"
    ],
    approach: "Fenomenológico-existencial, Análise Existencial, Daseinsanalyse",
    audience: ["Adultos", "Idosos"],
    about: "Olá, como você está? Meu nome é Márcia, sou brasileira e tenho 54 anos. Escolhi a psicologia desde muito jovem, pois já sentia a necessidade de atuar, promovendo saúde e qualidade na vida das pessoas. Atualmente, realizo atendimentos de psicoterapia de maneira on-line para mulheres, inclusive expatriadas e população idosa.\n\nA abordagem que orienta meus atendimentos é a Fenomenologia-Existencial, que propõe uma psicoterapia pautada em uma relação horizontal. Consiste em abrir caminho para que \"o outro\" se conquiste em sua singularidade, tornando-se consciente de suas potencialidades, favorecendo sua condição de ser-no-mundo.\n\nSeja para segurar a lanterna, ou amparar na subida de uma trilha mais íngreme, mas nunca para lhe indicar por onde andar. Pois a escolha é, e sempre será sua.",
    phone: "11984611572"
  }
];

export function PsicologosView({ userId }: PsicologosViewProps) {
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);

  // Se um psicólogo foi selecionado, mostrar perfil detalhado
  if (selectedPsychologist) {
    return (
      <PsychologistProfile
        psychologist={selectedPsychologist}
        onBack={() => setSelectedPsychologist(null)}
      />
    );
  }

  // Lista de psicólogos
  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="bg-white dark:bg-[#212121] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Encontre um Psicólogo
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Profissionais autorizados no Lum IA
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Entre em contato diretamente com psicólogos verificados para iniciar seu atendimento profissional.
          </p>
        </div>

        {/* Cards dos Psicólogos */}
        <div className="space-y-4">
          {psychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
              onViewProfile={() => setSelectedPsychologist(psychologist)}
            />
          ))}
        </div>

        {/* Rodapé informativo */}
        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-700/30">
          <p className="text-sm text-purple-900 dark:text-purple-300">
            <strong>Importante:</strong> O Lum IA oferece apoio emocional através de conversas com IA. Para questões mais complexas ou diagnósticos, recomendamos o acompanhamento com um profissional qualificado.
          </p>
        </div>
      </div>
    </div>
  );
}

// Card individual do psicólogo
interface PsychologistCardProps {
  psychologist: Psychologist;
  onViewProfile: () => void;
}

function PsychologistCard({ psychologist, onViewProfile }: PsychologistCardProps) {
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      "Oi, tudo bem? Encontrei seu perfil pelo Lum IA e gostaria de saber sobre atendimento (valores e horários)."
    );
    return `https://wa.me/55${psychologist.phone}?text=${message}`;
  };

  // Truncar "Sobre mim" para preview
  const aboutPreview = psychologist.about.length > 120
    ? psychologist.about.substring(0, 120) + "..."
    : psychologist.about;

  return (
    <div className="bg-white dark:bg-[#212121] rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
      {/* Header: Foto + Nome + CRP + Valor */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={psychologist.photo}
          alt={psychologist.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-200 dark:ring-purple-700"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {psychologist.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {psychologist.profession}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            CRP: {psychologist.crp}
          </p>
        </div>
        {psychologist.price && (
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Consulta</p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {psychologist.price}
            </p>
          </div>
        )}
      </div>

      {/* Tags/Temas */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {psychologist.tags.slice(0, 6).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
            >
              {tag}
            </span>
          ))}
          {psychologist.tags.length > 6 && (
            <span className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
              +{psychologist.tags.length - 6} temas
            </span>
          )}
        </div>
      </div>

      {/* Abordagem + Público */}
      <div className="mb-4 space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Abordagem:
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {psychologist.approach}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Público:
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {psychologist.audience.join(", ")}
          </span>
        </div>
      </div>

      {/* Preview do "Sobre mim" */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Sobre mim:
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {aboutPreview}
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onViewProfile}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Ver perfil completo
          <ChevronRight className="w-4 h-4" />
        </button>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Quero me consultar
        </a>
      </div>
    </div>
  );
}
