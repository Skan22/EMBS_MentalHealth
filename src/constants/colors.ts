// Color theme constants
export const COLORS = {
    // Sanctuary palette
    SANCTUARY: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
    },

    // Bloom palette
    BLOOM: {
        50: '#fdf4ff',
        100: '#fae8ff',
        200: '#f5d0fe',
        300: '#f0abfc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
    },

    // Nature palette
    NATURE: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
    },

    // Warm palette
    WARM: {
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
    },
} as const;

// Background theme gradients
export const BACKGROUND_THEMES = {
    DEFAULT: 'bg-gradient-to-br from-sanctuary-50 via-bloom-50 to-nature-50',
    FOREST: 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100',
    BEACH: 'bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100',
    SPACE: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
    COZY: 'bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100',
    GARDEN: 'bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100',
    MOUNTAIN: 'bg-gradient-to-br from-slate-200 via-gray-100 to-stone-200',
} as const;

// Activity colors
export const ACTIVITY_COLORS = {
    CHECK_IN: 'from-bloom-400 to-bloom-600',
    BREATHING: 'from-sanctuary-400 to-sanctuary-600',
    MEMORY: 'from-bloom-400 to-bloom-600',
    MOOD_JOURNAL: 'from-nature-400 to-nature-600',
    GRATITUDE: 'from-warm-400 to-warm-600',
} as const;

// Evolution track colors
export const TRACK_COLORS = {
    WISE: 'from-bloom-400 to-bloom-600',
    ENERGETIC: 'from-warm-400 to-warm-600',
    SERENE: 'from-nature-400 to-nature-600',
} as const;
