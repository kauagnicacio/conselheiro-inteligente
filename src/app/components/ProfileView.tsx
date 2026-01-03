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
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(`lumia-user-profile-${userId}`);
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      
      // Verificar se tem dados reais (não apenas valores padrão)
      const hasRealData = 
        parsed.quizzesCompleted > 0 || 
        parsed.conversationsCount > 0 ||
        parsed.traits.length > 0 ||
        parsed.interpretations.length > 0;
      
      setHasData(hasRealData);
    } else {
      // Perfil inicial vazio
      const emptyProfile: UserProfile = {
        name: userEmail.split('@')[0] || "Você",
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
      };
      
      setProfile(emptyProfile);
      setHasData(false);
      localStorage.setItem(`lumia-user-profile-${userId}`, JSON.stringify(emptyProfile));
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

  // Estado inicial vazio - mostrar apenas mensagem
  if (!hasData) {
    return (
      <div className="flex flex-col h-full bg-[#1a1a1a]">
        {/* Header */}
        <header className="bg-[#212121] backdrop-blur-sm border-b border-gray-800 px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </Button>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-100 truncate">Seu Perfil</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
                Construído através das suas interações
              </p>
            </div>
          </div>
        </header>

        {/* Content - Estado Vazio */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center space-y-6">
            {/* Ícone */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-800/50 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-purple-400" />
            </div>

            {/* Mensagem Principal */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-100">
                Seu perfil será construído aos poucos
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Conforme você conversa com a Lum e realiza quizzes, traços, padrões e insights sobre você surgirão aqui naturalmente.
              </p>
            </div>

            {/* Card com Info */}
            <Card className="p-5 bg-[#212121] border-gray-800 text-left">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <strong className="text-gray-100">Nada precisa ser preenchido manualmente.</strong> Deixe suas interações revelarem quem você é.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Perfil com dados
  return (
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      {/* Header */}
      <header className="bg-[#212121] backdrop-blur-sm border-b border-gray-800 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </Button>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-100 truncate">Seu Perfil</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
              Construído através das suas interações
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
          
          {/* Header com Nome e Stats */}
          <Card className="p-4 sm:p-5 md:p-6 bg-[#212121] border-gray-800 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-4 sm:mb-5 gap-3">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-gray-800/50 flex items-center justify-center shadow-lg shrink-0 border border-gray-700">
                  <User className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  {!isEditingName ? (
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-100 truncate">
                        {profile.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditName}
                        className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-gray-800 shrink-0"
                      >
                        <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="h-8 sm:h-9 w-32 sm:w-48 text-sm sm:text-base bg-gray-800 border-gray-700 text-gray-100"
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
                        className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-green-900/20 shrink-0"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCancelEdit}
                        className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-red-900/20 shrink-0"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      </Button>
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Com a Lum há {getDaysSinceJoined()} dias
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
                  <span className="text-xs text-gray-400 truncate">Quizzes</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-100">{profile.quizzesCompleted}</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
                  <span className="text-xs text-gray-400 truncate">Conversas</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-100">{profile.conversationsCount}</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 col-span-2 sm:col-span-1 border border-gray-700">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
                  <span className="text-xs text-gray-400 truncate">Insights</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-100">
                  {profile.insights.strengths.length + profile.insights.growthAreas.length}
                </p>
              </div>
            </div>
          </Card>

          {/* Interpretações Automáticas */}
          {profile.interpretations.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-[#212121] border-gray-800 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 border border-gray-700">
                  <Lightbulb className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
                    O que a Lum percebe sobre você
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Interpretações baseadas nas suas interações
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.interpretations.map((interpretation, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-700">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                      "{interpretation}"
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Traços Predominantes */}
          {(profile.traits.length > 0 || profile.temperament) && (
            <Card className="p-4 sm:p-5 md:p-6 bg-[#212121] border-gray-800 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 border border-gray-700">
                  <Brain className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
                    Traços predominantes
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Identificados através dos quizzes
                  </p>
                </div>
              </div>

              {profile.temperament && (
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-700">
                  <p className="text-xs sm:text-sm font-medium text-purple-400 mb-1">Temperamento</p>
                  <p className="text-sm sm:text-base text-gray-300">{profile.temperament}</p>
                </div>
              )}

              {profile.traits.length > 0 && (
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-300 mb-2.5 sm:mb-3">Características</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {profile.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-800/50 text-purple-300 rounded-full text-xs sm:text-sm font-medium border border-gray-700"
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
            <Card className="p-4 sm:p-5 md:p-6 bg-[#212121] border-gray-800 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 border border-gray-700">
                  <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
                    Padrões emocionais observados
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Como você costuma processar emoções
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.emotionalPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{pattern}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Temas Recorrentes */}
          {profile.recurringThemes.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-[#212121] border-gray-800 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 border border-gray-700">
                  <Target className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
                    Temas que mais aparecem
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Assuntos recorrentes nas conversas
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {profile.recurringThemes.map((theme, index) => (
                  <div key={index} className="p-2.5 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <p className="text-xs sm:text-sm text-gray-300 font-medium">{theme}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Seus Pontos Fortes */}
          {profile.insights.strengths.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-[#212121] border-gray-800 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 border border-gray-700">
                  <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
                    Seus pontos fortes
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Qualidades identificadas
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.insights.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Áreas de Crescimento */}
          {profile.insights.growthAreas.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-6 bg-[#212121] border-gray-800 shadow-sm">
              <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 border border-gray-700">
                  <TrendingUp className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
                    Áreas de crescimento
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Oportunidades para evoluir
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {profile.insights.growthAreas.map((area, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{area}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Info sobre como o perfil funciona */}
          <Card className="p-3.5 sm:p-4 md:p-5 bg-[#212121] border-gray-800 shadow-sm">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  <strong className="text-gray-200">Seu perfil é construído automaticamente.</strong> Conforme você conversa com a Lum e completa quizzes, novas descobertas sobre você aparecem aqui. Nada precisa ser preenchido manualmente - deixe suas interações revelarem quem você é.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
