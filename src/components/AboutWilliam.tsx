import React, { useRef } from 'react';
import { Ruler, ShieldCheck, FileCheck, Camera, Upload, RotateCcw } from 'lucide-react';

interface AboutWilliamProps {
  customPhotoUrl: string | null;
  onPhotoUpload: (file: File) => void;
  onResetPhoto: () => void;
  onQuoteClick: () => void;
}

export const AboutWilliam: React.FC<AboutWilliamProps> = ({
  customPhotoUrl,
  onPhotoUpload,
  onResetPhoto,
  onQuoteClick,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

  const portraitSrc =
    customPhotoUrl || '/images/william-consultant-portrait.jpg';

  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#F4F6F7] text-[#15191D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Photo Column with Reduced Compact Size */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm max-w-[290px] w-full">
              <div className="relative rounded-xl overflow-hidden aspect-4/5 max-h-[360px] bg-slate-900">
                <img
                  src={portraitSrc}
                  alt="William Mendinas - Consultor VIDRONOX"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold">William Mendinas</h3>
                  <p className="text-[11px] text-[#3ea4be] font-medium">Consultor VIDRONOX</p>
                </div>
              </div>

              {/* Photo customization toggle */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-0.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 hover:text-[#244C5A] font-medium transition-colors text-[11px]"
                >
                  <Upload className="w-3 h-3" />
                  <span>{customPhotoUrl ? 'Trocar Foto Real' : 'Carregar Foto Real'}</span>
                </button>
                {customPhotoUrl && (
                  <button
                    type="button"
                    onClick={onResetPhoto}
                    className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium text-[11px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restaurar</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Clean Commercial Narrative with Quem Sou Eu in Destaque */}
          <div className="lg:col-span-8 space-y-6">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#244C5A]">
              Quem Sou Eu
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#15191D] text-balance">
              Conhecimento técnico e atenção a cada detalhe.
            </h2>

            {/* Destaque Quem Sou Eu */}
            <div className="p-5 sm:p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-2.5">
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                Sou <strong className="font-bold text-[#15191D]">William Mendinas</strong>, consultor VIDRONOX, com mais de <strong className="font-bold text-[#244C5A]">10 anos de experiência</strong> em vidros, instalações e vendas.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Atuo com soluções personalizadas para projetos residenciais, comerciais e de alto padrão, unindo qualidade, segurança e sofisticação em cada detalhe.
              </p>
            </div>

            {/* 3 Ultra-Clean Minimalist Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <Ruler className="w-4 h-4 text-[#244C5A]" />
                <h3 className="text-xs font-bold text-slate-900">Análise do Vão</h3>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Avaliação precisa de prumo, folgas e viabilidade técnica.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <ShieldCheck className="w-4 h-4 text-[#244C5A]" />
                <h3 className="text-xs font-bold text-slate-900">Segurança ABNT</h3>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Indicação do vidro adequado seguindo normas de segurança.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <FileCheck className="w-4 h-4 text-[#244C5A]" />
                <h3 className="text-xs font-bold text-slate-900">Padrão VIDRONOX</h3>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Orçamentos, contratos e montagem com garantia oficial.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center px-7 py-3 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-md transition-all shadow-md shadow-blue-600/30 hover:scale-[1.02]"
              >
                Solicitar orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
