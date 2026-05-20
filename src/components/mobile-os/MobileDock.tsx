"use client";

import { dockApps } from "@/data/apps";
import { useMobileStore } from "@/store/useMobileStore";
import { AppIcon } from "@/components/AppIcon";
import { appName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function MobileDock() {
  const openApp = useMobileStore((s) => s.openApp);
  const language = useLanguageStore((s) => s.language);
  const mobileDockApps = dockApps.filter((app) =>
    ["finder", "terminal", "contact", "settings"].includes(app.id)
  );

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-around rounded-[24px] border border-[color:var(--os-border)] bg-[var(--os-panel)] px-2 py-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl">
        {mobileDockApps.map((app) => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            aria-label={`Open mobile dock app ${appName(app.id, language)}`}
            className="grid h-12 w-12 place-items-center rounded-2xl border border-[color:var(--os-border)] bg-gradient-to-br from-white/[0.22] via-white/[0.08] to-white/[0.02] transition-transform active:scale-95"
          >
            <AppIcon
              name={app.iconName}
              className="h-5 w-5 text-[color:var(--os-accent)]"
              strokeWidth={1.7}
            />
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-center">
        <span className="h-1 w-32 rounded-full bg-[var(--os-control)]" />
      </div>
    </div>
  );
}
