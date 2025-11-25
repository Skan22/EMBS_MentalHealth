import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EvolutionStage = 'seed' | 'sprout' | 'bloom' | 'radiant';
export type EvolutionTrack = 'serene' | 'wise' | 'energetic';

export type SkinTone = 'light' | 'medium' | 'tan' | 'dark';
export type HairStyle = 'short' | 'long' | 'curly' | 'bun' | 'ponytail';
export type HairColor = 'brown' | 'blonde' | 'black' | 'red' | 'blue' | 'pink';
export type FaceExpression = 'happy' | 'calm' | 'excited' | 'thoughtful';

interface AvatarCustomization {
    skinTone: SkinTone;
    hairStyle: HairStyle;
    hairColor: HairColor;
    expression: FaceExpression;
}

interface CheckInResponse {
    date: string;
    responses: Record<string, number>;
    score: number;
}

interface BloomState {
    // Bloom Stats
    health: number;
    happiness: number;
    wisdom: number;
    energy: number;

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
    updateStats: (stats: Partial<Pick<BloomState, 'health' | 'happiness' | 'wisdom' | 'energy'>>) => void;
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

const calculateStage = (health: number, happiness: number): EvolutionStage => {
    const avg = (health + happiness) / 2;
    if (avg < 25) return 'seed';
    if (avg < 50) return 'sprout';
    if (avg < 75) return 'bloom';
    return 'radiant';
};

const calculateTrack = (wisdom: number, energy: number): EvolutionTrack => {
    if (wisdom > energy && wisdom > 50) return 'wise';
    if (energy > wisdom && energy > 50) return 'energetic';
    return 'serene';
};

export const useBloomStore = create<BloomState>()(
    persist(
        (set, get) => ({
            // Initial Stats
            health: 50,
            happiness: 50,
            wisdom: 30,
            energy: 30,

            // Initial Evolution
            stage: 'seed',
            track: 'serene',

            // Initial Avatar
            avatar: {
                skinTone: 'medium',
                hairStyle: 'short',
                hairColor: 'brown',
                expression: 'happy',
            },

            // Initial Store
            sparkles: 100,
            purchasedItems: ['default'],
            equippedAccessories: [],
            currentBackground: 'default',

            // Initial History
            checkIns: [],
            lastCheckIn: null,

            // Actions
            updateStats: (stats) => {
                set((state) => {
                    const newState = { ...state, ...stats };
                    const newStage = calculateStage(newState.health, newState.happiness);
                    const newTrack = calculateTrack(newState.wisdom, newState.energy);

                    return {
                        ...newState,
                        stage: newStage,
                        track: newTrack,
                    };
                });
            },

            addCheckIn: (checkIn) => {
                set((state) => ({
                    checkIns: [...state.checkIns, checkIn],
                    lastCheckIn: checkIn.date,
                }));
            },

            addSparkles: (amount) => {
                set((state) => ({
                    sparkles: state.sparkles + amount,
                }));
            },

            spendSparkles: (amount) => {
                const { sparkles } = get();
                if (sparkles >= amount) {
                    set({ sparkles: sparkles - amount });
                    return true;
                }
                return false;
            },

            purchaseItem: (itemId, cost) => {
                const { sparkles, purchasedItems } = get();
                if (sparkles >= cost && !purchasedItems.includes(itemId)) {
                    set({
                        sparkles: sparkles - cost,
                        purchasedItems: [...purchasedItems, itemId],
                    });
                    return true;
                }
                return false;
            },

            equipAccessory: (itemId) => {
                set((state) => ({
                    equippedAccessories: [...state.equippedAccessories, itemId],
                }));
            },

            unequipAccessory: (itemId) => {
                set((state) => ({
                    equippedAccessories: state.equippedAccessories.filter(id => id !== itemId),
                }));
            },

            setBackground: (backgroundId) => {
                set({ currentBackground: backgroundId });
            },

            updateAvatar: (customization) => {
                set((state) => ({
                    avatar: { ...state.avatar, ...customization },
                }));
            },

            evolve: () => {
                const { health, happiness, wisdom, energy } = get();
                const newStage = calculateStage(health, happiness);
                const newTrack = calculateTrack(wisdom, energy);

                set({
                    stage: newStage,
                    track: newTrack,
                });
            },
        }),
        {
            name: 'bloom-storage',
        }
    )
);
