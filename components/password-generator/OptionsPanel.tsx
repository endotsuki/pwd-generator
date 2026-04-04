import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface OptionsPanelProps {
  length: number;
  onLengthChange: (length: number) => void;
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
  onOptionChange: (
    key: "uppercase" | "lowercase" | "numbers" | "symbols",
  ) => void;
}

const CHAR_OPTIONS: {
  key: "uppercase" | "lowercase" | "numbers" | "symbols";
  label: string;
}[] = [
  { key: "uppercase", label: "Uppercase A-Z" },
  { key: "lowercase", label: "Lowercase a-z" },
  { key: "numbers", label: "Numbers 0-9" },
  { key: "symbols", label: "Symbols !@#$%" },
];

export default function OptionsPanel({
  length,
  onLengthChange,
  options,
  onOptionChange,
}: OptionsPanelProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Length
          </span>
          <span className="font-mono text-lg tabular-nums text-sky-400">
            {length}
          </span>
        </div>
        <Slider
          value={[length]}
          onValueChange={(value) => onLengthChange(value[0])}
          min={6}
          max={64}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between font-mono text-[11px] text-zinc-600">
          <span>6</span>
          <span>64</span>
        </div>
      </div>

      <div className="space-y-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Character types
        </span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CHAR_OPTIONS.map(({ key, label }) => (
            <label
              key={key}
              htmlFor={key}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.06] bg-black/15 px-3 py-2.5 transition hover:border-white/10 hover:bg-black/25"
            >
              <Checkbox
                id={key}
                checked={options[key]}
                onCheckedChange={() => onOptionChange(key)}
                className="border-zinc-600 data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500"
              />
              <span className="text-sm text-zinc-300">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
