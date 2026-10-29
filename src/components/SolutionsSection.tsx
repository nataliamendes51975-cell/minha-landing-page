import React, { useState } from 'react';
import { ArrowUpRight, ZoomIn, X, CheckCircle2 } from 'lucide-react';
import { SIX_SOLUTIONS } from '../data/solutions';
import { SolutionCategory } from '../types';

interface SolutionsSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onSelectService }) => {
  const [activeModalItem, setActiveModalItem] = useState<SolutionCategory | null>(null);

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-white text-[#15191D] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Generous Whitespace */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#244C5A] mb-2">
            Soluções VIDRONOX
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#15191D] text-balance">
            Soluções sob medida em vidro.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Projetos residenciais e corporativos executados com precisão e acabamento impecável.
          </p>
        </div>

        {/* 6 Standardized Architectural Cards Grid (3 columns on lg, 2 on md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIX_SOLUTIONS.map((item) => (
            <div
              key={item.id}
              className="group bg-[#F4F6F7] border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#244C5A]/50 transition-all duration-300 hover:shadow-md"
            >
              <div>
                {/* Large Architectural Photo */}
                <div
                  className="relative aspect-4/3 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActiveModalItem(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-slate-900 rounded-full text-xs font-bold shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-[#244C5A]" />
                      <span>Visualizar</span>
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[11px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded">
                    {item.glassSpec}
                  </span>
                </div>

                {/* Content: Title & Max 10-15 Words Description */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-[#15191D] group-hover:text-[#244C5A] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectService(item.name)}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-xl transition-all shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 group/btn hover:scale-[1.01]"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Fullscreen Photo Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-[#15191D] rounded-2xl overflow-hidden border border-white/10 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-3 right-3 z-10 p-2 text-white/70 hover:text-white bg-black/60 rounded-full"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-16/10 bg-black">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{activeModalItem.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{activeModalItem.shortDesc}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#3ea4be]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Especificação: {activeModalItem.glassSpec}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectService(activeModalItem.name);
                  setActiveModalItem(null);
                }}
                className="px-6 py-3 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-md shadow-blue-600/30"
              >
                Solicitar este serviço
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
