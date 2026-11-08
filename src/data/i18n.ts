import { profile, education, achievement } from "@/data/profile";
import { projects } from "@/data/projects";
import type { AppId } from "@/types/os";
import type { Achievement, Education, Profile, Project } from "@/types/portfolio";
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
    cv: { title: "CV", description: "Resume / CV" },
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
    cv: { title: "CV", description: "Biografija" },
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
    role: "Student softverskog inženjerstva · Full-stack razvoj",
    tagline: "Od interfejsa do baze podataka. Razvijam praktične web aplikacije i učim pretvarajući ideje u stvarnost.",
    bio: "Ja sam Inas, student softverskog inženjerstva na Državnom univerzitetu u Novom Pazaru. Razvijam web aplikacije koristeći React, Next.js, ASP.NET Core i Laravel, povezujući promišljene interfejse sa API-jima i bazama podataka. Moji projekti obuhvataju upravljanje uslugama, alate za učenje i interaktivna iskustva. Volim timsko rešavanje problema i tražim praksu ili junior poziciju na kojoj mogu da doprinesem i nastavim da učim.",
    focus: "Full-stack web razvoj, algoritmi i strukture podataka, relacione baze i postavljanje aplikacija na Linux servere.",
    status: "Otvoren sam za prakse, junior developer pozicije i saradnju.",
  },
};
export const localizedEducation: Record<Language, Education[]> = {
  en: education,
  sr: [
    {
      institution: "Državni univerzitet u Novom Pazaru",
      degree: "Osnovne studije softverskog inženjerstva",
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
      "Osvojeno 1. mesto na 3. UNINP Hackathon-u izradom web aplikacije u roku od 24 sata, uz programiranje, timski rad i rešavanje problema pod pritiskom.",
  },
};

const projectTranslationsSr: Pick<Project, "id" | "type" | "description" | "features" | "learned">[] = [{
      id: "servispro",
      type: "Studentski full-stack web projekat",
      description:
        "Platforma na kojoj vozači dodaju vozila i zakazuju servise, serviseri ažuriraju status, a administratori nadgledaju rad sistema.",
      features: [
        "Korisničke uloge",
        "Upravljanje vozilima klijenata",
        "Zakazivanje servisa",
        "Praćenje statusa servisa",
        "Administracija",
        "Ocene i recenzije",
      ],
      learned:
        "Povezivanje React interfejsa sa REST API-jem, modelovanje korisničkih uloga i rad sa relacionom bazom.",
    },
    {
      id: "elitdent",
      type: "Web aplikacija i postavljanje na server",
      description: "Laravel aplikacija za stomatološku ordinaciju, dostupna preko HTTPS-a uz Nginx na Ubuntu serveru i MySQL bazu.",
      features: [
        "Struktura aplikacije za ordinaciju",
        "Produkcijski deployment",
        "Nginx konfiguracija",
        "SSL/HTTPS podešavanje",
        "MySQL integracija",
      ],
      learned:
        "Postavljanje aplikacije na Linux server, podešavanje domena, HTTPS-a i Nginx-a i otklanjanje grešaka u produkciji.",
    },
    {
      id: "knowledge-that-doesnt-fade",
      type: "Hakatonski projekat za učenje uz AI",
      description:
        "AI aplikacija za učenje fokusirana na dugotrajnije pamćenje i organizaciju gradiva.",
      features: [
        "Tok učenja",
        "Organizacija materijala",
        "Vežbanje aktivnog prisećanja",
        "Podrška za učenje uz AI",
      ],
      learned:
        "Oblikovanje AI funkcionalnosti za učenje i timski rad na prototipu i prezentaciji u kratkom roku.",
    },
    {
      id: "stomatology-is",
      type: "Analiza sistema / projektovanje baze",
      description:
        "Dizajn informacionog sistema stomatološke ordinacije, od dijagrama tokova podataka do relacione šeme baze.",
      features: [
        "Kontekst dijagram",
        "Modelovanje tokova podataka",
        "EER model",
        "Planiranje relacione šeme",
      ],
      learned:
        "Analiza zahteva, projektovanje baze, dekompozicija sistema i dokumentovanje rešenja.",
    },
];
const additionalProjectCopySr: Record<string, Partial<Project>> = {
  inasos: { type: "Interaktivni developer portfolio", description: "Portfolio koji istražuješ kao operativni sistem: desktop radni prostor, mobilne aplikacije i interaktivni terminal.", features: ["Upravljanje desktop prozorima", "Poseban mobilni prikaz", "Srpski i engleski jezik", "Pretraga projekata i terminal komande"], learned: "Upravljanje stanjem interfejsa, prilagodljive interakcije i pristupačna navigacija.", role: "Dizajn i razvoj portfolija" },
  "bitka-upside-down": { type: "Strateška igra u realnom vremenu", description: "8-bit igra potere na poteze u kojoj igrači skupljaju sećanja i pokušavaju da stignu do portala. Django sprovodi pravila i šalje poteze preko WebSocket veze.", features: ["Pravila i tajmeri na serveru", "WebSocket uz REST alternativu", "AI pretraga i pronalaženje putanje", "Statistike igre"], learned: "Usklađivanje interfejsa i serverskih odluka i primena algoritama kroz igru.", role: "Full-stack projekat igre" },
  telecom: { type: "Telekomunikacioni sajt", description: "Višestranični projekat web dizajna za predstavljanje usluga i paketa, objavljen na GitHub Pages.", features: ["Stranice usluga i paketa", "Prototipi kontakta i korisničkog naloga", "Navigacija između stranica", "Statičko objavljivanje"], learned: "Izrada povezanog višestraničnog sajta pomoću osnovnih web tehnologija.", role: "Projekat web dizajna" },
  "library-is": { type: "Informacioni sistem biblioteke", description: "Windows aplikacija za knjige, članove i pozajmice, izrađena kao maturski rad iz baza podataka.", features: ["Upravljanje knjigama i članovima", "Izdavanje knjiga", "Pretraga i CRUD forme", "Pristup bazi kroz repozitorijume"], learned: "Modelovanje relacionih podataka i povezivanje desktop interfejsa sa bazom.", role: "Maturski projekat" },
  servispro: { role: "Studentski timski projekat" },
  "knowledge-that-doesnt-fade": { role: "Timski hackathon projekat" },
  elitdent: { role: "Razvoj i postavljanje web aplikacije" },
  "stomatology-is": { role: "Akademski projekat analize sistema" },
};
export const localizedProjects: Record<Language, Project[]> = {
  en: projects,
  sr: projects.map((project) => ({ ...project, ...projectTranslationsSr.find((copy) => copy.id === project.id), ...additionalProjectCopySr[project.id] })),
};
export const appName = (id: AppId, language: Language) =>
  appCopy[language][id]?.title ?? appCopy.en[id].title;

export const appShortName = (id: AppId, language: Language) =>
  appCopy[language][id]?.shortTitle ?? appName(id, language);
