"use client";

import { useWizardStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { SetupMode, ExperienceLevel } from "@/types";
import { getMapsByExpansions } from "@/lib/data/maps";

const MODES: {
  id: SetupMode;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "random",
    title: "Aleatorio Balanceado",
    description:
      "El algoritmo elige facciones que cumplan el Reach mínimo y respeten las exclusiones oficiales.",
    icon: "🎲",
  },
  {
    id: "draft",
    title: "Draft por Turnos",
    description:
      "Se genera un pool más grande. Los jugadores eligen por turnos en orden de asiento.",
    icon: "♟",
  },
  {
    id: "manual",
    title: "Selección Manual",
    description:
      "Tú eliges las facciones. La app valida en tiempo real que la combinación sea legal.",
    icon: "✦",
  },
];

const EXPERIENCE: {
  id: ExperienceLevel;
  title: string;
  description: string;
}[] = [
  {
    id: "beginner",
    title: "Principiantes",
    description: "Solo Marquise, Vagabond y facciones fáciles",
  },
  {
    id: "intermediate",
    title: "Intermedio",
    description: "Todas las facciones disponibles",
  },
  {
    id: "expert",
    title: "Veteranos",
    description: "Todas, incluidas las complejas",
  },
];

export function ModeStep() {
  const {
    mode,
    setMode,
    experienceLevel,
    setExperienceLevel,
    mapId,
    setMapId,
    expansions,
    next,
    back,
  } = useWizardStore();

  const availableMaps = getMapsByExpansions(expansions);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          Paso 3 de 4
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-2">
          ¿Cómo asignamos las facciones?
        </h2>
        <p className="font-body text-ink-soft max-w-md mx-auto text-sm sm:text-base">
          Elige el modo de selección y el nivel de experiencia del grupo.
        </p>
      </div>

      {/* Mode picker */}
      <div className="space-y-3">
        <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-2">
          Modo de selección
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
              <span className="text-2xl shrink-0 mt-0.5" aria-hidden>
                {m.icon}
              </span>
              <div className="flex-1">
                <div className="font-display text-lg font-semibold text-ink">
                  {m.title}
                </div>
                <div className="text-sm text-ink-soft mt-1 font-body leading-relaxed">
                  {m.description}
                </div>
              </div>
              <div
                className={cn(
                  "shrink-0 w-5 h-5 rounded-full border-2 transition-all mt-1",
                  selected
                    ? "bg-rust border-rust"
                    : "bg-transparent border-ink/30"
                )}
              >
                {selected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-paper-light m-auto mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-2">
          Nivel del grupo
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
                <div className="font-display font-semibold text-ink">
                  {e.title}
                </div>
                <div className="text-xs text-ink-muted font-body mt-1">
                  {e.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional map */}
      {availableMaps.length > 0 && (
        <div className="space-y-3">
          <p className="font-ui text-xs uppercase tracking-widest text-ink-muted mb-2">
            Mapa (opcional)
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
                Aleatorio
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
                    {m.nameES}
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
          ← Atrás
        </button>
        <button
          onClick={next}
          className="press-effect bg-rust text-paper-light px-6 py-3 rounded-md font-ui font-medium shadow-card hover:shadow-card-hover hover:bg-ember transition-all"
        >
          Generar →
        </button>
      </div>
    </div>
  );
}
