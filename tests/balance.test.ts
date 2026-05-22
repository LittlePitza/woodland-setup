import { describe, it, expect } from "vitest";
import {
  validateBalance,
  sumReach,
  countMilitants,
  findExclusionConflicts,
  RECOMMENDED_REACH,
  requiredMilitants,
} from "@/lib/balance/reach";
import {
  generateBalancedSetup,
  NoValidCombinationError,
} from "@/lib/balance/generator";
import { FACTIONS, getFaction } from "@/lib/data/factions";

describe("Faction Dataset", () => {
  it("has 14 factions", () => {
    expect(FACTIONS.length).toBe(14);
  });

  it("every faction has a unique ID", () => {
    const ids = FACTIONS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("reach values match official Law of Root", () => {
    expect(getFaction("marquise-de-cat")?.reach).toBe(10);
    expect(getFaction("eyrie-dynasties")?.reach).toBe(7);
    expect(getFaction("woodland-alliance")?.reach).toBe(3);
    expect(getFaction("vagabond")?.reach).toBe(5);
    expect(getFaction("riverfolk-company")?.reach).toBe(5);
    expect(getFaction("lizard-cult")?.reach).toBe(2);
    expect(getFaction("vagabond-2")?.reach).toBe(2);
    expect(getFaction("underground-duchy")?.reach).toBe(8);
    expect(getFaction("corvid-conspiracy")?.reach).toBe(3);
    expect(getFaction("lord-of-the-hundreds")?.reach).toBe(9);
    expect(getFaction("keepers-in-iron")?.reach).toBe(8);
    expect(getFaction("lilypad-diaspora")?.reach).toBe(7);
    expect(getFaction("twilight-council")?.reach).toBe(4);
    expect(getFaction("knaves-of-the-deepwood")?.reach).toBe(4);
  });

  it("encodes Knaves-Vagabond mutual exclusion", () => {
    const knaves = getFaction("knaves-of-the-deepwood");
    expect(knaves?.excludesWith).toContain("vagabond");
    expect(knaves?.excludesWith).toContain("vagabond-2");
  });
});

describe("Reach calculations", () => {
  it("sums reach correctly", () => {
    const factions = [
      getFaction("marquise-de-cat")!,
      getFaction("eyrie-dynasties")!,
      getFaction("woodland-alliance")!,
      getFaction("vagabond")!,
    ];
    // 10 + 7 + 3 + 5 = 25
    expect(sumReach(factions)).toBe(25);
  });

  it("counts militants and insurgents", () => {
    const factions = [
      getFaction("marquise-de-cat")!, // militant
      getFaction("eyrie-dynasties")!, // militant
      getFaction("woodland-alliance")!, // insurgent
      getFaction("vagabond")!, // insurgent
    ];
    expect(countMilitants(factions)).toBe(2);
  });

  it("requires 2 militants for 2-player games", () => {
    expect(requiredMilitants(2)).toBe(2);
    expect(requiredMilitants(3)).toBe(1);
    expect(requiredMilitants(4)).toBe(1);
  });
});

describe("Exclusion rules", () => {
  it("detects Knaves + Vagabond conflict", () => {
    const factions = [
      getFaction("knaves-of-the-deepwood")!,
      getFaction("vagabond")!,
    ];
    const conflicts = findExclusionConflicts(factions);
    expect(conflicts.length).toBeGreaterThan(0);
  });

  it("detects Knaves + Vagabond 2 conflict", () => {
    const factions = [
      getFaction("knaves-of-the-deepwood")!,
      getFaction("vagabond-2")!,
    ];
    const conflicts = findExclusionConflicts(factions);
    expect(conflicts.length).toBeGreaterThan(0);
  });

  it("allows Knaves without any Vagabond", () => {
    const factions = [
      getFaction("knaves-of-the-deepwood")!,
      getFaction("marquise-de-cat")!,
    ];
    expect(findExclusionConflicts(factions)).toEqual([]);
  });
});

describe("validateBalance", () => {
  it("validates the canonical base game 4-player setup", () => {
    const result = validateBalance(
      ["marquise-de-cat", "eyrie-dynasties", "woodland-alliance", "vagabond"],
      4
    );
    expect(result.isBalanced).toBe(true);
    expect(result.totalReach).toBe(25);
    expect(result.recommendedReach).toBe(17);
    expect(result.errors).toEqual([]);
  });

  it("flags games below recommended reach", () => {
    const result = validateBalance(
      [
        "lizard-cult", // 2
        "vagabond-2", // 2
        "woodland-alliance", // 3
        "corvid-conspiracy", // 3
      ],
      4
    );
    // Total 10, recommended 17, plus 0 militants -> error
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("errors on 2-player game with only 1 militant", () => {
    const result = validateBalance(["marquise-de-cat", "woodland-alliance"], 2);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.isBalanced).toBe(false);
  });

  it("errors when Knaves and Vagabond are both selected", () => {
    const result = validateBalance(
      [
        "marquise-de-cat",
        "eyrie-dynasties",
        "knaves-of-the-deepwood",
        "vagabond",
      ],
      4
    );
    expect(result.errors.some((e) => e.includes("cannot be played"))).toBe(
      true
    );
  });
});

describe("generateBalancedSetup", () => {
  it("generates a valid base game 4-player setup", () => {
    const result = generateBalancedSetup({
      playerCount: 4,
      allowedExpansions: ["base"],
    });
    expect(result.length).toBe(4);
    expect(countMilitants(result)).toBeGreaterThanOrEqual(1);
    expect(findExclusionConflicts(result)).toEqual([]);
  });

  it("generates a valid 2-player setup with 2 militants", () => {
    const result = generateBalancedSetup({
      playerCount: 2,
      allowedExpansions: ["base", "marauder"], // need militants
    });
    expect(result.length).toBe(2);
    expect(countMilitants(result)).toBe(2);
  });

  it("generates valid setups across many runs (stress test)", () => {
    for (let i = 0; i < 50; i++) {
      const result = generateBalancedSetup({
        playerCount: 4,
        allowedExpansions: ["base", "riverfolk", "underworld", "marauder"],
      });
      expect(result.length).toBe(4);
      expect(countMilitants(result)).toBeGreaterThanOrEqual(1);
      expect(findExclusionConflicts(result)).toEqual([]);
    }
  });

  it("never includes Knaves + Vagabond together", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateBalancedSetup({
        playerCount: 4,
        allowedExpansions: ["base", "homeland"],
      });
      const ids = result.map((f) => f.id);
      const hasKnaves = ids.includes("knaves-of-the-deepwood");
      const hasVagabond =
        ids.includes("vagabond") || ids.includes("vagabond-2");
      expect(hasKnaves && hasVagabond).toBe(false);
    }
  });

  it("respects pinned factions", () => {
    const result = generateBalancedSetup({
      playerCount: 4,
      allowedExpansions: ["base", "riverfolk"],
      pinnedFactions: ["marquise-de-cat", "lizard-cult"],
    });
    const ids = result.map((f) => f.id);
    expect(ids).toContain("marquise-de-cat");
    expect(ids).toContain("lizard-cult");
  });

  it("respects banned factions", () => {
    for (let i = 0; i < 30; i++) {
      const result = generateBalancedSetup({
        playerCount: 4,
        allowedExpansions: ["base", "riverfolk"],
        bannedFactions: ["lizard-cult"],
      });
      expect(result.find((f) => f.id === "lizard-cult")).toBeUndefined();
    }
  });

  it("throws if not enough factions available", () => {
    expect(() =>
      generateBalancedSetup({
        playerCount: 4,
        allowedExpansions: ["base"],
        bannedFactions: ["vagabond", "woodland-alliance"],
      })
    ).toThrow(NoValidCombinationError);
  });

  it("orders factions by official setup order", () => {
    const result = generateBalancedSetup({
      playerCount: 4,
      allowedExpansions: ["base"],
    });
    for (let i = 1; i < result.length; i++) {
      expect(result[i].setupOrder).toBeGreaterThan(result[i - 1].setupOrder);
    }
  });
});

describe("Recommended reach values", () => {
  it("matches official Law of Root §5.2", () => {
    expect(RECOMMENDED_REACH[2]).toBe(21);
    expect(RECOMMENDED_REACH[3]).toBe(18);
    expect(RECOMMENDED_REACH[4]).toBe(17);
  });
});
