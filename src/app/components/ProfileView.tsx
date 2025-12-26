"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, User, Sparkles, Heart, Target, TrendingUp, Award, MessageCircle, Brain, Zap, Star, CheckCircle2, Lightbulb, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ProfileViewProps {
  onBack: () => void;
  userId: string;
  userEmail: string;
}

interface UserProfile {
  name: string;
  quizzesCompleted: number;
  conversationsCount: number;
  joinedDate: string;
  lastActive: string;
  
  // Dados automáticos baseados em quizzes e conversas
  traits: string[];
  temperament: string;
  emotionalPatterns: string[];
  recurringThemes: string[];
  interpretations: string[];
  
  insights: {
    strengths: string[];
    growthAreas: string[];
  };
}

export function ProfileView({ onBack, userId, userEmail }: ProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    quizzesCompleted: 0,
    conversationsCount: 0,
    joinedDate: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    traits: [],
    temperament: "",
    emotionalPatterns: [],
    recurringThemes: [],
    interpretations: [],
    insights: {
      strengths: [],
      growthAreas: []
    }
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem(`lumia-user-profile-${userId}`);
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
    } else {
      // Dados de exemplo para demonstração (serão substituídos por dados reais dos quizzes)
      const exampleProfile: UserProfile = {
        name: userEmail.split('@')[0] || "Você",
        quizzesCompleted: 3,
        conversationsCount: 12,
        joinedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: new Date().toISOString(),
        
        traits: ["Introspectivo", "Analítico", "Sensível", "Reflexivo"],
        temperament: "Melancólico-Fleumático",
        
        emotionalPatterns: [
          "Tende a processar emoções internamente antes de expressá-las",
          "Busca compreender profundamente as situações antes de agir",
          "Valoriza autenticidade e conexões genuínas"
        ],
        
        recurringThemes: [
          "Autocobrança e perfeccionismo",
          "Decisões importantes sobre carreira",
          "Equilíbrio entre razão e emoção",
          "Relacionamentos e vulnerabilidade"
        ],
        
        interpretations: [
          "Você tende a refletir muito antes de agir, especialmente em decisões pessoais.",
          "Há um padrão de buscar validação externa, mesmo tendo clareza interna.",
          "Suas conversas revelam uma pessoa que valoriza profundidade em vez de superficialidade."
        ],
        
        insights: {
          strengths: [
            "Capacidade de autorreflexão profunda e honesta",
            "Sensibilidade para perceber nuances emocionais",
            "Pensamento analítico bem desenvolvido"
          ],
          growthAreas: [
            "Permitir-se agir mesmo sem ter todas as respostas",
            "Reduzir a autocrítica excessiva",
            "Expressar necessidades e limites com mais clareza"
          ]
        }
      };
      
      setProfile(exampleProfile);
      localStorage.setItem(`lumia-user-profile-${userId}`, JSON.stringify(exampleProfile));
    }
  }, [userId, userEmail]);

  const getDaysSinceJoined = () => {
    const joined = new Date(profile.joinedDate);
    const now = new Date();
    const diff = Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const handleEditName = () => {
    setEditedName(profile.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (editedName.trim()) {
      const updatedProfile = { ...profile, name: editedName.trim() };
      setProfile(updatedProfile);
      localStorage.setItem(`lumia-user-profile-${userId}`, JSON.stringify(updatedProfile));
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-[#1a1a1a]">
      {/* Header - Otimizado para mobile */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 dark:text-gray-100 truncate">Seu Perfil</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              Construído através das suas interações
            </p>
          </div>
        </div>
      </header>

      {/* Content - Otimizado para mobile */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
          
          {/* Header com Nome e Stats - Otimizado para mobile */}
          <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 border-purple-200 dark:border-purple-800 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-4 sm:mb-5 gap-3">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
                  <User className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  {!isEditingName ? (
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {profile.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditName}
                        className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-purple-200 dark:hover:bg-purple-800 shrink-0"
                      >
                        <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="h-8 sm:h-9 w-32 sm:w-48 text-sm sm:text-base"
                        placeholder="Seu nome"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSaveName}
                        className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-green-200 dark:hover:bg-green-800 shrink-0"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCancelEdit}
                        className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-red-200 dark:hover:bg-red-800 shrink-0"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    Com a Lum há {getDaysSinceJoined()} dias
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid - Otimizado para mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate">Quizzes</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.quizzesCompleted}</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate">Conversas</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.conversationsCount}</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate">Insights</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {profile.insights.strengths.length + profile.insights.growthAreas.length}
                </p>
              </div>
            </div>
          </Card>

          {/* Interpretações Automáticas - Otimizado para mobile */}
          {profile.interpretations.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border-indigo-200 dark:border-indigo-800 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    O que a Lum percebe sobre você
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Interpretações baseadas nas suas interações
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.interpretations.map((interpretation, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg sm:rounded-xl border border-indigo-200 dark:border-indigo-700">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                      "{interpretation}"
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Traços Predominantes - Otimizado para mobile */}
          {(profile.traits.length > 0 || profile.temperament) && (
            <Card className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Brain className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Traços predominantes
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Identificados através dos quizzes
                  </p>
                </div>
              </div>

              {profile.temperament && (
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-xs sm:text-sm font-medium text-purple-900 dark:text-purple-300 mb-1">Temperamento</p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{profile.temperament}</p>
                </div>
              )}

              {profile.traits.length > 0 && (
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5 sm:mb-3">Características</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {profile.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm font-medium border border-purple-300 dark:border-purple-700"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Padrões Emocionais Observados - Otimizado para mobile */}
          {profile.emotionalPatterns.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shrink-0">
                  <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Padrões emocionais observados
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Como você costuma processar emoções
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.emotionalPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{pattern}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Temas Recorrentes - Otimizado para mobile */}
          {profile.recurringThemes.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0">
                  <Target className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Temas que mais aparecem
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Assuntos recorrentes nas conversas
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {profile.recurringThemes.map((theme, index) => (
                  <div key={index} className="p-2.5 sm:p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">{theme}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Seus Pontos Fortes - Otimizado para mobile */}
          {profile.insights.strengths.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shrink-0">
                  <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Seus pontos fortes
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Qualidades identificadas
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.insights.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Áreas de Crescimento - Otimizado para mobile */}
          {profile.insights.growthAreas.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Áreas de crescimento
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Oportunidades para evoluir
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.insights.growthAreas.map((area, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{area}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Info sobre como o perfil funciona - Otimizado para mobile */}
          <Card className="p-3.5 sm:p-4 md:p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-800 dark:text-gray-200">Seu perfil é construído automaticamente.</strong> Conforme você conversa com a Lum e completa quizzes, novas descobertas sobre você aparecem aqui. Nada precisa ser preenchido manualmente - deixe suas interações revelarem quem você é.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
