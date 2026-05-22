// Domain types for Root setup logic

export type FactionType = "militant" | "insurgent";

export type ExpansionId =
  | "base"
  | "riverfolk"
  | "underworld"
  | "marauder"
  | "homeland";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type ExperienceLevel = "beginner" | "intermediate" | "expert";

export type SetupMode = "random" | "draft" | "manual" | "guided";

export interface Faction {
  id: string;
  name: string;
  nameES: string;
  reach: number;
  type: FactionType;
  expansion: ExpansionId;
  difficulty: Difficulty;
  animal: string;
  animalES: string;
  description: string;
  descriptionES: string;
  scoringMethod: string;
  scoringMethodES: string;
  setupOrder: number; // Order in which factions are set up (lower = first)
  excludesWith: string[]; // IDs of factions that cannot be in the same game
  recommendedForBeginners: boolean;
  color: string; // hex for UI
  symbol: string; // single-char or short symbol
}

export interface Expansion {
  id: ExpansionId;
  name: string;
  nameES: string;
  year: number;
  factionCount: number;
}

export interface MapInfo {
  id: string;
  name: string;
  nameES: string;
  expansion: ExpansionId;
  description: string;
  descriptionES: string;
}

export interface AssignedFaction {
  factionId: string;
  playerName?: string;
}

export interface GameSetup {
  id: string;
  date: string; // ISO string
  playerCount: number;
  expansions: ExpansionId[];
  factions: AssignedFaction[];
  mapId?: string;
  mode: SetupMode;
  totalReach: number;
  recommendedReach: number;
  isBalanced: boolean;
  warnings: string[];
  notes?: string;
}

export interface BalanceResult {
  isBalanced: boolean;
  totalReach: number;
  recommendedReach: number;
  militantCount: number;
  insurgentCount: number;
  warnings: string[];
  errors: string[];
}
