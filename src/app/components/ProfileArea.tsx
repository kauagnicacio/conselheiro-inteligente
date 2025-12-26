"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Edit2, Save, Sparkles, Heart, Briefcase, Target, Calendar } from "lucide-react";

interface UserProfile {
  name: string;
  currentMoment: string;
  emotionalState: string;
  mainChallenge: string;
  whatMatters: string;
  dreamScenario: string;
  temperament: string;
  traits: string[];
  emotionalPatterns: string[];
  evolution: string[];
}

export function ProfileArea() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    currentMoment: "",
    emotionalState: "",
    mainChallenge: "",
    whatMatters: "",
    dreamScenario: "",
    temperament: "",
    traits: [],
    emotionalPatterns: [],
    evolution: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    const savedProfile = localStorage.getItem("lumia-user-profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditProfile(parsed);
    }
  }, []);

  const saveProfile = () => {
    setProfile(editProfile);
    localStorage.setItem("lumia-user-profile", JSON.stringify(editProfile));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-[#1a1a1a]">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-5 sm:py-6">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100">Seu Perfil</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
          Quanto mais a Lum te conhece, melhor ela pode te acompanhar
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
          {/* Basic Info */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Como você quer ser chamado?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Seu nome ou apelido</p>
                </div>
              </div>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={cancelEdit}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={saveProfile}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Nome</label>
                  <Textarea
                    value={editProfile.name}
                    onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                    placeholder="Como você gostaria de ser chamado?"
                    className="border-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 min-h-[44px] max-h-[60px]"
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-900 dark:text-gray-100">
                  {profile.name || "Clique em 'Editar' para adicionar seu nome"}
                </p>
              </div>
            )}
          </Card>

          {/* Momento Atual */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Momento atual da sua vida</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">O que está acontecendo agora?</p>
              </div>
            </div>
            {isEditing ? (
              <Textarea
                value={editProfile.currentMoment}
                onChange={(e) => setEditProfile({ ...editProfile, currentMoment: e.target.value })}
                placeholder="Ex: Estou em transição de carreira, acabei de me mudar, estou começando um relacionamento novo..."
                className="border-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 min-h-[100px]"
              />
            ) : profile.currentMoment ? (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{profile.currentMoment}</p>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Conte um pouco sobre o momento que você está vivendo. Isso ajuda a Lum a entender melhor o seu contexto.
                </p>
              </div>
            )}
          </Card>

          {/* Estado Emocional */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Como você tem se sentido?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Seu estado emocional recente</p>
              </div>
            </div>
            {isEditing ? (
              <Textarea
                value={editProfile.emotionalState}
                onChange={(e) => setEditProfile({ ...editProfile, emotionalState: e.target.value })}
                placeholder="Ex: Tenho me sentido ansioso, mas também esperançoso. Às vezes fico sobrecarregado..."
                className="border-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 min-h-[100px]"
              />
            ) : profile.emotionalState ? (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{profile.emotionalState}</p>
            ) : (
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/10 border border-pink-200 dark:border-pink-800 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Não precisa ser perfeito. Só uma ideia geral de como você tem se sentido ultimamente.
                </p>
              </div>
            )}
          </Card>

          {/* Desafio Principal */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Seu maior desafio agora</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">O que mais te preocupa ou ocupa sua mente?</p>
              </div>
            </div>
            {isEditing ? (
              <Textarea
                value={editProfile.mainChallenge}
                onChange={(e) => setEditProfile({ ...editProfile, mainChallenge: e.target.value })}
                placeholder="Ex: Tomar uma decisão importante, lidar com um relacionamento difícil, encontrar meu propósito..."
                className="border-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 min-h-[100px]"
              />
            ) : profile.mainChallenge ? (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{profile.mainChallenge}</p>
            ) : (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Qual é a coisa que mais te tira o sono ou que você mais pensa ultimamente?
                </p>
              </div>
            )}
          </Card>

          {/* O que importa */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">O que realmente importa pra você?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Seus valores e prioridades</p>
              </div>
            </div>
            {isEditing ? (
              <Textarea
                value={editProfile.whatMatters}
                onChange={(e) => setEditProfile({ ...editProfile, whatMatters: e.target.value })}
                placeholder="Ex: Minha família, meu crescimento pessoal, ter tempo pra mim, fazer diferença no mundo..."
                className="border-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 min-h-[100px]"
              />
            ) : profile.whatMatters ? (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{profile.whatMatters}</p>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  O que você não abriria mão? O que te faz sentir que está no caminho certo?
                </p>
              </div>
            )}
          </Card>

          {/* Cenário dos sonhos */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Como seria sua vida ideal?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sem limites, como você gostaria que fosse?</p>
              </div>
            </div>
            {isEditing ? (
              <Textarea
                value={editProfile.dreamScenario}
                onChange={(e) => setEditProfile({ ...editProfile, dreamScenario: e.target.value })}
                placeholder="Ex: Ter um trabalho que me realiza, viver em paz comigo mesmo, ter relações verdadeiras..."
                className="border-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 min-h-[100px]"
              />
            ) : profile.dreamScenario ? (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{profile.dreamScenario}</p>
            ) : (
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Se você pudesse desenhar sua vida do zero, como ela seria? Não precisa ser realista, só honesto.
                </p>
              </div>
            )}
          </Card>

          {/* Temperament (from quizzes) */}
          {profile.temperament && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Temperamento</h3>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{profile.temperament}</p>
            </Card>
          )}

          {/* Traits (from quizzes) */}
          {profile.traits.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Traços de Personalidade
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Emotional Patterns (from conversations) */}
          {profile.emotionalPatterns.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Padrões Emocionais Observados
              </h3>
              <div className="space-y-3">
                {profile.emotionalPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{pattern}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Evolution (from time) */}
          {profile.evolution.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Evolução ao Longo do Tempo
              </h3>
              <div className="space-y-4">
                {profile.evolution.map((entry, index) => (
                  <div key={index} className="border-l-2 border-purple-500 pl-4 py-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{entry}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Privacy Info */}
          <Card className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-800 dark:text-gray-200">Seu perfil é privado e pessoal.</strong> Todas as
              informações ficam salvas apenas no seu dispositivo. A Lum usa esses dados para te
              acompanhar melhor ao longo do tempo, mas nada sai daqui.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
