import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const btn = ref.current;
      if (!btn) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      const handleMouse = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

        gsap.to(btn, {
          x, y,
          duration: 0.4,
          ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
          overwrite: 'auto',
        });
      };

      const reset = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
        });
      };

      btn.addEventListener('mousemove', handleMouse);
      btn.addEventListener('mouseleave', reset);

      return () => {
        btn.removeEventListener('mousemove', handleMouse);
        btn.removeEventListener('mouseleave', reset);
      };
    }, []);

    return (
        <button ref={ref} className={className} onClick={onClick} type="button">
            {children}
        </button>
    );
};