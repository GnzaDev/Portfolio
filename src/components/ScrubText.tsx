import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrubTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const ScrubText: React.FC<ScrubTextProps> = ({ 
  children, 
  className = '',
  as: Component = 'p' 
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Split text into words
      const split = new SplitText(el, { type: 'words' });
      
      gsap.fromTo(split.words, 
        {
          opacity: 0.1,
        },
        {
          opacity: 1,
          color: 'var(--text)',
          stagger: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Start lighting up when top of text hits 85% of viewport
            end: "bottom 50%", // Finish lighting up when bottom of text hits 50%
            scrub: 1, // Add 1s smoothing to the scrub
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Component ref={textRef} className={className}>
      {children}
    </Component>
  );
};
