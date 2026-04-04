import { Button } from '@/components/ui/button'
import { Copy, Check, Sparkles } from 'lucide-react'

interface PasswordDisplayProps {
  password: string
  onCopy: () => void
  copied: boolean
}

export default function PasswordDisplay({
  password,
  onCopy,
  copied,
}: PasswordDisplayProps) {
  const hasPassword = Boolean(password)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Result
        </span>
      </div>
      <div className="flex gap-2">
        <div
          className={`flex min-h-[3.25rem] flex-1 items-center rounded-2xl border px-4 py-3 ${
            hasPassword
              ? 'border-white/[0.08] bg-black/20'
              : 'border-dashed border-white/[0.06] bg-black/10'
          }`}
        >
          {hasPassword ? (
            <code className="w-full break-all font-mono text-[15px] leading-relaxed tracking-wide text-zinc-100 selection:bg-sky-500/40 selection:text-white">
              {password}
            </code>
          ) : (
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Sparkles className="size-4 shrink-0 text-zinc-600" aria-hidden />
              <span>Generate a password to see it here</span>
            </div>
          )}
        </div>
        <Button
          type="button"
          onClick={onCopy}
          disabled={!hasPassword}
          variant="outline"
          size="icon"
          className={`size-11 shrink-0 rounded-xl border transition ${
            copied
              ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20'
              : 'border-white/10 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 disabled:opacity-35'
          }`}
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
      </div>
      {copied && (
        <p className="text-xs font-medium text-emerald-400/90">Copied to clipboard</p>
      )}
    </div>
  )
}
