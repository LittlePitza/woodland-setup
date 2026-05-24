"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { LangToggle } from "@/components/shared/LangToggle";
import {
  COMBINATIONS,
  CLOCKWORK_BOTS,
  type FactionCombination,
  type ClockworkBot,
} from "@/lib/data/combinations";
import { FACTIONS } from "@/lib/data/factions";
import { cn } from "@/lib/utils";
import { useState } from "react";

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    official: "bg-amber/20 text-amber border-amber/30",
    community: "bg-moss/20 text-moss border-moss/30",
    beginner: "bg-sky-600/20 text-sky-700 border-sky-600/30",
    advanced: "bg-rust/20 text-rust border-rust/30",
    bot: "bg-bark/20 text-bark border-bark/30",
  };
  const { t } = useI18n();
  const labels: Record<string, string> = {
    official: t("comb_tag_official"),
    community: t("comb_tag_community"),
    beginner: t("comb_tag_beginner"),
    advanced: t("comb_tag_advanced"),
    bot: t("comb_tag_bot"),
  };
  return (
    <span
      className={cn(
        "text-[10px] uppercase tracking-widest font-ui px-2 py-0.5 rounded-full border",
        colors[tag] ?? "bg-ink/10 text-ink-muted border-ink/20"
      )}
    >
      {labels[tag] ?? tag}
    </span>
  );
}

