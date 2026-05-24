"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LangToggle } from "@/components/shared/LangToggle";
import { FACTIONS } from "@/lib/data/factions";
import { FACTION_SETUPS, LAW_OF_ROOT_SECTIONS } from "@/lib/data/rules";
import { RECOMMENDED_REACH } from "@/lib/balance/reach";
import { cn } from "@/lib/utils";

// ─── Map Example Visual ───────────────────────────────────────────────────────
function MapExample() {
  const { lang } = useI18n();

  // 12 clearings — simplified Fall map positions (percent-based in a 100×70 grid)
  const clearings = [
    { id: "A", suit: "fox",    x: 12, y: 12, corner: true,  label: lang === "en" ? "Fox A" : "Zorro A" },
    { id: "B", suit: "rabbit", x: 38, y: 8,  corner: false, label: lang === "en" ? "Rabbit B" : "Conejo B" },
    { id: "C", suit: "mouse",  x: 62, y: 8,  corner: false, label: lang === "en" ? "Mouse C" : "Ratón C" },
    { id: "D", suit: "fox",    x: 88, y: 12, corner: true,  label: lang === "en" ? "Fox D" : "Zorro D" },
    { id: "E", suit: "mouse",  x: 18, y: 38, corner: false, label: lang === "en" ? "Mouse E" : "Ratón E" },
    { id: "F", suit: "rabbit", x: 45, y: 32, corner: false, label: lang === "en" ? "Rabbit F" : "Conejo F" },
    { id: "G", suit: "fox",    x: 70, y: 32, corner: false, label: lang === "en" ? "Fox G" : "Zorro G" },
    { id: "H", suit: "mouse",  x: 88, y: 42, corner: false, label: lang === "en" ? "Mouse H" : "Ratón H" },
    { id: "I", suit: "rabbit", x: 12, y: 62, corner: true,  label: lang === "en" ? "Rabbit I" : "Conejo I" },
    { id: "J", suit: "fox",    x: 38, y: 68, corner: false, label: lang === "en" ? "Fox J" : "Zorro J" },
    { id: "K", suit: "mouse",  x: 62, y: 68, corner: false, label: lang === "en" ? "Mouse K" : "Ratón K" },
    { id: "L", suit: "rabbit", x: 88, y: 62, corner: true,  label: lang === "en" ? "Rabbit L" : "Conejo L" },
  ];

  const paths = [
    ["A","B"],["B","C"],["C","D"],["A","E"],["B","F"],["C","G"],["D","H"],
    ["E","F"],["F","G"],["G","H"],["E","I"],["F","J"],["G","K"],["H","L"],
    ["I","J"],["J","K"],["K","L"],
  ];

  const suitColors: Record<string, string> = {
    fox:    "#C0392B",
    rabbit: "#E67E22",
    mouse:  "#27AE60",
  };

  // Faction pieces on the example map (classic 4p base setup)
  const pieces: Record<string, { faction: string; color: string; count: number; building?: string }> = {
    A: { faction: "Marquise", color: "#C0392B", count: 2, building: "Keep" },
    B: { faction: "Marquise", color: "#C0392B", count: 1 },
    C: { faction: "Marquise", color: "#C0392B", count: 1 },
    D: { faction: "Eyrie",    color: "#2980B9", count: 6, building: "Roost" },
    E: { faction: "Marquise", color: "#C0392B", count: 1 },
    F: { faction: "Marquise", color: "#C0392B", count: 1 },
    G: { faction: "Marquise", color: "#C0392B", count: 1 },
    H: { faction: "Marquise", color: "#C0392B", count: 1 },
    I: { faction: "Marquise", color: "#C0392B", count: 1 },
    J: { faction: "Marquise", color: "#C0392B", count: 1 },
    K: { faction: "Marquise", color: "#C0392B", count: 1 },
    L: { faction: "Marquise", color: "#C0392B", count: 1 },
  };

  return (
    <div className="bg-paper-light/60 border border-ink/15 rounded-xl p-4 overflow-hidden">
      <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-3 text-center">
        {lang === "en" ? "Example: Classic 4-player setup (base game)" : "Ejemplo: Setup clásico de 4 jugadores (juego base)"}
      </p>
      <div className="relative w-full" style={{ paddingBottom: "65%" }}>
        <svg
          viewBox="0 0 500 325"
          className="absolute inset-0 w-full h-full"
          style={{ fontFamily: "inherit" }}
        >
          {/* Forest background */}
          <rect x="0" y="0" width="500" height="325" fill="#2D4A22" rx="8" opacity="0.15"/>

          {/* Paths */}
          {paths.map(([from, to]) => {
            const a = clearings.find(c => c.id === from)!;
            const b = clearings.find(c => c.id === to)!;
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x * 5} y1={a.y * 4.6}
                x2={b.x * 5} y2={b.y * 4.6}
                stroke="#8B6914" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"
              />
            );
          })}

          {/* Clearings */}
          {clearings.map((c) => {
            const cx = c.x * 5;
            const cy = c.y * 4.6;
            const p = pieces[c.id];
            const color = suitColors[c.suit];
            return (
              <g key={c.id}>
                {/* Clearing circle */}
                <circle
                  cx={cx} cy={cy} r={c.corner ? 22 : 18}
                  fill="#F4E8D0" stroke={color} strokeWidth={c.corner ? 2.5 : 1.5}
                />
                {/* Suit label */}
                <text x={cx} y={cy - 6} textAnchor="middle" fontSize="7" fill={color} fontWeight="600">
                  {c.suit.charAt(0).toUpperCase()}
                </text>
                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="7" fill="#3D2B1F" opacity="0.7">
                  {c.id}
                </text>
                {/* Warrior dots */}
                {p && Array.from({ length: Math.min(p.count, 6) }).map((_, i) => (
                  <circle
                    key={i}
                    cx={cx - 8 + (i % 3) * 8}
                    cy={cy + 10 + Math.floor(i / 3) * 7}
                    r="3"
                    fill={p.color}
                    opacity="0.9"
                  />
                ))}
                {/* Building tag */}
                {p?.building && (
                  <text x={cx} y={cy - 14} textAnchor="middle" fontSize="6" fill={p.color} fontWeight="700">
                    [{p.building}]
                  </text>
                )}
              </g>
            );
          })}

          {/* Legend */}
          {[
            { label: lang === "en" ? "Marquise warriors" : "Guerreros Marquesa", color: "#C0392B" },
            { label: lang === "en" ? "Eyrie warriors"    : "Guerreros Eyrie",    color: "#2980B9" },
          ].map((l, i) => (
            <g key={l.label}>
              <circle cx="20" cy={285 + i * 16} r="5" fill={l.color}/>
              <text x="30" y={289 + i * 16} fontSize="9" fill="#3D2B1F" opacity="0.8">{l.label}</text>
            </g>
          ))}

          {/* Suit legend */}
          {[
            { letter: "F", label: lang === "en" ? "Fox" : "Zorro",  color: "#C0392B" },
            { letter: "R", label: lang === "en" ? "Rabbit" : "Conejo", color: "#E67E22" },
            { letter: "M", label: lang === "en" ? "Mouse" : "Ratón",  color: "#27AE60" },
          ].map((s, i) => (
            <g key={s.label}>
              <text x={300 + i * 70} y="318" fontSize="9" fill={s.color} fontWeight="700">{s.letter} = {s.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <p className="text-xs font-body text-ink-muted mt-2 text-center italic">
        {lang === "en"
          ? "The Marquise starts with warriors in all 12 clearings + Keep. Eyrie starts with 6 warriors + Roost in the opposite corner. Woodland Alliance and Vagabond have no pieces at start."
          : "El Marquesado comienza con guerreros en los 12 claros + Keep. El Eyrie comienza con 6 guerreros + Roost en la esquina opuesta. La Alianza y el Vagabundo no tienen piezas al inicio."}
      </p>
    </div>
  );
}

// ─── Faction Setup Card ───────────────────────────────────────────────────────
function FactionSetupCard({ factionId }: { factionId: string }) {
  const { lang } = useI18n();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const faction = FACTIONS.find(f => f.id === factionId);
  const setup = FACTION_SETUPS.find(s => s.factionId === factionId);
  if (!faction || !setup) return null;

  const name = lang === "en" ? faction.name : faction.nameES;
  const startingClearing = lang === "en" ? setup.startingClearingEN : setup.startingClearingES;
  const steps = showAdvanced
    ? (lang === "en" ? setup.advancedEN : setup.advancedES)
    : (lang === "en" ? setup.standardEN : setup.standardES);

  return (
    <div className="bg-paper-light/70 border border-ink/15 rounded-lg overflow-hidden shadow-card">
      <div className="h-1 w-full" style={{ backgroundColor: faction.color }} />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl" style={{ color: faction.color }} aria-hidden>{faction.symbol}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg text-ink leading-tight">{name}</h3>
            <p className="font-ui text-xs text-ink-muted">
              {lang === "en" ? "Start:" : "Inicio:"} {startingClearing}
            </p>
          </div>
          <div
            className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-display font-bold text-sm"
            style={{ borderColor: faction.color, color: faction.color }}
          >
            {faction.reach}
          </div>
        </div>

        {/* Toggle standard / advanced */}
        <div className="flex gap-1 mb-3">
          {["standard", "advanced"].map(mode => (
            <button
              key={mode}
              onClick={() => setShowAdvanced(mode === "advanced")}
              className={cn(
                "flex-1 py-1 rounded text-xs font-ui uppercase tracking-wider transition-all",
                (showAdvanced ? mode === "advanced" : mode === "standard")
                  ? "bg-ink text-paper-light"
                  : "bg-paper-dark/30 text-ink-muted hover:bg-paper-dark/50"
              )}
            >
              {mode === "standard"
                ? (lang === "en" ? "Standard" : "Estándar")
                : (lang === "en" ? "Advanced" : "Avanzado")}
            </button>
          ))}
        </div>

        <ol className="space-y-1.5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-xs font-body text-ink-soft leading-relaxed">
              <span
                className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-ui font-bold mt-0.5"
                style={{ backgroundColor: faction.color + "25", color: faction.color }}
              >
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RulesPage() {
  const { lang, t } = useI18n();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [setupExpansion, setSetupExpansion] = useState<string>("base");

  const baseFactions = FACTIONS.filter(f => f.expansion === "base");
  const setupFactions = FACTIONS.filter(f => f.expansion === setupExpansion && FACTION_SETUPS.some(s => s.factionId === f.id));

  return (
    <main className="min-h-screen">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bark/40 to-transparent" />

      {/* Nav */}
      <nav className="px-4 py-5 max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-ink">
          <span className="text-bark mr-2">❦</span>
          Woodland Setup
        </Link>
        <div className="flex items-center gap-3 font-ui text-sm">
          <Link href="/combinations" className="text-ink-muted hover:text-ink transition-colors hidden sm:inline">
            {lang === "en" ? "Combinations" : "Combinaciones"}
          </Link>
          <Link href="/setup" className="text-ink-muted hover:text-ink transition-colors hidden sm:inline">
            {lang === "en" ? "Start Game" : "Iniciar"}
          </Link>
          <LangToggle />
        </div>
      </nav>

      <div className="px-4 py-8 max-w-4xl mx-auto space-y-14">

        {/* Header */}
        <section className="text-center">
          <p className="font-ui text-xs uppercase tracking-[0.4em] text-ink-muted mb-3">Root</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ink mb-4">
            {lang === "en" ? "Rules" : "Reglas"}
          </h1>
          <p className="font-body text-ink-soft max-w-xl mx-auto">
            {lang === "en"
              ? "Key sections of the Law of Root, faction setup instructions, and a visual map example."
              : "Secciones clave de la Ley de Root, instrucciones de setup por facción y un ejemplo visual de mapa."}
          </p>
          <p className="mt-2 font-ui text-xs text-ink-muted">
            {lang === "en"
              ? "Source: Law of Root — therootdatabase.com (updated March 2026)"
              : "Fuente: Law of Root — therootdatabase.com (actualizado marzo 2026)"}
          </p>
        </section>

        {/* Reach reference table */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">
              {lang === "en" ? "Reach by Player Count" : "Reach por número de jugadores"}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[2,3,4,5,6].map(n => (
              <div key={n} className="bg-paper-light/70 border border-ink/15 rounded-lg p-3 text-center shadow-card">
                <div className="font-display text-3xl font-bold text-ink">{n}</div>
                <div className="font-ui text-[10px] uppercase tracking-wider text-ink-muted mb-2">
                  {lang === "en" ? "players" : "jugadores"}
                </div>
                <div className="font-display text-2xl font-bold text-rust">
                  {RECOMMENDED_REACH[n]}+
                </div>
                <div className="font-ui text-[9px] uppercase tracking-wider text-ink-muted">
                  Reach
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Law of Root sections */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">
              {lang === "en" ? "Law of Root — Key Rules" : "Ley de Root — Reglas Clave"}
            </span>
          </div>
          <div className="space-y-3">
            {LAW_OF_ROOT_SECTIONS.map(section => {
              const isOpen = activeSection === section.id;
              const title = lang === "en" ? section.titleEN : section.titleES;
              const content = lang === "en" ? section.contentEN : section.contentES;
              return (
                <div key={section.id} className="bg-paper-light/70 border border-ink/15 rounded-lg overflow-hidden shadow-card">
                  <button
                    onClick={() => setActiveSection(isOpen ? null : section.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-paper-dark/20 transition-all"
                  >
                    <span className="font-display text-lg text-ink">{title}</span>
                    <span className={cn("font-ui text-ink-muted text-lg transition-transform", isOpen && "rotate-180")}>
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-ink/10">
                      <ul className="mt-4 space-y-2">
                        {content.map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-body text-ink-soft leading-relaxed">
                            <span className="shrink-0 text-bark mt-1">✦</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-center font-ui text-xs text-ink-muted">
            {lang === "en"
              ? "Full reference: "
              : "Referencia completa: "}
            <a
              href="https://www.therootdatabase.com/law-of-root/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink"
            >
              therootdatabase.com
            </a>
          </p>
        </section>

        {/* Map example */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">
              {lang === "en" ? "Map Example" : "Ejemplo de Mapa"}
            </span>
          </div>
          <MapExample />
        </section>

        {/* Faction setups */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">
              {lang === "en" ? "Faction Setup" : "Setup por Facción"}
            </span>
          </div>

          {/* Expansion filter */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {["base","riverfolk","underworld","marauder"].map(exp => (
              <button
                key={exp}
                onClick={() => setSetupExpansion(exp)}
                className={cn(
                  "px-3 py-1.5 rounded-full font-ui text-xs border transition-all capitalize",
                  setupExpansion === exp
                    ? "bg-ink text-paper-light border-ink"
                    : "bg-paper-light/60 text-ink-muted border-ink/20 hover:border-ink/40"
                )}
              >
                {exp === "base"
                  ? "Base"
                  : exp === "riverfolk"
                  ? "Riverfolk"
                  : exp === "underworld"
                  ? "Underworld"
                  : "Marauder"}
              </button>
            ))}
          </div>

          {setupFactions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {setupFactions.map(f => (
                <FactionSetupCard key={f.id} factionId={f.id} />
              ))}
            </div>
          ) : (
            <p className="text-center font-body text-ink-muted py-8">
              {lang === "en" ? "No setup data for this expansion yet." : "Sin datos de setup para esta expansión aún."}
            </p>
          )}
        </section>

        {/* Back */}
        <div className="text-center pb-4">
          <Link href="/" className="font-ui text-sm text-ink-muted hover:text-ink transition-colors">
            {lang === "en" ? "← Back to home" : "← Volver al inicio"}
          </Link>
        </div>
      </div>
    </main>
  );
}
