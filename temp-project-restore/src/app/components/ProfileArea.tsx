"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Edit2, Save, Sparkles } from "lucide-react";

interface UserProfile {
  name: string;
  temperament: string;
  traits: string[];
  emotionalPatterns: string[];
  evolution: string[];
}

export function ProfileArea() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    temperament: "",
    traits: [],
    emotionalPatterns: [],
    evolution: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("lumia-user-profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditName(parsed.name);
    }
  }, []);

  const saveProfile = () => {
    const updatedProfile = { ...profile, name: editName };
    setProfile(updatedProfile);
    localStorage.setItem("lumia-user-profile", JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-5 sm:py-6">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900">Seu Perfil</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Como o Lum IA te conhece ao longo do tempo
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
          {/* Basic Info */}
          <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Informações Básicas</h3>
                </div>
              </div>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <Button
                  onClick={saveProfile}
                  size="sm"
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              )}
            </div>

            {isEditing ? (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Nome</label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Como você gostaria de ser chamado?"
                  className="border-gray-300 focus:border-indigo-400 focus:ring-indigo-400"
                />
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-1">Nome</p>
                <p className="text-lg text-gray-900">
                  {profile.name || "Clique em 'Editar' para adicionar seu nome"}
                </p>
              </div>
            )}
          </Card>

          {/* Temperament */}
          <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Temperamento</h3>
            </div>
            {profile.temperament ? (
              <p className="text-base text-gray-700 leading-relaxed">{profile.temperament}</p>
            ) : (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Faça os <strong className="text-indigo-700">quizzes de autoconhecimento</strong> para
                  descobrir mais sobre seu temperamento e como você funciona.
                </p>
              </div>
            )}
          </Card>

          {/* Traits */}
          <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Traços de Personalidade
            </h3>
            {profile.traits.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed">
                Conforme você usa o app e conversa com o Lum IA, seus traços de personalidade vão
                aparecer aqui de forma natural.
              </p>
            )}
          </Card>

          {/* Emotional Patterns */}
          <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Padrões Emocionais Observados
            </h3>
            {profile.emotionalPatterns.length > 0 ? (
              <div className="space-y-3">
                {profile.emotionalPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <p className="text-base text-gray-700 leading-relaxed">{pattern}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed">
                Ao longo do tempo, o Lum IA vai perceber padrões nas suas conversas — como você reage
                em certas situações, o que te incomoda, o que te motiva. Tudo isso aparece aqui, em
                linguagem simples e humana.
              </p>
            )}
          </Card>

          {/* Evolution */}
          <Card className="p-5 sm:p-6 bg-white border-gray-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Evolução ao Longo do Tempo
            </h3>
            {profile.evolution.length > 0 ? (
              <div className="space-y-4">
                {profile.evolution.map((entry, index) => (
                  <div key={index} className="border-l-2 border-indigo-500 pl-4 py-2">
                    <p className="text-sm text-gray-700 leading-relaxed">{entry}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed">
                Marcos importantes da sua jornada vão aparecer aqui — momentos de clareza, mudanças de
                perspectiva, decisões importantes. O Lum IA acompanha sua evolução de forma discreta e
                respeitosa.
              </p>
            )}
          </Card>

          {/* Privacy Info */}
          <Card className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <strong className="text-gray-800">Seu perfil é privado e pessoal.</strong> Todas as
              informações ficam salvas apenas no seu dispositivo. O Lum IA usa esses dados para te
              acompanhar melhor ao longo do tempo, mas nada sai daqui.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
