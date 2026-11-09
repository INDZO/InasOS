"use client";

import { FileText } from "lucide-react";
import { resumeActionLabels } from "@/data/portfolio-views";
import { navigatePortfolio } from "@/lib/navigation";
import { useLanguageStore } from "@/store/useLanguageStore";

export function ViewResumeButton() {
  const language = useLanguageStore((state) => state.language);

  return (
    <button type="button" className="os-action" onClick={() => navigatePortfolio("cv")}>
      <FileText size={16} aria-hidden="true" />
      {resumeActionLabels[language]}
    </button>
  );
}
