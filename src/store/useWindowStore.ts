"use client";

import { create } from "zustand";
import type { AppId, OSWindow, WindowPosition } from "@/types/os";
import { appById } from "@/data/apps";

type WindowState = {
  windows: Record<string, OSWindow>;
  order: AppId[];
  activeWindowId: AppId | null;
  nextZ: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  minimizeAll: () => void;
  restoreWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updateWindowPosition: (id: AppId, position: WindowPosition) => void;
  closeAll: () => void;
};

const frontmostWindow = (windows: Record<string, OSWindow>): AppId | null =>
  Object.values(windows)
    .filter((window) => !window.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;

const initialPosition = (id: AppId, index: number): WindowPosition => {
  const def = appById(id);
  const offset = (index % 5) * 28;
  if (typeof window === "undefined") {
    return { x: 120 + offset, y: 90 + offset };
  }
  const w = def?.defaultSize?.width ?? 720;
  const h = def?.defaultSize?.height ?? 520;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const x = Math.max(40, Math.round((vw - w) / 2 + offset - 60));
  const y = Math.max(60, Math.round((vh - h) / 2 + offset - 80));
  return { x, y };
};

export const useWindowStore = create<WindowState>((set, get) => ({
  windows: {},
  order: [],
  activeWindowId: null,
  nextZ: 10,
  openWindow: (id) => {
    const existing = get().windows[id];
    const nextZ = get().nextZ + 1;
    if (existing) {
      set((s) => ({
        windows: {
          ...s.windows,
          [id]: { ...existing, minimized: false, zIndex: nextZ },
        },
        activeWindowId: id,
        nextZ,
      }));
      return;
    }
    const idx = get().order.length;
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: {
          id,
          zIndex: nextZ,
          minimized: false,
          position: initialPosition(id, idx),
        },
      },
      order: [...s.order, id],
      activeWindowId: id,
      nextZ,
    }));
  },
  closeWindow: (id) => {
    set((s) => {
      const { [id]: _removed, ...rest } = s.windows;
      void _removed;
      const order = s.order.filter((x) => x !== id);
      const activeWindowId =
        s.activeWindowId === id
          ? frontmostWindow(rest)
          : s.activeWindowId;
      return { windows: rest, order, activeWindowId };
    });
  },
  minimizeWindow: (id) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      const windows = { ...s.windows, [id]: { ...w, minimized: true } };
      return {
        windows,
        activeWindowId: s.activeWindowId === id ? frontmostWindow(windows) : s.activeWindowId,
      };
    });
  },
  minimizeAll: () => set((state) => ({
    windows: Object.fromEntries(Object.entries(state.windows).map(([id, window]) =>
      [id, window.minimized ? window : { ...window, minimized: true }]
    )),
    activeWindowId: null,
  })),
  restoreWindow: (id) => {
    const nextZ = get().nextZ + 1;
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return {
        windows: {
          ...s.windows,
          [id]: { ...w, minimized: false, zIndex: nextZ },
        },
        activeWindowId: id,
        nextZ,
      };
    });
  },
  focusWindow: (id) => {
    const nextZ = get().nextZ + 1;
    set((s) => {
      const w = s.windows[id];
      if (!w || w.minimized || s.activeWindowId === id) return s;
      return {
        windows: { ...s.windows, [id]: { ...w, zIndex: nextZ } },
        activeWindowId: id,
        nextZ,
      };
    });
  },
  updateWindowPosition: (id, position) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return { windows: { ...s.windows, [id]: { ...w, position } } };
    });
  },
  closeAll: () => set({ windows: {}, order: [], activeWindowId: null, nextZ: 10 }),
}));
