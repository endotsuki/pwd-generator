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
  example: string;
}[] = [
  { key: "uppercase", label: "Uppercase", example: "A–Z" },
  { key: "lowercase", label: "Lowercase", example: "a–z" },
  { key: "numbers", label: "Numbers", example: "0–9" },
  { key: "symbols", label: "Symbols", example: "!@#$" },
];

export default function OptionsPanel({
  length,
  onLengthChange,
  options,
  onOptionChange,
}: OptionsPanelProps) {
  return (
    <div className="space-y-5">
      {/* Length */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black uppercase tracking-widest text-stone-500">
            Length
          </span>
          <span className="min-w-[2.25rem] rounded-md border-2 border-stone-900 bg-orange-500 px-2 py-0.5 text-center font-mono text-sm font-black tabular-nums text-white shadow-[2px_2px_0px_0px_#1c1917]">
            {length}
          </span>
        </div>
        <Slider
          value={[length]}
          onValueChange={(value) => onLengthChange(value[0])}
          min={6}
          max={64}
          step={1}
          className="w-full cursor-pointer **:data-[slot=slider-track]:h-2.5 **:data-[slot=slider-track]:rounded-full **:data-[slot=slider-track]:bg-stone-200 **:data-[slot=slider-track]:border **:data-[slot=slider-track]:border-stone-300 **:data-[slot=slider-range]:bg-stone-900 **:data-[slot=slider-thumb]:size-5 **:data-[slot=slider-thumb]:border-2 **:data-[slot=slider-thumb]:border-stone-900 **:data-[slot=slider-thumb]:bg-white **:data-[slot=slider-thumb]:shadow-[2px_2px_0px_0px_#1c1917]"
        />
        <div className="flex justify-between font-mono text-xs font-bold text-stone-400">
          <span>6</span>
          <span>64</span>
        </div>
      </div>

      {/* Character types */}
      <div className="space-y-2">
        <span className="text-sm font-black uppercase tracking-widest text-stone-500">
          Character types
        </span>
        <div className="grid grid-cols-2 gap-2">
          {CHAR_OPTIONS.map(({ key, label, example }) => (
            <label
              key={key}
              htmlFor={key}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 transition-all duration-100 ${
                options[key]
                  ? "border-stone-900 bg-orange-50 shadow-[3px_3px_0px_0px_#1c1917]"
                  : "border-stone-200 bg-white hover:border-stone-400 hover:shadow-[2px_2px_0px_0px_#e7e5e4]"
              }`}
            >
              <Checkbox
                id={key}
                checked={options[key]}
                onChange={() => onOptionChange(key)}
                size={"md"}
                className="shrink-0"
              />
              <div>
                <p
                  className={`text-sm font-extrabold leading-none ${
                    options[key] ? "text-stone-900" : "text-stone-400"
                  }`}
                >
                  {label}
                </p>
                <p
                  className={`mt-1 font-mono text-xs font-bold tracking-wider ${
                    options[key] ? "text-orange-500" : "text-stone-300"
                  }`}
                >
                  {example}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
