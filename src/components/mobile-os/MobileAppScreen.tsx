"use client";

import { ChevronLeft, LayoutList } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import { appById } from "@/data/apps";
import { AppIcon } from "@/components/AppIcon";
import AppRenderer from "@/components/apps/AppRenderer";
import { appName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePortfolioLocation } from "@/lib/navigation";
import { portfolioViews } from "@/data/portfolio-views";

export default function MobileAppScreen() {
  const activeAppId = useMobileStore((s) => s.activeAppId);
  const goHome = useMobileStore((s) => s.goHome);
  const language = useLanguageStore((s) => s.language);
  const reduceMotion = useReducedMotion();
  const screenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { app } = usePortfolioLocation();
  const fromFinder = app === activeAppId && app !== "finder" && app !== null && window.history.state?.fromFinder === true;
  const back = useCallback(() => {
    if (fromFinder) window.history.back();
    else goHome();
  }, [fromFinder, goHome]);
  const [opener] = useState(() => document.activeElement as HTMLElement | null);

  useEffect(() => {
    screenRef.current?.focus({ preventScroll: true });
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeAppId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) { event.preventDefault(); back(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [back]);

  useEffect(() => () => {
    requestAnimationFrame(() => {
      if (useMobileStore.getState().activeAppId) return;
      const target = opener?.isConnected && opener !== document.body
        ? opener
        : document.querySelector<HTMLElement>("[data-mobile-home] .os-action-primary");
      target?.focus({ preventScroll: true });
    });
  }, [opener]);

  if (!activeAppId) return null;
  const definition = appById(activeAppId);
  if (!definition) return null;
  const title = appName(definition.id, language);
  const view = portfolioViews[language];
  const destination = fromFinder ? appName("finder", language) : language === "sr" ? "Početna" : "Home";

  return (
    <motion.div
      ref={screenRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
      className="absolute inset-0 z-40 flex h-full w-full flex-col bg-[var(--os-bg)] pt-[env(safe-area-inset-top)] text-[var(--os-text)]"
    >
      <div className="flex min-h-14 shrink-0 items-center justify-between gap-2 border-b border-[color:var(--os-border)] bg-[var(--os-panel)] px-2 backdrop-blur-xl">
        <button
          onClick={back}
          className="flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[13px] text-[color:var(--os-accent)] active:bg-[var(--os-control)]"
          aria-label={language === "sr" ? `Nazad · ${destination}` : `Back to ${destination}`}
        >
          <ChevronLeft className="h-4 w-4" />
          {destination}
        </button>
        <div className="flex min-w-0 items-center gap-2 text-[13px] text-[var(--os-text)]">
          <AppIcon
            name={definition.iconName}
            className="h-3.5 w-3.5 text-[color:var(--os-accent)]"
            strokeWidth={1.8}
          />
          <span className="truncate font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <a href={view.path} title={view.overview} aria-label={view.overview} className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--os-border)] bg-[var(--os-control)] text-[var(--os-accent)]">
            <LayoutList size={16} aria-hidden="true" />
          </a>
          <ThemeToggle className="hidden h-9 px-2 min-[360px]:inline-flex" />
          <LanguageToggle className="h-9 px-2 text-[10.5px]" />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} tabIndex={0} role="region" aria-label={language === "sr" ? `Sadržaj · ${title}` : `${title} content`} className="os-scroll min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-[max(16px,env(safe-area-inset-bottom))] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--os-accent)]">
        <AppRenderer appId={definition.id} surface="mobile" />
      </div>
    </motion.div>
  );
}
