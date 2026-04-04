interface StrengthMeterProps {
  strength: "weak" | "medium" | "strong";
  idle?: boolean;
}

export default function StrengthMeter({ strength, idle }: StrengthMeterProps) {
  const config = {
    weak: {
      segments: 1,
      label: "Weak",
      bar: "bg-rose-500",
      badge: "bg-rose-100 text-rose-700 border-rose-300",
    },
    medium: {
      segments: 2,
      label: "Medium",
      bar: "bg-amber-400",
      badge: "bg-amber-100 text-amber-700 border-amber-300",
    },
    strong: {
      segments: 3,
      label: "Strong",
      bar: "bg-emerald-500",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-300",
    },
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
          Strength
        </span>
        {!idle ? (
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${config[strength].badge}`}
          >
            {config[strength].label}
          </span>
        ) : (
          <span className="text-xs text-stone-300">—</span>
        )}
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              idle
                ? "bg-stone-200"
                : i < config[strength].segments
                  ? config[strength].bar
                  : "bg-stone-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
