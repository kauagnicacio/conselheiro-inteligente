"use client";

import { ChevronLeft, Users } from "lucide-react";
import { Psychologist } from "@/types/psychologist";

interface PsychologistProfileProps {
  psychologist: Psychologist;
  onBack: () => void;
  isDemo?: boolean;
  onDemoAction?: () => void;
}

export function PsychologistProfile({ psychologist, onBack, isDemo = false, onDemoAction }: PsychologistProfileProps) {
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      "Oi, tudo bem? Encontrei seu perfil pelo Lum IA e gostaria de saber sobre atendimento (valores e horários)."
    );
    return `https://wa.me/55${psychologist.phone}?text=${message}`;
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Voltar para lista</span>
        </button>

        {/* Card Principal */}
        <div className="bg-white dark:bg-[#212121] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          {/* Header: Foto + Nome + CRP + Valor */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <img
              src={psychologist.photo}
              alt={psychologist.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-purple-200 dark:ring-purple-700"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {psychologist.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                {psychologist.profession}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                CRP: {psychologist.crp}
              </p>
            </div>
          </div>

          {/* Temas/Tags */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              Temas de Atendimento
            </h2>
            <div className="flex flex-wrap gap-2">
              {psychologist.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Abordagem */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              Abordagem
            </h2>
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {psychologist.approach}
              </span>
            </div>
          </div>

          {/* Público Atendido */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              Público Atendido
            </h2>
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-gray-900 dark:text-gray-100">
                {psychologist.audience.join(", ")}
              </span>
            </div>
          </div>

          {/* Sobre mim */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              Sobre mim
            </h2>
            <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {psychologist.about}
              </p>
            </div>
          </div>

          {/* Botão WhatsApp */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={(e) => {
                if (isDemo && onDemoAction) {
                  e.preventDefault();
                  onDemoAction();
                } else {
                  window.open(getWhatsAppLink(), '_blank');
                }
              }}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-semibold text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Quero me consultar
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-3">
              Você será redirecionado para o WhatsApp
            </p>
          </div>
        </div>

        {/* Aviso */}
        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-700/30">
          <p className="text-sm text-purple-900 dark:text-purple-300">
            <strong>Importante:</strong> O contato é direto com o profissional. O Lum IA não participa do agendamento, valores ou atendimento. Este é apenas um espaço de divulgação.
          </p>
        </div>
      </div>
    </div>
  );
}
