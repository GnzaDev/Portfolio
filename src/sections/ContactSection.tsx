import { motion, Variants } from 'framer-motion';
import { Mail, Github } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

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

export const ContactSection = () => {
  return (
    <motion.section
      className="connect-section py-12 sm:py-16 md:py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      role="region"
      aria-labelledby="connect-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          id="connect-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-gray-900 tracking-wider"
          variants={itemVariants}
        >
          CONNECT.BAT
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-12 px-4"
          variants={itemVariants}
        >
          ¿Listo para colaborar? Construyamos algo extraordinario juntos.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-6 md:gap-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="retro-card p-6 sm:p-8 block group flex-1"
            whileHover={{ scale: 1.025, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            aria-label={`Enviar email a ${personalInfo.email}`}
          >
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg bg-gray-900 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              aria-hidden="true"
            >
              <Mail className="text-white" size={24} />
            </motion.div>
            <span className="text-gray-900 font-bold text-base sm:text-lg block mb-1 sm:mb-2">EMAIL</span>
            <span className="text-gray-600 text-xs sm:text-sm">{personalInfo.email}</span>
          </motion.a>
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-card p-6 sm:p-8 block group flex-1"
            whileHover={{ scale: 1.025, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            aria-label="Visitar perfil de GitHub"
          >
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg bg-gray-900 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              aria-hidden="true"
            >
              <Github className="text-white" size={24} />
            </motion.div>
            <span className="text-gray-900 font-bold text-base sm:text-lg block mb-1 sm:mb-2">GITHUB</span>
            <span className="text-gray-600 text-xs sm:text-sm">{personalInfo.githubUsername}</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};
