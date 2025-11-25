// Store-related types
export type EvolutionStage = 'seed' | 'sprout' | 'bloom' | 'radiant';
export type EvolutionTrack = 'serene' | 'wise' | 'energetic';

export type SkinTone = 'light' | 'medium' | 'tan' | 'dark';
export type HairStyle = 'short' | 'long' | 'curly' | 'bun' | 'ponytail';
export type HairColor = 'brown' | 'blonde' | 'black' | 'red' | 'blue' | 'pink';
export type FaceExpression = 'happy' | 'calm' | 'excited' | 'thoughtful';

export interface AvatarCustomization {
    skinTone: SkinTone;
    hairStyle: HairStyle;
    hairColor: HairColor;
    expression: FaceExpression;
}

export interface CheckInResponse {
    date: string;
    responses: Record<string, number>;
    score: number;
}

export interface BloomStats {
    health: number;
    happiness: number;
    wisdom: number;
    energy: number;
}

export interface BloomState extends BloomStats {
    // Evolution
    stage: EvolutionStage;
    track: EvolutionTrack;

    // Avatar
    avatar: AvatarCustomization;

    // Store
    sparkles: number;
    purchasedItems: string[];
    equippedAccessories: string[];
    currentBackground: string;

    // Check-in History
    checkIns: CheckInResponse[];
    lastCheckIn: string | null;

    // Actions
    updateStats: (stats: Partial<BloomStats>) => void;
    addCheckIn: (checkIn: CheckInResponse) => void;
    addSparkles: (amount: number) => void;
    spendSparkles: (amount: number) => boolean;
    purchaseItem: (itemId: string, cost: number) => boolean;
    equipAccessory: (itemId: string) => void;
    unequipAccessory: (itemId: string) => void;
    setBackground: (backgroundId: string) => void;
    updateAvatar: (customization: Partial<AvatarCustomization>) => void;
    evolve: () => void;
}
