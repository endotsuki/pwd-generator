import type { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
}

export default function PasswordInput({
  value,
  onChange,
  onGenerate,
}: PasswordInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onGenerate();
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-sm font-black uppercase tracking-widest text-stone-500">
          Word or phrase
        </span>
        <span className="rounded-full border-2 border-stone-200 bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-400">
          optional
        </span>
      </div>
      <p className="text-xs leading-snug text-stone-400">
        We'll transform it into a strong password. Leave empty and use{" "}
        <span className="font-bold text-stone-600">Random</span> instead.
      </p>
      <Input
        type="text"
        placeholder="e.g. MyPassword, John1990"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-12 rounded-xl border-2 border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 shadow-none placeholder:font-normal placeholder:text-stone-400 focus-visible:border-stone-900 focus-visible:ring-0 focus-visible:shadow-[3px_3px_0px_0px_#1c1917] transition-shadow duration-150"
      />
    </div>
  );
}
