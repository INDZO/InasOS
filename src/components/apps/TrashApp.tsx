"use client";

import { useState } from "react";
import { FileWarning, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguageStore } from "@/store/useLanguageStore";

const FILES = [
  {
    name: "passwords.txt",
    en: "Absolutely not. Passwords do not belong in a portfolio, or in a .txt file.",
    sr: "Apsolutno ne. Lozinke ne pripadaju portfoliju, niti .txt fajlu.",
  },
  {
    name: "old_css_attempts.zip",
    en: "Archived for emotional distance. The current design is cleaner.",
    sr: "Arhivirano zbog distance. Trenutni dizajn je čistiji.",
  },
  {
    name: "unfinished_ideas.md",
    en: "Still useful. Good systems leave room for the next version.",
    sr: "Još uvek korisno. Dobri sistemi ostavljaju prostor za sledeću verziju.",
  },
  {
    name: "debug_screenshots",
    en: "These helped shape the OS, but they are not the final product.",
    sr: "Ovo je pomoglo OS-u, ali nije finalni proizvod.",
  },
];

export default function TrashApp() {
  const language = useLanguageStore((s) => s.language);
  const [selected, setSelected] = useState<(typeof FILES)[number] | null>(null);
  const copy =
    language === "sr"
      ? {
          title: "Trash",
          subtitle: "Sistemski otpad",
          text: "Fajlovi u Trash-u se ne brišu ovde; služe kao mali OS detalji za radoznale posetioce.",
          open: "Otvori",
          close: "OK",
        }
      : {
          title: "Trash",
          subtitle: "System discard",
          text: "Files in Trash are not deleted here; they are small OS details for curious visitors.",
          open: "Open",
          close: "OK",
        };

  return (
    <div className="space-y-4">
      <header className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[color:var(--os-border)] bg-[var(--os-control)] text-[color:var(--os-accent)]">
          <Trash2 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--os-accent)]">
            {copy.subtitle}
          </div>
          <h2 className="mt-1 text-xl font-semibold text-[var(--os-text)]">
            {copy.title}
          </h2>
          <p className="mt-1 max-w-prose text-[13px] leading-relaxed text-[var(--os-muted)]">
            {copy.text}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {FILES.map((file) => (
          <button
            key={file.name}
            type="button"
            onClick={() => setSelected(file)}
            className="flex min-w-0 items-center gap-3 rounded-xl border border-[color:var(--os-border)] bg-[var(--os-control)] p-3 text-left transition-colors hover:bg-[var(--os-control-hover)]"
          >
            <FileWarning className="h-5 w-5 shrink-0 text-[color:var(--os-accent)]" />
            <span className="truncate text-[13px] font-medium text-[var(--os-text)]">
              {file.name}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="rounded-xl border border-[color:var(--os-border-strong)] bg-[var(--os-panel-strong)] p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.65)]">
          <div className="flex gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--os-accent)]" />
            <div className="min-w-0">
              <h3 className="truncate text-[14px] font-semibold text-[var(--os-text)]">
                {selected.name}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--os-muted)]">
                {language === "sr" ? selected.sr : selected.en}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button size="sm" variant="secondary" onClick={() => setSelected(null)}>
              {copy.close}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
