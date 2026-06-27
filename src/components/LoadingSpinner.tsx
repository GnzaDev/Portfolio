import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LoadingSpinnerProps {
  onComplete?: () => void;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ onComplete }) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const counter = counterRef.current;
    const barFill = barFillRef.current;
    const text = textRef.current;
    if (!screen || !counter || !barFill || !text) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          gsap.to(screen, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 1,
            ease: 'power4.inOut',
            delay: 0.3,
            onComplete: () => onComplete?.(),
          });
        },
      });

      // Counter animation
      const obj = { val: 0 };
      tl.to(obj, {
        val: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          counter.textContent = Math.round(obj.val).toString();
        },
      }, 0);

      // Progress bar
      tl.to(barFill, {
        scaleX: 1,
        duration: 2,
        ease: 'power2.inOut',
      }, 0);

      // Loading text fade in
      tl.from(text, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.3);
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="loading-screen"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div ref={counterRef} className="loading-counter">0</div>
      <div className="loading-bar">
        <div ref={barFillRef} className="loading-bar-fill" />
      </div>
      <div ref={textRef} className="loading-text">Cargando portfolio</div>
    </div>
  );
};