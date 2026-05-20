"use client";

import { AnimatePresence } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import { useDesktopStore } from "@/store/useDesktopStore";
import MobileStatusBar from "./MobileStatusBar";
import MobileHome from "./MobileHome";
import MobileDock from "./MobileDock";
import MobileAppScreen from "./MobileAppScreen";

export default function MobileOS() {
  const activeAppId = useMobileStore((s) => s.activeAppId);
  const wallpaperIntensity = useDesktopStore((s) => s.wallpaperIntensity);
  const dimOpacity = ((100 - wallpaperIntensity) / 100) * 0.82;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="os-wallpaper absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 os-grid opacity-30" />
      <div
        className="absolute inset-0 -z-10 bg-black transition-opacity duration-200"
        style={{ opacity: dimOpacity }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <MobileStatusBar />
        <MobileHome />
        <MobileDock />
      </div>

      <AnimatePresence>{activeAppId && <MobileAppScreen />}</AnimatePresence>
    </div>
  );
}
