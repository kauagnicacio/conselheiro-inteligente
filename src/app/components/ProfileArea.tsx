"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Edit2, 
  Save, 
  Sparkles, 
  Heart, 
  Target, 
  Calendar,
  TrendingUp,
  Award,
  MessageCircle,
  Brain,
  Zap,
  Star,
  Clock,
  CheckCircle2
} from "lucide-react";

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
  quizzesCompleted: number;
  conversationsCount: number;
  joinedDate: string;
  lastActive: string;
  insights: {
    strengths: string[];
    growthAreas: string[];
    emotionalTrends: string[];
  };
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
    quizzesCompleted: 0,
    conversationsCount: 0,
    joinedDate: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    insights: {
      strengths: [],
      growthAreas: [],
      emotionalTrends: []
    }
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

  const getDaysSinceJoined = () => {
    const joined = new Date(profile.joinedDate);
    const now = new Date();
    const diff = Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-[#1a1a1a]">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-5 sm:py-6">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100">Seu Perfil</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
          Quanto mais você interage, mais a Lum te conhece
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
          
          {/* Header com Nome e Stats */}
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 border-purple-200 dark:border-purple-800 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  {isEditing ? (
                    <Input
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                      placeholder="Seu nome"
                      className="text-xl sm:text-2xl font-semibold mb-1 border-purple-300 dark:border-purple-600"
                    />
                  ) : (
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {profile.name || "Olá!"}
                    </h3>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Com a Lum há {getDaysSinceJoined()} dias
                  </p>
                </div>
              </div>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30"
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
                    className="border-purple-300 dark:border-purple-600"
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Quizzes</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.quizzesCompleted}</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Conversas</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.conversationsCount}</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Insights</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {profile.insights.strengths.length + profile.insights.growthAreas.length}
                </p>
              </div>
            </div>
          </Card>

          {/* Descobertas sobre Você */}
          {(profile.traits.length > 0 || profile.temperament) && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Descobertas sobre você
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Identificadas através dos quizzes
                  </p>
                </div>
              </div>

              {profile.temperament && (
                <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-1">Temperamento</p>
                  <p className="text-base text-gray-700 dark:text-gray-300">{profile.temperament}</p>
                </div>
              )}

              {profile.traits.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Traços de Personalidade</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-300 dark:border-purple-700"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Seus Pontos Fortes */}
          {profile.insights.strengths.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Seus pontos fortes
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    O que a Lum percebeu em você
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {profile.insights.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Áreas de Crescimento */}
          {profile.insights.growthAreas.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Áreas de crescimento
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Oportunidades para evoluir
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {profile.insights.growthAreas.map((area, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{area}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Padrões Emocionais */}
          {profile.emotionalPatterns.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Padrões emocionais
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Observados nas conversas
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {profile.emotionalPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{pattern}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Sua Jornada */}
          {profile.evolution.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Sua jornada
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Evolução ao longo do tempo
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {profile.evolution.map((entry, index) => (
                  <div key={index} className="relative pl-6 pb-4 border-l-2 border-amber-300 dark:border-amber-700 last:pb-0">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{entry}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Campos Editáveis - Mais Guiados */}
          <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Conte mais sobre você
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ajude a Lum a te conhecer melhor
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Momento Atual */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Que momento você está vivendo agora?
                </label>
                {isEditing ? (
                  <Textarea
                    value={editProfile.currentMoment}
                    onChange={(e) => setEditProfile({ ...editProfile, currentMoment: e.target.value })}
                    placeholder="Ex: Estou em transição de carreira, acabei de me mudar para uma nova cidade..."
                    className="border-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 min-h-[80px]"
                  />
                ) : profile.currentMoment ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    {profile.currentMoment}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    Clique em "Editar" para compartilhar
                  </p>
                )}
              </div>

              {/* Estado Emocional */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  Como você tem se sentido ultimamente?
                </label>
                {isEditing ? (
                  <Textarea
                    value={editProfile.emotionalState}
                    onChange={(e) => setEditProfile({ ...editProfile, emotionalState: e.target.value })}
                    placeholder="Ex: Tenho me sentido ansioso, mas também esperançoso sobre o futuro..."
                    className="border-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 min-h-[80px]"
                  />
                ) : profile.emotionalState ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    {profile.emotionalState}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    Clique em "Editar" para compartilhar
                  </p>
                )}
              </div>

              {/* Desafio Principal */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Qual seu maior desafio no momento?
                </label>
                {isEditing ? (
                  <Textarea
                    value={editProfile.mainChallenge}
                    onChange={(e) => setEditProfile({ ...editProfile, mainChallenge: e.target.value })}
                    placeholder="Ex: Tomar uma decisão importante sobre minha carreira, lidar com um relacionamento..."
                    className="border-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 min-h-[80px]"
                  />
                ) : profile.mainChallenge ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    {profile.mainChallenge}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    Clique em "Editar" para compartilhar
                  </p>
                )}
              </div>

              {/* O que importa */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                  <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
                  O que realmente importa para você?
                </label>
                {isEditing ? (
                  <Textarea
                    value={editProfile.whatMatters}
                    onChange={(e) => setEditProfile({ ...editProfile, whatMatters: e.target.value })}
                    placeholder="Ex: Minha família, crescimento pessoal, fazer diferença no mundo..."
                    className="border-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 min-h-[80px]"
                  />
                ) : profile.whatMatters ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    {profile.whatMatters}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    Clique em "Editar" para compartilhar
                  </p>
                )}
              </div>

              {/* Cenário dos sonhos */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Como seria sua vida ideal?
                </label>
                {isEditing ? (
                  <Textarea
                    value={editProfile.dreamScenario}
                    onChange={(e) => setEditProfile({ ...editProfile, dreamScenario: e.target.value })}
                    placeholder="Ex: Ter um trabalho que me realiza, viver em paz comigo mesmo, ter relações verdadeiras..."
                    className="border-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 min-h-[80px]"
                  />
                ) : profile.dreamScenario ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    {profile.dreamScenario}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    Clique em "Editar" para compartilhar
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Privacy Info */}
          <Card className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-800 dark:text-gray-200">Seu perfil evolui com você.</strong> Conforme você conversa com a Lum e faz quizzes, novas descobertas aparecem aqui automaticamente. Tudo fica salvo apenas no seu dispositivo.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
