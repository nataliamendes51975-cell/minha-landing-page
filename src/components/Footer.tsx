import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111417] text-slate-400 text-xs py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">
                WILLIAM MEDINAS
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#3ea4be] bg-[#244C5A]/30 px-2 py-0.5 rounded border border-[#244C5A]/50">
                VIDRONOX
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Consultor de soluções em vidro.
            </p>
          </div>

          {/* Navigation Links Mirror (Only the 6 core links) */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <a href="#inicio" className="hover:text-white transition-colors">Início</a>
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#solucoes" className="hover:text-white transition-colors">Soluções</a>
            <a href="#projeto" className="hover:text-white transition-colors">Envie seu Projeto</a>
            <a href="#produtos-digitais" className="hover:text-white transition-colors">Produtos Digitais</a>
            <a href="#contato" className="hover:text-white transition-colors">Contato</a>
          </nav>

          {/* Top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-md transition-colors text-xs"
            aria-label="Voltar ao topo"
          >
            <span>Topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal notice */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>
            Todos os orçamentos comerciais, contratos e execuções são formalizados e realizados pela VIDRONOX.
          </p>
          <p>
            © {new Date().getFullYear()} William Medinas · Consultor VIDRONOX.
          </p>
        </div>
      </div>
    </footer>
  );
};
