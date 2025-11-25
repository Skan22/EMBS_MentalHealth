import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { useBloomStore } from '../../store/useBloomStore';

interface MemoryGameProps {
    isOpen: boolean;
    onClose: () => void;
}

type Card = {
    id: number;
    emoji: string;
    label: string;
    isFlipped: boolean;
    isMatched: boolean;
};

const cardPairs = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '🤗', label: 'Loved' },
    { emoji: '💪', label: 'Strong' },
    { emoji: '🌟', label: 'Confident' },
    { emoji: '🎯', label: 'Focused' },
];

export const MemoryGame = ({ isOpen, onClose }: MemoryGameProps) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const { addSparkles, updateStats } = useBloomStore();

    useEffect(() => {
        if (isOpen) {
            initializeGame();
        }
    }, [isOpen]);

    const initializeGame = () => {
        const shuffled = [...cardPairs, ...cardPairs]
            .map((card, index) => ({
                id: index,
                emoji: card.emoji,
                label: card.label,
                isFlipped: false,
                isMatched: false,
            }))
            .sort(() => Math.random() - 0.5);

        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setIsComplete(false);
    };

    const handleCardClick = (index: number) => {
        if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
            return;
        }

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            checkMatch(newFlipped[0], newFlipped[1]);
        }
    };

    const checkMatch = (index1: number, index2: number) => {
        setTimeout(() => {
            const newCards = [...cards];

            if (newCards[index1].emoji === newCards[index2].emoji) {
                newCards[index1].isMatched = true;
                newCards[index2].isMatched = true;
                setMatches(matches + 1);

                if (matches + 1 === cardPairs.length) {
                    handleComplete();
                }
            } else {
                newCards[index1].isFlipped = false;
                newCards[index2].isFlipped = false;
            }

            setCards(newCards);
            setFlippedCards([]);
        }, 1000);
    };

    const handleComplete = () => {
        setIsComplete(true);
        const sparklesEarned = Math.max(20, 50 - moves);
        addSparkles(sparklesEarned);
        updateStats({ wisdom: Math.min(100, 50 + matches * 5) });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                className="glass rounded-3xl p-8 max-w-2xl w-full sanctuary-shadow"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-gradient">
                        Memory Match
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-4 mb-6">
                    <div className="glass px-4 py-2 rounded-xl">
                        <span className="text-sm text-gray-600">Moves:</span>
                        <span className="ml-2 font-bold text-gray-800">{moves}</span>
                    </div>
                    <div className="glass px-4 py-2 rounded-xl">
                        <span className="text-sm text-gray-600">Matches:</span>
                        <span className="ml-2 font-bold text-gray-800">{matches}/{cardPairs.length}</span>
                    </div>
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {cards.map((card, index) => (
                        <motion.button
                            key={card.id}
                            onClick={() => handleCardClick(index)}
                            className={`aspect-square rounded-xl flex items-center justify-center text-4xl transition-all ${card.isFlipped || card.isMatched
                                ? 'bg-gradient-to-br from-bloom-300 to-sanctuary-300'
                                : 'bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400'
                                }`}
                            whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                            whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                            disabled={card.isMatched}
                        >
                            <AnimatePresence mode="wait">
                                {(card.isFlipped || card.isMatched) ? (
                                    <motion.div
                                        key="front"
                                        initial={{ rotateY: 90 }}
                                        animate={{ rotateY: 0 }}
                                        exit={{ rotateY: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {card.emoji}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="back"
                                        initial={{ rotateY: 90 }}
                                        animate={{ rotateY: 0 }}
                                        exit={{ rotateY: 90 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-2xl"
                                    >
                                        ❓
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    ))}
                </div>

                {/* Completion Message */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            className="p-6 bg-gradient-to-r from-nature-100 to-bloom-100 rounded-2xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Trophy className="w-12 h-12 text-warm-500 mx-auto mb-3" />
                            <h3 className="text-2xl font-display font-bold text-gradient mb-2">
                                Perfect Match!
                            </h3>
                            <p className="text-gray-700">
                                You completed the game in {moves} moves!
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                +{Math.max(20, 50 - moves)} Sparkles earned!
                            </p>
                            <button
                                onClick={initializeGame}
                                className="mt-4 px-6 py-2 bg-gradient-to-r from-bloom-500 to-sanctuary-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                            >
                                Play Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isComplete && (
                    <p className="text-center text-sm text-gray-600">
                        Match all the emotion pairs to earn sparkles!
                    </p>
                )}
            </motion.div>
        </div>
    );
};
