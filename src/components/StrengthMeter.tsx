import React from 'react';
import { PasswordAnalysisResult } from '../utils/analyzer';
import { ShieldCheck, ShieldAlert, Clock, Binary, Info, Check, X, AlertTriangle } from 'lucide-react';

interface StrengthMeterProps {
  result: PasswordAnalysisResult;
  hasAnalyzed: boolean;
}

export const StrengthMeter: React.FC<StrengthMeterProps> = ({ result, hasAnalyzed }) => {
  if (!hasAnalyzed) {
    return (
      <div className="rounded-2xl bg-[#09152e]/50 border border-slate-800/80 p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-200">Awaiting Password Input</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Enter a password above and click &quot;Analyze Password&quot; to inspect combinatorial entropy, common breach matches, and vulnerability vectors.
        </p>
      </div>
    );
  }

  // Level configuration
  const levelConfig = {
    'Very Weak': {
      barColor: 'bg-red-500',
      badgeColor: 'text-red-400 bg-red-950/50 border-red-500/40',
      borderColor: 'border-red-500/30',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.2)]',
      progressWidth: Math.max(12, result.score),
      description: 'Extremely vulnerable to automated dictionary and fast brute-force attacks. Immediate change required.',
    },
    'Weak': {
      barColor: 'bg-orange-500',
      badgeColor: 'text-orange-400 bg-orange-950/50 border-orange-500/40',
      borderColor: 'border-orange-500/30',
      glow: 'shadow-[0_0_25px_rgba(249,115,22,0.2)]',
      progressWidth: Math.max(25, result.score),
      description: 'Lacks necessary length or character entropy. Can be cracked within hours or days by modern GPU rigs.',
    },
    'Moderate': {
      barColor: 'bg-yellow-400',
      badgeColor: 'text-yellow-300 bg-yellow-950/50 border-yellow-500/40',
      borderColor: 'border-yellow-500/30',
      glow: 'shadow-[0_0_25px_rgba(234,179,8,0.2)]',
      progressWidth: Math.max(50, result.score),
      description: 'Good foundation, but still has minor vulnerabilities or predictable patterns that could be exploited.',
    },
    'Strong': {
      barColor: 'bg-emerald-400',
      badgeColor: 'text-emerald-400 bg-emerald-950/50 border-emerald-500/40',
      borderColor: 'border-emerald-500/30',
      glow: 'shadow-[0_0_25px_rgba(52,211,153,0.2)]',
      progressWidth: result.score,
      description: 'Exceptional defense depth. Resilient against dictionary, rainbow table, and brute-force GPU clusters.',
    },
  }[result.level];

  return (
    <div className={`rounded-2xl bg-[#09152e]/80 border ${levelConfig.borderColor} ${levelConfig.glow} p-6 sm:p-8 transition-all duration-300`}>
      {/* Header with Score and Level */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Security Evaluation</div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {result.level}
            </span>
            <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md border ${levelConfig.badgeColor}`}>
              Tier {result.level === 'Strong' ? 'IV' : result.level === 'Moderate' ? 'III' : result.level === 'Weak' ? 'II' : 'I'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {levelConfig.description}
          </p>
        </div>

        {/* Big Numerical Score */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 bg-[#060c1d] sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-800">
          <span className="text-xs font-mono text-slate-400">Strength Score</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-white">
              {result.score}
            </span>
            <span className="text-sm font-mono text-slate-500">/ 100</span>
          </div>
        </div>
      </div>

      {/* Visual Progress Bar with 4 Color Level Thresholds */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>0 (Very Weak)</span>
          <span>40 (Weak)</span>
          <span>60 (Moderate)</span>
          <span>80+ (Strong)</span>
        </div>

        {/* Multi-segment styled bar */}
        <div className="relative h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full ${levelConfig.barColor} transition-all duration-500 ease-out`}
            style={{ width: `${Math.min(100, Math.max(4, result.score))}%` }}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-4 gap-2 mt-2 text-[11px] font-mono text-center">
          <div className={`py-1 rounded ${result.level === 'Very Weak' ? 'text-red-400 font-bold bg-red-950/40' : 'text-slate-500'}`}>
            Very Weak
          </div>
          <div className={`py-1 rounded ${result.level === 'Weak' ? 'text-orange-400 font-bold bg-orange-950/40' : 'text-slate-500'}`}>
            Weak
          </div>
          <div className={`py-1 rounded ${result.level === 'Moderate' ? 'text-yellow-400 font-bold bg-yellow-950/40' : 'text-slate-500'}`}>
            Moderate
          </div>
          <div className={`py-1 rounded ${result.level === 'Strong' ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-slate-500'}`}>
            Strong
          </div>
        </div>
      </div>

      {/* Cryptographic Metrics Strip (Entropy & Crack Time) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-slate-800">
        <div className="p-3.5 rounded-xl bg-[#060c1d] border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Offline GPU Attack Time</span>
          </div>
          <div className="mt-1 text-base font-bold font-mono text-white tabular-nums truncate">
            {result.crackTimeOffline}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            100B hashes/sec (High-end GPU cluster)
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#060c1d] border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Online Throttled Attack</span>
          </div>
          <div className="mt-1 text-base font-bold font-mono text-white tabular-nums truncate">
            {result.crackTimeOnline}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            ~10 attempts/sec (Rate-limited server)
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#060c1d] border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Binary className="w-3.5 h-3.5 text-purple-400" />
            <span>Information Entropy</span>
          </div>
          <div className="mt-1 text-base font-bold font-mono text-white tabular-nums">
            ~{result.entropyBits} bits
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Pool: {result.charPoolSize} chars | Length: {result.length}
          </div>
        </div>
      </div>

      {/* Why Did This Password Receive This Score? (Explain Score) */}
      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
          <Info className="w-4 h-4" />
          <span>Score Breakdown & Evaluation Factors</span>
        </div>

        <div className="space-y-2">
          {result.scoreFactors.map((factor, index) => (
            <div
              key={index}
              className={`flex items-start justify-between gap-3 p-3 rounded-lg border text-xs ${
                factor.impact === 'positive'
                  ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-200'
                  : 'bg-red-950/20 border-red-900/40 text-slate-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {factor.impact === 'positive' ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-white">{factor.title}</div>
                  <div className="text-slate-400 mt-0.5">{factor.description}</div>
                </div>
              </div>
              <span
                className={`font-mono font-bold shrink-0 tabular-nums ${
                  factor.impact === 'positive' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {factor.points > 0 ? `+${factor.points}` : factor.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
