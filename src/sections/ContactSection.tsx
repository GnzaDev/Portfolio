import React from 'react';
import { personalInfo } from '../data/portfolio';
import { MagneticButton, ScrambleText, LocalTime } from '../components';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="fixed bottom-0 left-0 w-full z-0 h-screen bg-[var(--bg-elevated)] flex flex-col justify-between px-6 md:px-12 lg:px-24 py-12 md:py-20 overflow-hidden">
      
      {/* Decorative large noise bg specifically for footer to distinguish it */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.6\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* Top row */}
      <div className="w-full flex justify-between items-start z-10">
        <span className="font-mono text-sm text-[var(--text-muted)] tracking-widest">05</span>
        <LocalTime />
      </div>

      {/* Massive Center Typography */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 w-full">
        <h2 className="font-heading text-[clamp(4rem,15vw,14rem)] font-black leading-[0.8] tracking-tighter text-[var(--text)] mb-8 w-full">
          LET'S WORK
        </h2>
        <p className="font-body text-lg md:text-xl text-[var(--text-secondary)] max-w-lg mb-12">
          ¿Tienes un proyecto en mente? Estoy abierto a nuevas oportunidades y colaboraciones.
        </p>
        <MagneticButton
          href={`mailto:${personalInfo.email}`}
          variant="outline"
          className="px-10 py-5 text-sm bg-[var(--bg)] border-[var(--border)] hover:border-[var(--text)]"
        >
          ENVIAR EMAIL
        </MagneticButton>
      </div>

      {/* Bottom Footer Row */}
      <div className="w-full z-10">
        <div className="w-full h-px bg-[var(--border)] mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex gap-8">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="font-heading text-xl md:text-2xl font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              <ScrambleText text="GitHub" triggerOnHover />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="font-heading text-xl md:text-2xl font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              <ScrambleText text="LinkedIn" triggerOnHover />
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right">
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
              © {new Date().getFullYear()} Gonzalo Bustamante
            </p>
            <span className="hidden md:block text-[var(--border)]">|</span>
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Designed & Built with ♥
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};