"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Screenshot {
  title: string;
  description: string;
  imageUrl: string;
}

const screenshots: Screenshot[] = [
  {
    title: "Tela 1",
    description: "Interface do app",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/283409e0-0231-47be-98c2-ce0ecf515642.jpeg",
  },
  {
    title: "Tela 2",
    description: "Funcionalidades do app",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/a0ea9293-73d2-4e83-a76e-4bdce86356e8.jpeg",
  },
  {
    title: "Tela 3",
    description: "Experiência personalizada",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/fdff7927-b05d-4c52-9be8-211cccf0d0f1.jpeg",
  },
  {
    title: "Tela 4",
    description: "Recursos principais",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/0fa56f2c-37b2-4000-8a3a-3126bfd5cbb7.jpeg",
  },
  {
    title: "Tela 5",
    description: "Navegação intuitiva",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/5344bdfe-7341-451e-884e-178e0debd295.jpeg",
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
          {/* Screen Content with Real App Screenshot */}
          <img
            src={currentScreen.imageUrl}
            alt={currentScreen.description}
            className="w-full h-full object-cover transition-all duration-500"
          />
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
