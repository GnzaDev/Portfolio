import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { TypingEffect } from '../components';
import { personalInfo } from '../data/portfolio';

export const HeroSection = () => {
  return (
    <motion.section
      className="hero-section min-h-[calc(85vh-4rem)] flex flex-col justify-center items-center relative px-4 py-6 sm:py-8"
      role="banner"
      aria-label="Sección principal"
    >
      <div className="retro-terminal max-w-4xl w-full p-6 sm:p-8 md:p-10">
        <motion.div className="mb-4 md:mb-6">
          <div className="flex items-center mb-3 md:mb-4 text-gray-700">
            <Monitor className="mr-2 md:mr-3" size={20} aria-hidden="true" />
            <span className="text-base md:text-lg">SYSTEM READY</span>
            <motion.span
              className="ml-2 md:ml-3 w-2 md:w-3 h-5 md:h-6 bg-gray-800 inline-block"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        <motion.div className="mb-5 md:mb-6">
          <h1
            id="main-title"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 text-gray-900 tracking-wider break-words"
          >
            <TypingEffect text={personalInfo.name} delay={2.5} />
          </h1>
          <motion.div
            className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 mb-3 md:mb-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 2, duration: 1 }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.div className="mb-5 md:mb-6">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 md:mb-4 font-semibold">
            {'> '}<TypingEffect text={personalInfo.title} delay={3.5} />
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-2">
            {'> '}<TypingEffect text={personalInfo.subtitle} delay={4.5} />
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            <TypingEffect text={personalInfo.tagline} delay={5.5} />
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap gap-3 md:gap-4">
          <motion.a
            href="#projects"
            className="retro-button bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 font-bold tracking-wide text-sm sm:text-base"
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            aria-label="Ver proyectos"
          >
            VER PROYECTOS
          </motion.a>
          <motion.a
            href="#contact"
            className="retro-button bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 font-bold tracking-wide text-sm sm:text-base"
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            aria-label="Ir a contacto"
          >
            CONTACTO
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};
