"use client";

import { useSyncExternalStore } from "react";
import { apps } from "@/data/apps";
import { projects } from "@/data/projects";
import type { AppId } from "@/types/os";
import { useWindowStore } from "@/store/useWindowStore";
import { useMobileStore } from "@/store/useMobileStore";

const eventName = "inasos:navigate";
export const desktopMediaQuery = "(min-width: 1024px) and (min-height: 480px)";
const subscribe = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
    window.removeEventListener(eventName, callback);
  };
};

export function parseLocation(hash: string): { app: AppId | null; project?: string } {
  const [app, project] = hash.replace(/^#/, "").split("/");
  if (!apps.some((item) => item.id === app)) return { app: null };
  return { app: app as AppId, project: app === "projects" && projects.some((item) => item.id === project) ? project : undefined };
}

export function navigatePortfolio(app: AppId | null, project?: string, replace = false) {
  const hash = app ? `#${app}${app === "projects" && project ? `/${project}` : ""}` : "";
  if (window.location.hash !== hash) {
    const fromFinder = !replace && Boolean(app) && parseLocation(window.location.hash).app === "finder";
    window.history[replace ? "replaceState" : "pushState"]({ fromFinder }, "", `${window.location.pathname}${window.location.search}${hash}`);
  }
  window.dispatchEvent(new Event(eventName));
}

export function usePortfolioLocation() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => "");
  return parseLocation(hash);
}

/** Keep browser Back/Forward, external links and both app surfaces in agreement. */
export function connectPortfolioNavigation() {
  const media = window.matchMedia(desktopMediaQuery);
  let applying = false;
  let lastProject: string | undefined;
  const apply = () => {
    if (applying) return;
    applying = true;
    try {
      const { app, project } = parseLocation(window.location.hash);
      if (app === "projects") lastProject = project;
      if (media.matches) {
        const store = useWindowStore.getState();
        if (app && store.activeWindowId !== app) store.openWindow(app);
        if (!app && store.activeWindowId) store.minimizeAll();
      } else {
        const store = useMobileStore.getState();
        if (app && store.activeAppId !== app) store.openApp(app);
        if (!app && store.activeAppId) store.goHome();
      }
    } finally { applying = false; }
  };
  const sync = (app: AppId | null, replace = false) => {
    if (applying) return;
    const current = parseLocation(window.location.hash);
    if (app === current.app) return;
    applying = true;
    try {
      navigatePortfolio(app, app === "projects" ? lastProject : undefined, replace);
    } finally {
      applying = false;
    }
  };
  const desktop = useWindowStore.subscribe((state, previous) => {
    if (media.matches && state.activeWindowId !== previous.activeWindowId) {
      const id = state.activeWindowId;
      const alreadyVisible = id && previous.windows[id] && !previous.windows[id].minimized;
      sync(id, Boolean(alreadyVisible));
    }
  });
  const mobile = useMobileStore.subscribe((state, previous) => {
    if (!media.matches && state.activeAppId !== previous.activeAppId) sync(state.activeAppId);
  });
  const stop = subscribe(apply);
  media.addEventListener("change", apply);
  apply();
  return () => { desktop(); mobile(); stop(); media.removeEventListener("change", apply); };
}
