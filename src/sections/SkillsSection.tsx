import { Monitor, Cpu, HardDrive } from 'lucide-react';
import { skills } from '../data/portfolio';
import { useRevealAnimation } from '../hooks/useRevealAnimation';

const iconMap: Record<string, React.ElementType> = {
  'Front-End': Monitor,
  'Back-End': Cpu,
  'Mobile': HardDrive,
  'Herramientas': Cpu,
};

export const SkillsSection = () => {
  const sectionRef = useRevealAnimation<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section py-12 sm:py-16 md:py-20 px-4"
      role="region"
      aria-labelledby="skills-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="skills-title"
          className="reveal-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-16 text-center text-gray-900 tracking-wider"
        >
          HABILIDADES
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {skills.map((category) => {
            const Icon = iconMap[category.category] || Monitor;
            return (
              <div
                key={category.category}
                className="reveal-item retro-terminal p-6 sm:p-8 hover-lift"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-900 flex items-center justify-center mr-3 sm:mr-4">
                    <Icon className="text-white" size={18} />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {category.category}
                  </h3>
                </div>
                <ul className="space-y-2 md:space-y-3" role="list">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-gray-800 mr-2 md:mr-3 rounded-full flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};