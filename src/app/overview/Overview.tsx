import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { InasLogo } from "@/components/InasLogo";
import { GithubIcon } from "@/components/BrandIcons";
import { PortfolioViewSwitch } from "@/components/PortfolioViewSwitch";
import { OverviewPreferences } from "@/components/OverviewPreferences";
import { localizedProfile } from "@/data/i18n";
import { getProjectActions, localizedProjects, projectGroupNames, projectGroups } from "@/data/projects";
import { coreStack } from "@/data/skills";
import { portfolioUrl, portfolioViews } from "@/data/portfolio-views";
import type { Project } from "@/types/portfolio";
import type { Language } from "@/store/useLanguageStore";

const copy = {
  en: {
    skip: "Skip to portfolio content", work: "Featured Engineering", stack: "Core stack", email: "Email",
    featuredLink: "Featured projects", all: "All projects", open: "Browse in InasOS", detail: "Project details",
    switchLanguage: "Read in Serbian", language: "Srpski", footer: "Designed and built by",
    bookingNote: "Fictional data in the browser", fullStackNote: "Public source includes the API",
  },
  sr: {
    skip: "Pređi na sadržaj portfolija", work: "Istaknuti inženjerski projekti", stack: "Glavne tehnologije", email: "E-pošta",
    featuredLink: "Istaknuti projekti", all: "Svi projekti", open: "Pregledaj u InasOS-u", detail: "Detalji projekta",
    switchLanguage: "Read in English", language: "English", footer: "Dizajn i razvoj",
    bookingNote: "Izmišljeni podaci u pregledaču", fullStackNote: "Javni kod obuhvata i API",
  },
};

export function overviewMetadata(language: Language): Metadata {
  const profile = localizedProfile[language];
  const view = portfolioViews[language];
  const title = profile.name + " — " + profile.role;
  const description = profile.bio + " " + profile.tagline;
  return {
    title: { absolute: title + " · " + view.overview },
    description,
    alternates: {
      canonical: view.path,
      languages: { en: "/overview", "sr-Latn": "/overview/sr" },
    },
    openGraph: {
      title, description, url: view.path, siteName: "InasOS", type: "website",
      locale: language === "sr" ? "sr_RS" : "en_US",
      alternateLocale: [language === "sr" ? "en_US" : "sr_RS"],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default function Overview({ language }: { language: Language }) {
  const t = copy[language];
  const view = portfolioViews[language];
  const alternate = language === "en" ? "sr" : "en";
  const projects = localizedProjects[language];
  const featured = projects.filter((project) => project.group === "featured");
  const profile = localizedProfile[language];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: portfolioUrl + view.path,
    inLanguage: language === "sr" ? "sr-Latn" : "en",
    mainEntity: {
      "@type": "Person", "@id": portfolioUrl + "/#person", name: profile.name, description: profile.bio,
      jobTitle: profile.role, url: portfolioUrl, sameAs: [profile.github, profile.linkedin].filter(Boolean),
    },
  };

  return (
    <div className="overview-page" lang={language === "sr" ? "sr-Latn" : "en"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a href="#overview-content" className="skip-link os-action os-action-primary">{t.skip}</a>
      <header className="overview-bar">
        <div className="overview-width flex min-h-14 items-center justify-between gap-1 sm:gap-4">
          <div className="hidden shrink-0 sm:block" aria-hidden="true"><InasLogo compact /></div>
          <PortfolioViewSwitch language={language} view="overview" />
          <div className="flex shrink-0 items-center gap-1.5">
            <a className="overview-language" href={portfolioViews[alternate].path} hrefLang={alternate === "sr" ? "sr-Latn" : "en"} aria-label={t.switchLanguage} lang={alternate}>
              <span className="sm:hidden">{alternate.toUpperCase()}</span><span className="hidden sm:inline">{t.language}</span>
            </a>
            <OverviewPreferences language={language} />
          </div>
        </div>
      </header>

      <main id="overview-content" tabIndex={-1} className="overview-width outline-none">
        <section className="overview-intro" aria-labelledby="intro-title">
          <div>
            <p className="os-kicker text-[var(--os-accent)]">InasOS / {view.overview}</p>
            <h1 id="intro-title" className="mt-2 text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.06em]">{profile.name}</h1>
            <p className="mt-3 text-base font-semibold sm:text-lg">{profile.role}</p>
            <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-[var(--os-muted)] sm:text-base">{profile.bio}</p>
          </div>
          <div className="overview-profile-tools">
            <p className="os-kicker">{t.stack}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5 text-sm" aria-label={t.stack}>
              {coreStack.map((technology) => <li key={technology} className="overview-tag">{technology}</li>)}
            </ul>
            <div className="overview-actions">
              {profile.github && <a href={profile.github} className="os-action"><GithubIcon className="size-4" />GitHub</a>}
              {profile.linkedin && <a href={profile.linkedin} className="os-action">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a>}
              <a href={"mailto:" + profile.email} className="os-action"><Mail size={16} aria-hidden="true" />{t.email}</a>
            </div>
          </div>
        </section>

        <nav aria-label={view.overview} className="overview-section-nav">
          <a href="#work">{t.featuredLink}</a>
          <a href="#collection">{t.all}</a>
          <Link href="/#projects" prefetch={false}>{t.open}<ArrowUpRight size={15} aria-hidden="true" /></Link>
        </nav>

        <section id="work" className="overview-section" aria-labelledby="work-title">
          <h2 id="work-title" className="overview-heading">{t.work}</h2>
          <div className="overview-projects">
            {featured.map((project) => <OverviewProject key={project.id} project={project} language={language} />)}
          </div>
        </section>

        <section id="collection" className="overview-section" aria-labelledby="collection-title">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 id="collection-title" className="overview-heading !mb-0">{t.all}</h2>
            <Link className="os-action" href="/#projects" prefetch={false}>{t.open}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="overview-collections">
            {projectGroups.map((group) => (
              <div key={group} className="overview-card">
                <h3 className="text-sm font-semibold">{projectGroupNames[language][group]}</h3>
                <ul className="mt-2 space-y-1">
                  {projects.filter((project) => project.group === group).map((project) => (
                    <li key={project.id}>
                      <Link className="inline-flex min-h-8 items-center gap-2 text-sm text-[var(--os-muted)] hover:underline" href={"/#projects/" + project.id} prefetch={false}>
                        {project.name}<ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="overview-width overview-footer flex flex-wrap items-center justify-between gap-2">
        <p>{t.footer} · {profile.name}</p>
        <a href={"mailto:" + profile.email} className="underline underline-offset-4">{profile.email}</a>
      </footer>
    </div>
  );
}

function OverviewProject({ project, language }: { project: Project; language: Language }) {
  const t = copy[language];
  return (
    <article className="overview-card overview-project" data-project={project.id}>
      <p className="os-kicker">{project.type}</p>
      <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
      <p className="text-sm leading-relaxed text-[var(--os-muted)]">{project.description}</p>
      <p className="text-xs leading-relaxed text-[var(--os-muted)]">{project.tech.slice(0, 4).join(" · ")}</p>
      {project.id === "servispro" && <p className="text-xs text-[var(--os-muted)]">{t.bookingNote}</p>}
      {project.id === "giveback" && <p className="text-xs text-[var(--os-muted)]">{t.fullStackNote}</p>}
      <div className="overview-project-links">
        {getProjectActions(project, language).map(({ kind, label, href }) => (
          <a key={kind} href={href} aria-label={label + " · " + project.name}>
            {label}<ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
        <Link href={"/#projects/" + project.id} aria-label={t.detail + " · " + project.name} prefetch={false}>{t.detail}<ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
