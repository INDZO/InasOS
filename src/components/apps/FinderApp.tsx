"use client";

import { useMemo } from "react";
import { create } from "zustand";
import {
  ChevronLeft,
  FileText,
  Folder,
  Grid3X3,
  List,
  Search,
} from "lucide-react";
import type { AppId } from "@/types/os";
import { AppIcon } from "@/components/AppIcon";
import { Button } from "@/components/ui/Button";
import { appById } from "@/data/apps";
import { appCopy, localizedProfile, localizedProjects } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { navigatePortfolio } from "@/lib/navigation";
import { normalizeSearch, searchTokens } from "@/lib/search";
import { cn } from "@/lib/cn";

type FolderId = "home" | "profile" | "projects" | "system";
type ViewMode = "grid" | "list";
type FinderState = {
  folder: FolderId;
  selectedId: string;
  view: ViewMode | null;
  query: string;
};

const useFinder = create<FinderState>(() => ({
  folder: "home",
  selectedId: "profile-folder",
  view: null,
  query: "",
}));


type FinderItem = {
  id: string;
  name: string;
  kind: "folder" | "app" | "file";
  folder?: FolderId;
  appId?: AppId;
  projectId?: string;
  description: string;
  meta?: string;
};

export default function FinderApp({ surface = "desktop" }: { surface?: "desktop" | "mobile" }) {
  const language = useLanguageStore((s) => s.language);
  const mobile = surface === "mobile";
  const { folder, selectedId, view: preferredView, query } = useFinder();
  const view = preferredView ?? (mobile ? "list" : "grid");

  const profile = localizedProfile[language];
  const projects = localizedProjects[language];

  const copy =
    language === "sr"
      ? {
          search: "Pretraga fajlova",
          open: "Otvori",
          preview: "Pregled",
          kind: "Tip",
          empty: "Nema rezultata za ovu pretragu.",
          folders: "Lokacije",
          home: "Početna",
          profile: "Profil",
          projects: "Projekti",
          system: "Sistem",
          hint: "Dvoklik ili Enter otvara izabranu stavku.",
        }
      : {
          search: "Search files",
          open: "Open",
          preview: "Preview",
          kind: "Kind",
          empty: "No files match this search.",
          folders: "Locations",
          home: "Home",
          profile: "Profile",
          projects: "Projects",
          system: "System",
          hint: "Double-click or press Enter to open the selected item.",
        };

  const folders = useMemo<Record<FolderId, FinderItem[]>>(
    () => ({
      home: [
        {
          id: "profile-folder",
          name: copy.profile,
          kind: "folder",
          folder: "profile",
          description: profile.tagline,
          meta: "folder",
        },
        {
          id: "projects-folder",
          name: copy.projects,
          kind: "folder",
          folder: "projects",
          description:
            language === "sr"
              ? "Studentski projekti, hackathoni i full-stack radovi."
              : "Student projects, hackathons and full-stack work.",
          meta: `${projects.length} ${language === "sr" ? "projekata" : "projects"}`,
        },
        {
          id: "cv-file",
          name: language === "sr" ? "Biografija.pdf" : "Résumé.pdf",
          kind: "file",
          appId: "cv",
          description: appCopy[language].cv.description,
          meta: "PDF",
        },
        {
          id: "contact-app",
          name: "Contact.app",
          kind: "app",
          appId: "contact",
          description: profile.status,
          meta: profile.email,
        },
      ],
      profile: [
        {
          id: "about-file",
          name: "about.txt",
          kind: "file",
          appId: "about",
          description: profile.bio,
          meta: "text",
        },
        {
          id: "skills-app",
          name: "skills.app",
          kind: "app",
          appId: "skills",
          description:
            language === "sr"
              ? "Tehnologije, alati i oblasti učenja."
              : "Technologies, tools and learning areas.",
          meta: "app",
        },
        {
          id: "education-file",
          name: "education.md",
          kind: "file",
          appId: "education",
          description:
            language === "sr"
              ? "Obrazovanje i akademski put."
              : "Education and academic path.",
          meta: "markdown",
        },
        {
          id: "hackathon-file",
          name: "hackathon.win",
          kind: "file",
          appId: "hackathon",
          description:
            language === "sr"
              ? "1. mesto na 3. UNINP Hackathon-u."
              : "1st place at the 3rd UNINP Hackathon.",
          meta: "achievement",
        },
      ],
      projects: projects.map((project) => ({
        id: project.id,
        name: `${project.name}.project`,
        kind: "file",
        appId: "projects",
        projectId: project.id,
        description: project.description,
        meta: project.tech.join(", "),
      })),
      system: [
        {
          id: "terminal-app",
          name: "Terminal.app",
          kind: "app",
          appId: "terminal",
          description:
            language === "sr"
              ? "Interaktivni terminal sa portfolio komandama."
              : "Interactive terminal with portfolio commands.",
          meta: "shell",
        },
        {
          id: "settings-app",
          name: "Settings.app",
          kind: "app",
          appId: "settings",
          description:
            language === "sr"
              ? "Tema, jezik, boot i layout opcije."
              : "Theme, language, boot and layout preferences.",
          meta: "preferences",
        },
        {
          id: "break-app",
          name: "Break Mode.app",
          kind: "app",
          appId: "minigame",
          description:
            language === "sr"
              ? "Mala pauza unutar sistema."
              : "Small break inside the system.",
          meta: "game",
        },
        {
          id: "trash-app",
          name: "Trash",
          kind: "app",
          appId: "trash",
          description:
            language === "sr"
              ? "Odbačene beleške i sitni sistemski detalji."
              : "Discarded notes and small system details.",
          meta: "utility",
        },
      ],
    }),
    [copy.profile, copy.projects, language, profile, projects]
  );

  const tokens = searchTokens(query);
  const searching = tokens.length > 0;
  const visibleItems = searching
    ? Object.values(folders).flat().filter((item) => {
        const text = normalizeSearch(`${item.name} ${item.description} ${item.meta ?? ""}`);
        return tokens.every((token) => text.includes(token));
      })
    : folders[folder];
  const selected =
    visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0];

  const openFolder = (id: FolderId) =>
    useFinder.setState({ folder: id, selectedId: folders[id][0]?.id ?? "", query: "" });

  const openItem = (item: FinderItem | undefined) => {
    if (!item) return;
    if (item.folder) {
      openFolder(item.folder);
      return;
    }
    if (item.appId) navigatePortfolio(item.appId, item.projectId);
  };

  return (
    <div className={cn("flex bg-[var(--os-window)]", mobile ? "min-h-full flex-col rounded-2xl" : "h-full min-h-0 overflow-hidden")}>
      <nav aria-label={copy.folders} className={cn("shrink-0 bg-[var(--os-control)] p-3", mobile ? "flex flex-wrap gap-1 rounded-t-2xl border-b border-[color:var(--os-border)]" : "w-40 border-r border-[color:var(--os-border)]")}>
        <div className={cn("mb-3 text-[10.5px] uppercase tracking-[0.18em] text-[var(--os-muted)]", mobile && "sr-only")}>
          {copy.folders}
        </div>
        {(["home", "profile", "projects", "system"] as FolderId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => openFolder(id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2.5 text-left text-[13px] transition-colors",
              mobile ? "min-h-11" : "mb-1 w-full py-2",
              folder === id && !searching
                ? "bg-[var(--os-control-hover)] text-[var(--os-text)]"
                : "text-[var(--os-muted)] hover:bg-[var(--os-control-hover)] hover:text-[var(--os-text)]"
            )}
            aria-current={folder === id && !searching ? "location" : undefined}
          >
            <Folder className="h-4 w-4 text-[color:var(--os-accent)]" />
            {copy[id]}
          </button>
        ))}
      </nav>

      <section className="flex min-w-0 flex-1 flex-col">
        <div className={cn("flex shrink-0 items-center gap-2 border-b border-[color:var(--os-border)] bg-[var(--os-window-head)] px-3", mobile ? "flex-wrap py-2" : "h-12")}>
          <button
            type="button"
            onClick={() => searching ? useFinder.setState({ query: "" }) : openFolder("home")}
            disabled={folder === "home" && !query}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[color:var(--os-border)] bg-[var(--os-control)] text-[var(--os-muted)] disabled:opacity-45"
            aria-label={language === "sr" ? "Nazad na početnu" : "Back to Home"}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1 rounded-md border border-[color:var(--os-border)] bg-[var(--os-control)] px-3 py-1.5 text-[12px] text-[var(--os-muted)]">
            InasOS / {searching ? (language === "sr" ? "Pretraga" : "Search") : copy[folder]}
          </div>
          <div className={cn("relative", mobile ? "order-last w-full" : "w-44")}>
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--os-muted)]" />
            <input
              value={query}
              onChange={(e) => useFinder.setState({ query: e.target.value })}
              placeholder={copy.search}
              aria-label={copy.search}
              type="search"
              className={cn("h-10 w-full rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)] pl-8 pr-2 text-[var(--os-text)] outline-none placeholder:text-[var(--os-muted)]", mobile ? "text-base" : "text-sm")}
            />
          </div>
          <button
            type="button"
            onClick={() => useFinder.setState({ view: view === "grid" ? "list" : "grid" })}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[color:var(--os-border)] bg-[var(--os-control)] text-[var(--os-muted)]"
            aria-label={language === "sr" ? (view === "grid" ? "Prikaži listu" : "Prikaži mrežu") : (view === "grid" ? "Switch to list view" : "Switch to grid view")}
          >
            {view === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="os-scroll min-w-0 flex-1 overflow-y-auto p-4">
            {visibleItems.length === 0 ? (
              <div className="grid h-full place-items-center text-[13px] text-[var(--os-muted)]">
                {copy.empty}
              </div>
            ) : (
              <div
                className={cn(
                  view === "grid"
                    ? "grid grid-cols-2 gap-2"
                    : "space-y-1"
                )}
              >
                {visibleItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { useFinder.setState({ selectedId: item.id }); if (mobile) openItem(item); }}
                    onDoubleClick={() => { if (!mobile) openItem(item); }}
                    onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); openItem(item); } }}
                    aria-pressed={mobile ? undefined : selected?.id === item.id}
                    className={cn(
                      "group text-left transition-colors",
                      view === "grid"
                        ? "rounded-lg border border-transparent p-2.5 hover:bg-[var(--os-control)]"
                        : "flex min-h-14 w-full items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-[var(--os-control)]",
                      selected?.id === item.id &&
                        "bg-[var(--os-selection)] ring-1 ring-sky-500/30"
                    )}
                  >
                    <FinderItemIcon item={item} />
                    <div className={cn(view === "grid" ? "mt-2" : "min-w-0")}>
                      <div className="truncate text-[13px] font-medium text-[var(--os-text)]">
                        {item.name}
                      </div>
                      <div className="truncate text-[11.5px] text-[var(--os-muted)]">
                        {item.meta}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {!mobile && <aside className="os-scroll w-56 shrink-0 overflow-y-auto border-l border-[color:var(--os-border)] bg-[var(--os-control)] p-4">
            {selected && (
              <div className="flex h-full flex-col">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-[color:var(--os-border)] bg-gradient-to-br from-white/[0.22] via-white/[0.08] to-white/[0.02] text-[color:var(--os-accent)]">
                  <FinderItemIcon item={selected} large />
                </div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--os-muted)]">
                  {copy.preview}
                </div>
                <h3 className="mt-2 break-words text-[15px] font-semibold text-[var(--os-text)]">
                  {selected.name}
                </h3>
                <dl className="mt-3 space-y-2 text-[12px]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--os-muted)]">{copy.kind}</dt>
                    <dd className="text-right text-[var(--os-text)]">{selected.kind}</dd>
                  </div>
                  {selected.meta && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--os-muted)]">Info</dt>
                      <dd className="text-right text-[var(--os-text)]">{selected.meta}</dd>
                    </div>
                  )}
                </dl>
                <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--os-muted)]">
                  {selected.description}
                </p>
                <Button
                  className="mt-5 w-full"
                  size="sm"
                  variant="secondary"
                  onClick={() => openItem(selected)}
                  disabled={!selected.appId && !selected.folder}
                >
                  {copy.open}
                </Button>
                <p className="mt-2 text-xs text-[var(--os-muted)]">{copy.hint}</p>
              </div>
            )}
          </aside>}
        </div>
      </section>
    </div>
  );
}

function FinderItemIcon({
  item,
  large,
}: {
  item: FinderItem;
  large?: boolean;
}) {
  const className = large ? "h-7 w-7" : "h-5 w-5";
  if (item.folder) {
    return <Folder className={cn(className, "text-[color:var(--os-accent)]")} />;
  }
  if (item.appId) {
    const iconName = appById(item.appId)?.iconName ?? "file";
    return (
      <AppIcon
        name={iconName}
        className={cn(className, "text-[color:var(--os-accent)]")}
        strokeWidth={1.8}
      />
    );
  }
  return <FileText className={cn(className, "text-[color:var(--os-accent)]")} />;
}
