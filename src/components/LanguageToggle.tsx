"use client";

import { Languages } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { cn } from "@/lib/cn";

export function LanguageToggle({ className }: { className?: string }) {
  const language = useLanguageStore((s) => s.language);
  const toggleLanguage = useLanguageStore((s) => s.toggleLanguage);

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border border-[color:var(--os-border)] bg-[var(--os-control)] px-2 text-[11px] font-medium text-[var(--os-text)] transition-colors hover:bg-[var(--os-control-hover)]",
        className
      )}
      aria-label="Toggle language"
      title="Toggle language"
    >
      <Languages className="h-3.5 w-3.5 text-[color:var(--os-accent)]" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}
