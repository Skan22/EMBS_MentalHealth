import { useMemo } from 'react';
import NiceAvatar, { genConfig } from 'react-nice-avatar';
import type { AvatarConfig } from 'react-nice-avatar';
import { motion } from 'framer-motion';
import { useBloomStore } from '../store/useBloomStore';
import type { AvatarCustomization } from '../types/store.types';
import { ANIMATIONS } from '../constants/animations';

interface AvatarProps {
    customization?: Partial<AvatarCustomization>;
    size?: number;
    className?: string;
}

export const Avatar = ({ customization, size = 200, className = '' }: AvatarProps = {}) => {
    const { avatar: storeAvatar, stage, equippedAccessories } = useBloomStore();
    const avatar = customization ? { ...storeAvatar, ...customization } : storeAvatar;

    // Map our store types to react-nice-avatar config
    const config = useMemo(() => {
        const baseConfig: AvatarConfig = {
            sex: 'woman', // Default base
            faceColor: mapSkinTone(avatar.skinTone),
            earSize: 'small',
            eyeStyle: 'circle',
            noseStyle: 'round',
            mouthStyle: 'smile',
            shirtStyle: 'hoody',
            glassesStyle: 'none',
            hairColor: mapHairColor(avatar.hairColor),
            hairStyle: 'womanShort',
            hatStyle: 'none',
            shirtColor: '#77311D',
            bgColor: 'transparent',
        };

        // Apply Stage-specific modifications
        if (stage === 'baby') {
            baseConfig.hairStyle = 'normal'; // Minimal hair
            baseConfig.shirtStyle = 'short';
            baseConfig.eyeStyle = 'circle'; // Cute eyes
            baseConfig.mouthStyle = 'laugh';
            baseConfig.earSize = 'small';
        } else if (stage === 'child') {
            baseConfig.hairStyle = mapHairStyle(avatar.hairStyle);
            baseConfig.shirtStyle = 'polo';
        } else {
            // Teen & Adult
            baseConfig.hairStyle = mapHairStyle(avatar.hairStyle);
            baseConfig.shirtStyle = 'hoody';
        }

        // Apply Accessories (Built-in)
        if (equippedAccessories.includes('glasses')) {
            baseConfig.glassesStyle = 'round';
        }
        if (equippedAccessories.includes('hat')) {
            baseConfig.hatStyle = 'beanie';
        }

        return genConfig(baseConfig);
    }, [avatar, stage, equippedAccessories]);

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <motion.div
                className="w-full h-full"
                {...ANIMATIONS.FLOAT}
            >
                <NiceAvatar style={{ width: '100%', height: '100%' }} {...config} />

                {/* Custom Overlay Accessories */}
                {equippedAccessories.includes('crown') && (
                    <motion.div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-1/2"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <CrownSVG />
                    </motion.div>
                )}
                {equippedAccessories.includes('flower') && (
                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full scale-110"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                    >
                        <FlowerCrownSVG />
                    </motion.div>
                )}
                {equippedAccessories.includes('star') && (
                    <motion.div
                        className="absolute top-10 -right-4 w-8 h-8"
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                    >
                        <StarSVG />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

// --- Helpers ---

const mapSkinTone = (tone: string): string => {
    switch (tone) {
        case 'light': return '#F9C9B6';
        case 'medium': return '#AC6651';
        case 'tan': return '#8D5524';
        case 'dark': return '#54311D';
        default: return '#F9C9B6';
    }
};

const mapHairColor = (color: string): string => {
    switch (color) {
        case 'blonde': return '#F4D150';
        case 'brown': return '#503335';
        case 'black': return '#2C1B18';
        case 'red': return '#B5523F';
        case 'blue': return '#4069E5'; // Custom color might fall back
        case 'pink': return '#E91E63';
        default: return '#503335';
    }
};

const mapHairStyle = (style: string): AvatarConfig['hairStyle'] => {
    switch (style) {
        case 'short': return 'normal';
        case 'long': return 'womanLong';
        case 'curly': return 'thick';
        case 'bun': return 'womanShort'; // Approximation
        case 'ponytail': return 'womanLong'; // Approximation
        default: return 'normal';
    }
};

// --- Custom Accessory SVGs ---

const CrownSVG = () => (
    <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-md">
        <path d="M10 40 L20 10 L40 40 L50 5 L60 40 L80 10 L90 40 Z" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
        <circle cx="20" cy="10" r="3" fill="#FF0000" />
        <circle cx="50" cy="5" r="4" fill="#00FF00" />
        <circle cx="80" cy="10" r="3" fill="#0000FF" />
    </svg>
);

const FlowerCrownSVG = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full drop-shadow-sm">
        <path d="M10 30 Q50 10 90 30" fill="none" stroke="transparent" />
        <circle cx="20" cy="25" r="5" fill="#FF69B4" />
        <circle cx="35" cy="20" r="6" fill="#FFB6C1" />
        <circle cx="50" cy="18" r="7" fill="#FF69B4" />
        <circle cx="65" cy="20" r="6" fill="#FFB6C1" />
        <circle cx="80" cy="25" r="5" fill="#FF69B4" />
    </svg>
);

const StarSVG = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-lg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
    </svg>
);
