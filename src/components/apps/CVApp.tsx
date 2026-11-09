"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { AppHeader } from "./AppHeader";
import { resumePath } from "@/data/portfolio-views";
import { useLanguageStore } from "@/store/useLanguageStore";

const copy = {
  en: {
    description: "English résumé · One-page PDF",
    open: "Open PDF in a new tab",
    download: "Download PDF",
    preview: "Inas Hamzagić résumé preview",
  },
  sr: {
    description: "Biografija na engleskom · PDF na jednoj strani",
    open: "Otvori PDF u novoj kartici",
    download: "Preuzmi PDF",
    preview: "Pregled biografije Inasa Hamzagića",
  },
};

export default function CVApp({ surface }: { surface: "desktop" | "mobile" }) {
  const language = useLanguageStore((state) => state.language);
  const t = copy[language];

  return (
    <div className="space-y-4">
      <AppHeader eyebrow="InasOS · CV" title="Inas Hamzagić" description={t.description} />
      <div className="flex flex-wrap gap-2">
        <a href={resumePath} target="_blank" rel="noreferrer" className="os-action os-action-primary">
          {t.open}<ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={resumePath} download className="os-action">
          <Download size={16} aria-hidden="true" />{t.download}
        </a>
      </div>
      {surface === "desktop" && (
        <iframe
          src={resumePath}
          title={t.preview}
          loading="lazy"
          className="h-[min(60dvh,36rem)] min-h-64 w-full rounded-xl border border-[var(--os-border)]"
        />
      )}
    </div>
  );
}
