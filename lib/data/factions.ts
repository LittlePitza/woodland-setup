import type { Faction } from "@/types";

/**
 * Source of truth for all Root factions.
 *
 * Reach values verified against:
 * - The Law of Root (3rd printing) - http://root.livingrules.io/
 * - Root Database - https://www.therootdatabase.com/
 * - Leder Games official Kickstarter FAQs for Homeland expansion
 *
 * Recommended total reach by player count:
 *   2 players: 21
 *   3 players: 18
 *   4 players: 17
 *   5-6 players: 17+ (adventurous)
 */
export const FACTIONS: Faction[] = [
  // ============= BASE GAME =============
  {
    id: "marquise-de-cat",
    name: "Marquise de Cat",
    nameES: "El Marquesado",
    reach: 10,
    type: "militant",
    expansion: "base",
    difficulty: 2,
    animal: "Cat",
    animalES: "Gato",
    description:
      "Industrial empire builder. Scores by constructing workshops, sawmills, and recruiters across the woodland.",
    descriptionES:
      "Imperio industrial. Puntúa al construir talleres, aserraderos y reclutadores por todo el bosque.",
    scoringMethod: "Build buildings",
    scoringMethodES: "Construir edificios",
    setupOrder: 1,
    excludesWith: [],
    recommendedForBeginners: true,
    color: "#C0392B",
    symbol: "♛",
  },
  {
    id: "eyrie-dynasties",
    name: "Eyrie Dynasties",
    nameES: "El Nido de Águilas",
    reach: 7,
    type: "militant",
    expansion: "base",
    difficulty: 3,
    animal: "Birds",
    animalES: "Aves",
    description:
      "Bound by the Decree, must take more and more actions each turn. Scores for roosts on the map.",
    descriptionES:
      "Atados al Decreto, deben tomar más acciones cada turno. Puntúan por nidos en el mapa.",
    scoringMethod: "Build and defend roosts",
    scoringMethodES: "Construir y defender nidos",
    setupOrder: 2,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#2980B9",
    symbol: "✦",
  },
  {
    id: "woodland-alliance",
    name: "Woodland Alliance",
    nameES: "La Alianza",
    reach: 3,
    type: "insurgent",
    expansion: "base",
    difficulty: 4,
    animal: "Mice, Rabbits & Foxes",
    animalES: "Ratones, conejos y zorros",
    description:
      "Guerrilla rebellion. Spreads sympathy across the woodland and starts revolts.",
    descriptionES:
      "Rebelión guerrillera. Difunde simpatía por el bosque e inicia revueltas.",
    scoringMethod: "Spread sympathy",
    scoringMethodES: "Difundir simpatía",
    setupOrder: 3,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#27AE60",
    symbol: "✿",
  },
  {
    id: "vagabond",
    name: "Vagabond",
    nameES: "El Vagabundo",
    reach: 5,
    type: "insurgent",
    expansion: "base",
    difficulty: 3,
    animal: "Raccoon",
    animalES: "Mapache",
    description:
      "Lone wanderer. Completes quests, aids and harms factions, manages items.",
    descriptionES:
      "Errante solitario. Completa misiones, ayuda y daña facciones, gestiona objetos.",
    scoringMethod: "Quests and relations",
    scoringMethodES: "Misiones y relaciones",
    setupOrder: 4,
    excludesWith: ["knaves-of-the-deepwood"],
    recommendedForBeginners: true,
    color: "#7F8C8D",
    symbol: "✜",
  },

  // ============= RIVERFOLK EXPANSION =============
  {
    id: "riverfolk-company",
    name: "Riverfolk Company",
    nameES: "La Compañía del Río",
    reach: 5,
    type: "insurgent",
    expansion: "riverfolk",
    difficulty: 4,
    animal: "Otters",
    animalES: "Nutrias",
    description:
      "Merchant traders. Sells services like cards, mercenaries and river travel to other factions.",
    descriptionES:
      "Comerciantes. Vende servicios como cartas, mercenarios y viajes por río a otras facciones.",
    scoringMethod: "Trade posts and funds",
    scoringMethodES: "Puestos comerciales y fondos",
    setupOrder: 5,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#16A085",
    symbol: "≈",
  },
  {
    id: "lizard-cult",
    name: "Lizard Cult",
    nameES: "El Culto Reptiliano",
    reach: 2,
    type: "insurgent",
    expansion: "riverfolk",
    difficulty: 5,
    animal: "Lizards",
    animalES: "Lagartos",
    description:
      "Religious zealots. Builds gardens, performs conspiracies, and converts followers.",
    descriptionES:
      "Fanáticos religiosos. Construye jardines, realiza conspiraciones y convierte seguidores.",
    scoringMethod: "Build gardens",
    scoringMethodES: "Construir jardines",
    setupOrder: 6,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#E67E22",
    symbol: "☥",
  },
  {
    id: "vagabond-2",
    name: "Vagabond (Second)",
    nameES: "El Vagabundo",
    reach: 2,
    type: "insurgent",
    expansion: "riverfolk",
    difficulty: 3,
    animal: "Raccoon",
    animalES: "Mapache",
    description:
      "A second wandering vagabond. Competes with the first for quests, items, and infamy.",
    descriptionES:
      "Un segundo vagabundo errante. Compite con el primero por misiones, objetos e infamia.",
    scoringMethod: "Quests and relations",
    scoringMethodES: "Misiones y relaciones",
    setupOrder: 7,
    excludesWith: ["knaves-of-the-deepwood"],
    recommendedForBeginners: false,
    color: "#95A5A6",
    symbol: "✜",
  },

  // ============= UNDERWORLD EXPANSION =============
  {
    id: "underground-duchy",
    name: "Underground Duchy",
    nameES: "El Ducado Subterráneo",
    reach: 8,
    type: "militant",
    expansion: "underworld",
    difficulty: 4,
    animal: "Moles",
    animalES: "Topos",
    description:
      "Imperial moles emerging from the Burrow. Sways ministers to unlock more actions.",
    descriptionES:
      "Topos imperiales que emergen de la Madriguera. Influencian ministros para desbloquear acciones.",
    scoringMethod: "Sway ministers",
    scoringMethodES: "Influenciar ministros",
    setupOrder: 8,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#8E44AD",
    symbol: "⛏",
  },
  {
    id: "corvid-conspiracy",
    name: "Corvid Conspiracy",
    nameES: "La Conspiración Córvida",
    reach: 3,
    type: "insurgent",
    expansion: "underworld",
    difficulty: 4,
    animal: "Crows",
    animalES: "Cuervos",
    description:
      "Secret plotters. Places hidden plot tokens with various devious effects.",
    descriptionES:
      "Conspiradores secretos. Coloca fichas de complot ocultas con efectos malvados.",
    scoringMethod: "Trigger plots",
    scoringMethodES: "Activar complots",
    setupOrder: 9,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#2C3E50",
    symbol: "✸",
  },

  // ============= MARAUDER EXPANSION =============
  {
    id: "lord-of-the-hundreds",
    name: "Lord of the Hundreds",
    nameES: "El Señor de los Cientos",
    reach: 9,
    type: "militant",
    expansion: "marauder",
    difficulty: 3,
    animal: "Rats",
    animalES: "Ratas",
    description:
      "Brutal warlord. Oppresses clearings, hoards items, mood swings dictate abilities.",
    descriptionES:
      "Caudillo brutal. Oprime claros, atesora objetos, sus cambios de humor dictan habilidades.",
    scoringMethod: "Oppress clearings",
    scoringMethodES: "Oprimir claros",
    setupOrder: 10,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#D35400",
    symbol: "⚔",
  },
  {
    id: "keepers-in-iron",
    name: "Keepers in Iron",
    nameES: "Los Guardianes del Hierro",
    reach: 8,
    type: "militant",
    expansion: "marauder",
    difficulty: 4,
    animal: "Badgers",
    animalES: "Tejones",
    description:
      "Devout knights recovering ancient relics. Delve, transport, and recover for points.",
    descriptionES:
      "Caballeros devotos recuperando reliquias antiguas. Excavan, transportan y recuperan por puntos.",
    scoringMethod: "Recover relics",
    scoringMethodES: "Recuperar reliquias",
    setupOrder: 11,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#34495E",
    symbol: "⚜",
  },

  // ============= HOMELAND EXPANSION =============
  {
    id: "lilypad-diaspora",
    name: "Lilypad Diaspora",
    // Sin edición oficial en español — se mantiene en inglés
    nameES: "Lilypad Diaspora",
    reach: 7,
    type: "militant",
    expansion: "homeland",
    difficulty: 3,
    animal: "Frogs",
    animalES: "Ranas",
    description:
      "Returning exiles. Builds enclaves that can flip between peaceful and militant sides.",
    descriptionES:
      "Exiliados que regresan. Construyen enclaves que pueden voltear entre pacíficos y militantes.",
    scoringMethod: "Establish enclaves",
    scoringMethodES: "Establecer enclaves",
    setupOrder: 12,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#1ABC9C",
    symbol: "❀",
  },
  {
    id: "twilight-council",
    name: "Twilight Council",
    // Sin edición oficial en español — se mantiene en inglés
    nameES: "Twilight Council",
    reach: 4,
    type: "insurgent",
    expansion: "homeland",
    difficulty: 5,
    animal: "Bats",
    animalES: "Murciélagos",
    description:
      "Nocturnal politicians. Hosts assemblies to suppress violence and govern clearings.",
    descriptionES:
      "Políticos nocturnos. Organiza asambleas para suprimir violencia y gobernar claros.",
    scoringMethod: "Govern with assemblies",
    scoringMethodES: "Gobernar con asambleas",
    setupOrder: 13,
    excludesWith: [],
    recommendedForBeginners: false,
    color: "#6C5CE7",
    symbol: "☾",
  },
  {
    id: "knaves-of-the-deepwood",
    name: "Knaves of the Deepwood",
    // Sin edición oficial en español — se mantiene en inglés
    nameES: "Knaves of the Deepwood",
    reach: 4,
    type: "insurgent",
    expansion: "homeland",
    difficulty: 4,
    animal: "Skunks",
    animalES: "Zorrillos",
    description:
      "Robin-Hood-esque raiders. Three captains take hostages from enemies for ransom.",
    descriptionES:
      "Asaltantes al estilo Robin Hood. Tres capitanes toman rehenes de enemigos para rescate.",
    scoringMethod: "Acclaim and prisoners",
    scoringMethodES: "Aclamación y prisioneros",
    setupOrder: 14,
    // OFFICIAL RULE: Knaves cannot be played with either Vagabond
    excludesWith: ["vagabond", "vagabond-2"],
    recommendedForBeginners: false,
    color: "#B8860B",
    symbol: "✺",
  },
];

export function getFaction(id: string): Faction | undefined {
  return FACTIONS.find((f) => f.id === id);
}

export function getFactionsByExpansions(
  expansions: readonly string[]
): Faction[] {
  return FACTIONS.filter((f) => expansions.includes(f.expansion));
}
