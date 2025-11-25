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

// Fondo retro animado con drift + noise
const GridRetroBackground = () => {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const noiseRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Animación de drift del grid
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        backgroundPosition: '40px 40px',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }

    // Animación de noise
    if (noiseRef.current) {
      gsap.to(noiseRef.current, {
        opacity: 0.02,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'steps(2)',
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-20">
      {/* Grid base animado */}
      <div 
        ref={gridRef}
        className="absolute inset-0"
        style={{
          background: '#f8fafc',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0',
        }}
      />
      
      {/* Noise texture */}
      <div 
        ref={noiseRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />
      
      {/* Scanlines CRT */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px',
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.08) 100%)',
        }}
      />
    </div>
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
