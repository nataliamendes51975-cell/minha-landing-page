import React from 'react';
import { Lock } from 'lucide-react';

export const DigitalProducts: React.FC = () => {
  return (
    <section id="produtos-digitais" className="py-20 md:py-24 bg-white text-[#15191D] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F4F6F7] border border-slate-200 rounded-2xl p-10 sm:p-14 space-y-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 text-[#244C5A] flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#15191D]">
            Em breve
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            Conteúdos e ferramentas práticas para profissionais da vidraçaria.
          </p>
        </div>
      </div>
    </section>
  );
};
