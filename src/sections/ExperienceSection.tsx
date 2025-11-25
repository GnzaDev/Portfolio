import { motion, Variants } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { education, experience } from '../data/portfolio';

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

export const ExperienceSection = () => {
  return (
    <motion.section
      id="experience"
      className="experience-section py-12 sm:py-16 md:py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      role="region"
      aria-labelledby="experience-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="mb-10 sm:mb-12 md:mb-16">
          <h2 id="experience-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-center text-gray-900 tracking-wider">
            EXPERIENCIA.LOG
          </h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 max-w-xs mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            aria-hidden="true"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Educación */}
          <motion.div
            className="retro-terminal p-6 sm:p-8"
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <div className="flex items-center mb-4 md:mb-6 text-gray-700">
              <GraduationCap className="mr-2 md:mr-3" size={24} aria-hidden="true" />
              <h3 className="text-xl sm:text-2xl font-bold">EDUCACIÓN</h3>
            </div>

            <div className="space-y-4 md:space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-4">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                    {edu.degree}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">{edu.institution}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{edu.period}</p>
                  <p className="text-sm sm:text-base text-gray-700 mt-2 sm:mt-3 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experiencia */}
          <motion.div
            className="retro-terminal p-6 sm:p-8"
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <div className="flex items-center mb-4 md:mb-6 text-gray-700">
              <Briefcase className="mr-2 md:mr-3" size={24} aria-hidden="true" />
              <h3 className="text-xl sm:text-2xl font-bold">EXPERIENCIA</h3>
            </div>

            <div className="space-y-4 md:space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-800 pl-4">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                    {exp.position}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">{exp.company}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{exp.period}</p>
                  <ul className="text-sm sm:text-base text-gray-700 mt-2 sm:mt-3 space-y-1 sm:space-y-2 list-disc list-inside">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
