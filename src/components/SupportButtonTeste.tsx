"use client";

import { MessageCircle } from "lucide-react";

interface SupportButtonTesteProps {
  hideOnChat?: boolean;
}

export function SupportButtonTeste({ hideOnChat = false }: SupportButtonTesteProps) {
  const handleClick = () => {
    const phoneNumber = "5511949156613";
    const message = "Oi! Estou testando a Lum IA no modo teste (/teste) e preciso de ajuda com: ";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  if (hideOnChat) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Suporte via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
}
