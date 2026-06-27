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

  useEffect(() => {
    if (!sectionRef.current || !nameRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 2.5 });

      // Name SplitText animation
      const split = new SplitText(nameRef.current!, { type: 'chars' });
      tl.from(split.chars, {
        y: 120,
        rotateX: -90,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power4.out',
      });

      // Subtitle
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, '-=0.4');
      }

      // Stats
      if (statsRef.current) {
        tl.from(statsRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
        }, '-=0.4');
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.from(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.5,
        }, '-=0.2');

        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Parallax on scroll - name moves slower
      if (nameRef.current) {
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
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative px-8 md:px-16 lg:px-24"
      id="hero"
    >
      {/* Main name */}
      <h1
        ref={nameRef}
        className="font-heading text-[clamp(4rem,18vw,16rem)] font-black leading-[0.85] tracking-tighter text-[var(--text)]"
        style={{ perspective: '1000px' }}
      >
        {personalInfo.name}
      </h1>

      {/* Subtitle with scramble */}
      <p
        ref={subtitleRef}
        className="font-mono text-sm md:text-base text-[var(--text-secondary)] mt-6 md:mt-8 tracking-widest uppercase"
      >
        <ScrambleText text={personalInfo.subtitle} speed={25} />
      </p>

      {/* Stats row */}
      <div ref={statsRef} className="flex flex-wrap gap-8 md:gap-16 mt-12 md:mt-16">
        {stats.map((stat, i) => (
          <div key={i} className="group">
            <div className="font-heading text-xl md:text-2xl font-bold text-[var(--text)]">
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
        className="absolute bottom-12 left-8 md:left-16 lg:left-24 flex flex-col items-center gap-3"
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