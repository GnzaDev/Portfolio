import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, Variants, Transition } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);
import { Code, Terminal, Database, Globe, Mail, Github, Linkedin, User, Zap, Monitor, Cpu, HardDrive } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 12
    }
  }
};

const typewriterVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: {
      duration: 2,
      ease: [0.42, 0, 0.58, 1] // cubic-bezier para easeInOut
    }
  }
};

// Fondo inspirado en las imágenes: fondo radial y esferas difusas
const ExampleInspiredBackground = () => {
  // Refs para las esferas y el fondo
  const sphere1 = useRef<HTMLDivElement>(null);
  const sphere2 = useRef<HTMLDivElement>(null);
  const sphere3 = useRef<HTMLDivElement>(null);
  const sphere4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Parallax para esferas
      if (sphere1.current) gsap.to(sphere1.current, { x: y * 0.08, y: y * 0.04, duration: 0.6, overwrite: 'auto' });
      if (sphere2.current) gsap.to(sphere2.current, { x: -y * 0.12, y: y * 0.09, duration: 0.6, overwrite: 'auto' });
      if (sphere3.current) gsap.to(sphere3.current, { x: y * 0.18, y: -y * 0.13, duration: 0.6, overwrite: 'auto' });
      if (sphere4.current) gsap.to(sphere4.current, { x: -y * 0.09, y: y * 0.17, duration: 0.6, overwrite: 'auto' });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fondo radial fijo, sin parallax */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at 60% 40%, #f8fafc 0%, #e5e7eb 100%)',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          position: 'fixed',
          pointerEvents: 'none',
        }}
      />
      {/* Esferas difusas tipo glass/bokeh con parallax */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Esfera grande abajo izquierda */}
        <div ref={sphere1} style={{
          position: 'absolute',
          left: '-120px',
          bottom: '-120px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(200,200,200,0.45) 60%, rgba(255,255,255,0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(2px)',
          willChange: 'transform',
        }} />
        {/* Esfera grande arriba derecha */}
        <div ref={sphere2} style={{
          position: 'absolute',
          right: '-100px',
          top: '-100px',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(220,220,220,0.38) 60%, rgba(255,255,255,0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(2px)',
          willChange: 'transform',
        }} />
        {/* Esfera mediana abajo derecha */}
        <div ref={sphere3} style={{
          position: 'absolute',
          right: '40px',
          bottom: '60px',
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle, rgba(220,220,220,0.32) 60%, rgba(255,255,255,0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(1.5px)',
          willChange: 'transform',
        }} />
        {/* Esfera pequeña arriba izquierda */}
        <div ref={sphere4} style={{
          position: 'absolute',
          left: '40px',
          top: '60px',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(220,220,220,0.25) 60%, rgba(255,255,255,0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(1.5px)',
          willChange: 'transform',
        }} />
      </div>
    </>
  );
};

// Fondo retro tipo grid + partículas sutiles
const GridRetroBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    // Partículas animadas (pequeñas, opacas, movimiento suave)
    if (svgRef.current) {
      const circles = svgRef.current.querySelectorAll('circle');
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          x: `+=${6 + Math.random() * 10}`,
          y: `+=${6 + Math.random() * 10}`,
          duration: 10 + Math.random() * 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15
        });
      });
    }
  }, []);
  return (
    <>
      {/* Grid retro */}
      <div className="fixed inset-0 -z-20" style={{
        background: `#f8fafc`,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0
      }} />
      {/* Puntos del grid (partículas sutiles) */}
      <svg ref={svgRef} className="fixed inset-0 -z-10 pointer-events-none" width="100vw" height="100vh" style={{width: '100vw', height: '100vh'}}>
        {[...Array(18)].map((_, i) => (
          <circle key={i} cx={40 + i * 80} cy={60 + (i % 5) * 120} r={2.5} fill="#111827" opacity={0.08 + (i % 3) * 0.04} />
        ))}
      </svg>
    </>
  );
};

