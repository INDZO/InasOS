"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, FileText, AlertCircle, RotateCcw } from "lucide-react";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguageStore } from "@/store/useLanguageStore";
import { localizedProfile } from "@/data/i18n";
import { cvPath, portfolioViews } from "@/data/portfolio-views";

type State = "checking" | "available" | "missing";

export default function CVApp() {
  const [state, setState] = useState<State>("checking");
  const [attempt, setAttempt] = useState(0);
  const language = useLanguageStore((s) => s.language);
  const view = portfolioViews[language];
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · CV",
          title: "Curriculum Vitae",
          description: "Dostupna je radna verzija biografije.",
          checking: "Proveravam fajl...",
          ready: "Spremno za preuzimanje.",
          missing: "Fajl nije pronađen.",
          open: "Otvori u novom tabu",
          preview: "Pregled",
          missingTitle: "Pregled trenutno nije dostupan",
          missingNote:
            "Pokušaj ponovo ili mi pošalji email i rado ću ti poslati CV.",
          unavailable: "Preuzimanje nije dostupno",
          retry: "Pokušaj ponovo",
          contact: "Zatraži CV emailom",
        }
      : {
          eyebrow: "InasOS · CV",
          title: "Curriculum Vitae",
          description: "The available PDF is a working draft of my CV.",
          checking: "Checking file...",
          ready: "Ready to download.",
          missing: "File not detected.",
          open: "Open in new tab",
          preview: "Preview",
          missingTitle: "Preview temporarily unavailable",
          missingNote:
            "Try again, or send me an email and I will be happy to share my CV.",
          unavailable: "Download unavailable",
          retry: "Try again",
          contact: "Request CV by email",
        };

  useEffect(() => {
    const controller = new AbortController();
    fetch(cvPath, { method: "HEAD", signal: controller.signal })
      .then((res) => {
        if (controller.signal.aborted) return;
        const ct = res.headers.get("content-type") ?? "";
        const isPdf = /application\/(pdf|octet-stream)/i.test(ct);
        setState(res.ok && isPdf ? "available" : "missing");
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setState("missing");
      });
    return () => {
      controller.abort();
    };
  }, [attempt]);

  return (
    <div className="space-y-5">
      <header>
        <CardSubtitle>{copy.eyebrow}</CardSubtitle>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-100">
          {copy.title}
        </h2>
        <p className="mt-1 text-[13px] text-zinc-400">{copy.description}</p>
      </header>

      <Card className="flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[color:var(--os-border)] bg-[var(--os-control)] text-[color:var(--os-accent)]">
          <FileText className="h-7 w-7" strokeWidth={1.6} />
        </div>
        <div className="min-w-0 flex-1">
          <CardTitle className="break-words">Inas Hamzagić · CV</CardTitle>
          <p role="status" className="mt-1 text-[12.5px] text-zinc-400">
            {state === "checking" && copy.checking}
            {state === "available" && copy.ready}
            {state === "missing" && copy.missing}
          </p>
        </div>
      </Card>

      {state === "available" && (
        <>
          <div className="flex flex-wrap gap-2">
            <a
              href={cvPath}
              download
              className="os-action os-action-primary"
            >
              <Download className="h-4 w-4" />
              {view.draftCv}
            </a>
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="os-action"
            >
              <ExternalLink className="h-4 w-4" />
              {copy.open}
            </a>
          </div>

          <Card className="hidden md:block">
            <CardSubtitle>{copy.preview}</CardSubtitle>
            <div className="mt-3 aspect-[1/1.2] w-full overflow-hidden rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)]">
              <iframe
                src={cvPath}
                title={language === "sr" ? "Pregled biografije" : "CV preview"}
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </Card>
        </>
      )}

      {state === "missing" && (
        <Card className="border-amber-500/20 bg-amber-500/[0.04]">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-amber-400/30 bg-amber-500/10 text-amber-300">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <CardTitle>{copy.missingTitle}</CardTitle>
              <p className="mt-2 text-[12px] text-[var(--os-muted)]">
                {copy.missingNote}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => { setState("checking"); setAttempt((value) => value + 1); }}
            >
              <RotateCcw className="h-4 w-4" />
              {copy.retry}
            </Button>
            <a className="text-sm text-[color:var(--os-accent)] underline underline-offset-4" href={`mailto:${localizedProfile[language].email}?subject=CV`}>{copy.contact}</a>
          </div>
        </Card>
      )}

    </div>
  );
}
