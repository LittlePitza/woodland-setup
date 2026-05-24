/**
 * Setup instructions per faction.
 * Source: Law of Root §5–14, official faction boards (Standard & Advanced Setup).
 * Advanced Setup rules from Law of Root Appendix A.
 */

export interface FactionSetup {
  factionId: string;
  standardES: string[];
  standardEN: string[];
  advancedES: string[];
  advancedEN: string[];
  startingClearingES: string;
  startingClearingEN: string;
}

export const FACTION_SETUPS: FactionSetup[] = [
  {
    factionId: "marquise-de-cat",
    startingClearingES: "Esquina superior izquierda (A)",
    startingClearingEN: "Top-left corner clearing (A)",
    standardES: [
      "Coloca el token de Keep en el claro de esquina (A).",
      "Coloca 1 Sawmill, 1 Workshop y 1 Recruiter en el claro del Keep.",
      "Coloca 1 guerrero en cada uno de los 11 claros restantes.",
      "Coloca 1 guerrero adicional en el claro del Keep (total 2 allí).",
    ],
    standardEN: [
      "Place the Keep token in the corner clearing (A).",
      "Place 1 Sawmill, 1 Workshop and 1 Recruiter in the Keep clearing.",
      "Place 1 warrior in each of the remaining 11 clearings.",
      "Place 1 additional warrior in the Keep clearing (2 total there).",
    ],
    advancedES: [
      "El jugador con mayor puntuación en draft elige el claro de esquina para el Keep.",
      "Luego sigue el setup estándar desde el paso 2.",
    ],
    advancedEN: [
      "The highest-draft player chooses any corner clearing for the Keep.",
      "Then follow standard setup from step 2.",
    ],
  },
  {
    factionId: "eyrie-dynasties",
    startingClearingES: "Esquina opuesta al Marquesado (C)",
    startingClearingEN: "Corner opposite Marquise (C)",
    standardES: [
      "Coloca 6 Roosts en tu tablero de facción (pila de suministro).",
      "Coloca 1 Roost en el claro de esquina opuesto al Keep del Marquesado.",
      "Coloca 6 guerreros en ese mismo claro.",
      "Elige un líder de los 4 disponibles y ponlo boca arriba.",
      "Tuck tus 2 Loyal Vizier cards en las columnas del Decreto como se indica en tu tablero.",
    ],
    standardEN: [
      "Place 6 Roosts on your faction board (supply).",
      "Place 1 Roost in the corner clearing opposite the Marquise's Keep.",
      "Place 6 warriors in that same clearing.",
      "Choose 1 of the 4 available leaders and place it face-up.",
      "Tuck 2 Loyal Vizier cards into the Decree columns as shown on your board.",
    ],
    advancedES: [
      "El Eyrie elige cualquier claro de esquina no ocupado por el Marquesado.",
      "Luego sigue el setup estándar desde el paso 1.",
    ],
    advancedEN: [
      "The Eyrie chooses any unoccupied corner clearing.",
      "Then follow standard setup from step 1.",
    ],
  },
  {
    factionId: "woodland-alliance",
    startingClearingES: "Sin claro inicial — empieza sin piezas en el mapa",
    startingClearingEN: "No starting clearing — begins with no pieces on the map",
    standardES: [
      "No coloques guerreros ni edificios al inicio.",
      "Coloca 3 cartas boca abajo de la baraja compartida como Supporters.",
      "Si hay 3 o menos jugadores, coloca solo 1 carta como Supporter.",
      "Pon tus Bases en tu tablero; se colocarán al iniciar revueltas.",
    ],
    standardEN: [
      "Do not place any warriors or buildings at start.",
      "Place 3 cards face-down from the shared deck as Supporters.",
      "If playing with 3 or fewer players, place only 1 card as Supporter.",
      "Keep your Bases on your board; they are placed when revolts begin.",
    ],
    advancedES: [
      "Igual que el setup estándar. No hay variaciones en el setup avanzado para esta facción.",
    ],
    advancedEN: [
      "Same as standard setup. No advanced setup variations for this faction.",
    ],
  },
  {
    factionId: "vagabond",
    startingClearingES: "Cualquier espacio de bosque del mapa",
    startingClearingEN: "Any forest space on the map",
    standardES: [
      "Elige una carta de personaje (character card) y colócala en tu tablero.",
      "Toma los objetos iniciales indicados en tu carta de personaje.",
      "Coloca tu peón en cualquier espacio de bosque del mapa.",
      "Roba 1 carta de misión (Quest) si está disponible.",
    ],
    standardEN: [
      "Choose a Vagabond character card and place it on your board.",
      "Take the starting items listed on your character card.",
      "Place your pawn in any forest space on the map.",
      "Draw 1 Quest card if available.",
    ],
    advancedES: [
      "El Vagabundo elige su espacio de bosque después de que todos los demás hayan colocado sus piezas iniciales.",
    ],
    advancedEN: [
      "The Vagabond chooses their forest after all other players have placed their starting pieces.",
    ],
  },
  {
    factionId: "riverfolk-company",
    startingClearingES: "Sin claro inicial — coloca Puestos al inicio",
    startingClearingEN: "No corner clearing — places Trade Posts at start",
    standardES: [
      "Coloca 1 guerrero en cada claro que toque el río.",
      "Establece tus precios: pon marcadores de precio en Mercenaries, Cards y River.",
      "No coloques Trade Posts al inicio; se colocan durante la partida.",
    ],
    standardEN: [
      "Place 1 warrior in each clearing that touches a river.",
      "Set your prices: place price markers on Mercenaries, Cards and River.",
      "Do not place Trade Posts at start; they are placed during play.",
    ],
    advancedES: [
      "En el setup avanzado, la Compañía Ribereña elige uno de los claros con río para colocar sus guerreros iniciales.",
    ],
    advancedEN: [
      "In advanced setup, the Riverfolk Company may choose which river clearings to start in.",
    ],
  },
  {
    factionId: "lizard-cult",
    startingClearingES: "Claro con menos guerreros enemigos",
    startingClearingEN: "Clearing with fewest enemy warriors",
    standardES: [
      "Coloca 4 guerreros en el claro con menos presencia enemiga (decide antes de ver setups).",
      "Coloca tu Garden inicial en ese mismo claro.",
      "Toma las cartas de Lost Souls iniciales indicadas en tu tablero.",
    ],
    standardEN: [
      "Place 4 warriors in the clearing with fewest enemy presence (decide before seeing other setups).",
      "Place your starting Garden in that same clearing.",
      "Take the initial Lost Souls cards as indicated on your board.",
    ],
    advancedES: [
      "El Culto Reptiliano coloca sus guerreros iniciales después de ver todos los otros setups, eligiendo el claro con menor presencia enemiga.",
    ],
    advancedEN: [
      "The Lizard Cult places its warriors after seeing all other setups, choosing the clearing with the least enemy presence.",
    ],
  },
  {
    factionId: "underground-duchy",
    startingClearingES: "La Madriguera — no es un claro del mapa",
    startingClearingEN: "The Burrow — not a map clearing",
    standardES: [
      "Coloca tu Burrow token en el espacio de Burrow de tu tablero.",
      "Coloca 8 guerreros y 1 Citadel en el Burrow.",
      "No coloques piezas en el mapa al inicio.",
      "Activa tu primer Ministro (el de más a la izquierda) boca arriba.",
    ],
    standardEN: [
      "Place your Burrow token on the Burrow space of your board.",
      "Place 8 warriors and 1 Citadel in the Burrow.",
      "Do not place any pieces on the map at start.",
      "Activate your first (leftmost) Minister face-up.",
    ],
    advancedES: [
      "El Ducado Subterráneo siempre comienza en el Burrow, independientemente del setup.",
    ],
    advancedEN: [
      "The Underground Duchy always starts in the Burrow regardless of setup type.",
    ],
  },
  {
    factionId: "corvid-conspiracy",
    startingClearingES: "Cualquier claro (después de los demás)",
    startingClearingEN: "Any clearing (after others have set up)",
    standardES: [
      "Después de todos los demás setups, coloca 1 Plot token boca abajo en cualquier claro.",
      "Coloca 2 guerreros Cuervos en ese mismo claro.",
      "No reveles el Plot al inicio.",
    ],
    standardEN: [
      "After all other setups, place 1 Plot token face-down in any clearing.",
      "Place 2 Corvid warriors in that same clearing.",
      "Do not reveal the Plot at start.",
    ],
    advancedES: [
      "Igual que el estándar. Los Córvidos siempre se colocan de último.",
    ],
    advancedEN: [
      "Same as standard. Corvids always set up last.",
    ],
  },
  {
    factionId: "lord-of-the-hundreds",
    startingClearingES: "Esquina libre no ocupada por militantes",
    startingClearingEN: "Any unoccupied corner clearing",
    standardES: [
      "Coloca 4 guerreros y 1 Stronghold en el claro de esquina elegido.",
      "Pon tu Mood marker en Rowdy (estado inicial).",
      "Coloca los ítems de botín disponibles en tu tablero.",
    ],
    standardEN: [
      "Place 4 warriors and 1 Stronghold in your chosen corner clearing.",
      "Set your Mood marker to Rowdy (starting state).",
      "Place available loot items on your board.",
    ],
    advancedES: [
      "El Señor de los Cientos elige su esquina después del Marquesado y el Eyrie.",
    ],
    advancedEN: [
      "Lord of the Hundreds chooses their corner after Marquise and Eyrie have set up.",
    ],
  },
  {
    factionId: "keepers-in-iron",
    startingClearingES: "Claro de esquina libre",
    startingClearingEN: "Any free corner clearing",
    standardES: [
      "Coloca las Relics en los claros indicados en tu tablero (distribuidas por el mapa).",
      "Coloca 4 guerreros Guardianes en tu claro de esquina.",
      "No coloques Waystations al inicio; se construyen durante la partida.",
    ],
    standardEN: [
      "Place the Relics in the clearings indicated on your board (spread across the map).",
      "Place 4 Keepers warriors in your corner clearing.",
      "Do not place Waystations at start; they are built during play.",
    ],
    advancedES: [
      "En setup avanzado, los Guardianes del Hierro pueden elegir cualquier claro de esquina libre y distribuir las Relics libremente entre los claros.",
    ],
    advancedEN: [
      "In advanced setup, Keepers in Iron may choose any free corner clearing and distribute Relics freely among clearings.",
    ],
  },
];

