# InasOS — Interactive Developer Portfolio

An interactive, browser-based "operating system" portfolio for **Inas Hamzagić**,
a Software Engineering student at the State University of Novi Pazar.

The site boots like a real OS and then splits into two responsive experiences:

- **InasOS Desktop** — a macOS-inspired developer workstation with a top bar,
  dock, draggable windows and a built-in terminal.
- **InasOS Mobile** — a touch-friendly early-smartphone-style home screen with
  full-screen app views.

> No 3D / WebGL — built with Next.js, Tailwind and a Zustand-powered window manager.

## Features

- Short, skippable OS-style boot animation, enabled by default on the main page.
- Desktop OS:
  - macOS-style menu bar with anchored dropdown menus and a live clock.
  - Desktop icons (draggable, position persisted) and a bottom dock.
  - Window manager (open / close / minimize / restore / focus / drag /
    maximize) with correct z-index stacking.
  - Start launcher with app search and a Control Center popover.
  - Glassmorphism windows with traffic-light controls.
- Mobile OS:
  - Status bar, app grid, dock and full-screen app screens with back nav.
- Light / dark theme and English / Serbian language, both persisted.
- Bilingual Quick Overview with featured projects, direct links and contact.
- Apps: Finder, About, Projects, Skills, Education, Hackathon, Contact,
  Settings, Trash, Break Mode (bug-catcher game) and an interactive Terminal.
- Terminal with command history: `help`, `whoami`, `projects`, `open contact`,
  `open github`, `sudo hire-inas`, `clear` and more.
- Type-safe data-first content (`src/data/*.ts`).
- Accessible: real buttons, keyboard support, focus rings, ARIA labels,
  reduced-motion support.
- SEO / OG metadata, orange accent.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Zustand (OS state)
- Framer Motion (subtle animation)
- lucide-react (icons)
- `clsx` + `tailwind-merge`

## Folder structure

```
src/
  app/
    layout.tsx        # Metadata, fonts, root html
    page.tsx          # Mounts the OS shell
    globals.css       # Theme tokens, wallpaper, glass, scrollbar
  components/
    OSShell.tsx
    AppIcon.tsx
    boot/BootScreen.tsx
    desktop/
      DesktopOS.tsx
      DesktopWallpaper.tsx
      TopBar.tsx
      Dock.tsx
      DesktopIcon.tsx
      DesktopWindow.tsx
      WindowManager.tsx
      MinimizedTray.tsx
    mobile-os/
      MobileOS.tsx
      MobileStatusBar.tsx
      MobileHome.tsx
      MobileIcon.tsx
      MobileDock.tsx
      MobileAppScreen.tsx
    apps/
      AppRenderer.tsx AppHeader.tsx FinderApp.tsx
      AboutApp.tsx ProjectsApp.tsx SkillsApp.tsx
      EducationApp.tsx HackathonApp.tsx TerminalApp.tsx
      ContactApp.tsx SettingsApp.tsx
      MiniGameApp.tsx TrashApp.tsx
    ui/ Badge.tsx Button.tsx Card.tsx
  data/    profile.ts projects.ts skills.ts apps.ts i18n.ts
  store/   useWindowStore.ts useMobileStore.ts
           useDesktopStore.ts useLanguageStore.ts
  lib/     cn.ts terminal.ts
  types/   os.ts portfolio.ts
public/
  projects/             # project previews
```

## Local setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm start
```

## Updating portfolio content

All content lives in `src/data/`:

| File                  | What to edit                                                                |
| --------------------- | --------------------------------------------------------------------------- |
| `src/data/profile.ts` | name, role, tagline, bio, status, email, education, achievement, languages  |
| `src/data/projects.ts`| project entries (group, bilingual copy, technologies, previews, links)   |
| `src/data/skills.ts`  | grouped skills                                                              |
| `src/data/apps.ts`    | which apps appear on desktop & in the dock                                  |

Set project links only for public destinations. The interface hides actions for omitted links.

## Deploying to Vercel

1. Push the project to GitHub.
2. On vercel.com, import the repo.
3. Defaults are correct (Next.js + Node 20+).
4. After the first deploy, add a custom domain if desired.

No environment variables are required.

## Testing

No automated test suite is wired up yet. Lint and the production build act as
the current correctness gate:

```bash
npm run lint
npm run build
```

Terminal command parsing lives in `src/lib/terminal.ts` and store logic in
`src/store/*` — both are pure and unit-test friendly if a test runner
(e.g. Vitest) is added later.

## Known limitations

- Windows are draggable and maximizable but not free-resizable.
- The boot animation respects reduced motion. Use **Settings → Boot animation**
  to change your startup preference or replay it once.
- Project repositories are not individually linked — only the main GitHub
  profile is configured. Set each project's `github` / `live` field to enable
  per-project links.
- The PDF preview in the CV app is hidden on small screens.

## Future improvements

- Free window resizing and persisted window layout.
- Multiple accent colors.
- More terminal commands and easter eggs.
- An automated test suite (Vitest + Testing Library).

---

Built by Inas Hamzagić. © InasOS v1.0.0.
