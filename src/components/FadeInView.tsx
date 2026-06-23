import { ReactNode } from 'react';
import { useRevealAnimation } from '../hooks/useRevealAnimation';

interface FadeInViewProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

export const FadeInView = ({ children, delay = 0, className = '' }: FadeInViewProps) => {
    const ref = useRevealAnimation<HTMLDivElement>({ delay, from: 'up', distance: 14 });

    return (
        <div ref={ref} className={className}>
            <div className="reveal-item">
                {children}
            </div>
        </div>
    );
};