import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles } from "lucide-react";

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
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
        Result
      </span>
      <div
        className={`flex min-h-[3.25rem] items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
          hasPassword
            ? "border-stone-900 bg-white"
            : "border-dashed border-stone-300 bg-transparent"
        }`}
      >
        <div className="flex-1">
          {hasPassword ? (
            <code className="block w-full break-all font-mono text-[15px] font-semibold leading-relaxed tracking-wide text-stone-900 selection:bg-orange-200">
              {password}
            </code>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles
                className="size-4 shrink-0 text-stone-300"
                aria-hidden
              />
              <span className="text-sm text-stone-300">
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
          className={`size-9 shrink-0 rounded-lg border-2 transition-all duration-150 ${
            copied
              ? "border-emerald-600 bg-emerald-50 text-emerald-600"
              : "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700 disabled:opacity-25"
          }`}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      <div
        className={`flex items-center gap-1.5 transition-opacity duration-200 ${copied ? "opacity-100" : "opacity-0"}`}
      >
        <Check className="size-3 text-emerald-600" />
        <p className="text-xs font-semibold text-emerald-700">
          Copied to clipboard
        </p>
      </div>
    </div>
  );
}
