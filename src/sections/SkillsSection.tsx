import { motion, Variants } from 'framer-motion';
import { Monitor, Cpu, HardDrive, BookOpen } from 'lucide-react';
import { skills, learning } from '../data/portfolio';

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

const iconMap: Record<string, any> = {
  'Front-End': Monitor,
  'Back-End': Cpu,
  'Herramientas y Software': HardDrive
};

export const SkillsSection = () => {
  return (
    <motion.section
      id="skills"
      className="skills-section py-12 sm:py-16 md:py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      role="region"
      aria-labelledby="skills-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="skills-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-16 text-center text-gray-900 tracking-wider"
          variants={itemVariants}
        >
          HABILIDADES
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {skills.map((category) => {
            const Icon = iconMap[category.category] || Monitor;
            return (
              <motion.div
                key={category.category}
                className="retro-terminal p-6 sm:p-8"
                variants={itemVariants}
                whileHover={{ y: -4, rotateY: 2 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-900 flex items-center justify-center mr-3 sm:mr-4"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                  >
                    <Icon className="text-white" size={18} />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {category.category}
                  </h3>
                </div>
                <ul className="space-y-2 md:space-y-3" role="list">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: skillIndex * 0.1 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-gray-800 mr-2 md:mr-3 rounded-full flex-shrink-0"
                        whileHover={{ scale: 1.2 }}
                        aria-hidden="true"
                      />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
