import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl =
    'https://wa.me/5569992824464?text=' +
    encodeURIComponent('Olá William! Gostaria de uma consultoria para meu projeto de vidro.');

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3 group">
      {/* Discreet floating tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#15191D] text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-white/10 animate-in fade-in slide-in-from-right-4 duration-300">
          <span>
            Dúvidas? <strong className="text-[#3ea4be]">Fale com William</strong>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Fechar balão"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 relative"
        aria-label="Conversar pelo WhatsApp com William Medinas (69) 99282-4464"
      >
        <MessageCircle className="w-7 h-7 fill-white/20" />
        {/* Subtle ping indicator */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#15191D] rounded-full" />
      </a>
    </div>
  );
};
