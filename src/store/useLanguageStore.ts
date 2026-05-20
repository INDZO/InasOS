"use client";

import { create } from "zustand";

export type Language = "en" | "sr";

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
  toggleLanguage: () =>
    set({ language: get().language === "en" ? "sr" : "en" }),
}));
