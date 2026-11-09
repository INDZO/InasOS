"use client";

import { useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { apps } from "@/data/apps";
import { appCopy, appName, localizedProfile, localizedProjects } from "@/data/i18n";
import { navigatePortfolio } from "@/lib/navigation";
import { normalizeSearch, searchTokens } from "@/lib/search";
import { AppIcon } from "@/components/AppIcon";
import { GithubIcon } from "@/components/BrandIcons";
import { useDesktopStore } from "@/store/useDesktopStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useWindowStore } from "@/store/useWindowStore";

export default function StartLauncher({ returnFocus }: { returnFocus: RefObject<HTMLElement | null> }) {
  const launcherOpen = useDesktopStore((s) => s.launcherOpen);
  const closeLauncher = useDesktopStore((s) => s.closeLauncher);
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];
  const openWindow = useWindowStore((s) => s.openWindow);
  const windows = useWindowStore((s) => s.windows);
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

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

  useLayoutEffect(() => {
    if (launcherOpen) inputRef.current?.focus({ preventScroll: true });
  }, [launcherOpen]);

  const visibleApps = useMemo(() => {
    const tokens = searchTokens(query);
    return apps.filter((app) => {
      const text = normalizeSearch(`${appName(app.id, language)} ${appCopy[language][app.id].description} ${app.description} ${app.title}`);
      return tokens.every((token) => text.includes(token));
    });
  }, [language, query]);

  const projectResults = useMemo(() => {
    const tokens = searchTokens(query);
    if (!tokens.length) return [];
    return localizedProjects[language].filter((project) => {
      const text = normalizeSearch(`${project.name} ${project.description} ${project.tech.join(" ")}`);
      return tokens.every((token) => text.includes(token));
    });
  }, [language, query]);

  const runningIds = Object.values(windows)
    .filter((window) => !window.minimized)
    .map((window) => window.id);

  const dismiss = (focusTarget: () => HTMLElement | null | undefined) => {
    setQuery("");
    closeLauncher();
    requestAnimationFrame(() => {
      if (document.activeElement === document.body) focusTarget()?.focus({ preventScroll: true });
    });
  };

  const close = () => {
    const opener = returnFocus.current;
    dismiss(() => opener?.isConnected && opener.getClientRects().length
      ? opener
      : document.querySelector<HTMLButtonElement>("[data-os-dock] button"));
  };

  const openApp = (id: (typeof apps)[number]["id"]) => {
    dismiss(() => document.querySelector<HTMLElement>(`[data-app-window="${id}"]`));
    openWindow(id);
  };

  const openProject = (id: string) => {
    dismiss(() => document.querySelector<HTMLElement>('[data-app-window="projects"]'));
    navigatePortfolio("projects", id);
  };

  if (!launcherOpen) return null;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[98] bg-black/14 backdrop-blur-[2px]"
      onMouseDown={close}
    >
      <motion.div
        ref={dialogRef}
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            close();
          }
          if (event.key !== "Tab") return;
          const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href], input"
          ) ?? []).filter((element) => element.getClientRects().length);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        className="absolute bottom-[86px] left-1/2 flex max-h-[72vh] w-[min(680px,calc(100vw-48px))] -translate-x-1/2 flex-col overflow-hidden rounded-[18px] border border-[color:var(--os-border-strong)] bg-[var(--os-panel-strong)] text-[var(--os-text)] shadow-[0_34px_120px_-42px_rgba(0,0,0,0.86)] backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={language === "sr" ? "Pretraga portfolija" : "Portfolio launcher"}
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
            aria-label={language === "sr" ? "Zatvori pretragu" : "Close launcher"}
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
              aria-label={copy.search}
              type="search"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (visibleApps[0]) openApp(visibleApps[0].id);
                  else if (projectResults[0]) openProject(projectResults[0].id);
                }
              }}
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
              {visibleApps.length === 0 && projectResults.length === 0 ? (
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
              {projectResults.length > 0 && <div className="mt-4 space-y-1">
                <h3 className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--os-muted)]">{language === "sr" ? "Projekti" : "Projects"}</h3>
                {projectResults.map((project) => <button key={project.id} type="button" onClick={() => openProject(project.id)} className="flex w-full items-center gap-3 rounded-xl border border-[color:var(--os-border)] bg-[var(--os-control)] p-3 text-left hover:bg-[var(--os-control-hover)]">
                  <AppIcon name="folder" className="h-5 w-5 shrink-0 text-[color:var(--os-accent)]" />
                  <span className="min-w-0"><span className="block text-sm font-medium">{project.name}</span><span className="block truncate text-xs text-[var(--os-muted)]">{project.tech.join(" · ")}</span></span>
                </button>)}
              </div>}
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
  );
}
