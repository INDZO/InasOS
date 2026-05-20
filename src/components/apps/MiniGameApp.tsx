"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Bug, Play, RotateCcw } from "lucide-react";
import { Card, CardSubtitle, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguageStore } from "@/store/useLanguageStore";

type BugEntity = { id: number; x: number; y: number; bornAt: number };

const ROUND_MS = 25_000;
const SPAWN_MS = 900;
const BUG_LIFE = 1700;

export default function MiniGameApp() {
  const language = useLanguageStore((s) => s.language);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const [bugs, setBugs] = useState<BugEntity[]>([]);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(0);

  const reset = useCallback(() => {
    setScore(0);
    setMisses(0);
    setBugs([]);
    setTimeLeft(ROUND_MS);
  }, []);

  const start = () => {
    reset();
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const startedAt = Date.now();
    const tick = window.setInterval(() => {
      const left = ROUND_MS - (Date.now() - startedAt);
      if (left <= 0) {
        setTimeLeft(0);
        setRunning(false);
        setBugs([]);
        window.clearInterval(tick);
        return;
      }
      setTimeLeft(left);
    }, 200);
    return () => window.clearInterval(tick);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const spawn = window.setInterval(() => {
      const board = boardRef.current;
      if (!board) return;
      const w = board.clientWidth - 48;
      const h = board.clientHeight - 48;
      idRef.current += 1;
      setBugs((prev) => [
        ...prev,
        {
          id: idRef.current,
          x: Math.random() * Math.max(20, w),
          y: Math.random() * Math.max(20, h),
          bornAt: Date.now(),
        },
      ]);
    }, SPAWN_MS);
    return () => window.clearInterval(spawn);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const now = Date.now();
      setBugs((prev) => {
        const stale = prev.filter((b) => now - b.bornAt > BUG_LIFE);
        if (stale.length) setMisses((m) => m + stale.length);
        return prev.filter((b) => now - b.bornAt <= BUG_LIFE);
      });
    }, 200);
    return () => window.clearInterval(id);
  }, [running]);

  const onCatch = (id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  const secondsLeft = Math.max(0, Math.ceil(timeLeft / 1000));
  const copy =
    language === "sr"
      ? {
          eyebrow: "InasOS · Pauza",
          title: "Bug Catcher",
          description: "Uhvatite bugove pre nego što nestanu. Kratka pauza.",
          score: "Poeni",
          misses: "Promašaji",
          time: "Vreme",
          stop: "Stop",
          start: "Start",
          again: "Ponovo",
          over: "Runda završena",
          result: `${score} uhvaćeno, ${misses} promašeno.`,
          prompt: "Klikni Start da pustiš bugove.",
        }
      : {
          eyebrow: "InasOS · Break Mode",
          title: "Bug Catcher",
          description:
            "Click the bugs before they crawl away. Take a short break.",
          score: "Score",
          misses: "Misses",
          time: "Time",
          stop: "Stop",
          start: "Start",
          again: "Play again",
          over: "Round over",
          result: `${score} bugs caught, ${misses} missed.`,
          prompt: "Click Start to release the bugs.",
        };

  return (
    <div className="space-y-4">
      <header>
        <CardSubtitle>{copy.eyebrow}</CardSubtitle>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-100">
          {copy.title}
        </h2>
        <p className="mt-1 text-[13px] text-zinc-400">{copy.description}</p>
      </header>

      <Card className="space-y-3">
        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-4">
            <Stat label={copy.score} value={score} tone="emerald" />
            <Stat label={copy.misses} value={misses} tone="red" />
            <Stat label={copy.time} value={`${secondsLeft}s`} tone="orange" />
          </div>
          {running ? (
            <Button size="sm" variant="secondary" onClick={() => setRunning(false)}>
              <RotateCcw className="h-4 w-4" /> {copy.stop}
            </Button>
          ) : (
            <Button size="sm" onClick={start}>
              <Play className="h-4 w-4" /> {timeLeft === 0 ? copy.again : copy.start}
            </Button>
          )}
        </div>

        <div
          ref={boardRef}
          className="relative h-72 w-full overflow-hidden rounded-xl border border-white/10 bg-[#040608]"
        >
          <div className="pointer-events-none absolute inset-0 os-grid opacity-30" />
          {!running && (
            <div className="absolute inset-0 grid place-items-center text-center">
              {timeLeft === 0 ? (
                <div>
                  <CardTitle>{copy.over}</CardTitle>
                  <p className="mt-1 text-[13px] text-zinc-400">
                    {copy.result}
                  </p>
                </div>
              ) : (
                <div>
                  <Bug className="mx-auto h-9 w-9 text-orange-300" />
                  <p className="mt-2 text-[13px] text-zinc-300">
                    {copy.prompt}
                  </p>
                </div>
              )}
            </div>
          )}

          {bugs.map((b) => (
            <button
              key={b.id}
              onClick={() => onCatch(b.id)}
              style={{ left: b.x, top: b.y }}
              aria-label="Catch bug"
              className="absolute grid h-10 w-10 place-items-center rounded-full bg-orange-500/20 ring-2 ring-orange-400/40 transition-transform hover:scale-110 active:scale-90"
            >
              <Bug className="h-5 w-5 text-orange-200" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "emerald" | "red" | "orange";
}) {
  const toneClass = {
    emerald: "text-emerald-300",
    red: "text-red-300",
    orange: "text-orange-300",
  }[tone];

  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </div>
      <div className={`text-lg font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}
