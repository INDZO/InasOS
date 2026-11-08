"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import DesktopOS from "./desktop/DesktopOS";
import MobileOS from "./mobile-os/MobileOS";
import { useDesktopStore } from "@/store/useDesktopStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { consumeBootReplay, getShowBootOnStartup } from "@/lib/boot";
import { connectPortfolioNavigation, desktopMediaQuery } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { portfolioViews } from "@/data/portfolio-views";

const BootScreen = dynamic(() => import("./boot/BootScreen"));

const subscribeViewport = (callback: () => void) => {
  const media = window.matchMedia(desktopMediaQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export default function OSShell() {
  const [showBoot, setShowBoot] = useState(false);
  const startupChecked = useRef(false);
  const theme = useDesktopStore((s) => s.theme);
  const language = useLanguageStore((s) => s.language);
  const desktop = useSyncExternalStore(subscribeViewport, () => window.matchMedia(desktopMediaQuery).matches, () => true);
  const completeBoot = useCallback(() => setShowBoot(false), []);

  useEffect(() => {
    void useDesktopStore.persist.rehydrate();
    void useLanguageStore.persist.rehydrate();
    if (!startupChecked.current) {
      startupChecked.current = true;
      const replay = consumeBootReplay();
      const show = replay || (!window.location.hash && getShowBootOnStartup());
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setShowBoot(show && !reduced);
    }
    return connectPortfolioNavigation();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.classList.toggle("theme-light", theme === "light");
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
  }, [language, theme]);

  return (
    <MotionConfig reducedMotion="user">
      <main id="portfolio" className={cn("relative isolate h-dvh w-full overflow-hidden bg-[var(--os-bg)] text-[var(--os-text)]", `theme-${theme}`)}>
        <div className="h-full w-full" inert={showBoot}>
          <a href={portfolioViews[language].path} className="skip-link os-action os-action-primary">
            {language === "sr" ? "Pređi na brzi pregled portfolija" : "Skip to Quick Overview"}
          </a>
          {desktop ? <DesktopOS /> : <MobileOS />}
        </div>
        <AnimatePresence>{showBoot && <BootScreen onComplete={completeBoot} />}</AnimatePresence>
      </main>
    </MotionConfig>
  );
}
