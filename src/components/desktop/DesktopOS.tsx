"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FolderOpen, Grid3X3, Mail, Moon, RotateCcw, Sun } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { localizedProjects } from "@/data/i18n";
import { desktopApps } from "@/data/apps";
import OSWallpaper from "@/components/OSWallpaper";
import { PortfolioViewSwitch } from "@/components/PortfolioViewSwitch";
import TopBar from "./TopBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import WindowManager from "./WindowManager";
import StartLauncher from "./StartLauncher";
import { useWindowStore } from "@/store/useWindowStore";
import { localizedProfile, shellCopy } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { InasLogo } from "@/components/InasLogo";
import { useDesktopStore } from "@/store/useDesktopStore";
import { navigatePortfolio } from "@/lib/navigation";
import type { AppId, WindowPosition } from "@/types/os";

const ICON_STEP_X = 104;
const ICON_STEP_Y = 94;

function defaultIconPositions(width: number, columns: number): Record<AppId, WindowPosition> {
  const startX = width - columns * ICON_STEP_X - 12;
  return desktopApps.reduce(
    (positions, app, index) => {
      positions[app.id] = {
        x: startX + (index % columns) * ICON_STEP_X,
        y: 54 + Math.floor(index / columns) * ICON_STEP_Y,
      };
      return positions;
    },
    {} as Record<AppId, WindowPosition>
  );
}

