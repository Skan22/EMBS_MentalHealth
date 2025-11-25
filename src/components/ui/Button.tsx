import { motion } from 'framer-motion';
import type { ButtonProps } from '../../types/ui.types';
import { cn } from '../../lib/utils';

const variants = {
    primary: 'bg-gradient-to-r from-bloom-500 to-sanctuary-500 text-white hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-sanctuary-400 to-sanctuary-600 text-white hover:shadow-lg',
    success: 'bg-gradient-to-r from-nature-500 to-nature-600 text-white hover:shadow-lg',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg',
    ghost: 'glass hover:bg-white/50',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export const Button = ({
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
    children,
    className,
    type = 'button',
}: ButtonProps) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(
                'rounded-lg font-medium transition-all flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                (disabled || loading) && 'opacity-50 cursor-not-allowed',
                className
            )}
            whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                </>
            ) : (
                children
            )}
        </motion.button>
    );
};
