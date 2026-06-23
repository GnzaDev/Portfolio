import { Code, Terminal, Database, Globe, User, Zap } from 'lucide-react';
import { about, stats } from '../data/portfolio';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import { ScrambleText } from '../components';

const iconMap: Record<string, React.ElementType> = {
  'DEVELOPMENT': Code,
  'DATABASES': Database,
  'WEB STACK': Globe,
  'DEVOPS': Terminal,
  'PROYECTOS': Code,
  'STACK': Globe,
  'FRONTEND': Terminal,
  'UBICACIÓN': Zap,
};

export const AboutSection = () => {
  const sectionRef = useRevealAnimation<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section py-12 sm:py-16 md:py-20 px-4"
      role="region"
      aria-labelledby="about-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal-item mb-10 sm:mb-12 md:mb-16">
          <h2 id="about-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-center text-gray-900 tracking-wider">
            <ScrambleText text="ABOUT.EXE" scrambleSpeed={1.5} />
          </h2>
          <div className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 max-w-xs mx-auto" aria-hidden="true" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="reveal-item retro-terminal p-6 sm:p-8">
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
          </div>

          <div className="reveal-item grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((item) => {
              const Icon = iconMap[item.label] || Code;
              return (
                <div
                  key={item.label}
                  className="retro-card p-4 sm:p-6 text-center hover-lift"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-lg bg-gray-900 flex items-center justify-center">
                    <Icon className="text-white" size={20} />
                  </div>
                  <h3 className="text-gray-900 font-bold mb-1 sm:mb-2 text-xs sm:text-sm">{item.label}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-semibold">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};