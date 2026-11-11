import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, Check, RefreshCw, Sparkles, Sliders, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { generateStrongPassword, generateSecurePassphrase, GeneratorOptions } from '../utils/generator';

interface GeneratorProps {
  onSendToAnalyzer: (pw: string) => void;
}

export const Generator: React.FC<GeneratorProps> = ({ onSendToAnalyzer }) => {
  const [mode, setMode] = useState<'password' | 'passphrase'>('password');
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);

  // Passphrase options
  const [wordCount, setWordCount] = useState<number>(4);
  const [addNumberToPassphrase, setAddNumberToPassphrase] = useState<boolean>(true);
  const [addSymbolToPassphrase, setAddSymbolToPassphrase] = useState<boolean>(true);

  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    if (mode === 'password') {
      const options: GeneratorOptions = {
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        excludeAmbiguous,
      };
      const pw = generateStrongPassword(options);
      setGeneratedPassword(pw);
    } else {
      const pass = generateSecurePassphrase(wordCount, addNumberToPassphrase, addSymbolToPassphrase);
      setGeneratedPassword(pass);
    }
    setCopied(false);
  };

  // Initial generation
  useEffect(() => {
    handleGenerate();
  }, [mode, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous, wordCount, addNumberToPassphrase, addSymbolToPassphrase]);

  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestInAnalyzer = () => {
    if (!generatedPassword) return;
    onSendToAnalyzer(generatedPassword);
  };

  return (
    <section id="generator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          Hardware Entropy
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Strong Password Generator
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Craft uncrackable passwords using the JavaScript Web Crypto API (<code className="text-cyan-400">crypto.getRandomValues</code>) with uniform distribution and zero server reliance.
        </p>
      </div>

      <div className="rounded-2xl bg-[#081229] border border-cyan-950/80 shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl max-w-md mx-auto mb-8 border border-slate-800">
          <button
            type="button"
            onClick={() => setMode('password')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              mode === 'password'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cryptographic Key (Alphanumeric)
          </button>
          <button
            type="button"
            onClick={() => setMode('passphrase')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              mode === 'passphrase'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Memorable Passphrase (Diceware)
          </button>
        </div>

        {/* Display Box */}
        <div className="relative rounded-xl bg-[#040814] border border-cyan-900/60 p-4 sm:p-6 mb-6">
          <div className="text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Generated Secret</span>
            <span className="text-cyan-400 font-bold">{generatedPassword.length} characters</span>
          </div>

          <div className="text-lg sm:text-2xl font-mono text-cyan-300 font-bold break-all select-all py-2 tracking-wider">
            {generatedPassword || 'Generating...'}
          </div>

          {/* Action Row inside Display */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Regenerate</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Password'}</span>
              </button>

              <button
                type="button"
                onClick={handleTestInAnalyzer}
                className="px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/50 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Test in Analyzer</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Generator Controls */}
        {mode === 'password' ? (
          <div className="space-y-6 pt-2">
            {/* Length Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="length-slider" className="text-xs font-mono uppercase text-slate-300">
                  Password Length: <span className="text-cyan-400 font-bold tabular-nums text-sm">{length}</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[12, 16, 20, 24, 32].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setLength(preset)}
                      className={`px-2 py-0.5 text-xs font-mono rounded cursor-pointer transition-colors ${
                        length === preset
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <input
                id="length-slider"
                type="range"
                min={8}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>8 (Minimum)</span>
                <span>16 (Recommended)</span>
                <span>64 (Maximum)</span>
              </div>
            </div>

            {/* Character Set Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-400 bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-200">
                  Uppercase Letters <span className="text-slate-400 font-mono">(A-Z)</span>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-400 bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-200">
                  Lowercase Letters <span className="text-slate-400 font-mono">(a-z)</span>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-400 bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-200">
                  Numbers <span className="text-slate-400 font-mono">(0-9)</span>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-400 bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-200">
                  Special Characters <span className="text-slate-400 font-mono">(!@#$%)</span>
                </span>
              </label>

              <label className="sm:col-span-2 flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={excludeAmbiguous}
                  onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-400 bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-200">
                  Exclude Ambiguous Characters <span className="text-slate-400 font-mono">(l, 1, I, O, 0, |, `)</span>
                </span>
              </label>
            </div>
          </div>
        ) : (
          /* Passphrase Options */
          <div className="space-y-6 pt-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase text-slate-300">
                  Number of Words: <span className="text-cyan-400 font-bold tabular-nums text-sm">{wordCount}</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[3, 4, 5, 6].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setWordCount(count)}
                      className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                        wordCount === count
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {count} Words
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="range"
                min={3}
                max={7}
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={addNumberToPassphrase}
                  onChange={(e) => setAddNumberToPassphrase(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-400 bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-200">
                  Append Random 2-Digit Number
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={addSymbolToPassphrase}
                  onChange={(e) => setAddSymbolToPassphrase(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-400 bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-200">
                  Append Special Character Symbol
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Generate Primary Button */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex justify-center">
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <KeyRound className="w-4 h-4 text-slate-950" />
            <span>Generate Strong Password</span>
          </button>
        </div>
      </div>
    </section>
  );
};
