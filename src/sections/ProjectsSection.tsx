import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import { TextReveal, MagneticButton } from '../components';

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bgText = bgTextRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll
      const scrollDistance = track.scrollWidth - window.innerWidth;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      tl.to(track, {
        x: -scrollDistance,
        ease: 'none',
      });

      // Background text parallax
      if (bgText) {
        tl.to(bgText, {
          x: scrollDistance * 0.4, // Parallax movement
          ease: 'none',
        }, 0);
      }

      // Individual cards entrance animation
      const cards = track.querySelectorAll('.project-card-wrapper');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'left 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="h-screen overflow-hidden bg-[var(--bg)] flex items-center relative"
    >
      {/* Huge Background Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none whitespace-nowrap z-0 opacity-[0.03]"
        style={{ transform: 'translateY(-50%)' }}
      >
        <span className="font-heading font-black text-[30vw] tracking-tighter leading-none">
          SELECTED WORKS
        </span>
      </div>

      {/* Background Section header (Fixed during pin) */}
      <div className="absolute top-12 md:top-24 left-8 md:left-16 lg:left-24 z-10 pointer-events-none">
        <div className="flex items-start gap-4 md:gap-8">
          <span className="font-mono text-sm text-[var(--text-muted)] shrink-0 mt-2">04</span>
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight">
            PROYECTOS
          </TextReveal>
        </div>
      </div>

      {/* Horizontal Track */}
      <div 
        ref={trackRef} 
        className="projects-track flex items-center h-full px-8 md:px-24 pt-24 pb-12 gap-12 md:gap-24 z-10"
        style={{ width: 'max-content' }}
      >
        {projects.map((project, i) => (
          <div 
            key={project.title} 
            className="project-card-wrapper flex-shrink-0 w-[85vw] max-w-xl md:max-w-3xl h-[60vh] min-h-[400px] relative"
          >
            <div className="w-full h-full rounded-[2rem] border border-white/5 bg-[#050505]/80 overflow-hidden relative group flex flex-col justify-end p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              
              {/* Monochromatic Glow that reveals on hover (minimalist premium look) */}
              <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-bl from-white/5 via-white/[0.02] to-transparent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

              {/* Noise texture overlay for premium feel */}
              <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

              {/* Card Content Layer */}
              <div className="relative z-20 w-full">
                
                {/* Title & Desc */}
                <div className="transform transition-transform duration-700 ease-out md:group-hover:-translate-y-4">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-xl md:text-2xl font-black text-white/40 md:text-white/20 transition-colors duration-500 md:group-hover:text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="h-[1px] w-12 bg-white/10 md:group-hover:w-24 md:group-hover:bg-white/20 transition-all duration-700 ease-out" />
                  </div>
                  <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-white/80 md:text-white/50 line-clamp-3 md:line-clamp-none max-w-xl leading-relaxed md:group-hover:text-white/80 transition-colors duration-500">
                    {project.description}
                  </p>
                  
                  {/* Premium Tech Stack Badges (Strictly Minimalist) */}
                  <div className="flex flex-wrap gap-2 md:gap-3 mt-8">
                    {project.tech.map(t => (
                      <span key={t} className="font-mono text-[10px] md:text-[11px] text-white/80 md:text-white/50 bg-white/10 md:bg-white/[0.02] border border-white/20 md:border-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-md transition-all duration-300 md:group-hover:bg-white/10 md:group-hover:text-white md:group-hover:border-white/20 flex items-center gap-2 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white md:bg-white/20 md:group-hover:bg-white md:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons (Always visible on mobile, reveal on hover on desktop) */}
                <div className="flex gap-4 mt-8 opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-700 ease-out">
                  {project.demo && (
                    <MagneticButton href={project.demo} target="_blank" rel="noopener noreferrer" variant="primary">
                      VER DEMO ↗
                    </MagneticButton>
                  )}
                  {project.repo && (
                    <MagneticButton href={project.repo} target="_blank" rel="noopener noreferrer" variant="outline">
                      VER CÓDIGO
                    </MagneticButton>
                  )}
                </div>
              </div>

              {/* Bottom Fade Gradient for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        ))}
        
        {/* Spacer at the end for clean padding */}
        <div className="w-[10vw]" />
      </div>
    </section>
  );
};