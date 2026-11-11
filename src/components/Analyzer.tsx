import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Eraser, AlertCircle, Play, Sparkles, Check, Copy } from 'lucide-react';
import { analyzePassword, PasswordAnalysisResult } from '../utils/analyzer';
import { StrengthMeter } from './StrengthMeter';
import { Suggestions } from './Suggestions';

interface AnalyzerProps {
  onScrollToGenerator: () => void;
  externalPassword?: string;
}

export const Analyzer: React.FC<AnalyzerProps> = ({ onScrollToGenerator, externalPassword }) => {
  const [password, setPassword] = useState<string>(externalPassword || '');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(Boolean(externalPassword));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PasswordAnalysisResult>(() =>
    analyzePassword(externalPassword || '')
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Sync if parent updates external password
  React.useEffect(() => {
    if (externalPassword !== undefined && externalPassword !== '') {
      setPassword(externalPassword);
      setAnalysisResult(analyzePassword(externalPassword));
      setHasAnalyzed(true);
      setErrorMessage(null);
    }
  }, [externalPassword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    setErrorMessage(null);

    // If user has already analyzed before, update continuously in real-time
    if (hasAnalyzed) {
      setAnalysisResult(analyzePassword(val));
    }
  };

  const handleAnalyze = () => {
    const trimmed = password.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a password before analyzing.');
      return;
    }

    if (password.includes(' ')) {
      // Not necessarily invalid, but warn
      // Proceed with analysis nonetheless
    }

    setErrorMessage(null);
    setHasAnalyzed(true);
    setAnalysisResult(analyzePassword(password));
  };

  const handleClear = () => {
    setPassword('');
    setHasAnalyzed(false);
    setErrorMessage(null);
    setAnalysisResult(analyzePassword(''));
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadPreset = (preset: string) => {
    setPassword(preset);
    setErrorMessage(null);
    setHasAnalyzed(true);
    setAnalysisResult(analyzePassword(preset));
  };

  return (
    <section id="analyzer" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          Diagnostic Tool
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Password Vulnerability & Strength Analyzer
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Enter any password below to test its resilience against brute-force attacks, leaked dictionaries, and structural weaknesses.
        </p>
      </div>

      {/* Main Analyzer Input Card */}
      <div className="rounded-2xl bg-[#081229] border border-cyan-950/80 shadow-2xl p-6 sm:p-8 mb-8">
        <label htmlFor="password-input" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
          Enter Password To Evaluate
        </label>

        {/* Input Field with Show/Hide, Clear and Copy */}
        <div className="relative flex items-center">
          <input
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAnalyze();
            }}
            placeholder="Type or paste a password (e.g. MySecur3P@ssw0rd!)..."
            className="w-full pl-4 pr-32 py-4 text-base sm:text-lg font-mono text-white bg-[#050b18] border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 rounded-xl outline-none transition-all placeholder:text-slate-600"
            autoComplete="off"
            spellCheck="false"
          />

          <div className="absolute right-3 flex items-center gap-1.5 text-slate-400">
            {password && (
              <button
                type="button"
                onClick={handleCopy}
                title="Copy input"
                className="p-2 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
              className="p-2 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Input Validation & Error Notification */}
        {errorMessage && (
          <div className="mt-3 flex items-center gap-2 text-xs text-red-400 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Character Count & Quick Indicators */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span>
              Length: <strong className="text-white tabular-nums">{password.length}</strong> chars
            </span>
            {password.length > 0 && password.length < 8 && (
              <span className="text-red-400">Minimum 8 characters needed</span>
            )}
            {password.length >= 8 && password.length < 12 && (
              <span className="text-yellow-400">Meets minimum; 12+ recommended</span>
            )}
            {password.length >= 12 && (
              <span className="text-emerald-400">Optimal length threshold met</span>
            )}
          </div>

          <div className="text-[11px] text-slate-500">
            Private & Client-Side Only
          </div>
        </div>

        {/* Control Buttons (Analyze & Clear) */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAnalyze}
            className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Analyze Password</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!password}
            className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Eraser className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>

        {/* Preset Sample Tests for Evaluator / Testing */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Try Quick Test Samples:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadPreset('password123')}
              className="px-2.5 py-1 text-xs font-mono bg-red-950/30 text-red-300 border border-red-900/50 hover:bg-red-900/40 rounded-lg transition-colors cursor-pointer"
            >
              Very Weak: &quot;password123&quot;
            </button>
            <button
              onClick={() => loadPreset('football2024')}
              className="px-2.5 py-1 text-xs font-mono bg-orange-950/30 text-orange-300 border border-orange-900/50 hover:bg-orange-900/40 rounded-lg transition-colors cursor-pointer"
            >
              Weak: &quot;football2024&quot;
            </button>
            <button
              onClick={() => loadPreset('London#Summer99')}
              className="px-2.5 py-1 text-xs font-mono bg-yellow-950/30 text-yellow-300 border border-yellow-900/50 hover:bg-yellow-900/40 rounded-lg transition-colors cursor-pointer"
            >
              Moderate: &quot;London#Summer99&quot;
            </button>
            <button
              onClick={() => loadPreset('kX9#mQ4$vL2@zW8!')}
              className="px-2.5 py-1 text-xs font-mono bg-emerald-950/30 text-emerald-300 border border-emerald-900/50 hover:bg-emerald-900/40 rounded-lg transition-colors cursor-pointer"
            >
              Strong: &quot;kX9#mQ4$vL2@zW8!&quot;
            </button>
          </div>
        </div>
      </div>

      {/* Strength Indicator & Breakdown */}
      <div className="space-y-8">
        <StrengthMeter result={analysisResult} hasAnalyzed={hasAnalyzed} />
        {hasAnalyzed && (
          <Suggestions result={analysisResult} onOpenGenerator={onScrollToGenerator} />
        )}
      </div>
    </section>
  );
};
