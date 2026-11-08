import { ArrowRight, ArrowUpRight, Download, Mail, Trophy } from "lucide-react";
import type { Metadata } from "next";
import { InasLogo } from "@/components/InasLogo";
import { GithubIcon } from "@/components/BrandIcons";
import { PortfolioViewSwitch } from "@/components/PortfolioViewSwitch";
import { OverviewPreferences } from "@/components/OverviewPreferences";
import { localizedAchievement, localizedEducation, localizedProfile, localizedProjects } from "@/data/i18n";
import { localizedSkillGroups } from "@/data/skills";
import { cvPath, portfolioUrl, portfolioViews } from "@/data/portfolio-views";
import type { Project } from "@/types/portfolio";
import type { Language } from "@/store/useLanguageStore";

const copy = {
  en: {
    skip: "Skip to portfolio content", sections: "Overview sections", work: "Projects", stack: "Technologies", about: "About",
    selected: "Selected projects", more: "More projects", detail: "Open in InasOS", demo: "Live demo", code: "Source code",
    docs: "Documentation", education: "Education", present: "Present", email: "Email", github: "GitHub profile",
    language: "Srpski", switchLanguage: "Read in Serbian", footer: "Designed and built by",
  },
  sr: {
    skip: "Pređi na sadržaj portfolija", sections: "Odeljci pregleda", work: "Projekti", stack: "Tehnologije", about: "O meni",
    selected: "Odabrani projekti", more: "Još projekata", detail: "Otvori u InasOS-u", demo: "Demo", code: "Izvorni kod",
    docs: "Dokumentacija", education: "Obrazovanje", present: "Trenutno", email: "Email", github: "GitHub profil",
    language: "English", switchLanguage: "Read in English", footer: "Dizajn i razvoj",
  },
};

const featuredIds = ["servispro", "bitka-upside-down", "knowledge-that-doesnt-fade"];

