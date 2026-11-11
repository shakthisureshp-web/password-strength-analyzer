import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Key, 
  Lock, 
  Cpu, 
  FileWarning, 
  CheckCircle, 
  HelpCircle,
  Smartphone,
  EyeOff,
  Database
} from 'lucide-react';

export const SecurityGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'why' | 'strength' | 'mistakes' | 'practices'>('why');

  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          Knowledge Base
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Cyber Security &amp; Password Defense Guide
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Understand how modern threat actors exploit weak credentials and master the defensive principles that keep your accounts resilient.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveTab('why')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'why'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Why Password Security Matters
        </button>
        <button
          onClick={() => setActiveTab('strength')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'strength'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          What Makes a Password Strong
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'mistakes'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Common Password Mistakes
        </button>
        <button
          onClick={() => setActiveTab('practices')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'practices'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Cybersecurity Best Practices
        </button>
      </div>

      {/* Tab 1: Why Password Security Matters */}
      {activeTab === 'why' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#081229] border border-cyan-950/80 hover:border-cyan-800/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Credential Stuffing</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When one website suffers a data breach, hackers extract leaked usernames and passwords, then automate bot attacks against thousands of banking, email, and shopping services. If you reuse passwords, one breach compromises everything.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#081229] border border-cyan-950/80 hover:border-cyan-800/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Modern GPU Brute-Force</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Modern consumer GPUs and specialized ASIC clusters can test over 100 billion password hashes every single second against offline hashes (NTLM, MD5, SHA-256). Short passwords of 8 characters can be systematically cracked within seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#081229] border border-cyan-950/80 hover:border-cyan-800/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">First Line of Defense</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Authentication is the gateway to your digital identity, medical records, financial portfolios, and communication. A robust password combined with multi-factor authentication (MFA) neutralizes over 99% of bulk automated cyberattacks.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: What Makes a Password Strong */}
      {activeTab === 'strength' && (
        <div className="rounded-2xl bg-[#081229] border border-cyan-950/80 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Length vs. Complexity: The Math of Entropy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                In cybersecurity mathematics, combinatorial search space is calculated as <code className="text-cyan-400 font-mono">N^L</code>, where <strong className="text-white">N</strong> is the pool size of unique characters and <strong className="text-white">L</strong> is length.
              </p>
              <div className="p-4 rounded-xl bg-[#050b18] border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">8 Chars (Lowercase only):</span>
                  <span className="text-red-400">26^8 ≈ 208 Billion combinations (Instant crack)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">8 Chars (All sets):</span>
                  <span className="text-yellow-400">95^8 ≈ 6.6 Quadrillion (Few hours on GPU)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">16 Chars (All sets):</span>
                  <span className="text-emerald-400">95^16 ≈ 4.4 x 10^31 (Billions of centuries)</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Notice how increasing length provides exponential expansion compared to merely substituting a letter with a symbol.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Core Pillars of Strong Passwords</h3>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Recommended Length: 12-16+ Characters</div>
                  <div className="text-xs text-slate-400 mt-0.5">Length is the single most critical factor in raising computational cost for attackers.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">High Character Diversity</div>
                  <div className="text-xs text-slate-400 mt-0.5">Blend lowercase, uppercase, numbers, and symbols across different positions.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">The XKCD Passphrase Strategy</div>
                  <div className="text-xs text-slate-400 mt-0.5">Four or five randomly chosen unrelated words (e.g. &quot;Cobalt-Prism-Vortex-Ember-42!&quot;) are easy for humans to recall yet mathematically impossible to brute-force.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Common Password Mistakes */}
      {activeTab === 'mistakes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#081229] border border-red-950/60">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
              <FileWarning className="w-4 h-4 shrink-0" />
              <span>Personal Identifiable Info (PII)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Using birth years, child/pet names, spouses, hometowns, or favorite sports teams. Threat actors routinely scrape this information from public social media profiles during reconnaissance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#081229] border border-red-950/60">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
              <FileWarning className="w-4 h-4 shrink-0" />
              <span>Predictable L33t Substitutions</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Replacing &quot;a&quot; with &quot;@&quot;, &quot;o&quot; with &quot;0&quot;, or &quot;e&quot; with &quot;3&quot; (like <code className="text-cyan-300">P@ssw0rd1!</code>). Attack tools like Hashcat and John the Ripper have rule engines that specifically permute these patterns automatically.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#081229] border border-red-950/60">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
              <FileWarning className="w-4 h-4 shrink-0" />
              <span>Password Re-use Across Sites</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Using the same password for personal email, banking, forums, and shopping. An exploit on an insecure local shopping site grants attackers access to your primary email and identity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#081229] border border-red-950/60">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
              <FileWarning className="w-4 h-4 shrink-0" />
              <span>Keyboard Walks &amp; Sequential Runs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sliding across the keyboard (<code className="text-cyan-300">qwertyuiop</code>, <code className="text-cyan-300">12345678</code>, <code className="text-cyan-300">asdfghjk</code>). These are checked first by brute-force dictionaries before testing random character space.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#081229] border border-red-950/60">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
              <FileWarning className="w-4 h-4 shrink-0" />
              <span>Incremental Password Changes</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Changing <code className="text-cyan-300">Winter2023!</code> to <code className="text-cyan-300">Spring2024!</code>. Password expiration policies often encourage this predictable habit, which attackers easily guess.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#081229] border border-red-950/60">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
              <FileWarning className="w-4 h-4 shrink-0" />
              <span>Storing in Plaintext or Browsers</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Writing passwords in unencrypted notes, spreadsheets, or sticky notes. Infostealer malware specifically targets browser profile directories to extract unencrypted saved credentials.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Cybersecurity Best Practices */}
      {activeTab === 'practices' && (
        <div className="rounded-2xl bg-[#081229] border border-cyan-950/80 p-6 sm:p-8">
          <h3 className="text-base sm:text-lg font-bold text-white mb-6">
            Cyber Security Best Practices Checklist
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#050b18] border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 font-bold text-xs">
                01
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Use a Dedicated Password Manager</div>
                <div className="text-xs text-slate-400 mt-1">Tools like Bitwarden, 1Password, or KeePass generate and store 20+ character random passwords for every account. You only need to memorize one strong master passphrase.</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#050b18] border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 font-bold text-xs">
                02
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Enable Multi-Factor Authentication (MFA / 2FA)</div>
                <div className="text-xs text-slate-400 mt-1">Always enable hardware keys (YubiKey/FIDO2) or authenticator apps (TOTP). Avoid SMS 2FA where possible due to SIM-swapping vulnerabilities.</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#050b18] border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 font-bold text-xs">
                03
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Transition to Passkeys (WebAuthn)</div>
                <div className="text-xs text-slate-400 mt-1">Adopt FIDO-based cryptographic passkeys when offered by platforms. Passkeys are immune to phishing because credentials never leave your hardware.</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#050b18] border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 font-bold text-xs">
                04
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Monitor Data Breach Notifications</div>
                <div className="text-xs text-slate-400 mt-1">Check services like &quot;Have I Been Pwned&quot; to see if any of your accounts have surfaced in breach databases, and rotate affected credentials immediately.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
