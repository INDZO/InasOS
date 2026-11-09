"use client";

import { Mail } from "lucide-react";
import { desktopApps } from "@/data/apps";
import MobileIcon from "./MobileIcon";
import { localizedProfile } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { navigatePortfolio } from "@/lib/navigation";
import { PortfolioViewSwitch } from "@/components/PortfolioViewSwitch";
import { ViewResumeButton } from "@/components/ViewResumeButton";

export default function MobileHome() {
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];

  return (
    <div className="os-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 pt-3">
      <div className="rounded-[28px] border border-[color:var(--os-border)] bg-[var(--os-panel-strong)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="terminal-font text-[10px] uppercase tracking-[0.24em] text-[color:var(--os-accent)]">
          {language === "sr" ? "INASOS / LIČNI PORTFOLIO" : "INASOS / PERSONAL PORTFOLIO"}
        </div>
        <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-tight text-[var(--os-text)]">
          {profile.name}
        </h1>
        <p className="mt-1 text-[12.5px] leading-snug text-[var(--os-muted)]">
          {profile.role}
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--os-muted)]">{profile.tagline}</p>
        <div className="mt-4"><PortfolioViewSwitch language={language} view="interactive" /></div>
        <nav aria-label={language === "sr" ? "Brze veze" : "Portfolio shortcuts"} className="mobile-shortcuts mt-4 flex flex-wrap gap-1.5">
          <ViewResumeButton />
          <button type="button" onClick={() => navigatePortfolio("projects")} className="os-action">
            {language === "sr" ? "Projekti" : "Projects"}
          </button>
          <button type="button" onClick={() => navigatePortfolio("contact")} className="os-action">
            <Mail size={16} aria-hidden="true" />{language === "sr" ? "Kontakt" : "Contact"}
          </button>
        </nav>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-x-2 gap-y-5">
        {desktopApps.map((app) => (
          <MobileIcon key={app.id} app={app} />
        ))}
      </div>

    </div>
  );
}
