import React from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { projects } from '../data/portfolio';

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
  hidden: { 
    y: 50, 
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)'
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 12,
      duration: 0.8
    }
  }
};

export const ProjectsSection = () => {
  return (
    <motion.section
      id="projects"
      className="projects-section py-12 sm:py-16 md:py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      role="region"
      aria-labelledby="projects-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="projects-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-16 text-center text-gray-900 tracking-wider"
          variants={itemVariants}
        >
          PROJECTS.DIR
        </motion.h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} variants={itemVariants} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const ProjectCard = ({ project, variants }: { project: any; variants: Variants }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <motion.article
      ref={cardRef}
      className={`retro-terminal p-6 sm:p-8 group ${project.featured ? 'border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : ''}`}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {project.featured && (
        <div className="mb-4 flex items-center gap-2">
          <span className="px-4 py-2 text-xs font-bold text-gray-900 bg-yellow-400 border-2 border-gray-900">
            ⭐ PROYECTO DESTACADO
          </span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 md:mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{project.title}</h3>
        <span className="px-2 sm:px-3 py-1 text-xs font-bold text-white rounded bg-gray-800 whitespace-nowrap">
          {project.status}
        </span>
      </div>

      <p className="text-sm sm:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
        {project.tech.map((tech) => (
          <span key={tech} className="project-tech-tag px-2 sm:px-3 py-1 bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold rounded">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 md:gap-4">
        {project.demo && (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base text-gray-700 hover:text-gray-900 font-bold transition-colors"
            whileHover={{ scale: 1.06, x: 3 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Ver demo de ${project.title}`}
          >
            DEMO →
          </motion.a>
        )}
        {project.repo && (
          <motion.a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base text-gray-600 hover:text-gray-800 font-bold transition-colors"
            whileHover={{ scale: 1.06, x: 3 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Ver código fuente de ${project.title}`}
          >
            CÓDIGO FUENTE →
          </motion.a>
        )}
      </div>
    </motion.article>
  );
};
