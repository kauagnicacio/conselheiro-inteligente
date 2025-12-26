"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, User, Sparkles, Heart, Target, TrendingUp, Award, MessageCircle, Brain, Zap, Star, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-[#1a1a1a]">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 dark:text-gray-100">Seu Perfil</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Construído automaticamente através das suas interações
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
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
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {profile.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Com a Lum há {getDaysSinceJoined()} dias
                  </p>
                </div>
              </div>
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

          {/* Interpretações Automáticas */}
          {profile.interpretations.length > 0 && (
            <Card className="p-5 sm:p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border-indigo-200 dark:border-indigo-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    O que a Lum percebe sobre você
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Interpretações baseadas nas suas interações
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {profile.interpretations.map((interpretation, index) => (
                  <div key={index} className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-indigo-200 dark:border-indigo-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                      "{interpretation}"
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Traços Predominantes */}
          {(profile.traits.length > 0 || profile.temperament) && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Traços predominantes
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Identificados através dos quizzes
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
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Características</p>
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

          {/* Padrões Emocionais Observados */}
          {profile.emotionalPatterns.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Padrões emocionais observados
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Como você costuma processar emoções
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {profile.emotionalPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{pattern}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Temas Recorrentes */}
          {profile.recurringThemes.length > 0 && (
            <Card className="p-5 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Temas que mais aparecem
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Assuntos recorrentes nas conversas
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.recurringThemes.map((theme, index) => (
                  <div key={index} className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{theme}</p>
                  </div>
                ))}
              </div>
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
                    Qualidades identificadas
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

          {/* Info sobre como o perfil funciona */}
          <Card className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
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
