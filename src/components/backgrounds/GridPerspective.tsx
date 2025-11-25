// Opción 1: Grid con perspectiva 3D estilo años 80/90
export const GridPerspective = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)',
          perspective: '1000px',
        }}
      >
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'rotateX(60deg) translateZ(-200px)',
            transformOrigin: 'center bottom',
          }}
        />
      </div>
    </div>
  );
};
