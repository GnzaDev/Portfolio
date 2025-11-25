// Opción 2: Grid + Scanlines CRT
export const GridWithScanlines = () => {
  return (
    <div className="fixed inset-0 -z-20">
      {/* Grid base */}
      <div 
        className="absolute inset-0"
        style={{
          background: '#f8fafc',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Scanlines CRT */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px)',
          backgroundSize: '100% 3px',
        }}
      />
      
      {/* Vignette sutil */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.05) 100%)',
        }}
      />
    </div>
  );
};
