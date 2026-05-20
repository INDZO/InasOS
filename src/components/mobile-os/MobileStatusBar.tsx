"use client";

import { useEffect, useState } from "react";
import { Wifi, BatteryFull, Signal } from "lucide-react";
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
    <div className="relative z-30 flex h-10 shrink-0 items-center justify-between px-4 text-[12px] text-[var(--os-text)]">
      <InasLogo compact showWordmark={false} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
        {time || "--:--"}
      </div>
      <div className="flex items-center gap-1.5 text-[var(--os-muted)]">
        <ThemeToggle className="h-6 px-2" />
        <LanguageToggle className="h-6 px-2 text-[10.5px]" />
        <Signal className="h-3.5 w-3.5" aria-hidden />
        <Wifi className="h-3.5 w-3.5" aria-hidden />
        <BatteryFull className="h-3.5 w-3.5" aria-hidden />
      </div>
    </div>
  );
}
