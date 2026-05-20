"use client";

import { useEffect, useState } from "react";
import {
  BatteryFull,
  ChevronDown,
  HelpCircle,
  Monitor,
  Power,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";
import { useWindowStore } from "@/store/useWindowStore";
import { appName, localizedProfile } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { InasLogo } from "@/components/InasLogo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { GithubIcon } from "@/components/BrandIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDesktopStore, type DesktopMenuId } from "@/store/useDesktopStore";
import { cn } from "@/lib/cn";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // Initialize on the client to avoid SSR/locale mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30 * 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const formatTime = (d: Date) =>
  d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

const formatDate = (d: Date) =>
  d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

type Props = {
  onArrangeIcons: () => void;
  onResetDesktop: () => void;
};

export default function TopBar({ onArrangeIcons, onResetDesktop }: Props) {
  const now = useClock();
  const language = useLanguageStore((s) => s.language);
  const openWindow = useWindowStore((s) => s.openWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const closeAll = useWindowStore((s) => s.closeAll);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const windows = useWindowStore((s) => s.windows);
  const openLauncher = useDesktopStore((s) => s.openLauncher);
  const activeMenu = useDesktopStore((s) => s.activeMenu);
  const setActiveMenu = useDesktopStore((s) => s.setActiveMenu);
  const closeMenus = useDesktopStore((s) => s.closeMenus);
  const wallpaperIntensity = useDesktopStore((s) => s.wallpaperIntensity);
  const setWallpaperIntensity = useDesktopStore((s) => s.setWallpaperIntensity);
  const profile = localizedProfile[language];

  const activeTitle =
    activeWindowId && !windows[activeWindowId]?.minimized
      ? activeWindowId
      : null;
  const arrangeLabel = language === "sr" ? "Slozi" : "Arrange";
  const resetLabel = language === "sr" ? "Reset" : "Reset";
  const menuCopy =
    language === "sr"
      ? {
          file: "File",
          window: "Window",
          help: "Help",
          about: "O InasOS-u",
          settings: "Podešavanja",
          start: "Start",
          restart: "Restart",
          finder: "Otvori Finder",
          cv: "Otvori CV",
          contact: "Otvori Kontakt",
          minimize: "Minimizuj aktivni prozor",
          close: "Zatvori aktivni prozor",
          closeAll: "Zatvori sve prozore",
          terminal: "Terminal help",
          github: "GitHub profil",
          control: "Control Center",
          wallpaper: "Intenzitet pozadine",
        }
      : {
          file: "File",
          window: "Window",
          help: "Help",
          about: "About InasOS",
          settings: "Settings",
          start: "Start",
          restart: "Restart",
          finder: "Open Finder",
          cv: "Open CV",
          contact: "Open Contact",
          minimize: "Minimize active window",
          close: "Close active window",
          closeAll: "Close all windows",
          terminal: "Terminal help",
          github: "GitHub profile",
          control: "Control Center",
          wallpaper: "Wallpaper intensity",
        };

  const toggleMenu = (menu: DesktopMenuId) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const runMenuAction = (action: () => void) => {
    action();
    closeMenus();
  };

  return (
    <div
      className="absolute left-0 right-0 top-0 z-[90]"
      data-os-topbar
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex h-7 items-center justify-between border-b border-[color:var(--os-border)] bg-[var(--os-menubar)] px-3 text-[12.5px] text-[var(--os-text)] shadow-[0_8px_28px_-20px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="flex min-w-0 items-center gap-0.5 self-stretch">
          <div className="relative flex h-full items-center">
            <button
              type="button"
              onClick={() => toggleMenu("inas")}
              className={cn(
                "mr-0.5 flex h-full items-center rounded-md px-1.5 transition-colors hover:bg-[var(--os-control)]",
                activeMenu === "inas" && "bg-[var(--os-control-hover)]"
              )}
              aria-label="Open InasOS menu"
              aria-haspopup="menu"
              aria-expanded={activeMenu === "inas"}
            >
              <InasLogo compact showWordmark={false} />
            </button>
            {activeMenu === "inas" && (
              <MenuPopover className="left-0 top-full mt-1">
                <MenuItem label={menuCopy.about} onClick={() => runMenuAction(() => openWindow("about"))} />
                <MenuItem label={menuCopy.settings} onClick={() => runMenuAction(() => openWindow("settings"))} />
                <MenuItem label={menuCopy.start} onClick={() => runMenuAction(openLauncher)} />
                <MenuDivider />
                <MenuItem
                  label={menuCopy.restart}
                  icon={<Power className="h-3.5 w-3.5" />}
                  onClick={() => runMenuAction(() => window.location.reload())}
                />
              </MenuPopover>
            )}
          </div>

          <div className="relative flex h-full items-center">
            <TopMenuButton
              label="InasOS"
              active={activeMenu === "file"}
              onClick={() => toggleMenu("file")}
              bold
            />
            {activeMenu === "file" && (
              <MenuPopover className="left-0 top-full mt-1">
                <MenuItem label={menuCopy.finder} onClick={() => runMenuAction(() => openWindow("finder"))} />
                <MenuItem label={menuCopy.cv} onClick={() => runMenuAction(() => openWindow("cv"))} />
                <MenuItem label={menuCopy.contact} onClick={() => runMenuAction(() => openWindow("contact"))} />
              </MenuPopover>
            )}
          </div>

          <div className="relative flex h-full items-center">
            <TopMenuButton
              label={menuCopy.window}
              active={activeMenu === "window"}
              onClick={() => toggleMenu("window")}
            />
            {activeMenu === "window" && (
              <MenuPopover className="left-0 top-full mt-1">
                <MenuItem
                  label={menuCopy.minimize}
                  disabled={!activeTitle}
                  onClick={() =>
                    activeTitle && runMenuAction(() => minimizeWindow(activeTitle))
                  }
                />
                <MenuItem
                  label={menuCopy.close}
                  disabled={!activeTitle}
                  onClick={() =>
                    activeTitle && runMenuAction(() => closeWindow(activeTitle))
                  }
                />
                <MenuItem label={menuCopy.closeAll} onClick={() => runMenuAction(closeAll)} />
                <MenuDivider />
                <MenuItem label={arrangeLabel} onClick={() => runMenuAction(onArrangeIcons)} />
                <MenuItem label={resetLabel} onClick={() => runMenuAction(onResetDesktop)} />
              </MenuPopover>
            )}
          </div>

          <div className="relative flex h-full items-center">
            <TopMenuButton
              label={menuCopy.help}
              active={activeMenu === "help"}
              onClick={() => toggleMenu("help")}
            />
            {activeMenu === "help" && (
              <MenuPopover className="left-0 top-full mt-1">
                <MenuItem
                  label={menuCopy.terminal}
                  icon={<HelpCircle className="h-3.5 w-3.5" />}
                  onClick={() => runMenuAction(() => openWindow("terminal"))}
                />
                {profile.github && (
                  <MenuItem
                    label={menuCopy.github}
                    icon={<GithubIcon className="h-3.5 w-3.5" />}
                    onClick={() =>
                      runMenuAction(() =>
                        window.open(profile.github ?? "", "_blank", "noopener,noreferrer")
                      )
                    }
                  />
                )}
              </MenuPopover>
            )}
          </div>

          {activeTitle && (
            <>
              <span className="mx-1 hidden h-3 w-px bg-[var(--os-border-strong)] md:inline-block" />
              <span className="hidden max-w-40 truncate text-[var(--os-muted)] md:inline">
                {appName(activeTitle, language)}
              </span>
            </>
          )}
        </div>

        <div className="relative flex items-center gap-2 text-[var(--os-muted)]">
          <button
            type="button"
            onClick={() => toggleMenu("control")}
            className="hidden h-6 items-center gap-1.5 rounded-md px-1.5 text-[11.5px] text-[var(--os-text)] transition-colors hover:bg-[var(--os-control)] sm:inline-flex"
            aria-label="Open Control Center"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <ChevronDown className="h-3 w-3 text-[var(--os-muted)]" />
          </button>
          <div className="hidden items-center gap-2 text-[var(--os-muted)] sm:flex">
            <Wifi className="h-3.5 w-3.5" aria-hidden />
            <BatteryFull className="h-3.5 w-3.5" aria-hidden />
          </div>
          {now ? (
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="text-[var(--os-muted)]">{formatDate(now)}</span>
              <span className="font-medium text-[var(--os-text)]">
                {formatTime(now)}
              </span>
            </div>
          ) : (
            <span className="text-[var(--os-muted)]">--</span>
          )}

          {activeMenu === "control" && (
            <MenuPopover className="right-0 top-full mt-1 w-64 p-3">
              <div className="mb-3 text-[10.5px] uppercase tracking-[0.18em] text-[var(--os-muted)]">
                {menuCopy.control}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-[12px] text-[var(--os-text)]">
                    <Monitor className="h-3.5 w-3.5 text-[color:var(--os-accent)]" />
                    {menuCopy.wallpaper}
                  </span>
                  <span className="text-[11px] text-[var(--os-muted)]">
                    {wallpaperIntensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={wallpaperIntensity}
                  onChange={(e) =>
                    setWallpaperIntensity(Number(e.target.value))
                  }
                  aria-label={menuCopy.wallpaper}
                  className="w-full accent-orange-500"
                />
                <div className="flex items-center gap-2">
                  <ThemeToggle showLabel className="flex-1 justify-center" />
                  <LanguageToggle className="flex-1 justify-center" />
                </div>
              </div>
            </MenuPopover>
          )}
        </div>
      </div>
    </div>
  );
}

function TopMenuButton({
  label,
  active,
  onClick,
  className,
  bold,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  bold?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="menu"
      aria-expanded={active}
      className={cn(
        "inline-flex h-full items-center rounded-md px-2 text-[12px] text-[var(--os-text)] transition-colors hover:bg-[var(--os-control)]",
        bold ? "font-semibold" : "font-medium",
        active && "bg-[var(--os-control-hover)]",
        className
      )}
    >
      {label}
    </button>
  );
}

function MenuPopover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-[95] w-56 rounded-xl border border-[color:var(--os-border)] bg-[var(--os-panel-strong)] p-1.5 text-[12px] text-[var(--os-text)] shadow-[0_24px_70px_-28px_rgba(0,0,0,0.72)] backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function MenuItem({
  label,
  onClick,
  disabled,
  icon,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-[var(--os-control-hover)] disabled:cursor-not-allowed disabled:opacity-45"
    >
      {icon && <span className="text-[color:var(--os-accent)]">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

function MenuDivider() {
  return <div className="my-1 h-px bg-[var(--os-border)]" />;
}