export interface RuleSection {
  id: string;
  titleES: string;
  titleEN: string;
  contentES: string[];
  contentEN: string[];
}

export const LAW_OF_ROOT_SECTIONS: RuleSection[] = [
  {
    id: "golden-rules",
    titleES: "1. Reglas de Oro",
    titleEN: "1. Golden Rules",
    contentES: [
      "Si un texto en una carta contradice el reglamento, la carta tiene prioridad.",
      "Si el texto de la guía de aprendizaje contradice el reglamento, el reglamento tiene prioridad.",
      "Si dos efectos ocurren simultáneamente, el jugador en turno elige el orden.",
      "Cualquier regla que use 'no puede' es absoluta y no puede ser invalidada por otra regla.",
    ],
    contentEN: [
      "If card text conflicts with the rules, the card takes precedence.",
      "If the learn-to-play guide conflicts with the rules, the rules take precedence.",
      "If two effects occur simultaneously, the current player chooses their order.",
      "Any rule using 'cannot' is absolute and cannot be overridden.",
    ],
  },
  {
    id: "victory",
    titleES: "3. Victoria",
    titleEN: "3. Victory",
    contentES: [
      "El primer jugador en alcanzar 30 puntos de victoria gana inmediatamente.",
      "Si varios jugadores alcanzan 30+ puntos simultáneamente, gana el jugador en turno.",
      "Las cartas de Dominance permiten ganar sin alcanzar 30 puntos mediante control de claros.",
      "Puedes activar una Dominance card durante el Daylight si tienes al menos 10 puntos.",
    ],
    contentEN: [
      "The first player to reach 30 victory points wins immediately.",
      "If multiple players reach 30+ simultaneously, the player taking the current turn wins.",
      "Dominance cards allow winning without 30 points by controlling clearings.",
      "You may activate a Dominance card during Daylight if you have at least 10 points.",
    ],
  },
  {
    id: "reach",
    titleES: "5.2 Sistema de Reach",
    titleEN: "5.2 Reach System",
    contentES: [
      "Cada facción tiene un valor de Reach que indica su potencia inicial en el mapa.",
      "Para un setup interesante, la suma de Reach debe igualar o superar el mínimo por número de jugadores.",
      "2 jugadores: Reach mínimo 17 · 3 jugadores: 18 · 4 jugadores: 21 · 5 jugadores: 25 · 6 jugadores: 28.",
      "Jugadores aventureros pueden usar cualquier combinación con 17+ de Reach total.",
    ],
    contentEN: [
      "Each faction has a Reach value indicating its starting power on the map.",
      "For an interesting game, total Reach should meet or exceed the minimum for your player count.",
      "2 players: min 17 · 3 players: 18 · 4 players: 21 · 5 players: 25 · 6 players: 28.",
      "Adventurous players may use any faction mix with 17+ total Reach.",
    ],
  },
  {
    id: "turn",
    titleES: "Estructura del Turno",
    titleEN: "Turn Structure",
    contentES: [
      "Birdsong: Fase inicial. Efectos pasivos, colocación de apoyos, inicio de revueltas.",
      "Daylight: Fase principal. Crafteo, movimiento, batalla, construcción y acciones especiales de facción.",
      "Evening: Fase final. Robo de cartas, limpieza, fin de turno.",
      "Tras completar las tres fases, el siguiente jugador en sentido horario comienza su turno.",
    ],
    contentEN: [
      "Birdsong: Opening phase. Passive effects, placing supporters, triggering revolts.",
      "Daylight: Main phase. Crafting, movement, battle, building and faction special actions.",
      "Evening: Closing phase. Draw cards, cleanup, end turn.",
      "After completing all three phases, the next clockwise player begins their turn.",
    ],
  },
  {
    id: "battle",
    titleES: "4.3 Batalla",
    titleEN: "4.3 Battle",
    contentES: [
      "El atacante elige un claro donde tiene guerreros y un defensor con piezas.",
      "Ambos jugadores tiran 2 dados. El mayor resultado va al atacante, el menor al defensor.",
      "El máximo de impactos es igual al número de guerreros del jugador que tira.",
      "El defensor puede jugar una carta de Ambush para anular los impactos del atacante antes de tirar.",
      "Si el defensor no tiene guerreros (solo edificios/tokens), el atacante gana 1 impacto adicional (Defenseless).",
    ],
    contentEN: [
      "The attacker chooses a clearing where they have warriors and a defender has pieces.",
      "Both players roll 2 dice. Higher result goes to attacker, lower to defender.",
      "Maximum hits equal the rolling player's warrior count in that clearing.",
      "Defender may play an Ambush card to negate attacker's hits before rolling.",
      "If defender has no warriors (only buildings/tokens), attacker gains 1 extra hit (Defenseless).",
    ],
  },
  {
    id: "rule",
    titleES: "2.6 Control de Claros",
    titleEN: "2.6 Ruling Clearings",
    contentES: [
      "El controlador de un claro es el jugador con más guerreros + edificios en ese claro.",
      "Los tokens y peones no cuentan para el control.",
      "En caso de empate, ningún jugador controla ese claro.",
      "Controlar un claro es necesario para construir edificios y activar habilidades de facción.",
    ],
    contentEN: [
      "The ruler of a clearing is the player with the most warriors + buildings there.",
      "Tokens and pawns do not count toward rule.",
      "In case of a tie, no one rules that clearing.",
      "Ruling a clearing is required to build buildings and activate faction abilities.",
    ],
  },
];
