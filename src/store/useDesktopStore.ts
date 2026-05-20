"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppId, WindowPosition } from "@/types/os";

export type AppearanceTheme = "dark" | "light";
export type DesktopMenuId = "inas" | "file" | "window" | "help" | "control";

type DesktopState = {
  theme: AppearanceTheme;
  iconPositions: Partial<Record<AppId, WindowPosition>>;
  contextMenu: WindowPosition | null;
  launcherOpen: boolean;
  activeMenu: DesktopMenuId | null;
  wallpaperIntensity: number;
  setTheme: (theme: AppearanceTheme) => void;
  toggleTheme: () => void;
  setIconPosition: (id: AppId, position: WindowPosition) => void;
  arrangeIcons: (positions: Record<AppId, WindowPosition>) => void;
  resetDesktopLayout: () => void;
  openContextMenu: (position: WindowPosition) => void;
  closeContextMenu: () => void;
  openLauncher: () => void;
  closeLauncher: () => void;
  toggleLauncher: () => void;
  setActiveMenu: (menu: DesktopMenuId | null) => void;
  closeMenus: () => void;
  setWallpaperIntensity: (value: number) => void;
};

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      iconPositions: {},
      contextMenu: null,
      launcherOpen: false,
      activeMenu: null,
      wallpaperIntensity: 70,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({ theme: get().theme === "dark" ? "light" : "dark" }),
      setIconPosition: (id, position) =>
        set((state) => ({
          iconPositions: { ...state.iconPositions, [id]: position },
        })),
      arrangeIcons: (positions) => set({ iconPositions: positions }),
      resetDesktopLayout: () => set({ iconPositions: {} }),
      openContextMenu: (position) => set({ contextMenu: position }),
      closeContextMenu: () => set({ contextMenu: null }),
      openLauncher: () => set({ launcherOpen: true, activeMenu: null }),
      closeLauncher: () => set({ launcherOpen: false }),
      toggleLauncher: () =>
        set((state) => ({ launcherOpen: !state.launcherOpen, activeMenu: null })),
      setActiveMenu: (menu) => set({ activeMenu: menu, launcherOpen: false }),
      closeMenus: () => set({ activeMenu: null }),
      setWallpaperIntensity: (value) =>
        set({ wallpaperIntensity: Math.min(100, Math.max(0, Math.round(value))) }),
    }),
    {
      name: "inasos.desktop.v2",
      partialize: (state) => ({
        theme: state.theme,
        iconPositions: state.iconPositions,
        wallpaperIntensity: state.wallpaperIntensity,
      }),
    }
  )
);
