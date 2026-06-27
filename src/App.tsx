import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useKeyboardNav } from './hooks/useKeyboardNav';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

// Components
import { 
  Navbar, 
  ScrollToTop, 
  LoadingSpinner, 
  SmoothScroll, 
  BackgroundShader,
  ThemeToggle,
  Cursor
} from './components';

import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  ContactSection
} from './sections';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useKeyboardNav();

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SmoothScroll>
      <div className="relative text-[var(--text)] min-h-screen selection:bg-[var(--text)] selection:text-[var(--bg)]">
        <BackgroundShader />
        
        {/* Loading Spinner manages its own GSAP exit animation then unmounts */}
        {isLoading && <LoadingSpinner onComplete={() => setIsLoading(false)} />}
        
        {/* Content wrapper: hidden overflow while loading to prevent scrolling during split reveal */}
        <div className={`portfolio-content w-full ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
          {/* Skip to main content */}
          <a
            href="#main-content"
            className="fixed -top-20 left-4 z-[10000] bg-white text-black px-6 py-3 rounded-b-lg font-bold focus:top-4 transition-all duration-300 shadow-lg font-mono text-sm"
          >
            Saltar al contenido principal
          </a>

          <Navbar />
          <ThemeToggle />
          
          {/* Main content has a solid background and margin-bottom to reveal the fixed footer */}
          <main id="main-content" className="relative z-10 bg-[var(--bg)] mb-[100vh]">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
          </main>
          
          <ContactSection />
          
          <ScrollToTop />
        </div>
      </div>
    </SmoothScroll>
  );
}

export default App;
