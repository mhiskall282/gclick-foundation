import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Terminal } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark-obsidian text-white relative overflow-hidden ambient-grain supabase-grid">
      {/* Decorative backdrop glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl px-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-brand-dark-card border border-brand-dark-border rounded-2xl flex items-center justify-center shadow-2xl animate-float-slow">
            <Terminal className="h-10 w-10 text-brand-pink" />
          </div>
        </div>
        
        <h1 className="text-8xl md:text-9xl font-display font-extrabold text-white tracking-tighter mb-4 opacity-90">
          404
        </h1>
        
        <div className="bg-brand-dark-card border border-brand-dark-border rounded-xl p-4 inline-block mb-8 shadow-xl text-left">
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            <span className="ml-2">server_logs.sh</span>
          </div>
          <div className="font-mono text-sm md:text-base">
            <span className="text-brand-pink">~/gclick/system</span>
            <span className="text-white"> $ </span>
            <span className="text-gray-300">locate requested_page</span>
            <br />
            <span className="text-red-400 mt-2 block">
              &gt; Error: 404_NOT_FOUND
            </span>
            <span className="text-gray-400 block mt-1">
              &gt; The page you are looking for has vanished into the digital void.
            </span>
            <span className="text-brand-pink mt-2 inline-block animate-cursor-blink pr-1">_</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-brand-pink font-display rounded-full hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 hover:-translate-y-1"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Base Station
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
