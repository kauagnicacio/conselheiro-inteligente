"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AppSection {
  id: string;
  title: string;
  imageUrl: string;
}

const appSections: AppSection[] = [
  {
    id: "chat",
    title: "Chat",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/a5f4ef27-3e9e-4bac-8fd6-63cdfcb63310.jpeg",
  },
  {
    id: "quiz",
    title: "Quiz",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/9fceb2f5-b1ee-4c67-8db1-1cbc74ce159b.jpeg",
  },
  {
    id: "reflexao",
    title: "Reflexão",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/9d46f843-4c67-4ff5-b292-1d5ddb8f0e7d.jpeg",
  },
  {
    id: "jornada",
    title: "Jornada",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/9a68355d-64b9-4e98-a4fd-9f84d8459dd9.jpeg",
  },
  {
    id: "profissionais",
    title: "Profissionais",
    imageUrl: "https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_34dEQaUEdA0vDQOPaz2weSm3AKh/09206d8f-b468-400a-a153-8edad7871b49.jpeg",
  },
];

export function QuizAppPreview() {
  const [selectedSection, setSelectedSection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrev = () => {
    setSelectedSection((prev) => (prev - 1 + appSections.length) % appSections.length);
  };

  const handleNext = () => {
    setSelectedSection((prev) => (prev + 1) % appSections.length);
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

  const currentSection = appSections[selectedSection];

  return (
    <div className="w-full">
      {/* Tabs - Section Selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 justify-center flex-wrap">
        {appSections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setSelectedSection(index)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedSection === index
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Phone Mockup with Screenshot */}
      <div className="relative w-full max-w-sm mx-auto">
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
              src={currentSection.imageUrl}
              alt={currentSection.title}
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
          {appSections.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedSection(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedSection
                  ? "w-8 bg-purple-600 dark:bg-purple-400"
                  : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400"
              }`}
              aria-label={`Ir para ${appSections[index].title}`}
            />
          ))}
        </div>

        {/* Helper Text */}
        <div className="text-center mt-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Arraste ou clique nas abas para explorar
          </p>
        </div>
      </div>
    </div>
  );
}
