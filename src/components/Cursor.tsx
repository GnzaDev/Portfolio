import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // We only want the custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      return;
    }

    // Hide default cursor globally
    document.documentElement.classList.add('hide-native-cursor');

    // High performance tracking with GSAP quickTo
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 3.5, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Add hover effect for all links and buttons
    const attachHoverListeners = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, select, .project-card-wrapper, .experience-row');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Run once on mount
    attachHoverListeners();

    // Use a MutationObserver to attach listeners to dynamically added elements
    const observer = new MutationObserver(() => {
      // Remove old listeners to avoid duplicates (naive approach)
      // For a perfectly optimized app, we'd use event delegation on document.body
      // But this works for our specific elements
    });
    
    // Better yet: Event Delegation on document
    const handleMouseOverDelegated = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractable = target.closest('a, button, input, textarea, select, .project-card-wrapper, .experience-row, .magnetic-btn');
      if (isInteractable) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    };

    document.addEventListener('mouseover', handleMouseOverDelegated);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOverDelegated);
      document.documentElement.classList.remove('hide-native-cursor');
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ willChange: 'transform' }}
    />
  );
};
