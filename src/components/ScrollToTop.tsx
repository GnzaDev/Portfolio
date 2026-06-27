import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.8,
      duration: 0.3,
      ease: 'power2.out',
      pointerEvents: visible ? 'auto' : 'none',
    });
  }, [visible]);

  return (
    <button
      ref={buttonRef}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full border border-[var(--border-hover)] text-[var(--text-secondary)] flex items-center justify-center hover:border-[var(--text)] hover:text-[var(--text)] transition-colors"
      style={{ opacity: 0, background: 'var(--bg)' }}
      aria-label="Volver arriba"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 13V3M8 3L3 8M8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};