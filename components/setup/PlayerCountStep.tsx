"use client";

import { useWizardStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { RECOMMENDED_REACH } from "@/lib/balance/reach";
import { useI18n } from "@/lib/i18n/context";

const COUNTS = [2, 3, 4, 5, 6];

export function PlayerCountStep() {
  const { playerCount, setPlayerCount, next } = useWizardStore();
  const { t, lang } = useI18n();

  const reach = RECOMMENDED_REACH[playerCount] ?? 17;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          {t("setup_step1_label")}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-2">
          {t("setup_step1_title")}
        </h2>
        <p className="font-body text-ink-soft max-w-md mx-auto text-sm sm:text-base">
          {lang === "en"
            ? "Root supports 2 to 6 players. The number determines the recommended minimum Reach."
            : "Root soporta entre 2 y 6 jugadores. El número determina el Reach mínimo recomendado."}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
        {COUNTS.map((n) => {
          const selected = playerCount === n;
          return (
            <button
              key={n}
              onClick={() => setPlayerCount(n)}
              className={cn(
                "press-effect aspect-square rounded-xl border-2 transition-all",
                "flex flex-col items-center justify-center gap-1",
                "font-display",
                selected
                  ? "bg-ink text-paper-light border-ink shadow-card-hover"
                  : "bg-paper-light/70 text-ink border-ink/20 hover:border-ink/50 hover:bg-paper-light"
              )}
            >
              <span className="text-4xl sm:text-5xl font-bold leading-none">
                {n}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-ui opacity-80">
                {lang === "en" ? (n === 1 ? "player" : "players") : (n === 1 ? "jugador" : "jugadores")}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-paper-dark/40 rounded-lg p-4 border border-ink/10 text-sm font-body text-ink-soft">
        <p>
          <span className="font-semibold">
            {lang === "en" ? `Recommended Reach for ${playerCount}:` : `Reach recomendado para ${playerCount}:`}
          </span>{" "}
          <span className="font-display text-lg font-bold text-rust">
            {reach}+
          </span>
        </p>
        {playerCount === 2 && (
          <p className="mt-1 text-xs text-ink-muted">
            {lang === "en"
              ? "In 2-player games, 2 militant factions are recommended to generate conflict."
              : "En partidas de 2, se recomiendan 2 facciones militantes para generar conflicto."}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={next}
          className="press-effect bg-rust text-paper-light px-6 py-3 rounded-md font-ui font-medium shadow-card hover:shadow-card-hover hover:bg-ember transition-all"
        >
          {lang === "en" ? "Continue →" : "Continuar →"}
        </button>
      </div>
    </div>
  );
}
