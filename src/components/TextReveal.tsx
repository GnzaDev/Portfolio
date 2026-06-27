import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  scrub?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  as: Tag = 'div',
  type = 'lines',
  stagger = 0.1,
  duration = 0.8,
  delay = 0,
  scrub = false,
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(el, {
        type: type,
        linesClass: 'text-reveal-line',
      });

      // Wrap each element for mask effect
      const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

      if (targets) {
        targets.forEach((target: HTMLElement) => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          wrapper.style.display = type === 'lines' ? 'block' : 'inline-block';
          target.parentNode?.insertBefore(wrapper, target);
          wrapper.appendChild(target);
        });

        const scrollTriggerConfig = scrub
          ? {
              trigger: el,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
            }
          : {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none' as const,
            };

        gsap.from(targets, {
          y: '100%',
          opacity: 0,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: scrollTriggerConfig,
        });
      }
    });

    return () => ctx.revert();
  }, [children, type, stagger, duration, delay, scrub]);

  return React.createElement(Tag, {
    ref: textRef,
    className: className,
  }, children);
};
