interface StrengthMeterProps {
  strength: 'weak' | 'medium' | 'strong'
  idle?: boolean
}

export default function StrengthMeter({ strength, idle }: StrengthMeterProps) {
  const strengthConfig = {
    weak: {
      color: 'bg-rose-500',
      label: 'Weak',
      width: '33%',
      textColor: 'text-rose-400',
    },
    medium: {
      color: 'bg-amber-400',
      label: 'Medium',
      width: '66%',
      textColor: 'text-amber-300',
    },
    strong: {
      color: 'bg-emerald-400',
      label: 'Strong',
      width: '100%',
      textColor: 'text-emerald-400',
    },
  }

  if (idle) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Strength
          </span>
          <span className="text-xs text-zinc-600">—</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/80" />
      </div>
    )
  }

  const config = strengthConfig[strength]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Strength
        </span>
        <span className={`text-xs font-medium ${config.textColor}`}>
          {config.label}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${config.color}`}
          style={{ width: config.width }}
        />
      </div>
    </div>
  )
}
