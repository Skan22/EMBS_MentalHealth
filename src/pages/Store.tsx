import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Check, Lock } from 'lucide-react';
import { useBloomStore } from '../store/useBloomStore';
import { getItemsByCategory, type StoreItem } from '../data/storeItems';

interface StoreProps {
    onBack: () => void;
}

export const Store = ({ onBack }: StoreProps) => {
    const [selectedCategory, setSelectedCategory] = useState<'background' | 'accessory' | 'hair'>('background');
    const [purchaseAnimation, setPurchaseAnimation] = useState<string | null>(null);

    const {
        sparkles,
        purchasedItems,
        purchaseItem,
        stage,
        currentBackground,
        equippedAccessories,
        setBackground,
        equipAccessory,
        unequipAccessory,
    } = useBloomStore();

    const categories = [
        { id: 'background' as const, label: 'Backgrounds', emoji: '🖼️' },
        { id: 'accessory' as const, label: 'Accessories', emoji: '👑' },
    ];

    const items = getItemsByCategory(selectedCategory);

    const handlePurchase = (item: StoreItem) => {
        if (purchasedItems.includes(item.id)) return;

        if (item.unlockRequirement?.stage && item.unlockRequirement.stage !== stage) {
            return;
        }

        const success = purchaseItem(item.id, item.cost);
        if (success) {
            setPurchaseAnimation(item.id);
            setTimeout(() => setPurchaseAnimation(null), 1000);
        }
    };

    const isLocked = (item: StoreItem) => {
        if (item.unlockRequirement?.stage && item.unlockRequirement.stage !== stage) {
            return true;
        }
        return false;
    };

    return (
        <div className="min-h-screen pb-20">
            <header className="p-6 sticky top-0 bg-gradient-to-br from-sanctuary-50 via-bloom-50 to-nature-50 z-10">
                <div className="flex items-center justify-between">
                    <button onClick={onBack} className="p-2 hover:bg-white/50 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <h1 className="text-3xl font-display font-bold text-gradient">Sparkle Store</h1>

                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full sanctuary-shadow">
                        <Sparkles className="w-5 h-5 text-warm-500" />
                        <span className="font-display font-bold text-lg text-gray-800">{sparkles}</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${selectedCategory === cat.id
                                    ? 'bg-gradient-to-r from-bloom-500 to-sanctuary-500 text-white shadow-lg'
                                    : 'glass hover:bg-white/50'
                                }`}
                        >
                            <span className="mr-2">{cat.emoji}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            <section className="px-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            isPurchased={purchasedItems.includes(item.id)}
                            isLocked={isLocked(item)}
                            canAfford={sparkles >= item.cost}
                            onPurchase={() => handlePurchase(item)}
                            showAnimation={purchaseAnimation === item.id}
                            isActive={
                                item.category === 'background'
                                    ? currentBackground === item.id
                                    : equippedAccessories.includes(item.id)
                            }
                            onApply={() => {
                                if (item.category === 'background') {
                                    setBackground(item.id);
                                } else {
                                    if (equippedAccessories.includes(item.id)) {
                                        unequipAccessory(item.id);
                                    } else {
                                        equipAccessory(item.id);
                                    }
                                }
                            }}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

interface ItemCardProps {
    item: StoreItem;
    isPurchased: boolean;
    isLocked: boolean;
    canAfford: boolean;
    onPurchase: () => void;
    showAnimation: boolean;
    isActive: boolean;
    onApply: () => void;
}

const ItemCard = ({
    item,
    isPurchased,
    isLocked,
    canAfford,
    onPurchase,
    showAnimation,
    isActive,
    onApply,
}: ItemCardProps) => {
    return (
        <motion.div
            className={`glass rounded-2xl p-4 sanctuary-shadow relative overflow-hidden ${isLocked ? 'opacity-60' : ''}`}
            whileHover={!isLocked ? { scale: 1.05 } : {}}
        >
            <AnimatePresence>
                {showAnimation && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-warm-400 to-warm-600 flex items-center justify-center z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Sparkles className="w-12 h-12 text-white animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-center">
                <div className="text-5xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-semibold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>

                <div className="mt-4 space-y-2">
                    {isPurchased ? (
                        <>
                            <button
                                onClick={onApply}
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${isActive
                                        ? 'bg-gradient-to-r from-nature-500 to-nature-600 text-white'
                                        : 'bg-gradient-to-r from-bloom-500 to-sanctuary-500 text-white hover:shadow-lg'
                                    }`}
                            >
                                {isActive
                                    ? item.category === 'background'
                                        ? '✓ Applied'
                                        : '✓ Equipped'
                                    : item.category === 'background'
                                        ? 'Apply'
                                        : 'Equip'}
                            </button>

                            <div className="flex items-center justify-center gap-2 py-1 px-3 bg-nature-100 text-nature-700 rounded-lg text-xs">
                                <Check className="w-3 h-3" />
                                <span className="font-medium">Owned</span>
                            </div>
                        </>
                    ) : isLocked ? (
                        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-600 rounded-lg">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-medium">Locked</span>
                        </div>
                    ) : (
                        <button
                            onClick={onPurchase}
                            disabled={!canAfford}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${canAfford
                                    ? 'bg-gradient-to-r from-bloom-500 to-sanctuary-500 text-white hover:shadow-lg'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>{item.cost}</span>
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
