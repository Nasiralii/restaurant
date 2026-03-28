"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      className="flex items-center gap-2 rounded-full cursor-pointer px-3 py-2 text-sm font-semibold transition-all duration-200"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-medium)",
        color: "var(--text-secondary)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-muted)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-accent)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--amber-600)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-medium)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
      }}
    >
      <Languages className="h-4 w-4" />
      <span>{language === "ar" ? "EN" : "العربية"}</span>
    </button>
  );
}