"use client";

import { useEffect, useMemo, useState } from "react";
import { Grid3X3, Moon, RotateCcw, Sun } from "lucide-react";
import { desktopApps } from "@/data/apps";
import OSWallpaper from "@/components/OSWallpaper";
import TopBar from "./TopBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import WindowManager from "./WindowManager";
import MinimizedTray from "./MinimizedTray";
import StartLauncher from "./StartLauncher";
import { useWindowStore } from "@/store/useWindowStore";
import { localizedProfile, shellCopy } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { InasLogo } from "@/components/InasLogo";
import { useDesktopStore } from "@/store/useDesktopStore";
import type { AppId, WindowPosition } from "@/types/os";

const ICON_STEP_X = 104;
const ICON_STEP_Y = 88;
const ICONS_PER_ROW = 2;

function defaultIconPositions(width: number): Record<AppId, WindowPosition> {
  const startX = Math.max(24, width - 220);
  return desktopApps.reduce(
    (positions, app, index) => {
      positions[app.id] = {
        x: startX + (index % ICONS_PER_ROW) * ICON_STEP_X,
        y: 64 + Math.floor(index / ICONS_PER_ROW) * ICON_STEP_Y,
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
  const iconPositions = useDesktopStore((s) => s.iconPositions);
  const arrangeIcons = useDesktopStore((s) => s.arrangeIcons);
  const resetDesktopLayout = useDesktopStore((s) => s.resetDesktopLayout);
  const contextMenu = useDesktopStore((s) => s.contextMenu);
  const openContextMenu = useDesktopStore((s) => s.openContextMenu);
  const closeContextMenu = useDesktopStore((s) => s.closeContextMenu);
  const theme = useDesktopStore((s) => s.theme);
  const toggleTheme = useDesktopStore((s) => s.toggleTheme);
  const openLauncher = useDesktopStore((s) => s.openLauncher);
  const closeMenus = useDesktopStore((s) => s.closeMenus);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [viewportHeight, setViewportHeight] = useState(800);
  const arrangedPositions = useMemo(
    () => defaultIconPositions(viewportWidth),
    [viewportWidth]
  );

  useEffect(() => {
    const syncViewport = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const openWindow = useWindowStore((s) => s.openWindow);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        openWindow("terminal");
      } else if (e.key === "a" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        openWindow("about");
      } else if (e.key === "p" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        openWindow("projects");
      } else if (
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
  }, [openLauncher, openWindow]);

  const menuCopy =
    language === "sr"
      ? {
          arrange: "Slozi ikonice",
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

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onContextMenu={handleDesktopContextMenu}
      onMouseDown={() => {
        closeContextMenu();
        closeMenus();
      }}
    >
      <OSWallpaper />
      <TopBar
        onArrangeIcons={() => arrangeIcons(arrangedPositions)}
        onResetDesktop={resetDesktopLayout}
      />

      {desktopApps.map((app) => (
        <DesktopIcon
          key={app.id}
          app={app}
          position={iconPositions[app.id] ?? arrangedPositions[app.id]}
        />
      ))}

      <div
        className={`pointer-events-none absolute left-8 top-20 z-10 max-w-[460px] transition-opacity duration-300 ${
          hasOpenWindows ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={hasOpenWindows}
      >
        <div className="mb-5">
          <InasLogo markClassName="h-14 w-14 rounded-[16px]" />
        </div>
        <div className="terminal-font text-[10.5px] uppercase tracking-[0.28em] text-[color:var(--os-accent)]">
          {"// developer workstation"}
        </div>
        <h1 className="mt-3 text-[48px] font-semibold leading-[1.02] tracking-tight text-[var(--os-text)]">
          {profile.name}
        </h1>
        <p className="mt-1 text-[14px] text-[var(--os-muted)]">{profile.role}</p>
        <p className="mt-4 max-w-[440px] text-[13.5px] leading-6 text-[var(--os-text)]">
          {profile.tagline}
        </p>

        <div className="pointer-events-auto mt-6 inline-flex items-center gap-3 rounded-xl border border-[color:var(--os-border)] bg-[var(--os-panel)] px-3 py-2 text-[11.5px] text-[var(--os-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <span>{copy.shortcuts as string}</span>
          <kbd className="rounded border border-[color:var(--os-border)] bg-[var(--os-control)] px-1.5 py-0.5 terminal-font text-[10.5px] text-[var(--os-text)]">
            T
          </kbd>
          <span className="text-[var(--os-muted)]">{copy.terminal as string}</span>
          <span className="text-[var(--os-subtle)]">·</span>
          <kbd className="rounded border border-[color:var(--os-border)] bg-[var(--os-control)] px-1.5 py-0.5 terminal-font text-[10.5px] text-[var(--os-text)]">
            P
          </kbd>
          <span className="text-[var(--os-muted)]">{copy.projects as string}</span>
          <span className="text-[var(--os-subtle)]">·</span>
          <kbd className="rounded border border-[color:var(--os-border)] bg-[var(--os-control)] px-1.5 py-0.5 terminal-font text-[10.5px] text-[var(--os-text)]">
            A
          </kbd>
          <span className="text-[var(--os-muted)]">{copy.about as string}</span>
        </div>
      </div>

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
              arrangeIcons(arrangedPositions);
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
      <MinimizedTray />
      <Dock />
      <StartLauncher />
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
