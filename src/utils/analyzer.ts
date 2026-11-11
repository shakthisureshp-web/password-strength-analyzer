import { TOP_COMMON_PASSWORDS, KEYBOARD_PATTERNS, normalizeLeetSpeak } from './commonPasswords';

export type StrengthLevel = 'Very Weak' | 'Weak' | 'Moderate' | 'Strong';

export interface CriteriaCheck {
  id: string;
  label: string;
  description: string;
  passed: boolean;
  scoreBonus: number;
  category: 'length' | 'character' | 'pattern';
}

export interface ScoreFactor {
  title: string;
  impact: 'positive' | 'negative';
  description: string;
  points: number;
}

export interface PasswordAnalysisResult {
  password: string;
  length: number;
  score: number; // 0 to 100
  level: StrengthLevel;
  levelColor: string; // Tailwind color classes
  levelBgColor: string;
  levelBorderColor: string;
  entropyBits: number;
  crackTimeOffline: string;
  crackTimeOnline: string;
  criteria: CriteriaCheck[];
  scoreFactors: ScoreFactor[];
  suggestions: string[];
  isCommonPassword: boolean;
  hasRepeatedChars: boolean;
  hasSequentialPattern: boolean;
  charPoolSize: number;
}

/**
 * Calculates estimated brute force crack times based on entropy and guess rates.
 */
function calculateCrackTimes(combinations: number): { offline: string; online: string } {
  if (combinations <= 1) {
    return { offline: 'Instant (0 seconds)', online: 'Instant (< 1 second)' };
  }

  // Modern offline GPU attack rig (e.g., hashcat with 8x RTX 4090): ~100 billion hashes/sec for fast hashes (MD5/SHA1)
  const offlineRate = 1e11; // 100,000,000,000 guesses per second
  // Online web service with basic rate limiting & CAPTCHA: ~100 attempts / minute = ~1.67 attempts / second
  const onlineRate = 10; // 10 attempts per second

  const offlineSeconds = combinations / (offlineRate * 2); // average 50% search space
  const onlineSeconds = combinations / (onlineRate * 2);

  const formatDuration = (seconds: number): string => {
    if (seconds < 1) return 'Instant (< 1 second)';
    if (seconds < 60) return `${Math.max(1, Math.round(seconds))} seconds`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.round(minutes)} minutes`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.round(hours)} hours`;
    const days = hours / 24;
    if (days < 30) return `${Math.round(days)} days`;
    const months = days / 30.44;
    if (months < 12) return `${Math.round(months)} months`;
    const years = days / 365.25;
    if (years < 1000) return `${Math.round(years)} years`;
    if (years < 1000000) return `${(years / 1000).toFixed(1)}k years`;
    if (years < 1e9) return `${(years / 1e6).toFixed(1)} million years`;
    return 'Billions of centuries';
  };

  return {
    offline: formatDuration(offlineSeconds),
    online: formatDuration(onlineSeconds),
  };
}

/**
 * Checks for repeated characters like 'aaa', '1111', or repeating chunks like 'abcabc'.
 */
function detectRepetitions(pw: string): { hasRepeated: boolean; reason?: string } {
  // 3 or more identical characters in a row (e.g. "aaa", "999")
  if (/(.)\1{2,}/.test(pw)) {
    return { hasRepeated: true, reason: 'Contains 3 or more consecutive identical characters' };
  }

  // Repeating pairs or triplets e.g. "ababab", "121212", "abcabc"
  if (/(\b.{2,4})\1+/i.test(pw) || /(..+)\1{2,}/.test(pw)) {
    return { hasRepeated: true, reason: 'Contains repeating syllable or pattern chunks' };
  }

  return { hasRepeated: false };
}

/**
 * Checks for keyboard sequences or alphabetical/numerical runs like '1234', 'qwerty', 'abcd'.
 */
function detectSequential(pw: string): { hasSequential: boolean; reason?: string } {
  const lower = pw.toLowerCase();

  // Check keyboard walk dictionary
  for (const pattern of KEYBOARD_PATTERNS) {
    if (lower.includes(pattern)) {
      return { hasSequential: true, reason: `Matches common keyboard sequence (${pattern})` };
    }
  }

  // Check ASCII sequential runs of 4+ characters (e.g. 1234, abcd, 9876, dcba)
  for (let i = 0; i < pw.length - 3; i++) {
    const c1 = pw.charCodeAt(i);
    const c2 = pw.charCodeAt(i + 1);
    const c3 = pw.charCodeAt(i + 2);
    const c4 = pw.charCodeAt(i + 3);

    // Forward sequence (e.g., 65, 66, 67, 68)
    if (c2 === c1 + 1 && c3 === c2 + 1 && c4 === c3 + 1) {
      return { hasSequential: true, reason: 'Contains consecutive sequential characters (e.g., 1234 or abcd)' };
    }
    // Backward sequence (e.g., 68, 67, 66, 65)
    if (c2 === c1 - 1 && c3 === c2 - 1 && c4 === c3 - 1) {
      return { hasSequential: true, reason: 'Contains consecutive reverse sequential characters' };
    }
  }

  return { hasSequential: false };
}

