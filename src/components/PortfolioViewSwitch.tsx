import { ArrowUpRight, LayoutList, Monitor } from "lucide-react";
import Link from "next/link";
import { portfolioViews } from "@/data/portfolio-views";
import type { Language } from "@/store/useLanguageStore";

export function PortfolioViewSwitch({ language, view }: { language: Language; view: "interactive" | "overview" }) {
  const copy = portfolioViews[language];
  return (
    <nav aria-label={copy.switchLabel} className="portfolio-view-switch">
      {view === "interactive" ? (
        <span aria-current="page"><Monitor size={16} aria-hidden="true" />{copy.interactive}</span>
      ) : (
        <Link href="/" prefetch={false}><Monitor size={16} aria-hidden="true" />{copy.interactive}<ArrowUpRight size={14} aria-hidden="true" /></Link>
      )}
      {view === "overview" ? (
        <span aria-current="page"><LayoutList size={16} aria-hidden="true" />{copy.overview}</span>
      ) : (
        <a href={copy.path} className="portfolio-view-alternative">
          <LayoutList size={17} aria-hidden="true" />
          <span>{copy.overview}<small>{copy.overviewDescription}</small></span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}
