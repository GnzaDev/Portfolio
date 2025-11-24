import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

// Componentes
import { Navbar, ScrollToTop, LoadingSpinner } from './components';
import { 
  HeroSection, 
  AboutSection, 
  SkillsSection, 
  ExperienceSection, 
  ProjectsSection, 
  ContactSection 
} from './sections';

// Fondo retro tipo grid + partículas sutiles
const GridRetroBackground = () => {
  return (
    <>
      {/* Grid retro */}
      <div className="fixed inset-0 -z-20" style={{
        background: `#f8fafc`,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0
      }} />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulación de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animaciones GSAP para las cards al hacer scroll
  useEffect(() => {
    // SplitText + ScrollTrigger para títulos principales
    const titles = [
      '#main-title',
      '#about-title',
      '#skills-title',
      '#experience-title',
      '#projects-title',
      '#connect-title'
    ];
    
    titles.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        const split = new SplitText(el, { type: 'chars,words' });
        gsap.set(split.chars, { opacity: 0, y: 40, rotateY: 60 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(split.chars, {
              opacity: 1,
              y: 0,
              rotateY: 0,
              stagger: 0.04,
              duration: 0.7,
              ease: 'power3.out'
            });
          }
        });
      }
    });

    // Animación de entrada para las cards
    const cards = gsap.utils.toArray<HTMLElement>('.retro-card, .retro-terminal');
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.92 });
    cards.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'transform'
          });
        }
      });
    });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div id="smooth-wrapper">
      {/* Skip to main content - solo visible con teclado */}
      <a
        href="#main-content"
        className="fixed -top-20 left-4 z-[10000] bg-gray-900 text-white px-6 py-3 rounded-b-lg font-bold focus:top-4 transition-all duration-300 shadow-lg"
      >
        Saltar al contenido principal
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      <GridRetroBackground />

      <main id="main-content" className="bg-transparent text-gray-900 font-mono pt-14 sm:pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />

        {/* Footer */}
        <footer className="py-6 md:py-8 text-center text-gray-500 text-xs sm:text-sm px-4" role="contentinfo">
          <p>Desarrollado por Gonzalo Bustamante © {new Date().getFullYear()}</p>
          <p className="mt-2 text-xs text-gray-400">Ingeniero en Computación | Chile</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
