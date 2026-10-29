import React, { useState, useRef } from 'react';
import {
  Send,
  UploadCloud,
  X,
  Camera,
  CheckCircle,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { ProjectFormData } from '../types';

interface ProjectFormProps {
  selectedServicePreset?: string;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ selectedServicePreset }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    fullName: '',
    whatsapp: '',
    cityNeighborhood: '',
    serviceType: selectedServicePreset || 'Boxes',
    widthCm: '',
    heightCm: '',
    piecesCount: '1',
    description: '',
    photos: [],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (selectedServicePreset) {
      setFormData((prev) => ({ ...prev, serviceType: selectedServicePreset }));
    }
  }, [selectedServicePreset]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setFormData((prev) => ({ ...prev, whatsapp: value }));
    if (formErrors.whatsapp) {
      setFormErrors((prev) => ({ ...prev, whatsapp: '' }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const slots = 5 - formData.photos.length;
    if (slots <= 0) return;

    const added = newFiles.slice(0, slots).map((file) => ({
      name: file.name,
      size: file.size,
      previewUrl: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...added] }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => {
      const copy = [...prev.photos];
      URL.revokeObjectURL(copy[index].previewUrl);
      copy.splice(index, 1);
      return { ...prev, photos: copy };
    });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Informe seu nome';
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 14) {
      errors.whatsapp = 'Informe um WhatsApp com DDD';
    }
    if (!formData.cityNeighborhood.trim()) {
      errors.cityNeighborhood = 'Informe cidade e bairro';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const widthText = formData.widthCm ? `${formData.widthCm} cm` : 'A conferir';
    const heightText = formData.heightCm ? `${formData.heightCm} cm` : 'A conferir';
    const photoCountText =
      formData.photos.length > 0
        ? `${formData.photos.length} foto(s) anexada(s) nesta conversa`
        : 'Nenhuma foto inicial';

    const msg = [
      '👋 *SOLICITAÇÃO DE ORÇAMENTO*',
      `👤 *Cliente:* ${formData.fullName}`,
      `📱 *WhatsApp:* ${formData.whatsapp}`,
      `📍 *Local:* ${formData.cityNeighborhood}`,
      `🪟 *Serviço:* ${formData.serviceType}`,
      `📐 *Largura estimada:* ${widthText}`,
      `📏 *Altura estimada:* ${heightText}`,
      `🔢 *Quantidade:* ${formData.piecesCount || '1'}`,
      formData.description ? `📝 *Observações:* ${formData.description}` : '',
      `📷 *Fotos:* ${photoCountText}`,
      '_Enviado via William Medinas | Consultor VIDRONOX_',
    ]
      .filter(Boolean)
      .join('\n');

    setFormattedMessage(msg);
    setShowModal(true);
  };

  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/5569992824464?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <section id="projeto" className="py-20 md:py-28 bg-[#F4F6F7] text-[#15191D] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#244C5A] mb-2">
            Orçamento Rápido
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#15191D]">
            Envie seu projeto
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Informe medidas aproximadas e envie fotos para avaliação preliminar.
          </p>
        </div>

        {/* Minimalist Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6"
        >
          {/* Row 1: Name & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Nome Completo *
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ex: Carlos Silva"
                className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border rounded-lg focus:outline-none transition-colors ${
                  formErrors.fullName ? 'border-rose-500' : 'border-slate-300 focus:border-[#244C5A]'
                }`}
              />
              {formErrors.fullName && (
                <span className="text-[11px] text-rose-600 mt-1 block">{formErrors.fullName}</span>
              )}
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                WhatsApp com DDD *
              </label>
              <input
                id="whatsapp"
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handlePhoneChange}
                placeholder="(69) 99999-9999"
                className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border rounded-lg focus:outline-none transition-colors ${
                  formErrors.whatsapp ? 'border-rose-500' : 'border-slate-300 focus:border-[#244C5A]'
                }`}
              />
              {formErrors.whatsapp && (
                <span className="text-[11px] text-rose-600 mt-1 block">{formErrors.whatsapp}</span>
              )}
            </div>
          </div>

          {/* Row 2: Location & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cityNeighborhood" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Cidade e Bairro *
              </label>
              <input
                id="cityNeighborhood"
                type="text"
                name="cityNeighborhood"
                value={formData.cityNeighborhood}
                onChange={handleChange}
                placeholder="Ex: Porto Velho - Centro"
                className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border rounded-lg focus:outline-none transition-colors ${
                  formErrors.cityNeighborhood ? 'border-rose-500' : 'border-slate-300 focus:border-[#244C5A]'
                }`}
              />
              {formErrors.cityNeighborhood && (
                <span className="text-[11px] text-rose-600 mt-1 block">{formErrors.cityNeighborhood}</span>
              )}
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Serviço Desejado *
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border border-slate-300 rounded-lg focus:outline-none focus:border-[#244C5A]"
              >
                <option value="Boxes">Boxes</option>
                <option value="Espelhos">Espelhos</option>
                <option value="Portas">Portas</option>
                <option value="Janelas">Janelas</option>
                <option value="Guarda-corpos">Guarda-corpos</option>
                <option value="Fachadas">Fachadas</option>
                <option value="Outro / Projeto Especial">Outro / Projeto Especial</option>
              </select>
            </div>
          </div>

          {/* Row 3: Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="widthCm" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Largura Aprox. (cm)
              </label>
              <input
                id="widthCm"
                type="number"
                name="widthCm"
                value={formData.widthCm}
                onChange={handleChange}
                placeholder="Ex: 120"
                className="w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border border-slate-300 rounded-lg focus:outline-none focus:border-[#244C5A]"
              />
            </div>

            <div>
              <label htmlFor="heightCm" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Altura Aprox. (cm)
              </label>
              <input
                id="heightCm"
                type="number"
                name="heightCm"
                value={formData.heightCm}
                onChange={handleChange}
                placeholder="Ex: 210"
                className="w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border border-slate-300 rounded-lg focus:outline-none focus:border-[#244C5A]"
              />
            </div>

            <div>
              <label htmlFor="piecesCount" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Quantidade
              </label>
              <select
                id="piecesCount"
                name="piecesCount"
                value={formData.piecesCount}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border border-slate-300 rounded-lg focus:outline-none focus:border-[#244C5A]"
              >
                <option value="1">1 peça</option>
                <option value="2">2 peças</option>
                <option value="3">3 peças</option>
                <option value="4+">4 ou mais peças</option>
              </select>
            </div>
          </div>

          {/* Row 4: Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Observações
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              placeholder="Ex: vidro incolor 8mm, perfil preto fosco ou até o teto."
              className="w-full px-3.5 py-2.5 text-sm bg-[#F4F6F7] border border-slate-300 rounded-lg focus:outline-none focus:border-[#244C5A]"
            />
          </div>

          {/* Row 5: Photo Upload (up to 5) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Fotos do Vão (Até 5)
              </label>
              <span className="text-xs font-mono text-slate-500">
                {formData.photos.length}/5 selecionadas
              </span>
            </div>

            {formData.photos.length < 5 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-[#244C5A] bg-[#F4F6F7] rounded-xl p-4 text-center transition-colors"
              >
                <UploadCloud className="w-5 h-5 mx-auto text-slate-400" />
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  Clique para anexar fotos do vão
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
              </div>
            )}

            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                {formData.photos.map((photo, idx) => (
                  <div key={idx} className="relative rounded-lg overflow-hidden aspect-square border border-slate-200 bg-slate-100">
                    <img src={photo.previewUrl} alt="Prévia" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 bg-black/70 hover:bg-rose-600 text-white p-1 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <AlertCircle className="w-4 h-4 text-[#244C5A] shrink-0 mt-0.5" />
            <p>
              As medidas informadas são estimativas e poderão exigir conferência técnica presencial antes da execução.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-sm font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/45 hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Solicitar orçamento</span>
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Orçamento Pronto para Envio
                  </h3>
                  <p className="text-xs text-slate-500">
                    Encaminhe diretamente para o WhatsApp de William Medinas.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-800 max-h-40 overflow-y-auto whitespace-pre-wrap">
                {formattedMessage}
              </div>

              {formData.photos.length > 0 && (
                <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  📷 Você selecionou {formData.photos.length} foto(s). Anexe-as na conversa do WhatsApp para avaliação técnica imediata.
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="flex-1 py-3 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0043A6] rounded-xl transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  Abrir no WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="px-4 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
