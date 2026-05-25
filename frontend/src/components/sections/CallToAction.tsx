import React from 'react';
import { Heart, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-[#090A0F] py-20 relative overflow-hidden ambient-grain">
      {/* Cinematic glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:border-brand-pink/30 hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
            <div>
              <Heart className="h-10 w-10 text-brand-pink mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Donate Now</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Support our mission to empower youth through digital education setups.</p>
            </div>
            <Link
              to="/donate"
              className="w-full py-2.5 bg-white hover:bg-gray-100 text-brand-dark rounded-xl text-sm font-semibold transition-colors"
            >
              Contribute
            </Link>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:border-brand-pink/30 hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
            <div>
              <BookOpen className="h-10 w-10 text-brand-pink mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Join a Program</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Start your developer journey today with our curated curriculum.</p>
            </div>
            <a
              href="#programs"
              className="w-full py-2.5 bg-white hover:bg-gray-100 text-brand-dark rounded-xl text-sm font-semibold transition-colors"
            >
              Browse Programs
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:border-brand-pink/30 hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
            <div>
              <Users className="h-10 w-10 text-brand-pink mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Become a Mentor</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Share your expertise and guide aspiring local tech leaders.</p>
            </div>
            <Link
              to="/programs/1"
              className="w-full py-2.5 bg-white hover:bg-gray-100 text-brand-dark rounded-xl text-sm font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;