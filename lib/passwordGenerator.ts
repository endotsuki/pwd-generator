// Leet speak substitutions
const LEET_MAP: Record<string, string> = {
  a: '@',
  o: '0',
  s: '$',
  i: '1',
  e: '3',
  t: '7',
}

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

export interface PasswordOptions {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

// Apply leet-style substitutions to user input
function applyLeetStyle(input: string): string {
  return input
    .toLowerCase()
    .split('')
    .map((char) => LEET_MAP[char] || char)
    .join('')
}

// Generate random string from character set
function generateRandomString(charset: string, length: number): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

// Main password generation function
export function generatePassword(
  userInput: string,
  length: number,
  options: PasswordOptions
): string {
  let password = ''

  if (userInput.trim()) {
    // User input provided - apply leet-style transformation
    password = applyLeetStyle(userInput)

    // Build character set based on options
    let charset = ''
    if (options.uppercase) charset += UPPERCASE
    if (options.lowercase) charset += LOWERCASE
    if (options.numbers) charset += NUMBERS
    if (options.symbols) charset += SYMBOLS

    // If no options selected, use lowercase as default
    if (charset === '') charset = LOWERCASE

    // Pad or truncate to desired length
    if (password.length < length) {
      const needed = length - password.length
      password += generateRandomString(charset, needed)
    } else if (password.length > length) {
      password = password.substring(0, length)
    }

    // Shuffle the password to mix leet substitutions with added characters
    password = shuffleString(password)
  } else {
    // No user input - generate fully random password
    let charset = ''
    if (options.uppercase) charset += UPPERCASE
    if (options.lowercase) charset += LOWERCASE
    if (options.numbers) charset += NUMBERS
    if (options.symbols) charset += SYMBOLS

    // If no options selected, use all character sets
    if (charset === '') charset = UPPERCASE + LOWERCASE + NUMBERS + SYMBOLS

    password = generateRandomString(charset, length)
  }

  return password
}

// Fisher-Yates shuffle algorithm
function shuffleString(str: string): string {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

// Calculate password strength
export function calculateStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (!password) return 'weak'

  let strength = 0

  // Length check
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (password.length >= 16) strength++

  // Character variety check
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++

  // No obvious patterns
  if (!/(.)\1{2,}/.test(password)) strength++

  if (strength <= 3) return 'weak'
  if (strength <= 6) return 'medium'
  return 'strong'
}
