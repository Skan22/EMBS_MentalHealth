import { motion } from 'framer-motion';
import { useBloomStore, type SkinTone, type HairStyle, type HairColor, type FaceExpression } from '../store/useBloomStore';
import type { AvatarCustomization } from '../types/store.types';
import { ANIMATIONS } from '../constants/animations';

const skinToneColors: Record<SkinTone, { base: string; shadow: string; highlight: string }> = {
    light: { base: '#FFE0BD', shadow: '#F5D5A8', highlight: '#FFF5E6' },
    medium: { base: '#F1C27D', shadow: '#E0B06D', highlight: '#FFD89B' },
    tan: { base: '#C68642', shadow: '#B57632', highlight: '#D69A5A' },
    dark: { base: '#8D5524', shadow: '#7D4514', highlight: '#9D6534' },
};

const hairColorValues: Record<HairColor, { base: string; highlight: string }> = {
    brown: { base: '#6F4E37', highlight: '#8B6347' },
    blonde: { base: '#F4D03F', highlight: '#FFE55C' },
    black: { base: '#2C2C2C', highlight: '#3C3C3C' },
    red: { base: '#C1440E', highlight: '#E15A1E' },
    blue: { base: '#3498DB', highlight: '#5DADE2' },
    pink: { base: '#E91E63', highlight: '#F48FB1' },
};

interface AvatarProps {
    customization?: Partial<AvatarCustomization>;
}

