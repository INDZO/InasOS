"use client";

import { useState } from "react";
import { Copy, Mail, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { localizedProfile } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";
import { AppHeader } from "./AppHeader";

export default function ContactApp() {
  const [copied, setCopied] = useState(false);
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
          elsewhere: "Profili",
        }
      : {
          eyebrow: "InasOS · Contact",
          title: "Get in touch",
          best: "Best place to reach me",
          send: "Send email",
          copy: "Copy email",
          copied: "Copied",
          elsewhere: "Elsewhere",
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
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // mailto remains available if clipboard access is blocked
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
          <div>
            <CardTitle>{profile.email}</CardTitle>
            <p className="text-[12px] text-zinc-500">{copy.best}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-[13px] font-medium text-white hover:bg-orange-400"
          >
            <Mail className="h-4 w-4" />
            {copy.send}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)] px-4 py-2 text-[13px] font-medium text-[var(--os-text)] hover:bg-[var(--os-control-hover)]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
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
      </Card>

      {(profile.github || profile.linkedin) && (
        <Card>
          <CardSubtitle>{copy.elsewhere}</CardSubtitle>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)] px-3 py-2 text-[13px] text-[var(--os-text)] hover:bg-[var(--os-control-hover)]"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] bg-[var(--os-control)] px-3 py-2 text-[13px] text-[var(--os-text)] hover:bg-[var(--os-control-hover)]"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
