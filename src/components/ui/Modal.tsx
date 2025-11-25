import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ModalProps } from '../../types/ui.types';
import { cn } from '../../lib/utils';
import { ANIMATIONS } from '../../constants/animations';

const sizeVariants = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
};

export const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'md',
    showCloseButton = true,
}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        className={cn(
                            'glass rounded-3xl p-8 w-full sanctuary-shadow',
                            sizeVariants[size]
                        )}
                        {...ANIMATIONS.MODAL}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between mb-6">
                                {title && (
                                    <h2 className="text-2xl font-display font-bold text-gradient">
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-white/50 rounded-full transition-colors ml-auto"
                                        aria-label="Close modal"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
