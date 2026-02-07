"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Screenshot {
  title: string;
  description: string;
  gradient: string;
}

const screenshots: Screenshot[] = [
  {
    title: "Início",
    description: "Escolha como cuidar de você hoje",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Chat - Espaço Livre",
    description: "Desabafe sem julgamento, 24h",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "Quiz",
    description: "Organize a cabeça em 2 minutos",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    title: "Reflexão do Dia",
    description: "Perguntas que destravam sua mente",
    gradient: "from-amber-600 to-orange-600",
  },
  {
    title: "Minha Jornada",
    description: "Acompanhe seu progresso emocional",
    gradient: "from-green-600 to-emerald-600",
  },
  {
    title: "7 Emoções",
    description: "Explore e entenda suas emoções",
    gradient: "from-rose-600 to-pink-600",
  },
];

export function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const currentScreen = screenshots[currentIndex];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone Mockup */}
      <div className="relative mx-auto w-full max-w-[300px] aspect-[9/19] bg-gray-900 rounded-[40px] border-[10px] border-gray-900 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20" />

        {/* Screen Container */}
        <div
          className="w-full h-full relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Screen Content with Gradient */}
          <div
            className={`w-full h-full bg-gradient-to-br ${currentScreen.gradient} p-6 flex flex-col items-center justify-center text-center transition-all duration-500`}
          >
            <div className="mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto flex items-center justify-center">
                <div className="w-16 h-16 bg-white/30 rounded-xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentScreen.title}
            </h3>
            <p className="text-sm text-white/90 max-w-[200px]">
              {currentScreen.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Desktop */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Próximo"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-purple-600 dark:bg-purple-400"
                : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400"
            }`}
            aria-label={`Ir para tela ${index + 1}`}
          />
        ))}
      </div>

      {/* Screen Title Below Carousel */}
      <div className="text-center mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Arraste para ver mais funcionalidades
        </p>
      </div>
    </div>
  );
}
