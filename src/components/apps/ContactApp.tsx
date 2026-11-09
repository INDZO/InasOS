"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Mail, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { ViewResumeButton } from "@/components/ViewResumeButton";
import { localizedProfile } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";
import { AppHeader } from "./AppHeader";

export default function ContactApp() {
  const [feedback, setFeedback] = useState<"idle" | "copied" | "error">("idle");
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (resetRef.current) clearTimeout(resetRef.current); }, []);
  const copied = feedback === "copied";
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · Kontakt",
          title: "Kontakt",
          best: "Najbolji način za kontakt",
          send: "Pošalji email",
          copy: "Kopiraj email",
          copied: "Kopirano",
          elsewhere: "Profili i biografija",
          error: "Kopiranje nije uspelo. Označi email adresu i kopiraj je, ili koristi dugme za slanje emaila.",
        }
      : {
          eyebrow: "InasOS · Contact",
          title: "Get in touch",
          best: "Best place to reach me",
          send: "Send email",
          copy: "Copy email",
          copied: "Copied",
          elsewhere: "Profiles and résumé",
          error: "Could not copy. Select the email address to copy it, or use the email button.",
        };

  const copyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = profile.email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const success = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!success) throw new Error("Copy unavailable");
      }
      setFeedback("copied");
      if (resetRef.current) clearTimeout(resetRef.current);
      resetRef.current = setTimeout(() => setFeedback("idle"), 2500);
    } catch {
      if (resetRef.current) clearTimeout(resetRef.current);
      setFeedback("error");
    }
  };

  return (
    <div className="space-y-5">
      <AppHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={profile.status}
      />

      <Card className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--os-border)] bg-[var(--os-control)] text-[color:var(--os-accent)]">
            <Mail className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <CardTitle className="select-text break-all">{profile.email}</CardTitle>
            <p className="text-[12px] text-[var(--os-muted)]">{copy.best}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(language === "sr" ? "Kontakt preko portfolija" : "Let's work together")}`}
            className="os-action os-action-primary"
          >
            <Mail className="h-4 w-4" />
            {copy.send}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="os-action"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[var(--os-success)]" />
                {copy.copied}
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                {copy.copy}
              </>
            )}
          </button>
        </div>
        <p role="status" aria-live="polite" className={feedback === "error" ? "text-sm text-[var(--os-muted)]" : "sr-only"}>
          {feedback === "copied" ? copy.copied : feedback === "error" ? copy.error : ""}
        </p>
      </Card>

      <Card>
        <CardSubtitle>{copy.elsewhere}</CardSubtitle>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="os-action">
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="os-action">
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          )}
          <ViewResumeButton />
        </div>
      </Card>
    </div>
  );
}
