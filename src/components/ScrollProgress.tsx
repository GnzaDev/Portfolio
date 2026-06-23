import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ScrollProgress = () => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const bar = barRef.current;
      if (!bar) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

      const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        gsap.to(bar, {
          scaleX: progress,
          duration: 0.1,
          ease: 'none',
          overwrite: 'auto',
        });
      };

      window.addEventListener('scroll', update, { passive: true });
      return () => window.removeEventListener('scroll', update);
    }, []);

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 to-gray-900 origin-left z-[100]"
        />
    );
};