import React from 'react';
import { Shield, Lock, Terminal, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040813] border-t border-cyan-950/60 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Project Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white tracking-wide text-sm">
              Password Strength Analyzer
            </div>
            <div className="text-slate-400 text-[11px]">
              Cyber Security Internship Project &bull; Defensive Identity Engineering
            </div>
          </div>
        </div>

        {/* Security & Privacy Statement */}
        <div className="text-center md:text-right max-w-md">
          <div className="text-slate-300 font-semibold mb-1">
            Privacy &amp; Security Assurance
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            100% in-browser evaluation. Passwords are never sent to external servers, never cached in local storage, and never logged. Random generation uses the browser Web Crypto API.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Password Strength Analyzer. Built for cyber security education and awareness.
        </div>
        <div className="flex items-center gap-4">
          <span>NIST SP 800-63B Aligned</span>
          <span>&bull;</span>
          <span>Web Crypto PRNG</span>
          <span>&bull;</span>
          <span>Zero Server Footprint</span>
        </div>
      </div>
    </footer>
  );
};
