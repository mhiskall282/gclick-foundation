import React from 'react';
import { Heart, Star, Shield, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonateTeaser = () => {
  const impactMetrics = [
    {
      id: 1,
      metric: "$25",
      name: "Supporter",
      impact: "Provides learning materials, coding textbooks, and digital curriculum setups for one student.",
      icon: Heart,
      features: ["Student textbooks", "Digital syllabi setup", "Online resource access"]
    },
    {
      id: 2,
      metric: "$100",
      name: "Champion",
      impact: "Sponsors a complete weekend code workshop session with internet connectivity and lab hours.",
      icon: Star,
      features: ["Weekend workshop access", "4 weeks lab connectivity", "1-on-1 mentor guidance", "Weekly log updates"],
      recommended: true
    },
    {
      id: 3,
      metric: "$500",
      name: "Partner",
      impact: "Funds a full 12-week mentorship program and placement matching for a student leader.",
      icon: Shield,
      features: ["12-week full program", "Personal code mentor", "Direct job placement path", "Annual impact auditing"]
    }
  ];

  return (
    <section id="donate" className="py-32 bg-brand-dark-obsidian text-white border-b border-brand-dark-border/50 relative overflow-hidden supabase-grid">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-24 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-pink font-bold bg-brand-pink/10 px-4 py-1.5 rounded-full border border-brand-pink/20">
            Make an Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            Support Our Mission
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Help us expand our operations, sponsor student resources, and build digital laboratories.
          </p>
        </div>

        {/* Subscription-style Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 items-stretch">
          {impactMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`bg-brand-dark-card border rounded-[32px] p-8 text-left shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden reveal-on-scroll ${
                  item.recommended 
                    ? 'border-brand-pink border-2 scale-[1.03] md:-translate-y-2 shadow-xl hover:scale-[1.04]' 
                    : 'border-brand-dark-border hover:border-brand-pink/30 hover:scale-[1.01]'
                }`}
              >
                {item.recommended && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-brand-pink text-white text-[8px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-lg">
                      Popular
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                      item.recommended 
                        ? 'bg-brand-pink/10 border-brand-pink/20 text-brand-pink' 
                        : 'bg-brand-dark-obsidian border-brand-dark-border text-brand-purple'
                    }`}>
                      <Icon className="h-5 w-5 animate-float-slow" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-white text-lg">{item.name}</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sponsorship Tier</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <span className="text-4xl font-display font-extrabold text-brand-pink">{item.metric}</span>
                    <span className="text-xs text-gray-400 font-semibold ml-1">/ one-time</span>
                  </div>

                  {/* Statement */}
                  <p className="text-gray-300 text-sm leading-relaxed">{item.impact}</p>

                  {/* Features list */}
                  <ul className="space-y-2.5 pt-4 border-t border-brand-dark-border/50">
                    {item.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-xs text-gray-400 font-semibold gap-2.5">
                        <Check className="h-3.5 w-3.5 text-brand-pink flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    to="/donate"
                    className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center transition-all text-xs uppercase tracking-wider ${
                      item.recommended
                        ? 'bg-brand-pink hover:bg-brand-pink/90 text-white shadow-lg shadow-brand-pink/20'
                        : 'bg-brand-dark-obsidian border border-brand-dark-border hover:border-brand-pink text-white hover:bg-brand-pink/10'
                    }`}
                  >
                    Select Tier
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Portal Link */}
        <div className="text-center reveal-on-scroll" style={{ transitionDelay: '450ms' }}>
          <Link
            to="/donate"
            className="inline-flex items-center text-sm font-extrabold uppercase tracking-widest text-brand-pink hover:text-brand-purple transition-all duration-300"
          >
            Or Configure Custom Amount
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonateTeaser;