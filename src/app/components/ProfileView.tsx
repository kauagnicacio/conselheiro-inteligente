"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Edit2, User, Sparkles, X } from "lucide-react";
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
  deepInsight: string;
  emotionalImpact: string;
  advice: string;
  lastUpdated: string;
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

// Exemplos de textos que a Lum geraria (simulação)
const MOCK_CHARACTERISTICS: Record<keyof typeof CHARACTERISTIC_LABELS, CharacteristicData> = {
  humor: {
    summary: "Você costuma oscilar entre momentos de calma e picos de ansiedade, principalmente no fim do dia.",
    deepInsight: "Seu humor reflete uma sensibilidade profunda ao ambiente ao seu redor. Você absorve as energias das pessoas e situações, o que pode ser tanto uma força quanto um desafio.",
    emotionalImpact: "Essa oscilação pode fazer você se sentir instável às vezes, mas também te dá uma capacidade única de empatia e compreensão das emoções alheias.",
    advice: "Tente criar rituais de transição entre diferentes momentos do dia. Um pequeno momento de pausa pode ajudar a processar as emoções acumuladas antes que elas se intensifiquem.",
    lastUpdated: new Date().toISOString(),
  },
  temperament: {
    summary: "Você demonstra ser uma pessoa sensível, que pensa bastante antes de agir.",
    deepInsight: "Seu temperamento revela uma natureza reflexiva e cuidadosa. Você não age por impulso, mas por convicção, o que te protege de arrependimentos precipitados.",
    emotionalImpact: "Essa característica te torna confiável e ponderado, mas pode gerar ansiedade quando decisões rápidas são necessárias.",
    advice: "Confie mais na sua intuição. Nem toda decisão precisa ser profundamente analisada. Às vezes, seu primeiro instinto já carrega a sabedoria que você precisa.",
    lastUpdated: new Date().toISOString(),
  },
  emotions: {
    summary: "Você tende a guardar sentimentos antes de expressá-los, buscando entender tudo sozinho primeiro.",
    deepInsight: "Você processa suas emoções internamente antes de falar sobre elas. Isso mostra profundidade emocional, mas também pode fazer você carregar coisas sozinho por mais tempo do que precisa.",
    emotionalImpact: "Essa forma de lidar com emoções te dá clareza e autoconhecimento, mas pode criar uma sensação de solidão emocional quando você mais precisa de apoio.",
    advice: "Permita-se compartilhar antes de ter todas as respostas. Às vezes, falar sobre o que você sente ajuda a entender melhor do que ficar apenas pensando.",
    lastUpdated: new Date().toISOString(),
  },
  decisions: {
    summary: "Você costuma refletir bastante antes de decidir, tentando evitar arrependimentos.",
    deepInsight: "Sua forma de tomar decisões é guiada pelo desejo de fazer a escolha certa. Você pesa consequências, considera diferentes ângulos e busca minimizar riscos.",
    emotionalImpact: "Isso te protege de erros impulsivos, mas pode gerar paralisia quando você sente que não tem informações suficientes para decidir.",
    advice: "Lembre-se: não existe decisão perfeita. Toda escolha envolve algum grau de incerteza. Confie que você tem recursos para lidar com as consequências, sejam elas quais forem.",
    lastUpdated: new Date().toISOString(),
  },
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
  const [expandedCharacteristic, setExpandedCharacteristic] = useState<keyof typeof CHARACTERISTIC_LABELS | null>(null);
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
        const emailName = userEmail.split("@")[0];
        setProfile({ ...profile, displayName: emailName });
        setTempName(emailName);
      }
    } else {
      const emailName = userEmail.split("@")[0];
      setProfile({ ...profile, displayName: emailName });
      setTempName(emailName);
    }

    // Simular preenchimento gradual das características (em produção, viria da IA)
    // Por enquanto, vamos preencher após 2 segundos para demonstrar o conceito
    setTimeout(() => {
      const updatedProfile = {
        ...profile,
        displayName: emailName || "Usuário",
        characteristics: MOCK_CHARACTERISTICS,
      };
      setProfile(updatedProfile);
      localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
    }, 2000);
  }, [userId, userEmail]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const updatedProfile = { ...profile, avatar: result };
        setProfile(updatedProfile);
        
        const storageKey = `lumia-profile-${userId}`;
        localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
        localStorage.setItem("lumia-user-avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    const updatedProfile = { ...profile, displayName: tempName.trim() };
    setProfile(updatedProfile);
    
    const storageKey = `lumia-profile-${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
    
    setIsEditingName(false);
  };

  const handleExplore = (characteristic: keyof typeof CHARACTERISTIC_LABELS) => {
    setExpandedCharacteristic(characteristic);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-950/20 to-[#1a1a1a] overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* Header com foto e nome */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          {/* Foto de perfil */}
          <div className="relative group mb-4">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Foto de perfil"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-purple-500/30"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-4 ring-purple-500/30">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            )}
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
            <div className="flex items-center gap-2 w-full max-w-xs">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="text-center text-lg sm:text-xl font-semibold"
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
              className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-100 hover:text-purple-400 transition-colors group"
            >
              <span>{profile.displayName || "Clique para editar"}</span>
              <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>

        {/* Frase explicativa */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-purple-900/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Esse é o retrato emocional que a Lum está construindo com você, a partir das suas conversas, reflexões e jornadas.
            </p>
          </div>
        </div>

        {/* Suas Características */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4 sm:mb-6">
            Seu Espelho Emocional
          </h2>
          
          {/* Blocos de características */}
          <div className="space-y-3 sm:space-y-4">
            {(Object.keys(CHARACTERISTIC_LABELS) as Array<keyof typeof CHARACTERISTIC_LABELS>).map((key) => {
              const data = profile.characteristics[key];
              const label = CHARACTERISTIC_LABELS[key];

              return (
                <div
                  key={key}
                  className="bg-[#212121]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all"
                >
                  <h3 className="text-base sm:text-lg font-medium text-gray-100 mb-3">
                    {label}
                  </h3>

                  {!data ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <p className="italic">
                          A Lum está te conhecendo...
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        Continue usando o app. Quanto mais você conversa, reflete e registra suas emoções, mais a Lum entende sobre você.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {data.summary}
                      </p>

                      <Button
                        onClick={() => handleExplore(key)}
                        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 hover:border-purple-400 transition-all text-sm sm:text-base"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Explorar
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Exploração */}
      {expandedCharacteristic && profile.characteristics[expandedCharacteristic] && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-700/50 p-4 sm:p-6 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-100">
                {CHARACTERISTIC_LABELS[expandedCharacteristic]}
              </h3>
              <button
                onClick={() => setExpandedCharacteristic(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Resumo */}
              <div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {profile.characteristics[expandedCharacteristic]!.summary}
                </p>
              </div>

              {/* Insight Profundo */}
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 sm:p-5">
                <h4 className="text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  O que isso significa
                </h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {profile.characteristics[expandedCharacteristic]!.deepInsight}
                </p>
              </div>

              {/* Impacto Emocional */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 sm:p-5">
                <h4 className="text-sm font-medium text-blue-300 mb-2">
                  Como isso afeta sua vida emocional
                </h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {profile.characteristics[expandedCharacteristic]!.emotionalImpact}
                </p>
              </div>

              {/* Conselho */}
              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4 sm:p-5">
                <h4 className="text-sm font-medium text-emerald-300 mb-2">
                  Um conselho da Lum
                </h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {profile.characteristics[expandedCharacteristic]!.advice}
                </p>
              </div>

              {/* Última atualização */}
              <div className="text-center pt-2 sm:pt-4 border-t border-gray-700/50">
                <p className="text-xs text-gray-500">
                  Esse perfil está sempre evoluindo conforme você muda
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
