import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const KineticText: React.FC<KineticTextProps> = ({ 
  children, 
  className = '',
  as: Component = 'div' 
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const proxy = { skew: 0, scale: 1 };
      const skewSetter = gsap.quickSetter(el, "skewY", "deg");
      const scaleSetter = gsap.quickSetter(el, "scaleY", "");
      const clampSkew = gsap.utils.clamp(-20, 20);
      
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          let skew = clampSkew(velocity / -150);
          // Optional: scale down slightly when scrolling fast
          let scale = 1 - Math.min(Math.abs(velocity / 5000), 0.2);
          
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            proxy.scale = scale;
            gsap.to(proxy, {
              skew: 0,
              scale: 1,
              duration: 1.2,
              ease: "elastic.out(1, 0.4)",
              overwrite: true,
              onUpdate: () => {
                skewSetter(proxy.skew);
                scaleSetter(proxy.scale);
              }
            });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Component 
      className={`inline-block transform-origin-center will-change-transform ${className}`} 
      ref={textRef}
    >
      {children}
    </Component>
  );
};
