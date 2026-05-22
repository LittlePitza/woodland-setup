"use client";

import { useWizardStore } from "@/lib/store";
import { EXPANSIONS } from "@/lib/data/expansions";
import { cn } from "@/lib/utils";
import { getFactionsByExpansions } from "@/lib/data/factions";

export function ExpansionsStep() {
  const { expansions, toggleExpansion, next, back, playerCount } =
    useWizardStore();

  const availableFactions = getFactionsByExpansions(expansions).length;
  const canProceed = availableFactions >= playerCount;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          Paso 2 de 4
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-2">
          ¿Qué expansiones tienes?
        </h2>
        <p className="font-body text-ink-soft max-w-md mx-auto text-sm sm:text-base">
          Activa las cajas que vas a usar. Solo entrarán al sorteo facciones
          de las expansiones marcadas.
        </p>
      </div>

      <div className="space-y-3">
        {EXPANSIONS.map((exp) => {
          const selected = expansions.includes(exp.id);
          const isBase = exp.id === "base";
          return (
            <button
              key={exp.id}
              onClick={() => !isBase && toggleExpansion(exp.id)}
              disabled={isBase}
              className={cn(
                "w-full text-left p-4 sm:p-5 rounded-lg border-2 transition-all",
                "flex items-center gap-4",
                selected
                  ? "bg-paper-light border-ink shadow-card"
                  : "bg-paper-light/40 border-ink/15 hover:border-ink/35",
                isBase && "opacity-100 cursor-default"
              )}
            >
              <div
                className={cn(
                  "shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
                  selected
                    ? "bg-ink border-ink text-paper-light"
                    : "bg-paper-light border-ink/40"
                )}
              >
                {selected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="w-4 h-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-display text-lg sm:text-xl font-semibold text-ink">
                  {exp.nameES}
                  {isBase && (
                    <span className="ml-2 text-xs font-ui font-normal text-ink-muted uppercase tracking-widest">
                      requerido
                    </span>
                  )}
                </div>
                <div className="text-xs font-ui text-ink-muted mt-0.5">
                  {exp.year} · {exp.factionCount}{" "}
                  {exp.factionCount === 1 ? "facción" : "facciones"}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-paper-dark/40 rounded-lg p-4 border border-ink/10 text-sm font-body text-ink-soft">
        <p>
          <span className="font-semibold">Facciones disponibles:</span>{" "}
          <span className="font-display text-lg font-bold text-rust">
            {availableFactions}
          </span>
          <span className="text-ink-muted"> · necesitas al menos {playerCount}</span>
        </p>
        {!canProceed && (
          <p className="mt-1 text-xs text-rust">
            Activa más expansiones para tener suficientes facciones.
          </p>
        )}
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={back}
          className="press-effect text-ink px-4 py-3 rounded-md font-ui font-medium hover:bg-paper-dark/40 transition-all"
        >
          ← Atrás
        </button>
        <button
          onClick={next}
          disabled={!canProceed}
          className="press-effect bg-rust text-paper-light px-6 py-3 rounded-md font-ui font-medium shadow-card hover:shadow-card-hover hover:bg-ember transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}
