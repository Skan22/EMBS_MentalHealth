import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wind, BookHeart, ShoppingBag, Brain, Smile, Heart, User } from 'lucide-react';
import { BloomPet } from '../components/BloomPet';
import { CheckInQuest } from '../components/CheckInQuest';
import { BreathingExercise } from '../components/BreathingExercise';
import { MemoryGame } from '../components/quests/MemoryGame';
import { MoodJournal } from '../components/MoodJournal';
import { GratitudePractice } from '../components/GratitudePractice';
import { AvatarCustomizer } from '../components/AvatarCustomizer';
import { Store } from './Store';
import { useBloomStore } from '../store/useBloomStore';

export const Sanctuary = () => {
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showBreathing, setShowBreathing] = useState(false);
    const [showMemoryGame, setShowMemoryGame] = useState(false);
    const [showMoodJournal, setShowMoodJournal] = useState(false);
    const [showGratitude, setShowGratitude] = useState(false);
    const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
    const [showStore, setShowStore] = useState(false);
    const { sparkles, lastCheckIn, currentBackground } = useBloomStore();

    if (showStore) {
        return <Store onBack={() => setShowStore(false)} />;
    }

    const getBackgroundStyle = () => {
        switch (currentBackground) {
            case 'bg-forest':
                return 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100';
            case 'bg-beach':
                return 'bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100';
            case 'bg-space':
                return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white';
            case 'bg-cozy':
                return 'bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100';
            case 'bg-garden':
                return 'bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100';
            case 'bg-mountain':
                return 'bg-gradient-to-br from-slate-200 via-gray-100 to-stone-200';
            default:
                return 'bg-gradient-to-br from-sanctuary-50 via-bloom-50 to-nature-50';
        }
    };

    const canCheckIn = () => {
        if (!lastCheckIn) return true;
        const lastCheckInDate = new Date(lastCheckIn).toDateString();
        const today = new Date().toDateString();
        return lastCheckInDate !== today;
    };

    const activities = [
        {
            id: 'checkin',
            title: 'Daily Quest',
            description: 'Check in with your feelings',
            icon: BookHeart,
            color: 'from-bloom-400 to-bloom-600',
            onClick: () => setShowCheckIn(true),
            disabled: !canCheckIn(),
            badge: canCheckIn() ? 'Available' : 'Completed',
        },
        {
            id: 'breathing',
            title: 'Box Breathing',
            description: 'Calm your mind',
            icon: Wind,
            color: 'from-sanctuary-400 to-sanctuary-600',
            onClick: () => setShowBreathing(true),
            disabled: false,
        },
        {
            id: 'memory',
            title: 'Memory Match',
            description: 'Match emotions and earn sparkles',
            icon: Brain,
            color: 'from-bloom-400 to-bloom-600',
            onClick: () => setShowMemoryGame(true),
            disabled: false,
        },
        {
            id: 'mood',
            title: 'Mood Journal',
            description: 'Track how you feel',
            icon: Smile,
            color: 'from-nature-400 to-nature-600',
            onClick: () => setShowMoodJournal(true),
            disabled: false,
        },
        {
            id: 'gratitude',
            title: 'Gratitude Practice',
            description: 'Write 3 things you are grateful for',
            icon: Heart,
            color: 'from-warm-400 to-warm-600',
            onClick: () => setShowGratitude(true),
            disabled: false,
        },
    ];

    return (
        <div className={`min-h-screen pb-20 transition-all duration-500 ${getBackgroundStyle()}`}>
            {/* Header */}
            <header className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gradient">
                            Your Sanctuary
                        </h1>
                        <p className={`text-sm mt-1 ${currentBackground === 'bg-space' ? 'text-gray-300' : 'text-gray-600'}`}>
                            Welcome back, friend
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowAvatarCustomizer(true)}
                            className="glass px-4 py-2 rounded-full sanctuary-shadow hover:shadow-lg transition-all flex items-center gap-2"
                            title="Customize Avatar"
                        >
                            <User className="w-5 h-5 text-bloom-500" />
                        </button>

                        <button
                            onClick={() => setShowStore(true)}
                            className="glass px-4 py-2 rounded-full sanctuary-shadow hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            <ShoppingBag className="w-5 h-5 text-bloom-500" />
                        </button>

                        <div className="flex items-center gap-2 glass px-4 py-2 rounded-full sanctuary-shadow">
                            <Sparkles className="w-5 h-5 text-warm-500" />
                            <span className="font-display font-bold text-lg text-gray-800">
                                {sparkles}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Bloom Pet */}
            <section className="px-6">
                <div className="glass rounded-3xl sanctuary-shadow">
                    <BloomPet />
                </div>
            </section>

            {/* Activities */}
            <section className="px-6 mt-8">
                <h2 className={`text-xl font-display font-bold mb-4 ${currentBackground === 'bg-space' ? 'text-white' : 'text-gray-800'}`}>
                    Activities
                </h2>

                <div className="grid gap-4">
                    {activities.map((activity) => (
                        <ActivityCard key={activity.id} {...activity} />
                    ))}
                </div>
            </section>

            {/* Modals */}
            <CheckInQuest isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} />
            <BreathingExercise isOpen={showBreathing} onClose={() => setShowBreathing(false)} />
            <MemoryGame isOpen={showMemoryGame} onClose={() => setShowMemoryGame(false)} />
            <MoodJournal isOpen={showMoodJournal} onClose={() => setShowMoodJournal(false)} />
            <GratitudePractice isOpen={showGratitude} onClose={() => setShowGratitude(false)} />
            <AvatarCustomizer isOpen={showAvatarCustomizer} onClose={() => setShowAvatarCustomizer(false)} />
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
}

const ActivityCard = ({
    title,
    description,
    icon: Icon,
    color,
    onClick,
    disabled = false,
    badge,
}: ActivityCardProps) => {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`glass rounded-2xl p-6 sanctuary-shadow text-left transition-all ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
            whileHover={disabled ? {} : { scale: 1.02 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-lg text-gray-800">
                            {title}
                        </h3>
                        {badge && (
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${badge === 'Available'
                                        ? 'bg-nature-100 text-nature-700'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {badge}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
            </div>
        </motion.button>
    );
};
