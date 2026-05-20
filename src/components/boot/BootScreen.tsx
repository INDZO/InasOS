"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { InasLogo } from "@/components/InasLogo";
import { shellCopy } from "@/data/i18n";
import { useLanguageStore } from "@/store/useLanguageStore";

const LINE_DELAY = 240;

type Props = { onComplete: () => void };

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function BootScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const completedRef = useRef(false);
  const language = useLanguageStore((s) => s.language);
  const copy = shellCopy[language];
  const bootLines = copy.bootLines as string[];

  useEffect(() => {
    const speed = prefersReducedMotion() ? 0.2 : 1;

    let cancelled = false;
    const timers: number[] = [];

    const schedule = (idx: number, t: number) => {
      const id = window.setTimeout(() => {
        if (cancelled) return;
        setStep(idx + 1);
      }, t);
      timers.push(id);
    };

    let t = 260 * speed;
    bootLines.forEach((_, idx) => {
      schedule(idx, t);
      t += LINE_DELAY * speed;
    });

    const finishId = window.setTimeout(() => {
      if (cancelled) return;
      setDone(true);
    }, t + 280 * speed);
    timers.push(finishId);

    const closeId = window.setTimeout(() => {
      if (cancelled) return;
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, t + 820 * speed);
    timers.push(closeId);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [bootLines, onComplete]);

  const handleSkip = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070B]"
        aria-label="InasOS booting"
      >
        <div className="boot-wallpaper absolute inset-0" />
        <div className="absolute inset-0 os-noise opacity-35" />

        <div className="relative z-10 w-full max-w-xl px-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <InasLogo
              className="mx-auto justify-center"
              markClassName="h-20 w-20 rounded-[22px]"
              showWordmark={false}
            />
            <div className="mt-5 text-2xl font-semibold tracking-tight text-zinc-100">
              InasOS <span className="text-orange-300">v1.0</span>
            </div>
            <div className="mt-1 text-xs text-zinc-400">
              {copy.bootSubtitle as string}
            </div>
          </motion.div>

          <div className="mx-auto h-1.5 max-w-[280px] overflow-hidden rounded-full border border-white/10 bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-amber-200"
              animate={{
                width: `${Math.min(100, (step / bootLines.length) * 100)}%`,
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            />
          </div>

          <div className="terminal-font mt-8 text-[12px] leading-6 text-zinc-300 sm:text-[13px] sm:leading-7">
            {bootLines.slice(0, step).map((line, idx) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <span
                  className={cn(
                    "rounded-sm border px-1.5 text-[10px] font-semibold uppercase tracking-wider",
                    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  )}
                >
                  OK
                </span>
                <span className="text-zinc-200">{line}</span>
                {idx === step - 1 && !done && (
                  <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-orange-400/80" />
                )}
              </motion.div>
            ))}

            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-4 text-orange-300"
              >
                {copy.bootWelcome as string}
              </motion.div>
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSkip}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-zinc-100"
              aria-label="Skip boot animation"
            >
              {copy.bootSkip as string}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
