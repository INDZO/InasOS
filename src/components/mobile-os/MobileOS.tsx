"use client";

import { AnimatePresence } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import OSWallpaper from "@/components/OSWallpaper";
import MobileStatusBar from "./MobileStatusBar";
import MobileHome from "./MobileHome";
import MobileDock from "./MobileDock";
import MobileAppScreen from "./MobileAppScreen";

export default function MobileOS() {
  const activeAppId = useMobileStore((s) => s.activeAppId);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <OSWallpaper />

      <div className="relative z-10 flex h-full flex-col">
        <MobileStatusBar />
        <MobileHome />
        <MobileDock />
      </div>

      <AnimatePresence>{activeAppId && <MobileAppScreen />}</AnimatePresence>
    </div>
  );
}
