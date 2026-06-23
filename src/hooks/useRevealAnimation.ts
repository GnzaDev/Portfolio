import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const IOS_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

interface RevealOptions {
  delay?: number;
  stagger?: number;
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: boolean;
}

export function useRevealAnimation<T extends HTMLElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, scale: 1, y: 0, x: 0 });
      return;
    }

    const {
      delay = 0,
      stagger = 0,
      from = 'up',
      distance = 14,
      scale = true,
    } = options;

    const items = el.querySelectorAll<HTMLElement>('.reveal-item');
    const targets = items.length > 0 ? items : el;

    const fromVars: gsap.TweenVars = {};
    if (from === 'up') fromVars.y = distance;
    if (from === 'down') fromVars.y = -distance;
    if (from === 'left') fromVars.x = distance;
    if (from === 'right') fromVars.x = -distance;
    if (scale) fromVars.scale = 0.98;

    gsap.fromTo(
      targets,
      { opacity: 0, ...fromVars },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.5,
        delay,
        stagger: stagger || undefined,
        ease: IOS_EASE,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el || el.contains(st.trigger as Node)) {
          st.kill();
        }
      });
    };
  }, [options.delay, options.stagger, options.from, options.distance, options.scale]);

  return ref;
}