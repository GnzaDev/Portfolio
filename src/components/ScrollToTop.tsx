import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

export const ScrollToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;

      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow);

        if (buttonRef.current) {
          if (shouldShow) {
            gsap.fromTo(
              buttonRef.current,
              { scale: 0, rotate: -180, opacity: 0 },
              { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
          } else {
            gsap.to(buttonRef.current, {
              scale: 0,
              rotate: 180,
              opacity: 0,
              duration: 0.3,
              ease: 'back.in(1.7)'
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const scrollToTop = () => {
    // Scroll suave nativo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Efecto de "bounce" en el botón al hacer click
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white border-4 border-gray-700 shadow-lg hover:bg-gray-800 hover:border-gray-600 transition-colors flex items-center justify-center group"
      style={{ opacity: 0, transform: 'scale(0)' }}
      aria-label="Volver arriba"
    >
      <ChevronUp size={24} className="group-hover:animate-bounce" aria-hidden="true" />
    </button>
  );
};
