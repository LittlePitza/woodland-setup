"use client";

import { useI18n } from "@/lib/i18n/context";

export function LangToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="inline-flex items-center justify-center w-10 h-7 rounded-md border border-ink/20 font-ui text-xs font-medium text-ink-muted hover:text-ink hover:border-ink/40 transition-all tracking-widest uppercase"
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {lang === "es" ? "ES" : "EN"}
    </button>
  );
}
