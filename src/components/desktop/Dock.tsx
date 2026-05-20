"use client";

import { dockApps } from "@/data/apps";
import { useWindowStore } from "@/store/useWindowStore";
import { AppIcon } from "@/components/AppIcon";
import { cn } from "@/lib/cn";
import { appName, appShortName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Grid3X3 } from "lucide-react";
import { useDesktopStore } from "@/store/useDesktopStore";

export default function Dock() {
  const openWindow = useWindowStore((s) => s.openWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const language = useLanguageStore((s) => s.language);
  const toggleLauncher = useDesktopStore((s) => s.toggleLauncher);
  const launcherOpen = useDesktopStore((s) => s.launcherOpen);
  const startLabel = language === "sr" ? "Start" : "Start";

  const handleClick = (id: typeof dockApps[number]["id"]) => {
    const w = windows[id];
    if (!w) {
      openWindow(id);
      return;
    }
    if (w.minimized) {
      restoreWindow(id);
      return;
    }
    // open and focused -> minimize; otherwise focus
    if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-[60] flex justify-center" data-os-dock>
      <div className="pointer-events-auto flex items-end gap-2 rounded-[24px] border border-[color:var(--os-border)] bg-[var(--os-panel)] px-3 py-2 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl">
        <button
          type="button"
          onClick={toggleLauncher}
          aria-label="Open Start launcher"
          className={cn(
            "group relative grid h-14 w-14 place-items-center rounded-[16px] border bg-gradient-to-br from-orange-400/24 via-white/[0.08] to-white/[0.02] transition-all",
            "hover:-translate-y-2 hover:scale-110 hover:border-orange-300/50",
            launcherOpen ? "border-orange-400/60" : "border-[color:var(--os-border)]"
          )}
        >
          <Grid3X3 className="h-5 w-5 text-[color:var(--os-accent)]" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[color:var(--os-border)] bg-[var(--os-panel-strong)] px-2 py-1 text-[10.5px] text-[var(--os-text)] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            {startLabel}
          </span>
        </button>
        <div className="mx-0.5 h-10 w-px bg-[var(--os-border)]" />
        {dockApps.map((app) => {
          const w = windows[app.id];
          const isOpen = Boolean(w);
          const isActive = activeWindowId === app.id && w && !w.minimized;
          const title = appName(app.id, language);
          return (
            <button
              key={app.id}
              onClick={() => handleClick(app.id)}
              aria-label={`Open dock app ${title}`}
              className={cn(
                "group relative grid h-14 w-14 place-items-center rounded-[16px] border bg-gradient-to-br from-white/[0.18] via-white/[0.07] to-white/[0.02] transition-all",
                "hover:-translate-y-2 hover:scale-110 hover:border-orange-300/45 hover:from-orange-400/20",
                isActive
                  ? "border-orange-400/40 from-orange-500/15"
                  : "border-[color:var(--os-border)]"
              )}
            >
              <AppIcon
                name={app.iconName}
                className="h-5 w-5 text-[color:var(--os-accent)]"
                strokeWidth={1.8}
              />
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[color:var(--os-border)] bg-[var(--os-panel-strong)] px-2 py-1 text-[10.5px] text-[var(--os-text)] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {appShortName(app.id, language)}
              </span>
              {isOpen && (
                <span
                  className={cn(
                    "absolute -bottom-1.5 h-1 w-1 rounded-full transition-colors",
                    isActive ? "bg-orange-400" : "bg-zinc-500"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
