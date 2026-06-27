import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { personalInfo } from '../data/portfolio';
import { MagneticButton, ScrambleText, FadeInView } from '../components';

export const ContactSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current!, { type: 'chars' });
      gsap.from(split.chars, {
        y: 80,
        opacity: 0,
        rotateX: -60,
        stagger: 0.04,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: titleRef.current!,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="py-32 md:py-48 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section number */}
        <span className="font-mono text-sm text-[var(--text-muted)] block mb-8">05</span>

        {/* Big title */}
        <h2
          ref={titleRef}
          className="font-heading text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter text-[var(--text)] mb-12"
          style={{ perspective: '1000px' }}
        >
          HABLEMOS
        </h2>

        {/* Description */}
        <FadeInView delay={0.2}>
          <p className="font-body text-lg md:text-xl text-[var(--text-secondary)] max-w-lg mb-12">
            ¿Tienes un proyecto en mente? Estoy abierto a nuevas oportunidades y colaboraciones.
          </p>
        </FadeInView>

        {/* Email CTA */}
        <FadeInView delay={0.3}>
          <div className="mb-16">
            <MagneticButton
              href={`mailto:${personalInfo.email}`}
              variant="outline"
              className="px-8 py-4 text-sm"
            >
              ENVIAR EMAIL
            </MagneticButton>
          </div>
        </FadeInView>

        {/* Social links */}
        <FadeInView delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-heading text-2xl md:text-3xl font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <ScrambleText text="GitHub →" triggerOnHover />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-heading text-2xl md:text-3xl font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <ScrambleText text="LinkedIn →" triggerOnHover />
            </a>
          </div>
        </FadeInView>

        {/* Footer */}
        <div className="section-divider mt-24 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Gonzalo Bustamante
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            Diseñado & Desarrollado con ♥
          </p>
        </div>
      </div>
    </section>
  );
};