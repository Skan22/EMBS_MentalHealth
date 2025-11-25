import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookHeart, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BloomPet } from '../components/BloomPet';
import { CheckInQuest } from '../components/CheckInQuest';
import { AvatarCustomizer } from '../components/AvatarCustomizer';
import { useBloomStore } from '../store/useBloomStore';

export const Sanctuary = () => {
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
    const { sparkles, lastCheckIn, currentBackground } = useBloomStore();
    const navigate = useNavigate();

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

    return (
        <div className={`min-h-screen pb-24 transition-all duration-500 relative overflow-hidden ${getBackgroundStyle()}`}>
            <BackgroundEffects background={currentBackground} />

            {/* Header */}
            <header className="relative z-10 p-6 pt-8">
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
            <section className="relative z-10 px-6 mb-8">
                <div className="glass rounded-3xl sanctuary-shadow relative overflow-hidden">
                    <BloomPet />
                </div>
            </section>

            {/* Daily Quest Card */}
            <section className="relative z-10 px-6">
                <h2 className={`text-xl font-display font-bold mb-4 ${currentBackground === 'bg-space' ? 'text-white' : 'text-gray-800'}`}>
                    Daily Quest
                </h2>

                <motion.button
                    onClick={() => setShowCheckIn(true)}
                    disabled={!canCheckIn()}
                    className={`w-full glass rounded-2xl p-6 sanctuary-shadow text-left transition-all relative overflow-hidden group ${!canCheckIn() ? 'opacity-80' : 'hover:shadow-xl'
                        }`}
                    whileHover={canCheckIn() ? { scale: 1.02 } : {}}
                    whileTap={canCheckIn() ? { scale: 0.98 } : {}}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookHeart className="w-24 h-24 text-bloom-500" />
                    </div>

                    <div className="relative z-10 flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-bloom-400 to-bloom-600 shadow-lg">
                            <BookHeart className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-bold text-lg text-gray-800">
                                    Daily Check-in
                                </h3>
                                {canCheckIn() ? (
                                    <span className="text-xs px-2 py-1 rounded-full bg-nature-100 text-nature-700 font-medium">
                                        Available
                                    </span>
                                ) : (
                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                                        Completed
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                {canCheckIn()
                                    ? "Take a moment to reflect on how you're feeling today."
                                    : "Great job checking in! Come back tomorrow."}
                            </p>
                        </div>
                    </div>
                </motion.button>

                {/* Quick Link to Activities */}
                <motion.button
                    onClick={() => navigate('/activities')}
                    className="w-full mt-4 glass rounded-2xl p-4 flex items-center justify-between group hover:bg-white/60 transition-all"
                    whileHover={{ x: 4 }}
                >
                    <span className="font-medium text-gray-700">Explore more activities</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-bloom-500 transition-colors" />
                </motion.button>
            </section>

            {/* Modals */}
            <CheckInQuest isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} />
            <AvatarCustomizer isOpen={showAvatarCustomizer} onClose={() => setShowAvatarCustomizer(false)} />
        </div>
    );
};

const BackgroundEffects = ({ background }: { background: string }) => {
    switch (background) {
        case 'bg-space':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 3 + 1,
                                height: Math.random() * 3 + 1,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.2, 1, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            );
        case 'bg-forest':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-200 rounded-full blur-sm opacity-60"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, 10, 0],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                </div>
            );
        case 'bg-beach':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-10 right-10 w-20 h-20 bg-yellow-100 rounded-full blur-xl opacity-40"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </div>
            );
        default:
            return null;
    }
};
