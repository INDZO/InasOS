"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { AppDefinition, OSWindow } from "@/types/os";
import { useWindowStore } from "@/store/useWindowStore";
import { AppIcon } from "@/components/AppIcon";
import { cn } from "@/lib/cn";
import { appName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";

type Props = {
  app: AppDefinition;
  window: OSWindow;
  active: boolean;
  children: React.ReactNode;
};

const DEFAULT_W = 720;
const DEFAULT_H = 520;
const TOPBAR_OFFSET = 38;

function clampSize(
  preferred: number,
  viewport: number,
  margin: number,
  min = 320
) {
  const max = Math.max(min, viewport - margin);
  return Math.min(preferred, max);
}

export default function DesktopWindow({
  app,
  window: win,
  active,
  children,
}: Props) {
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const updateWindowPosition = useWindowStore((s) => s.updateWindowPosition);
  const language = useLanguageStore((s) => s.language);
  const title = appName(app.id, language);
  const scrolls = app.id !== "finder";

  const [size, setSize] = useState({
    width: app.defaultSize?.width ?? DEFAULT_W,
    height: app.defaultSize?.height ?? DEFAULT_H,
  });
  const [maximized, setMaximized] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dragCleanup = useRef<(() => void) | null>(null);
  const [pos, setPos] = useState(win.position);
  const posRef = useRef(win.position);

  const dismiss = (action: (id: AppDefinition["id"]) => void) => {
    action(app.id);
    if (useWindowStore.getState().activeWindowId) return;
    requestAnimationFrame(() => {
      if (useWindowStore.getState().activeWindowId) return;
      const button = document.querySelector<HTMLButtonElement>(`[data-dock-app="${app.id}"]`);
      (button ?? document.querySelector<HTMLButtonElement>("[data-os-dock] button"))?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    if (!active || win.minimized) return;
    if (!dialogRef.current?.contains(document.activeElement)) {
      dialogRef.current?.focus({ preventScroll: true });
    }
  }, [active, win.minimized]);

  useEffect(() => () => dragCleanup.current?.(), []);

  useEffect(() => {
    const compute = () => {
      const vw = globalThis.window?.innerWidth ?? 1280;
      const vh = globalThis.window?.innerHeight ?? 800;
      const width = clampSize(app.defaultSize?.width ?? DEFAULT_W, vw, 48);
      const height = clampSize(
          app.defaultSize?.height ?? DEFAULT_H,
          vh,
          TOPBAR_OFFSET + 108,
          180
        );
      setSize({ width, height });
      const next = {
        x: Math.max(12, Math.min(posRef.current.x, vw - width - 12)),
        y: Math.max(TOPBAR_OFFSET, Math.min(posRef.current.y, vh - height - 94)),
      };
      posRef.current = next;
      setPos(next);
      updateWindowPosition(app.id, next);
    };
    compute();
    globalThis.window?.addEventListener("resize", compute);
    return () => globalThis.window?.removeEventListener("resize", compute);
  }, [app.id, app.defaultSize?.width, app.defaultSize?.height, updateWindowPosition]);

  useEffect(() => {
    if (
      posRef.current.x !== win.position.x ||
      posRef.current.y !== win.position.y
    ) {
      posRef.current = win.position;
      setPos(win.position);
    }
  }, [win.position]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
      focusWindow(app.id);
      if (maximized) return;
      e.preventDefault();
      dragCleanup.current?.();
      const start = { x: e.clientX, y: e.clientY };
      const origin = { ...posRef.current };

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - start.x;
        const dy = ev.clientY - start.y;
        const vw = globalThis.window?.innerWidth ?? 1600;
        const vh = globalThis.window?.innerHeight ?? 900;
        const next = {
          x: Math.max(12, Math.min(origin.x + dx, vw - size.width - 12)),
          y: Math.max(TOPBAR_OFFSET, Math.min(origin.y + dy, vh - size.height - 94)),
        };
        posRef.current = next;
        setPos(next);
      };

      const onUp = () => {
        updateWindowPosition(app.id, posRef.current);
        cleanup();
      };
      const cleanup = () => {
        globalThis.window?.removeEventListener("pointermove", onMove);
        globalThis.window?.removeEventListener("pointerup", onUp);
        globalThis.window?.removeEventListener("pointercancel", onUp);
        dragCleanup.current = null;
      };
      dragCleanup.current = cleanup;
      globalThis.window?.addEventListener("pointermove", onMove);
      globalThis.window?.addEventListener("pointerup", onUp);
      globalThis.window?.addEventListener("pointercancel", onUp);
    },
    [app.id, focusWindow, updateWindowPosition, size, maximized]
  );

  return (
    <motion.div
      ref={dialogRef}
      initial={{ opacity: 0, scale: 0.97, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 6 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      style={{
        width: maximized ? "calc(100vw - 24px)" : size.width,
        height: maximized ? "calc(100dvh - 134px)" : size.height,
        left: maximized ? 12 : pos.x,
        top: maximized ? TOPBAR_OFFSET : pos.y,
        zIndex: win.zIndex,
        display: win.minimized ? "none" : undefined,
      }}
      onPointerDown={() => focusWindow(app.id)}
      onFocus={() => focusWindow(app.id)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !event.defaultPrevented) {
          event.stopPropagation();
          dismiss(closeWindow);
        }
      }}
      className={cn(
        "pointer-events-auto absolute flex flex-col overflow-hidden border bg-[var(--os-window)] text-[var(--os-text)] backdrop-blur-2xl",
        maximized ? "rounded-[16px]" : "rounded-[18px]",
        active
          ? "border-[color:var(--os-border-strong)] shadow-[0_32px_110px_-36px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)]"
          : "border-[color:var(--os-border)] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] opacity-90"
      )}
      role="dialog"
      aria-label={title}
      aria-hidden={win.minimized}
      inert={win.minimized}
      tabIndex={-1}
      data-app-window={app.id}
    >
      {/* Title bar */}
      <div
        onPointerDown={handlePointerDown}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest("[data-no-drag]")) setMaximized((current) => !current);
        }}
        className={cn(
          "flex h-12 shrink-0 touch-none select-none items-center justify-between gap-2 border-b border-[color:var(--os-border)] bg-[var(--os-window-head)] px-3",
          maximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="group/controls flex items-center gap-0.5" data-no-drag>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss(closeWindow);
              }}
              aria-label={`${language === "sr" ? "Zatvori" : "Close"} ${title}`}
              className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--os-control)]"
            ><span aria-hidden className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff5f57] text-[11px] leading-none text-black/70"><span className="opacity-0 group-hover/controls:opacity-100 group-focus-within/controls:opacity-100">×</span></span></button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss(minimizeWindow);
              }}
              aria-label={`${language === "sr" ? "Minimizuj" : "Minimize"} ${title}`}
              className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--os-control)]"
            ><span aria-hidden className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ffbd2e] text-[11px] leading-none text-black/70"><span className="opacity-0 group-hover/controls:opacity-100 group-focus-within/controls:opacity-100">−</span></span></button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMaximized((current) => !current);
              }}
              aria-label={`${language === "sr" ? (maximized ? "Vrati veličinu" : "Uvećaj") : (maximized ? "Restore" : "Maximize")} ${title}`}
              aria-pressed={maximized}
              className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--os-control)]"
            ><span aria-hidden className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#28c840] text-[10px] leading-none text-black/70"><span className="opacity-0 group-hover/controls:opacity-100 group-focus-within/controls:opacity-100">↗</span></span></button>
          </div>
          <div className="ml-1 flex items-center gap-2 text-[12px] text-[var(--os-muted)]">
            <AppIcon
              name={app.iconName}
              className="h-3.5 w-3.5 text-[color:var(--os-accent)]"
              strokeWidth={1.8}
            />
            <span className="font-medium text-[var(--os-text)]">{title}</span>
          </div>
        </div>
        <div className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--os-subtle)]">
          InasOS
        </div>
      </div>

      {/* Content */}
      <div
        role={scrolls ? "region" : undefined}
        aria-label={scrolls ? (language === "sr" ? `Sadržaj: ${title}` : `${title} content`) : undefined}
        tabIndex={scrolls ? 0 : undefined}
        className={cn(
          "min-h-0 flex-1",
          scrolls ? "os-scroll overflow-y-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--os-accent)]" : "overflow-hidden"
        )}
      >
        <div className={scrolls ? "px-6 py-5" : "h-full"}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
