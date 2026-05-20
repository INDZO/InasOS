"use client";

import type { AppId } from "@/types/os";
import FinderApp from "./FinderApp";
import AboutApp from "./AboutApp";
import ProjectsApp from "./ProjectsApp";
import SkillsApp from "./SkillsApp";
import EducationApp from "./EducationApp";
import HackathonApp from "./HackathonApp";
import TerminalApp from "./TerminalApp";
import CVApp from "./CVApp";
import ContactApp from "./ContactApp";
import SettingsApp from "./SettingsApp";
import MiniGameApp from "./MiniGameApp";
import TrashApp from "./TrashApp";

type Props = { appId: AppId; surface: "desktop" | "mobile" };

export default function AppRenderer({ appId, surface }: Props) {
  switch (appId) {
    case "finder":
      return <FinderApp />;
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp />;
    case "skills":
      return <SkillsApp />;
    case "education":
      return <EducationApp />;
    case "hackathon":
      return <HackathonApp />;
    case "terminal":
      return <TerminalApp surface={surface} />;
    case "cv":
      return <CVApp />;
    case "contact":
      return <ContactApp />;
    case "settings":
      return <SettingsApp />;
    case "minigame":
      return <MiniGameApp />;
    case "trash":
      return <TrashApp />;
    default:
      return null;
  }
}
