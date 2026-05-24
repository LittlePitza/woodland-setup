"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LangToggle } from "@/components/shared/LangToggle";
import { FACTIONS } from "@/lib/data/factions";
import { FACTION_SETUPS, LAW_OF_ROOT_SECTIONS } from "@/lib/data/rules";
import { RECOMMENDED_REACH } from "@/lib/balance/reach";
import { cn } from "@/lib/utils";

// ─── Shared map geometry (Fall map, 12 clearings) ───────────────────────────
const CLEARINGS = [
  { id: "A", suit: "fox",    x: 80,  y: 50,  corner: true  },
  { id: "B", suit: "rabbit", x: 210, y: 30,  corner: false },
  { id: "C", suit: "mouse",  x: 340, y: 30,  corner: false },
  { id: "D", suit: "fox",    x: 470, y: 50,  corner: true  },
  { id: "E", suit: "mouse",  x: 100, y: 145, corner: false },
  { id: "F", suit: "rabbit", x: 225, y: 130, corner: false },
  { id: "G", suit: "fox",    x: 340, y: 130, corner: false },
  { id: "H", suit: "mouse",  x: 470, y: 155, corner: false },
  { id: "I", suit: "rabbit", x: 80,  y: 250, corner: true  },
  { id: "J", suit: "fox",    x: 210, y: 270, corner: false },
  { id: "K", suit: "mouse",  x: 340, y: 270, corner: false },
  { id: "L", suit: "rabbit", x: 470, y: 250, corner: true  },
];

const PATHS: [string, string][] = [
  ["A","B"],["B","C"],["C","D"],
  ["A","E"],["B","F"],["C","G"],["D","H"],
  ["E","F"],["F","G"],["G","H"],
  ["E","I"],["F","J"],["G","K"],["H","L"],
  ["I","J"],["J","K"],["K","L"],
];

const SUIT_COLORS: Record<string, string> = {
  fox:    "#C0392B",
  rabbit: "#E67E22",
  mouse:  "#27AE60",
};

const SUIT_SYMBOLS: Record<string, string> = {
  fox: "🦊", rabbit: "🐰", mouse: "🐭",
};

// Pieces: warrior count + optional building per clearing
type MapPiece = { warriors: number; building?: string; color: string };
type MapPieces = Record<string, MapPiece>;

