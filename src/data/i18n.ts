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
  en: {
    name: "Inas Hamzagić",
    role: "Software Engineering Student",
    tagline:
      "Software Engineering student focused on web development, software development, algorithms and problem-solving.",
    bio: "I am a third-year Software Engineering student at the State University of Novi Pazar. I am interested in software development, web development, algorithms, databases and practical problem-solving. I enjoy building real projects, learning through implementation and improving my skills through teamwork, hackathons and hands-on development.",
    focus:
      "Currently building full-stack web projects, sharpening algorithms and data structures, and exploring modern frontend and backend stacks.",
    status:
      "Open to internships, junior developer opportunities and collaboration.",
    email: "hamzagicinas@gmail.com",
    github: "https://github.com/INDZO",
    linkedin: null,
  },
  sr: {
    name: "Inas Hamzagić",
    role: "Student softverskog inženjerstva",
    tagline:
      "Student softverskog inženjerstva fokusiran na web razvoj, razvoj softvera, algoritme i rešavanje problema.",
    bio: "Student sam treće godine softverskog inženjerstva na Državnom univerzitetu u Novom Pazaru. Zanimaju me razvoj softvera, web razvoj, algoritmi, baze podataka i praktično rešavanje problema. Najviše učim kroz realne projekte, timski rad, hackathone i konkretnu implementaciju.",
    focus:
      "Trenutno radim na full-stack web projektima, jačam algoritme i strukture podataka i istražujem moderne frontend i backend tehnologije.",
    status:
      "Otvoren sam za prakse, junior developer prilike i saradnju.",
    email: "hamzagicinas@gmail.com",
    github: "https://github.com/INDZO",
    linkedin: null,
  },
};

export const localizedEducation: Record<Language, Education[]> = {
  en: [
    {
      institution: "State University of Novi Pazar",
      degree: "Bachelor Studies in Software Engineering",
      start: "01/10/2023",
      end: "current",
      topics: [
        "Software engineering",
        "Programming",
        "Algorithms and data structures",
        "Databases",
        "Web technologies",
        "Computer networks",
        "Operating systems",
        "Mathematics",
      ],
    },
    {
      institution: "Gymnasium Novi Pazar",
      degree: "Secondary School Diploma — Gymnasium, IT Department",
      start: "01/09/2019",
      end: "16/06/2023",
      topics: [
        "Information technology",
        "Computer science",
        "Programming basics",
        "Mathematics",
        "Databases",
        "Web design",
        "English language",
      ],
    },
  ],
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
  en: {
    title: "1st Place — 3rd UNINP Hackathon",
    organizer: "International University of Novi Pazar",
    date: "25/04/2026",
    description:
      "Won 1st place at the 3rd UNINP Hackathon by developing a web application within 24 hours, demonstrating programming, teamwork and problem-solving skills.",
  },
  sr: {
    title: "1. mesto — 3. UNINP Hackathon",
    organizer: "Internacionalni univerzitet u Novom Pazaru",
    date: "25/04/2026",
    description:
      "Osvojeno 1. mesto na 3. UNINP Hackathon-u izradom web aplikacije u roku od 24 sata, uz programiranje, timski rad i rešavanje problema pod pritiskom.",
  },
};

