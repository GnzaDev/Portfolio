import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoadingSpinnerProps {
  onComplete?: () => void;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    });

    // 1. Fast counter to 100
    const dummy = { val: 0 };
    tl.to(dummy, {
      val: 100,
      duration: 1.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        setProgress(Math.round(dummy.val));
      }
    });

    // 2. Collapse text into nothing
    tl.to(textRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.in(1.5)'
    });

    // 3. Pop dot
    tl.set(dotRef.current, { opacity: 1 });
    tl.fromTo(dotRef.current, 
      { scale: 0 }, 
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    );

    // 4. Dot stretches into a massive diagonal slash
    // Assuming aspect ratio, rotation of -45 degrees roughly. 
    tl.to(dotRef.current, {
      rotate: -45,
      scaleX: 200, // Make it very long to cover screen corners
      scaleY: 0.05, // Make it a razor thin line
      duration: 0.7,
      ease: 'expo.inOut'
    });

    // 5. Split Curtains diagonally apart
    tl.to(curtainTopRef.current, {
      xPercent: -100,
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut'
    }, 'split');
    
    tl.to(curtainBottomRef.current, {
      xPercent: 100,
      yPercent: 100,
      duration: 1.2,
      ease: 'expo.inOut'
    }, 'split');
    
    // Line fades away simultaneously
    tl.to(dotRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, 'split');

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Diagonal Curtains */}
      <div 
        ref={curtainTopRef} 
        className="absolute inset-0 bg-[var(--bg)]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <div 
        ref={curtainBottomRef} 
        className="absolute inset-0 bg-[var(--bg)]"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div 
          ref={textRef} 
          className="font-heading text-[15vw] font-black text-[var(--text)] tracking-tighter leading-none mix-blend-difference"
        >
          {progress}%
        </div>
        
        {/* Transforming Dot/Line */}
        <div 
          ref={dotRef} 
          className="absolute w-12 h-12 rounded-full bg-[var(--text)] opacity-0 mix-blend-difference"
        />
      </div>
    </div>
  );
};