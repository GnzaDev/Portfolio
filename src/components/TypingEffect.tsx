import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TypingEffectProps {
  text: string;
  delay?: number;
}

export const TypingEffect = ({ text, delay = 0 }: TypingEffectProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const chars = text.split('');
        textRef.current.innerHTML = '';

        chars.forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          textRef.current?.appendChild(span);
        });

        gsap.to(textRef.current.children, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.05,
          delay: delay,
          ease: 'none'
        });
      }
    });

    return () => ctx.revert();
  }, [text, delay]);

  return <span ref={textRef} />;
};