// 1. Partículas SVG animadas y gradiente animado en el fondo
const AnimatedBackgroundFX = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Gradiente animado (usar keyframes para backgroundPosition)
    if (gradRef.current) {
      gsap.to(gradRef.current, {
        keyframes: [
          { backgroundPosition: '0% 50%', duration: 0 },
          { backgroundPosition: '100% 50%', duration: 8 },
          { backgroundPosition: '0% 50%', duration: 8 }
        ],
        repeat: -1,
        ease: 'linear'
      });
    }
    // Partículas SVG animadas (más visibles)
    if (svgRef.current) {
      const circles = svgRef.current.querySelectorAll('circle');
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          x: `+=${20 + Math.random() * 40}`,
          y: `+=${20 + Math.random() * 40}`,
          duration: 6 + Math.random() * 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
      });
    }
  }, []);
  return (
    <>
      <div ref={gradRef} className="fixed inset-0 -z-20 transition-all duration-1000" style={{background: 'linear-gradient(120deg, #f8fafc 0%, #e5e7eb 100%)', backgroundSize: '200% 200%', backgroundPosition: '0% 50%', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0}} />
      <svg ref={svgRef} className="fixed inset-0 -z-10 pointer-events-none" width="100vw" height="100vh" style={{width: '100vw', height: '100vh'}}>
        {[...Array(18)].map((_, i) => (
          <circle key={i} cx={60 + i * 80} cy={80 + (i % 3) * 120} r={28 + (i % 4) * 10} fill="white" opacity={0.18 + (i % 3) * 0.13} />
        ))}
      </svg>
    </>
  );
};

// 2. Onda SVG animada como separador entre secciones (más sutil)
const AnimatedWave = () => {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        attr: { d: 'M0,40 Q320,48 640,40 T1280,40 V64 H0 Z' },
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);
  return (
    <svg viewBox="0 0 1280 64" width="100%" height="48" className="block">
      <path ref={pathRef} d="M0,40 Q320,24 640,40 T1280,40 V64 H0 Z" fill="#f8fafc" />
    </svg>
  );
};

// 4. Reveal con máscara para imágenes/íconos de proyectos
const useRevealMask = (selector: string) => {
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(selector);
    items.forEach((el) => {
      gsap.set(el, { WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, black 100%)' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            WebkitMaskImage: 'linear-gradient(90deg, black 100%, black 100%)',
            maskImage: 'linear-gradient(90deg, black 100%, black 100%)',
            duration: 1.1,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    });
  }, [selector]);
};

// Eliminar el efecto glitch en títulos importantes
// 5. Efecto glitch en títulos importantes
const useGlitchEffect = (selector: string) => {
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(selector);
    items.forEach((el) => {
      const glitch = () => {
        gsap.timeline()
          .to(el, { x: 2, color: '#00fff7', duration: 0.04, yoyo: true, repeat: 1 })
          .to(el, { x: -2, color: '#ff00c8', duration: 0.04, yoyo: true, repeat: 1 })
          .to(el, { x: 0, color: '', duration: 0.04 });
      };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: false,
        onEnter: () => {
          glitch();
          setInterval(glitch, 1800 + Math.random() * 1200);
        }
      });
    });
  }, [selector]);
};

// Glassmorphism para las cards (forzar con !important)
const glassStyles = {
  background: 'rgba(255,255,255,0.18) !important',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1.5px solid rgba(255,255,255,0.22)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
};

// Eliminar el componente InteractiveParticles y aumentar partículas en GridRetroBackground

