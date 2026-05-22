"use client";

import { create } from "zustand";
import type {
  ExpansionId,
  SetupMode,
  ExperienceLevel,
  Faction,
} from "@/types";

interface WizardState {
  step: number;
  playerCount: number;
  expansions: ExpansionId[];
  mode: SetupMode;
  experienceLevel: ExperienceLevel;
  mapId: string | undefined;
  bannedFactions: string[];
  generatedFactions: Faction[];
  draftPool: Faction[];
  manualSelection: string[];
  setStep: (n: number) => void;
  next: () => void;
  back: () => void;
  setPlayerCount: (n: number) => void;
  toggleExpansion: (id: ExpansionId) => void;
  setMode: (m: SetupMode) => void;
  setExperienceLevel: (e: ExperienceLevel) => void;
  setMapId: (id: string | undefined) => void;
  toggleBanned: (id: string) => void;
  setGeneratedFactions: (f: Faction[]) => void;
  setDraftPool: (f: Faction[]) => void;
  toggleManualSelection: (id: string) => void;
  reset: () => void;
}

const initialState = {
  step: 0,
  playerCount: 4,
  expansions: ["base"] as ExpansionId[],
  mode: "random" as SetupMode,
  experienceLevel: "intermediate" as ExperienceLevel,
  mapId: undefined,
  bannedFactions: [] as string[],
  generatedFactions: [] as Faction[],
  draftPool: [] as Faction[],
  manualSelection: [] as string[],
};

export const useWizardStore = create<WizardState>((set) => ({
  ...initialState,
  setStep: (n) => set({ step: n }),
  next: () => set((s) => ({ step: s.step + 1 })),
  back: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  setPlayerCount: (n) => set({ playerCount: n }),
  toggleExpansion: (id) =>
    set((s) => ({
      expansions: s.expansions.includes(id)
        ? s.expansions.filter((e) => e !== id)
        : [...s.expansions, id],
    })),
  setMode: (m) => set({ mode: m }),
  setExperienceLevel: (e) => set({ experienceLevel: e }),
  setMapId: (id) => set({ mapId: id }),
  toggleBanned: (id) =>
    set((s) => ({
      bannedFactions: s.bannedFactions.includes(id)
        ? s.bannedFactions.filter((f) => f !== id)
        : [...s.bannedFactions, id],
    })),
  setGeneratedFactions: (f) => set({ generatedFactions: f }),
  setDraftPool: (f) => set({ draftPool: f }),
  toggleManualSelection: (id) =>
    set((s) => ({
      manualSelection: s.manualSelection.includes(id)
        ? s.manualSelection.filter((m) => m !== id)
        : [...s.manualSelection, id],
    })),
  reset: () => set(initialState),
}));
