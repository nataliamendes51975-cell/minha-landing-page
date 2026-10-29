import React from 'react';
import { Phone, MessageSquare, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const whatsappNumber = '(69) 99282-4464';
  const whatsappUrl =
    'https://wa.me/5569992824464?text=' +
    encodeURIComponent('Olá William, vim pelo site e gostaria de orientação para meu projeto em vidro.');

  return (
    <section id="contato" className="py-20 md:py-24 bg-[#15191D] text-white border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#3ea4be]">
            Atendimento Direto
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Vamos conversar sobre seu projeto?
          </h2>
          <p className="text-base text-slate-300">
            Atendimento direto pelo WhatsApp com o consultor William Medinas.
          </p>
        </div>

        {/* Big Conversion Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-xl transition-all shadow-xl shadow-blue-600/35 hover:shadow-blue-600/55 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50"
          >
            <MessageSquare className="w-5 h-5 text-white" />
            <span>Falar com William no WhatsApp</span>
          </a>

          <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#3ea4be]" />
            <span>{whatsappNumber}</span>
          </div>
        </div>

        {/* Quiet Corporate Note */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Shield className="w-4 h-4 text-[#3ea4be] shrink-0" />
          <span>Consultoria William Medinas · Contratos e execução pela VIDRONOX</span>
        </div>
      </div>
    </section>
  );
};
