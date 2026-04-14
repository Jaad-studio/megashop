import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/33744253215?text=Bonjour%20Megashop%20!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.8)] transition-all duration-300 hover:scale-110 group"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30 group-hover:opacity-60 transition-opacity" />
      <MessageCircle size={32} className="relative z-10 filter drop-shadow-md" />
    </a>
  );
};

export default FloatingWhatsApp;
