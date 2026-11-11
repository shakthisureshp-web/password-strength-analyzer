/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Analyzer } from './components/Analyzer';
import { Generator } from './components/Generator';
import { VulnerabilityGuide } from './components/VulnerabilityGuide';
import { SecurityGuide } from './components/SecurityGuide';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [transferPassword, setTransferPassword] = useState<string>('');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendToAnalyzer = (password: string) => {
    setTransferPassword(password);
    scrollToSection('analyzer');
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 cyber-grid flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Cybersecurity Top Navigation Bar */}
      <Navbar onScrollTo={scrollToSection} activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero & Introduction */}
        <Hero
          onScrollToAnalyzer={() => scrollToSection('analyzer')}
          onScrollToGenerator={() => scrollToSection('generator')}
        />

        {/* Main Password Strength Analyzer Component */}
        <Analyzer
          onScrollToGenerator={() => scrollToSection('generator')}
          externalPassword={transferPassword}
        />

        {/* Strong Password Generator Section */}
        <Generator onSendToAnalyzer={handleSendToAnalyzer} />

        {/* Threat Modeling & Attack Vectors Section */}
        <VulnerabilityGuide />

        {/* Educational Cybersecurity Guide */}
        <SecurityGuide />
      </main>

      {/* Cyber Security Project Footer */}
      <Footer />
    </div>
  );
}
