
import { useBloomStore } from '../store/useBloomStore';
import { Sparkles, Heart, Brain, Zap } from 'lucide-react';
import { Avatar } from './Avatar';
import { ProgressBar } from './ui/ProgressBar';

export const BloomPet = () => {
    const { stage, track, health, happiness, wisdom, energy } = useBloomStore();

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            {/* Avatar Visual */}
            <div className="w-64 h-64 relative">
                <Avatar />
            </div>

            {/* Stage & Track Info */}
            <div className="text-center">
                <h2 className="text-2xl font-display font-bold text-gradient capitalize">
                    {stage} {track}
                </h2>
                <p className="text-sm text-gray-600 mt-1">Your companion is growing!</p>
            </div>

            {/* Stats Display */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <StatItem
                    icon={Heart}
                    label="Health"
                    value={health}
                    color="from-red-400 to-red-600"
                    iconColor="text-red-500"
                />
                <StatItem
                    icon={Sparkles}
                    label="Joy"
                    value={happiness}
                    color="from-yellow-400 to-yellow-600"
                    iconColor="text-yellow-500"
                />
                <StatItem
                    icon={Brain}
                    label="Wisdom"
                    value={wisdom}
                    color="from-purple-400 to-purple-600"
                    iconColor="text-purple-500"
                />
                <StatItem
                    icon={Zap}
                    label="Energy"
                    value={energy}
                    color="from-blue-400 to-blue-600"
                    iconColor="text-blue-500"
                />
            </div>
        </div>
    );
};

interface StatItemProps {
    icon: React.ElementType;
    label: string;
    value: number;
    color: string;
    iconColor: string;
}

const StatItem = ({ icon: Icon, label, value, color, iconColor }: StatItemProps) => {
    return (
        <div className="glass rounded-2xl p-4 sanctuary-shadow">
            <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${iconColor}`} />
                <span className="text-xs font-medium text-gray-700">{label}</span>
            </div>
            <ProgressBar
                value={value}
                color={color}
                showPercentage={true}
                animated={true}
            />
        </div>
    );
};
