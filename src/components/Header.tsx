import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Envie seu Projeto', href: '#projeto' },
    { label: 'Produtos Digitais', href: '#produtos-digitais' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#15191D]/95 backdrop-blur-md py-3.5 border-b border-white/10 shadow-sm'
            : 'bg-[#15191D] py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single Brand Wordmark */}
            <a
              href="#inicio"
              className="group flex flex-col whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244C5A]"
            >
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                  WILLIAM MEDINAS
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#3ea4be] bg-[#244C5A]/30 px-2 py-0.5 rounded border border-[#244C5A]/50">
                  VIDRONOX
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Consultor VIDRONOX
              </span>
            </a>

            {/* Zone 2: Exactly the 6 required single-line text links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors py-1 hover:underline underline-offset-4 decoration-[#3ea4be] whitespace-nowrap shrink-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onNavigateToForm}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-md transition-all shadow-md shadow-blue-600/25 whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                Solicitar orçamento
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md transition-colors"
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-xs bg-[#15191D] border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-white/10 pb-2">
                Navegação
              </p>
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToForm();
                }}
                className="w-full py-3 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-md transition-colors text-center shadow-md shadow-blue-600/30"
              >
                Solicitar orçamento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
