"use client";

import { useRef, useState } from "react";
import type { AppDefinition } from "@/types/os";
import { AppIcon } from "@/components/AppIcon";
import { useWindowStore } from "@/store/useWindowStore";
import { cn } from "@/lib/cn";
import { appName, appShortName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useDesktopStore } from "@/store/useDesktopStore";
import type { WindowPosition } from "@/types/os";

type Props = {
  app: AppDefinition;
  position: WindowPosition;
  className?: string;
};

const ICON_W = 92;
const ICON_H = 82;
const TOP_SAFE_AREA = 48;
const EDGE = 12;
const DRAG_THRESHOLD = 5;

function clampIcon(position: WindowPosition): WindowPosition {
  if (typeof window === "undefined") return position;
  return {
    x: Math.min(Math.max(EDGE, position.x), window.innerWidth - ICON_W - EDGE),
    y: Math.min(
      Math.max(TOP_SAFE_AREA, position.y),
      window.innerHeight - ICON_H - 82
    ),
  };
}

export default function DesktopIcon({ app, position, className }: Props) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const isOpen = useWindowStore((s) => Boolean(s.windows[app.id]));
  const setIconPosition = useDesktopStore((s) => s.setIconPosition);
  const language = useLanguageStore((s) => s.language);
  const title = appName(app.id, language);
  const [dragPosition, setDragPosition] = useState<WindowPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef(position);
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const open = () => openWindow(app.id);
  const displayPosition = dragPosition ?? position;

  const beginDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const origin = clampIcon(displayPosition);

    const start = {
      dragging: false,
      startX: e.clientX,
      startY: e.clientY,
      originX: origin.x,
      originY: origin.y,
    };
    dragRef.current = start;
    positionRef.current = origin;
    e.currentTarget.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - start.startX;
      const dy = ev.clientY - start.startY;
      const dragging =
        start.dragging ||
        Math.abs(dx) > DRAG_THRESHOLD ||
        Math.abs(dy) > DRAG_THRESHOLD;
      const next = clampIcon({
        x: start.originX + dx,
        y: start.originY + dy,
      });
      if (dragging && !dragRef.current.dragging) {
        setIsDragging(true);
      }
      dragRef.current.dragging = dragging;
      positionRef.current = next;
      setDragPosition(next);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (dragRef.current.dragging) {
        setIconPosition(app.id, positionRef.current);
        setDragPosition(null);
        setIsDragging(false);
      } else {
        open();
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  };

  return (
    <button
      type="button"
      onPointerDown={beginDrag}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      style={{ left: displayPosition.x, top: displayPosition.y }}
      className={cn(
        "group absolute z-20 flex w-[92px] touch-none select-none flex-col items-center gap-1.5 rounded-2xl p-2 text-center transition-colors",
        "cursor-default hover:bg-[var(--os-control)] focus:outline-none focus-visible:bg-[var(--os-control-hover)] active:cursor-grabbing",
        className
      )}
      aria-label={`Open desktop app ${title}`}
      aria-grabbed={isDragging}
    >
      <span
        className={cn(
          "relative grid h-14 w-14 place-items-center rounded-[17px] border bg-gradient-to-br from-white/[0.24] via-white/[0.08] to-white/[0.02] text-[var(--os-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_24px_-16px_rgba(0,0,0,0.75)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-orange-300/50 group-hover:from-orange-400/22",
          isOpen ? "border-orange-400/50" : "border-[color:var(--os-border)]"
        )}
      >
        <AppIcon
          name={app.iconName}
          className="h-6 w-6 text-[color:var(--os-accent)]"
          strokeWidth={1.8}
        />
        {isOpen && (
          <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-orange-400" />
        )}
      </span>
      <span className="line-clamp-1 rounded-md bg-black/18 px-1.5 text-[11.5px] font-medium leading-tight text-[var(--os-text)] shadow-sm backdrop-blur-sm">
        {appShortName(app.id, language)}
      </span>
    </button>
  );
}
