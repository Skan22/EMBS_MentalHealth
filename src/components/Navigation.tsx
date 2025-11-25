import { NavLink } from 'react-router-dom';
import { Home, Sparkles, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navigation = () => {
    const navItems = [
        { path: '/', icon: Home, label: 'Sanctuary' },
        { path: '/activities', icon: Sparkles, label: 'Activities' },
        { path: '/store', icon: ShoppingBag, label: 'Store' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 p-4 z-40 pointer-events-none">
            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-white/20 p-2 pointer-events-auto flex justify-around items-center">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `relative p-3 rounded-full transition-all duration-300 ${isActive ? 'text-bloom-600' : 'text-gray-400 hover:text-bloom-400'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className="relative z-10">
                                    <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-bloom-100 rounded-full"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="sr-only">{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};
