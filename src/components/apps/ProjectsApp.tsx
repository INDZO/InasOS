"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { getProjectActions, localizedProjects, projectGroupNames, projectGroups } from "@/data/projects";
import { useLanguageStore } from "@/store/useLanguageStore";
import { navigatePortfolio, usePortfolioLocation } from "@/lib/navigation";
import type { ProjectGroup } from "@/types/portfolio";
import { normalizeSearch, searchTokens } from "@/lib/search";

const filters = ["all", ...projectGroups] as const;

const copy = {
  en: {
    title: "Projects", description: "Client delivery, university engineering, creative experiments and team work.",
    search: "Search by project or technology", empty: "No projects match your search.", clear: "Clear filters",
    all: "All", filterLabel: "Filter projects by collection", back: "All projects", details: "View project",
    contribution: "Project details", results: "Projects found",
  },
  sr: {
    title: "Projekti", description: "Rad za klijenta, fakultetski projekti, kreativni eksperimenti i timski rad.",
    search: "Pretraži projekte ili tehnologije", empty: "Nema projekata koji odgovaraju pretrazi.", clear: "Obriši filtere",
    all: "Svi", filterLabel: "Filtriraj projekte po grupi", back: "Svi projekti", details: "Otvori projekat",
    contribution: "Detalji projekta", results: "Broj pronađenih projekata",
  },
};

export default function ProjectsApp() {
  const language = useLanguageStore((state) => state.language);
  const labels = copy[language];
  const groups = projectGroupNames[language];
  const projects = localizedProjects[language];
  const { app, project } = usePortfolioLocation();
  const heading = useRef<HTMLHeadingElement>(null);
  const previousProject = useRef(project);
  const [lastProject, setLastProject] = useState(project);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ProjectGroup | "all">("all");
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
    const haystack = normalizeSearch([item.name, item.type, item.description, ...item.tech].join(" "));
    return (filter === "all" || item.group === filter) && tokens.every((token) => haystack.includes(token));
  });

  if (selected) {
    return (
      <article className="mx-auto max-w-3xl space-y-5">
        <a href="#projects" className="os-action" onClick={(event) => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          navigatePortfolio("projects");
        }}>
          <ArrowLeft size={16} aria-hidden="true" />{labels.back}
        </a>
        <header>
          <p className="os-kicker">{selected.type}</p>
          <h2 ref={heading} tabIndex={-1} className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{selected.name}</h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-[var(--os-muted)]">{selected.description}</p>
        </header>
        <TechStack technologies={selected.tech} />
        <div className="flex flex-wrap gap-2">
          {getProjectActions(selected, language).map(({ kind, label, href }) => (
            <a key={kind} className={kind === "live" ? "os-action os-action-primary" : "os-action"}
              href={href} target="_blank" rel="noreferrer" aria-label={label + " · " + selected.name}>
              {label}<ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
        {selected.note && <p className="project-section text-sm leading-relaxed text-[var(--os-muted)]">{selected.note}</p>}
        {selected.image && (
          <div className="project-cover" data-detail="true">
            <Image src={selected.image} alt={selected.imageAlt ?? ""} fill
              sizes="(max-width: 768px) 90vw, 768px" className="object-contain" />
          </div>
        )}
        <section className="project-section">
          <h3 className="font-semibold">{labels.contribution}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--os-muted)]">{selected.detail}</p>
        </section>
      </article>
    );
  }

  return (
    <section className="@container mx-auto max-w-5xl space-y-5">
      <header>
        <p className="os-kicker">InasOS</p>
        <h2 ref={heading} tabIndex={-1} className="mt-2 text-3xl font-semibold tracking-tight">{labels.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--os-muted)]">{labels.description}</p>
      </header>
      <div className="space-y-3">
        <label className="flex items-center gap-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-control)] px-3">
          <Search size={17} aria-hidden="true" className="shrink-0 text-[var(--os-muted)]" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
            aria-label={labels.search} placeholder={labels.search} className="min-h-11 min-w-0 flex-1 bg-transparent text-base placeholder:text-[var(--os-muted)]" />
        </label>
        <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap items-center gap-2">
          {filters.map((item) => (
            <button key={item} type="button" aria-pressed={filter === item} className="project-filter" onClick={() => setFilter(item)}>
              {item === "all" ? labels.all : groups[item]}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-xs text-[var(--os-muted)]">{labels.results} · {visible.length}</p>
      </div>
      {visible.length ? projectGroups.map((group) => {
        const entries = visible.filter((item) => item.group === group);
        if (!entries.length) return null;
        const featured = group === "featured";
        return (
          <section key={group} className="space-y-3" aria-label={groups[group]}>
            <h3 className="text-lg font-semibold">{groups[group]}</h3>
            <div className={featured ? "grid gap-3 @min-[36rem]:grid-cols-2" : "grid gap-2"}>
              {entries.map((item) => (
                <article key={item.id} className={featured ? "project-card" : "project-section"} data-project={item.id}>
                  {featured && item.image && (
                    <div className="project-cover" aria-hidden="true">
                      <Image src={item.image} alt="" fill sizes="(max-width: 720px) 90vw, 420px" className="object-cover object-top" />
                    </div>
                  )}
                  <div className={featured ? "flex flex-1 flex-col gap-2 p-4" : "grid gap-1"}>
                    <p className="os-kicker">{item.type}</p>
                    <h4 className="text-lg font-semibold">
                      <a href={"#projects/" + item.id} className="inline-flex min-h-8 items-center gap-2 hover:underline"
                        aria-label={labels.details + " · " + item.name} onClick={(event) => {
                          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                          event.preventDefault();
                          navigatePortfolio("projects", item.id);
                        }}>
                        {item.name}<ArrowRight size={15} aria-hidden="true" />
                      </a>
                    </h4>
                    <p className="text-sm leading-relaxed text-[var(--os-muted)]">{item.description}</p>
                    <TechStack technologies={item.tech.slice(0, 4)} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      }) : (
        <div className="project-section py-10 text-center">
          <p>{labels.empty}</p>
          <button type="button" className="os-action mt-4" onClick={() => { setQuery(""); setFilter("all"); }}>{labels.clear}</button>
        </div>
      )}
    </section>
  );
}

function TechStack({ technologies }: { technologies: string[] }) {
  if (!technologies.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {technologies.map((technology) => (
        <li key={technology} className="rounded-md border border-[var(--os-border)] px-2 py-1 text-xs text-[var(--os-muted)]">{technology}</li>
      ))}
    </ul>
  );
}
