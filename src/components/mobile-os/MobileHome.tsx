"use client";

import { Monitor } from "lucide-react";
import { desktopApps } from "@/data/apps";
import MobileIcon from "./MobileIcon";
import { localizedProfile, shellCopy } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function MobileHome() {
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];
  const copy = shellCopy[language];

  return (
    <div className="flex flex-1 flex-col px-5 pb-3 pt-3">
      <div className="rounded-[28px] border border-[color:var(--os-border)] bg-[var(--os-panel)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
        <div className="terminal-font text-[10px] uppercase tracking-[0.24em] text-[color:var(--os-accent)]">
          {"// interactive portfolio"}
        </div>
        <h1 className="mt-1.5 text-[25px] font-semibold leading-tight tracking-tight text-[var(--os-text)]">
          {profile.name}
        </h1>
        <p className="mt-1 text-[12.5px] leading-snug text-[var(--os-muted)]">
          {profile.role}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-x-3 gap-y-6">
        {desktopApps.map((app) => (
          <MobileIcon key={app.id} app={app} />
        ))}
      </div>

      <div className="mt-auto pt-5">
        <div className="flex items-start gap-2.5 rounded-2xl border border-[color:var(--os-border)] bg-[var(--os-panel)] px-3.5 py-3 backdrop-blur-xl">
          <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--os-accent)]" />
          <p className="text-[11.5px] leading-snug text-[var(--os-muted)]">
            <span className="font-medium text-[var(--os-text)]">
              {copy.mobileOptimized as string}
            </span>{" "}
            {copy.mobileDesktopHint as string}
          </p>
        </div>
      </div>
    </div>
  );
}
