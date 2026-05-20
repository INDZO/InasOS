"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, FileText, AlertCircle } from "lucide-react";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguageStore } from "@/store/useLanguageStore";

const CV_PATH = "/cv/Inas-Hamzagic-CV.pdf";

type State = "checking" | "available" | "missing";

export default function CVApp() {
  const [state, setState] = useState<State>("checking");
  const language = useLanguageStore((s) => s.language);
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · CV",
          title: "Curriculum Vitae",
          description: "Preuzmi ili otvori najnoviju verziju biografije.",
          checking: "Proveravam fajl...",
          ready: "Spremno za preuzimanje.",
          missing: "Fajl nije pronađen.",
          download: "Preuzmi CV",
          open: "Otvori u novom tabu",
          preview: "Pregled",
          missingTitle: "CV fajl nije dodat",
          missingPath: "Postavi PDF na:",
          missingNote:
            "Kada fajl postoji, posetioci mogu da ga preuzmu ili pregledaju.",
          unavailable: "Preuzimanje nije dostupno",
        }
      : {
          eyebrow: "InasOS · CV",
          title: "Curriculum Vitae",
          description: "Download or open the latest version of my CV.",
          checking: "Checking file...",
          ready: "Ready to download.",
          missing: "File not detected.",
          download: "Download CV",
          open: "Open in new tab",
          preview: "Preview",
          missingTitle: "CV file not added yet",
          missingPath: "Place a PDF at:",
          missingNote:
            "Once the file is in place, visitors can download or preview it.",
          unavailable: "Download unavailable",
        };

  useEffect(() => {
    let cancelled = false;
    fetch(CV_PATH, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const ct = res.headers.get("content-type") ?? "";
        const isPdf = ct.includes("pdf") || ct === "" || res.status === 200;
        setState(res.ok && isPdf ? "available" : "missing");
      })
      .catch(() => {
        if (cancelled) return;
        setState("missing");
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
        <div className="flex-1">
          <CardTitle>Inas-Hamzagic-CV.pdf</CardTitle>
          <p className="mt-1 text-[12.5px] text-zinc-400">
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
              href={CV_PATH}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-[13px] font-medium text-white shadow-[0_10px_28px_-12px_rgba(249,115,22,0.6)] hover:bg-orange-400"
            >
              <Download className="h-4 w-4" />
              {copy.download}
            </a>
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)] px-4 py-2 text-[13px] font-medium text-[var(--os-text)] hover:bg-[var(--os-control-hover)]"
            >
              <ExternalLink className="h-4 w-4" />
              {copy.open}
            </a>
          </div>

          <Card className="hidden md:block">
            <CardSubtitle>{copy.preview}</CardSubtitle>
            <div className="mt-3 aspect-[1/1.2] w-full overflow-hidden rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)]">
              <iframe
                src={CV_PATH}
                title="CV preview"
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
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-300">
                {copy.missingPath}
              </p>
              <pre className="terminal-font mt-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-[12px] text-orange-200">
                public/cv/Inas-Hamzagic-CV.pdf
              </pre>
              <p className="mt-2 text-[12px] text-zinc-500">
                {copy.missingNote}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Button
              size="sm"
              variant="secondary"
              disabled
              aria-disabled
              title={copy.unavailable}
            >
              <Download className="h-4 w-4" />
              {copy.unavailable}
            </Button>
          </div>
        </Card>
      )}

      {state === "checking" && (
        <div className="text-[13px] text-zinc-500">{copy.checking}</div>
      )}
    </div>
  );
}
