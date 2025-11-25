import { useState } from 'react';
import { Modal, Button, Badge } from './ui';
import { useBloomStore } from '../store/useBloomStore';
import { GAME_CONFIG } from '../constants/gameConfig';
import { Smile, Meh, Frown, Heart, Trophy } from 'lucide-react';

interface MoodJournalProps {
    isOpen: boolean;
    onClose: () => void;
}

const moods = [
    { value: 5, label: 'Amazing', emoji: '😄', icon: Smile, color: 'text-green-500' },
    { value: 4, label: 'Good', emoji: '😊', icon: Smile, color: 'text-blue-500' },
    { value: 3, label: 'Okay', emoji: '😐', icon: Meh, color: 'text-yellow-500' },
    { value: 2, label: 'Not Great', emoji: '😕', icon: Frown, color: 'text-orange-500' },
    { value: 1, label: 'Difficult', emoji: '😢', icon: Frown, color: 'text-red-500' },
];

export const MoodJournal = ({ isOpen, onClose }: MoodJournalProps) => {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [note, setNote] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { addSparkles, updateStats } = useBloomStore();

    const handleSubmit = () => {
        if (selectedMood === null) return;

        // Award sparkles and boost wisdom
        addSparkles(GAME_CONFIG.REWARDS.MOOD_JOURNAL);
        updateStats({ wisdom: Math.min(100, 50 + GAME_CONFIG.STAT_BOOSTS.MOOD_JOURNAL_WISDOM) });

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setSelectedMood(null);
            setNote('');
            onClose();
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Mood Journal" size="md">
            {!submitted ? (
                <>
                    <p className="text-gray-600 mb-6">
                        How are you feeling today? Track your mood to understand your emotional patterns.
                    </p>

                    {/* Mood Selection */}
                    <div className="grid grid-cols-5 gap-3 mb-6">
                        {moods.map((mood) => (
                            <button
                                key={mood.value}
                                onClick={() => setSelectedMood(mood.value)}
                                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${selectedMood === mood.value
                                        ? 'border-bloom-500 bg-bloom-50 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <span className="text-4xl mb-2">{mood.emoji}</span>
                                <span className="text-xs font-medium text-gray-700">{mood.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Optional Note */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes (Optional)
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="What's on your mind? (This stays private)"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-bloom-500 focus:outline-none resize-none"
                            rows={4}
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3">
                        <Button variant="ghost" onClick={onClose} fullWidth>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={selectedMood === null}
                            fullWidth
                        >
                            Save Entry
                        </Button>
                    </div>
                </>
            ) : (
                <div className="text-center py-8">
                    <Trophy className="w-16 h-16 text-warm-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold text-gradient mb-2">
                        Entry Saved!
                    </h3>
                    <p className="text-gray-600 mb-4">
                        +{GAME_CONFIG.REWARDS.MOOD_JOURNAL} Sparkles earned!
                    </p>
                    <Badge variant="success">
                        <Heart className="w-3 h-3" />
                        +{GAME_CONFIG.STAT_BOOSTS.MOOD_JOURNAL_WISDOM} Wisdom
                    </Badge>
                </div>
            )}
        </Modal>
    );
};
