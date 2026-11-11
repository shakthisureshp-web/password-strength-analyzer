/**
 * Cryptographically Secure Password Generator using Web Crypto API.
 */

export interface GeneratorOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean; // e.g. 0, O, o, 1, l, I
}

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()-_=+[]{}|;:,.<>?';

const AMBIGUOUS_CHARS = new Set(['0', 'O', 'o', '1', 'l', 'I', '|', '`', '\'', '"', ';', ':']);

// Diceware-inspired word list for generating memorable passphrases
const PASSPHRASE_WORDS = [
  'anchor', 'beacon', 'cobalt', 'cipher', 'falcon', 'galaxy', 'harbor', 'impact',
  'jungle', 'kinetic', 'lunar', 'matrix', 'nebula', 'orbit', 'prism', 'quantum',
  'radar', 'shield', 'titan', 'vector', 'vertex', 'zenith', 'aurora', 'breeze',
  'canyon', 'delta', 'eclipse', 'frost', 'glacier', 'horizon', 'island', 'jupiter',
  'meteor', 'nomad', 'oasis', 'pulsar', 'safari', 'timber', 'valiant', 'whisper',
  'arctic', 'bronze', 'crystal', 'dynamo', 'ember', 'fathom', 'granite', 'helix',
  'iron', 'karma', 'legend', 'mystic', 'nexus', 'obsidian', 'phoenix', 'quasar',
  'radiant', 'shadow', 'tundra', 'vortex', 'wildcat', 'zephyr', 'acorn', 'blaze'
];

/**
 * Gets a cryptographically secure random integer in range [0, max - 1].
 */
function getSecureRandomInt(max: number): number {
  if (max <= 0) return 0;
  const array = new Uint32Array(1);
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % max);

  let randomVal: number;
  do {
    window.crypto.getRandomValues(array);
    randomVal = array[0];
  } while (randomVal >= limit);

  return randomVal % max;
}

/**
 * Shuffles an array in-place using Fisher-Yates with Web Crypto API.
 */
function secureShuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function generateStrongPassword(options: GeneratorOptions): string {
  let upper = UPPERCASE_CHARS;
  let lower = LOWERCASE_CHARS;
  let numbers = NUMBER_CHARS;
  let symbols = SYMBOL_CHARS;

  if (options.excludeAmbiguous) {
    upper = upper.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)).join('');
    lower = lower.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)).join('');
    numbers = numbers.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)).join('');
    symbols = symbols.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)).join('');
  }

  const pools: string[] = [];
  if (options.includeUppercase && upper.length > 0) pools.push(upper);
  if (options.includeLowercase && lower.length > 0) pools.push(lower);
  if (options.includeNumbers && numbers.length > 0) pools.push(numbers);
  if (options.includeSymbols && symbols.length > 0) pools.push(symbols);

  // Fallback if all options are deselected
  if (pools.length === 0) {
    pools.push(lower);
  }

  const combinedPool = pools.join('');
  const passwordChars: string[] = [];

  // Guarantee at least one character from each selected character set
  for (const pool of pools) {
    const randomIdx = getSecureRandomInt(pool.length);
    passwordChars.push(pool[randomIdx]);
  }

  // Fill the remainder of the target length
  while (passwordChars.length < options.length) {
    const randomIdx = getSecureRandomInt(combinedPool.length);
    passwordChars.push(combinedPool[randomIdx]);
  }

  // Cryptographically shuffle to prevent predictable initial slot positioning
  const shuffled = secureShuffle(passwordChars);
  return shuffled.join('');
}

/**
 * Generates a memorable multi-word passphrase with high entropy.
 */
export function generateSecurePassphrase(wordCount: number = 4, addNumber: boolean = true, addSymbol: boolean = true): string {
  const chosenWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const idx = getSecureRandomInt(PASSPHRASE_WORDS.length);
    let word = PASSPHRASE_WORDS[idx];
    // Capitalize first letter of each word
    word = word.charAt(0).toUpperCase() + word.slice(1);
    chosenWords.push(word);
  }

  let passphrase = chosenWords.join('-');

  if (addNumber) {
    const num = getSecureRandomInt(90) + 10; // 2-digit number 10-99
    passphrase += `-${num}`;
  }

  if (addSymbol) {
    const symbols = '!#$%=+?@';
    const sym = symbols[getSecureRandomInt(symbols.length)];
    passphrase += sym;
  }

  return passphrase;
}
