"use client";

import { Button } from "@/components/ui/button";
import { LumLogo } from "@/components/LumIcons";
import { Check, Sparkles, Heart, Shield } from "lucide-react";

interface CheckoutScreenProps {
  onCheckout: () => void;
}

export function CheckoutScreen({ onCheckout }: CheckoutScreenProps) {
  const benefits = [
    {
      icon: Heart,
      title: "Apoio emocional 24/7",
      description: "Converse quando precisar, sem julgamentos",
    },
    {
      icon: Sparkles,
      title: "Orientação personalizada",
      description: "Respostas adaptadas ao seu momento e necessidades",
    },
    {
      icon: Shield,
      title: "Privacidade total",
      description: "Suas conversas são 100% privadas e seguras",
    },
  ];

  const features = [
    "Conversas ilimitadas com a IA",
    "Biblioteca completa de quizzes de autoconhecimento",
    "Histórico organizado por temas",
    "Suporte emocional personalizado",
    "Atualizações e novos recursos",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#1a1a1a] dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LumLogo className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Pronto para começar sua jornada?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tenha acesso completo à Lum e comece a cuidar da sua saúde emocional hoje
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#212121] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing Card */}
        <div className="bg-white dark:bg-[#212121] rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Oferta de Lançamento
            </div>
            <div className="mb-2">
              <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">R$ 29,90</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">/mês</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cancele quando quiser, sem compromisso
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={onCheckout}
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Assinar agora
          </Button>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            Pagamento seguro • Cancele quando quiser
          </p>
        </div>

        {/* Trust Badge */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🔒 Ambiente seguro e confidencial • Seus dados são protegidos
          </p>
        </div>
      </div>
    </div>
  );
}
