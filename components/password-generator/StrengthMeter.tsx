interface StrengthMeterProps {
  strength: "weak" | "medium" | "strong";
  idle?: boolean;
  length: number;
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
}

function getSuggestion(
  strength: "weak" | "medium" | "strong",
  length: number,
  varietyCount: number,
): string | null {
  if (strength === "strong") return null;

  // How many more chars needed to hit strong with current variety
  // Based on scoring: need score > 6
  // Length scores: ≥6=+1, ≥10=+1, ≥14=+2, ≥20=+2
  // Variety scores: ≥1=+1, ≥2=+2, ≥3=+1, ≥4=+1
  const varietyScore =
    varietyCount >= 4 ? 5 : varietyCount >= 3 ? 4 : varietyCount >= 2 ? 3 : 1;

  // Work out minimum length needed for strong (score >= 7)
  const neededLengthScore = 7 - varietyScore;

  let minLength: number;
  if (neededLengthScore <= 1) minLength = 6;
  else if (neededLengthScore <= 2) minLength = 10;
  else if (neededLengthScore <= 4) minLength = 14;
  else minLength = 20;

  if (length < minLength) {
    const diff = minLength - length;
    return `Add ${diff} more character${diff > 1 ? "s" : ""} (${minLength}+ length) to make it strong`;
  }

  if (varietyCount === 1) {
    return "Add 1 more character type (e.g. numbers or symbols) to make it strong";
  }

  return "Try increasing the length for a stronger password";
}

export default function StrengthMeter({
  strength,
  idle,
  length,
  options,
}: StrengthMeterProps) {
  const config = {
    weak: {
      segments: 1,
      label: "Weak",
      bar: "bg-rose-500",
      badge:
        "border-2 border-rose-300 bg-rose-100 text-rose-700 shadow-[2px_2px_0px_0px_#fca5a5]",
    },
    medium: {
      segments: 2,
      label: "Medium",
      bar: "bg-amber-400",
      badge:
        "border-2 border-amber-300 bg-amber-100 text-amber-700 shadow-[2px_2px_0px_0px_#fcd34d]",
    },
    strong: {
      segments: 3,
      label: "Strong",
      bar: "bg-emerald-500",
      badge:
        "border-2 border-emerald-300 bg-emerald-100 text-emerald-700 shadow-[2px_2px_0px_0px_#6ee7b7]",
    },
  };

  const varietyCount = [
    options.uppercase,
    options.lowercase,
    options.numbers,
    options.symbols,
  ].filter(Boolean).length;

  const suggestion = idle
    ? null
    : getSuggestion(strength, length, varietyCount);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-black uppercase tracking-widest text-stone-500">
          Strength
        </span>
        {!idle ? (
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${config[strength].badge}`}
          >
            {config[strength].label}
          </span>
        ) : (
          <span className="text-xs font-bold text-stone-300">—</span>
        )}
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full border transition-all duration-500 ${
              idle
                ? "border-stone-200 bg-stone-100"
                : i < config[strength].segments
                  ? `${config[strength].bar} border-transparent`
                  : "border-stone-200 bg-stone-100"
            }`}
          />
        ))}
      </div>

      {/* Suggestion hint */}
      <div
        className={`transition-all duration-300 ${suggestion ? "opacity-100 max-h-10" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        <p className="text-xs font-semibold text-stone-400">💡 {suggestion}</p>
      </div>
    </div>
  );
}
