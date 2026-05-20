"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { apps } from "@/data/apps";
import { appName } from "@/data/i18n";
import { localizedProfile } from "@/data/i18n";
import { AppIcon } from "@/components/AppIcon";
import { GithubIcon } from "@/components/BrandIcons";
import { useDesktopStore } from "@/store/useDesktopStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useWindowStore } from "@/store/useWindowStore";

export default function StartLauncher() {
  const launcherOpen = useDesktopStore((s) => s.launcherOpen);
  const closeLauncher = useDesktopStore((s) => s.closeLauncher);
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];
  const openWindow = useWindowStore((s) => s.openWindow);
  const windows = useWindowStore((s) => s.windows);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const copy =
    language === "sr"
      ? {
          title: "Start",
          subtitle: "Pretraži aplikacije, fajlove i portfolio sadržaj",
          search: "Traži aplikaciju ili fajl",
          allApps: "Aplikacije",
          running: "Aktivno",
          profile: "Profil",
          empty: "Nema rezultata.",
          github: "GitHub profil",
        }
      : {
          title: "Start",
          subtitle: "Search apps, files and portfolio content",
          search: "Search app or file",
          allApps: "Applications",
          running: "Running",
          profile: "Profile",
          empty: "No results.",
          github: "GitHub profile",
        };

  useEffect(() => {
    if (!launcherOpen) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLauncher();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [closeLauncher, launcherOpen]);

  const visibleApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return apps;
    return apps.filter((app) =>
      `${appName(app.id, language)} ${app.description} ${app.title}`
        .toLowerCase()
        .includes(q)
    );
  }, [language, query]);

  const runningIds = Object.values(windows)
    .filter((window) => !window.minimized)
    .map((window) => window.id);

  const openApp = (id: (typeof apps)[number]["id"]) => {
    openWindow(id);
    setQuery("");
    closeLauncher();
  };

  const close = () => {
    setQuery("");
    closeLauncher();
  };

  return (
    <AnimatePresence>
      {launcherOpen && (
        <motion.div
          key="launcher"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[82] bg-black/14 backdrop-blur-[2px]"
          onMouseDown={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute bottom-[86px] left-1/2 flex max-h-[72vh] w-[min(680px,calc(100vw-48px))] -translate-x-1/2 flex-col overflow-hidden rounded-[18px] border border-[color:var(--os-border-strong)] bg-[var(--os-panel-strong)] text-[var(--os-text)] shadow-[0_34px_120px_-42px_rgba(0,0,0,0.86)] backdrop-blur-2xl"
            role="dialog"
            aria-label="Start launcher"
          >
            <header className="flex items-start justify-between gap-4 border-b border-[color:var(--os-border)] px-4 py-3">
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--os-accent)]">
                  InasOS
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  {copy.title}
                </h2>
                <p className="mt-1 text-[13px] text-[var(--os-muted)]">
                  {copy.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--os-border)] bg-[var(--os-control)] text-[var(--os-muted)] hover:bg-[var(--os-control-hover)]"
                aria-label="Close launcher"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="border-b border-[color:var(--os-border)] px-4 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--os-muted)]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={copy.search}
                  className="h-9 w-full rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)] pl-9 pr-3 text-[13px] text-[var(--os-text)] outline-none placeholder:text-[var(--os-muted)]"
                />
              </div>
            </div>

            <div className="os-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
                <section>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--os-muted)]">
                    {copy.allApps}
                  </div>
                  {visibleApps.length === 0 ? (
                    <div className="rounded-xl border border-[color:var(--os-border)] bg-[var(--os-control)] p-4 text-[13px] text-[var(--os-muted)]">
                      {copy.empty}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {visibleApps.map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => openApp(app.id)}
                          className="group flex min-h-[94px] flex-col items-center justify-center gap-2 rounded-xl border border-transparent p-2.5 text-center transition-colors hover:bg-[var(--os-control)]"
                        >
                          <span className="relative grid h-12 w-12 place-items-center rounded-[14px] border border-[color:var(--os-border)] bg-gradient-to-br from-white/[0.22] via-white/[0.08] to-white/[0.02] text-[color:var(--os-accent)] shadow-[0_10px_24px_-18px_rgba(0,0,0,0.7)]">
                            <AppIcon
                              name={app.iconName}
                              className="h-5 w-5"
                              strokeWidth={1.8}
                            />
                            {windows[app.id] && (
                              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-orange-400" />
                            )}
                          </span>
                          <span className="line-clamp-2 text-[12px] font-medium leading-tight">
                            {appName(app.id, language)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </section>

                <aside className="space-y-4">
                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--os-muted)]">
                      {copy.profile}
                    </div>
                    <div className="rounded-xl border border-[color:var(--os-border)] bg-[var(--os-control)] p-3">
                      <div className="text-[13px] font-semibold text-[var(--os-text)]">
                        {profile.name}
                      </div>
                      <div className="mt-1 text-[12px] leading-relaxed text-[var(--os-muted)]">
                        {profile.role}
                      </div>
                      {profile.github && (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)] px-3 text-xs font-medium text-[var(--os-text)] transition-colors hover:bg-[var(--os-control-hover)]"
                          onClick={close}
                        >
                          <GithubIcon className="h-4 w-4" />
                          {copy.github}
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--os-muted)]">
                      {copy.running}
                    </div>
                    <div className="rounded-xl border border-[color:var(--os-border)] bg-[var(--os-control)] p-2">
                      {runningIds.length === 0 ? (
                        <div className="px-2 py-1 text-[12px] text-[var(--os-muted)]">
                          -
                        </div>
                      ) : (
                        runningIds.map((id) => {
                          const app = apps.find((candidate) => candidate.id === id);
                          if (!app) return null;
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => openApp(id)}
                              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] hover:bg-[var(--os-control-hover)]"
                            >
                              <AppIcon
                                name={app.iconName}
                                className="h-3.5 w-3.5 text-[color:var(--os-accent)]"
                              />
                              {appName(id, language)}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
