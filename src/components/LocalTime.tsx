import React, { useState, useEffect } from 'react';

export const LocalTime: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'America/Santiago', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(now));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // To prevent hydration mismatch in SSR (not an issue here but good practice)
  if (!time) return null;

  return (
    <div className="flex items-center gap-4 font-mono text-xs text-[var(--text-muted)] tracking-widest">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        <span className="uppercase text-[var(--text)] opacity-70 font-semibold tracking-wide">Available</span>
      </div>
      <span className="opacity-30">—</span>
      <span className="uppercase tracking-widest">SCL {time}</span>
    </div>
  );
};
