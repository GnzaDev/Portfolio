import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '../data/portfolio';
import { TextReveal, FadeInView } from '../components';

export const AboutSection: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current!, {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lineRef.current!,
          start: 'top 85%',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-32 md:py-40 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-start gap-6 md:gap-12 mb-16">
          <span className="font-mono text-sm text-[var(--text-muted)] shrink-0 mt-2">01</span>
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight">
            SOBRE MÍ
          </TextReveal>
        </div>

        {/* Divider line */}
        <div ref={lineRef} className="section-divider mb-16" />

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <TextReveal
              as="p"
              className="font-body text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed"
              type="lines"
              stagger={0.15}
            >
              {about.description}
            </TextReveal>
          </div>
          <div>
            <FadeInView delay={0.3}>
              <div className="border-l border-[var(--border-hover)] pl-8">
                <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">Estado</span>
                <p className="font-heading text-2xl md:text-3xl font-bold text-[var(--text)] mt-3">
                  {about.status}
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
};