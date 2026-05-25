import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const columns = Math.floor(canvas.width / 20);
    const yPositions = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 12, 13, 0.12)'; // Dark Obsidian background match
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#DB2777'; // Brand Pink
      ctx.font = '11px monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        const x = i * 20;
        const y = yPositions[i];

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 15;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] z-0"
    />
  );
};

const terminalSteps = [
  { text: '✓ Connected to regional G-Click cluster node-01', delay: 800 },
  { text: '✓ Syncing curriculum assets with IPFS...', delay: 600 },
  { text: '✓ Initializing development sandbox workspaces...', delay: 900 },
  { text: '✓ 12-Week Mentorship cohort: ONLINE', delay: 500 },
  { text: '$ npm run deploy:production', delay: 1000 },
  { text: '🚀 Portfolios compiled & pushed to Vercel CDN', delay: 800 },
  { text: '✓ Deploy code check: PASS', delay: 500 },
  { text: '✓ Deployment successful! Cohort active.', delay: 700 },
  { text: '----------------------------------------------', delay: 1200 },
  { text: '$ gclick init --cohort="Winneba"', delay: 800 },
];

const TerminalConsole = () => {
  const [logs, setLogs] = useState<string[]>([
    '$ gclick init --cohort="Winneba"',
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timer: number;
    const executeStep = (stepIdx: number) => {
      if (stepIdx >= terminalSteps.length) {
        setLogs(['$ gclick init --cohort="Winneba"']);
        setCurrentStep(0);
        executeStep(0);
        return;
      }

      timer = setTimeout(() => {
        setLogs(prev => {
          if (stepIdx === terminalSteps.length - 1) {
            return ['$ gclick init --cohort="Winneba"'];
          }
          return [...prev, terminalSteps[stepIdx].text];
        });
        setCurrentStep(stepIdx + 1);
      }, terminalSteps[stepIdx].delay);
    };

    executeStep(currentStep);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full bg-brand-dark-card border border-brand-dark-border rounded-2xl overflow-hidden shadow-2xl crt-overlay">
      {/* Window Header */}
      <div className="h-11 bg-brand-dark-obsidian border-b border-brand-dark-border flex items-center justify-between px-4">
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
        </div>
        <span className="text-xs text-gray-500 font-semibold flex items-center">
          <Terminal className="h-3.5 w-3.5 mr-1.5 text-brand-pink" />
          GClickConsole.sh
        </span>
        <span className="w-12" />
      </div>

      {/* Console log content */}
      <div className="p-6 font-mono text-[10px] sm:text-xs leading-relaxed text-gray-400 h-64 overflow-y-auto space-y-2 text-left">
        {logs.map((log, i) => {
          const isCommand = log.startsWith('$');
          return (
            <div key={i} className={isCommand ? 'text-brand-pink font-semibold' : 'text-gray-300'}>
              {log}
              {i === logs.length - 1 && <span className="animate-cursor-blink pl-1" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-brand-dark-obsidian flex items-center justify-center overflow-hidden py-32 supabase-grid">
      {/* Dynamic falling matrix rain */}
      <BinaryRain />

      {/* Decorative gradients */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left reveal-on-scroll">
            <span className="inline-flex items-center text-xs uppercase tracking-wider text-brand-pink font-bold bg-brand-pink/10 px-4 py-2 rounded-full border border-brand-pink/20">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Build the Future of Tech in Ghana
            </span>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
              Empowering Growth <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink via-purple-400 to-brand-purple">
                Through Digital Skills
              </span>
            </h1>
            
            <p className="max-w-xl text-gray-400 text-base md:text-lg leading-relaxed">
              We connect aspiring developers in Ghana with experienced global mentors, practical tools, and labs to accelerate their transition into industry leaders.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
              <a
                href="#programs"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-brand-pink to-brand-purple text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-pink/30"
              >
                Explore Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                to="/donate"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-brand-dark-card hover:bg-brand-pink/10 text-white font-semibold rounded-full border border-brand-pink/20 hover:border-brand-pink/40 transition-all duration-300 hover:scale-105"
              >
                Sponsor a Student
              </Link>
            </div>
          </div>

          {/* Right Column: Live CLI Boot Terminal */}
          <div className="lg:col-span-5 w-full reveal-on-scroll animate-float-slow">
            <TerminalConsole />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
