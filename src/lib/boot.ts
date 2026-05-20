// Boot preferences. The boot animation is part of the InasOS experience and
// plays on every full page load by default. Users can disable it permanently
// via Settings ("Show boot on startup"), and "Replay boot" always overrides
// that for a single run.

export const BOOT_SHOW_KEY = "inasos.boot.showOnStartup.v1";
const BOOT_REPLAY_KEY = "inasos.boot.replay";

export function getShowBootOnStartup(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(BOOT_SHOW_KEY) !== "0";
}

export function setShowBootOnStartup(value: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BOOT_SHOW_KEY, value ? "1" : "0");
}

export function requestBootReplay(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(BOOT_REPLAY_KEY, "1");
}

export function consumeBootReplay(): boolean {
  if (typeof window === "undefined") return false;
  const requested = window.sessionStorage.getItem(BOOT_REPLAY_KEY) === "1";
  if (requested) window.sessionStorage.removeItem(BOOT_REPLAY_KEY);
  return requested;
}
