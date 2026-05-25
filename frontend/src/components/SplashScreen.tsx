import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYS.CORE');

  useEffect(() => {
    // Ping backend to wake it up
    const wakeBackend = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        await fetch(`${apiUrl}/`);
      } catch (e) {
        console.error('Wake ping failed', e);
      }
    };
    wakeBackend();

    // Fake progress that slows down at 90% until backend is assumed ready
    // We'll give it a max duration of 50 seconds if it's spinning up,
    // but we'll simulate a cool progress bar regardless.
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 5;
      if (currentProgress > 95) currentProgress = 95; // Hold at 95%
      
      setProgress(currentProgress);

      if (currentProgress > 20) setStatusText('ESTABLISHING SECURE CONNECTION');
      if (currentProgress > 50) setStatusText('LOADING G-CLICK CLUSTER DATA');
      if (currentProgress > 80) setStatusText('AWAITING RENDER NODE WAKEUP');

    }, 500);

    // After 2.5 seconds, we do a real check every 3 seconds to see if /api/programs responds
    const checkReadyInterval = setInterval(async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/programs`, { method: 'GET', headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          setProgress(100);
          setStatusText('NODE CONNECTED. DECRYPTING UI...');
          clearInterval(interval);
          clearInterval(checkReadyInterval);
          setTimeout(() => onComplete(), 800);
        }
      } catch (e) {
        // Still waking up
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(checkReadyInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0c] flex flex-col items-center justify-center font-mono overflow-hidden">
      
      {/* Decorative grids */}
      <div className="absolute inset-0 opacity-20 supabase-grid pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pink/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
        
        {/* Cyberpunk Glitch Text */}
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple tracking-tighter mb-2 animate-pulse" style={{ textShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
          G-CLICK
        </h1>
        <h2 className="text-white tracking-[0.3em] text-sm md:text-base font-bold mb-16 opacity-80">
          FOUNDATION
        </h2>

        {/* Loader Core */}
        <div className="w-full relative">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] text-brand-pink font-bold uppercase tracking-widest">{statusText}</span>
            <span className="text-xs text-white font-mono">{Math.floor(progress)}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="h-1.5 w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-pink transition-all duration-300 ease-out shadow-[0_0_15px_rgba(236,72,153,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-3 text-[9px] text-gray-500 uppercase tracking-widest">
            <span>Server: Render_EU_West</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-ping" /> Node Sleep Check
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );
};
