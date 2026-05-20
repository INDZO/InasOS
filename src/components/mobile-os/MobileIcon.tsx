"use client";

import type { AppDefinition } from "@/types/os";
import { AppIcon } from "@/components/AppIcon";
import { useMobileStore } from "@/store/useMobileStore";
import { appName, appShortName } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function MobileIcon({ app }: { app: AppDefinition }) {
  const openApp = useMobileStore((s) => s.openApp);
  const language = useLanguageStore((s) => s.language);
  const title = appName(app.id, language);
  return (
    <button
      onClick={() => openApp(app.id)}
      aria-label={`Open mobile app ${title}`}
      className="group flex min-w-0 flex-col items-center gap-1.5 active:opacity-80"
    >
      <span className="grid h-[62px] w-[62px] place-items-center rounded-[18px] border border-[color:var(--os-border)] bg-gradient-to-br from-white/[0.22] via-white/[0.08] to-white/[0.02] text-[color:var(--os-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_26px_-16px_rgba(0,0,0,0.6)] transition-transform group-active:scale-95">
        <AppIcon name={app.iconName} className="h-7 w-7" strokeWidth={1.7} />
      </span>
      <span className="line-clamp-1 max-w-[68px] rounded bg-black/10 px-1 text-[11px] font-medium leading-tight text-[var(--os-text)] backdrop-blur-sm">
        {appShortName(app.id, language)}
      </span>
    </button>
  );
}
