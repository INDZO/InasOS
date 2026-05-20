"use client";

import { skillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";
import { localizedProfile } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { AppHeader } from "./AppHeader";

export default function SkillsApp() {
  const language = useLanguageStore((s) => s.language);
  const profile = localizedProfile[language];
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · Veštine",
          title: "Tehnologije i snage",
          description:
            "Grupisan prikaz tehnologija koje koristim, učim i volim da primenjujem.",
          system: "Informacije o sistemu",
          workstation: "InasOS Developer Workstation",
          user: "Korisnik",
          role: "Uloga",
          stack: "Glavni stack",
          interests: "Interesovanja",
          status: "Status",
          version: "Verzija",
        }
      : {
          eyebrow: "InasOS · Skills",
          title: "Tech stack & strengths",
          description:
            "A grouped view of what I use, study and enjoy working with.",
          system: "System information",
          workstation: "InasOS Developer Workstation",
          user: "User",
          role: "Role",
          stack: "Primary stack",
          interests: "Interests",
          status: "Status",
          version: "Version",
        };

  return (
    <div className="space-y-5">
      <AppHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <Card className="bg-gradient-to-br from-orange-500/[0.06] via-transparent to-transparent">
        <CardSubtitle>{copy.system}</CardSubtitle>
        <CardTitle className="mt-1">{copy.workstation}</CardTitle>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-[13px] sm:grid-cols-2">
          <Row label={copy.user} value={profile.name} />
          <Row label={copy.role} value={profile.role} />
          <Row
            label={copy.stack}
            value="React / Angular / ASP.NET Core / SQL"
          />
          <Row
            label={copy.interests}
            value={
              language === "sr"
                ? "Web razvoj, algoritmi, rešavanje problema"
                : "Web Development, Algorithms, Problem Solving"
            }
          />
          <Row label={copy.status} value={profile.status} />
          <Row label={copy.version} value="InasOS v1.0.0" />
        </dl>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <Card key={group.id}>
            <CardSubtitle>{group.title}</CardSubtitle>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="text-right text-zinc-200">{value}</dd>
    </div>
  );
}
