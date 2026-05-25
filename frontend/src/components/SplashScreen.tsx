import React, { useEffect, useState, useCallback } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);

  const handleSkip = useCallback(() => {
    setIsSkipping(true);
    setTimeout(() => onComplete(), 500); // 500ms fade out
  }, [onComplete]);

  useEffect(() => {
    // 1. Listen for ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 2. Ping backend to wake it up
    let isBackendReady = false;
    const wakeBackend = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        await fetch(`${apiUrl}/`);
      } catch (e) {
        // ignore
      }
    };
    wakeBackend();

    // 3. Smooth Progress Logic (Fast loading simulation)
    // We will guarantee the splash screen disappears after 4 seconds MAXIMUM.
    const maxWaitTime = 4000; 
    const tickRate = 20;
    const increment = 100 / (maxWaitTime / tickRate);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          handleSkip();
          return 100;
        }
        return next;
      });
    }, tickRate);

    // 4. Aggressive backend readiness check (if it wakes up faster than 4s)
    const checkReadyInterval = setInterval(async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/programs`, { method: 'GET' });
        if (res.ok) {
          isBackendReady = true;
          setProgress(100);
          handleSkip();
        }
      } catch (e) {
        // ignore
      }
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(progressInterval);
      clearInterval(checkReadyInterval);
    };
  }, [handleSkip]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-display transition-opacity duration-500 overflow-hidden ${isSkipping ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-pink/10 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute w-[200vw] h-[200vh] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] animate-spin-slow pointer-events-none" style={{ animationDuration: '60s' }} />

      {/* Central Visual */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Abstract Geometry */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 border-[1px] border-brand-pink/20 rounded-full animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-2 border-[1px] border-brand-purple/30 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
          <div className="absolute inset-4 border-[2px] border-dashed border-brand-pink/50 rounded-full animate-[spin_6s_linear_infinite]" />
          
          {/* Inner Core Pulse */}
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-brand-pink to-brand-purple rounded-full blur-[8px] animate-pulse" />
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full absolute mix-blend-overlay shadow-[0_0_40px_#ec4899]" />
        </div>

        {/* Branding Typography */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-2" style={{ textShadow: '0 4px 20px rgba(236,72,153,0.4)' }}>
            G<span className="text-brand-pink">-</span>CLICK
          </h1>
          <p className="text-[10px] md:text-xs tracking-[0.4em] text-gray-400 font-bold uppercase">
            Foundation Ecosystem
          </p>
        </div>

        {/* Minimalist Progress */}
        <div className="w-64 md:w-80 space-y-3">
          <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-pink to-brand-purple transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            <span>Booting Sequence</span>
            <span className="text-brand-pink">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Skip Button for Mobile / Prompt for Desktop */}
        <button 
          onClick={handleSkip}
          className="mt-16 group flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-all backdrop-blur-md"
        >
          <span>Skip Animation</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-[9px] text-gray-500 group-hover:text-white group-hover:border-white/40 transition-colors">ESC</kbd>
        </button>

      </div>
    </div>
  );
};
