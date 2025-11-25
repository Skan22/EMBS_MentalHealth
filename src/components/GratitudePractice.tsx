import { useState } from 'react';
import { Modal, Button, Badge } from './ui';
import { useBloomStore } from '../store/useBloomStore';
import { GAME_CONFIG } from '../constants/gameConfig';
import { Heart, Trophy, Sparkles } from 'lucide-react';

interface GratitudePracticeProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GratitudePractice = ({ isOpen, onClose }: GratitudePracticeProps) => {
    const [gratitudes, setGratitudes] = useState(['', '', '']);
    const [submitted, setSubmitted] = useState(false);
    const { addSparkles, updateStats } = useBloomStore();

    const handleGratitudeChange = (index: number, value: string) => {
        const newGratitudes = [...gratitudes];
        newGratitudes[index] = value;
        setGratitudes(newGratitudes);
    };

    const canSubmit = gratitudes.every((g) => g.trim().length > 0);

    const handleSubmit = () => {
        if (!canSubmit) return;

        // Award sparkles and boost happiness
        addSparkles(GAME_CONFIG.REWARDS.GRATITUDE_JOURNAL);
        updateStats({ happiness: Math.min(100, 50 + GAME_CONFIG.STAT_BOOSTS.GRATITUDE_HAPPINESS) });

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setGratitudes(['', '', '']);
            onClose();
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Gratitude Practice" size="md">
            {!submitted ? (
                <>
                    <p className="text-gray-600 mb-6">
                        Write down 3 things you're grateful for today. Research shows this simple practice boosts happiness!
                    </p>

                    {/* Gratitude Inputs */}
                    <div className="space-y-4 mb-6">
                        {gratitudes.map((gratitude, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {index + 1}. I'm grateful for...
                                </label>
                                <input
                                    type="text"
                                    value={gratitude}
                                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                                    placeholder="Something you appreciate today"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-bloom-500 focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Tip */}
                    <div className="glass rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-600">
                            💡 <strong>Tip:</strong> Be specific! Instead of "my family," try "the way my sister made me laugh today."
                        </p>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3">
                        <Button variant="ghost" onClick={onClose} fullWidth>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            fullWidth
                        >
                            Save Gratitudes
                        </Button>
                    </div>
                </>
            ) : (
                <div className="text-center py-8">
                    <Trophy className="w-16 h-16 text-warm-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-2xl font-display font-bold text-gradient mb-2">
                        Beautiful!
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Your gratitudes have been saved
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Badge variant="warning">
                            <Sparkles className="w-3 h-3" />
                            +{GAME_CONFIG.REWARDS.GRATITUDE_JOURNAL} Sparkles
                        </Badge>
                        <Badge variant="success">
                            <Heart className="w-3 h-3" />
                            +{GAME_CONFIG.STAT_BOOSTS.GRATITUDE_HAPPINESS} Happiness
                        </Badge>
                    </div>
                </div>
            )}
        </Modal>
    );
};
