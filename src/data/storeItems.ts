export interface StoreItem {
    id: string;
    name: string;
    description: string;
    category: 'background' | 'accessory' | 'hair';
    cost: number;
    emoji: string;
    unlockRequirement?: {
        stat?: 'health' | 'happiness' | 'wisdom' | 'energy';
        minValue?: number;
        stage?: string;
    };
}

export const storeItems: StoreItem[] = [
    // Backgrounds
    {
        id: 'bg-forest',
        name: 'Enchanted Forest',
        description: 'A magical forest filled with glowing trees',
        category: 'background',
        cost: 50,
        emoji: '🌲',
    },
    {
        id: 'bg-beach',
        name: 'Serene Beach',
        description: 'Calm waves and golden sand',
        category: 'background',
        cost: 60,
        emoji: '🏖️',
    },
    {
        id: 'bg-space',
        name: 'Cosmic Space',
        description: 'Float among the stars',
        category: 'background',
        cost: 80,
        emoji: '🌌',
    },
    {
        id: 'bg-cozy',
        name: 'Cozy Room',
        description: 'A warm, comfortable space',
        category: 'background',
        cost: 70,
        emoji: '🏠',
    },
    {
        id: 'bg-garden',
        name: 'Bloom Garden',
        description: 'A garden full of colorful flowers',
        category: 'background',
        cost: 55,
        emoji: '🌸',
    },
    {
        id: 'bg-mountain',
        name: 'Mountain Peak',
        description: 'Breathtaking mountain views',
        category: 'background',
        cost: 75,
        emoji: '⛰️',
    },

    // Accessories
    {
        id: 'glasses',
        name: 'Cool Glasses',
        description: 'Look wise and stylish',
        category: 'accessory',
        cost: 30,
        emoji: '👓',
    },
    {
        id: 'hat',
        name: 'Cozy Hat',
        description: 'Stay warm and fashionable',
        category: 'accessory',
        cost: 35,
        emoji: '🎩',
    },
    {
        id: 'crown',
        name: 'Royal Crown',
        description: 'For true champions',
        category: 'accessory',
        cost: 100,
        emoji: '👑',
        unlockRequirement: {
            stage: 'radiant',
        },
    },
    {
        id: 'flower',
        name: 'Flower Crown',
        description: 'Nature\'s beauty',
        category: 'accessory',
        cost: 40,
        emoji: '🌺',
    },
    {
        id: 'star',
        name: 'Star Accessory',
        description: 'Shine bright',
        category: 'accessory',
        cost: 45,
        emoji: '⭐',
    },
];

export const getItemsByCategory = (category: StoreItem['category']) => {
    return storeItems.filter(item => item.category === category);
};

export const getItemById = (id: string) => {
    return storeItems.find(item => item.id === id);
};
