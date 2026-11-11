import React from 'react';
import { PasswordAnalysisResult } from '../utils/analyzer';
import { Lightbulb, CheckCircle2, AlertCircle, ArrowRight, ShieldAlert, Check } from 'lucide-react';

interface SuggestionsProps {
  result: PasswordAnalysisResult;
  onOpenGenerator: () => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ result, onOpenGenerator }) => {
  return (
    <div className="rounded-2xl bg-[#09152e]/80 border border-slate-800 p-6 sm:p-8">
      {/* Criteria Breakdown Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Security Requirements Checklist
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {result.criteria.filter((c) => c.passed).length} of {result.criteria.length} passed
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {result.criteria.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all ${
                item.passed
                  ? 'bg-emerald-950/20 border-emerald-800/40'
                  : 'bg-slate-900/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${item.passed ? 'text-emerald-300' : 'text-slate-300'}`}>
                  {item.label}
                </span>
                {item.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions List */}
      <div className="pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Actionable Improvement Recommendations</span>
        </div>

        <div className="space-y-2.5">
          {result.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#060c1d] border border-cyan-950/40 hover:border-cyan-800/40 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-[11px] font-mono text-cyan-300 shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {suggestion}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action to Generate */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Need an unbreakable password immediately?</div>
              <div className="text-xs text-slate-400">Generate a cryptographically secure key with 100+ bits of entropy.</div>
            </div>
          </div>

          <button
            onClick={onOpenGenerator}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Launch Generator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
