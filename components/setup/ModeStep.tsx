"use client";

import { useWizardStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";
import type { SetupMode, ExperienceLevel } from "@/types";
import { getMapsByExpansions } from "@/lib/data/maps";

export function ModeStep() {
  const {
    mode, setMode,
    experienceLevel, setExperienceLevel,
    mapId, setMapId,
    expansions, next, back,
  } = useWizardStore();
  const { lang } = useI18n();

  const availableMaps = getMapsByExpansions(expansions);

  const MODES: { id: SetupMode; title: string; description: string; icon: string }[] = [
    {
      id: "random",
      icon: "🎲",
      title:       lang === "en" ? "Balanced Random"     : "Aleatorio Balanceado",
      description: lang === "en"
        ? "The algorithm picks factions that meet the minimum Reach and respect official exclusions."
        : "El algoritmo elige facciones que cumplan el Reach mínimo y respeten las exclusiones oficiales.",
    },
    {
      id: "draft",
      icon: "♟",
      title:       lang === "en" ? "Turn-Based Draft"    : "Draft por Turnos",
      description: lang === "en"
        ? "A larger pool is generated. Players pick in seat order."
        : "Se genera un pool más grande. Los jugadores eligen por turnos en orden de asiento.",
    },
    {
      id: "manual",
      icon: "✦",
      title:       lang === "en" ? "Manual Selection"    : "Selección Manual",
      description: lang === "en"
        ? "You choose the factions. The app validates the combination in real time."
        : "Tú eliges las facciones. La app valida en tiempo real que la combinación sea legal.",
    },
  ];

  const EXPERIENCE: { id: ExperienceLevel; title: string; description: string }[] = [
    {
      id: "beginner",
      title:       lang === "en" ? "Beginners"     : "Principiantes",
      description: lang === "en" ? "Marquise, Vagabond and easy factions only" : "Solo Marquise, Vagabond y facciones fáciles",
    },
    {
      id: "intermediate",
      title:       lang === "en" ? "Intermediate"  : "Intermedio",
      description: lang === "en" ? "All available factions" : "Todas las facciones disponibles",
    },
    {
      id: "expert",
      title:       lang === "en" ? "Veterans"      : "Veteranos",
      description: lang === "en" ? "All, including complex ones" : "Todas, incluidas las complejas",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          {lang === "en" ? "Step 3 of 4" : "Paso 3 de 4"}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-2">
          {lang === "en" ? "How do we assign factions?" : "¿Cómo asignamos las facciones?"}
        </h2>
        <p className="font-body text-ink-soft max-w-md mx-auto text-sm sm:text-base">
          {lang === "en"
            ? "Choose the selection mode and your group's experience level."
            : "Elige el modo de selección y el nivel de experiencia del grupo."}
        </p>
      </div>

      {/* Mode picker */}
      <div className="space-y-3">
        <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-2">
          {lang === "en" ? "Selection Mode" : "Modo de selección"}
        </p>
        {MODES.map((m) => {
          const selected = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all",
                "flex items-start gap-4",
                selected
                  ? "bg-paper-light border-ink shadow-card"
                  : "bg-paper-light/40 border-ink/15 hover:border-ink/35"
              )}
            >
              <span className="text-2xl shrink-0 mt-0.5" aria-hidden>{m.icon}</span>
              <div className="flex-1">
                <div className="font-display text-lg font-semibold text-ink">{m.title}</div>
                <div className="text-sm text-ink-soft mt-1 font-body leading-relaxed">{m.description}</div>
              </div>
              <div
                className={cn(
                  "shrink-0 w-5 h-5 rounded-full border-2 transition-all mt-1",
                  selected ? "bg-rust border-rust" : "bg-transparent border-ink/30"
                )}
              >
                {selected && <div className="w-1.5 h-1.5 rounded-full bg-paper-light m-auto mt-1" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-2">
          {lang === "en" ? "Group Level" : "Nivel del grupo"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EXPERIENCE.map((e) => {
            const selected = experienceLevel === e.id;
            return (
              <button
                key={e.id}
                onClick={() => setExperienceLevel(e.id)}
                className={cn(
                  "p-3 rounded-lg border-2 transition-all text-left",
                  selected
                    ? "bg-paper-light border-ink shadow-card"
                    : "bg-paper-light/40 border-ink/15 hover:border-ink/35"
                )}
              >
                <div className="font-display font-semibold text-ink">{e.title}</div>
                <div className="text-xs text-ink-muted font-body mt-1">{e.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional map */}
      {availableMaps.length > 0 && (
        <div className="space-y-3">
          <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-2">
            {lang === "en" ? "Map (optional)" : "Mapa (opcional)"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => setMapId(undefined)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all text-left",
                !mapId
                  ? "bg-paper-light border-ink shadow-card"
                  : "bg-paper-light/40 border-ink/15 hover:border-ink/35"
              )}
            >
              <div className="font-display text-sm font-semibold text-ink">
                {lang === "en" ? "Random" : "Aleatorio"}
              </div>
            </button>
            {availableMaps.map((m) => {
              const selected = mapId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMapId(m.id)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all text-left",
                    selected
                      ? "bg-paper-light border-ink shadow-card"
                      : "bg-paper-light/40 border-ink/15 hover:border-ink/35"
                  )}
                >
                  <div className="font-display text-sm font-semibold text-ink">
                    {lang === "en" ? m.name : m.nameES}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <button
          onClick={back}
          className="press-effect text-ink px-4 py-3 rounded-md font-ui font-medium hover:bg-paper-dark/40 transition-all"
        >
          {lang === "en" ? "← Back" : "← Atrás"}
        </button>
        <button
          onClick={next}
          className="press-effect bg-rust text-paper-light px-6 py-3 rounded-md font-ui font-medium shadow-card hover:shadow-card-hover hover:bg-ember transition-all"
        >
          {lang === "en" ? "Generate →" : "Generar →"}
        </button>
      </div>
    </div>
  );
}
