import React, { useRef, useEffect, useCallback, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnHover?: boolean;
}

const CHARS = '—./+*_=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  speed = 30,
  triggerOnHover = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalLength = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );

      iteration += 1 / 3;

      if (iteration >= totalLength) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  }, [text, speed]);

  // Scroll-trigger based initial scramble
  useEffect(() => {
    if (triggerOnHover || hasTriggered) return;

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scramble, triggerOnHover, hasTriggered]);

  const handleMouseEnter = useCallback(() => {
    if (triggerOnHover) scramble();
  }, [triggerOnHover, scramble]);

  return (
    <span
      ref={elementRef}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};
