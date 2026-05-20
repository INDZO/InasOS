"use client";

import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import { appById } from "@/data/apps";
import { AppIcon } from "@/components/AppIcon";
import AppRenderer from "@/components/apps/AppRenderer";
import { appName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function MobileAppScreen() {
  const activeAppId = useMobileStore((s) => s.activeAppId);
  const goHome = useMobileStore((s) => s.goHome);
  const language = useLanguageStore((s) => s.language);

  if (!activeAppId) return null;
  const app = appById(activeAppId);
  if (!app) return null;
  const title = appName(app.id, language);
  const home = language === "sr" ? "Početna" : "Home";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute inset-0 z-40 flex h-full w-full flex-col bg-[var(--os-bg)] text-[var(--os-text)]"
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[color:var(--os-border)] bg-[var(--os-panel)] px-3 backdrop-blur-xl">
        <button
          onClick={goHome}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[13px] text-[color:var(--os-accent)] active:bg-[var(--os-control)]"
          aria-label="Back to home"
        >
          <ChevronLeft className="h-4 w-4" />
          {home}
        </button>
        <div className="flex min-w-0 items-center gap-2 text-[13px] text-[var(--os-text)]">
          <AppIcon
            name={app.iconName}
            className="h-3.5 w-3.5 text-[color:var(--os-accent)]"
            strokeWidth={1.8}
          />
          <span className="truncate font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle className="h-7 px-2" />
          <LanguageToggle className="h-7 px-2 text-[10.5px]" />
        </div>
      </div>

      {/* Content */}
      <div className="os-scroll flex-1 overflow-y-auto px-4 py-4">
        <AppRenderer appId={app.id} surface="mobile" />
      </div>
    </motion.div>
  );
}
