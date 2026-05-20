"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "./boot/BootScreen";
import DesktopOS from "./desktop/DesktopOS";
import MobileOS from "./mobile-os/MobileOS";
import { useDesktopStore } from "@/store/useDesktopStore";
import { consumeBootReplay, getShowBootOnStartup } from "@/lib/boot";
import { cn } from "@/lib/cn";

export default function OSShell() {
  const [mounted, setMounted] = useState(false);
  const [booted, setBooted] = useState(false);
  const theme = useDesktopStore((s) => s.theme);

  useEffect(() => {
    // Defer the boot decision until after hydration to avoid SSR mismatch.
    // Boot plays on every full page load by default; a one-off replay request
    // always wins, and only an explicit "Show boot on startup" opt-out skips it.
    const replay = consumeBootReplay();
    const showOnStartup = getShowBootOnStartup();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!replay && !showOnStartup) setBooted(true);
  }, []);

  return (
    <main
      className={cn(
        "relative h-[100dvh] w-full overflow-hidden bg-[var(--os-bg)] text-[var(--os-text)]",
        theme === "light" ? "theme-light" : "theme-dark"
      )}
    >
      {/* Desktop experience visible on lg+ */}
      <div className="hidden lg:block h-full w-full">
        <DesktopOS />
      </div>
      {/* Mobile experience visible below lg */}
      <div className="lg:hidden h-full w-full">
        <MobileOS />
      </div>

      <AnimatePresence>
        {mounted && !booted && (
          <BootScreen onComplete={() => setBooted(true)} />
        )}
      </AnimatePresence>
    </main>
  );
}
