/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutWilliam } from './components/AboutWilliam';
import { SolutionsSection } from './components/SolutionsSection';
import { ProjectForm } from './components/ProjectForm';
import { DigitalProducts } from './components/DigitalProducts';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Boxes');
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  // Restore persisted custom photo from localStorage
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('william_custom_photo');
      if (savedPhoto) {
        setCustomPhotoUrl(savedPhoto);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setCustomPhotoUrl(result);
      try {
        localStorage.setItem('william_custom_photo', result);
      } catch {
        // Storage quota exceeded
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setCustomPhotoUrl(null);
    try {
      localStorage.removeItem('william_custom_photo');
    } catch {
      // Ignore
    }
  };

  const scrollToForm = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const formElement = document.getElementById('projeto');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F7] text-[#15191D] flex flex-col selection:bg-[#244C5A] selection:text-white">
      {/* Top Bar Header with exactly the 6 required links */}
      <Header onNavigateToForm={() => scrollToForm()} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Section 1: Início (Hero) */}
        <Hero
          onQuoteClick={() => scrollToForm()}
          onSendPhotosClick={() => scrollToForm()}
        />

        {/* Section 2: Sobre */}
        <AboutWilliam
          customPhotoUrl={customPhotoUrl}
          onPhotoUpload={handlePhotoUpload}
          onResetPhoto={handleResetPhoto}
          onQuoteClick={() => scrollToForm()}
        />

        {/* Section 3: Soluções (6 Categorias Principais, Sem Duplicações) */}
        <SolutionsSection
          onSelectService={(service) => scrollToForm(service)}
        />

        {/* Section 4: Envie seu Projeto (Formulário Simples & Funcional) */}
        <ProjectForm selectedServicePreset={selectedService} />

        {/* Section 5: Produtos Digitais ("Em breve") */}
        <DigitalProducts />

        {/* Section 6: Contato */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Flutuante Sempre Acessível */}
      <FloatingWhatsApp />
    </div>
  );
}
