import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Terminal } from 'lucide-react';

export const LoadingSpinner = () => {
  const [dots, setDots] = React.useState('');
  const [loadingText, setLoadingText] = React.useState('INICIALIZANDO SISTEMA');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    const textInterval = setInterval(() => {
      const texts = [
        'INICIALIZANDO SISTEMA',
        'CARGANDO MÓDULOS',
        'VERIFICANDO RECURSOS',
        'PREPARANDO INTERFAZ'
      ];
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 1200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
      background: 'radial-gradient(circle at 60% 40%, #f8fafc 0%, #e5e7eb 100%)'
    }}>
      {/* Grid retro background */}
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Subtle scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
        }} />
      </div>

      <div className="retro-terminal max-w-2xl w-full mx-4 p-8 relative z-10">
        <div className="space-y-4">
          {/* Terminal header */}
          <div className="flex items-center mb-6 text-gray-700">
            <Monitor className="mr-3" size={20} aria-hidden="true" />
            <span className="text-sm font-bold">PORTFOLIO.EXE v1.0</span>
          </div>

          {/* Loading bar */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 text-sm mb-2">
              <Terminal className="mr-2" size={16} aria-hidden="true" />
              <span className="font-mono">{loadingText}{dots}</span>
            </div>

            <div className="h-8 bg-gray-200 border-3 border-gray-400 relative overflow-hidden rounded">
              <motion.div
                className="h-full bg-gradient-to-r from-gray-700 to-gray-900"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Animated scanline on progress bar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* Loading messages */}
          <div className="space-y-1 text-xs font-mono text-gray-600 mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {'>'} Cargando componentes React...
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {'>'} Inicializando animaciones GSAP...
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {'>'} Preparando portfolio...
            </motion.div>
          </div>

          {/* Blinking cursor */}
          <div className="flex items-center mt-4">
            <span className="text-gray-700 text-sm mr-1">{'>'}</span>
            <motion.span
              className="w-2 h-4 bg-gray-800 inline-block"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
