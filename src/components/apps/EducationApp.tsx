"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle } from "@/components/ui/Card";
import { localizedEducation } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { AppHeader } from "./AppHeader";

export default function EducationApp() {
  const language = useLanguageStore((s) => s.language);
  const education = localizedEducation[language];
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · Obrazovanje",
          title: "Akademski put",
          description:
            "Od IT smera u gimnaziji do osnovnih studija softverskog inženjerstva.",
          topics: "Oblasti",
        }
      : {
          eyebrow: "InasOS · Education",
          title: "Academic background",
          description:
            "From high-school IT to ongoing Bachelor studies in Software Engineering.",
          topics: "Topics",
        };

  return (
    <div className="space-y-5">
      <AppHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="space-y-4">
        {education.map((e) => (
          <Card key={e.institution} className="space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <CardTitle>{e.degree}</CardTitle>
                <p className="mt-1 text-[13px] text-zinc-400">
                  {e.institution}
                </p>
              </div>
              <Badge variant="accent">
                {e.start} - {e.end}
              </Badge>
            </div>
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                {copy.topics}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {e.topics.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
