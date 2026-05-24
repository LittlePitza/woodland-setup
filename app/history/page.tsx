"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadHistory, deleteSetup, clearHistory } from "@/lib/storage/history";
import { getFaction } from "@/lib/data/factions";
import { MAPS } from "@/lib/data/maps";
import { useI18n } from "@/lib/i18n/context";
import { LangToggle } from "@/components/shared/LangToggle";
import type { GameSetup } from "@/types";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [history, setHistory] = useState<GameSetup[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);
  const { lang } = useI18n();

  useEffect(() => { setHistory(loadHistory()); }, []);

  const handleDelete = (id: string) => {
    deleteSetup(id);
    setHistory(loadHistory());
  };

  const handleClearAll = () => {
    if (confirmClear) {
      clearHistory();
      setHistory([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:py-10 max-w-3xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-ink hover:text-rust transition-colors">
          <span className="text-bark mr-2">❦</span>
          Woodland Setup
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/setup" className="font-ui text-sm text-rust hover:text-ember transition-colors">
            {lang === "en" ? "+ New" : "+ Nueva"}
          </Link>
          <LangToggle />
        </div>
      </header>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-2">
          {lang === "en" ? "History" : "Historial"}
        </p>
        <h1 className="font-display text-4xl text-ink">
          {lang === "en" ? "Past Games" : "Partidas anteriores"}
        </h1>
        <p className="font-body text-ink-soft mt-2">
          {history.length === 0
            ? (lang === "en" ? "No saved games yet." : "Aún no hay partidas guardadas.")
            : `${history.length} ${
                history.length === 1
                  ? (lang === "en" ? "saved game" : "partida guardada")
                  : (lang === "en" ? "saved games" : "partidas guardadas")
              }.`}
        </p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 bg-paper-light/50 rounded-lg border border-ink/10">
          <div className="text-5xl mb-4" aria-hidden>🍂</div>
          <p className="font-body text-ink-soft mb-6">
            {lang === "en" ? "The forest is still silent." : "El bosque aún está en silencio."}
          </p>
          <Link
            href="/setup"
            className="press-effect inline-block bg-ink text-paper-light px-6 py-3 rounded-md font-ui font-medium hover:bg-ink-soft transition-all"
          >
            {lang === "en" ? "Generate a game" : "Generar una partida"}
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {history.map((setup) => (
              <SetupHistoryCard
                key={setup.id}
                setup={setup}
                onDelete={() => handleDelete(setup.id)}
                lang={lang}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={handleClearAll}
              className={cn(
                "press-effect text-sm font-ui px-4 py-2 rounded-md transition-all",
                confirmClear ? "bg-rust text-paper-light" : "text-ink-muted hover:text-rust"
              )}
            >
              {confirmClear
                ? (lang === "en" ? "Delete all? Confirm" : "¿Borrar todo? Confirma")
                : (lang === "en" ? "Clear history" : "Borrar historial")}
            </button>
          </div>
        </>
      )}
    </main>
  );
}

function SetupHistoryCard({
  setup, onDelete, lang,
}: {
  setup: GameSetup;
  onDelete: () => void;
  lang: string;
}) {
  const date = new Date(setup.date);
  const locale = lang === "en" ? "en-US" : "es-MX";
  const formatted = date.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
  const time = date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
  const map = setup.mapId ? MAPS.find((m) => m.id === setup.mapId) : null;
  const mapName = map ? (lang === "en" ? map.name : map.nameES) : null;

  const modeLabel = {
    random: lang === "en" ? "Random" : "Aleatorio",
    draft:  lang === "en" ? "Draft"  : "Draft",
    manual: lang === "en" ? "Manual" : "Manual",
    guided: lang === "en" ? "Guided" : "Guiado",
  }[setup.mode] ?? setup.mode;

  return (
    <div className="bg-paper-light/80 rounded-lg p-4 sm:p-5 border border-ink/15 shadow-card">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {setup.playerCount} {lang === "en" ? "players" : "jugadores"}
            {mapName && <span className="text-ink-muted font-normal text-base ml-2">· {mapName}</span>}
          </p>
          <p className="font-ui text-xs text-ink-muted">
            {formatted} {lang === "en" ? "at" : "a las"} {time} · {modeLabel}
          </p>
        </div>
        <button
          onClick={onDelete}
          aria-label={lang === "en" ? "Delete game" : "Eliminar partida"}
          className="text-ink-muted/60 hover:text-rust transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-2 14H7L5 6m5 0V4a1 1 0 011-1h2a1 1 0 011 1v2" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {setup.factions.map((af) => {
          const faction = getFaction(af.factionId);
          if (!faction) return null;
          return (
            <span
              key={af.factionId}
              className="inline-flex items-center gap-1.5 text-xs font-ui px-2 py-1 rounded-md bg-paper-dark/40"
              style={{ borderLeft: `3px solid ${faction.color}` }}
            >
              <span style={{ color: faction.color }} aria-hidden>{faction.symbol}</span>
              <span className="text-ink-soft">{faction.name}</span>
            </span>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-ink/10">
        <span className="font-ui text-xs text-ink-muted">
          Reach{" "}
          <span className={cn("font-display font-bold text-base ml-1", setup.isBalanced ? "text-moss" : "text-rust")}>
            {setup.totalReach}
          </span>
          <span className="text-ink-muted">/{setup.recommendedReach}</span>
        </span>
        <span className={cn("text-xs font-ui", setup.isBalanced ? "text-moss" : "text-rust")}>
          {setup.isBalanced
            ? (lang === "en" ? "✓ Balanced" : "✓ Balanceada")
            : (lang === "en" ? "⚠ Below threshold" : "⚠ Bajo umbral")}
        </span>
      </div>
    </div>
  );
}
