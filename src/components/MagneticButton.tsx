import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.4,
  className = '',
  variant = 'outline',
  onClick,
  href,
  target,
  rel,
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Magnetic quickTo
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * strength);
      yTo(y * strength);
    };

    // Advanced Fill Effect from mouse coordinates
    const handleMouseEnter = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      gsap.set(fill, { x: relX, y: relY, scale: 0, opacity: 1 });
      gsap.to(fill, {
        scale: 2.5,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Reset magnetic
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });

      // Deflate fill out to the mouse exit point
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      gsap.to(fill, {
        x: relX,
        y: relY,
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  // Variant styling
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--text)] text-[var(--bg)] border border-[var(--text)] hover:text-[var(--text)]';
      case 'outline':
      default:
        return 'bg-transparent text-[var(--text)] border border-[var(--border-hover)] backdrop-blur-md hover:text-[var(--bg)]';
    }
  };

  const content = (
    <div
      ref={btnRef}
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest overflow-hidden cursor-pointer pointer-events-auto transition-colors duration-300 group/btn ${getVariantClasses()} ${className}`}
    >
      {/* Fill element */}
      <span
        ref={fillRef}
        className={`absolute w-32 h-32 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 opacity-0 z-0 ${
          variant === 'primary' ? 'bg-[var(--bg)]' : 'bg-[var(--text)]'
        }`}
      />
      {/* Text layer */}
      <span className="relative z-10">{children}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }

  return <div onClick={onClick} style={{ display: 'inline-block' }}>{content}</div>;
};