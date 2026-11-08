import type { Language } from "@/store/useLanguageStore";

export const portfolioUrl = "https://hamzagicinas.vercel.app";
export const cvPath = "/cv/Inas-Hamzagic-CV.pdf";

export const portfolioViews = {
  en: {
    path: "/overview",
    overview: "Quick Overview",
    overviewDescription: "Projects, skills and contact at a glance",
    interactive: "Interactive InasOS",
    switchLabel: "Portfolio views",
    draftCv: "Draft CV (PDF)",
  },
  sr: {
    path: "/overview/sr",
    overview: "Brzi pregled",
    overviewDescription: "Projekti, veštine i kontakt na jednom mestu",
    interactive: "Interaktivni InasOS",
    switchLabel: "Prikazi portfolija",
    draftCv: "Radna verzija CV-ja (PDF)",
  },
} satisfies Record<Language, Record<string, string>>;
