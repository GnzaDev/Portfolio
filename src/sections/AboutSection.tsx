import { motion, Variants } from 'framer-motion';
import { Code, Terminal, Database, Globe, User, Zap } from 'lucide-react';
import { about, stats } from '../data/portfolio';

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
  'DEVELOPMENT': Code,
  'DATABASES': Database,
  'WEB STACK': Globe,
  'DEVOPS': Terminal
};

export const AboutSection = () => {
  return (
    <motion.section
      id="about"
      className="about-section py-12 sm:py-16 md:py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      role="region"
      aria-labelledby="about-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="mb-10 sm:mb-12 md:mb-16">
          <h2 id="about-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-center text-gray-900 tracking-wider">
            ABOUT.EXE
          </h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 max-w-xs mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            aria-hidden="true"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            className="retro-terminal p-6 sm:p-8"
            variants={itemVariants}
            whileHover={{ scale: 1.015, rotateY: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <div className="flex items-center mb-4 md:mb-6 text-gray-700 mt-4">
              <User className="mr-2 md:mr-3" size={20} aria-hidden="true" />
              <span className="font-bold text-sm sm:text-base">USER_PROFILE.DAT</span>
            </div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 md:mb-6 whitespace-pre-line">
              {about.description}
            </p>
            <div className="flex items-center text-gray-600">
              <Zap className="mr-2" size={18} aria-hidden="true" />
              <span className="font-semibold text-sm sm:text-base">ESTADO: {about.status}</span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6"
            variants={itemVariants}
          >
            {stats.map((item, index) => {
              const Icon = iconMap[item.label] || Code;
              return (
                <motion.div
                  key={item.label}
                  className="retro-card p-4 sm:p-6 text-center"
                  whileHover={{ scale: 1.025, rotateX: 2 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                >
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-lg bg-gray-900 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    aria-hidden="true"
                  >
                    <Icon className="text-white" size={20} />
                  </motion.div>
                  <h3 className="text-gray-900 font-bold mb-1 sm:mb-2 text-xs sm:text-sm">{item.label}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-semibold">{item.value}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
