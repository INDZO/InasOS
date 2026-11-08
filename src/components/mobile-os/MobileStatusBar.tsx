"use client";

import { useEffect, useState } from "react";
import { InasLogo } from "@/components/InasLogo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function MobileStatusBar() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const set = () =>
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    set();
    const id = window.setInterval(set, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative z-30 flex min-h-12 shrink-0 items-center justify-between px-4 pt-[env(safe-area-inset-top)] text-[12px] text-[var(--os-text)]">
      <InasLogo compact showWordmark={false} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
        {time || "--:--"}
      </div>
      <div className="flex items-center gap-1.5 text-[var(--os-muted)]">
        <ThemeToggle className="h-9 px-2.5" />
        <LanguageToggle className="h-9 px-2.5 text-[10.5px]" />
      </div>
    </div>
  );
}
