"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, FileText, Search } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { localizedProjects } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { navigatePortfolio, usePortfolioLocation } from "@/lib/navigation";
import type { Project } from "@/types/portfolio";
import { normalizeSearch, searchTokens } from "@/lib/search";

const filters = ["all", "featured", "fullstack", "web", "desktop", "design"] as const;
type Filter = (typeof filters)[number];

const copy = {
  en: {
    title: "Selected work", description: "Web applications, interactive experiences and academic engineering projects.",
    search: "Search by project or technology", empty: "No projects match your search.", clear: "Clear filters",
    all: "All", featured: "Featured", fullstack: "Full stack", web: "Web", desktop: "Desktop", design: "Systems design",
    back: "All projects", details: "View project", live: "Live demo", code: "Source code", docs: "Documentation",
    features: "What it does", learning: "What I learned", role: "Project context", results: "projects",
  },
  sr: {
    title: "Odabrani radovi", description: "Web aplikacije, interaktivna iskustva i akademski inženjerski projekti.",
    search: "Pretraži projekte ili tehnologije", empty: "Nema projekata koji odgovaraju pretrazi.", clear: "Obriši filtere",
    all: "Svi", featured: "Istaknuti", fullstack: "Full stack", web: "Web", desktop: "Desktop", design: "Dizajn sistema",
    back: "Svi projekti", details: "Otvori projekat", live: "Demo", code: "Izvorni kod", docs: "Dokumentacija",
    features: "Funkcionalnosti", learning: "Šta sam naučio", role: "Kontekst projekta", results: "projekata",
  },
};

const screenshots: Partial<Record<string, string>> = {
  "bitka-upside-down": "/projects/bitka-upside-down.jpg",
  telecom: "/projects/telecom.jpg",
};

export default function ProjectsApp() {
  const language = useLanguageStore((state) => state.language);
  const labels = copy[language];
  const projects = localizedProjects[language];
  const { app, project } = usePortfolioLocation();
  const heading = useRef<HTMLHeadingElement>(null);
  const previousProject = useRef(project);
  const [lastProject, setLastProject] = useState(project);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  if (app === "projects" && lastProject !== project) setLastProject(project);
  const selected = projects.find((item) => item.id === (app === "projects" ? project : lastProject));

  useEffect(() => {
    if (app !== "projects" || previousProject.current === project) return;
    previousProject.current = project;
    heading.current?.closest(".os-scroll")?.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
  }, [app, project]);

  const tokens = searchTokens(query);
  const visible = projects.filter((item) => {
    const inCategory = filter === "all" || (filter === "featured" ? item.featured : item.category === filter);
    const haystack = normalizeSearch([item.name, item.type, item.description, ...item.tech].join(" "));
    return inCategory && tokens.every((token) => haystack.includes(token));
  });

  if (selected) {
    return (
      <article className="mx-auto max-w-3xl space-y-6">
        <a href="#projects" className="os-action" onClick={(event) => { event.preventDefault(); navigatePortfolio("projects"); }}>
          <ArrowLeft size={16} aria-hidden="true" /> {labels.back}
        </a>
        <header>
          <p className="os-kicker">{selected.type}</p>
          <h2 ref={heading} tabIndex={-1} className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{selected.name}</h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-[var(--os-muted)]">{selected.description}</p>
        </header>
        <TechStack project={selected} />
        <ProjectLinks project={selected} labels={labels} />
        {screenshots[selected.id] && <ProjectCover project={selected} detail />}
        <div className="grid gap-3 sm:grid-cols-2">
          <section className="project-section">
            <h3 className="font-semibold">{labels.features}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--os-muted)]">
              {selected.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </section>
          <section className="project-section">
            {selected.role && <><h3 className="font-semibold">{labels.role}</h3><p className="mb-4 mt-2 text-sm text-[var(--os-muted)]">{selected.role}</p></>}
            <h3 className="font-semibold">{labels.learning}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--os-muted)]">{selected.learned}</p>
          </section>
        </div>
      </article>
    );
  }

  return (
    <section className="@container mx-auto max-w-5xl space-y-5">
      <header>
        <p className="os-kicker">InasOS / {language === "sr" ? "Projekti" : "Projects"}</p>
        <h2 ref={heading} tabIndex={-1} className="mt-2 text-3xl font-semibold tracking-tight">{labels.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--os-muted)]">{labels.description}</p>
      </header>
      <div className="space-y-3">
        <label className="flex items-center gap-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-control)] px-3">
          <Search size={17} aria-hidden="true" className="shrink-0 text-[var(--os-muted)]" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
            aria-label={labels.search} placeholder={labels.search} className="min-h-11 min-w-0 flex-1 bg-transparent text-base placeholder:text-[var(--os-muted)]" />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((item) => (
            <button key={item} type="button" aria-pressed={filter === item} className="project-filter" onClick={() => setFilter(item)}>
              {labels[item]}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-xs text-[var(--os-muted)]">{visible.length} {labels.results}</p>
      </div>
      {visible.length ? (
        <div className="grid gap-4 @min-[42rem]:grid-cols-2">
          {visible.map((item) => (
            <article key={item.id} className="project-card">
              <ProjectCover project={item} />
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <p className="os-kicker">{item.type}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{item.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--os-muted)]">{item.description}</p>
                <TechStack project={item} compact />
                <div className="mt-auto pt-2">
                  <a href={`#projects/${item.id}`} aria-label={`${labels.details} · ${item.name}`} className="os-action" onClick={(event) => {
                    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    navigatePortfolio("projects", item.id);
                  }}>{labels.details}<ArrowRight size={16} aria-hidden="true" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="project-section py-10 text-center">
          <p>{labels.empty}</p>
          <button type="button" className="os-action mt-4" onClick={() => { setQuery(""); setFilter("all"); }}>{labels.clear}</button>
        </div>
      )}
    </section>
  );
}

function ProjectCover({ project, detail }: { project: Project; detail?: boolean }) {
  const screenshot = screenshots[project.id];
  return (
    <div aria-hidden="true" className="project-cover" data-accent={project.accent} data-detail={detail || undefined}>
      {screenshot ? (
        <Image src={screenshot} alt="" fill sizes={detail ? "(max-width: 768px) 90vw, 768px" : "(max-width: 720px) 90vw, 420px"} className="object-cover object-top" />
      ) : (
        <>
          <span className="project-cover-icon"><Code2 size={23} /></span>
          <span className="terminal-font text-sm font-normal tracking-wide text-white/75">{project.tech[0]}</span>
        </>
      )}
    </div>
  );
}

function TechStack({ project, compact }: { project: Project; compact?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {(compact ? project.tech.slice(0, 4) : project.tech).map((technology) => (
        <li key={technology} className="rounded-md border border-[var(--os-border)] px-2 py-1 text-xs text-[var(--os-muted)]">{technology}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project, labels }: { project: Project; labels: (typeof copy)["en"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.live && <a className="os-action os-action-primary" href={project.live} target="_blank" rel="noreferrer" aria-label={`${labels.live} · ${project.name}`}><ArrowUpRight size={15} aria-hidden="true" />{labels.live}</a>}
      {project.github && <a className="os-action" href={project.github} target="_blank" rel="noreferrer" aria-label={`${labels.code} · ${project.name}`}><GithubIcon className="size-4" />{labels.code}</a>}
      {project.documentation && <a className="os-action" href={project.documentation} target="_blank" rel="noreferrer" aria-label={`${labels.docs} · ${project.name}`}><FileText size={15} aria-hidden="true" />{labels.docs}</a>}
    </div>
  );
}
