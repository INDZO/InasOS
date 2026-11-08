import { createJSONStorage } from "zustand/middleware";

// Browsing with storage blocked must not prevent the portfolio from opening.
export const safeStorage = createJSONStorage(() => ({
  getItem: (name: string) => { try { return localStorage.getItem(name); } catch { return null; } },
  setItem: (name: string, value: string) => { try { localStorage.setItem(name, value); } catch { /* Session defaults remain usable. */ } },
  removeItem: (name: string) => { try { localStorage.removeItem(name); } catch { /* Storage may be disabled. */ } },
}));
