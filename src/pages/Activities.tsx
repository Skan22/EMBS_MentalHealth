import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Brain, Smile, Heart, BookHeart } from 'lucide-react';
import { BreathingExercise } from '../components/BreathingExercise';
import { MemoryGame } from '../components/quests/MemoryGame';
import { MoodJournal } from '../components/MoodJournal';
import { GratitudePractice } from '../components/GratitudePractice';
import { CheckInQuest } from '../components/CheckInQuest';
import { useBloomStore } from '../store/useBloomStore';

export const Activities = () => {
    const [showBreathing, setShowBreathing] = useState(false);
    const [showMemoryGame, setShowMemoryGame] = useState(false);
    const [showMoodJournal, setShowMoodJournal] = useState(false);
    const [showGratitude, setShowGratitude] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);

    const { lastCheckIn } = useBloomStore();

    const canCheckIn = () => {
        if (!lastCheckIn) return true;
        const lastCheckInDate = new Date(lastCheckIn).toDateString();
        const today = new Date().toDateString();
        return lastCheckInDate !== today;
    };

    const activities = [
        {
            id: 'checkin',
            title: 'Daily Check-in',
            description: 'Track your emotional well-being',
            icon: BookHeart,
            color: 'from-bloom-400 to-bloom-600',
            onClick: () => setShowCheckIn(true),
            category: 'Daily',
            disabled: !canCheckIn(),
            badge: canCheckIn() ? 'Available' : 'Completed',
        },
        {
            id: 'mood',
            title: 'Mood Journal',
            description: 'Log how you feel right now',
            icon: Smile,
            color: 'from-nature-400 to-nature-600',
            onClick: () => setShowMoodJournal(true),
            category: 'Daily',
        },
        {
            id: 'gratitude',
            title: 'Gratitude Practice',
            description: 'Write 3 things you\'re grateful for',
            icon: Heart,
            color: 'from-warm-400 to-warm-600',
            onClick: () => setShowGratitude(true),
            category: 'Daily',
        },
        {
            id: 'breathing',
            title: 'Box Breathing',
            description: 'Calm your mind with guided breathing',
            icon: Wind,
            color: 'from-sanctuary-400 to-sanctuary-600',
            onClick: () => setShowBreathing(true),
            category: 'Relax',
        },
        {
            id: 'memory',
            title: 'Memory Match',
            description: 'Train your focus and earn sparkles',
            icon: Brain,
            color: 'from-bloom-400 to-bloom-600',
            onClick: () => setShowMemoryGame(true),
            category: 'Focus',
        },
    ];

    const categories = ['All', 'Daily', 'Relax', 'Focus'];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredActivities = activeCategory === 'All'
        ? activities
        : activities.filter(a => a.category === activeCategory);

    return (
        <div className="min-h-screen pt-8 pb-24 px-6 bg-gradient-to-br from-sanctuary-50 via-bloom-50 to-nature-50">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-gradient">
                    Activities
                </h1>
                <p className="text-gray-600 mt-1">
                    Nourish your mind and spirit
                </p>
            </header>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === category
                                ? 'bg-bloom-500 text-white shadow-lg shadow-bloom-200'
                                : 'bg-white/50 text-gray-600 hover:bg-white'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Activities Grid */}
            <div className="grid gap-4">
                {filteredActivities.map((activity) => (
                    <ActivityCard key={activity.id} {...activity} />
                ))}
            </div>

            {/* Modals */}
            <CheckInQuest isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} />
            <BreathingExercise isOpen={showBreathing} onClose={() => setShowBreathing(false)} />
            <MemoryGame isOpen={showMemoryGame} onClose={() => setShowMemoryGame(false)} />
            <MoodJournal isOpen={showMoodJournal} onClose={() => setShowMoodJournal(false)} />
            <GratitudePractice isOpen={showGratitude} onClose={() => setShowGratitude(false)} />
        </div>
    );
};

interface ActivityCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    onClick: () => void;
    disabled?: boolean;
    badge?: string;
    category: string;
}

const ActivityCard = ({
    title,
    description,
    icon: Icon,
    color,
    onClick,
    disabled = false,
    badge,
    category,
}: ActivityCardProps) => {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`glass rounded-2xl p-6 sanctuary-shadow text-left transition-all group ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'
                }`}
            whileHover={disabled ? {} : { scale: 1.02 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-md group-hover:shadow-lg transition-all`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {category}
                        </span>
                        {badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${badge === 'Available' ? 'bg-nature-100 text-nature-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {badge}
                            </span>
                        )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-gray-800 mb-1">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </motion.button>
    );
};
