import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import { useBloomStore } from '../store/useBloomStore';

interface BreathingExerciseProps {
    isOpen: boolean;
    onClose: () => void;
}

type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const BreathingExercise = ({ isOpen, onClose }: BreathingExerciseProps) => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<BreathPhase>('inhale');
    const [cyclesCompleted, setCyclesCompleted] = useState(0);
    const { addSparkles, updateStats } = useBloomStore();

    const phaseDurations = {
        inhale: 4000,
        hold1: 4000,
        exhale: 4000,
        hold2: 4000,
    };

    const phaseLabels = {
        inhale: 'Breathe In',
        hold1: 'Hold',
        exhale: 'Breathe Out',
        hold2: 'Hold',
    };

    useEffect(() => {
        if (!isActive) return;

        const timer = setTimeout(() => {
            const phases: BreathPhase[] = ['inhale', 'hold1', 'exhale', 'hold2'];
            const currentIndex = phases.indexOf(phase);
            const nextIndex = (currentIndex + 1) % phases.length;
            const nextPhase = phases[nextIndex];

            setPhase(nextPhase);

            // Complete a cycle after exhale
            if (nextPhase === 'inhale' && currentIndex === 3) {
                setCyclesCompleted((prev) => prev + 1);
            }
        }, phaseDurations[phase]);

        return () => clearTimeout(timer);
    }, [isActive, phase]);

    const handleComplete = () => {
        // Award based on cycles completed
        const sparklesEarned = cyclesCompleted * 5;
        addSparkles(sparklesEarned);
        updateStats({ energy: Math.min(100, 50 + cyclesCompleted * 5) });

        setIsActive(false);
        setCyclesCompleted(0);
        setPhase('inhale');
        onClose();
    };

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                className="glass rounded-3xl p-8 max-w-md w-full sanctuary-shadow"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-display font-bold text-gradient">
                        Box Breathing
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Breathing Circle */}
                <div className="flex items-center justify-center mb-8">
                    <div className="relative w-64 h-64">
                        {/* Outer Circle */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-sanctuary-300 to-bloom-300"
                            animate={{
                                scale: phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1,
                            }}
                            transition={{
                                duration: phaseDurations[phase] / 1000,
                                ease: 'easeInOut',
                            }}
                        />

                        {/* Inner Circle */}
                        <div className="absolute inset-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-3xl font-display font-bold text-gray-800">
                                    {phaseLabels[phase]}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    {Math.ceil(phaseDurations[phase] / 1000)}s
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Cycles Completed</p>
                        <p className="text-3xl font-display font-bold text-gradient">
                            {cyclesCompleted}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={toggleActive}
                            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-bloom-500 to-sanctuary-500 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            {isActive ? (
                                <>
                                    <Pause className="w-5 h-5" />
                                    Pause
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    Start
                                </>
                            )}
                        </button>

                        {cyclesCompleted > 0 && (
                            <button
                                onClick={handleComplete}
                                className="py-3 px-6 rounded-xl bg-nature-500 text-white font-medium hover:shadow-lg transition-all"
                            >
                                Complete
                            </button>
                        )}
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 p-4 bg-sanctuary-50 rounded-xl">
                    <p className="text-sm text-gray-700 text-center">
                        Follow the circle's rhythm. Breathe in for 4, hold for 4, breathe out for 4, hold for 4.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
