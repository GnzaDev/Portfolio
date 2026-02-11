import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInViewProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

export const FadeInView = ({ children, delay = 0, direction = 'up', className = '' }: FadeInViewProps) => {
    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directionOffset[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.4, 0.25, 1], // Smooth cubic-bezier
                type: "spring",
                stiffness: 50
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
