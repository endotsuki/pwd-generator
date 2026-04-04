'use client'

import { useState } from 'react'
import PasswordInput from '@/components/password-generator/PasswordInput'
import OptionsPanel from '@/components/password-generator/OptionsPanel'
import PasswordDisplay from '@/components/password-generator/PasswordDisplay'
import StrengthMeter from '@/components/password-generator/StrengthMeter'
import { generatePassword, calculateStrength } from '@/lib/passwordGenerator'

export default function Home() {
  const [userInput, setUserInput] = useState('')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGeneratePassword = () => {
    const password = generatePassword(userInput, length, options)
    setGeneratedPassword(password)
    setCopied(false)
  }

  const handleGenerateRandomPassword = () => {
    const password = generatePassword('', length, options)
    setGeneratedPassword(password)
    setCopied(false)
  }

  const handleOptionChange = (key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] }
    setOptions(newOptions)
    setTimeout(() => {
      const password = generatePassword(userInput, length, newOptions)
      setGeneratedPassword(password)
    }, 0)
  }

  const handleCopyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const strength = calculateStrength(generatedPassword)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060910] px-4 py-16 text-zinc-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(16,185,129,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-lg">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Password Generator
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Create strong, secure passwords instantly
          </p>
        </header>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
          <PasswordDisplay
            password={generatedPassword}
            onCopy={handleCopyToClipboard}
            copied={copied}
          />

          <div className="mt-6">
            <StrengthMeter strength={strength} idle={!generatedPassword} />
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="space-y-8">
            <PasswordInput
              value={userInput}
              onChange={setUserInput}
              onGenerate={handleGeneratePassword}
            />

            <OptionsPanel
              length={length}
              onLengthChange={setLength}
              options={options}
              onOptionChange={handleOptionChange}
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={handleGeneratePassword}
              disabled={!userInput.trim()}
              className="h-11 flex-1 rounded-xl border border-white/10 bg-zinc-900/80 text-sm font-medium text-zinc-200 shadow-sm transition hover:border-white/15 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Transform text
            </button>
            <button
              type="button"
              onClick={handleGenerateRandomPassword}
              className="h-11 flex-1 rounded-xl bg-emerald-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Random password
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600">
          Your password is generated locally and never stored
        </p>
      </div>
    </main>
  )
}
