"use client";

import { useEffect, useState } from "react";
import {
  Grid3X3,
  Image as ImageIcon,
  Info,
  Languages,
  Monitor,
  Power,
  RefreshCw,
  Smartphone,
  SunMoon,
} from "lucide-react";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguageStore } from "@/store/useLanguageStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDesktopStore } from "@/store/useDesktopStore";
import {
  getShowBootOnStartup,
  requestBootReplay,
  setShowBootOnStartup,
} from "@/lib/boot";

export default function SettingsApp() {
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [showBoot, setShowBoot] = useState(true);
  const language = useLanguageStore((s) => s.language);
  const theme = useDesktopStore((s) => s.theme);
  const resetDesktopLayout = useDesktopStore((s) => s.resetDesktopLayout);
  const wallpaperIntensity = useDesktopStore((s) => s.wallpaperIntensity);
  const setWallpaperIntensity = useDesktopStore((s) => s.setWallpaperIntensity);

  useEffect(() => {
    // Read the persisted preference on the client to avoid hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowBoot(getShowBootOnStartup());
  }, []);

  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · Podešavanja",
          title: "Podešavanja",
          description: "Radne opcije za ovaj build InasOS portfolio sistema.",
          system: "Sistem",
          version: "Verzija",
          theme: "Tema",
          accent: "Akcenat",
          mode: "Režim",
          dark: "Tamna",
          light: "Svetla",
          orange: "Narandžasta",
          responsive: "Responsive · Desktop + Mobile",
          desktopTitle: "Desktop radni prostor",
          desktopText:
            "Top bar, dock, desktop ikonice i window manager sa fokusom, minimizacijom, restore i drag ponašanjem.",
          mobileTitle: "Mobilni sistem",
          mobileText:
            "Touch-friendly home ekran, dock i full-screen aplikacije ispod lg breakpoint-a.",
          language: "Jezik",
          languageText: "Promena jezika odmah osvežava glavne ekrane.",
          appearance: "Izgled",
          appearanceText:
            "Light/dark mode menja wallpaper, desktop chrome, dock i prozore.",
          wallpaper: "Intenzitet pozadine",
          wallpaperText:
            "Kontroliše koliko je wallpaper svetao iza prozora. Vrednost se čuva.",
          desktopLayout: "Desktop raspored",
          desktopLayoutText:
            "Vraća ikonice na automatski raspored ako ih pomeriš previše.",
          resetLayout: "Resetuj ikonice",
          boot: "Boot animacija",
          bootText:
            "Boot animacija je deo InasOS doživljaja i prikazuje se pri svakom učitavanju stranice.",
          showBoot: "Prikaži boot pri pokretanju",
          showBootText:
            "Kada je uključeno, boot se prikazuje pri svakom učitavanju. Isključi da ga preskočiš.",
          replay: "Pusti boot ponovo",
          reset: "Učitavam boot...",
          on: "Uključeno",
          off: "Isključeno",
          note:
            "Svaka vidljiva kontrola u podešavanjima ima realan efekat u ovoj verziji.",
        }
      : {
          eyebrow: "InasOS · Settings",
          title: "Preferences",
          description: "Working preferences for this build of InasOS.",
          system: "System",
          version: "Version",
          theme: "Theme",
          accent: "Accent",
          mode: "Mode",
          dark: "Dark",
          light: "Light",
          orange: "Orange",
          responsive: "Responsive · Desktop + Mobile",
          desktopTitle: "Desktop workstation",
          desktopText:
            "Top bar, dock, desktop icons and a window manager with focus, minimize, restore and drag behavior.",
          mobileTitle: "Mobile system",
          mobileText:
            "Touch-friendly home screen, dock and full-screen apps below the lg breakpoint.",
          language: "Language",
          languageText:
            "Switching language updates the main portfolio screens immediately.",
          appearance: "Appearance",
          appearanceText:
            "Light/dark mode changes wallpaper, desktop chrome, dock and windows.",
          wallpaper: "Wallpaper intensity",
          wallpaperText:
            "Controls how bright the wallpaper sits behind windows. Your choice is saved.",
          desktopLayout: "Desktop layout",
          desktopLayoutText:
            "Returns desktop icons to the automatic grid if you move them too far.",
          resetLayout: "Reset icons",
          boot: "Boot animation",
          bootText:
            "The boot animation is part of the InasOS experience and plays on every full page load.",
          showBoot: "Show boot on startup",
          showBootText:
            "When on, boot plays on every page load. Turn it off to skip straight to the desktop.",
          replay: "Replay boot",
          reset: "Reloading into boot...",
          on: "On",
          off: "Off",
          note:
            "Every visible settings control has a real effect in this version.",
        };

  const replayBoot = () => {
    requestBootReplay();
    setResetMsg(copy.reset);
    window.setTimeout(() => window.location.reload(), 600);
  };

  const toggleShowBoot = () => {
    const next = !showBoot;
    setShowBoot(next);
    setShowBootOnStartup(next);
  };

  return (
    <div className="space-y-5">
      <header>
        <CardSubtitle>{copy.eyebrow}</CardSubtitle>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-100">
          {copy.title}
        </h2>
        <p className="mt-1 text-[13px] text-zinc-400">{copy.description}</p>
      </header>

      <Card>
        <CardSubtitle>{copy.system}</CardSubtitle>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-[13px] sm:grid-cols-2">
          <Row label={copy.version} value="InasOS 1.0.0" />
          <Row
            label={copy.theme}
            value={theme === "light" ? copy.light : copy.dark}
          />
          <Row label={copy.accent} value={copy.orange} />
          <Row label={copy.mode} value={copy.responsive} />
        </dl>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="flex gap-3">
          <IconBox>
            <Monitor className="h-5 w-5" />
          </IconBox>
          <div>
            <CardTitle>{copy.desktopTitle}</CardTitle>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
              {copy.desktopText}
            </p>
          </div>
        </Card>
        <Card className="flex gap-3">
          <IconBox>
            <Smartphone className="h-5 w-5" />
          </IconBox>
          <div>
            <CardTitle>{copy.mobileTitle}</CardTitle>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
              {copy.mobileText}
            </p>
          </div>
        </Card>
      </div>

      <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex gap-3">
          <IconBox>
            <Languages className="h-5 w-5" />
          </IconBox>
          <div>
            <CardTitle>{copy.language}</CardTitle>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
              {copy.languageText}
            </p>
          </div>
        </div>
        <LanguageToggle />
      </Card>

      <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex gap-3">
          <IconBox>
            <SunMoon className="h-5 w-5" />
          </IconBox>
          <div>
            <CardTitle>{copy.appearance}</CardTitle>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
              {copy.appearanceText}
            </p>
          </div>
        </div>
        <ThemeToggle showLabel />
      </Card>

      <Card>
        <div className="flex gap-3">
          <IconBox>
            <ImageIcon className="h-5 w-5" />
          </IconBox>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{copy.wallpaper}</CardTitle>
              <span className="terminal-font text-[12px] text-[color:var(--os-accent)]">
                {wallpaperIntensity}%
              </span>
            </div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
              {copy.wallpaperText}
            </p>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={wallpaperIntensity}
          onChange={(e) => setWallpaperIntensity(Number(e.target.value))}
          aria-label={copy.wallpaper}
          className="mt-4 w-full accent-orange-500"
        />
      </Card>

      <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex gap-3">
          <IconBox>
            <Grid3X3 className="h-5 w-5" />
          </IconBox>
          <div>
            <CardTitle>{copy.desktopLayout}</CardTitle>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
              {copy.desktopLayoutText}
            </p>
          </div>
        </div>
        <Button onClick={resetDesktopLayout} size="sm" variant="secondary">
          <RefreshCw className="h-4 w-4" />
          {copy.resetLayout}
        </Button>
      </Card>

      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <IconBox>
            <Power className="h-5 w-5" />
          </IconBox>
          <div>
            <CardTitle>{copy.boot}</CardTitle>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
              {copy.bootText}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--os-border)] bg-[var(--os-control)] px-3.5 py-3">
          <div>
            <div className="text-[13px] font-medium text-[var(--os-text)]">
              {copy.showBoot}
            </div>
            <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-400">
              {copy.showBootText}
            </p>
          </div>
          <Toggle
            on={showBoot}
            onChange={toggleShowBoot}
            label={copy.showBoot}
            onText={copy.on}
            offText={copy.off}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={replayBoot} size="sm" variant="secondary">
            <RefreshCw className="h-4 w-4" />
            {copy.replay}
          </Button>
          {resetMsg && (
            <span className="text-[12px] text-emerald-300">{resetMsg}</span>
          )}
        </div>
      </Card>

      <Card className="flex gap-3">
        <IconBox small>
          <Info className="h-4 w-4" />
        </IconBox>
        <p className="text-[12.5px] leading-relaxed text-zinc-400">
          {copy.note}
        </p>
      </Card>
    </div>
  );
}

function Toggle({
  on,
  onChange,
  label,
  onText,
  offText,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
  onText: string;
  offText: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-1.5 py-1.5 transition-colors ${
        on
          ? "border-orange-400/50 bg-[var(--os-accent-soft)]"
          : "border-[color:var(--os-border)] bg-[var(--os-control)]"
      }`}
    >
      <span className="relative h-5 w-9 rounded-full bg-black/25">
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full shadow transition-all ${
            on
              ? "left-[18px] bg-[color:var(--os-accent)]"
              : "left-0.5 bg-zinc-400"
          }`}
        />
      </span>
      <span className="pr-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--os-muted)]">
        {on ? onText : offText}
      </span>
    </button>
  );
}

function IconBox({
  children,
  small,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-xl border border-[color:var(--os-border)] bg-[var(--os-control)] text-[color:var(--os-accent)] ${
        small ? "h-9 w-9" : "h-10 w-10"
      }`}
    >
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[var(--os-muted)]">{label}</dt>
      <dd className="text-right text-[var(--os-text)]">{value}</dd>
    </div>
  );
}
