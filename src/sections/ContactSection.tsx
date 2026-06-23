import { Mail, Github, Linkedin } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';
import { useState, useEffect } from 'react';
import { useRevealAnimation } from '../hooks/useRevealAnimation';

const ObfuscatedEmail = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = 'bustamantegonzalo208';
    const domain = 'gmail';
    const tld = 'com';
    setEmail(`${user}@${domain}.${tld}`);
  }, []);

  if (!email) {
    return <span className="text-gray-600 text-xs sm:text-sm">Cargando...</span>;
  }

  return (
    <span className="text-gray-600 text-xs sm:text-sm">{email}</span>
  );
};

export const ContactSection = () => {
  const sectionRef = useRevealAnimation<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="connect-section py-12 sm:py-16 md:py-20 px-4"
      role="region"
      aria-labelledby="connect-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="connect-title"
          className="reveal-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-gray-900 tracking-wider"
        >
          CONNECT.BAT
        </h2>

        <p className="reveal-item text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-12 px-4">
          ¿Listo para colaborar? Construyamos algo extraordinario juntos.
        </p>

        <div className="reveal-item flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-6 md:gap-8 max-w-3xl mx-auto">
          <div
            className="retro-card p-6 sm:p-8 flex-1 hover-lift"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg bg-gray-900 flex items-center justify-center" aria-hidden="true">
              <Mail className="text-white" size={24} />
            </div>
            <span className="text-gray-900 font-bold text-base sm:text-lg block mb-1 sm:mb-2">EMAIL</span>
            <ObfuscatedEmail />
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-card p-6 sm:p-8 flex-1 hover-lift"
            aria-label="Visitar perfil de GitHub"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg bg-gray-900 flex items-center justify-center" aria-hidden="true">
              <Github className="text-white" size={24} />
            </div>
            <span className="text-gray-900 font-bold text-base sm:text-lg block mb-1 sm:mb-2">GITHUB</span>
            <span className="text-gray-600 text-xs sm:text-sm">{personalInfo.githubUsername}</span>
          </a>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-card p-6 sm:p-8 flex-1 hover-lift"
            aria-label="Visitar perfil de LinkedIn"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg bg-gray-900 flex items-center justify-center" aria-hidden="true">
              <Linkedin className="text-white" size={24} />
            </div>
            <span className="text-gray-900 font-bold text-base sm:text-lg block mb-1 sm:mb-2">LINKEDIN</span>
            <span className="text-gray-600 text-xs sm:text-sm">Gonzalo Bustamante</span>
          </a>
        </div>
      </div>
    </section>
  );
};