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

  const [size, setSize] = useState({
    width: app.defaultSize?.width ?? DEFAULT_W,
    height: app.defaultSize?.height ?? DEFAULT_H,
  });
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    const compute = () => {
      const vw = globalThis.window?.innerWidth ?? 1280;
      const vh = globalThis.window?.innerHeight ?? 800;
      setSize({
        width: clampSize(app.defaultSize?.width ?? DEFAULT_W, vw, 80),
        height: clampSize(
          app.defaultSize?.height ?? DEFAULT_H,
          vh,
          TOPBAR_OFFSET + 90
        ),
      });
    };
    compute();
    globalThis.window?.addEventListener("resize", compute);
    return () => globalThis.window?.removeEventListener("resize", compute);
  }, [app.defaultSize?.width, app.defaultSize?.height]);

  const [pos, setPos] = useState(win.position);
  const posRef = useRef(win.position);

  useEffect(() => {
    if (
      posRef.current.x !== win.position.x ||
      posRef.current.y !== win.position.y
    ) {
      posRef.current = win.position;
      setPos(win.position);
    }
  }, [win.position]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
      focusWindow(app.id);
      if (maximized) return;
      const start = { x: e.clientX, y: e.clientY };
      const origin = { ...posRef.current };

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - start.x;
        const dy = ev.clientY - start.y;
        const vw = globalThis.window?.innerWidth ?? 1600;
        const vh = globalThis.window?.innerHeight ?? 900;
        // keep at least 120px of the window visible
        const minX = -size.width + 120;
        const maxX = vw - 120;
        const minY = TOPBAR_OFFSET;
        const maxY = vh - 80;
        const next = {
          x: Math.min(Math.max(minX, origin.x + dx), maxX),
          y: Math.min(Math.max(minY, origin.y + dy), maxY),
        };
        posRef.current = next;
        setPos(next);
      };

      const onUp = () => {
        updateWindowPosition(app.id, posRef.current);
        globalThis.window?.removeEventListener("mousemove", onMove);
        globalThis.window?.removeEventListener("mouseup", onUp);
      };

      globalThis.window?.addEventListener("mousemove", onMove);
      globalThis.window?.addEventListener("mouseup", onUp);
    },
    [app.id, focusWindow, updateWindowPosition, size.width, maximized]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 6 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      style={{
        width: maximized ? "calc(100vw - 24px)" : size.width,
        height: maximized ? "calc(100dvh - 50px)" : size.height,
        left: maximized ? 12 : pos.x,
        top: maximized ? 34 : pos.y,
        zIndex: win.zIndex,
      }}
      onMouseDown={() => focusWindow(app.id)}
      className={cn(
        "pointer-events-auto absolute flex flex-col overflow-hidden border bg-[var(--os-window)] text-[var(--os-text)] backdrop-blur-2xl",
        maximized ? "rounded-[16px]" : "rounded-[18px]",
        active
          ? "border-[color:var(--os-border-strong)] shadow-[0_32px_110px_-36px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)]"
          : "border-[color:var(--os-border)] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] opacity-90"
      )}
      role="dialog"
      aria-label={title}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => setMaximized((current) => !current)}
        className={cn(
          "flex h-11 shrink-0 select-none items-center justify-between gap-2 border-b border-[color:var(--os-border)] bg-[var(--os-window-head)] px-3",
          maximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" data-no-drag>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(app.id);
              }}
              aria-label={`Close ${title}`}
              className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] ring-1 ring-black/20 transition-transform hover:scale-110"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(app.id);
              }}
              aria-label={`Minimize ${title}`}
              className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e] ring-1 ring-black/20 transition-transform hover:scale-110"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMaximized((current) => !current);
              }}
              aria-label={`${maximized ? "Restore" : "Maximize"} ${title}`}
              className="h-3.5 w-3.5 rounded-full bg-[#28c840] ring-1 ring-black/20 transition-transform hover:scale-110"
            />
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
        className={cn(
          "flex-1",
          app.id === "finder" ? "overflow-hidden" : "os-scroll overflow-y-auto"
        )}
      >
        <div className={cn(app.id === "finder" ? "h-full" : "px-6 py-5")}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
