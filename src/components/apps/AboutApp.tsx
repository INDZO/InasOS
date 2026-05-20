"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle } from "@/components/ui/Card";
import { localizedProfile } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { AppHeader } from "./AppHeader";

const languageRows = {
  en: [
    { name: "Serbian", level: "Native" },
    { name: "English", level: "Advanced / Proficient" },
  ],
  sr: [
    { name: "Srpski", level: "Maternji" },
    { name: "Engleski", level: "Napredni / profesionalni" },
  ],
};

export default function AboutApp() {
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];
  const labels =
    language === "sr"
      ? {
          eyebrow: "InasOS · O meni",
          open: "Otvoren za prilike",
          location: "Novi Pazar, Srbija",
          bio: "Biografija",
          focus: "Trenutni fokus",
          availability: "Dostupnost",
          languages: "Jezici",
        }
      : {
          eyebrow: "InasOS · About",
          open: "Open to opportunities",
          location: "Novi Pazar, Serbia",
          bio: "Bio",
          focus: "Current focus",
          availability: "Availability",
          languages: "Languages",
        };

  return (
    <div className="space-y-5">
      <AppHeader
        eyebrow={labels.eyebrow}
        title={profile.name}
        description={profile.role}
      />

      <div className="-mt-2 flex flex-wrap gap-1.5">
        <Badge variant="accent">{labels.open}</Badge>
        <Badge variant="muted">{labels.location}</Badge>
      </div>

      <Card>
        <CardTitle className="mb-2">{labels.bio}</CardTitle>
        <p className="text-[13.5px] leading-relaxed text-zinc-300">
          {profile.bio}
        </p>
      </Card>

      <Card>
        <CardTitle className="mb-2">{labels.focus}</CardTitle>
        <p className="text-[13.5px] leading-relaxed text-zinc-300">
          {profile.focus}
        </p>
      </Card>

      <Card>
        <CardTitle className="mb-2">{labels.availability}</CardTitle>
        <p className="text-[13.5px] leading-relaxed text-zinc-300">
          {profile.status}
        </p>
      </Card>

      <Card>
        <CardTitle className="mb-3">{labels.languages}</CardTitle>
        <ul className="space-y-1.5 text-[13.5px] text-zinc-300">
          {languageRows[language].map((l) => (
            <li key={l.name} className="flex items-center justify-between">
              <span>{l.name}</span>
              <span className="text-zinc-500">{l.level}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
