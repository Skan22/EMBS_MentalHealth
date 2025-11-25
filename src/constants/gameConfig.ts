// Game configuration constants
export const GAME_CONFIG = {
    // Sparkle rewards
    REWARDS: {
        CHECK_IN_BASE: 20,
        CHECK_IN_BONUS: 10, // For positive responses
        BREATHING_CYCLE: 5,
        MEMORY_GAME_BASE: 20,
        MEMORY_GAME_MAX: 50,
        MOOD_JOURNAL: 10,
        GRATITUDE_JOURNAL: 15,
    },

    // Stat boosts
    STAT_BOOSTS: {
        BREATHING_ENERGY: 5,
        MEMORY_WISDOM: 5,
        MOOD_JOURNAL_WISDOM: 5,
        GRATITUDE_HAPPINESS: 10,
    },

    // Evolution thresholds
    EVOLUTION: {
        SEED_THRESHOLD: 25,
        SPROUT_THRESHOLD: 50,
        BLOOM_THRESHOLD: 75,
        RADIANT_THRESHOLD: 100,
    },

    // Track thresholds
    TRACK: {
        WISDOM_THRESHOLD: 50,
        ENERGY_THRESHOLD: 50,
    },

    // Starting values
    INITIAL: {
        SPARKLES: 100,
        HEALTH: 50,
        HAPPINESS: 50,
        WISDOM: 30,
        ENERGY: 30,
    },
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
    BACKGROUND_TRANSITION: 500,
    PURCHASE_ANIMATION: 1000,
} as const;

// Breathing exercise configuration
export const BREATHING_CONFIG = {
    BOX_BREATHING: {
        INHALE: 4,
        HOLD_1: 4,
        EXHALE: 4,
        HOLD_2: 4,
    },
    FOUR_SEVEN_EIGHT: {
        INHALE: 4,
        HOLD: 7,
        EXHALE: 8,
    },
} as const;

// Memory game configuration
export const MEMORY_GAME_CONFIG = {
    GRID_SIZE: 12,
    FLIP_DELAY: 1000,
    PAIRS_COUNT: 6,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
    BLOOM_STORE: 'bloom-storage',
} as const;
