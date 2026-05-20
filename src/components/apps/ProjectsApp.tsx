"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { localizedProjects } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Badge } from "@/components/ui/Badge";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";

export default function ProjectsApp() {
  const language = useLanguageStore((s) => s.language);
  const projects = localizedProjects[language];
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · Projekti",
          title: "Odabrani radovi",
          description:
            "Studentski projekti, hackathoni i full-stack web aplikacije koje gradim kroz studije i praksu.",
          tech: "Tehnologije",
          features: "Funkcionalnosti",
          learned: "Šta sam naučio",
        }
      : {
          eyebrow: "InasOS · Projects",
          title: "Selected work",
          description:
            "Student projects, hackathons and full-stack web applications I built while studying Software Engineering.",
          tech: "Tech",
          features: "Features",
          learned: "What I learned",
        };

  return (
    <div className="space-y-5">
      <header>
        <CardSubtitle>{copy.eyebrow}</CardSubtitle>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-100">
          {copy.title}
        </h2>
        <p className="mt-1 max-w-prose text-[13px] leading-relaxed text-zinc-400">
          {copy.description}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((p, idx) => (
          <Card
            key={p.id}
            className="relative flex h-full flex-col gap-4 overflow-hidden"
          >
            <div className="pointer-events-none absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full bg-orange-500/[0.08] blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-2">
                <span className="terminal-font text-[10.5px] tracking-[0.18em] text-zinc-500">
                  / {String(idx + 1).padStart(2, "0")}
                </span>
                <Badge variant="muted">{p.type}</Badge>
              </div>
              <CardTitle className="mt-2 text-[17px]">{p.name}</CardTitle>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-300">
                {p.description}
              </p>
            </div>

            <div className="relative">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                {copy.tech}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>

            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                  {copy.features}
                </div>
                <ul className="mt-1.5 space-y-1 text-[12.5px] text-zinc-300">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                  {copy.learned}
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-300">
                  {p.learned}
                </p>
              </div>
            </div>

            {(p.github || p.live) && (
              <div className="relative mt-auto flex gap-2 pt-1">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--os-border)] bg-[var(--os-control)] px-2.5 py-1 text-[12px] text-[var(--os-text)] hover:border-orange-400/30 hover:bg-[var(--os-control-hover)]"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-orange-400/30 bg-orange-500/10 px-2.5 py-1 text-[12px] text-orange-200 hover:bg-orange-500/15"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live
                  </a>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
