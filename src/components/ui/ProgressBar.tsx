import { motion } from 'framer-motion';
import type { ProgressBarProps } from '../../types/ui.types';
import { cn } from '../../lib/utils';

export const ProgressBar = ({
    value,
    max = 100,
    color = 'from-bloom-500 to-sanctuary-500',
    label,
    showPercentage = true,
    animated = true,
}: ProgressBarProps) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                    {showPercentage && (
                        <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
                    )}
                </div>
            )}
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className={cn('absolute inset-y-0 left-0 bg-gradient-to-r', color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: animated ? 1 : 0, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};
