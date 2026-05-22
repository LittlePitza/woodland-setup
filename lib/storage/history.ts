import type { GameSetup } from "@/types";

const STORAGE_KEY = "woodland-setup-history-v1";
const MAX_HISTORY = 50;

export function loadHistory(): GameSetup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveSetup(setup: GameSetup): void {
  if (typeof window === "undefined") return;
  const history = loadHistory();
  const updated = [setup, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteSetup(id: string): void {
  if (typeof window === "undefined") return;
  const history = loadHistory();
  const updated = history.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function generateSetupId(): string {
  return `setup-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
