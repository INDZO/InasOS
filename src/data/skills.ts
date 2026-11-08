import type { SkillGroup } from "@/types/portfolio";
import type { Language } from "@/store/useLanguageStore";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "React",
      "Angular",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Responsive Web Design",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["ASP.NET Core", "PHP", "C#"],
  },
  {
    id: "databases",
    title: "Databases",
    items: ["SQL", "MySQL", "MongoDB"],
  },
  {
    id: "languages",
    title: "Programming Languages",
    items: ["C", "C++", "C#", "Python"],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      "Git",
      "GitHub",
      "Trello",
      "Jira",
      "Visual Studio",
      "Visual Studio Code",
      "Microsoft Office",
      "Excel",
      "Word",
      "PowerPoint",
      "Google Drive",
    ],
  },
  {
    id: "strengths",
    title: "Core Strengths",
    items: [
      "Problem solving",
      "Logical thinking",
      "Analytical thinking",
      "Algorithms",
      "Debugging",
      "Teamwork",
      "Communication",
      "Time management",
      "Working under pressure",
      "Presentation skills",
    ],
  },
];

const srTitles: Record<string, string> = {
  databases: "Baze podataka",
  languages: "Programski jezici",
  tools: "Alati",
  strengths: "Osnovne veštine",
};

const srItems: Record<string, string> = {
  "Responsive Web Design": "Responzivni web dizajn",
  "Problem solving": "Rešavanje problema",
  "Logical thinking": "Logičko razmišljanje",
  "Analytical thinking": "Analitičko razmišljanje",
  Algorithms: "Algoritmi",
  Debugging: "Otklanjanje grešaka",
  Teamwork: "Timski rad",
  Communication: "Komunikacija",
  "Time management": "Upravljanje vremenom",
  "Working under pressure": "Rad pod pritiskom",
  "Presentation skills": "Prezentacione veštine",
};

export const localizedSkillGroups: Record<Language, SkillGroup[]> = {
  en: skillGroups,
  sr: skillGroups.map((group) => ({
    ...group,
    title: srTitles[group.id] ?? group.title,
    items: group.items.map((item) => srItems[item] ?? item),
  })),
};
