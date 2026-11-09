"use client";

import dynamic from "next/dynamic";
import type { AppId } from "@/types/os";
const FinderApp = dynamic(() => import("./FinderApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const AboutApp = dynamic(() => import("./AboutApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const ProjectsApp = dynamic(() => import("./ProjectsApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const SkillsApp = dynamic(() => import("./SkillsApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const EducationApp = dynamic(() => import("./EducationApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const HackathonApp = dynamic(() => import("./HackathonApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const TerminalApp = dynamic(() => import("./TerminalApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const ContactApp = dynamic(() => import("./ContactApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const SettingsApp = dynamic(() => import("./SettingsApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const MiniGameApp = dynamic(() => import("./MiniGameApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });
const TrashApp = dynamic(() => import("./TrashApp"), { loading: () => <div className="app-loading" role="status" aria-label="Loading"><span /></div> });

type Props = { appId: AppId; surface: "desktop" | "mobile" };

export default function AppRenderer({ appId, surface }: Props) {
  switch (appId) {
    case "finder":
      return <FinderApp surface={surface} />;
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
