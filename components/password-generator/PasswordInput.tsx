import type { KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
}

export default function PasswordInput({
  value,
  onChange,
  onGenerate,
}: PasswordInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onGenerate()
    }
  }

  return (
    <div className="space-y-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
        Word or phrase{' '}
        <span className="font-normal normal-case tracking-normal text-zinc-600">
          (optional)
        </span>
      </span>
      <p className="text-xs leading-relaxed text-zinc-600">
        We&apos;ll transform it into a strong password. Leave empty and use{' '}
        <span className="text-zinc-500">Random password</span> instead.
      </p>
      <Input
        type="text"
        placeholder="e.g. MyPassword, John1990"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-11 rounded-xl border-white/10 bg-black/25 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:border-sky-500/50 focus-visible:ring-sky-500/20"
      />
    </div>
  )
}
