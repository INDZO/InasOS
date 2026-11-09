import type { SkillGroup } from "@/types/portfolio";
import type { Language } from "@/store/useLanguageStore";

export const coreStack = ["React", "ASP.NET Core", "C#", "SQL"];

const coreSkills = [...coreStack, "JavaScript", "HTML/CSS", "Git/GitHub"];
const projectSkills = ["TypeScript", "Python", "PHP", "Laravel", "Angular", "WPF", "Django", "Next.js"];

export const localizedSkillGroups: Record<Language, SkillGroup[]> = {
  en: [
    { id: "core", title: "Core skills", items: [...coreSkills, "Relational database modeling"] },
    { id: "experience", title: "Project experience", items: projectSkills },
  ],
  sr: [
    { id: "core", title: "Glavne veštine", items: [...coreSkills, "Modelovanje relacionih baza podataka"] },
    { id: "experience", title: "Iskustvo kroz projekte", items: projectSkills },
  ],
};
