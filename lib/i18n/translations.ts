/**
 * i18n translations for Woodland Setup
 * Supports ES (Spanish) and EN (English)
 * Language is auto-detected from browser locale; falls back to ES.
 */

export type Language = "es" | "en";

export const translations = {
  es: {
    // Nav
    nav_factions: "Facciones",
    nav_history: "Historial",
    nav_combinations: "Combinaciones",

    // Home
    home_companion: "Un compañero para Root",
    home_headline1: "Que el bosque",
    home_headline2: "decida",
    home_headline3: "por ti",
    home_subtitle:
      "Genera setups balanceados de Root respetando el sistema oficial de Reach. Tira los dados o elige a mano. Que la próxima partida empiece más rápido.",
    home_cta_start: "Iniciar Partida",
    home_cta_factions: "Ver facciones →",
    home_features_title: "Qué hace",
    home_feature1_title: "Aleatorio Balanceado",
    home_feature1_desc:
      "Algoritmo que respeta el Reach mínimo según jugadores. Nunca te toca un setup roto.",
    home_feature2_title: "Draft por Turnos",
    home_feature2_desc:
      "Pool ampliado para que cada jugador elija. Mantén el azar pero con control.",
    home_feature3_title: "Selección Manual",
    home_feature3_desc:
      "Tú eliges. La app valida en vivo: Reach, militantes, exclusiones oficiales.",
    home_factions_title: "Las 14 facciones",
    home_reach_note:
      "Valores de Reach del Law of Root (3ª edición) y las expansiones Riverfolk, Underworld, Marauder y Homeland.",
    home_footer_unofficial:
      "Herramienta no oficial hecha por fans · Open source bajo licencia MIT",
    home_footer_trademark: "Root es una marca de",
    home_footer_trademark2: ". Esta app no está afiliada ni respaldada por ellos.",

    // Combinations page
    comb_title: "Combinaciones",
    comb_subtitle:
      "Setups oficiales y recomendados por la comunidad para partidas equilibradas.",
    comb_official_title: "Combinaciones Oficiales",
    comb_official_desc:
      "Setups recomendados en el Law of Root y materiales oficiales de Leder Games.",
    comb_community_title: "Recomendadas por la Comunidad",
    comb_community_desc:
      "Combinaciones probadas y valoradas por jugadores experimentados.",
    comb_bots_title: "Bots Mecánicos (Clockwork)",
    comb_bots_desc:
      "La expansión Clockwork añade versiones autónomas de las 4 facciones del juego base. Úsalos para completar partidas con menos jugadores o para práctica en solitario.",
    comb_bots_suggestion: "Sugerido con bots",
    comb_tag_official: "Oficial",
    comb_tag_community: "Comunidad",
    comb_tag_beginner: "Iniciación",
    comb_tag_advanced: "Avanzado",
    comb_tag_bot: "Bot",
    comb_players: "jugadores",
    comb_reach: "Reach",
    comb_back: "← Volver al inicio",

    // Setup wizard
    setup_step1_label: "Paso 1 de 4",
    setup_step1_title: "¿Cuántos jugadores?",
    setup_step2_label: "Paso 2 de 4",
    setup_step2_title: "¿Qué expansiones tienes?",
    setup_step2_subtitle:
      "Activa las cajas que vas a usar. Solo entrarán al sorteo facciones de las expansiones marcadas.",
    setup_step2_available: "Facciones disponibles:",
    setup_step2_need: "necesitas al menos",
    setup_step2_need_more:
      "Activa más expansiones para tener suficientes facciones.",
    setup_step3_label: "Paso 3 de 4",
    setup_step3_title: "¿Cómo quieres elegir?",
    setup_step4_label: "Resultado",
    setup_ready_label: "Tu partida está lista",
    setup_ready_title: "El Bosque Espera",
    setup_map: "Mapa",
    setup_reroll: "🎲 Re-tirar",
    setup_save: "Guardar partida",
    setup_saved: "✓ Guardada",
    setup_back: "← Atrás",
    setup_new: "Nueva partida",
    setup_see_history: "Ver historial →",
    setup_order_title: "Orden de Setup",
    setup_order_desc:
      "Cada facción tiene su orden oficial de setup. Configuren en este orden de arriba abajo (Marquise siempre primero si está presente).",
    setup_error_title: "No se pudo generar una partida válida",
    setup_error_back: "← Revisar opciones",
    setup_manual_label: "Selección Manual",
    setup_manual_title: "Elige las facciones",
    setup_manual_of: "de",
    setup_manual_selected: "seleccionadas",
    setup_confirm: "Confirmar",
    setup_draft_label: "Draft Pool",
    setup_draft_title: "Elijan en orden de asiento",
    setup_draft_of: "de",
    setup_draft_chosen: "elegidas · pool de",
    setup_new_pool: "🎲 Nuevo pool",
    setup_required: "requerido",
    setup_faction: "facción",
    setup_factions: "facciones",
    setup_seleccion_x: "Selecciona",
    setup_seleccion_mas: "más",

    // Reach meter
    reach_total: "Reach Total",
    reach_balanced: "✓ Combinación balanceada",
    reach_low: "⚠ Por debajo del mínimo recomendado",

    // Faction card
    faction_militant: "Militante",
    faction_insurgent: "Insurgente",
    faction_difficulty: "Dificultad:",
    faction_reach_label: "Reach",

    // History
    history_title: "Historial",
    history_empty: "Aún no hay partidas guardadas.",
    history_players: "jugadores",
    history_balanced: "Balanceada",
    history_unbalanced: "No balanceada",
    history_reach: "Reach",
    history_clear: "Borrar historial",
    history_back: "← Inicio",
  },

  en: {
    // Nav
    nav_factions: "Factions",
    nav_history: "History",
    nav_combinations: "Combinations",

    // Home
    home_companion: "A companion for Root",
    home_headline1: "Let the forest",
    home_headline2: "decide",
    home_headline3: "for you",
    home_subtitle:
      "Generate balanced Root setups using the official Reach system. Roll the dice or pick by hand. Start your next game faster.",
    home_cta_start: "Start Game",
    home_cta_factions: "See factions →",
    home_features_title: "What it does",
    home_feature1_title: "Balanced Random",
    home_feature1_desc:
      "Algorithm that respects the minimum Reach by player count. You'll never get a broken setup.",
    home_feature2_title: "Turn-Based Draft",
    home_feature2_desc:
      "Expanded pool so each player can choose. Keep randomness but with control.",
    home_feature3_title: "Manual Selection",
    home_feature3_desc:
      "You pick. The app validates live: Reach, militants, official exclusions.",
    home_factions_title: "All 14 factions",
    home_reach_note:
      "Reach values from the Law of Root (3rd printing) and the Riverfolk, Underworld, Marauder, and Homeland expansions.",
    home_footer_unofficial:
      "Unofficial fan-made tool · Open source under MIT license",
    home_footer_trademark: "Root is a trademark of",
    home_footer_trademark2: ". This app is not affiliated with or endorsed by them.",

    // Combinations page
    comb_title: "Combinations",
    comb_subtitle:
      "Official and community-recommended setups for balanced games.",
    comb_official_title: "Official Combinations",
    comb_official_desc:
      "Setups recommended in the Law of Root and official Leder Games materials.",
    comb_community_title: "Community Recommendations",
    comb_community_desc:
      "Combinations tested and praised by experienced players.",
    comb_bots_title: "Mechanical Bots (Clockwork)",
    comb_bots_desc:
      "The Clockwork expansion adds autonomous versions of the 4 base-game factions. Use them to fill seats with fewer players or for solo practice.",
    comb_bots_suggestion: "Suggested with bots",
    comb_tag_official: "Official",
    comb_tag_community: "Community",
    comb_tag_beginner: "Beginner",
    comb_tag_advanced: "Advanced",
    comb_tag_bot: "Bot",
    comb_players: "players",
    comb_reach: "Reach",
    comb_back: "← Back to home",

    // Setup wizard
    setup_step1_label: "Step 1 of 4",
    setup_step1_title: "How many players?",
    setup_step2_label: "Step 2 of 4",
    setup_step2_title: "Which expansions do you have?",
    setup_step2_subtitle:
      "Enable the boxes you'll use. Only factions from selected expansions will be included.",
    setup_step2_available: "Available factions:",
    setup_step2_need: "you need at least",
    setup_step2_need_more:
      "Enable more expansions to have enough factions.",
    setup_step3_label: "Step 3 of 4",
    setup_step3_title: "How do you want to pick?",
    setup_step4_label: "Result",
    setup_ready_label: "Your game is ready",
    setup_ready_title: "The Forest Awaits",
    setup_map: "Map",
    setup_reroll: "🎲 Re-roll",
    setup_save: "Save game",
    setup_saved: "✓ Saved",
    setup_back: "← Back",
    setup_new: "New game",
    setup_see_history: "See history →",
    setup_order_title: "Setup Order",
    setup_order_desc:
      "Each faction has an official setup order. Set up from top to bottom (Marquise always first if present).",
    setup_error_title: "Couldn't generate a valid game",
    setup_error_back: "← Review options",
    setup_manual_label: "Manual Selection",
    setup_manual_title: "Choose factions",
    setup_manual_of: "of",
    setup_manual_selected: "selected",
    setup_confirm: "Confirm",
    setup_draft_label: "Draft Pool",
    setup_draft_title: "Pick in seat order",
    setup_draft_of: "of",
    setup_draft_chosen: "chosen · pool of",
    setup_new_pool: "🎲 New pool",
    setup_required: "required",
    setup_faction: "faction",
    setup_factions: "factions",
    setup_seleccion_x: "Select",
    setup_seleccion_mas: "more",

    // Reach meter
    reach_total: "Total Reach",
    reach_balanced: "✓ Balanced combination",
    reach_low: "⚠ Below the recommended minimum",

    // Faction card
    faction_militant: "Militant",
    faction_insurgent: "Insurgent",
    faction_difficulty: "Difficulty:",
    faction_reach_label: "Reach",

    // History
    history_title: "History",
    history_empty: "No saved games yet.",
    history_players: "players",
    history_balanced: "Balanced",
    history_unbalanced: "Unbalanced",
    history_reach: "Reach",
    history_clear: "Clear history",
    history_back: "← Home",
  },
} as const;

export type TranslationKey = keyof typeof translations.es;
