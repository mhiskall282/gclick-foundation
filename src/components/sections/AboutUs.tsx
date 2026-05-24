import React from 'react';
import { Award, Users, TrendingUp, Linkedin, Twitter } from 'lucide-react';
import type { TeamMember } from '../../types';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Miss Wintima Akudugu",
    role: "Founder & CEO",
    image: "/images/wintima.png",
    linkedin: "https://www.linkedin.com",
    twitter: "https://x.com/"
  },
  {
    id: 2,
    name: "Ms. Esther Gyimah",
    role: "Head of Programs and Operations",
    image: "/images/EG.png",
    linkedin: "https://www.linkedin.com",
    twitter: "https://x.com/"
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    linkedin: "https://www.linkedin.com",
    twitter: "https://x.com/"
  }
];

const stats = [
  { id: 1, name: 'Students Impacted', value: '10,000+', icon: Users },
  { id: 2, name: 'Success Rate', value: '94%', icon: TrendingUp },
  { id: 3, name: 'Awards Won', value: '15+', icon: Award },
];

const AboutUs = () => {
  return (
    <section id="about" className="py-32 bg-brand-dark-obsidian text-white border-b border-brand-dark-border/50 relative overflow-hidden supabase-grid">
      {/* Decorative pulse blur */}
      <div className="absolute top-12 right-12 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-12 -left-12 w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Vision & Founder letter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
          <div className="lg:col-span-5 space-y-6 reveal-on-scroll">
            <span className="inline-block text-xs uppercase tracking-widest text-brand-pink font-bold bg-brand-pink/10 px-4 py-1.5 rounded-full border border-brand-pink/20">
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              Creating Digital <br />
              Opportunities
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              At G-Click, we're dedicated to transforming lives through innovative web technologies and personalized mentorship, building sustainable pipelines of tech excellence in Ghana.
            </p>
          </div>

          {/* Glass Founder Card */}
          <div className="lg:col-span-7 bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <img 
              src="/images/wintima.png" 
              alt="Founder Wintima Akudugu" 
              className="w-32 h-32 rounded-2xl object-cover border-2 border-brand-pink/20 shadow-2xl transition-transform duration-500 group-hover:scale-105 z-10"
            />
            <div className="space-y-5 z-10 text-left">
              <span className="text-[10px] tracking-widest uppercase text-brand-pink font-bold border border-brand-pink/20 bg-brand-pink/10 px-2.5 py-1 rounded-md">
                Founder's Message
              </span>
              <blockquote className="text-gray-300 italic font-medium leading-relaxed border-l-2 border-brand-pink pl-4 text-sm md:text-base">
                "Our goal is not just teaching syntax. We teach problem-solving, collaboration, and provide direct pathways to global tech teams."
              </blockquote>
              <div>
                <p className="text-sm font-bold text-white">Miss Wintima Akudugu</p>
                <p className="text-xs text-gray-500">Founder & CEO, G-Click</p>
              </div>
            </div>
          </div>
        </div>

        {/* Redesigned Stat widgets */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-32">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 text-center shadow-md hover:shadow-2xl hover:border-brand-pink/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group reveal-on-scroll"
              >
                {/* Horizontal Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink to-brand-purple opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-2xl bg-brand-dark-obsidian border border-brand-dark-border flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Icon className="h-5 w-5 text-brand-pink" />
                </div>
                <p className="text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple mt-2">{stat.value}</p>
                <p className="text-gray-400 font-semibold text-xs tracking-wider uppercase mt-2">{stat.name}</p>
              </div>
            );
          })}
        </div>

        {/* Leadership cards */}
        <div className="space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3 reveal-on-scroll">
            <h3 className="text-3xl font-display font-extrabold text-white tracking-tight leading-none">Our Leadership</h3>
            <p className="text-gray-400 text-sm md:text-base">
              Meet the strategic core driving G-Click's educational operations on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className="bg-brand-dark-card border border-brand-dark-border rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:border-brand-pink/30 hover:scale-[1.01] transition-all duration-500 flex flex-col justify-between group reveal-on-scroll"
              >
                {/* Image overlay box */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <h4 className="text-xl font-display font-extrabold text-white">{member.name}</h4>
                    <p className="text-brand-pink text-xs font-semibold tracking-widest uppercase mt-1">{member.role}</p>
                  </div>
                </div>
                
                {/* Social links block */}
                <div className="p-4 bg-brand-dark-card flex justify-center space-x-3.5 border-t border-brand-dark-border/50">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-brand-dark-obsidian hover:bg-brand-pink/15 rounded-xl text-gray-400 hover:text-brand-pink border border-brand-dark-border hover:border-brand-pink/30 transition-all" aria-label="LinkedIn Profile">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-brand-dark-obsidian hover:bg-brand-pink/15 rounded-xl text-gray-400 hover:text-brand-pink border border-brand-dark-border hover:border-brand-pink/30 transition-all" aria-label="Twitter Profile">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
