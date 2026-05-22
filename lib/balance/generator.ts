import type { Faction, ExperienceLevel } from "@/types";
import { FACTIONS } from "@/lib/data/factions";
import {
  RECOMMENDED_REACH,
  requiredMilitants,
  sumReach,
  countMilitants,
  findExclusionConflicts,
} from "@/lib/balance/reach";

export interface GeneratorOptions {
  playerCount: number;
  allowedExpansions: readonly string[];
  experienceLevel?: ExperienceLevel;
  bannedFactions?: readonly string[];
  pinnedFactions?: readonly string[]; // factions that MUST be included
}

export class NoValidCombinationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoValidCombinationError";
  }
}

function shuffle<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValidCombination(
  factions: readonly Faction[],
  playerCount: number,
  targetReach: number
): boolean {
  if (factions.length !== playerCount) return false;
  if (countMilitants(factions) < requiredMilitants(playerCount)) return false;
  if (sumReach(factions) < targetReach) return false;
  if (findExclusionConflicts(factions).length > 0) return false;
  return true;
}

/**
 * Generates a balanced random faction setup.
 *
 * Algorithm:
 * 1. Filter pool: only allowed expansions, not banned, not duplicate vagabonds beyond 2-player rule.
 * 2. Filter by experience: beginners only see beginner-friendly factions.
 * 3. Force pinned factions to be included.
 * 4. Backtracking with shuffled candidate sets until a valid combination is found.
 * 5. Hard cap: MAX_ATTEMPTS to avoid infinite loops; fallback relaxes experience filter.
 *
 * @throws NoValidCombinationError if no valid combination exists in the pool.
 */
export function generateBalancedSetup(opts: GeneratorOptions): Faction[] {
  const {
    playerCount,
    allowedExpansions,
    experienceLevel = "intermediate",
    bannedFactions = [],
    pinnedFactions = [],
  } = opts;

  if (playerCount < 2 || playerCount > 6) {
    throw new NoValidCombinationError(
      `Player count must be 2-6 (got ${playerCount}).`
    );
  }

  const targetReach = RECOMMENDED_REACH[playerCount];
  const bannedSet = new Set(bannedFactions);

  // Filter base pool
  let pool = FACTIONS.filter(
    (f) => allowedExpansions.includes(f.expansion) && !bannedSet.has(f.id)
  );

  if (pool.length < playerCount) {
    throw new NoValidCombinationError(
      `Only ${pool.length} factions available for ${playerCount} players. Enable more expansions.`
    );
  }

  // Experience filter (skipped if it leaves us with too few factions)
  if (experienceLevel === "beginner") {
    const beginnerPool = pool.filter((f) => f.recommendedForBeginners);
    if (beginnerPool.length >= playerCount) pool = beginnerPool;
  }

  // Validate pinned factions
  const pinned: Faction[] = [];
  for (const id of pinnedFactions) {
    const f = pool.find((p) => p.id === id);
    if (!f) {
      throw new NoValidCombinationError(
        `Pinned faction "${id}" is not in the allowed pool.`
      );
    }
    pinned.push(f);
  }

  if (pinned.length > playerCount) {
    throw new NoValidCombinationError(
      `Pinned ${pinned.length} factions but only ${playerCount} players.`
    );
  }

  // Check pinned for exclusions
  if (findExclusionConflicts(pinned).length > 0) {
    throw new NoValidCombinationError(
      "Pinned factions have mutual exclusion conflicts."
    );
  }

  const remainingSlots = playerCount - pinned.length;
  const pinnedIds = new Set(pinned.map((p) => p.id));
  const candidatePool = pool.filter((f) => !pinnedIds.has(f.id));

  // Backtracking
  const MAX_ATTEMPTS = 2000;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const shuffled = shuffle(candidatePool);
    const picked = shuffled.slice(0, remainingSlots);
    const combination = [...pinned, ...picked];
    if (isValidCombination(combination, playerCount, targetReach)) {
      // Sort by official setup order for consistent UX
      return combination.sort((a, b) => a.setupOrder - b.setupOrder);
    }
  }

  // Fallback: try without strict reach (just exclusions + militants)
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const shuffled = shuffle(candidatePool);
    const picked = shuffled.slice(0, remainingSlots);
    const combination = [...pinned, ...picked];
    if (
      combination.length === playerCount &&
      countMilitants(combination) >= requiredMilitants(playerCount) &&
      findExclusionConflicts(combination).length === 0
    ) {
      // Found a combo that respects hard rules but is below target reach
      return combination.sort((a, b) => a.setupOrder - b.setupOrder);
    }
  }

  throw new NoValidCombinationError(
    "Could not find a valid faction combination with the given constraints. Try enabling more expansions or unbanning factions."
  );
}

/**
 * Generates a draft pool — more factions than slots, for "draft by turns" mode.
 * Typically 2x player count.
 */
export function generateDraftPool(opts: GeneratorOptions): Faction[] {
  const {
    playerCount,
    allowedExpansions,
    bannedFactions = [],
  } = opts;

  const bannedSet = new Set(bannedFactions);
  const pool = FACTIONS.filter(
    (f) => allowedExpansions.includes(f.expansion) && !bannedSet.has(f.id)
  );

  const draftSize = Math.min(pool.length, playerCount * 2);
  const shuffled = shuffle(pool);

  // Ensure at least 2 militants in the draft pool
  const result: Faction[] = [];
  const militants = shuffled.filter((f) => f.type === "militant");
  const insurgents = shuffled.filter((f) => f.type === "insurgent");

  result.push(...militants.slice(0, Math.min(2, militants.length)));
  result.push(...insurgents.slice(0, draftSize - result.length));

  // Fill if still short (only militants available)
  if (result.length < draftSize) {
    result.push(...militants.slice(2, draftSize - result.length + 2));
  }

  return shuffle(result);
}
