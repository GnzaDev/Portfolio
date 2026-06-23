import { useEffect } from 'react';

const SECTION_MAP: Record<string, string> = {
  '1': '#about',
  '2': '#skills',
  '3': '#experience',
  '4': '#projects',
  '5': '#contact',
};

export function useKeyboardNav() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key < '1' || e.key > '5') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const section = SECTION_MAP[e.key];
      if (!section) return;

      e.preventDefault();
      const el = document.querySelector(section);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}