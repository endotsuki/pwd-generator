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
    <main className="flex h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <header className="mb-5 flex items-end justify-between">
          <div>
            <div className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">
              Security Tool
            </div>
            <h1 className="text-3xl font-bold leading-none tracking-tight text-stone-900">
              Password Generator
            </h1>
          </div>
          <p className="text-right text-xs text-stone-400 leading-relaxed">
            Strong passwords<br />in seconds
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border-2 border-stone-900 bg-white shadow-[6px_6px_0px_0px_#1c1917]">

          {/* Result + Strength */}
          <div className="rounded-t-2xl border-b-2 border-stone-900 bg-stone-50 px-5 py-4">
            <PasswordDisplay
              password={generatedPassword}
              onCopy={handleCopyToClipboard}
              copied={copied}
            />
            <div className="mt-3">
              <StrengthMeter strength={strength} idle={!generatedPassword} />
            </div>
          </div>

          {/* Options */}
          <div className="px-5 py-4 space-y-5">
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

          {/* Buttons */}
          <div className="flex gap-3 border-t-2 border-stone-900 px-5 py-4">
            <button
              type="button"
              onClick={handleGeneratePassword}
              disabled={!userInput.trim()}
              className="h-10 flex-1 rounded-xl border-2 border-stone-900 bg-white text-sm font-semibold text-stone-700 transition-all hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Transform text
            </button>
            <button
              type="button"
              onClick={handleGenerateRandomPassword}
              className="h-10 flex-1 rounded-xl border-2 border-stone-900 bg-orange-500 text-sm font-bold text-white shadow-[3px_3px_0px_0px_#1c1917] transition-all hover:bg-orange-400 hover:shadow-[1px_1px_0px_0px_#1c1917] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
            >
              Random password →
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-stone-400">
          Generated locally · never stored · never sent
        </p>
      </div>
    </main>
  )
}