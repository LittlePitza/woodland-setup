"use client";

import { useEffect, useState } from "react";
import { useWizardStore } from "@/lib/store";
import { FactionCard } from "@/components/factions/FactionCard";
import { ReachMeter } from "@/components/shared/ReachMeter";
import { cn } from "@/lib/utils";
import {
  generateBalancedSetup,
  generateDraftPool,
  NoValidCombinationError,
} from "@/lib/balance/generator";
import { validateBalance } from "@/lib/balance/reach";
import { getFaction, FACTIONS, getFactionsByExpansions } from "@/lib/data/factions";
import { getMapsByExpansions, MAPS } from "@/lib/data/maps";
import { saveSetup, generateSetupId } from "@/lib/storage/history";
import type { Faction } from "@/types";
import Link from "next/link";

export function ResultsStep() {
  const {
    playerCount,
    expansions,
    mode,
    experienceLevel,
    mapId,
    generatedFactions,
    setGeneratedFactions,
    manualSelection,
    toggleManualSelection,
    draftPool,
    setDraftPool,
    back,
    reset,
  } = useWizardStore();

  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [actualMapId, setActualMapId] = useState<string | undefined>(mapId);

  // Initial generation
  useEffect(() => {
    runGeneration();
    // Resolve map
    if (!mapId) {
      const availableMaps = getMapsByExpansions(expansions);
      if (availableMaps.length > 0) {
        const random =
          availableMaps[Math.floor(Math.random() * availableMaps.length)];
        setActualMapId(random.id);
      }
    } else {
      setActualMapId(mapId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runGeneration() {
    setError(null);
    setSaved(false);
    try {
      if (mode === "random") {
        const result = generateBalancedSetup({
          playerCount,
          allowedExpansions: expansions,
          experienceLevel,
        });
        setGeneratedFactions(result);
      } else if (mode === "draft") {
        const pool = generateDraftPool({
          playerCount,
          allowedExpansions: expansions,
        });
        setDraftPool(pool);
      } else if (mode === "manual") {
        // No generation; user picks in UI
      }
    } catch (e) {
      if (e instanceof NoValidCombinationError) {
        setError(e.message);
      } else {
        setError("Error desconocido al generar la partida.");
      }
    }
  }

  function handleReroll() {
    runGeneration();
  }

  function handleSave() {
    const factionsToSave =
      mode === "manual" ? manualSelection : generatedFactions.map((f) => f.id);
    const validation = validateBalance(factionsToSave, playerCount);
    const setup = {
      id: generateSetupId(),
      date: new Date().toISOString(),
      playerCount,
      expansions,
      factions: factionsToSave.map((id) => ({ factionId: id })),
      mapId: actualMapId,
      mode,
      totalReach: validation.totalReach,
      recommendedReach: validation.recommendedReach,
      isBalanced: validation.isBalanced,
      warnings: validation.warnings,
    };
    saveSetup(setup);
    setSaved(true);
  }

  if (error) {
    return (
      <div className="space-y-6 text-center">
        <div className="text-5xl">⚠</div>
        <h2 className="font-display text-2xl text-ink">
          No se pudo generar una partida válida
        </h2>
        <p className="font-body text-ink-soft max-w-md mx-auto">{error}</p>
        <button
          onClick={back}
          className="press-effect bg-ink text-paper-light px-6 py-3 rounded-md font-ui font-medium hover:bg-ink-soft transition-all"
        >
          ← Revisar opciones
        </button>
      </div>
    );
  }

  // MANUAL MODE
  if (mode === "manual") {
    return (
      <ManualModeView
        manualSelection={manualSelection}
        toggleManualSelection={toggleManualSelection}
        playerCount={playerCount}
        expansions={expansions}
        onBack={back}
        onSave={handleSave}
        saved={saved}
      />
    );
  }

  // DRAFT MODE
  if (mode === "draft") {
    return (
      <DraftModeView
        pool={draftPool}
        playerCount={playerCount}
        onReroll={handleReroll}
        onBack={back}
        onSave={(selected) => {
          setGeneratedFactions(selected);
          // Now save with selected
          const validation = validateBalance(
            selected.map((f) => f.id),
            playerCount
          );
          const setup = {
            id: generateSetupId(),
            date: new Date().toISOString(),
            playerCount,
            expansions,
            factions: selected.map((f) => ({ factionId: f.id })),
            mapId: actualMapId,
            mode,
            totalReach: validation.totalReach,
            recommendedReach: validation.recommendedReach,
            isBalanced: validation.isBalanced,
            warnings: validation.warnings,
          };
          saveSetup(setup);
          setSaved(true);
        }}
        saved={saved}
        mapId={actualMapId}
      />
    );
  }

  // RANDOM MODE
  const validation =
    generatedFactions.length > 0
      ? validateBalance(
          generatedFactions.map((f) => f.id),
          playerCount
        )
      : null;

  const selectedMap = actualMapId ? MAPS.find((m) => m.id === actualMapId) : null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          Tu partida está lista
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-2">
          El Bosque Espera
        </h2>
        {selectedMap && (
          <p className="font-body text-ink-soft text-sm">
            Mapa: <span className="font-semibold">{selectedMap.nameES}</span>
          </p>
        )}
      </div>

      {validation && (
        <div className="bg-paper-light/70 rounded-lg p-4 border border-ink/15">
          <ReachMeter
            current={validation.totalReach}
            recommended={validation.recommendedReach}
          />
          {validation.warnings.length > 0 && (
            <div className="mt-3 pt-3 border-t border-ink/10 space-y-1">
              {validation.warnings.map((w, i) => (
                <p
                  key={i}
                  className="text-xs font-body text-amber flex items-start gap-2"
                >
                  <span aria-hidden>⚠</span>
                  <span>{w}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {generatedFactions.map((f, i) => (
          <FactionCard key={f.id} faction={f} index={i} />
        ))}
      </div>

      <div className="bg-paper-dark/30 rounded-lg p-4 border border-ink/10 text-xs font-body text-ink-muted">
        <p className="font-ui font-semibold text-ink-soft uppercase tracking-widest mb-2">
          Orden de Setup
        </p>
        <p>
          Cada facción tiene su orden oficial de setup. Configuren en este
          orden de arriba abajo (Marquise siempre primero si está presente).
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleReroll}
          className="press-effect flex-1 bg-paper-light border-2 border-ink/30 text-ink px-4 py-3 rounded-md font-ui font-medium hover:border-ink/60 transition-all"
        >
          🎲 Re-tirar
        </button>
        <button
          onClick={handleSave}
          disabled={saved}
          className={cn(
            "press-effect flex-1 px-4 py-3 rounded-md font-ui font-medium transition-all shadow-card",
            saved
              ? "bg-moss text-paper-light cursor-default"
              : "bg-ink text-paper-light hover:bg-ink-soft hover:shadow-card-hover"
          )}
        >
          {saved ? "✓ Guardada" : "Guardar partida"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={back}
          className="press-effect text-ink px-4 py-3 rounded-md font-ui text-sm hover:bg-paper-dark/40 transition-all"
        >
          ← Atrás
        </button>
        <Link
          href="/"
          onClick={() => reset()}
          className="press-effect text-center text-ink-muted px-4 py-3 rounded-md font-ui text-sm hover:bg-paper-dark/40 transition-all"
        >
          Nueva partida
        </Link>
        <Link
          href="/history"
          className="press-effect text-center text-ink-muted px-4 py-3 rounded-md font-ui text-sm hover:bg-paper-dark/40 transition-all"
        >
          Ver historial →
        </Link>
      </div>
    </div>
  );
}

// === MANUAL MODE ===
function ManualModeView({
  manualSelection,
  toggleManualSelection,
  playerCount,
  expansions,
  onBack,
  onSave,
  saved,
}: {
  manualSelection: string[];
  toggleManualSelection: (id: string) => void;
  playerCount: number;
  expansions: string[];
  onBack: () => void;
  onSave: () => void;
  saved: boolean;
}) {
  const availableFactions = getFactionsByExpansions(expansions);
  const validation = validateBalance(manualSelection, playerCount);
  const isComplete = manualSelection.length === playerCount;
  const canSave = isComplete && validation.errors.length === 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          Selección Manual
        </p>
        <h2 className="font-display text-3xl text-ink mb-2">
          Elige las facciones
        </h2>
        <p className="font-body text-ink-soft text-sm">
          {manualSelection.length} de {playerCount} seleccionadas
        </p>
      </div>

      <div className="bg-paper-light/70 rounded-lg p-4 border border-ink/15 sticky top-2 z-20 backdrop-blur-sm">
        <ReachMeter
          current={validation.totalReach}
          recommended={validation.recommendedReach}
        />
        {validation.errors.length > 0 && (
          <div className="mt-3 pt-3 border-t border-ink/10 space-y-1">
            {validation.errors.map((e, i) => (
              <p
                key={i}
                className="text-xs font-body text-rust flex items-start gap-2"
              >
                <span aria-hidden>✗</span>
                <span>{e}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {availableFactions.map((f, i) => {
          const selected = manualSelection.includes(f.id);
          return (
            <FactionCard
              key={f.id}
              faction={f}
              variant="selectable"
              selected={selected}
              onClick={() => {
                if (!selected && manualSelection.length >= playerCount) return;
                toggleManualSelection(f.id);
              }}
              index={i}
            />
          );
        })}
      </div>

      <div className="flex gap-3 sticky bottom-2 bg-paper/80 backdrop-blur-sm p-3 -mx-3 rounded-lg">
        <button
          onClick={onBack}
          className="press-effect text-ink px-4 py-3 rounded-md font-ui hover:bg-paper-dark/40 transition-all"
        >
          ← Atrás
        </button>
        <button
          onClick={onSave}
          disabled={!canSave || saved}
          className={cn(
            "press-effect flex-1 px-4 py-3 rounded-md font-ui font-medium transition-all shadow-card",
            saved
              ? "bg-moss text-paper-light"
              : canSave
              ? "bg-ink text-paper-light hover:bg-ink-soft"
              : "bg-ink/30 text-ink/50 cursor-not-allowed"
          )}
        >
          {saved
            ? "✓ Guardada"
            : isComplete
            ? "Guardar partida"
            : `Selecciona ${playerCount - manualSelection.length} más`}
        </button>
      </div>
    </div>
  );
}

// === DRAFT MODE ===
function DraftModeView({
  pool,
  playerCount,
  onReroll,
  onBack,
  onSave,
  saved,
  mapId,
}: {
  pool: Faction[];
  playerCount: number;
  onReroll: () => void;
  onBack: () => void;
  onSave: (selected: Faction[]) => void;
  saved: boolean;
  mapId?: string;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const validation = validateBalance(picked, playerCount);
  const isComplete = picked.length === playerCount;
  const selectedMap = mapId ? MAPS.find((m) => m.id === mapId) : null;

  const togglePick = (id: string) => {
    if (picked.includes(id)) {
      setPicked(picked.filter((p) => p !== id));
    } else if (picked.length < playerCount) {
      setPicked([...picked, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-3">
          Draft Pool
        </p>
        <h2 className="font-display text-3xl text-ink mb-2">
          Elijan en orden de asiento
        </h2>
        <p className="font-body text-ink-soft text-sm">
          {picked.length} de {playerCount} elegidas · pool de {pool.length}
        </p>
        {selectedMap && (
          <p className="font-body text-ink-muted text-xs mt-1">
            Mapa: {selectedMap.nameES}
          </p>
        )}
      </div>

      <div className="bg-paper-light/70 rounded-lg p-4 border border-ink/15">
        <ReachMeter
          current={validation.totalReach}
          recommended={validation.recommendedReach}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {pool.map((f, i) => {
          const isPicked = picked.includes(f.id);
          return (
            <FactionCard
              key={f.id}
              faction={f}
              variant="selectable"
              selected={isPicked}
              onClick={() => togglePick(f.id)}
              index={i}
            />
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="press-effect text-ink px-4 py-3 rounded-md font-ui hover:bg-paper-dark/40 transition-all"
        >
          ← Atrás
        </button>
        <button
          onClick={onReroll}
          className="press-effect flex-1 bg-paper-light border-2 border-ink/30 text-ink px-4 py-3 rounded-md font-ui font-medium hover:border-ink/60 transition-all"
        >
          🎲 Nuevo pool
        </button>
        <button
          onClick={() => {
            const selected = picked
              .map((id) => getFaction(id))
              .filter((f): f is Faction => Boolean(f));
            onSave(selected);
          }}
          disabled={!isComplete || validation.errors.length > 0 || saved}
          className={cn(
            "press-effect flex-1 px-4 py-3 rounded-md font-ui font-medium transition-all shadow-card",
            saved
              ? "bg-moss text-paper-light"
              : isComplete && validation.errors.length === 0
              ? "bg-ink text-paper-light hover:bg-ink-soft"
              : "bg-ink/30 text-ink/50 cursor-not-allowed"
          )}
        >
          {saved ? "✓ Guardada" : "Confirmar"}
        </button>
      </div>
    </div>
  );
}
