import type { Language } from "@/store/useLanguageStore";
import type { Project, ProjectGroup } from "@/types/portfolio";

export const projectGroups = ["featured", "academic", "creative", "collaboration"] as const satisfies readonly ProjectGroup[];

export const projectGroupNames = {
  en: { featured: "Featured Engineering", academic: "Academic & Applied", creative: "Creative Lab", collaboration: "Collaboration" },
  sr: { featured: "Istaknuti inženjerski projekti", academic: "Akademski i primenjeni projekti", creative: "Kreativna laboratorija", collaboration: "Timski rad" },
} satisfies Record<Language, Record<ProjectGroup, string>>;

type ProjectCopy = Pick<Project, "type" | "description" | "detail" | "imageAlt" | "note">;
type ProjectEntry = Omit<Project, keyof ProjectCopy> & Record<Language, ProjectCopy>;

const catalog: ProjectEntry[] = [
  {
    id: "diyar",
    name: "DIYAR",
    group: "featured",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Gemini"],
    live: "https://diyar.rs/",
    caseStudy: "https://github.com/INDZO/DIYAR-Showcase",
    image: "/projects/diyar.jpg",
    en: {
      type: "Independent client delivery",
      description: "A real-estate website with property listings, administration tools and Gemini-assisted translation.",
      detail: "I handled client communication, branding, interface design and development, including the listing administration and translation workflow. The case study covers the delivery. The original application source is private.",
      imageAlt: "DIYAR public real-estate website",
    },
    sr: {
      type: "Samostalni projekat za klijenta",
      description: "Sajt za nekretnine sa oglasima, administracijom i prevođenjem uz pomoć Gemini-ja.",
      detail: "Vodio sam komunikaciju sa klijentom, osmislio vizuelni identitet i interfejs i razvio sajt, administraciju oglasa i funkciju prevođenja. Studija slučaja opisuje realizaciju projekta. Izvorni kod aplikacije je privatan.",
      imageAlt: "Javni sajt agencije za nekretnine DIYAR",
    },
  },
  {
    id: "servispro",
    name: "ServisPro",
    group: "featured",
    tech: ["React", "ASP.NET Core", "EF Core", "SQL Server"],
    github: "https://github.com/INDZO/ServisPro-Source",
    documentation: "https://github.com/INDZO/Softversko-Inzenjerstvo-2026",
    live: "https://indzo-servispro-demo.vercel.app/",
    image: "/projects/servispro.jpg",
    en: {
      type: "University · Software Engineering",
      description: "Auto-service booking and repair tracking for drivers, workshops and administrators.",
      detail: "I built the React client and ASP.NET Core API for role-based booking and service history. The companion documentation covers requirements, architecture, models and testing.",
      note: "The booking demo uses fictional data in the browser and resets on refresh. It runs independently of the ASP.NET Core API and SQL Server.",
      imageAlt: "ServisPro booking demo with sample services and appointment options",
    },
    sr: {
      type: "Fakultetski projekat · Softversko inženjerstvo",
      description: "Zakazivanje i praćenje popravki vozila za vozače, servise i administratore.",
      detail: "Razvio sam React klijent i ASP.NET Core API za zakazivanje i istoriju servisa, sa pristupom prema ulozi korisnika. Prateća dokumentacija opisuje zahteve, arhitekturu, modele i testiranje.",
      note: "Demo za zakazivanje koristi izmišljene podatke u pregledaču i vraća ih na početno stanje pri osvežavanju. Radi nezavisno od ASP.NET Core API-ja i SQL Servera.",
      imageAlt: "ServisPro demo za zakazivanje sa primerima usluga i termina",
    },
  },
  {
    id: "giveback",
    name: "GiveBack",
    group: "featured",
    tech: ["React", "ASP.NET Core", "SQL Server", "EF Core", "Clean Architecture", "CQRS", "MediatR", "FluentValidation"],
    github: "https://github.com/INDZO/GiveBack-Source",
    documentation: "https://github.com/INDZO/GiveBack-Showcase",
    live: "https://giveback-frontend.vercel.app/",
    image: "/projects/giveback.jpg",
    en: {
      type: "University · Advanced Databases",
      description: "A volunteering platform for finding opportunities, managing applications and tracking service hours.",
      detail: "I designed the relational model and built the React client and ASP.NET Core API. The public source includes both layers. The API uses Clean Architecture, CQRS with MediatR and FluentValidation, and EF Core with SQL Server.",
      note: "The live link opens the hosted frontend. The source repository documents how to run the full application locally.",
      imageAlt: "GiveBack public volunteering interface",
    },
    sr: {
      type: "Fakultetski projekat · Napredne baze podataka",
      description: "Platforma za pronalaženje volonterskih aktivnosti, upravljanje prijavama i evidenciju volonterskih sati.",
      detail: "Projektovao sam relacioni model i razvio React klijent i ASP.NET Core API. Javni repozitorijum sadrži oba sloja. API koristi Clean Architecture, CQRS sa MediatR-om i FluentValidation-om, kao i EF Core sa SQL Serverom.",
      note: "Link za prikaz otvara objavljeni frontend. U repozitorijumu su uputstva za lokalno pokretanje cele aplikacije.",
      imageAlt: "Javni interfejs platforme GiveBack za volontiranje",
    },
  },
  {
    id: "inasos",
    name: "InasOS",
    group: "featured",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    github: "https://github.com/INDZO/InasOS",
    documentation: "https://github.com/INDZO/InasOS/wiki",
    live: "https://hamzagicinas.vercel.app/",
    en: {
      type: "Interactive engineering portfolio",
      description: "A portfolio with a desktop window manager, mobile app shell, terminal and searchable project collection.",
      detail: "I designed the operating-system interaction model and built the portfolio around shared UI state, project deep links, and English and Serbian navigation. I used AI-assisted coding and iteration during development.",
    },
    sr: {
      type: "Interaktivni inženjerski portfolio",
      description: "Portfolio sa upravljanjem prozorima, mobilnim interfejsom, terminalom i pretragom projekata.",
      detail: "Osmislio sam interakcije po uzoru na operativni sistem i izradio portfolio sa zajedničkim stanjem interfejsa, direktnim linkovima do projekata i navigacijom na srpskom i engleskom. Tokom razvoja koristio sam AI pomoć pri pisanju i doradi koda.",
    },
  },
  {
    id: "bitka-upside-down",
    name: "Bitka Grid Chase",
    group: "academic",
    tech: ["React", "Django", "Django Channels", "WebSockets", "Search algorithms"],
    github: "https://github.com/INDZO/Bitka-Grid-Chase",
    live: "https://bitka-upside-down.onrender.com/",
    image: "/projects/bitka-grid-chase.jpg",
    en: {
      type: "University · Artificial Intelligence",
      description: "A turn-based grid pursuit game with AI search, server-side game rules and real-time updates.",
      detail: "The React interface displays the grid and search diagnostics. Django validates moves and owns game state, and Django Channels broadcasts updates over WebSockets.",
      note: "The original Render demo can take about a minute to wake up. The screenshot shows the public source release and loads directly here.",
      imageAlt: "Bitka Grid Chase board with geometric players and search diagnostics",
    },
    sr: {
      type: "Fakultetski projekat · Veštačka inteligencija",
      description: "Potezna igra potere na mreži sa algoritmima pretrage, pravilima na serveru i ažuriranjima u realnom vremenu.",
      detail: "React interfejs prikazuje tablu i dijagnostiku pretrage. Django proverava poteze i čuva stanje igre, a Django Channels šalje promene preko WebSocket veze.",
      note: "Pokretanje originalnog demoa na Renderu može trajati oko minut. Ovde je dostupan snimak ekrana iz javne verzije projekta.",
      imageAlt: "Tabla igre Bitka Grid Chase sa geometrijskim oznakama i dijagnostikom pretrage",
    },
  },
  {
    id: "elitdent",
    name: "ElitDent",
    group: "academic",
    tech: ["Laravel", "Angular", "MySQL", "PHP"],
    github: "https://github.com/INDZO/ElitDent-Source",
    documentation: "https://github.com/INDZO/ElitDent-Source/tree/main/docs",
    live: "https://indzo-elitdent-demo.vercel.app/",
    en: {
      type: "University · Information Systems and Internet Application Programming",
      description: "A dental practice system for appointments, dentist schedules, patient records and service administration.",
      detail: "The source includes the Laravel application, Angular client, MySQL migrations and the original academic information-system analysis document.",
      note: "The public booking demo uses fictional data in browser memory and runs without a live backend.",
    },
    sr: {
      type: "Fakultetski projekat · Informacioni sistemi i programiranje internet aplikacija",
      description: "Sistem za stomatološku ordinaciju koji obuhvata zakazivanje, rasporede stomatologa, kartone pacijenata i administraciju usluga.",
      detail: "Izvorni kod obuhvata Laravel aplikaciju, Angular klijent, MySQL migracije i originalni akademski dokument sa analizom informacionog sistema.",
      note: "Javni demo za zakazivanje koristi izmišljene podatke u memoriji pregledača i radi bez aktivnog servera.",
    },
  },
  {
    id: "esufara",
    name: "eSufara",
    group: "academic",
    tech: ["C#", "WPF", "EF Core", "SQL Server"],
    github: "https://github.com/INDZO/eSufara",
    en: {
      type: "University · Object-Oriented Programming 2",
      description: "A Windows desktop learning application with lessons, exercises and progress tracking.",
      detail: "The WPF source includes course navigation, media controls, account views and an EF Core data layer for tracking progress.",
    },
    sr: {
      type: "Fakultetski projekat · Objektno orijentisano programiranje 2",
      description: "Windows desktop aplikacija za učenje sa lekcijama, vežbama i praćenjem napretka.",
      detail: "WPF kod obuhvata navigaciju kroz kurs, kontrole za reprodukciju, ekrane za korisničke naloge i EF Core sloj za praćenje napretka.",
    },
  },
  {
    id: "telecom",
    name: "tele.com",
    group: "academic",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/INDZO/tele.com",
    live: "https://indzo.github.io/tele.com/",
    image: "/projects/telecom.jpg",
    en: {
      type: "University · Web Design",
      description: "A responsive, multi-page telecom storefront built with browser fundamentals.",
      detail: "The GitHub Pages site presents sample services and packages and includes a client-side account interface prototype.",
      imageAlt: "tele.com storefront showing telecom services",
    },
    sr: {
      type: "Fakultetski projekat · Veb dizajn",
      description: "Responzivan višestrani sajt za telekomunikacione usluge, izrađen u HTML-u, CSS-u i JavaScriptu.",
      detail: "Sajt je objavljen preko GitHub Pages-a i prikazuje primere usluga i paketa, kao i prototip korisničkog naloga u pregledaču.",
      imageAlt: "Sajt tele.com sa prikazom telekomunikacionih usluga",
    },
  },
  {
    id: "library-is",
    name: "IS Biblioteka",
    group: "academic",
    tech: ["C#", "Windows Forms", "SQL Server"],
    github: "https://github.com/INDZO/IS_Biblioteka-master",
    en: {
      type: "Independent high-school graduation project",
      description: "A Windows desktop system for managing library books, readers and loans.",
      detail: "I built Windows Forms screens for searching and editing records, with SQL Server for storing the library data.",
    },
    sr: {
      type: "Samostalni maturski rad",
      description: "Windows desktop sistem za evidenciju knjiga, čitalaca i pozajmica u biblioteci.",
      detail: "Izradio sam Windows Forms ekrane za pretragu i izmenu zapisa, uz SQL Server za čuvanje podataka biblioteke.",
    },
  },
  {
    id: "forge",
    name: "FORGE",
    group: "creative",
    tech: ["Next.js", "TypeScript"],
    live: "https://forge-world-builder.vercel.app/",
    image: "/projects/forge.jpg",
    en: {
      type: "Interactive brand concept",
      description: "A workspace that turns a product brief into a brand concept with strategy, visual direction and a launch preview.",
      detail: "The public demo opens a sample project. You can explore its brand canvas and adjust the launch preview without signing in.",
      imageAlt: "FORGE landing page with a sample brand canvas",
    },
    sr: {
      type: "Interaktivni koncept brenda",
      description: "Radni prostor koji od opisa proizvoda oblikuje koncept brenda sa strategijom, vizuelnim smernicama i pregledom lansiranja.",
      detail: "Javni demo otvara primer projekta. Možeš da istražiš mapu brenda i menjaš prikaz lansiranja bez prijave.",
      imageAlt: "Početna stranica projekta FORGE sa primerom mape brenda",
    },
  },
  {
    id: "diyar-3d",
    name: "DIYAR 3D",
    group: "creative",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://3d-model-walktrough.vercel.app/",
    image: "/projects/diyar-3d.jpg",
    en: {
      type: "Real-estate walkthrough",
      description: "A scroll-led walkthrough that presents a property room by room.",
      detail: "Visitors can scroll through the property, jump to a room using the chapter controls, or skip to the contact section.",
      imageAlt: "DIYAR 3D entry scene and chapter navigation",
    },
    sr: {
      type: "Obilazak nekretnine",
      description: "Interaktivni obilazak koji skrolovanjem predstavlja nekretninu prostoriju po prostoriju.",
      detail: "Posetioci mogu da skroluju kroz prostorije, izaberu prostoriju iz navigacije ili odmah pređu na kontakt.",
      imageAlt: "Ulazna scena i navigacija kroz prostorije u projektu DIYAR 3D",
    },
  },
  {
    id: "oranz",
    name: "Oranž",
    group: "collaboration",
    tech: [],
    live: "https://www.oranz.study/",
    en: {
      type: "Team project · 1st place, 2026 UNINP Hackathon",
      description: "An AI-assisted study platform for turning course materials into lessons and planning exam preparation.",
      detail: "Our team won first place at the 2026 UNINP Hackathon. I proposed the concept the team selected, tested the application, helped present it and initiated the live QR demonstration.",
    },
    sr: {
      type: "Timski projekat · 1. mesto na UNINP hakatonu 2026.",
      description: "Platforma za učenje koja uz pomoć veštačke inteligencije pretvara gradivo u lekcije i pomaže u pripremi ispita.",
      detail: "Naš tim je osvojio prvo mesto na UNINP hakatonu 2026. Predložio sam koncept koji je tim izabrao, testirao aplikaciju, učestvovao u prezentaciji i pokrenuo demonstraciju uživo putem QR koda.",
    },
  },
];

