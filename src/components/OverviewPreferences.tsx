"use client";

import { useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useDesktopStore } from "@/store/useDesktopStore";
import { useLanguageStore, type Language } from "@/store/useLanguageStore";

export function OverviewPreferences({ language }: { language: Language }) {
  const theme = useDesktopStore((state) => state.theme);

  useEffect(() => {
    void useDesktopStore.persist.rehydrate();
    useLanguageStore.getState().setLanguage(language);
    document.documentElement.lang = language === "sr" ? "sr-Latn" : "en";
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
  }, [theme]);

  return <ThemeToggle className="size-9 justify-center p-0" />;
}
