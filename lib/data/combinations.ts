/**
 * Curated faction combinations for Root.
 * Sources:
 *  - Law of Root (official recommended setups)
 *  - Root rulebook introductory game suggestions
 *  - Root community (BoardGameGeek, Discord, therootdatabase.com)
 *  - Clockwork expansion bot pairing guides
 */

export type CombinationTag =
  | "official"
  | "community"
  | "beginner"
  | "advanced"
  | "bot";

export interface FactionCombination {
  id: string;
  playerCount: number;
  factionIds: string[];
  totalReach: number;
  tags: CombinationTag[];
  titleES: string;
  titleEN: string;
  reasonES: string;
  reasonEN: string;
  botSuggestionES?: string;
  botSuggestionEN?: string;
}

export interface ClockworkBot {
  id: string;
  replaces: string; // faction id it replaces
  nameES: string;
  nameEN: string;
  difficultyLevels: string[];
  descriptionES: string;
  descriptionEN: string;
  pairsWellWithES: string;
  pairsWellWithEN: string;
}

// ─── Official Combinations ──────────────────────────────────────────────────

export const COMBINATIONS: FactionCombination[] = [
  // === 2 PLAYERS ===
  {
    id: "2p-official-intro",
    playerCount: 2,
    factionIds: ["marquise-de-cat", "eyrie-dynasties"],
    totalReach: 17,
    tags: ["official", "beginner"],
    titleES: "Partida Introductoria",
    titleEN: "Introductory Game",
    reasonES:
      "El setup introductorio oficial del reglamento. Dos facciones militantes que se enfrentan directamente. Ideal para aprender las mecánicas de control de territorio.",
    reasonEN:
      "The official introductory setup from the rulebook. Two militant factions in direct opposition. Ideal for learning territory-control mechanics.",
  },
  {
    id: "2p-cat-vagabond",
    playerCount: 2,
    factionIds: ["marquise-de-cat", "vagabond"],
    totalReach: 15,
    tags: ["official", "beginner"],
    titleES: "Industrial vs. Errante",
    titleEN: "Industrial vs. Wanderer",
    reasonES:
      "Combinación recomendada en el Law of Root para 2 jugadores. El Vagabundo puede apoyar o sabotear al Marquesado según sus relaciones.",
    reasonEN:
      "Recommended in the Law of Root for 2 players. The Vagabond can aid or sabotage the Marquise depending on their relationship.",
  },

  // === 3 PLAYERS ===
  {
    id: "3p-official-base",
    playerCount: 3,
    factionIds: ["marquise-de-cat", "eyrie-dynasties", "woodland-alliance"],
    totalReach: 20,
    tags: ["official", "beginner"],
    titleES: "Los Tres Pilares",
    titleEN: "The Three Pillars",
    reasonES:
      "Setup oficial del reglamento base. Equilibra un militante dominante (Marquesado), uno con decreto frágil (Eyrie) y una facción asimétrica insurgente (Alianza).",
    reasonEN:
      "Official setup from the base rulebook. Balances a dominant militant (Marquise), one with a fragile decree (Eyrie), and an asymmetric insurgent (Alliance).",
  },
  {
    id: "3p-duchy-eyrie-vagabond",
    playerCount: 3,
    factionIds: ["underground-duchy", "eyrie-dynasties", "vagabond"],
    totalReach: 20,
    tags: ["community", "advanced"],
    titleES: "Subterráneo, Cielo y Tierra",
    titleEN: "Underground, Sky and Earth",
    reasonES:
      "Los Topos emergen mientras las Aves expanden su Decreto y el Vagabundo se posiciona como árbitro. Excelente interacción política.",
    reasonEN:
      "The Moles emerge while the Birds expand their Decree and the Vagabond acts as power broker. Excellent political interaction.",
  },
  {
    id: "3p-marauder-trio",
    playerCount: 3,
    factionIds: ["lord-of-the-hundreds", "keepers-in-iron", "woodland-alliance"],
    totalReach: 20,
    tags: ["community", "advanced"],
    titleES: "Guerra y Fe",
    titleEN: "War and Faith",
    reasonES:
      "Los Guardianes y el Señor de los Cientos compiten por el mapa mientras la Alianza aprovecha el caos para sembrar simpatía. Partida muy dinámica.",
    reasonEN:
      "Keepers and Hundreds compete for the map while the Alliance exploits the chaos to spread sympathy. A very dynamic game.",
  },

  // === 4 PLAYERS ===
  {
    id: "4p-official-base",
    playerCount: 4,
    factionIds: [
      "marquise-de-cat",
      "eyrie-dynasties",
      "woodland-alliance",
      "vagabond",
    ],
    totalReach: 25,
    tags: ["official", "beginner"],
    titleES: "El Clásico",
    titleEN: "The Classic",
    reasonES:
      "Las 4 facciones del juego base. El setup de referencia para aprender Root; cada facción enseña un estilo de juego diferente.",
    reasonEN:
      "All 4 base-game factions. The reference setup for learning Root; each faction teaches a different play style.",
    botSuggestionES:
      "Si sólo hay 2–3 jugadores humanos, reemplaza con Clockwork Cat o Clockwork Bird.",
    botSuggestionEN:
      "If only 2–3 human players, replace with Clockwork Cat or Clockwork Bird.",
  },
  {
    id: "4p-official-riverfolk",
    playerCount: 4,
    factionIds: [
      "marquise-de-cat",
      "eyrie-dynasties",
      "riverfolk-company",
      "lizard-cult",
    ],
    totalReach: 24,
    tags: ["official"],
    titleES: "Mercado y Religión",
    titleEN: "Market and Religion",
    reasonES:
      "Setup sugerido en el libro de la expansión Riverfolk. Las nutrias venden servicios mientras los lagartos convierten. Mecánicas de economía inusuales.",
    reasonEN:
      "Suggested setup in the Riverfolk expansion book. Otters sell services while lizards convert. Unusual economy mechanics.",
  },
  {
    id: "4p-community-marauder-mix",
    playerCount: 4,
    factionIds: [
      "marquise-de-cat",
      "lord-of-the-hundreds",
      "woodland-alliance",
      "vagabond",
    ],
    totalReach: 27,
    tags: ["community", "advanced"],
    titleES: "El Señor Llega al Bosque",
    titleEN: "The Lord Arrives in the Woods",
    reasonES:
      "Muy valorada en la comunidad. La agresividad del Señor de los Cientos obliga al Marquesado a defender mientras la Alianza y el Vagabundo se mueven libremente.",
    reasonEN:
      "Highly regarded by the community. The Hundreds' aggression forces the Marquise on defense while Alliance and Vagabond move freely.",
  },
  {
    id: "4p-homeland-debut",
    playerCount: 4,
    factionIds: [
      "marquise-de-cat",
      "eyrie-dynasties",
      "lilypad-diaspora",
      "twilight-council",
    ],
    totalReach: 28,
    tags: ["community"],
    titleES: "El Bosque se Renueva",
    titleEN: "The Forest Renews",
    reasonES:
      "Ideal para probar las nuevas facciones de Homeland junto a clásicos. La Diáspora y el Consejo aportan mecánicas muy distintas entre sí.",
    reasonEN:
      "Ideal for trying the new Homeland factions alongside classics. The Diaspora and Council offer very different mechanics.",
  },

  // === 5 PLAYERS ===
  {
    id: "5p-official",
    playerCount: 5,
    factionIds: [
      "marquise-de-cat",
      "eyrie-dynasties",
      "woodland-alliance",
      "riverfolk-company",
      "underground-duchy",
    ],
    totalReach: 33,
    tags: ["official"],
    titleES: "Gran Partida Oficial (5p)",
    titleEN: "Official Grand Game (5p)",
    reasonES:
      "Combinación oficial para 5 jugadores con expansiones base + Riverfolk + Underworld.",
    reasonEN:
      "Official combination for 5 players with base + Riverfolk + Underworld expansions.",
  },

  // === 6 PLAYERS ===
  {
    id: "6p-community-all",
    playerCount: 6,
    factionIds: [
      "marquise-de-cat",
      "eyrie-dynasties",
      "woodland-alliance",
      "vagabond",
      "lord-of-the-hundreds",
      "underground-duchy",
    ],
    totalReach: 45,
    tags: ["community", "advanced"],
    titleES: "Caos Controlado (6p)",
    titleEN: "Controlled Chaos (6p)",
    reasonES:
      "Para grupos de 6. Mezcla militantes e insurgentes de distintas expansiones. Requiere buena gestión del tiempo por turno.",
    reasonEN:
      "For groups of 6. Mixes militants and insurgents from different expansions. Requires good time management per turn.",
  },
];

