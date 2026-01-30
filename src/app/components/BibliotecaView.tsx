"use client";

import { useState } from "react";
import { FileText, Music, Play, Pause, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BibliotecaViewProps {
  userId: string;
  isDemo?: boolean;
  onDemoAction?: () => void;
}

interface Ebook {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface Audio {
  id: string;
  title: string;
  description: string;
  url: string;
}

const ebooks: Ebook[] = [
  {
    id: "ebook-01",
    title: "Chat com a Lum",
    description: "Guia completo para aproveitar ao máximo suas conversas",
    url: "/bonus/ebooks/ebook-01-chat.pdf",
  },
  {
    id: "ebook-02",
    title: "100 Perguntas para si mesmo",
    description: "Reflexões profundas para autoconhecimento",
    url: "/bonus/ebooks/ebook-02-100-perguntas.pdf",
  },
  {
    id: "ebook-03",
    title: "Minha Jornada",
    description: "Navegue sua jornada de autoconhecimento",
    url: "/bonus/ebooks/ebook-03-minha-jornada.pdf",
  },
  {
    id: "ebook-04",
    title: "As 7 Emoções",
    description: "Entenda e acolha suas emoções",
    url: "/bonus/ebooks/ebook-04-7-emocoes.pdf",
  },
];

const audios: Audio[] = [
  {
    id: "audio-01",
    title: "Acalmar Agora",
    description: "Para momentos de tensão e ansiedade",
    url: "/bonus/audios/01-acalmar-agora.mp3",
  },
  {
    id: "audio-02",
    title: "Mente Acelerada",
    description: "Quando os pensamentos não param",
    url: "/bonus/audios/02-mente-acelerada.mp3",
  },
  {
    id: "audio-03",
    title: "Antes de Dormir",
    description: "Preparação suave para o sono",
    url: "/bonus/audios/03-antes-de-dormir.mp3",
  },
  {
    id: "audio-04",
    title: "Acordei Ansioso",
    description: "Começar o dia com mais calma",
    url: "/bonus/audios/04-acordei-ansioso.mp3",
  },
  {
    id: "audio-05",
    title: "Quando Estiver Triste",
    description: "Acolhimento para momentos difíceis",
    url: "/bonus/audios/05-quando-estiver-triste.mp3",
  },
  {
    id: "audio-06",
    title: "Raiva & Limite",
    description: "Lidando com a raiva de forma saudável",
    url: "/bonus/audios/06-raiva-limite.mp3",
  },
  {
    id: "audio-07",
    title: "Autocobrança",
    description: "Suavizando a pressão interna",
    url: "/bonus/audios/07-autocobranca.mp3",
  },
  {
    id: "audio-08",
    title: "Culpa: Reparo ou Perdão",
    description: "Transformando culpa em aprendizado",
    url: "/bonus/audios/08-culpa-reparo-ou-perdao.mp3",
  },
  {
    id: "audio-09",
    title: "Vergonha & Acolhimento",
    description: "Ressignificando a vergonha",
    url: "/bonus/audios/09-vergonha-acolhimento.mp3",
  },
  {
    id: "audio-10",
    title: "Confusão & Clareza",
    description: "Encontrando clareza na confusão",
    url: "/bonus/audios/10-confusao-clareza.mp3",
  },
];

export function BibliotecaView({ userId, isDemo, onDemoAction }: BibliotecaViewProps) {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleOpenEbook = (ebook: Ebook) => {
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }

    // Abrir PDF em nova aba
    window.open(ebook.url, "_blank");
  };

  const handlePlayAudio = (audio: Audio) => {
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }

    // Se já está tocando esse áudio, pausar
    if (playingAudio === audio.id && audioElement) {
      audioElement.pause();
      setPlayingAudio(null);
      return;
    }

    // Pausar áudio anterior se existir
    if (audioElement) {
      audioElement.pause();
    }

    // Criar novo áudio
    const newAudio = new Audio(audio.url);
    newAudio.play();
    setPlayingAudio(audio.id);
    setAudioElement(newAudio);

    // Resetar quando terminar
    newAudio.onended = () => {
      setPlayingAudio(null);
      setAudioElement(null);
    };
  };

  const handleStopAudio = () => {
    if (audioElement) {
      audioElement.pause();
      setPlayingAudio(null);
      setAudioElement(null);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
        {/* Seção Ebooks */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Ebooks
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Material de apoio para sua jornada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ebooks.map((ebook) => (
              <div
                key={ebook.id}
                className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {ebook.description}
                    </p>
                    <Button
                      onClick={() => handleOpenEbook(ebook)}
                      size="sm"
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Abrir PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção Áudios Guiados */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-500" />
              Áudios Guiados
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Exercícios para diferentes momentos
            </p>
          </div>

          <div className="space-y-3">
            {audios.map((audio) => (
              <div
                key={audio.id}
                className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayAudio(audio)}
                    className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    {playingAudio === audio.id ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {audio.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {audio.description}
                    </p>
                  </div>

                  {playingAudio === audio.id && (
                    <Button
                      onClick={handleStopAudio}
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Player fixo quando estiver tocando */}
        {playingAudio && (
          <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
            <div className="flex items-center gap-3">
              <button
                onClick={handleStopAudio}
                className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <Pause className="w-4 h-4 text-white" />
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {audios.find((a) => a.id === playingAudio)?.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Tocando...
                </p>
              </div>

              <Button
                onClick={handleStopAudio}
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
