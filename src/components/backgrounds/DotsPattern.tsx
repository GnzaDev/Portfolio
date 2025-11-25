// Opción 3: Dots pattern animado
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const DotsPattern = () => {
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('.dot');
      
      gsap.to(dots, {
        opacity: 0.3,
        scale: 1.2,
        duration: 2,
        stagger: {
          amount: 2,
          from: 'random',
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-20 bg-gray-50">
      <div 
        ref={dotsRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
};
