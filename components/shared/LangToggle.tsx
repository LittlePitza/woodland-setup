"use client";

import { useI18n } from "@/lib/i18n/context";

export function LangToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-ink/20 font-ui text-xs text-ink-muted hover:text-ink hover:border-ink/40 transition-all"
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <span className="text-base leading-none">{lang === "es" ? "🇲🇽" : "🇺🇸"}</span>
      <span className="uppercase tracking-wider">{lang === "es" ? "ES" : "EN"}</span>
    </button>
  );
}
