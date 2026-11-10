// The startup animation is on by default. Settings can turn it off or replay it once.

export const BOOT_SHOW_KEY = "inasos.boot.showOnStartup.v1";
const BOOT_REPLAY_KEY = "inasos.boot.replay";

function readStorage(key: string, session = false): string | null {
  if (typeof window === "undefined") return null;
  try {
    return (session ? window.sessionStorage : window.localStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null, session = false): void {
  if (typeof window === "undefined") return;
  try {
    const storage = session ? window.sessionStorage : window.localStorage;
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  } catch {
    // Private browsing and blocked storage must not prevent opening the site.
  }
}

export function getShowBootOnStartup(): boolean {
  return readStorage(BOOT_SHOW_KEY) !== "0";
}

export function setShowBootOnStartup(value: boolean): void {
  writeStorage(BOOT_SHOW_KEY, value ? "1" : "0");
}

export function requestBootReplay(): void {
  writeStorage(BOOT_REPLAY_KEY, "1", true);
}

export function consumeBootReplay(): boolean {
  const requested = readStorage(BOOT_REPLAY_KEY, true) === "1";
  if (requested) writeStorage(BOOT_REPLAY_KEY, null, true);
  return requested;
}
