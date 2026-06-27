import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navLinks } from '../data/portfolio';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // Setup scroll progress
  useEffect(() => {
    if (!progressFillRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(progressFillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // Setup open/close timeline
  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current.filter(Boolean);
    if (!overlay || links.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      
      tl.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      
      tl.fromTo(links, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        }, 
        '-=0.3'
      );

      timelineRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  // Play/reverse on isOpen change  
  useEffect(() => {
    if (!timelineRef.current) return;
    if (isOpen) {
      timelineRef.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      timelineRef.current.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleLinkClick = useCallback((href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  }, []);

  return (
    <>
      {/* Logo - fixed top left */}
      <div className="fixed top-8 left-8 z-[201] mix-blend-difference">
        <a href="#" className="font-mono text-sm text-white tracking-widest uppercase"
           onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          GONZALO<span className="text-[var(--text-muted)] mx-1">.</span>DEV
        </a>
      </div>

      {/* Hamburger */}
      <button
        className={`hamburger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Nav Overlay */}
      <div
        ref={overlayRef}
        className="nav-overlay"
        style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
      >
        <nav className="nav-menu h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              ref={el => { linksRef.current[i] = el; }}
              href={link.href}
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
            >
              <span className="nav-link-number">{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Scroll Progress */}
      <div className="scroll-progress">
        <div ref={progressFillRef} className="scroll-progress-fill h-full" />
      </div>
    </>
  );
};