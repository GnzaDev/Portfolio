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
  BackgroundShader 
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
      {/* Loading Screen */}
      {isLoading && <LoadingSpinner onComplete={handleLoadingComplete} />}

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="fixed -top-20 left-4 z-[10000] bg-white text-black px-6 py-3 rounded-b-lg font-bold focus:top-4 transition-all duration-300 shadow-lg font-mono text-sm"
      >
        Saltar al contenido principal
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Background Shader */}
      <BackgroundShader />

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Noise texture overlay */}
      <div className="noise-bg" />

      {/* Main Content */}
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default App;
