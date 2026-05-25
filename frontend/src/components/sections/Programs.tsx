import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../../lib/api';

const Programs = () => {
  const [programsData, setProgramsData] = useState<any[]>([]);

  useEffect(() => {
    fetch(getApiUrl('/api/programs'))
      .then(res => res.json())
      .then(data => setProgramsData(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching programs:', err));
  }, []);

  return (
    <section id="programs" className="py-28 bg-brand-dark-obsidian text-white border-y border-brand-dark-border relative overflow-hidden supabase-grid">
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 reveal-on-scroll">
          <span className="inline-flex items-center text-xs uppercase tracking-wider text-brand-pink font-bold bg-brand-pink/10 px-4 py-2 rounded-full border border-brand-pink/20">
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            Empowering Curricula
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            Educational Tracks
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Syllabi engineered in collaboration with industry experts to accelerate your developer journey.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programsData.map((program, index) => (
            <div
              key={program.id}
              style={{ transitionDelay: `${index * 150}ms` }}
              className="bg-brand-dark-card border border-brand-dark-border rounded-3xl overflow-hidden shadow-2xl hover:border-brand-pink/40 hover:shadow-glow transition-all duration-300 flex flex-col justify-between group reveal-on-scroll hover-border-glow"
            >
              <div>
                <div className="relative h-48 overflow-hidden border-b border-brand-dark-border">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-brand-dark-obsidian/85 backdrop-blur-md px-3 py-1 rounded-full text-brand-pink text-xs font-bold border border-brand-dark-border">
                    {program.duration || 'Flexible'}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-pink transition-colors leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{program.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to={`/programs/${program.id}`}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-pink hover:text-white transition-colors"
                >
                  Configure Stack
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