export const Avatar = ({ customization }: AvatarProps = {}) => {
    const { avatar: storeAvatar, health, happiness, equippedAccessories } = useBloomStore();
    const avatar = customization ? { ...storeAvatar, ...customization } : storeAvatar;
    const { skinTone, hairStyle, hairColor } = avatar;

    const skinColors = skinToneColors[skinTone];
    const hairColors = hairColorValues[hairColor];

    // Determine expression based on stats
    const getExpression = (): FaceExpression => {
        if (happiness > 75) return 'excited';
        if (happiness > 50) return 'happy';
        if (health < 30) return 'thoughtful';
        return 'calm';
    };

    const currentExpression = getExpression();

    // Dynamic glow color based on happiness
    const getGlowColor = () => {
        if (happiness > 75) return 'from-yellow-300 to-orange-300';
        if (happiness > 50) return 'from-pink-300 to-purple-300';
        if (health < 30) return 'from-blue-300 to-cyan-300';
        return 'from-green-300 to-teal-300';
    };

    return (
        <motion.div
            className="relative w-full h-full flex items-center justify-center"
            {...ANIMATIONS.FLOAT}
        >
            {/* Dynamic Glow Effect */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${getGlowColor()} rounded-full blur-3xl opacity-40`}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Sparkle particles */}
            {happiness > 60 && (
                <>
                    <motion.div
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                        style={{ top: '20%', left: '30%' }}
                        animate={{
                            y: [-10, -30, -10],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0,
                        }}
                    />
                    <motion.div
                        className="absolute w-2 h-2 bg-pink-300 rounded-full"
                        style={{ top: '25%', right: '25%' }}
                        animate={{
                            y: [-10, -30, -10],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                        }}
                    />
                    <motion.div
                        className="absolute w-2 h-2 bg-purple-300 rounded-full"
                        style={{ top: '30%', left: '70%' }}
                        animate={{
                            y: [-10, -30, -10],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                        }}
                    />
                </>
            )}

            {/* Avatar SVG */}
            <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                className="relative z-10 drop-shadow-2xl"
            >
                <defs>
                    {/* Gradients for modern look */}
                    <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={skinColors.highlight} />
                        <stop offset="50%" stopColor={skinColors.base} />
                        <stop offset="100%" stopColor={skinColors.shadow} />
                    </linearGradient>

                    <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={hairColors.highlight} />
                        <stop offset="100%" stopColor={hairColors.base} />
                    </linearGradient>

                    {/* Soft shadow filter */}
                    <filter id="softShadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="0" dy="2" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Body with gradient */}
                <ellipse
                    cx="110"
                    cy="150"
                    rx="55"
                    ry="65"
                    fill="url(#skinGradient)"
                    filter="url(#softShadow)"
                />

                {/* Neck */}
                <rect
                    x="92"
                    y="120"
                    width="36"
                    height="35"
                    fill="url(#skinGradient)"
                    rx="8"
                />

                {/* Head with gradient */}
                <circle
                    cx="110"
                    cy="90"
                    r="50"
                    fill="url(#skinGradient)"
                    filter="url(#softShadow)"
                />

                {/* Cheek highlights */}
                <ellipse
                    cx="75"
                    cy="95"
                    rx="12"
                    ry="8"
                    fill="white"
                    opacity="0.3"
                />
                <ellipse
                    cx="145"
                    cy="95"
                    rx="12"
                    ry="8"
                    fill="white"
                    opacity="0.3"
                />

                {/* Hair with gradient */}
                <HairComponent style={hairStyle} />

                {/* Face */}
                <FaceComponent expression={currentExpression} />

                {/* Accessories */}
                {equippedAccessories.includes('glasses') && <Glasses />}
                {equippedAccessories.includes('hat') && <Hat />}
                {equippedAccessories.includes('crown') && <Crown />}
                {equippedAccessories.includes('flower') && <FlowerCrown />}
                {equippedAccessories.includes('star') && <StarAccessory />}
            </svg>
        </motion.div>
    );
};

// Modern Hair Components with gradients
const HairComponent = ({ style }: { style: HairStyle }) => {
    switch (style) {
        case 'short':
            return (
                <g>
                    <path
                        d="M 60 80 Q 55 45, 75 38 Q 110 32, 145 38 Q 165 45, 160 80 Z"
                        fill="url(#hairGradient)"
                        filter="url(#softShadow)"
                    />
                    {/* Hair strands for detail */}
                    <path d="M 75 40 Q 75 35, 78 38" stroke="url(#hairGradient)" strokeWidth="2" fill="none" opacity="0.5" />
                    <path d="M 110 35 Q 110 30, 113 33" stroke="url(#hairGradient)" strokeWidth="2" fill="none" opacity="0.5" />
                    <path d="M 145 40 Q 145 35, 142 38" stroke="url(#hairGradient)" strokeWidth="2" fill="none" opacity="0.5" />
                </g>
            );
        case 'long':
            return (
                <g>
                    <path
                        d="M 60 80 Q 55 45, 75 38 Q 110 32, 145 38 Q 165 45, 160 80 Z"
                        fill="url(#hairGradient)"
                        filter="url(#softShadow)"
                    />
                    <ellipse cx="65" cy="110" rx="18" ry="45" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    <ellipse cx="155" cy="110" rx="18" ry="45" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    {/* Hair shine */}
                    <ellipse cx="65" cy="90" rx="5" ry="15" fill="white" opacity="0.3" />
                    <ellipse cx="155" cy="90" rx="5" ry="15" fill="white" opacity="0.3" />
                </g>
            );
        case 'curly':
            return (
                <g>
                    <circle cx="75" cy="55" r="18" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    <circle cx="95" cy="45" r="18" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    <circle cx="110" cy="42" r="18" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    <circle cx="125" cy="45" r="18" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    <circle cx="145" cy="55" r="18" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    <circle cx="65" cy="75" r="15" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    <circle cx="155" cy="75" r="15" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    {/* Highlights on curls */}
                    <circle cx="110" cy="40" r="6" fill="white" opacity="0.4" />
                    <circle cx="75" cy="53" r="5" fill="white" opacity="0.4" />
                    <circle cx="145" cy="53" r="5" fill="white" opacity="0.4" />
                </g>
            );
        case 'bun':
            return (
                <g>
                    <path
                        d="M 60 80 Q 55 55, 75 48 Q 110 42, 145 48 Q 165 55, 160 80 Z"
                        fill="url(#hairGradient)"
                        filter="url(#softShadow)"
                    />
                    <circle cx="110" cy="38" r="24" fill="url(#hairGradient)" filter="url(#softShadow)" />
                    {/* Bun detail */}
                    <circle cx="110" cy="38" r="18" fill="url(#hairGradient)" opacity="0.7" />
                    <circle cx="110" cy="35" r="8" fill="white" opacity="0.3" />
                </g>
            );
        case 'ponytail':
            return (
                <g>
                    <path
                        d="M 60 80 Q 55 55, 75 48 Q 110 42, 145 48 Q 165 55, 160 80 Z"
                        fill="url(#hairGradient)"
                        filter="url(#softShadow)"
                    />
                    <ellipse
                        cx="155"
                        cy="85"
                        rx="12"
                        ry="40"
                        fill="url(#hairGradient)"
                        filter="url(#softShadow)"
                        transform="rotate(20 155 85)"
                    />
                    {/* Ponytail shine */}
                    <ellipse cx="155" cy="75" rx="4" ry="12" fill="white" opacity="0.3" transform="rotate(20 155 75)" />
                </g>
            );
        default:
            return null;
    }
};

// Modern Face Components with better expressions
const FaceComponent = ({ expression }: { expression: FaceExpression }) => {
    return (
        <g>
            {/* Eyes */}
            {expression === 'happy' || expression === 'calm' ? (
                <>
                    <circle cx="90" cy="85" r="6" fill="#2C2C2C" />
                    <circle cx="130" cy="85" r="6" fill="#2C2C2C" />
                    <circle cx="92" cy="83" r="2" fill="white" />
                    <circle cx="132" cy="83" r="2" fill="white" />
                </>
            ) : expression === 'excited' ? (
                <>
                    <circle cx="90" cy="85" r="8" fill="#2C2C2C" />
                    <circle cx="130" cy="85" r="8" fill="#2C2C2C" />
                    <circle cx="93" cy="82" r="3" fill="white" />
                    <circle cx="133" cy="82" r="3" fill="white" />
                    {/* Sparkle in eyes */}
                    <circle cx="88" cy="88" r="1.5" fill="white" />
                    <circle cx="128" cy="88" r="1.5" fill="white" />
                </>
            ) : (
                <>
                    <line x1="84" y1="82" x2="96" y2="88" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
                    <line x1="124" y1="88" x2="136" y2="82" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
                </>
            )}

            {/* Eyebrows */}
            {expression !== 'thoughtful' && (
                <>
                    <path d="M 80 75 Q 90 73, 100 75" stroke="#2C2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 120 75 Q 130 73, 140 75" stroke="#2C2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
            )}

            {/* Mouth */}
            {expression === 'happy' && (
                <path d="M 90 105 Q 110 115, 130 105" stroke="#2C2C2C" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
            {expression === 'excited' && (
                <>
                    <ellipse cx="110" cy="108" rx="12" ry="10" fill="#2C2C2C" />
                    <ellipse cx="110" cy="106" rx="8" ry="6" fill="#FF6B9D" />
                </>
            )}
            {expression === 'calm' && (
                <line x1="95" y1="105" x2="125" y2="105" stroke="#2C2C2C" strokeWidth="2.5" strokeLinecap="round" />
            )}
            {expression === 'thoughtful' && (
                <path d="M 95 108 Q 110 103, 125 108" stroke="#2C2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}

            {/* Blush */}
            {(expression === 'happy' || expression === 'excited') && (
                <>
                    <ellipse cx="75" cy="95" rx="10" ry="6" fill="#FF9999" opacity="0.6" />
                    <ellipse cx="145" cy="95" rx="10" ry="6" fill="#FF9999" opacity="0.6" />
                </>
            )}
        </g>
    );
};

// Modern Accessory Components
const Glasses = () => (
    <g filter="url(#softShadow)">
        <circle cx="90" cy="85" r="14" fill="none" stroke="#2C2C2C" strokeWidth="3" />
        <circle cx="130" cy="85" r="14" fill="none" stroke="#2C2C2C" strokeWidth="3" />
        <line x1="104" y1="85" x2="116" y2="85" stroke="#2C2C2C" strokeWidth="3" />
        {/* Lens shine */}
        <circle cx="95" cy="80" r="4" fill="white" opacity="0.6" />
        <circle cx="135" cy="80" r="4" fill="white" opacity="0.6" />
    </g>
);

const Hat = () => (
    <g filter="url(#softShadow)">
        <ellipse cx="110" cy="45" rx="45" ry="10" fill="url(#hairGradient)" />
        <rect x="80" y="28" width="60" height="18" fill="url(#hairGradient)" rx="8" />
        {/* Hat band */}
        <rect x="80" y="42" width="60" height="4" fill="#8B4513" rx="2" />
    </g>
);

const Crown = () => (
    <g filter="url(#softShadow)">
        <path
            d="M 75 50 L 80 38 L 85 50 L 92 32 L 99 50 L 110 28 L 121 50 L 128 32 L 135 50 L 140 38 L 145 50 Z"
            fill="url(linear-gradient(to bottom, #FFD700, #FFA500))"
            stroke="#FF8C00"
            strokeWidth="2"
        />
        <linearGradient id="crownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <path
            d="M 75 50 L 80 38 L 85 50 L 92 32 L 99 50 L 110 28 L 121 50 L 128 32 L 135 50 L 140 38 L 145 50 Z"
            fill="url(#crownGradient)"
            stroke="#FF8C00"
            strokeWidth="2"
        />
        {/* Jewels */}
        <circle cx="110" cy="30" r="5" fill="#FF0000" />
        <circle cx="92" cy="34" r="3" fill="#00FF00" />
        <circle cx="128" cy="34" r="3" fill="#0000FF" />
    </g>
);

const FlowerCrown = () => (
    <g>
        {[85, 105, 125].map((x, i) => (
            <g key={i}>
                <circle cx={x} cy="50" r="6" fill="#FF69B4" opacity="0.8" />
                <circle cx={x - 5} cy="48" r="5" fill="#FF1493" opacity="0.7" />
                <circle cx={x + 5} cy="48" r="5" fill="#FF1493" opacity="0.7" />
                <circle cx={x} cy="45" r="5" fill="#FF1493" opacity="0.7" />
                <circle cx={x} cy="50" r="2" fill="#FFD700" />
            </g>
        ))}
    </g>
);

const StarAccessory = () => (
    <g>
        <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '140px 70px' }}
        >
            <path
                d="M 140 65 L 142 72 L 149 72 L 143 77 L 145 84 L 140 79 L 135 84 L 137 77 L 131 72 L 138 72 Z"
                fill="#FFD700"
                stroke="#FFA500"
                strokeWidth="1"
            />
        </motion.g>
    </g>
);
