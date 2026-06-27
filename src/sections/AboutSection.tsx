import React from 'react';
import { about } from '../data/portfolio';
import { TextReveal, FadeInView, ScrubText } from '../components';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 mb-16 md:mb-20">
          <span className="font-mono text-sm text-[var(--text-muted)] shrink-0 tracking-widest md:w-12">01</span>
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight">
            SOBRE MÍ
          </TextReveal>
        </div>

        {/* Content */}
        <div className="md:ml-20 space-y-12">
          
          <ScrubText className="font-body text-2xl md:text-4xl lg:text-5xl font-medium text-[var(--text-muted)] leading-[1.3] md:leading-[1.4] tracking-tight">
            {about.description}
          </ScrubText>
          
          <FadeInView delay={0.2}>
            <div className="border-l border-[var(--border-hover)] pl-8 mt-12 max-w-sm">
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">Estado actual</span>
              <p className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] mt-3">
                {about.status}
              </p>
            </div>
          </FadeInView>

        </div>
      </div>
    </section>
  );
};