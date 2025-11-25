import { motion } from 'framer-motion';
import type { CardProps } from '../../types/ui.types';
import { cn } from '../../lib/utils';

const paddingVariants = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export const Card = ({
    children,
    className,
    onClick,
    hoverable = false,
    padding = 'md',
}: CardProps) => {
    const Component = onClick ? motion.button : motion.div;

    return (
        <Component
            onClick={onClick}
            className={cn(
                'glass rounded-2xl sanctuary-shadow',
                paddingVariants[padding],
                onClick && 'text-left transition-all cursor-pointer',
                className
            )}
            whileHover={hoverable || onClick ? { scale: 1.02 } : {}}
            whileTap={onClick ? { scale: 0.98 } : {}}
        >
            {children}
        </Component>
    );
};
