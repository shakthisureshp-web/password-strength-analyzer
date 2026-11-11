import React from 'react';
import { ShieldAlert, LockKeyhole, Cpu, Terminal, CheckCircle2, ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollToAnalyzer: () => void;
  onScrollToGenerator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToAnalyzer, onScrollToGenerator }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Shield and Lock Logo Lockup */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#0e2142] via-[#09152b] to-[#050b18] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <div className="relative">
                <ShieldAlert className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <LockKeyhole className="w-5 h-5 text-blue-100 absolute inset-0 m-auto" />
              </div>
            </div>
            {/* Ambient cyber ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-sm -z-10 group-hover:opacity-40 transition-opacity" />
          </div>
        </div>

        {/* Tagline & Website Name */}
        <div className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase font-mono mb-3">
          Protect Your Digital Identity
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto text-balance">
          Password Strength <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Analyzer</span>
        </h1>

        {/* Short introduction about password security */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Weak and reused credentials account for more than 80% of modern cyber intrusions. Evaluate your passwords in real time against brute-force entropy models, leaked dictionary archives, and predictable keyboard patterns—executed 100% locally in your browser.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onScrollToAnalyzer}
            className="px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <span>Analyze Your Password</span>
            <ArrowDown className="w-4 h-4 text-slate-900" />
          </button>
          <button
            onClick={onScrollToGenerator}
            className="px-6 py-3 text-sm font-semibold text-slate-200 bg-[#0c1833]/80 hover:bg-[#122247] border border-cyan-800/40 hover:border-cyan-500/60 rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Generate Secure Password</span>
          </button>
        </div>

        {/* Security Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#09142b]/40 border border-slate-800/50">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">Zero Data Transmission</div>
              <div className="text-xs text-slate-400 mt-0.5">Your passwords never leave your machine; all analysis runs in client-side memory.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#09142b]/40 border border-slate-800/50">
            <Terminal className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">Brute-Force Entropy Model</div>
              <div className="text-xs text-slate-400 mt-0.5">Calculates NIST-grade combinatorial space against modern GPU cracking clusters.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#09142b]/40 border border-slate-800/50">
            <Cpu className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">Web Crypto RNG Engine</div>
              <div className="text-xs text-slate-400 mt-0.5">Uses hardware entropy sources via JavaScript Web Crypto API for unguessable keys.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
