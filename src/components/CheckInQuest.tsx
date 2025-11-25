import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { useBloomStore } from '../store/useBloomStore';
import { phq9Questions, gad7Questions, responseOptions, calculateImpact } from '../data/checkInQuestions';

interface CheckInQuestProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CheckInQuest = ({ isOpen, onClose }: CheckInQuestProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState<Record<string, number>>({});
    const { updateStats, addCheckIn, addSparkles } = useBloomStore();

    const allQuestions = [...phq9Questions, ...gad7Questions];
    const totalQuestions = allQuestions.length;

    const handleResponse = (value: number) => {
        const question = allQuestions[currentQuestion];
        const newResponses = { ...responses, [question.id]: value };
        setResponses(newResponses);

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Complete the quest
            completeQuest(newResponses);
        }
    };

    const completeQuest = (finalResponses: Record<string, number>) => {
        const impact = calculateImpact(finalResponses);
        const totalScore = Object.values(finalResponses).reduce((a, b) => a + b, 0);

        // Update Bloom stats
        updateStats(impact);

        // Award sparkles
        const sparklesEarned = Math.floor(totalScore / 2) + 10;
        addSparkles(sparklesEarned);

        // Save check-in
        addCheckIn({
            date: new Date().toISOString(),
            responses: finalResponses,
            score: totalScore,
        });

        // Reset and close
        setTimeout(() => {
            setCurrentQuestion(0);
            setResponses({});
            onClose();
        }, 2000);
    };

    const question = allQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="glass rounded-3xl p-8 max-w-lg w-full sanctuary-shadow"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-display font-bold text-gradient">
                                Daily Quest
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-bloom-500 to-sanctuary-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-xl font-display font-semibold text-gray-800 mb-6">
                                    {question.gamified}
                                </h3>

                                {/* Response Options */}
                                <div className="space-y-3">
                                    {responseOptions.map((option) => (
                                        <motion.button
                                            key={option.value}
                                            onClick={() => handleResponse(option.value)}
                                            className={`w-full p-4 rounded-xl border-2 border-${option.color}-200 bg-${option.color}-50/50 hover:bg-${option.color}-100 transition-all text-left flex items-center justify-between group`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{option.emoji}</span>
                                                <span className="font-medium text-gray-800">{option.label}</span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Completion Message */}
                        {currentQuestion === totalQuestions - 1 && Object.keys(responses).length === totalQuestions && (
                            <motion.div
                                className="mt-6 p-4 bg-nature-100 rounded-xl text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <p className="text-lg font-display font-semibold text-nature-700">
                                    Quest Complete! ✨
                                </p>
                                <p className="text-sm text-nature-600 mt-1">
                                    Your Bloom is growing stronger!
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
