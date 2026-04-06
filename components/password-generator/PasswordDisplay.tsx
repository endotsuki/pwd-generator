import { Button } from "@/components/ui/button";
import {
  IconCheck,
  IconCopy,
  IconSparklesFilled,
  IconChecks,
} from "@tabler/icons-react";

interface PasswordDisplayProps {
  password: string;
  onCopy: () => void;
  copied: boolean;
}

export default function PasswordDisplay({
  password,
  onCopy,
  copied,
}: PasswordDisplayProps) {
  const hasPassword = Boolean(password);

  return (
    <div className="space-y-2">
      <span className="text-sm font-black uppercase tracking-widest text-stone-500">
        Result
      </span>
      <div
        className={`flex min-h-14 items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
          hasPassword
            ? "border-stone-900 bg-white shadow-[3px_3px_0px_0px_#1c1917]"
            : "border-dashed border-stone-300 bg-stone-50"
        }`}
      >
        <div className="flex-1">
          {hasPassword ? (
            <code className="block w-full break-all font-mono text-[15px] font-bold leading-relaxed tracking-wide text-stone-900 selection:bg-orange-200">
              {password}
            </code>
          ) : (
            <div className="flex items-center gap-2">
              <IconSparklesFilled
                size={22}
                className="shrink-0 text-stone-300"
                aria-hidden
              />
              <span className="text-sm font-medium text-stone-400">
                Your password will appear here
              </span>
            </div>
          )}
        </div>
        <Button
          type="button"
          onClick={onCopy}
          disabled={!hasPassword}
          variant="ghost"
          size="icon"
          className={`size-8 shrink-0 cursor-pointer rounded-lg border-2 transition-all duration-150 ${
            copied
              ? "border-emerald-600 bg-emerald-50 text-emerald-600 shadow-[2px_2px_0px_0px_#059669]"
              : "border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-700 hover:shadow-[2px_2px_0px_0px_#1c1917] disabled:opacity-25"
          }`}
        >
          {copied ? (
            <IconCheck className="size-4" />
          ) : (
            <IconCopy className="size-4" />
          )}
        </Button>
      </div>
      <div
        className={`flex items-center gap-1.5 transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`}
      >
        <IconChecks size={16} className="text-emerald-600" />
        <p className="text-xs font-bold text-emerald-600">
          Copied to clipboard!
        </p>
      </div>
    </div>
  );
}
