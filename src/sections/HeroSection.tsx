import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { personalInfo, stats } from '../data/portfolio';
import { ScrambleText } from '../components';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !nameRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 2.5 });

      // Create SplitText
      splitRef.current = new SplitText(nameRef.current!, { type: 'chars' });
      const chars = splitRef.current.chars;
      
      // Load animation
      tl.from(chars, {
        y: 120,
        rotateX: -90,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power4.out',
      });

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');
      }

      if (statsRef.current) {
        tl.from(statsRef.current.children, { y: 30, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4');
      }

      if (scrollIndicatorRef.current) {
        tl.from(scrollIndicatorRef.current, { opacity: 0, duration: 0.5 }, '-=0.2');
        gsap.to(scrollIndicatorRef.current, { y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      }

      // Parallax
      gsap.to(nameRef.current, {
        y: -100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Proximity Hover Effect (Stretch & Blur)
  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable on touch devices to avoid stuck hover states and scroll interference
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    
    if (!splitRef.current) return;
    const chars = splitRef.current.chars;
    
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      
      // Calculate horizontal distance from mouse to the center of the character
      const dist = Math.abs(e.clientX - centerX);
      const maxDist = 250; // Influence radius

      if (dist < maxDist) {
        // Character is near the mouse
        // Map distance so that dist=0 means max stretch (1.5), dist=maxDist means no stretch (1)
        const scaleY = gsap.utils.mapRange(0, maxDist, 1.6, 1, dist);
        const scaleX = gsap.utils.mapRange(0, maxDist, 1.15, 1, dist);
        const yOffset = gsap.utils.mapRange(0, maxDist, -20, 0, dist);
        // The closer to the mouse, the sharper it is (blur 0). The further, the blurrier (blur 4px)
        const blurAmount = gsap.utils.mapRange(0, maxDist, 0, 8, dist);
        const opacity = gsap.utils.mapRange(0, maxDist, 1, 0.4, dist);

        gsap.to(char, {
          scaleY,
          scaleX,
          y: yOffset,
          filter: `blur(${blurAmount}px)`,
          opacity,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        // Character is far from the mouse
        gsap.to(char, {
          scaleY: 1,
          scaleX: 1,
          y: 0,
          filter: 'blur(8px)',
          opacity: 0.4,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  };

  const handleMouseLeave = () => {
    if (!splitRef.current) return;
    gsap.to(splitRef.current.chars, {
      scaleY: 1,
      scaleX: 1,
      y: 0,
      filter: 'blur(0px)',
      opacity: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto'
    });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative px-8 md:px-16 lg:px-24 overflow-hidden"
      id="hero"
    >
      {/* Main name Container */}
      <div 
        className="relative inline-block mt-12 md:mt-0 cursor-crosshair z-10 py-12"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h1
          ref={nameRef}
          className="font-heading text-[clamp(3rem,13vw,16rem)] font-black leading-[0.85] tracking-tighter text-[var(--text)] whitespace-nowrap origin-bottom"
          style={{ perspective: '1000px' }}
        >
          {personalInfo.name}
        </h1>
      </div>

      {/* Subtitle with scramble */}
      <p
        ref={subtitleRef}
        className="font-mono text-sm md:text-base text-[var(--text-secondary)] mt-6 md:mt-8 tracking-widest uppercase relative z-20"
      >
        <ScrambleText text={personalInfo.subtitle} speed={25} />
      </p>

      {/* Stats row */}
      <div ref={statsRef} className="grid grid-cols-2 gap-y-8 gap-x-4 md:flex md:flex-wrap md:gap-16 mt-12 md:mt-16 relative z-20">
        {stats.map((stat, i) => (
          <div key={i} className="group">
            <div className="font-heading text-lg md:text-2xl font-bold text-[var(--text)] tracking-tight">
              {stat.value}
            </div>
            <div className="font-mono text-[10px] md:text-xs text-[var(--text-muted)] tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-8 md:left-16 lg:left-24 flex flex-col items-center gap-3 relative z-20"
      >
        <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-[var(--border-hover)]" />
      </div>
    </section>
  );
};