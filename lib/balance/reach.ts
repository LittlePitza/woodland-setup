import type { Faction, BalanceResult } from "@/types";
import { getFaction } from "@/lib/data/factions";

/**
 * Recommended minimum total Reach by player count.
 * Source: The Law of Root §5.2 — therootdatabase.com, updated March 2026.
 *
 * | Players | Viable Reach |
 * |---------|-------------|
 * |    2    |    17+      |
 * |    3    |    18+      |
 * |    4    |    21+      |
 * |    5    |    25+      |
 * |    6    |    28+      |
 */
export const RECOMMENDED_REACH: Record<number, number> = {
  2: 17,
  3: 18,
  4: 21,
  5: 25,
  6: 28,
};

/**
 * For 2-player games, two militant factions are strongly recommended
 * (Marauder Expansion advanced setup rule).
 */
export function requiredMilitants(playerCount: number): number {
  if (playerCount === 2) return 2;
  return 1;
}

export function sumReach(factions: readonly Faction[]): number {
  return factions.reduce((acc, f) => acc + f.reach, 0);
}

export function countMilitants(factions: readonly Faction[]): number {
  return factions.filter((f) => f.type === "militant").length;
}

export function countInsurgents(factions: readonly Faction[]): number {
  return factions.filter((f) => f.type === "insurgent").length;
}

/**
 * Returns the IDs of factions that conflict with the current selection
 * due to mutual exclusion rules.
 *
 * Example: Knaves of the Deepwood ↔ Vagabond
 */
export function findExclusionConflicts(factions: readonly Faction[]): string[] {
  const ids = new Set(factions.map((f) => f.id));
  const conflicts: string[] = [];
  for (const f of factions) {
    for (const excludedId of f.excludesWith) {
      if (ids.has(excludedId)) {
        const pair = [f.id, excludedId].sort().join("+");
        if (!conflicts.includes(pair)) conflicts.push(pair);
      }
    }
  }
  return conflicts;
}

/**
 * Main validator. Returns a complete assessment of a faction combination.
 */
export function validateBalance(
  factionIds: readonly string[],
  playerCount: number
): BalanceResult {
  const factions = factionIds
    .map((id) => getFaction(id))
    .filter((f): f is Faction => Boolean(f));

  const totalReach = sumReach(factions);
  const recommendedReach = RECOMMENDED_REACH[playerCount] ?? 17;
  const militantCount = countMilitants(factions);
  const insurgentCount = countInsurgents(factions);
  const minMilitants = requiredMilitants(playerCount);

  const warnings: string[] = [];
  const errors: string[] = [];

  // Hard error: exclusion violations
  const conflicts = findExclusionConflicts(factions);
  if (conflicts.length > 0) {
    for (const pair of conflicts) {
      const [a, b] = pair.split("+");
      const fa = getFaction(a)!;
      const fb = getFaction(b)!;
      errors.push(
        `${fa.nameES ?? fa.name} y ${fb.nameES ?? fb.name} no pueden jugarse en la misma partida (regla oficial).`
      );
    }
  }

  // Hard error: faction count mismatch
  if (factions.length !== playerCount) {
    errors.push(
      `Seleccionaste ${factions.length} facciones para ${playerCount} jugadores.`
    );
  }

  // Hard error: not enough militants
  if (militantCount < minMilitants) {
    errors.push(
      `Se necesita${minMilitants > 1 ? "n" : ""} al menos ${minMilitants} facción${minMilitants > 1 ? "es militantes" : " militante"} para ${playerCount} jugadores (actualmente ${militantCount}).`
    );
  }

  // Soft warning: reach below recommended
  if (totalReach < recommendedReach) {
    warnings.push(
      `El Reach total (${totalReach}) está por debajo del mínimo recomendado de ${recommendedReach} para ${playerCount} jugadores. La partida puede sentirse lenta.`
    );
  }

  // Soft warning: known unbalanced combinations
  const ids = factions.map((f) => f.id);
  if (
    ids.includes("lord-of-the-hundreds") &&
    (ids.includes("vagabond") || ids.includes("vagabond-2"))
  ) {
    warnings.push(
      "El Señor de los Cientos y el Vagabundo compiten por los mismos objetos — ambos pueden sentirse más débiles de lo normal."
    );
  }

  return {
    isBalanced: errors.length === 0 && totalReach >= recommendedReach,
    totalReach,
    recommendedReach,
    militantCount,
    insurgentCount,
    warnings,
    errors,
  };
}
