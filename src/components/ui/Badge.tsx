import type { BadgeProps } from '../../types/ui.types';
import { cn } from '../../lib/utils';

const variants = {
    success: 'bg-nature-100 text-nature-700',
    warning: 'bg-warm-100 text-warm-700',
    info: 'bg-sanctuary-100 text-sanctuary-700',
    default: 'bg-gray-100 text-gray-600',
};

const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2 py-1',
};

export const Badge = ({
    variant = 'default',
    children,
    size = 'md',
}: BadgeProps) => {
    return (
        <span
            className={cn(
                'rounded-full font-medium inline-flex items-center gap-1',
                variants[variant],
                sizes[size]
            )}
        >
            {children}
        </span>
    );
};
