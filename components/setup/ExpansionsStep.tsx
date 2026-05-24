"use client";

import { useWizardStore } from "@/lib/store";
import { EXPANSIONS } from "@/lib/data/expansions";
import { cn } from "@/lib/utils";
import { getFactionsByExpansions } from "@/lib/data/factions";
import { useI18n } from "@/lib/i18n/context";

export function ExpansionsStep() {
  const { expansions, toggleExpansion, next, back, playerCount } =
    useWizardStore();
  const { lang, t } = useI18n();

  const availableFactions = getFactionsByExpansions(expansions).length;
  const canProceed = availableFactions >= playerCount;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          {t("setup_step2_label")}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-2">
          {t("setup_step2_title")}
        </h2>
        <p className="font-body text-ink-soft max-w-md mx-auto text-sm sm:text-base">
          {t("setup_step2_subtitle")}
        </p>
      </div>

      <div className="space-y-3">
        {EXPANSIONS.map((exp) => {
          const selected = expansions.includes(exp.id);
          const isBase = exp.id === "base";
          const expName = lang === "en" ? exp.name : exp.nameES;
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
                  {expName}
                  {isBase && (
                    <span className="ml-2 text-xs font-ui font-normal text-ink-muted uppercase tracking-widest">
                      {t("setup_required")}
                    </span>
                  )}
                </div>
                <div className="text-xs font-ui text-ink-muted mt-0.5">
                  {exp.year} · {exp.factionCount}{" "}
                  {exp.factionCount === 1
                    ? t("setup_faction")
                    : t("setup_factions")}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-paper-dark/40 rounded-lg p-4 border border-ink/10 text-sm font-body text-ink-soft">
        <p>
          <span className="font-semibold">{t("setup_step2_available")}</span>{" "}
          <span className="font-display text-lg font-bold text-rust">
            {availableFactions}
          </span>
          <span className="text-ink-muted">
            {" "}
            · {t("setup_step2_need")} {playerCount}
          </span>
        </p>
        {!canProceed && (
          <p className="mt-1 text-xs text-rust">{t("setup_step2_need_more")}</p>
        )}
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={back}
          className="press-effect text-ink px-4 py-3 rounded-md font-ui font-medium hover:bg-paper-dark/40 transition-all"
        >
          {t("setup_back")}
        </button>
        <button
          onClick={next}
          disabled={!canProceed}
          className="press-effect bg-rust text-paper-light px-6 py-3 rounded-md font-ui font-medium shadow-card hover:shadow-card-hover hover:bg-ember transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {lang === "en" ? "Continue →" : "Continuar →"}
        </button>
      </div>
    </div>
  );
}
