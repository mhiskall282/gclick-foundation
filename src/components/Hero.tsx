import React from 'react';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-brand-dark-obsidian flex items-center justify-center overflow-hidden py-32 supabase-grid">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-emerald/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center text-xs uppercase tracking-wider text-brand-emerald font-bold bg-brand-emerald/10 px-4 py-2 rounded-full border border-brand-emerald/20">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Build the Future of Tech in Ghana
            </span>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
              Empowering Growth <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-emerald via-teal-300 to-brand-amber">
                Through Digital Skills
              </span>
            </h1>
            
            <p className="max-w-xl text-gray-400 text-base md:text-lg leading-relaxed">
              We connect aspiring developers in Ghana with experienced global mentors, practical tools, and labs to accelerate their transition into industry leaders.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
              <a
                href="#programs"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-brand-emerald hover:bg-brand-emerald/90 text-brand-dark-obsidian font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-pink/30"
              >
                Explore Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                to="/donate"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-brand-dark-card hover:bg-[#1E1E21] text-white font-semibold rounded-full border border-brand-dark-border transition-all duration-300 hover:scale-105"
              >
                Sponsor a Student
              </Link>
            </div>
          </div>

          {/* Right Column: Supabase-style Code Panel */}
          <div className="lg:col-span-5 w-full">
            <div className="w-full bg-brand-dark-card border border-brand-dark-border rounded-2xl overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="h-11 bg-brand-dark-obsidian border-b border-brand-dark-border flex items-center justify-between px-4">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span className="text-xs text-gray-500 font-semibold flex items-center">
                  <Terminal className="h-3.5 w-3.5 mr-1.5 text-brand-emerald" />
                  GClickBootstrap.ts
                </span>
                <span className="w-12" />
              </div>

              {/* Code Editor body */}
              <div className="p-6 font-mono text-xs leading-relaxed text-gray-400 overflow-x-auto">
                <div>
                  <span className="text-blue-400">import</span> {'{'} <span className="text-amber-400">Foundation</span>, <span className="text-amber-400">Student</span> {'}'} <span className="text-blue-400">from</span> <span className="text-brand-emerald">"gclick-core"</span>;
                </div>
                <div className="mt-2 text-gray-500">{"// Initialize new Ghana cohort workspace"}</div>
                <div>
                  <span className="text-blue-400">const</span> <span className="text-white">gclick</span> = <span className="text-blue-400">new</span> <span className="text-yellow-400">Foundation</span>({'{'}
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">location</span>: <span className="text-brand-emerald">"Winneba, Ghana"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">impactGoal</span>: <span className="text-purple-400">10000</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">internetConnectivity</span>: <span className="text-purple-400">true</span>
                </div>
                <div>{'}'});</div>

                <div className="mt-4 text-gray-500">{"// Accelerate developer track"}</div>
                <div>
                  <span className="text-white">gclick</span>.<span className="text-blue-400">enrollStudent</span>(<span className="text-blue-400">new</span> <span className="text-yellow-400">Student</span>({'{'}
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">name</span>: <span className="text-brand-emerald">"Ekow Mensah"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">focusTrack</span>: <span className="text-brand-emerald">"Full Stack Web"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">mentorshipCohort</span>: <span className="text-brand-emerald">"12-Week Sprint"</span>
                </div>
                <div>{'}'}));</div>

                <div className="mt-4">
                  <span className="text-blue-400">await</span> <span className="text-white">gclick</span>.<span className="text-blue-400">deployToProduction</span>();
                </div>
                <div className="mt-2 text-brand-emerald font-semibold">
                  {"✓ Cohort initialized. Connection secure."}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
