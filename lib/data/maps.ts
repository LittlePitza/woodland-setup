import type { MapInfo } from "@/types";

export const MAPS: MapInfo[] = [
  {
    id: "fall",
    name: "Fall",
    nameES: "Otoño",
    expansion: "base",
    description: "The classic, balanced map. Good for all factions.",
    descriptionES: "El mapa clásico y balanceado. Bueno para todas las facciones.",
  },
  {
    id: "winter",
    name: "Winter",
    nameES: "Invierno",
    expansion: "base",
    description: "Reverse of the Fall map. Slightly different clearing connections.",
    descriptionES: "Reverso del mapa de Otoño. Conexiones de claros ligeramente distintas.",
  },
  {
    id: "lake",
    name: "Lake",
    nameES: "Lago",
    expansion: "underworld",
    description: "Heavy river presence. Boosts the Riverfolk Company.",
    descriptionES: "Fuerte presencia de río. Potencia a la Compañía Ribereña.",
  },
  {
    id: "mountain",
    name: "Mountain",
    nameES: "Montaña",
    expansion: "underworld",
    description: "Secret passages between distant clearings.",
    descriptionES: "Pasajes secretos entre claros distantes.",
  },
  {
    id: "marsh",
    name: "Marsh",
    nameES: "Pantano",
    expansion: "homeland",
    description: "Variable size — adapts to player count.",
    descriptionES: "Tamaño variable — se adapta al número de jugadores.",
  },
  {
    id: "gorge",
    name: "Gorge",
    nameES: "Desfiladero",
    expansion: "homeland",
    description: "Dangerous shortcuts and treacherous terrain.",
    descriptionES: "Atajos peligrosos y terreno traicionero.",
  },
];

export function getMapsByExpansions(expansions: readonly string[]): MapInfo[] {
  return MAPS.filter((m) => expansions.includes(m.expansion));
}
