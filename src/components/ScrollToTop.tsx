import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    gsap.set(btn, { scale: 0, opacity: 0 });

    const handleScroll = () => {
      if (window.scrollY > 400) {
        gsap.to(btn, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
        });
      } else {
        gsap.to(btn, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white border-4 border-gray-700 shadow-lg hover:bg-gray-800 hover:border-gray-600 transition-colors flex items-center justify-center"
      aria-label="Volver arriba"
    >
      <ChevronUp size={24} aria-hidden="true" />
    </button>
  );
};