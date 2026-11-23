/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
         
        />

        {/* Section 2: Sobre */}
        <AboutWilliam onQuoteClick={() => scrollToForm()} />

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
