import React from 'react';
import { Shield, Lock, KeyRound, Sparkles } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo, activeSection }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#070d1e]/90 backdrop-blur-md border-b border-cyan-950/40 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <div 
          onClick={() => onScrollTo('hero')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-slate-900 border border-cyan-500/30 group-hover:border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
            <Shield className="w-5 h-5 text-cyan-400" />
            <Lock className="w-2.5 h-2.5 text-blue-200 absolute mb-0.5" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
              Password Strength <span className="text-cyan-400">Analyzer</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono tracking-wide hidden sm:block">
              Cyber Security Defense Suite
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onScrollTo('analyzer')}
            className={`transition-colors hover:text-cyan-400 whitespace-nowrap ${
              activeSection === 'analyzer' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Analyzer
          </button>
          <button
            onClick={() => onScrollTo('generator')}
            className={`transition-colors hover:text-cyan-400 whitespace-nowrap ${
              activeSection === 'generator' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => onScrollTo('vulnerabilities')}
            className={`transition-colors hover:text-cyan-400 whitespace-nowrap ${
              activeSection === 'vulnerabilities' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Vulnerabilities
          </button>
          <button
            onClick={() => onScrollTo('education')}
            className={`transition-colors hover:text-cyan-400 whitespace-nowrap ${
              activeSection === 'education' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Security Guide
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onScrollTo('generator')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-950" />
            <span>Generate Password</span>
          </button>
        </div>
      </div>
    </header>
  );
};
