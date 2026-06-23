import { GraduationCap, Briefcase } from 'lucide-react';
import { education, experience } from '../data/portfolio';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import { ScrambleText } from '../components';

export const ExperienceSection = () => {
  const sectionRef = useRevealAnimation<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section py-12 sm:py-16 md:py-20 px-4"
      role="region"
      aria-labelledby="experience-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal-item mb-10 sm:mb-12 md:mb-16">
          <h2 id="experience-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-center text-gray-900 tracking-wider">
            <ScrambleText text="EXPERIENCIA.LOG" scrambleSpeed={1.5} />
          </h2>
          <div className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 max-w-xs mx-auto" aria-hidden="true" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div
            className="reveal-item retro-terminal p-6 sm:p-8 hover-lift"
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
          </div>

          <div
            className="reveal-item retro-terminal p-6 sm:p-8 hover-lift"
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
          </div>
        </div>
      </div>
    </section>
  );
};