function projectsIn(language: Language): Project[] {
  return catalog.map(({ en, sr, ...entry }) => ({ ...entry, ...{ en, sr }[language] }));
}

export const localizedProjects = { en: projectsIn("en"), sr: projectsIn("sr") };

export const projects = localizedProjects.en;

export function getProjectActions(project: Project, language: Language) {
  const labels = language === "sr"
    ? { live: "Otvori sajt", github: "Izvorni kod", documentation: "Dokumentacija", caseStudy: "Studija slučaja" }
    : { live: "View live", github: "Source code", documentation: "Engineering docs", caseStudy: "Case study" };
  const liveLabel = project.id === "giveback" ? (language === "sr" ? "Objavljeni frontend" : "Hosted frontend")
    : project.id === "inasos" ? (language === "sr" ? "Istraži InasOS" : "Explore InasOS")
    : ["servispro", "elitdent", "bitka-upside-down"].includes(project.id) ? (language === "sr" ? "Isprobaj demo" : "Live demo")
    : labels.live;

  return [
    { kind: "live", label: liveLabel, href: project.id === "inasos" ? "/" : project.live },
    { kind: "github", label: labels.github, href: project.github },
    { kind: "documentation", label: labels.documentation, href: project.documentation },
    { kind: "caseStudy", label: labels.caseStudy, href: project.caseStudy },
  ].flatMap(({ kind, label, href }) => href ? [{ kind, label, href }] : []);
}
