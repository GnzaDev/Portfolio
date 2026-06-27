import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education } from '../data/portfolio';
import { TextReveal, FadeInView } from '../components';

export const ExperienceSection: React.FC = () => {
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineLineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(timelineLineRef.current!, {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineLineRef.current!,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-32 md:py-40 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-start gap-6 md:gap-12 mb-16">
          <span className="font-mono text-sm text-[var(--text-muted)] shrink-0 mt-2">03</span>
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight">
            EXPERIENCIA
          </TextReveal>
        </div>

        <div className="section-divider mb-20" />

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div
            ref={timelineLineRef}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-[var(--border-hover)]"
          />

          {/* Experience items */}
          <div className="space-y-16 md:space-y-20">
            {experience.map((exp, i) => (
              <FadeInView key={i} direction="left" delay={i * 0.15}>
                <div className="pl-8 md:pl-20 relative">
                  {/* Dot on timeline */}
                  <div className="absolute left-0 md:left-8 top-2 w-2 h-2 rounded-full bg-[var(--text)] -translate-x-[3.5px]" />
                  
                  <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">{exp.period}</span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] mt-2">{exp.position}</h3>
                  <p className="font-body text-sm text-[var(--text-secondary)] mt-1">{exp.company}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.responsibilities.map((resp, j) => (
                      <li key={j} className="font-body text-sm text-[var(--text-secondary)] flex items-start gap-3">
                        <span className="text-[var(--text-muted)] mt-1.5 text-[8px]">▸</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>
            ))}

            {/* Education */}
            {education.map((edu, i) => (
              <FadeInView key={`edu-${i}`} direction="left" delay={(experience.length + i) * 0.15}>
                <div className="pl-8 md:pl-20 relative">
                  <div className="absolute left-0 md:left-8 top-2 w-2 h-2 rounded-full bg-[var(--text-muted)] -translate-x-[3.5px]" />
                  
                  <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">{edu.period}</span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] mt-2">{edu.degree}</h3>
                  <p className="font-body text-sm text-[var(--text-secondary)] mt-1">{edu.institution}</p>
                  <p className="font-body text-sm text-[var(--text-secondary)] mt-3">{edu.description}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};