"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  translations,
  type Language,
  type TranslationKey,
} from "./translations";

interface I18nContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "es",
  setLang: () => {},
  t: (key) => translations.es[key],
});

function detectLanguage(): Language {
  if (typeof navigator === "undefined") return "es";
  const locale = navigator.language || "es";
  // Accept any English locale (en, en-US, en-GB …)
  if (locale.toLowerCase().startsWith("en")) return "en";
  return "es";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    const stored = localStorage.getItem("woodland_lang") as Language | null;
    if (stored === "en" || stored === "es") {
      setLangState(stored);
    } else {
      setLangState(detectLanguage());
    }
  }, []);

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem("woodland_lang", l);
  }

  function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations.es[key];
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
