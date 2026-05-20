"use client";

import { useWindowStore } from "@/store/useWindowStore";
import { appById } from "@/data/apps";
import { AppIcon } from "@/components/AppIcon";
import { appName, appShortName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function MinimizedTray() {
  const windows = useWindowStore((s) => s.windows);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const language = useLanguageStore((s) => s.language);

  const minimized = Object.values(windows).filter((w) => w.minimized);

  if (minimized.length === 0) return null;

  return (
    <div className="pointer-events-none absolute bottom-3 left-3 z-[60] flex gap-2">
      {minimized.map((w) => {
        const app = appById(w.id);
        if (!app) return null;
        const title = appName(app.id, language);
        return (
          <button
            key={w.id}
            onClick={() => restoreWindow(w.id)}
            aria-label={`Restore ${title}`}
            className="pointer-events-auto group flex items-center gap-2 rounded-xl border border-[color:var(--os-border)] bg-[var(--os-panel)] px-2.5 py-1.5 text-[12px] text-[var(--os-text)] backdrop-blur-xl hover:border-orange-400/30"
          >
            <AppIcon
              name={app.iconName}
              className="h-3.5 w-3.5 text-[color:var(--os-accent)]"
              strokeWidth={1.8}
            />
            {appShortName(app.id, language)}
          </button>
        );
      })}
    </div>
  );
}
