// Game-related types
export interface Activity {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    onClick: () => void;
    disabled?: boolean;
    badge?: string;
}

export interface StoreItemCategory {
    id: 'background' | 'accessory' | 'hair';
    label: string;
    emoji: string;
}

export interface UnlockRequirement {
    stat?: 'health' | 'happiness' | 'wisdom' | 'energy';
    minValue?: number;
    stage?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    requirement: {
        type: 'check_in_count' | 'breathing_cycles' | 'memory_wins' | 'gratitude_streak' | 'evolution_stage';
        value: number;
    };
    reward: number; // Sparkles
    unlocked: boolean;
}

export interface DailyChallenge {
    id: string;
    title: string;
    description: string;
    type: 'breathing' | 'gratitude' | 'coping_skill' | 'check_in';
    reward: number;
    completed: boolean;
    expiresAt: string;
}
