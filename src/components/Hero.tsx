import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
  onSendPhotosClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onQuoteClick,
  onSendPhotosClick,
}) => {

  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#15191D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Bold Commercial Headline & Conversion Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold tracking-wider uppercase text-slate-400 text-center">
              <span className="text-[#3ea4be]">William Medinas</span>
              <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
              <span>Consultor VIDRONOX</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance text-center">
              Seu projeto merece a solução certa em vidro.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed text-center mx-auto">
              Consultoria técnica e projetos sob medida com a qualidade e execução VIDRONOX.
            </p>

            {/* CTAs: Botão principal e Botão secundário */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-md transition-all shadow-lg shadow-blue-600/35 hover:shadow-blue-600/50 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>Solicitar orçamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onSendPhotosClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0F223D] hover:bg-[#153158] border-2 border-[#0066FF] rounded-md transition-all shadow-sm hover:scale-[1.02]"
              >
                <Camera className="w-4 h-4 text-[#38BDF8]" />
                <span>Enviar fotos e medidas</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Large Architectural Glass Photo */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl aspect-16/11 bg-slate-900">
                <img
                  src="/src/assets/images/hero_architectural_glass_1793294763460.jpg"
                  alt="Instalações arquitetônicas em vidro VIDRONOX"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-medium text-slate-200">
                  Padrão Arquitetônico VIDRONOX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