function CombinationCard({ combo }: { combo: FactionCombination }) {
  const { lang, t } = useI18n();
  const factions = combo.factionIds
    .map((id) => FACTIONS.find((f) => f.id === id))
    .filter(Boolean) as typeof FACTIONS;

  const title = lang === "en" ? combo.titleEN : combo.titleES;
  const reason = lang === "en" ? combo.reasonEN : combo.reasonES;
  const botNote =
    lang === "en" ? combo.botSuggestionEN : combo.botSuggestionES;

  return (
    <div className="bg-paper-light/70 border border-ink/15 rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all">
      {/* Reach rainbow stripe */}
      <div className="h-1 w-full flex">
        {factions.map((f) => (
          <div
            key={f.id}
            className="flex-1 h-full"
            style={{ backgroundColor: f.color }}
          />
        ))}
      </div>

      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex flex-wrap gap-1 mb-2">
              {combo.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
            <h3 className="font-display text-xl text-ink">{title}</h3>
            <p className="font-ui text-xs text-ink-muted mt-0.5">
              {combo.playerCount} {t("comb_players")} · {t("comb_reach")} {combo.totalReach}
            </p>
          </div>
        </div>

        {/* Factions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {factions.map((f) => (
            <span
              key={f.id}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-ui border"
              style={{
                borderColor: f.color + "60",
                backgroundColor: f.color + "12",
                color: f.color,
              }}
            >
              <span aria-hidden>{f.symbol}</span>
              <span className="text-ink-soft" style={{ color: "inherit" }}>
                {lang === "en" ? f.name : f.nameES}
              </span>
            </span>
          ))}
        </div>

        {/* Reason */}
        <p className="font-body text-sm text-ink-soft leading-relaxed">
          {reason}
        </p>

        {/* Bot suggestion */}
        {botNote && (
          <div className="mt-3 pt-3 border-t border-ink/10 flex items-start gap-2 text-xs font-body text-bark">
            <span aria-hidden className="text-base shrink-0">⚙</span>
            <span>
              <span className="font-semibold">{t("comb_bots_suggestion")}:</span>{" "}
              {botNote}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function BotCard({ bot }: { bot: ClockworkBot }) {
  const { lang, t } = useI18n();
  const replaces = FACTIONS.find((f) => f.id === bot.replaces);
  const name = lang === "en" ? bot.nameEN : bot.nameES;
  const desc = lang === "en" ? bot.descriptionEN : bot.descriptionES;
  const pairs = lang === "en" ? bot.pairsWellWithEN : bot.pairsWellWithES;

  return (
    <div className="bg-paper-light/70 border border-ink/15 rounded-lg overflow-hidden shadow-card">
      {replaces && (
        <div
          className="h-1 w-full"
          style={{ backgroundColor: replaces.color }}
        />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-2xl"
            style={{ color: replaces?.color }}
            aria-hidden
          >
            ⚙
          </span>
          <div>
            <h4 className="font-display text-lg text-ink">{name}</h4>
            {replaces && (
              <p className="font-ui text-xs text-ink-muted">
                {replaces.symbol}{" "}
                {lang === "en" ? replaces.name : replaces.nameES}
              </p>
            )}
          </div>
        </div>

        <p className="font-body text-sm text-ink-soft mb-3">{desc}</p>

        {/* Difficulty chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {bot.difficultyLevels.map((d, i) => (
            <span
              key={d}
              className="text-[10px] font-ui px-2 py-0.5 rounded-full border"
              style={{
                borderColor: replaces?.color + "60",
                color: replaces?.color,
                backgroundColor: replaces?.color + "12",
              }}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="flex items-start gap-1.5 text-xs font-body text-ink-muted">
          <span className="shrink-0 text-moss mt-0.5">✦</span>
          <span>{pairs}</span>
        </div>
      </div>
    </div>
  );
}

export default function CombinationsPage() {
  const { lang, t } = useI18n();
  const [playerFilter, setPlayerFilter] = useState<number | null>(null);

  const official = COMBINATIONS.filter(
    (c) =>
      c.tags.includes("official") &&
      (playerFilter === null || c.playerCount === playerFilter)
  );
  const community = COMBINATIONS.filter(
    (c) =>
      !c.tags.includes("official") &&
      (playerFilter === null || c.playerCount === playerFilter)
  );

  return (
    <main className="min-h-screen">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bark/40 to-transparent" />

      {/* Nav */}
      <nav className="px-4 py-5 max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-ink">
          <span className="text-bark mr-2">❦</span>
          Woodland Setup
        </Link>
        <div className="flex items-center gap-3 font-ui text-sm">
          <Link href="/rules" className="text-ink-muted hover:text-ink transition-colors hidden sm:inline">
            {lang === "en" ? "Rules" : "Reglas"}
          </Link>
          <Link
            href="/setup" className="text-ink-muted hover:text-ink transition-colors hidden sm:inline">
            {t("home_cta_start")}
          </Link>
          <Link href="/history" className="text-ink-muted hover:text-ink transition-colors">
            {t("nav_history")}
          </Link>
          <LangToggle />
        </div>
      </nav>

      <div className="px-4 py-8 max-w-4xl mx-auto space-y-14">
        {/* Header */}
        <section className="text-center">
          <p className="font-ui text-xs uppercase tracking-[0.4em] text-ink-muted mb-3">
            Root
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-ink mb-4">
            {t("comb_title")}
          </h1>
          <p className="font-body text-ink-soft max-w-xl mx-auto">
            {t("comb_subtitle")}
          </p>

          {/* Player count filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[null, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n ?? "all"}
                onClick={() => setPlayerFilter(n)}
                className={cn(
                  "px-3 py-1.5 rounded-full font-ui text-xs border transition-all",
                  playerFilter === n
                    ? "bg-ink text-paper-light border-ink"
                    : "bg-paper-light/60 text-ink-muted border-ink/20 hover:border-ink/40"
                )}
              >
                {n === null
                  ? lang === "en"
                    ? "All"
                    : "Todos"
                  : `${n}P`}
              </button>
            ))}
          </div>
        </section>

        {/* Official */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">{t("comb_official_title")}</span>
          </div>
          <p className="font-body text-sm text-ink-muted mb-6 text-center">
            {t("comb_official_desc")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {official.length > 0 ? (
              official.map((c) => <CombinationCard key={c.id} combo={c} />)
            ) : (
              <p className="col-span-2 text-center font-body text-ink-muted py-6">
                {lang === "en"
                  ? "No official combinations for this player count."
                  : "Sin combinaciones oficiales para este número de jugadores."}
              </p>
            )}
          </div>
        </section>

        {/* Community */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">{t("comb_community_title")}</span>
          </div>
          <p className="font-body text-sm text-ink-muted mb-6 text-center">
            {t("comb_community_desc")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {community.length > 0 ? (
              community.map((c) => <CombinationCard key={c.id} combo={c} />)
            ) : (
              <p className="col-span-2 text-center font-body text-ink-muted py-6">
                {lang === "en"
                  ? "No community combinations for this player count."
                  : "Sin combinaciones de comunidad para este número de jugadores."}
              </p>
            )}
          </div>
        </section>

        {/* Clockwork Bots */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">{t("comb_bots_title")}</span>
          </div>
          <div className="bg-paper-dark/30 rounded-lg p-4 border border-ink/10 mb-6">
            <p className="font-body text-sm text-ink-soft text-center">
              {t("comb_bots_desc")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLOCKWORK_BOTS.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="text-center pb-4">
          <Link
            href="/"
            className="font-ui text-sm text-ink-muted hover:text-ink transition-colors"
          >
            {t("comb_back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
