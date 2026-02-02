"use client";

import { MessageCircle } from "lucide-react";

export function SupportButton() {
  const handleClick = () => {
    const phoneNumber = "5511949156613";
    const message = "Oi! Sou usuário(a) do Lum IA e preciso de ajuda. Meu problema é: ";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Suporte via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
}
