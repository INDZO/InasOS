import type { Language } from "@/store/useLanguageStore";

export const portfolioUrl = "https://hamzagicinas.vercel.app";

export const portfolioViews = {
  en: {
    path: "/overview",
    overview: "Quick Overview",
    overviewDescription: "Projects, skills and contact",
    interactive: "Interactive InasOS",
    switchLabel: "Portfolio views",
  },
  sr: {
    path: "/overview/sr",
    overview: "Brzi pregled",
    overviewDescription: "Projekti, veštine i kontakt",
    interactive: "Interaktivni InasOS",
    switchLabel: "Prikazi portfolija",
  },
} satisfies Record<Language, Record<string, string>>;
