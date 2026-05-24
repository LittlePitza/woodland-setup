"use client";

import Link from "next/link";
import { FACTIONS } from "@/lib/data/factions";
import { useI18n } from "@/lib/i18n/context";
import { LangToggle } from "@/components/shared/LangToggle";

export default function HomePage() {
  const { t } = useI18n();
  const symbolRow = FACTIONS.slice(0, 7).map((f) => f.symbol);
  const symbolRow2 = FACTIONS.slice(7, 14).map((f) => f.symbol);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bark/40 to-transparent"
        aria-hidden
      />

      <nav className="px-4 py-5 max-w-5xl mx-auto flex items-center justify-between">
        <div className="font-display text-xl text-ink">
          <span className="text-bark mr-2">❦</span>
          Woodland Setup
        </div>
        <div className="flex items-center gap-3 text-sm font-ui">
          <Link
            href="/combinations"
            className="text-ink-muted hover:text-ink transition-colors hidden sm:inline"
          >
            {t("nav_combinations")}
          </Link>
          <Link
            href="/factions"
            className="text-ink-muted hover:text-ink transition-colors hidden sm:inline"
          >
            {t("nav_factions")}
          </Link>
          <Link
            href="/history"
            className="text-ink-muted hover:text-ink transition-colors"
          >
            {t("nav_history")}
          </Link>
          <LangToggle />
        </div>
      </nav>

      <section className="px-4 pt-8 pb-16 sm:pt-16 sm:pb-24 max-w-3xl mx-auto text-center">
        {/* Pre-title ornament */}
        <div
          className="text-xl text-bark/40 tracking-[0.5em] mb-4 select-none"
          aria-hidden
        >
          {symbolRow.join(" ")}
        </div>

        <p className="font-ui text-xs uppercase tracking-[0.4em] text-ink-muted mb-4">
          {t("home_companion")}
        </p>

        <h1 className="font-display text-5xl sm:text-7xl text-ink leading-[0.95] mb-6">
          {t("home_headline1")}
          <br />
          <span className="italic text-rust">{t("home_headline2")}</span>{" "}
          {t("home_headline3")}
        </h1>

        <p className="font-body text-lg sm:text-xl text-ink-soft max-w-xl mx-auto mb-10 leading-relaxed">
          {t("home_subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/setup"
            className="press-effect bg-ink text-paper-light px-8 py-4 rounded-md font-ui font-medium text-lg shadow-card hover:shadow-card-hover hover:bg-ink-soft transition-all min-w-[240px]"
          >
            {t("home_cta_start")}
          </Link>
          <Link
            href="/factions"
            className="press-effect text-ink px-6 py-3 rounded-md font-ui hover:bg-paper-dark/40 transition-all"
          >
            {t("home_cta_factions")}
          </Link>
        </div>

        {/* Post-title ornament */}
        <div
          className="text-xl text-bark/40 tracking-[0.5em] mt-12 select-none"
          aria-hidden
        >
          {symbolRow2.join(" ")}
        </div>
      </section>

      {/* Features section */}
      <section className="px-4 py-12 sm:py-20 max-w-5xl mx-auto">
        <div className="deco-divider mb-12">
          <span className="font-display italic">{t("home_features_title")}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: "🎲",
              title: t("home_feature1_title"),
              desc: t("home_feature1_desc"),
            },
            {
              icon: "♟",
              title: t("home_feature2_title"),
              desc: t("home_feature2_desc"),
            },
            {
              icon: "✦",
              title: t("home_feature3_title"),
              desc: t("home_feature3_desc"),
            },
          ].map((f) => (
            <div key={f.title} className="text-center p-2">
              <div className="text-3xl mb-3" aria-hidden>
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                {f.title}
              </h3>
              <p className="font-body text-sm text-ink-soft leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Factions list */}
      <section className="px-4 py-12 max-w-3xl mx-auto">
        <div className="deco-divider mb-8">
          <span className="font-display italic">{t("home_factions_title")}</span>
        </div>

        <div className="bg-paper-light/60 rounded-lg p-6 border border-ink/10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-body text-sm">
            {FACTIONS.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between py-1 border-b border-ink/5 last:border-0"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="text-base shrink-0"
                    style={{ color: f.color }}
                    aria-hidden
                  >
                    {f.symbol}
                  </span>
                  <span className="truncate text-ink-soft">{f.nameES}</span>
                </span>
                <span
                  className="font-display font-bold text-sm tabular-nums shrink-0 ml-2"
                  style={{ color: f.color }}
                >
                  {f.reach}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-muted font-body italic text-center">
            {t("home_reach_note")}
          </p>
        </div>
      </section>

      {/* Combinations CTA */}
      <section className="px-4 py-8 max-w-3xl mx-auto">
        <Link
          href="/combinations"
          className="block bg-paper-light/70 border border-ink/15 rounded-lg p-6 hover:shadow-card hover:border-ink/30 transition-all group"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-1">
                {t("nav_combinations")}
              </p>
              <h3 className="font-display text-2xl text-ink group-hover:text-rust transition-colors">
                {t("comb_title")} →
              </h3>
              <p className="font-body text-sm text-ink-soft mt-1">
                {t("comb_subtitle")}
              </p>
            </div>
            <div className="text-4xl shrink-0 opacity-40 group-hover:opacity-70 transition-opacity">
              ⚙
            </div>
          </div>
        </Link>
      </section>

      <footer className="px-4 py-8 max-w-3xl mx-auto text-center font-ui text-xs text-ink-muted border-t border-ink/10">
        <p className="mb-2">{t("home_footer_unofficial")}</p>
        <p>
          {t("home_footer_trademark")}{" "}
          <a
            href="https://ledergames.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            Leder Games
          </a>
          {t("home_footer_trademark2")}
        </p>
      </footer>
    </main>
  );
}
