// Animation configuration constants
export const ANIMATIONS = {
    // Float animation
    FLOAT: {
        y: [0, -10, 0],
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
    },

    // Glow animation
    GLOW: {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
    },

    // Sparkle collection
    SPARKLE_COLLECT: {
        scale: [0, 1.2, 1],
        opacity: [0, 1, 1],
        duration: 0.5,
    },

    // Purchase success
    PURCHASE_SUCCESS: {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 2 },
        duration: 0.5,
    },

    // Card hover
    CARD_HOVER: {
        scale: 1.05,
        transition: { duration: 0.2 },
    },

    // Card tap
    CARD_TAP: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },

    // Page transition
    PAGE_TRANSITION: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
    },

    // Modal
    MODAL: {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
        transition: { duration: 0.2 },
    },
} as const;

// Easing functions
export const EASING = {
    EASE_IN_OUT: 'easeInOut',
    EASE_OUT: 'easeOut',
    EASE_IN: 'easeIn',
    LINEAR: 'linear',
    SPRING: { type: 'spring', stiffness: 300, damping: 30 },
} as const;
