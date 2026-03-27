"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold text-[#3a2f27] hover:bg-[#c28a52] hover:text-white hover:border-[#c28a52] transition`}
    >
      <Languages className="h-4 w-4" />
      <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
    </button>
  );
}