export function overviewMetadata(language: Language): Metadata {
  const profile = localizedProfile[language];
  const view = portfolioViews[language];
  return {
    title: view.overview,
    description: profile.tagline,
    alternates: { canonical: view.path, languages: { en: portfolioViews.en.path, "sr-Latn": portfolioViews.sr.path, "x-default": portfolioViews.en.path } },
    openGraph: {
      title: `${profile.name} · ${view.overview}`,
      description: profile.tagline,
      url: view.path,
      type: "profile",
      locale: language === "sr" ? "sr_RS" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} · InasOS` }],
    },
    twitter: { card: "summary_large_image", title: `${profile.name} · ${view.overview}`, description: profile.tagline, images: ["/opengraph-image"] },
  };
}

export default function Overview({ language }: { language: Language }) {
  const t = copy[language];
  const view = portfolioViews[language];
  const alternate = language === "en" ? "sr" : "en";
  const projects = localizedProjects[language];
  const featured = featuredIds.flatMap((id) => projects.filter((project) => project.id === id));
  const profile = localizedProfile[language];
  const achievement = localizedAchievement[language];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${portfolioUrl}${view.path}`,
    inLanguage: language === "sr" ? "sr-Latn" : "en",
    mainEntity: {
      "@type": "Person", "@id": `${portfolioUrl}/#person`, name: profile.name, description: profile.bio,
      url: portfolioUrl, sameAs: [profile.github, profile.linkedin].filter(Boolean),
    },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork", name: project.name, description: project.description,
      url: project.live ?? project.github ?? project.documentation ?? `${portfolioUrl}/#projects/${project.id}`,
    })),
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
            <p className="os-kicker text-[var(--os-accent)]">{view.overview}</p>
            <h1 id="intro-title" className="mt-2 text-[clamp(2.2rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.06em]">{profile.name}</h1>
            <p className="mt-3 text-sm font-semibold sm:text-lg">{profile.role}</p>
            <p className="mt-3 max-w-[53ch] text-sm leading-relaxed text-[var(--os-muted)] sm:text-base">{profile.tagline}</p>
            <div className="overview-actions">
              <a href="#work" className="os-action os-action-primary">{t.work}<ArrowRight size={16} aria-hidden="true" /></a>
              {profile.github && <a href={profile.github} className="os-action" aria-label={t.github}><GithubIcon className="size-4" />GitHub</a>}
              <a href={`mailto:${profile.email}`} className="os-action"><Mail size={16} aria-hidden="true" />{t.email}</a>
              <a href={cvPath} download className="os-action"><Download size={16} aria-hidden="true" />{view.draftCv}</a>
            </div>
          </div>
          <aside className="overview-status">
            <p className="flex gap-2.5 text-sm leading-relaxed"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />{profile.status}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--os-muted)]">{profile.focus}</p>
          </aside>
        </section>

        <nav aria-label={t.sections} className="overview-section-nav">
          <a href="#work">{t.work}</a><a href="#toolkit">{t.stack}</a><a href="#about">{t.about}</a>
        </nav>

        <section id="work" className="overview-section" aria-labelledby="work-title">
          <h2 id="work-title" className="overview-heading">{t.selected}</h2>
          <div className="overview-projects">
            {featured.map((project) => <OverviewProject key={project.id} project={project} language={language} />)}
          </div>
          <details className="overview-more">
            <summary>{t.more} ({projects.length - featured.length})</summary>
            <div className="overview-projects mt-3">
              {projects.filter((project) => !featuredIds.includes(project.id)).map((project) => (
                <OverviewProject key={project.id} project={project} language={language} />
              ))}
            </div>
          </details>
        </section>

        <section id="toolkit" className="overview-section" aria-labelledby="toolkit-title">
          <h2 id="toolkit-title" className="overview-heading">{t.stack}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {localizedSkillGroups[language].map((group) => (
              <div key={group.id} className="overview-card">
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--os-muted)]">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="overview-section grid gap-6 md:grid-cols-2" aria-labelledby="about-title">
          <div>
            <h2 id="about-title" className="overview-heading">{t.about}</h2>
            <p className="text-sm leading-7 text-[var(--os-muted)] sm:text-base">{profile.bio}</p>
            <div className="overview-actions">
              <a href={`mailto:${profile.email}`} className="os-action break-all"><Mail size={16} className="shrink-0" aria-hidden="true" />{profile.email}</a>
              {profile.linkedin && <a href={profile.linkedin} className="os-action">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a>}
            </div>
          </div>
          <div className="space-y-4">
            <div className="overview-card">
              <h3 className="flex items-start gap-2 font-semibold"><Trophy size={18} className="mt-0.5 shrink-0 text-[var(--os-accent)]" aria-hidden="true" />{achievement.title}</h3>
              <p className="mt-2 text-sm text-[var(--os-muted)]">{achievement.organizer} · {achievement.date}</p>
            </div>
            <div className="overview-card">
              <h3 className="font-semibold">{t.education}</h3>
              <ul className="mt-2 space-y-3 text-sm">
                {localizedEducation[language].map((item) => (
                  <li key={item.institution}>
                    <p>{item.institution}</p>
                    <p className="text-[var(--os-muted)]">{item.degree} · {item.start.split("/").at(-1)} – {item.end.includes("/") ? item.end.split("/").at(-1) : t.present}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="overview-width overview-footer"><p>{t.footer} · {profile.name}</p></footer>
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
      <ul className="flex flex-wrap gap-1.5 text-xs text-[var(--os-muted)]" aria-label={t.stack}>
        {project.tech.map((item) => <li key={item} className="overview-tag">{item}</li>)}
      </ul>
      <div className="overview-project-links">
        {project.live && <a href={project.live} aria-label={`${t.demo} · ${project.name}`}>{t.demo}<ArrowUpRight size={14} aria-hidden="true" /></a>}
        {project.github && <a href={project.github} aria-label={`${t.code} · ${project.name}`}>{t.code}<ArrowUpRight size={14} aria-hidden="true" /></a>}
        {project.documentation && <a href={project.documentation} aria-label={`${t.docs} · ${project.name}`}>{t.docs}<ArrowUpRight size={14} aria-hidden="true" /></a>}
        <a href={`/#projects/${project.id}`} aria-label={`${t.detail} · ${project.name}`}>{t.detail}<ArrowRight size={14} aria-hidden="true" /></a>
      </div>
    </article>
  );
}
