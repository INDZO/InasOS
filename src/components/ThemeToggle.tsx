"use client";

import { Moon, Sun } from "lucide-react";
import { useDesktopStore } from "@/store/useDesktopStore";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  showLabel?: boolean;
};

export function ThemeToggle({ className, showLabel = false }: Props) {
  const theme = useDesktopStore((s) => s.theme);
  const toggleTheme = useDesktopStore((s) => s.toggleTheme);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border border-[color:var(--os-border)] bg-[var(--os-control)] px-2 text-[11.5px] font-medium text-[var(--os-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-colors hover:bg-[var(--os-control-hover)]",
        className
      )}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      {isLight ? (
        <Sun className="h-3.5 w-3.5 text-amber-500" aria-hidden />
      ) : (
        <Moon className="h-3.5 w-3.5 text-sky-200" aria-hidden />
      )}
      {showLabel && <span>{isLight ? "Light" : "Dark"}</span>}
    </button>
  );
}
