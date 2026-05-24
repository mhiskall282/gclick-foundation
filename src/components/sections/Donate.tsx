import React from 'react';
import { Heart, Star, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonateTeaser = () => {
  const impactMetrics = [
    {
      id: 1,
      metric: "$25",
      impact: "Provides learning materials, coding textbooks, and digital curriculum setups for one student."
    },
    {
      id: 2,
      metric: "$100",
      impact: "Sponsors a complete weekend code workshop session with internet connectivity and lab hours."
    },
    {
      id: 3,
      metric: "$500",
      impact: "Funds a full 12-week mentorship program and placement matching for a student leader."
    }
  ];

  return (
    <section id="donate" className="py-24 bg-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-pink font-bold bg-brand-pink/10 px-4 py-1.5 rounded-full border border-brand-pink/20">
            Make an Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark tracking-tight leading-none">
            Support Our Mission
          </h2>
          <p className="text-brand-charcoal/70 text-lg">
            Help us expand our operations, sponsor student resources, and build digital laboratories.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {impactMetrics.map((item) => (
            <div key={item.id} className="bg-[#FCFAF7] border border-brand-sand p-8 rounded-3xl text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <p className="text-4xl font-display font-extrabold text-brand-pink">{item.metric}</p>
              <p className="mt-3 text-brand-charcoal/80 text-sm leading-relaxed">{item.impact}</p>
            </div>
          ))}
        </div>

        {/* Call to Action button */}
        <div className="text-center">
          <Link
            to="/donate"
            className="inline-flex items-center px-8 py-4 bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold rounded-full shadow-xl shadow-brand-pink/15 transition-all duration-300 hover:scale-105"
          >
            Go to Donation Portal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonateTeaser;