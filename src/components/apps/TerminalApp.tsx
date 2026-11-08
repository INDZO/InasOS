"use client";

import { useEffect, useRef, useState } from "react";
import {
  nextLineId,
  runCommand,
  terminalWelcome,
  type TerminalLine,
} from "@/lib/terminal";
import { useWindowStore } from "@/store/useWindowStore";
import { useMobileStore } from "@/store/useMobileStore";
import { useLanguageStore, type Language } from "@/store/useLanguageStore";
import { cn } from "@/lib/cn";

type Props = { surface: "desktop" | "mobile" };

const PROMPT = "inas@inasos";

export default function TerminalApp({ surface }: Props) {
  const language = useLanguageStore((s) => s.language);
  return <TerminalInner key={language} surface={surface} language={language} />;
}

function TerminalInner({
  surface,
  language,
}: Props & { language: Language }) {
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    terminalWelcome(language).map((l) => ({ ...l, id: nextLineId() }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openWindow = useWindowStore((s) => s.openWindow);
  const openMobileApp = useMobileStore((s) => s.openApp);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    // focus input when terminal mounts
    inputRef.current?.focus();
  }, []);

  const submit = (raw: string) => {
    const trimmed = raw.trim();
    const newLines: TerminalLine[] = [
      ...lines,
      {
        id: nextLineId(),
        kind: "input",
        text: `${PROMPT} $ ${raw}`,
      },
    ];

    if (!trimmed) {
      setLines(newLines);
      return;
    }

    const result = runCommand(trimmed, language);

    if (result.clear) {
      setLines([]);
      return;
    }

    const next: TerminalLine[] = [
      ...newLines,
      ...result.lines.map((l) => ({ ...l, id: nextLineId() })),
    ];
    setLines(next);

    if (result.openApp) {
      const appId = result.openApp;
      // small delay so the user sees the message
      window.setTimeout(() => {
        if (surface === "mobile") {
          openMobileApp(appId);
        } else {
          openWindow(appId);
        }
      }, 250);
    }

    if (result.openUrl) {
      const url = result.openUrl;
      window.setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 250);
    }

    setHistory((h) => [...h, trimmed]);
    setHistoryIdx(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(history[idx] ?? "");
      }
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="terminal-font flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] text-[13px] leading-6 text-[var(--os-text)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--os-border)] bg-[var(--os-control)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--os-muted)]">
        <span>InasOS Terminal</span>
        <span>{PROMPT}</span>
      </div>
      <div
        ref={containerRef}
        className="os-scroll flex-1 overflow-y-auto px-3 py-3"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={cn(
              "whitespace-pre-wrap break-words",
              line.kind === "input" && "text-[var(--os-accent)]",
              line.kind === "error" && "text-[var(--os-danger)]",
              line.kind === "success" && "text-[var(--os-success)]",
              line.kind === "system" && "text-[var(--os-muted)]"
            )}
          >
            {line.text}
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2">
          <span className="shrink-0 text-[var(--os-accent)]">{PROMPT}</span>
          <span className="shrink-0 text-[var(--os-muted)]">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label={language === "sr" ? "Komanda terminala" : "Terminal command"}
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            className="min-w-0 flex-1 bg-transparent caret-[var(--os-accent)] outline-none placeholder:text-[var(--os-muted)]"
            placeholder={
              language === "sr"
                ? `ukucaj "help" i pritisni Enter`
                : `type "help" and press Enter`
            }
          />
        </div>
      </div>
    </div>
  );
}
