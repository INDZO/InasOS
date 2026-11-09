import { profile, education, achievement } from "@/data/profile";
export { localizedProjects } from "@/data/projects";
import type { AppId } from "@/types/os";
import type { Achievement, Education, Profile } from "@/types/portfolio";
import type { Language } from "@/store/useLanguageStore";

type AppCopy = Record<AppId, { title: string; shortTitle?: string; description: string }>;

export const appCopy: Record<Language, AppCopy> = {
  en: {
    finder: { title: "Finder", description: "Browse portfolio files" },
    about: { title: "About", description: "Who I am" },
    projects: { title: "Projects", description: "Selected work" },
    skills: { title: "Skills", description: "Tech stack & strengths" },
    education: { title: "Education", description: "Academic background" },
    hackathon: { title: "Hackathon", description: "Achievements" },
    terminal: {
      title: "InasOS Terminal",
      shortTitle: "Terminal",
      description: "Type help to begin",
    },
    cv: { title: "CV", description: "Résumé in English (PDF)" },
    contact: { title: "Contact", description: "Get in touch" },
    settings: { title: "Settings", description: "InasOS preferences" },
    minigame: {
      title: "Break Mode",
      description: "Take a short break",
    },
    trash: { title: "Trash", description: "Discarded notes" },
  },
  sr: {
    finder: { title: "Finder", description: "Pregled portfolio fajlova" },
    about: { title: "O meni", description: "Ko sam ja" },
    projects: { title: "Projekti", description: "Odabrani radovi" },
    skills: { title: "Veštine", description: "Tehnologije i snage" },
    education: { title: "Obrazovanje", description: "Akademski put" },
    hackathon: { title: "Hackathon", description: "Dostignuća" },
    terminal: {
      title: "InasOS Terminal",
      shortTitle: "Terminal",
      description: "Ukucaj help za početak",
    },
    cv: { title: "CV", description: "Biografija na engleskom (PDF)" },
    contact: { title: "Kontakt", description: "Javi se" },
    settings: { title: "Podešavanja", description: "InasOS opcije" },
    minigame: {
      title: "Pauza",
      description: "Kratka mini-igra",
    },
    trash: { title: "Trash", description: "Odbačene beleške" },
  },
};

export const shellCopy = {
  en: {
    osName: "InasOS",
    mobileName: "InasOS Mobile",
    finder: "Finder",
    shortcuts: "Shortcuts",
    terminal: "Terminal",
    projects: "Projects",
    about: "About",
    dockHint: "Dock",
    mobileOptimized: "Mobile experience optimized.",
    mobileDesktopHint: "Open on desktop for the full workstation experience.",
    language: "Language",
    bootSubtitle: "Interactive Developer Portfolio",
    bootSkip: "Skip boot",
    bootWelcome: "Welcome to InasOS.",
    bootLines: [
      "Checking developer profile",
      "Loading portfolio kernel",
      "Mounting /projects",
      "Starting window manager",
      "Preparing dock and menu bar",
      "Ready",
    ],
  },
  sr: {
    osName: "InasOS",
    mobileName: "InasOS Mobile",
    finder: "Finder",
    shortcuts: "Prečice",
    terminal: "Terminal",
    projects: "Projekti",
    about: "O meni",
    dockHint: "Dock",
    mobileOptimized: "Mobilni prikaz je optimizovan.",
    mobileDesktopHint: "Otvori na desktopu za potpun radni prostor.",
    language: "Jezik",
    bootSubtitle: "Interaktivni developer portfolio",
    bootSkip: "Preskoči boot",
    bootWelcome: "Dobrodošli u InasOS.",
    bootLines: [
      "Provera developer profila",
      "Učitavanje portfolio kernela",
      "Montiranje /projects",
      "Pokretanje window manager-a",
      "Priprema dock-a i menu bar-a",
      "Spremno",
    ],
  },
} satisfies Record<Language, Record<string, string | string[]>>;

export const localizedProfile: Record<Language, Profile> = {
  en: profile,
  sr: {
    ...profile,
    role: "Student softverskog inženjerstva | Full-stack programer",
    tagline: "Razvijam full-stack aplikacije koristeći React, ASP.NET Core, C# i SQL.",
    bio: "Na završnoj sam godini softverskog inženjerstva na Državnom univerzitetu u Novom Pazaru. Moji radovi obuhvataju samostalni projekat za klijenta, fakultetske full-stack aplikacije i timski rad.",
    focus: "Full-stack razvoj aplikacija, od dizajna interfejsa do API-ja i relacionog modelovanja podataka.",
    status: "Otvoren sam za prakse, početne programerske pozicije i saradnju.",
  },
};
export const localizedEducation: Record<Language, Education[]> = {
  en: education,
  sr: [
    {
      institution: "Državni univerzitet u Novom Pazaru",
      degree: "Softversko inženjerstvo · Završna godina",
      start: "01/10/2023",
      end: "trenutno",
      topics: [
        "Softversko inženjerstvo",
        "Programiranje",
        "Algoritmi i strukture podataka",
        "Baze podataka",
        "Web tehnologije",
        "Računarske mreže",
        "Operativni sistemi",
        "Matematika",
      ],
    },
    {
      institution: "Gimnazija Novi Pazar",
      degree: "Srednja škola — IT smer",
      start: "01/09/2019",
      end: "16/06/2023",
      topics: [
        "Informacione tehnologije",
        "Računarstvo",
        "Osnove programiranja",
        "Matematika",
        "Baze podataka",
        "Web dizajn",
        "Engleski jezik",
      ],
    },
  ],
};

export const localizedAchievement: Record<Language, Achievement> = {
  en: achievement,
  sr: {
    title: "1. mesto — 3. UNINP Hackathon",
    organizer: "Internacionalni univerzitet u Novom Pazaru",
    date: "25/04/2026",
    description:
      "Naš tim je osvojio prvo mesto sa projektom Oranž 2026. godine. Predložio sam koncept koji je tim izabrao, testirao aplikaciju, učestvovao u prezentaciji i pokrenuo demonstraciju uživo putem QR koda.",
  },
};

export const appName = (id: AppId, language: Language) =>
  appCopy[language][id]?.title ?? appCopy.en[id].title;

export const appShortName = (id: AppId, language: Language) =>
  appCopy[language][id]?.shortTitle ?? appName(id, language);