function App() {
  // Animación GSAP para las cards al hacer scroll (solo entrada, sin parallax)
  useEffect(() => {
    // ScrollSmoother eliminado para scroll nativo

    // SplitText + ScrollTrigger para títulos principales (fade + slide + rotación 3D + stagger)
    const titles = [
      '#main-title',
      '#about-title',
      '#skills-title',
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

    // Subtítulos y frases importantes: fade + escala + desenfoque
    const subtitles = gsap.utils.toArray<HTMLElement>([
      '.subtitle-important',
      '.about-section p.text-xl',
      '.about-section p.text-lg.font-semibold',
      '.skills-section .text-2xl',
      '.projects-section .text-xl',
      '.connect-section .text-xl'
    ]);
    subtitles.forEach((el) => {
      gsap.set(el, { opacity: 0, scale: 0.85, filter: 'blur(6px)' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    });

    // Párrafos destacados: fade + slide + cambio de color
    const highlights = gsap.utils.toArray<HTMLElement>([
      '.about-section p.text-gray-600',
      '.projects-section p.text-gray-700',
      '.connect-section p.text-xl'
    ]);
    highlights.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 30, color: '#6b7280' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            color: '#111827',
            duration: 0.9,
            ease: 'power2.out'
          });
        }
      });
    });

    // Animación de entrada para las cards (retro-card, retro-terminal)
    const cards = gsap.utils.toArray<HTMLElement>('.retro-card, .retro-terminal');
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.92, boxShadow: '0 0 0 0 rgba(0,0,0,0)' });
    cards.forEach((el) => {
      // Animación de entrada con escala y sombra
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            duration: 1.1,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'transform,boxShadow'
          });
        }
      });
    });

    // Animación de entrada para los tech tags de proyectos
    const techTags = gsap.utils.toArray<HTMLElement>('.project-tech-tag');
    gsap.set(techTags, { opacity: 0, y: 24 });
    techTags.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.04,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    });

    // Animación de entrada para las secciones principales
    const sections = gsap.utils.toArray<HTMLElement>([
      '.hero-section',
      '.about-section',
      '.skills-section',
      '.projects-section',
      '.connect-section'
    ]);
    gsap.set(sections, { opacity: 0, y: 60, scale: 0.98 });
    sections.forEach((el) => {
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

  // Usar hooks para efectos
  useRevealMask('.project-icon-reveal');
  // useGlitchEffect('#main-title, #about-title, #skills-title, #projects-title, #connect-title'); // Eliminado

  return (
    <div id="smooth-wrapper">
      <GridRetroBackground />
      <div id="smooth-content" className="bg-transparent text-gray-900 font-mono">
        {/* Hero Section */}
        <motion.section 
          className="hero-section min-h-screen flex flex-col justify-center items-center relative px-4"
          // Quitar initial/animate/variants para evitar salto
        >
          <div 
            className="retro-terminal max-w-4xl w-full p-8 md:p-12"
          >
            <motion.div className="mb-8">
              <div className="flex items-center mb-6 text-gray-700">
                <Monitor className="mr-3" size={24} />
                <span className="text-lg">SYSTEM READY</span>
                <motion.span 
                  className="ml-3 w-3 h-6 bg-gray-800 inline-block"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            <motion.div className="mb-8">
              <motion.h1 
                id="main-title"
                className="text-6xl md:text-8xl font-bold mb-4 text-gray-900 tracking-wider"
                style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                GONZALO
              </motion.h1>
              <motion.div 
                className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 mb-6"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 2, duration: 1 }}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xl md:text-2xl text-gray-700 mb-4 font-semibold">
                {'> '}INGENIERO EN COMPUTACIÓN
              </p>
              <p className="text-lg text-gray-600 mb-2">
                {'> '}DESARROLLADOR DE SOFTWARE
              </p>
              <p className="text-gray-600">
                Construyendo el futuro, una línea de código a la vez
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#projects-section"
                className="retro-button bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 font-bold tracking-wide"
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                VER PROYECTOS
              </motion.a>
              <motion.a
                href="#connect-title"
                className="retro-button bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 font-bold tracking-wide"
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                CONTACTO
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
        {/* About Section */}
        <motion.section 
          className="about-section py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="mb-16">
              <h2 id="about-title" className="text-4xl md:text-6xl font-bold mb-4 text-center text-gray-900 tracking-wider">
                ABOUT.EXE
              </h2>
              <motion.div 
                className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 max-w-xs mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="retro-terminal p-8"
                variants={itemVariants}
                whileHover={{ scale: 1.015, rotateY: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              >
                <div className="flex items-center mb-6 text-gray-700 mt-4">
                  <User className="mr-3" size={24} />
                  <span className="font-bold">USER_PROFILE.DAT</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Apasionado por el desarrollo Frontend y las tecnologías modernas. <br/>
                  Explorando React Native y Expo para aplicaciones móviles. <br/>
                  Aprendiendo desarrollo Backend para ser un desarrollador full-stack. <br/>
                  Me encanta crear interfaces limpias y funcionales con Bootstrap y Next.js. <br/>
                  Abierto a nuevas oportunidades y retos.
                </p>
                <div className="flex items-center text-gray-600">
                  <Zap className="mr-2" size={20} />
                  <span className="font-semibold">ESTADO: SIEMPRE APRENDIENDO</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 gap-6"
                variants={itemVariants}
              >
                {[
                  { icon: Code, label: "DEVELOPMENT", value: "3+ YEARS" },
                  { icon: Database, label: "DATABASES", value: "SQL/NOSQL" },
                  { icon: Globe, label: "WEB STACK", value: "FULL STACK" },
                  { icon: Terminal, label: "DEVOPS", value: "CI/CD" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="retro-card p-6 text-center"
                    whileHover={{ scale: 1.025, rotateX: 2 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  >
                    <motion.div
                      className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-900 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="text-gray-900 font-bold mb-2 text-sm">{item.label}</h3>
                    <p className="text-gray-600 text-sm font-semibold">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
        {/* Skills Section */}
        <motion.section 
          className="skills-section py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              id="skills-title"
              className="text-4xl md:text-6xl font-bold mb-16 text-center text-gray-900 tracking-wider"
              variants={itemVariants}
            >
              HABILIDADES
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: "Front-End",
                  skills: ["HTML5", "CSS", "JavaScript", "React", "Next.js", "Bootstrap"],
                  icon: Monitor
                },
                {
                  category: "Back-End",
                  skills: ["Firebase", "Supabase", "Python"],
                  icon: Cpu
                },
                {
                  category: "Herramientas y Software",
                  skills: ["Git", "GitHub", "Visual Studio Code", "Linux", "Expo", "React Native"],
                  icon: HardDrive
                }
              ].map((category, index) => (
                <motion.div
                  key={category.category}
                  className="retro-terminal p-8"
                  variants={itemVariants}
                  whileHover={{ y: -4, rotateY: 2 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center mr-4"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <category.icon className="text-white" size={20} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {category.category}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.1 }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-gray-800 mr-3 rounded-full"
                          whileHover={{ scale: 1.2 }}
                        />
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        {/* Projects Section */}
        <motion.section 
          id="projects-section"
          className="projects-section py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-16 text-center text-gray-900 tracking-wider"
              variants={itemVariants}
            >
              PROJECTS.DIR
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Farmacia App",
                  description: "Aplicación web para encontrar farmacias disponibles en Chile, ver estadísticas y contactar farmacias de turno. Utiliza datos oficiales del Ministerio de Salud de Chile.",
                  tech: ["React", "Tailwind CSS", "Vite"],
                  status: "ACTIVO",
                  statusColor: "bg-gray-800",
                  demo: "https://farmacias-app-chile.vercel.app/",
                  repo: "https://github.com/GnzaDev/Farmacias-APP-Chile"
                },
                {
                  title: "ForumSpace",
                  description: "Foro web desarrollado con Django y MySQL. Permite a los usuarios crear temas, responder, gestionar perfiles y explorar discusiones en una plataforma sencilla y funcional.",
                  tech: ["Django", "MySQL", "Python", "HTML"],
                  status: "ACTIVO",
                  statusColor: "bg-gray-800",
                  repo: "https://github.com/GnzaDev/ForumSpace-django-mysql"
                },
                {
                  title: "StreamBot Discord",
                  description: "Bot para Discord que permite gestionar y anunciar transmisiones en vivo de Twitch y YouTube en servidores de Discord. Incluye comandos personalizados y notificaciones automáticas.",
                  tech: ["Node.js", "Discord.js", "JavaScript"],
                  status: "ACTIVO",
                  statusColor: "bg-gray-800",
                  repo: "https://github.com/GnzaDev/StreamBotDiscord"
                },
                {
                  title: "HuellaSegura",
                  description: "Aplicación móvil estilo Waze, pero exclusiva para mascotas. Permite a los usuarios reportar, ubicar y recibir alertas sobre mascotas perdidas, avistamientos y puntos de interés animal en tiempo real.",
                  tech: ["React Native", "Expo", "Firebase"],
                  status: "EN DESARROLLO",
                  statusColor: "bg-gray-800",
                  repo: "https://github.com/GnzaDev/react-native-huellasegura"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  className="retro-terminal p-8 group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className={`px-3 py-1 text-xs font-bold text-white rounded ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="project-tech-tag px-3 py-1 bg-gray-200 text-gray-800 text-sm font-semibold rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 font-bold transition-colors"
                        whileHover={{ scale: 1.06, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        DEMO →
                      </motion.a>
                    )}
                    {project.repo && (
                      <motion.a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 font-bold transition-colors"
                        whileHover={{ scale: 1.06, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        CÓDIGO FUENTE →
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        {/* Contact Section */}
        <motion.section 
          className="connect-section py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              id="connect-title"
              className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 tracking-wider"
              variants={itemVariants}
            >
              CONNECT.BAT
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-700 mb-12"
              variants={itemVariants}
            >
              ¿Listo para colaborar? Construyamos algo extraordinario juntos.
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row justify-center items-center gap-8"
              variants={itemVariants}
            >
              <motion.a
                href="mailto:bustamantegonzalo208@gmail.com"
                className="retro-card p-8 block group"
                whileHover={{ scale: 1.025, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Mail className="text-white" size={28} />
                </motion.div>
                <span className="text-gray-900 font-bold text-lg block mb-2">EMAIL</span>
              </motion.a>
              <motion.a
                href="https://github.com/GnzaDev"
                target="_blank"
                rel="noopener noreferrer"
                className="retro-card p-8 block group"
                whileHover={{ scale: 1.025, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Github className="text-white" size={28} />
                </motion.div>
                <span className="text-gray-900 font-bold text-lg block mb-2">GITHUB</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-4 text-center text-gray-500 text-sm">
          Desarrollado por Gonzalo Bustamante © 2024
        </footer>
      </div>
      {/* <InteractiveParticles /> */}
    </div>
  );
}

export default App;