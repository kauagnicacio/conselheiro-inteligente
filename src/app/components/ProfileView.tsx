"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileViewProps {
  onBack: () => void;
  userId: string;
  userEmail: string;
}

interface ProfileData {
  displayName: string;
  bio: string;
  avatar: string | null;
}

export function ProfileView({ onBack, userId, userEmail }: ProfileViewProps) {
  const [profile, setProfile] = useState<ProfileData>({
    displayName: "",
    bio: "",
    avatar: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Carregar perfil do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`lumia-profile-${userId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
      } catch (e) {
        console.error("Erro ao carregar perfil:", e);
      }
    }
  }, [userId]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Salvar no localStorage
    localStorage.setItem(`lumia-profile-${userId}`, JSON.stringify(profile));
    
    // Salvar avatar separadamente para uso no chat
    if (profile.avatar) {
      localStorage.setItem("lumia-user-avatar", profile.avatar);
    }
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Perfil salvo com sucesso!");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
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
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Meu Perfil
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Personalize suas informações
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-purple-100 dark:ring-purple-900/30"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-purple-100 dark:ring-purple-900/30">
                  {profile.displayName
                    ? profile.displayName[0].toUpperCase()
                    : userEmail[0].toUpperCase()}
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
              >
                <Camera className="w-8 h-8 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Clique na foto para alterar
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email (read-only) */}
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                disabled
                className="mt-1.5 bg-gray-50 dark:bg-gray-800/50"
              />
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                Seu email não pode ser alterado
              </p>
            </div>

            {/* Display Name */}
            <div>
              <Label htmlFor="displayName" className="text-gray-700 dark:text-gray-300">
                Nome de exibição
              </Label>
              <Input
                id="displayName"
                type="text"
                value={profile.displayName}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, displayName: e.target.value }))
                }
                placeholder="Como você quer ser chamado?"
                className="mt-1.5"
              />
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                Este nome aparecerá no chat e no menu
              </p>
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">
                Sobre você
              </Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Conte um pouco sobre você..."
                className="mt-1.5 min-h-[120px]"
              />
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                Opcional - ajuda a Lum a te conhecer melhor
              </p>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Salvando..." : "Salvar alterações"}
              </Button>
              {saveMessage && (
                <p className="text-sm text-green-600 dark:text-green-400 animate-fade-in">
                  {saveMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
