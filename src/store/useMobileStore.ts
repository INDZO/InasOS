"use client";

import { create } from "zustand";
import type { AppId } from "@/types/os";

type MobileState = {
  activeAppId: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: () => void;
  goHome: () => void;
};

export const useMobileStore = create<MobileState>((set) => ({
  activeAppId: null,
  openApp: (id) => set({ activeAppId: id }),
  closeApp: () => set({ activeAppId: null }),
  goHome: () => set({ activeAppId: null }),
}));
