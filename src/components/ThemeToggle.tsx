import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState(false);
  
  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      setIsLight(true);
    }
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    const nextTheme = isLight ? 'dark' : 'light';
    const x = e.clientX;
    const y = e.clientY;
    
    // Fallback for browsers that don't support View Transitions API
    if (!('startViewTransition' in document)) {
      document.documentElement.setAttribute('data-theme', nextTheme);
      setIsLight(!isLight);
      return;
    }

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // @ts-ignore - View Transitions API
    const transition = document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', nextTheme);
      setIsLight(!isLight);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 1000,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-[9999] w-12 h-12 rounded-full border border-white/10 bg-[var(--bg-elevated)]/80 backdrop-blur-md flex items-center justify-center text-[var(--text)] transition-all duration-300 hover:scale-110 hover:bg-white/10 shadow-2xl group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (shows in dark mode) */}
        <svg 
          className={`absolute w-full h-full transition-all duration-500 transform ${isLight ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>

        {/* Moon Icon (shows in light mode) */}
        <svg 
          className={`absolute w-full h-full transition-all duration-500 transform ${!isLight ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </div>
    </button>
  );
};