export const localizedProjects: Record<Language, Project[]> = {
  en: [
    {
      id: "servispro",
      name: "ServisPro",
      type: "Student full-stack web project",
      description:
        "Auto-service platform with client, service provider and admin workflows.",
      tech: ["React", "ASP.NET Core", "MS SQL Server", "REST API"],
      features: [
        "User roles",
        "Client vehicle management",
        "Service appointment scheduling",
        "Service status tracking",
        "Admin management",
        "Ratings and reviews",
      ],
      learned:
        "Building role-based workflows, REST API integration, database-backed application logic and project organization.",
      github: null,
      live: null,
    },
    {
      id: "elitdent",
      name: "ElitDent",
      type: "Web application / deployment project",
      description: "Dental clinic web application deployed on an Ubuntu server.",
      tech: ["Laravel", "PHP", "MySQL", "Nginx", "Ubuntu", "HTTPS"],
      features: [
        "Clinic web application structure",
        "Production deployment",
        "Nginx configuration",
        "SSL/HTTPS setup",
        "MySQL integration",
      ],
      learned:
        "Linux server deployment, domain/HTTPS setup, Nginx configuration and production troubleshooting.",
      github: null,
      live: null,
    },
    {
      id: "knowledge-that-doesnt-fade",
      name: "Knowledge That Doesn't Fade",
      type: "Hackathon / AI learning project",
      description:
        "AI-assisted learning application focused on helping students build durable knowledge.",
      tech: ["Next.js", "AI integration", "Web technologies"],
      features: [
        "Learning-focused workflow",
        "Material organization",
        "Retrieval-practice concept",
        "AI-assisted study flow",
      ],
      learned:
        "AI product thinking, hackathon execution, teamwork under time pressure and presentation.",
      github: null,
      live: null,
    },
    {
      id: "stomatology-is",
      name: "Stomatology IS",
      type: "Systems analysis / database design project",
      description:
        "Information system modeling project for a dental clinic.",
      tech: ["SSA", "DFD", "EER", "Relational database design"],
      features: [
        "Context diagram",
        "Data flow modeling",
        "Entity-relationship modeling",
        "Relational schema planning",
      ],
      learned:
        "Requirements modeling, database design, system decomposition and documentation.",
      github: null,
      live: null,
    },
    {
      id: "hackathon-app",
      name: "Hackathon App",
      type: "Hackathon project",
      description:
        "Web application built during the 3rd UNINP Hackathon, where my team won 1st place.",
      tech: ["Web technologies", "AI integration"],
      features: [
        "24-hour development",
        "Team collaboration",
        "Demo / presentation",
        "Problem-solving under pressure",
      ],
      learned:
        "Fast prototyping, scope control, teamwork and presenting a product under time constraints.",
      github: null,
      live: null,
    },
  ],
  sr: [
    {
      id: "servispro",
      name: "ServisPro",
      type: "Studentski full-stack web projekat",
      description:
        "Platforma za auto-servis sa tokovima za klijente, servisere i administratora.",
      tech: ["React", "ASP.NET Core", "MS SQL Server", "REST API"],
      features: [
        "Korisničke uloge",
        "Upravljanje vozilima klijenata",
        "Zakazivanje servisa",
        "Praćenje statusa servisa",
        "Administracija",
        "Ocene i recenzije",
      ],
      learned:
        "Role-based tokovi, REST API integracija, logika aplikacije nad bazom i organizacija projekta.",
      github: null,
      live: null,
    },
    {
      id: "elitdent",
      name: "ElitDent",
      type: "Web aplikacija / deployment projekat",
      description: "Web aplikacija za stomatološku ordinaciju deploy-ovana na Ubuntu server.",
      tech: ["Laravel", "PHP", "MySQL", "Nginx", "Ubuntu", "HTTPS"],
      features: [
        "Struktura aplikacije za ordinaciju",
        "Produkcijski deployment",
        "Nginx konfiguracija",
        "SSL/HTTPS podešavanje",
        "MySQL integracija",
      ],
      learned:
        "Linux server deployment, domen/HTTPS podešavanje, Nginx konfiguracija i produkcijski troubleshooting.",
      github: null,
      live: null,
    },
    {
      id: "knowledge-that-doesnt-fade",
      name: "Knowledge That Doesn't Fade",
      type: "Hackathon / AI learning projekat",
      description:
        "AI aplikacija za učenje fokusirana na dugotrajnije pamćenje i organizaciju gradiva.",
      tech: ["Next.js", "AI integration", "Web technologies"],
      features: [
        "Tok učenja",
        "Organizacija materijala",
        "Retrieval-practice koncept",
        "AI-assisted study flow",
      ],
      learned:
        "AI product thinking, hackathon execution, timski rad pod pritiskom i prezentacija.",
      github: null,
      live: null,
    },
    {
      id: "stomatology-is",
      name: "Stomatology IS",
      type: "Analiza sistema / projektovanje baze",
      description:
        "Model informacionog sistema za stomatološku ordinaciju.",
      tech: ["SSA", "DFD", "EER", "Relational database design"],
      features: [
        "Kontekst dijagram",
        "Modelovanje tokova podataka",
        "EER model",
        "Planiranje relacione šeme",
      ],
      learned:
        "Analiza zahteva, projektovanje baze, dekompozicija sistema i dokumentovanje rešenja.",
      github: null,
      live: null,
    },
    {
      id: "hackathon-app",
      name: "Hackathon App",
      type: "Hackathon projekat",
      description:
        "Web aplikacija napravljena tokom 3. UNINP Hackathon-a, gde je tim osvojio 1. mesto.",
      tech: ["Web technologies", "AI integration"],
      features: [
        "Razvoj u 24 sata",
        "Timska saradnja",
        "Demo i prezentacija",
        "Rešavanje problema pod pritiskom",
      ],
      learned:
        "Brzo prototipovanje, kontrola opsega, timski rad i prezentovanje proizvoda u kratkom roku.",
      github: null,
      live: null,
    },
  ],
};

export const appName = (id: AppId, language: Language) =>
  appCopy[language][id]?.title ?? appCopy.en[id].title;

export const appShortName = (id: AppId, language: Language) =>
  appCopy[language][id]?.shortTitle ?? appName(id, language);