// ─── Clockwork Bots ─────────────────────────────────────────────────────────

export const CLOCKWORK_BOTS: ClockworkBot[] = [
  {
    id: "bot-marquise",
    replaces: "marquise-de-cat",
    nameES: "Marquesa Mecánica",
    nameEN: "Mechanical Marquise",
    difficultyLevels: ["Fácil", "Normal", "Difícil", "Implacable"],
    descriptionES:
      "Construye edificios siguiendo un conjunto de reglas fijas. En dificultad alta se vuelve extremadamente eficiente. Buen punto de entrada para el modo en solitario.",
    descriptionEN:
      "Builds buildings following a fixed rule set. At higher difficulty it becomes extremely efficient. A great entry point for solo play.",
    pairsWellWithES:
      "Alianza del Bosque, Compañía Ribereña. La Marquesa Mecánica ocupa territorio y crea presión constante que estas facciones pueden explotar.",
    pairsWellWithEN:
      "Woodland Alliance, Riverfolk Company. The Mechanical Marquise holds territory and creates constant pressure that these factions can exploit.",
  },
  {
    id: "bot-eyrie",
    replaces: "eyrie-dynasties",
    nameES: "Eyrie Autómata",
    nameEN: "Automated Eyrie",
    difficultyLevels: ["Fácil", "Normal", "Difícil", "Implacable"],
    descriptionES:
      "Construye nidos automáticamente siguiendo prioridades de movimiento. No tiene Turmoil, lo que la hace más estable que la versión humana.",
    descriptionEN:
      "Builds roosts automatically following movement priorities. Has no Turmoil, making it more stable than the human version.",
    pairsWellWithES:
      "Marquesado, Ducado Subterráneo. El Eyrie Autómata es un excelente \"jugador de referencia\" que ayuda a calibrar el balance de la partida.",
    pairsWellWithEN:
      "Marquise, Underground Duchy. The Automated Eyrie is an excellent 'benchmark player' that helps calibrate game balance.",
  },
  {
    id: "bot-woodland",
    replaces: "woodland-alliance",
    nameES: "Alianza Mecánica",
    nameEN: "Mechanical Alliance",
    difficultyLevels: ["Fácil", "Normal", "Difícil", "Implacable"],
    descriptionES:
      "Difunde simpatía automáticamente por los claros con más presencia enemiga. A alta dificultad puede hacer estallar revueltas de forma sorprendente.",
    descriptionEN:
      "Automatically spreads sympathy to clearings with the most enemy presence. At high difficulty it can trigger revolts surprisingly.",
    pairsWellWithES:
      "Marquesado, Eyrie. La Alianza Mecánica funciona bien contra facciones que se expanden rápido, a las que puede ralentizar con eficacia.",
    pairsWellWithEN:
      "Marquise, Eyrie. The Mechanical Alliance works well against factions that expand quickly, which it can slow down effectively.",
  },
  {
    id: "bot-vagabond",
    replaces: "vagabond",
    nameES: "Vagabundo Autómata",
    nameEN: "Automated Vagabond",
    difficultyLevels: ["Fácil", "Normal", "Difícil", "Implacable"],
    descriptionES:
      "Completa misiones y ataca enemigos siguiendo prioridades predefinidas. Sirve tanto para rellenar una plaza vacía como para practicar contra él.",
    descriptionEN:
      "Completes quests and attacks enemies following predefined priorities. Useful both to fill an empty seat and to practice against.",
    pairsWellWithES:
      "Cualquier combinación. El Vagabundo Autómata es el bot más flexible y puede sumarse a casi cualquier setup sin romper el balance.",
    pairsWellWithEN:
      "Any combination. The Automated Vagabond is the most flexible bot and can join almost any setup without breaking balance.",
  },
];

// Helper: combinations by player count
export function getCombinationsByPlayerCount(
  count: number
): FactionCombination[] {
  return COMBINATIONS.filter((c) => c.playerCount === count);
}