// ─── Mini map SVG ─────────────────────────────────────────────────────────────
function MiniMap({ pieces, highlightIds = [] }: { pieces: MapPieces; highlightIds?: string[] }) {
  return (
    <svg viewBox="0 0 560 310" width="100%" style={{ display: "block" }}>
      {/* Forest bg */}
      <rect x="0" y="0" width="560" height="310" rx="10" fill="#3D6B4A" opacity="0.08" />

      {/* Paths */}
      {PATHS.map(([a, b]) => {
        const ca = CLEARINGS.find(c => c.id === a)!;
        const cb = CLEARINGS.find(c => c.id === b)!;
        return (
          <line
            key={`${a}-${b}`}
            x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y}
            stroke="#8B6914" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.45"
          />
        );
      })}

      {/* Clearings */}
      {CLEARINGS.map(c => {
        const piece = pieces[c.id];
        const suitColor = SUIT_COLORS[c.suit];
        const r = c.corner ? 24 : 20;
        const highlighted = highlightIds.includes(c.id);

        return (
          <g key={c.id}>
            {/* Glow ring when highlighted */}
            {highlighted && (
              <circle cx={c.x} cy={c.y} r={r + 5} fill={piece?.color ?? suitColor} opacity="0.18" />
            )}
            {/* Clearing circle */}
            <circle
              cx={c.x} cy={c.y} r={r}
              fill="#F4E8D0"
              stroke={suitColor}
              strokeWidth={c.corner ? 2.5 : 1.5}
            />
            {/* Suit initial */}
            <text
              x={c.x} y={c.y - 5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8" fontWeight="700"
              fill={suitColor}
            >
              {c.suit[0].toUpperCase()}
            </text>
            {/* Clearing id */}
            <text
              x={c.x} y={c.y + 7}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8" fill="#3D2B1F" opacity="0.6"
            >
              {c.id}
            </text>

            {/* Building badge above circle */}
            {piece?.building && (
              <>
                <rect
                  x={c.x - 18} y={c.y - r - 16}
                  width="36" height="13" rx="4"
                  fill={piece.color} opacity="0.9"
                />
                <text
                  x={c.x} y={c.y - r - 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontWeight="700" fill="#F4E8D0"
                >
                  {piece.building}
                </text>
              </>
            )}

            {/* Warrior dots below circle */}
            {piece && piece.warriors > 0 && Array.from({ length: Math.min(piece.warriors, 6) }).map((_, i) => (
              <circle
                key={i}
                cx={c.x - 10 + (i % 4) * 7}
                cy={c.y + r + 6 + Math.floor(i / 4) * 8}
                r="3.5"
                fill={piece.color}
                opacity="0.92"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Faction setup card with mini-map tab ────────────────────────────────────
// Per-faction pieces for standard setup
const FACTION_MAP_PIECES: Record<string, { standard: MapPieces; advanced: MapPieces }> = {
  "marquise-de-cat": {
    standard: {
      A: { warriors: 2, building: "Keep",  color: "#C0392B" },
      B: { warriors: 1, color: "#C0392B" },
      C: { warriors: 1, color: "#C0392B" },
      D: { warriors: 1, color: "#C0392B" },
      E: { warriors: 1, color: "#C0392B" },
      F: { warriors: 1, color: "#C0392B" },
      G: { warriors: 1, color: "#C0392B" },
      H: { warriors: 1, color: "#C0392B" },
      I: { warriors: 1, color: "#C0392B" },
      J: { warriors: 1, color: "#C0392B" },
      K: { warriors: 1, color: "#C0392B" },
      L: { warriors: 1, color: "#C0392B" },
    },
    advanced: {
      // Keep can be in any corner — we show corner D as example
      D: { warriors: 2, building: "Keep", color: "#C0392B" },
      A: { warriors: 1, color: "#C0392B" },
      B: { warriors: 1, color: "#C0392B" },
      C: { warriors: 1, color: "#C0392B" },
      E: { warriors: 1, color: "#C0392B" },
      F: { warriors: 1, color: "#C0392B" },
      G: { warriors: 1, color: "#C0392B" },
      H: { warriors: 1, color: "#C0392B" },
      I: { warriors: 1, color: "#C0392B" },
      J: { warriors: 1, color: "#C0392B" },
      K: { warriors: 1, color: "#C0392B" },
      L: { warriors: 1, color: "#C0392B" },
    },
  },
  "eyrie-dynasties": {
    standard: {
      D: { warriors: 6, building: "Roost", color: "#2980B9" },
    },
    advanced: {
      // Can choose any free corner
      L: { warriors: 6, building: "Roost", color: "#2980B9" },
    },
  },
  "woodland-alliance": {
    standard: {}, // no pieces
    advanced: {},
  },
  "vagabond": {
    standard: {}, // pawn in forest, not a clearing
    advanced: {},
  },
  "riverfolk-company": {
    standard: {
      // Warriors in river clearings (B, F, J share the river in Fall map)
      B: { warriors: 1, color: "#16A085" },
      F: { warriors: 1, color: "#16A085" },
      J: { warriors: 1, color: "#16A085" },
    },
    advanced: {
      C: { warriors: 1, color: "#16A085" },
      G: { warriors: 1, color: "#16A085" },
      K: { warriors: 1, color: "#16A085" },
    },
  },
  "lizard-cult": {
    standard: {
      // Least-enemy clearing — show I as example
      I: { warriors: 4, building: "Garden", color: "#E67E22" },
    },
    advanced: {
      L: { warriors: 4, building: "Garden", color: "#E67E22" },
    },
  },
  "underground-duchy": {
    standard: {}, // starts in the Burrow (off-map)
    advanced: {},
  },
  "corvid-conspiracy": {
    standard: {
      K: { warriors: 2, building: "Plot", color: "#2C3E50" },
    },
    advanced: {
      K: { warriors: 2, building: "Plot", color: "#2C3E50" },
    },
  },
  "lord-of-the-hundreds": {
    standard: {
      I: { warriors: 4, building: "Hold", color: "#D35400" },
    },
    advanced: {
      L: { warriors: 4, building: "Hold", color: "#D35400" },
    },
  },
  "keepers-in-iron": {
    standard: {
      A: { warriors: 4, color: "#34495E" },
      // Relics spread across map — shown as empty clearings with relic badge
      D: { warriors: 0, building: "Relic", color: "#34495E" },
      J: { warriors: 0, building: "Relic", color: "#34495E" },
      G: { warriors: 0, building: "Relic", color: "#34495E" },
    },
    advanced: {
      I: { warriors: 4, color: "#34495E" },
      B: { warriors: 0, building: "Relic", color: "#34495E" },
      H: { warriors: 0, building: "Relic", color: "#34495E" },
      K: { warriors: 0, building: "Relic", color: "#34495E" },
    },
  },
};

function FactionSetupCard({ factionId }: { factionId: string }) {
  const { lang } = useI18n();
  const [tab, setTab] = useState<"standard" | "advanced" | "map">("standard");

  const faction = FACTIONS.find(f => f.id === factionId);
  const setup = FACTION_SETUPS.find(s => s.factionId === factionId);
  if (!faction || !setup) return null;

  const name = lang === "en" ? faction.name : faction.nameES;
  const startingClearing = lang === "en" ? setup.startingClearingEN : setup.startingClearingES;

  const isAdvanced = tab === "advanced";
  const steps =
    isAdvanced
      ? (lang === "en" ? setup.advancedEN : setup.advancedES)
      : (lang === "en" ? setup.standardEN : setup.standardES);

  const mapData = FACTION_MAP_PIECES[factionId];
  const pieces = mapData ? (isAdvanced ? mapData.advanced : mapData.standard) : {};
  const highlightIds = Object.keys(pieces);
  const hasNoMapPieces = highlightIds.length === 0;

  const tabs = [
    { id: "standard", labelES: "Estándar", labelEN: "Standard" },
    { id: "advanced", labelES: "Avanzado", labelEN: "Advanced" },
    { id: "map",      labelES: "Mapa",     labelEN: "Map" },
  ] as const;

  return (
    <div className="bg-paper-light/70 border border-ink/15 rounded-lg overflow-hidden shadow-card">
      <div className="h-1 w-full" style={{ backgroundColor: faction.color }} />
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl" style={{ color: faction.color }} aria-hidden>{faction.symbol}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl text-ink leading-tight">{name}</h3>
            <p className="font-ui text-xs text-ink-muted mt-0.5">
              {lang === "en" ? "Start:" : "Inicio:"} {startingClearing}
            </p>
          </div>
          <div
            className="shrink-0 w-11 h-11 rounded-full border-2 flex flex-col items-center justify-center font-display font-bold"
            style={{ borderColor: faction.color, color: faction.color }}
          >
            <span className="text-lg leading-none">{faction.reach}</span>
            <span className="text-[8px] uppercase tracking-wide opacity-60">reach</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-paper-dark/20 rounded-lg p-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 py-1.5 rounded-md text-xs font-ui tracking-wide transition-all",
                tab === t.id
                  ? "bg-paper-light text-ink shadow-sm font-medium"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {lang === "en" ? t.labelEN : t.labelES}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "map" ? (
          <div>
            {hasNoMapPieces ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="text-3xl mb-2" style={{ color: faction.color }}>{faction.symbol}</span>
                <p className="font-body text-sm text-ink-soft">
                  {factionId === "vagabond"
                    ? (lang === "en"
                        ? "The Vagabond starts in any forest space (between clearings), not in a clearing."
                        : "El Vagabundo comienza en cualquier espacio de bosque, no en un claro.")
                    : (lang === "en"
                        ? "This faction places no pieces on the map at setup."
                        : "Esta facción no coloca piezas en el mapa al inicio.")}
                </p>
              </div>
            ) : (
              <>
                <MiniMap pieces={pieces} highlightIds={highlightIds} />
                <div className="mt-2 flex flex-wrap gap-2 justify-center">
                  {/* Suit legend */}
                  {["fox","rabbit","mouse"].map(s => (
                    <span key={s} className="font-ui text-[10px] text-ink-muted flex items-center gap-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SUIT_COLORS[s] }} />
                      {s === "fox"
                        ? (lang === "en" ? "Fox" : "Zorro")
                        : s === "rabbit"
                        ? (lang === "en" ? "Rabbit" : "Conejo")
                        : (lang === "en" ? "Mouse" : "Ratón")}
                    </span>
                  ))}
                </div>
                <p className="text-center font-ui text-[10px] text-ink-muted mt-1">
                  {isAdvanced
                    ? (lang === "en" ? "Advanced setup example" : "Ejemplo de setup avanzado")
                    : (lang === "en" ? "Standard setup" : "Setup estándar")}
                </p>
              </>
            )}
          </div>
        ) : (
          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-body text-ink-soft leading-relaxed">
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-ui font-bold mt-0.5"
                  style={{ backgroundColor: faction.color + "22", color: faction.color }}
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

// ─── Classic 4p overview map ──────────────────────────────────────────────────
function ClassicSetupMap() {
  const { lang } = useI18n();

  const pieces: MapPieces = {
    A: { warriors: 2, building: "Keep",  color: "#C0392B" },
    B: { warriors: 1, color: "#C0392B" },
    C: { warriors: 1, color: "#C0392B" },
    D: { warriors: 6, building: "Roost", color: "#2980B9" },
    E: { warriors: 1, color: "#C0392B" },
    F: { warriors: 1, color: "#C0392B" },
    G: { warriors: 1, color: "#C0392B" },
    H: { warriors: 1, color: "#C0392B" },
    I: { warriors: 1, color: "#C0392B" },
    J: { warriors: 1, color: "#C0392B" },
    K: { warriors: 1, color: "#C0392B" },
    L: { warriors: 1, color: "#C0392B" },
  };

  return (
    <div className="bg-paper-light/60 border border-ink/15 rounded-xl p-5 overflow-hidden">
      <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-1 text-center">
        {lang === "en"
          ? "Classic 4-player setup — Fall map (base game)"
          : "Setup clásico de 4 jugadores — Mapa Otoño (juego base)"}
      </p>
      <MiniMap pieces={pieces} highlightIds={Object.keys(pieces)} />

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 justify-center text-xs font-ui">
        {[
          { color: "#C0392B", labelES: "Guerreros Marquesa", labelEN: "Marquise warriors" },
          { color: "#2980B9", labelES: "Guerreros Eyrie",    labelEN: "Eyrie warriors" },
        ].map(l => (
          <span key={l.color} className="flex items-center gap-1.5 text-ink-muted">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
            {lang === "en" ? l.labelEN : l.labelES}
          </span>
        ))}
        {["fox","rabbit","mouse"].map(s => (
          <span key={s} className="flex items-center gap-1.5 text-ink-muted">
            <span className="w-3 h-3 rounded-full border-2" style={{ borderColor: SUIT_COLORS[s], backgroundColor: "transparent" }} />
            {s === "fox"
              ? (lang === "en" ? "Fox clearing" : "Claro Zorro")
              : s === "rabbit"
              ? (lang === "en" ? "Rabbit clearing" : "Claro Conejo")
              : (lang === "en" ? "Mouse clearing" : "Claro Ratón")}
          </span>
        ))}
      </div>

      <p className="text-xs font-body text-ink-muted mt-3 text-center italic leading-relaxed">
        {lang === "en"
          ? "Marquise: 1 warrior per clearing + Keep & 2 warriors in corner A. Eyrie: 6 warriors + Roost in corner D. Alliance & Vagabond: no pieces at start."
          : "Marquesa: 1 guerrero por claro + Keep y 2 guerreros en esquina A. Eyrie: 6 guerreros + Roost en esquina D. Alianza y Vagabundo: sin piezas al inicio."}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RulesPage() {
  const { lang } = useI18n();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [setupExpansion, setSetupExpansion] = useState<string>("base");

  const setupFactions = FACTIONS.filter(
    f => f.expansion === setupExpansion && FACTION_SETUPS.some(s => s.factionId === f.id)
  );

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
              ? "Key sections of the Law of Root, faction setup instructions with map preview, and a classic 4-player example."
              : "Secciones clave de la Ley de Root, instrucciones de setup por facción con vista de mapa, y un ejemplo clásico de 4 jugadores."}
          </p>
          <p className="mt-2 font-ui text-xs text-ink-muted">
            {lang === "en"
              ? "Source: Law of Root — therootdatabase.com (updated March 2026)"
              : "Fuente: Law of Root — therootdatabase.com (actualizado marzo 2026)"}
          </p>
        </section>

        {/* Reach table */}
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
                <div className="font-ui text-[10px] uppercase tracking-wider text-ink-muted mb-1">
                  {lang === "en" ? "players" : "jugadores"}
                </div>
                <div className="font-display text-2xl font-bold text-rust">{RECOMMENDED_REACH[n]}+</div>
                <div className="font-ui text-[9px] uppercase tracking-wider text-ink-muted">Reach</div>
              </div>
            ))}
          </div>
        </section>

        {/* Law of Root accordion */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">
              {lang === "en" ? "Law of Root — Key Rules" : "Ley de Root — Reglas Clave"}
            </span>
          </div>
          <div className="space-y-3">
            {LAW_OF_ROOT_SECTIONS.map(section => {
              const isOpen = activeSection === section.id;
              const title   = lang === "en" ? section.titleEN   : section.titleES;
              const content = lang === "en" ? section.contentEN : section.contentES;
              return (
                <div key={section.id} className="bg-paper-light/70 border border-ink/15 rounded-lg overflow-hidden shadow-card">
                  <button
                    onClick={() => setActiveSection(isOpen ? null : section.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-paper-dark/20 transition-all"
                  >
                    <span className="font-display text-lg text-ink">{title}</span>
                    <span className={cn("text-ink-muted transition-transform duration-200 text-sm", isOpen && "rotate-180")}>▾</span>
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
            {lang === "en" ? "Full reference: " : "Referencia completa: "}
            <a href="https://www.therootdatabase.com/law-of-root/" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
              therootdatabase.com
            </a>
          </p>
        </section>

        {/* Classic map example */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">
              {lang === "en" ? "Map Example" : "Ejemplo de Mapa"}
            </span>
          </div>
          <ClassicSetupMap />
        </section>

        {/* Faction setups */}
        <section>
          <div className="deco-divider mb-6">
            <span className="font-display italic">
              {lang === "en" ? "Faction Setup" : "Setup por Facción"}
            </span>
          </div>
          <p className="text-center font-body text-sm text-ink-muted mb-5">
            {lang === "en"
              ? "Each card shows the setup steps and a map preview. Use the tabs to switch between Standard, Advanced, and Map view."
              : "Cada tarjeta muestra los pasos de setup y una vista de mapa. Usa las pestañas para cambiar entre Estándar, Avanzado y Mapa."}
          </p>

          {/* Expansion filter */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {["base","riverfolk","underworld","marauder"].map(exp => (
              <button
                key={exp}
                onClick={() => setSetupExpansion(exp)}
                className={cn(
                  "px-3 py-1.5 rounded-full font-ui text-xs border transition-all",
                  setupExpansion === exp
                    ? "bg-ink text-paper-light border-ink"
                    : "bg-paper-light/60 text-ink-muted border-ink/20 hover:border-ink/40"
                )}
              >
                {exp === "base" ? "Base" : exp === "riverfolk" ? "Riverfolk" : exp === "underworld" ? "Underworld" : "Marauder"}
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

        <div className="text-center pb-4">
          <Link href="/" className="font-ui text-sm text-ink-muted hover:text-ink transition-colors">
            {lang === "en" ? "← Back to home" : "← Volver al inicio"}
          </Link>
        </div>
      </div>
    </main>
  );
}
