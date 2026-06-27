import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';
import { TextReveal, FadeInView } from '../components';

export const SkillsSection: React.FC = () => {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  // Get all skills flat
  const allSkills = skills.flatMap(cat => cat.skills);
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  // Speed variation based on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef1.current) {
        gsap.to(marqueeRef1.current, {
          x: '-=200',
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeRef1.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
      if (marqueeRef2.current) {
        gsap.to(marqueeRef2.current, {
          x: '+=200',
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeRef2.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const renderMarqueeRow = (items: string[], ref: React.RefObject<HTMLDivElement | null>, reverse?: boolean) => (
    <div className="overflow-hidden py-4">
      <div
        ref={ref}
        className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
      >
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((skill, i) => (
          <React.Fragment key={i}>
            <span className="marquee-item">{skill}</span>
            {i < items.length * 2 - 1 && <span className="marquee-separator">•</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-32 md:py-40">
      {/* Section header */}
      <div className="px-8 md:px-16 lg:px-24 mb-16">
        <div className="max-w-6xl mx-auto flex items-start gap-6 md:gap-12">
          <span className="font-mono text-sm text-[var(--text-muted)] shrink-0 mt-2">02</span>
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight">
            HABILIDADES
          </TextReveal>
        </div>
      </div>

      {/* Marquee rows - full width */}
      {renderMarqueeRow(row1, marqueeRef1)}
      {renderMarqueeRow(row2, marqueeRef2, true)}

      {/* Skill categories below */}
      <div className="px-8 md:px-16 lg:px-24 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {skills.map((category, i) => (
            <FadeInView key={category.category} delay={i * 0.1}>
              <div>
                <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};