export default function DesktopOS() {
  const hasOpenWindows = useWindowStore((s) =>
    Object.values(s.windows).some((w) => !w.minimized)
  );
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];
  const copy = shellCopy[language];
  const isSerbian = language === "sr";
  const featured = localizedProjects[language].filter((project) => project.group === "featured" && project.id !== "inasos").slice(0, 3);
  const iconPositions = useDesktopStore((s) => s.iconPositions);
  const resetDesktopLayout = useDesktopStore((s) => s.resetDesktopLayout);
  const contextMenu = useDesktopStore((s) => s.contextMenu);
  const openContextMenu = useDesktopStore((s) => s.openContextMenu);
  const closeContextMenu = useDesktopStore((s) => s.closeContextMenu);
  const theme = useDesktopStore((s) => s.theme);
  const toggleTheme = useDesktopStore((s) => s.toggleTheme);
  const launcherOpen = useDesktopStore((s) => s.launcherOpen);
  const openLauncher = useDesktopStore((s) => s.openLauncher);
  const closeLauncher = useDesktopStore((s) => s.closeLauncher);
  const closeMenus = useDesktopStore((s) => s.closeMenus);
  const launcherReturnFocus = useRef<HTMLElement | null>(null);
  const [{ width: viewportWidth, height: viewportHeight }, setViewport] = useState({ width: 1280, height: 800 });
  const rows = 1 + Math.max(0, Math.floor((viewportHeight - 54 - 94 - 82) / ICON_STEP_Y));
  const columns = Math.max(2, Math.ceil(desktopApps.length / rows));
  const arrangedPositions = defaultIconPositions(viewportWidth, columns);

  useEffect(() => {
    const syncViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const openWindow = useWindowStore((s) => s.openWindow);
  useEffect(() => () => {
    if (useDesktopStore.getState().launcherOpen) closeLauncher();
  }, [closeLauncher]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && contextMenu) closeContextMenu();
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (
        e.key.toLowerCase() === " " &&
        (e.metaKey || e.ctrlKey) &&
        !e.altKey
      ) {
        e.preventDefault();
        openLauncher();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeContextMenu, contextMenu, openLauncher]);

  const menuCopy =
    language === "sr"
      ? {
          arrange: "Složi ikonice",
          reset: "Resetuj desktop",
          theme: theme === "light" ? "Tamna tema" : "Svetla tema",
        }
      : {
          arrange: "Arrange icons",
          reset: "Reset desktop",
          theme: theme === "light" ? "Dark mode" : "Light mode",
        };

  const handleDesktopContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (
      target?.closest(
        "button,a,input,textarea,select,[role='dialog'],[data-os-topbar],[data-os-dock]"
      )
    ) {
      return;
    }
    e.preventDefault();
    openContextMenu({ x: e.clientX, y: e.clientY });
  };

  const workspace = (
    <div
      className="absolute inset-0"
      inert={launcherOpen}
      onFocusCapture={(event) => {
        if (event.target instanceof HTMLElement) launcherReturnFocus.current = event.target;
      }}
      onContextMenu={handleDesktopContextMenu}
      onMouseDown={() => {
        closeContextMenu();
        closeMenus();
      }}
    >
      <OSWallpaper />
      <TopBar
        onArrangeIcons={resetDesktopLayout}
        onResetDesktop={resetDesktopLayout}
      />

      <section
        className={`desktop-welcome ${hasOpenWindows ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-hidden={hasOpenWindows}
        inert={hasOpenWindows}
        style={{ maxWidth: `calc(100% - ${columns * ICON_STEP_X + 24}px - clamp(1.5rem, 6vw, 7rem))` }}
        aria-label={isSerbian ? "Portfolio" : "Portfolio welcome"}
      >
        <div className="flex items-center gap-3">
          <InasLogo showWordmark={false} markClassName="size-10 rounded-xl" />
          <div>
            <p className="os-kicker">InasOS</p>
            <p className="mt-0.5 text-xs text-[var(--os-muted)]">{isSerbian ? "Portfolio · Novi Pazar, Srbija" : "Portfolio · Novi Pazar, Serbia"}</p>
          </div>
        </div>
        <h1 className="mt-5 text-[clamp(2.5rem,5vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.065em]">{profile.name}</h1>
        <p className="mt-3 text-sm font-medium text-[var(--os-text)] sm:text-base">{profile.role}</p>
        <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--os-muted)] sm:text-base">{profile.tagline}</p>
        <div className="mt-4"><PortfolioViewSwitch language={language} view="interactive" /></div>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label={isSerbian ? "Brze veze" : "Portfolio shortcuts"}>
          <button type="button" className="os-action" onClick={() => navigatePortfolio("projects")}>
            <FolderOpen size={17} aria-hidden="true" /> {String(copy.projects)}
          </button>
          <button type="button" className="os-action" onClick={() => openWindow("contact")}><Mail size={16} aria-hidden="true" />{isSerbian ? "Kontakt" : "Contact"}</button>
          {profile.github && <a className="os-action" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon className="size-4" /> GitHub</a>}
        </nav>
        <div className="desktop-featured mt-6 border-t border-[var(--os-border)] pt-4">
          <p className="os-kicker">{isSerbian ? "Odabrani radovi" : "Selected work"}</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {featured.map((item) => (
              <li key={item.id}>
                <a className="desktop-project-link" href={`#projects/${item.id}`} onClick={(event) => {
                  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  navigatePortfolio("projects", item.id);
                }}>
                  <span className="min-w-0"><span className="block text-sm leading-tight font-semibold">{item.name}</span><span className="mt-1 block truncate text-xs text-[var(--os-muted)]">{item.tech.slice(0, 2).join(" · ")}</span></span>
                  <ArrowUpRight size={14} className="shrink-0 text-[var(--os-muted)]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {desktopApps.map((app) => (
        <DesktopIcon
          key={app.id}
          app={app}
          position={arrangedPositions[app.id]}
          customPosition={iconPositions[app.id]}
          viewport={{ width: viewportWidth, height: viewportHeight }}
        />
      ))}

      {contextMenu && (
        <div
          className="absolute z-[96] w-52 overflow-hidden rounded-xl border border-[color:var(--os-border)] bg-[var(--os-panel-strong)] p-1.5 text-[12px] text-[var(--os-text)] shadow-[0_24px_70px_-28px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          style={{
            left: Math.min(contextMenu.x, viewportWidth - 220),
            top: Math.min(contextMenu.y, viewportHeight - 150),
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <ContextButton
            icon={<Grid3X3 className="h-3.5 w-3.5" />}
            label={menuCopy.arrange}
            onClick={() => {
              resetDesktopLayout();
              closeContextMenu();
            }}
          />
          <ContextButton
            icon={<RotateCcw className="h-3.5 w-3.5" />}
            label={menuCopy.reset}
            onClick={() => {
              resetDesktopLayout();
              closeContextMenu();
            }}
          />
          <ContextButton
            icon={
              theme === "light" ? (
                <Moon className="h-3.5 w-3.5" />
              ) : (
                <Sun className="h-3.5 w-3.5" />
              )
            }
            label={menuCopy.theme}
            onClick={() => {
              toggleTheme();
              closeContextMenu();
            }}
          />
        </div>
      )}

      <WindowManager />
      <Dock />
    </div>
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      {workspace}
      <StartLauncher returnFocus={launcherReturnFocus} />
    </div>
  );
}

function ContextButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-[var(--os-control-hover)]"
    >
      <span className="text-[color:var(--os-accent)]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
