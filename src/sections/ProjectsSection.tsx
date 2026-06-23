import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import { ScrambleText } from '../components';

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: string;
  demo?: string;
  repo?: string;
  featured?: boolean;
}

const PLACEHOLDER_COLORS = [
  ['#1e1e2e', '#2d2d44'],
  ['#18181b', '#27272a'],
  ['#0f0f23', '#1a1a3e'],
  ['#1a1a2e', '#16213e'],
];

const ProjectPlaceholder = ({ project, index }: { project: Project; index: number }) => {
  const colors = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const isPrivate = project.status === 'PRIVATE';

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative w-[calc(100%-16px)] h-[calc(100%-16px)] border border-white/10 rounded overflow-hidden flex flex-col">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border-b border-white/10">
          <span className="w-2 h-2 rounded-full bg-red-400/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
          <span className="w-2 h-2 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          {isPrivate ? (
            <div className="text-center">
              <span className="text-white/20 text-3xl font-bold tracking-wider block">🔒</span>
              <span className="text-white/15 text-[11px] font-mono mt-2 block">ACCESO RESTRINGIDO</span>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-white/[0.07] text-6xl sm:text-7xl font-black tracking-tight block leading-none select-none">
                {project.title.charAt(0)}
              </span>
              <span className="text-white/[0.25] text-sm font-mono mt-1 block">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ImageGallery = ({ project, isPinned }: { project: Project; isPinned?: boolean }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!main || !top || !bottom) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      main.addEventListener('mouseenter', () => {
        gsap.to(top, { x: -8, y: -10, rotation: -3, duration: 0.4, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' });
        gsap.to(bottom, { x: 8, y: -6, rotation: 2, duration: 0.4, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' });
      });
      main.addEventListener('mouseleave', () => {
        gsap.to(top, { x: 0, y: 0, rotation: -2, duration: 0.5, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' });
        gsap.to(bottom, { x: 0, y: 0, rotation: 2, duration: 0.5, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className={`relative w-full ${isPinned ? 'aspect-[16/9] mb-6' : 'aspect-[16/10] mb-4'} rounded-lg overflow-hidden`}>
      <div className="absolute inset-0 z-10 rounded-lg overflow-hidden shadow-lg">
        <ProjectPlaceholder project={project} index={0} />
      </div>
      <div
        ref={topRef}
        className="absolute -right-3 -top-3 w-[45%] aspect-[9/19.5] z-20 rounded-lg overflow-hidden shadow-xl"
        style={{ transform: 'rotate(2deg)' }}
      >
        <ProjectPlaceholder project={project} index={1} />
      </div>
      <div
        ref={bottomRef}
        className="absolute -left-3 -bottom-3 w-[50%] aspect-[4/3] z-20 rounded-lg overflow-hidden shadow-xl"
        style={{ transform: 'rotate(-2deg)' }}
      >
        <ProjectPlaceholder project={project} index={2} />
      </div>
    </div>
  );
};

const ProgressIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-gray-900/80 rounded text-white/70 font-mono text-xs">
    <span className="tracking-wider">POS</span>
    <span className="text-white font-bold">{String(current + 1).padStart(2, '0')}</span>
    <span className="opacity-40">/</span>
    <span className="opacity-50">{String(total).padStart(2, '0')}</span>
  </div>
);

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const checkMobile = () => setIsMobile(mq.matches);
    checkMobile();
    mq.addEventListener('change', checkMobile);
    return () => mq.removeEventListener('change', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const timer = setTimeout(() => {
      const cards = track.querySelectorAll<HTMLElement>('.project-card');
      if (cards.length === 0) return;

      const ctx = gsap.context(() => {
        const scrollDistance = track.scrollWidth - window.innerWidth;

        const snapPoints = cards.length > 1
          ? Array.from({ length: cards.length }, (_, i) => i / (cards.length - 1))
          : [0];

        gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: 'top top',
            end: scrollDistance,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            snap: {
              snapTo: snapPoints,
              duration: { min: 0.2, max: 0.6 },
              ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
              delay: 0.1,
              directional: true,
            },
            onUpdate: (self) => {
              const idx = Math.min(Math.round(self.progress * (cards.length - 1)), cards.length - 1);
              setActiveIndex(idx);
            },
          },
        });
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      role="region"
      aria-labelledby="projects-title"
    >
      {/* Header fuera del pin */}
      <div className="max-w-6xl mx-auto px-4 pt-12 sm:pt-16 md:pt-20 pb-4">
        <h2
          id="projects-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-center lg:text-left text-gray-900 tracking-wider"
        >
          <ScrambleText text="PROJECTS.DIR" scrambleSpeed={1.5} />
        </h2>
        {!isMobile && (
          <div className="flex items-center gap-4 text-gray-500 text-sm font-mono">
            <span className="flex items-center gap-2">
              <span className="w-4 h-[1px] bg-gray-400 inline-block" />
              SCROLL HORIZONTAL
            </span>
            <ProgressIndicator current={activeIndex} total={projects.length} />
          </div>
        )}
      </div>

      {isMobile ? (
        <div className="px-4 pb-12 sm:pb-16 md:pb-20">
          <div
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
            onScroll={(e) => {
              const el = e.currentTarget;
              const idx = Math.round(el.scrollLeft / (el.scrollWidth / projects.length));
              setActiveIndex(Math.min(idx, projects.length - 1));
            }}
          >
            {projects.map((project) => (
              <div key={project.title} className="min-w-[85vw] snap-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {projects.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-gray-900 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div ref={pinRef} className="overflow-hidden min-h-screen">
          <div
            ref={trackRef}
            className="flex h-screen"
            style={{ width: 'max-content' }}
          >
            {projects.map((project) => (
              <div key={project.title} className="project-card w-screen flex-shrink-0 h-screen px-4 xl:px-8 py-8">
                <ProjectCard project={project} isPinned />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const ProjectCard = ({ project, isPinned }: { project: Project; isPinned?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isPinned) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const tilt = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 2,
        duration: 0.4,
        ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
      });
    };

    const reset = () => {
      gsap.to(card, {
        rotationY: 0,
        duration: 0.6,
        ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
      });
    };

    const gallery = card.querySelector('.project-gallery') as HTMLElement;
    if (gallery) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        gsap.to(gallery, {
          x: x * 20,
          duration: 0.6,
          ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(gallery, {
          x: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
        });
      });
    }

    return () => {
      card.removeEventListener('mousemove', tilt);
      card.removeEventListener('mouseleave', reset);
    };
  }, [isPinned]);

  if (isPinned) {
    return (
      <article
        ref={cardRef}
        tabIndex={0}
        className="h-full flex flex-col"
      >
        <div className="flex-1 flex flex-col lg:flex-row gap-6 xl:gap-10 items-center">
          <div className="lg:w-2/5 space-y-3 xl:space-y-4 self-start pt-2">
            <div className="flex items-center gap-3">
              <h3 className="text-xl xl:text-2xl font-bold text-gray-900">{project.title}</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold text-white rounded bg-gray-800/80 whitespace-nowrap">
                {project.status}
              </span>
            </div>

            {project.featured && (
              <span className="inline-block px-3 py-1 text-[10px] font-bold text-gray-900 bg-yellow-400 border-2 border-gray-900">
                DESTACADO
              </span>
            )}

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-gray-200 text-gray-800 text-[11px] font-semibold rounded">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-700 hover:text-gray-900 font-bold transition-colors"
                  aria-label={`Ver demo de ${project.title}`}
                >
                  DEMO →
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 font-bold transition-colors"
                  aria-label={`Ver código fuente de ${project.title}`}
                >
                  CÓDIGO →
                </a>
              )}
            </div>
          </div>

          <div className="lg:w-3/5 w-full flex-1 min-h-0 flex items-center justify-center">
            <div className="retro-terminal p-4 sm:p-6 w-full max-w-lg">
              <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-gray-900/20">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] text-gray-500 font-mono">PREVIEW — {project.title.toUpperCase()}</span>
              </div>
              <div className="font-mono text-xs sm:text-sm leading-relaxed space-y-1.5 text-gray-700">
                <span className="block"><span className="text-green-600">$</span> <span className="text-gray-900">npm</span> run build:{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                <span className="block text-gray-500">{'>'} Building project...</span>
                <span className="block text-gray-500">{'>'} Compiling modules...</span>
                <span className="block text-green-600">✓ Build complete</span>
                <span className="block mt-2"><span className="text-green-600">$</span> <span className="text-gray-900">cat</span> README.md</span>
                <span className="block text-gray-500">{'>'} {project.description.slice(0, 60)}...</span>
                <span className="block mt-2 text-gray-400">Stack: {project.tech.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      className={`retro-terminal p-5 sm:p-6 ${
        project.featured ? 'border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : ''
      }`}
    >
      <ImageGallery project={project} />

      {project.featured && (
        <div className="mb-3 flex items-center gap-2">
          <span className="px-3 py-1 text-[10px] font-bold text-gray-900 bg-yellow-400 border-2 border-gray-900">
            DESTACADO
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">{project.title}</h3>
        <span className="px-2 py-1 text-[10px] font-bold text-white rounded bg-gray-800 whitespace-nowrap">
          {project.status}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 4).map((tech) => (
          <span key={tech} className="px-2 py-0.5 bg-gray-200 text-gray-800 text-[10px] sm:text-xs font-semibold rounded">
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-semibold rounded">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-gray-700 hover:text-gray-900 font-bold transition-colors"
            aria-label={`Ver demo de ${project.title}`}
          >
            DEMO →
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 font-bold transition-colors"
            aria-label={`Ver código fuente de ${project.title}`}
          >
            CÓDIGO →
          </a>
        )}
      </div>
    </article>
  );
};