export function analyzePassword(password: string): PasswordAnalysisResult {
  const cleanPassword = password || '';
  const length = cleanPassword.length;

  if (length === 0) {
    return {
      password: '',
      length: 0,
      score: 0,
      level: 'Very Weak',
      levelColor: 'text-red-500',
      levelBgColor: 'bg-red-500',
      levelBorderColor: 'border-red-500/40',
      entropyBits: 0,
      crackTimeOffline: '0 seconds',
      crackTimeOnline: '0 seconds',
      criteria: [
        { id: 'min8', label: 'Minimum 8 Characters', description: 'Basic threshold for modern security', passed: false, scoreBonus: 15, category: 'length' },
        { id: 'rec12', label: 'Recommended 12+ Characters', description: 'Significantly increases combinatorial search space', passed: false, scoreBonus: 20, category: 'length' },
        { id: 'upper', label: 'Uppercase Letters (A-Z)', description: 'Adds 26 potential characters to alphabet pool', passed: false, scoreBonus: 10, category: 'character' },
        { id: 'lower', label: 'Lowercase Letters (a-z)', description: 'Adds 26 potential characters to alphabet pool', passed: false, scoreBonus: 10, category: 'character' },
        { id: 'number', label: 'Numbers (0-9)', description: 'Adds 10 numeric characters to pool', passed: false, scoreBonus: 10, category: 'character' },
        { id: 'special', label: 'Special Symbols (!@#$...)', description: 'Adds 32+ symbol characters to pool', passed: false, scoreBonus: 15, category: 'character' },
        { id: 'common', label: 'No Common or Predictable Words', description: 'Protects against dictionary attacks and top breach lists', passed: true, scoreBonus: 10, category: 'pattern' },
        { id: 'repeated', label: 'No Repetitions or Sequential Runs', description: 'Avoids predictable keyboard walks and repeating characters', passed: true, scoreBonus: 10, category: 'pattern' },
      ],
      scoreFactors: [
        { title: 'No characters entered', impact: 'negative', description: 'Please enter a password to evaluate.', points: 0 },
      ],
      suggestions: [
        'Enter at least 12 characters for adequate protection.',
        'Combine uppercase, lowercase, numbers, and special symbols.',
        'Avoid common dictionary words, pet names, or sequential patterns.',
      ],
      isCommonPassword: false,
      hasRepeatedChars: false,
      hasSequentialPattern: false,
      charPoolSize: 0,
    };
  }

  // 1. Character tests
  const hasLower = /[a-z]/.test(cleanPassword);
  const hasUpper = /[A-Z]/.test(cleanPassword);
  const hasNumber = /[0-9]/.test(cleanPassword);
  const hasSpecial = /[^a-zA-Z0-9]/.test(cleanPassword);

  // Pool size calculation
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSpecial) poolSize += 33;

  // 2. Common password & dictionary check
  const lowerPw = cleanPassword.toLowerCase();
  const normalizedPw = normalizeLeetSpeak(cleanPassword);
  const isDirectCommon = TOP_COMMON_PASSWORDS.has(lowerPw) || TOP_COMMON_PASSWORDS.has(cleanPassword);
  const isNormalizedCommon = TOP_COMMON_PASSWORDS.has(normalizedPw);
  const isCommon = isDirectCommon || isNormalizedCommon;

  // 3. Repetition & Sequential pattern checks
  const repCheck = detectRepetitions(cleanPassword);
  const seqCheck = detectSequential(cleanPassword);

  // 4. Scoring calculations (Positive points + negative deductions)
  let rawScore = 0;
  const scoreFactors: ScoreFactor[] = [];

  // Length points
  if (length >= 16) {
    rawScore += 40;
    scoreFactors.push({ title: 'Outstanding Length (16+ chars)', impact: 'positive', description: 'High length provides immense exponential resistance against brute-force attacks.', points: 40 });
  } else if (length >= 12) {
    rawScore += 30;
    scoreFactors.push({ title: 'Recommended Length (12-15 chars)', impact: 'positive', description: 'Meets modern security guidelines recommended by NIST and cybersecurity frameworks.', points: 30 });
  } else if (length >= 8) {
    rawScore += 15;
    scoreFactors.push({ title: 'Minimum Length Met (8-11 chars)', impact: 'positive', description: 'Satisfies standard 8-character baseline, but still vulnerable to high-speed offline GPU cracking.', points: 15 });
  } else {
    rawScore += 5;
    scoreFactors.push({ title: 'Critically Short (<8 chars)', impact: 'negative', description: 'Passwords under 8 characters can often be cracked within seconds by brute force.', points: -25 });
  }

  // Character variety points
  let varietyCount = 0;
  if (hasLower) {
    rawScore += 10;
    varietyCount++;
    scoreFactors.push({ title: 'Lowercase Letters Present', impact: 'positive', description: 'Expands search space with lowercase alphabet [a-z].', points: 10 });
  } else {
    scoreFactors.push({ title: 'Missing Lowercase Letters', impact: 'negative', description: 'Lacks lowercase alphabet characters.', points: -5 });
  }

  if (hasUpper) {
    rawScore += 10;
    varietyCount++;
    scoreFactors.push({ title: 'Uppercase Letters Present', impact: 'positive', description: 'Expands search space with uppercase alphabet [A-Z].', points: 10 });
  } else {
    scoreFactors.push({ title: 'Missing Uppercase Letters', impact: 'negative', description: 'Lacks uppercase alphabet characters.', points: -5 });
  }

  if (hasNumber) {
    rawScore += 10;
    varietyCount++;
    scoreFactors.push({ title: 'Numbers Present', impact: 'positive', description: 'Adds numeric digits [0-9] to combination matrix.', points: 10 });
  } else {
    scoreFactors.push({ title: 'Missing Numbers', impact: 'negative', description: 'No numeric digits included.', points: -5 });
  }

  if (hasSpecial) {
    rawScore += 15;
    varietyCount++;
    scoreFactors.push({ title: 'Special Symbols Present', impact: 'positive', description: 'Dramatically raises entropy with special characters (!@#$%^&*...).', points: 15 });
  } else {
    scoreFactors.push({ title: 'Missing Special Symbols', impact: 'negative', description: 'No punctuation or special characters included.', points: -5 });
  }

  // Variety bonus: all 4 types present
  if (varietyCount === 4) {
    rawScore += 15;
    scoreFactors.push({ title: 'Complete Character Variety Bonus', impact: 'positive', description: 'Password utilizes all 4 character categories simultaneously.', points: 15 });
  }

  // Penalties
  if (isCommon) {
    rawScore -= 50;
    scoreFactors.push({
      title: 'Known Breached / Common Password',
      impact: 'negative',
      description: isNormalizedCommon && !isDirectCommon 
        ? 'Matches a common password through simple l33t substitutions (e.g., P@$$w0rd).' 
        : 'Found in the global top most-common password dictionaries.',
      points: -50
    });
  }

  if (repCheck.hasRepeated) {
    rawScore -= 15;
    scoreFactors.push({
      title: 'Character Repetition Detected',
      impact: 'negative',
      description: repCheck.reason || 'Consecutive repeating characters reduce entropy.',
      points: -15
    });
  }

  if (seqCheck.hasSequential) {
    rawScore -= 15;
    scoreFactors.push({
      title: 'Sequential / Keyboard Walk Pattern',
      impact: 'negative',
      description: seqCheck.reason || 'Predictable sequences make dictionary or rule-based attacks fast.',
      points: -15
    });
  }

  // Single character set penalty (e.g. only numbers or only lowercase letters)
  if (varietyCount === 1) {
    rawScore -= 20;
    scoreFactors.push({
      title: 'Single Character Set Restriction',
      impact: 'negative',
      description: 'Using only one type of character drastically limits total entropy.',
      points: -20
    });
  }

  // Enforce caps:
  // If common password, max score is 15 (Very Weak)
  if (isCommon) {
    rawScore = Math.min(rawScore, 15);
  }
  // If length < 8, max score is 35 (Very Weak)
  if (length < 8) {
    rawScore = Math.min(rawScore, 35);
  }

  // Clamp final score between 5 and 100
  const finalScore = Math.max(5, Math.min(100, Math.round(rawScore)));

  // Determine Level according to requirements:
  // Very Weak – Red
  // Weak – Orange
  // Moderate – Yellow
  // Strong – Green
  let level: StrengthLevel = 'Very Weak';
  let levelColor = 'text-red-500';
  let levelBgColor = 'bg-red-500';
  let levelBorderColor = 'border-red-500/40';

  if (finalScore >= 80) {
    level = 'Strong';
    levelColor = 'text-emerald-400';
    levelBgColor = 'bg-emerald-500';
    levelBorderColor = 'border-emerald-500/40';
  } else if (finalScore >= 60) {
    level = 'Moderate';
    levelColor = 'text-yellow-400';
    levelBgColor = 'bg-yellow-500';
    levelBorderColor = 'border-yellow-500/40';
  } else if (finalScore >= 40) {
    level = 'Weak';
    levelColor = 'text-orange-400';
    levelBgColor = 'bg-orange-500';
    levelBorderColor = 'border-orange-500/40';
  } else {
    level = 'Very Weak';
    levelColor = 'text-red-500';
    levelBgColor = 'bg-red-500';
    levelBorderColor = 'border-red-500/40';
  }

  // Combinations & Entropy
  // combinations = poolSize^length
  const entropyBits = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;
  const totalCombinations = poolSize > 0 ? Math.pow(poolSize, Math.min(length, 30)) : 0;
  const crackTimes = calculateCrackTimes(totalCombinations);

  // Criteria checklist
  const criteria: CriteriaCheck[] = [
    {
      id: 'min8',
      label: 'Minimum 8 Characters',
      description: 'Baseline security threshold',
      passed: length >= 8,
      scoreBonus: 15,
      category: 'length',
    },
    {
      id: 'rec12',
      label: 'Recommended 12+ Characters',
      description: 'High exponential resistance against cracking',
      passed: length >= 12,
      scoreBonus: 20,
      category: 'length',
    },
    {
      id: 'upper',
      label: 'Uppercase Letters (A-Z)',
      description: 'Includes capital letters',
      passed: hasUpper,
      scoreBonus: 10,
      category: 'character',
    },
    {
      id: 'lower',
      label: 'Lowercase Letters (a-z)',
      description: 'Includes lowercase letters',
      passed: hasLower,
      scoreBonus: 10,
      category: 'character',
    },
    {
      id: 'number',
      label: 'Numbers (0-9)',
      description: 'Includes numerical digits',
      passed: hasNumber,
      scoreBonus: 10,
      category: 'character',
    },
    {
      id: 'special',
      label: 'Special Symbols (!@#$...)',
      description: 'Includes punctuation or symbols',
      passed: hasSpecial,
      scoreBonus: 15,
      category: 'character',
    },
    {
      id: 'common',
      label: 'No Common or Predictable Words',
      description: 'Free of top breached dictionary phrases or l33t variants',
      passed: !isCommon,
      scoreBonus: 10,
      category: 'pattern',
    },
    {
      id: 'repeated',
      label: 'No Repetitions or Sequential Runs',
      description: 'Free of keyboard walks like "qwerty", "1234", or "aaa"',
      passed: !repCheck.hasRepeated && !seqCheck.hasSequential,
      scoreBonus: 10,
      category: 'pattern',
    },
  ];

  // Actionable Suggestions Generation
  const suggestions: string[] = [];

  if (length < 8) {
    suggestions.push(`Increase password length: currently ${length} chars. Aim for at least 8 (or 12+ for strong defense).`);
  } else if (length < 12) {
    suggestions.push(`Extend length to 12+ characters to safeguard against modern multi-GPU cracking rigs.`);
  }

  if (!hasUpper) {
    suggestions.push('Add uppercase letters (A-Z) in non-obvious positions (not just at the start).');
  }

  if (!hasLower) {
    suggestions.push('Add lowercase letters (a-z) to diversify character sets.');
  }

  if (!hasNumber) {
    suggestions.push('Include numbers (0-9) throughout the password, avoiding predictable single digits at the end.');
  }

  if (!hasSpecial) {
    suggestions.push('Include special characters (!, @, #, $, %, etc.) to drastically increase character permutations.');
  }

  if (isCommon) {
    suggestions.push('Replace common words and dictionary phrases with unique, high-entropy passphrases.');
  }

  if (repCheck.hasRepeated) {
    suggestions.push('Remove repeated character clusters (e.g. "aaa" or "111") which weaken entropy.');
  }

  if (seqCheck.hasSequential) {
    suggestions.push('Avoid sequential patterns and keyboard walks (e.g. "1234", "qwerty", "abcd").');
  }

  // Universal cybersecurity hygiene suggestions
  suggestions.push('Never reuse this password across multiple online accounts or personal services.');
  if (suggestions.length < 3) {
    suggestions.push('Consider using a dedicated open-source password manager or hardware security key (FIDO2/WebAuthn).');
  }

  return {
    password: cleanPassword,
    length,
    score: finalScore,
    level,
    levelColor,
    levelBgColor,
    levelBorderColor,
    entropyBits,
    crackTimeOffline: crackTimes.offline,
    crackTimeOnline: crackTimes.online,
    criteria,
    scoreFactors,
    suggestions,
    isCommonPassword: isCommon,
    hasRepeatedChars: repCheck.hasRepeated,
    hasSequentialPattern: seqCheck.hasSequential,
    charPoolSize: poolSize,
  };
}
