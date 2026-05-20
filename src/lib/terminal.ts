import type { AppId } from "@/types/os";
import type { Language } from "@/store/useLanguageStore";
import {
  localizedAchievement,
  localizedEducation,
  localizedProfile,
  localizedProjects,
} from "@/data/i18n";
import { skillGroups } from "@/data/skills";

export type TerminalLine = {
  id: string;
  kind: "input" | "output" | "system" | "error" | "success";
  text: string;
};

export type TerminalResult = {
  lines: Omit<TerminalLine, "id">[];
  clear?: boolean;
  openApp?: AppId;
  openUrl?: string;
};

let lineCounter = 0;
export const nextLineId = () => {
  lineCounter += 1;
  return `t-${Date.now().toString(36)}-${lineCounter}`;
};

const out = (text: string): Omit<TerminalLine, "id"> => ({
  kind: "output",
  text,
});
const ok = (text: string): Omit<TerminalLine, "id"> => ({
  kind: "success",
  text,
});
const err = (text: string): Omit<TerminalLine, "id"> => ({
  kind: "error",
  text,
});

export const terminalWelcome = (
  language: Language
): Omit<TerminalLine, "id">[] =>
  language === "sr"
    ? [
        { kind: "system", text: "Dobrodošli u InasOS Terminal." },
        { kind: "system", text: 'Ukucaj "help" za listu komandi.' },
      ]
    : [
        { kind: "system", text: "Welcome to InasOS Terminal." },
        { kind: "system", text: 'Type "help" to see available commands.' },
      ];

const helpLines = (language: Language) =>
  language === "sr"
    ? [
        "Dostupne komande:",
        "  whoami            Prikaz korisnika",
        "  about             Kratka biografija",
        "  skills            Pregled veština",
        "  projects          Lista projekata",
        "  education         Obrazovanje",
        "  hackathon         Hackathon dostignuće",
        "  contact           Kontakt podaci",
        "  ls                Prikaz portfolio fajlova",
        "  open finder       Otvori Finder",
        "  open projects     Otvori Projects app",
        "  open cv           Otvori CV app",
        "  open settings     Otvori Settings app",
        "  open trash        Otvori Trash",
        "  open github       Otvori GitHub profil",
        "  clear             Očisti terminal",
        "  sudo hire-inas    Otvori kontakt",
        "  help              Prikaži pomoć",
      ]
    : [
        "Available commands:",
        "  whoami            Display user identity",
        "  about             Short bio",
        "  skills            Grouped skills overview",
        "  projects          List projects",
        "  education         Education summary",
        "  hackathon         Hackathon achievement",
        "  contact           Contact information",
        "  ls                List portfolio files",
        "  open finder       Open Finder",
        "  open projects     Open the Projects app",
        "  open cv           Open the CV app",
        "  open settings     Open Settings",
        "  open trash        Open Trash",
        "  open github       Open GitHub profile",
        "  clear             Clear the terminal",
        "  sudo hire-inas    Open contact interface",
        "  help              Show this help message",
      ];

export function runCommand(raw: string, language: Language): TerminalResult {
  const cmd = raw.trim().replace(/\s+/g, " ").toLowerCase();
  const lines: Omit<TerminalLine, "id">[] = [];
  const profile = localizedProfile[language];
  const projects = localizedProjects[language];
  const education = localizedEducation[language];
  const achievement = localizedAchievement[language];

  if (!cmd) return { lines };

  switch (cmd) {
    case "help":
      helpLines(language).forEach((l) => lines.push(out(l)));
      return { lines };

    case "whoami":
      lines.push(out(`${profile.name} - ${profile.tagline}`));
      return { lines };

    case "about":
      lines.push(out(profile.bio));
      lines.push(out(""));
      lines.push(out(`${language === "sr" ? "Status" : "Status"}: ${profile.status}`));
      return { lines };

    case "skills":
      skillGroups.forEach((g) => {
        lines.push(ok(`# ${g.title}`));
        lines.push(out(`  ${g.items.join(", ")}`));
        lines.push(out(""));
      });
      return { lines };

    case "projects":
      projects.forEach((p) => {
        lines.push(ok(`- ${p.name}  -  ${p.type}`));
        lines.push(out(`    ${p.description}`));
        lines.push(out(`    tech: ${p.tech.join(", ")}`));
        lines.push(out(""));
      });
      return { lines };

    case "education":
      education.forEach((e) => {
        lines.push(ok(`${e.degree}`));
        lines.push(out(`  ${e.institution}  (${e.start} - ${e.end})`));
        lines.push(out(""));
      });
      return { lines };

    case "hackathon":
      lines.push(ok(achievement.title));
      lines.push(out(achievement.description));
      return { lines };

    case "contact":
      lines.push(out(`Email: ${profile.email}`));
      lines.push(out(profile.status));
      return { lines };

    case "ls":
      [
        "Finder.app",
        "about.txt",
        "projects/",
        "skills.app",
        "education.md",
        "cv.pdf",
        "contact.app",
        "settings.app",
        "trash/",
      ].forEach((entry) => lines.push(out(entry)));
      return { lines };

    case "open finder":
      lines.push(ok(language === "sr" ? "Otvaram Finder..." : "Opening Finder..."));
      return { lines, openApp: "finder" };

    case "open projects":
      lines.push(ok(language === "sr" ? "Otvaram projekte..." : "Opening Projects..."));
      return { lines, openApp: "projects" };

    case "open cv":
      lines.push(ok(language === "sr" ? "Otvaram CV..." : "Opening CV..."));
      return { lines, openApp: "cv" };

    case "open settings":
      lines.push(ok(language === "sr" ? "Otvaram podešavanja..." : "Opening Settings..."));
      return { lines, openApp: "settings" };

    case "open trash":
      lines.push(ok(language === "sr" ? "Otvaram Trash..." : "Opening Trash..."));
      return { lines, openApp: "trash" };

    case "open github":
      if (profile.github) {
        lines.push(ok(`Opening ${profile.github} ...`));
        return { lines, openUrl: profile.github };
      }
      lines.push(err(language === "sr" ? "GitHub link nije podešen." : "GitHub URL is not configured yet."));
      return { lines };

    case "sudo hire-inas":
      lines.push(ok(language === "sr" ? "Dozvola odobrena." : "Permission granted."));
      lines.push(out(language === "sr" ? "Otvaram kontakt..." : "Opening contact interface..."));
      return { lines, openApp: "contact" };

    case "clear":
      return { lines: [], clear: true };

    default:
      lines.push(
        err(
          language === "sr"
            ? `Komanda nije pronađena: ${raw.trim()}. Ukucaj "help" za komande.`
            : `Command not found: ${raw.trim()}. Type "help" to see available commands.`
        )
      );
      return { lines };
  }
}
