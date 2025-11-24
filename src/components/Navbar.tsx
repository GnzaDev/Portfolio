import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Terminal, Menu, X } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolio';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      // Animación de entrada del navbar
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 2 }
      );
    }
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          menuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b-4 border-gray-700 shadow-2xl"
      role="navigation"
      aria-label="Navegación principal"
      style={{ position: 'fixed' }}
    >
      {/* Terminal dots - estilo retro */}
      <div className="absolute top-3 left-4 flex space-x-2 z-10">
        <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600" aria-hidden="true" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 pl-16 sm:pl-0">
          {/* Logo - Estilo Terminal */}
          <a
            href="#main-content"
            className="flex items-center space-x-2 text-white font-bold text-base sm:text-lg tracking-wider hover:text-gray-300 transition-colors group"
            onClick={(e) => handleLinkClick(e, '#main-content')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 border-2 border-gray-600 flex items-center justify-center group-hover:border-gray-400 transition-colors">
              <Terminal size={18} aria-hidden="true" />
            </div>
            <span className="hidden sm:inline">{'>'} {personalInfo.name}.DEV</span>
            <span className="sm:hidden">{'>'} G.DEV</span>
            <motion.span
              className="w-2 h-4 bg-white inline-block ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              aria-hidden="true"
            />
          </a>

          {/* Desktop Menu - Estilo DOS */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold text-gray-300 bg-gray-800 hover:bg-white hover:text-gray-900 transition-all duration-200 border-2 border-gray-700 hover:border-gray-900 relative group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gray-500 group-hover:text-gray-900 mr-1">[{index + 1}]</span>
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button - Estilo Retro */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white bg-gray-800 hover:bg-gray-700 transition-colors border-2 border-gray-600"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu - Estilo Terminal */}
        <div
          ref={menuRef}
          className="md:hidden overflow-hidden bg-gray-800"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="py-3 space-y-1 border-t-2 border-gray-700">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-4 py-3 text-sm font-bold text-gray-300 hover:bg-white hover:text-gray-900 transition-all duration-200 border-l-4 border-transparent hover:border-gray-900"
              >
                <span className="text-gray-500 mr-2">{'>'}</span>
                [{index + 1}] {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
