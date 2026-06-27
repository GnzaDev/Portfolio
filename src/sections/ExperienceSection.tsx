import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education } from '../data/portfolio';
import { TextReveal, FadeInView } from '../components';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[var(--bg)] relative z-10">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 relative">
        
        {/* Left Column (Sticky Title) */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-40 h-fit">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-mono text-sm text-[var(--text-muted)] shrink-0 mt-2 tracking-widest">03</span>
            <TextReveal as="h2" className="font-heading text-5xl md:text-7xl font-black text-[var(--text)] tracking-tighter leading-none">
              EXPERIENCE
            </TextReveal>
          </div>
          <p className="font-body text-[var(--text-secondary)] text-lg pl-8 lg:pl-12 max-w-sm">
            Un recorrido por mi trayectoria profesional y educativa en el mundo del desarrollo de software.
          </p>
        </div>

        {/* Right Column (Scrollable Content) */}
        <div className="w-full lg:w-2/3 experience-track flex flex-col gap-12 lg:gap-24 pb-32">
          
          {/* Work Experience */}
          <div className="flex flex-col gap-16">
            {experience.map((exp, i) => (
              <FadeInView key={i} direction="up" delay={i * 0.1}>
                <div className="experience-row relative group transition-all duration-500 ease-out border-l border-[var(--border)] pl-8 md:pl-12 hover:border-[var(--text)]">
                  {/* Glowing dot indicator on hover */}
                  <div className="absolute left-0 top-3 w-1.5 h-1.5 bg-[var(--text)] rounded-full -translate-x-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_var(--text)]" />
                  
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                    <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-widest shrink-0 uppercase">
                      {exp.period}
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text)] tracking-tight">
                      {exp.position}
                    </h3>
                  </div>
                  
                  <p className="font-mono text-sm text-[var(--text-secondary)] uppercase tracking-wider mb-6">
                    {exp.company}
                  </p>
                  
                  <ul className="space-y-4">
                    {exp.responsibilities.map((resp, j) => (
                      <li key={j} className="font-body text-base text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-300 flex items-start gap-4">
                        <span className="text-[var(--border-hover)] group-hover:text-[var(--text)] mt-1.5 text-xs transition-colors duration-300">
                          +
                        </span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>
            ))}
          </div>

          <div className="w-full h-px bg-[var(--border)] my-4" />

          {/* Education */}
          <div className="flex flex-col gap-16">
            <h4 className="font-heading text-2xl font-bold text-[var(--text-muted)] pl-8 md:pl-12 tracking-tight">EDUCATION</h4>
            {education.map((edu, i) => (
              <FadeInView key={`edu-${i}`} direction="up" delay={i * 0.1}>
                <div className="experience-row relative group transition-all duration-500 ease-out border-l border-[var(--border)] pl-8 md:pl-12 hover:border-[var(--text)]">
                  <div className="absolute left-0 top-3 w-1.5 h-1.5 bg-[var(--text)] rounded-full -translate-x-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_var(--text)]" />
                  
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                    <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-widest shrink-0 uppercase">
                      {edu.period}
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text)] tracking-tight">
                      {edu.degree}
                    </h3>
                  </div>
                  
                  <p className="font-mono text-sm text-[var(--text-secondary)] uppercase tracking-wider mb-4">
                    {edu.institution}
                  </p>
                  <p className="font-body text-base text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-300">
                    {edu.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};