import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Monitor, Terminal } from 'lucide-react';

export const LoadingSpinner = () => {
  const [dots, setDots] = React.useState('');
  const [loadingText, setLoadingText] = React.useState('INICIALIZANDO SISTEMA');
  const progressRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: 1.5, ease: 'easeInOut' });
      }
      if (scanRef.current) {
        gsap.to(scanRef.current, { x: '200%', duration: 1.5, repeat: -1, ease: 'linear' });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
      background: 'radial-gradient(circle at 60% 40%, #f8fafc 0%, #e5e7eb 100%)'
    }}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
        }} />
      </div>

      <div className="retro-terminal max-w-2xl w-full mx-4 p-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center mb-6 text-gray-700">
            <Monitor className="mr-3" size={20} aria-hidden="true" />
            <span className="text-sm font-bold">PORTFOLIO.EXE v1.0</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-700 text-sm mb-2">
              <Terminal className="mr-2" size={16} aria-hidden="true" />
              <span className="font-mono">{loadingText}{dots}</span>
            </div>

            <div className="h-8 bg-gray-200 border-3 border-gray-400 relative overflow-hidden rounded">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-gray-700 to-gray-900"
                style={{ width: '0%' }}
              />
              <div
                ref={scanRef}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                style={{ x: '-100%' }}
              />
            </div>
          </div>

          <div className="space-y-1 text-xs font-mono text-gray-600 mt-6">
            <div className="opacity-0 animate-[fadeIn_0.3s_ease_0.2s_forwards]">
              {'>'} Cargando componentes React...
            </div>
            <div className="opacity-0 animate-[fadeIn_0.3s_ease_0.5s_forwards]">
              {'>'} Inicializando animaciones GSAP...
            </div>
            <div className="opacity-0 animate-[fadeIn_0.3s_ease_0.8s_forwards]">
              {'>'} Preparando portfolio...
            </div>
          </div>

          <div className="flex items-center mt-4">
            <span className="text-gray-700 text-sm mr-1">{'>'}</span>
            <span className="w-2 h-4 bg-gray-800 inline-block animate-pulse" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};