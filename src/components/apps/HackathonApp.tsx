"use client";

import { Trophy, Sparkles } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { localizedAchievement } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";
import { AppHeader } from "./AppHeader";

export default function HackathonApp() {
  const language = useLanguageStore((s) => s.language);
  const achievement = localizedAchievement[language];
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · Dostignuća",
          title: "Hackathon",
          description: "Kratak prikaz najvažnijeg timskog rezultata.",
          achievement: "Dostignuće",
          build: "24h izrada",
          teamwork: "Timski rad",
          problem: "Rešavanje problema",
          presentation: "Prezentacija",
        }
      : {
          eyebrow: "InasOS · Achievements",
          title: "Hackathon",
          description: "A short highlight of the most recent team achievement.",
          achievement: "Achievement",
          build: "24-hour build",
          teamwork: "Teamwork",
          problem: "Problem solving",
          presentation: "Presentation",
        };

  return (
    <div className="space-y-5">
      <AppHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/[0.10] via-orange-500/[0.03] to-transparent">
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-orange-400/30 bg-orange-500/15 text-orange-300">
            <Trophy className="h-6 w-6" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-orange-300">
              <Sparkles className="h-3.5 w-3.5" /> {copy.achievement}
            </div>
            <CardTitle className="mt-1 text-lg">{achievement.title}</CardTitle>
            <p className="mt-1 text-[12.5px] text-zinc-400">
              {achievement.organizer} · {achievement.date}
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-200">
              {achievement.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="accent">{copy.build}</Badge>
              <Badge>{copy.teamwork}</Badge>
              <Badge>{copy.problem}</Badge>
              <Badge>{copy.presentation}</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
