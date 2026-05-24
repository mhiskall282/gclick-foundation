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
    <section id="about" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Mission Statement & Founder Letter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20 items-center">
          <div className="lg:col-span-2 space-y-6 reveal-on-scroll">
            <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20">
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
              Creating Digital <br />
              Opportunities
            </h2>
            <p className="text-brand-charcoal/80 text-lg leading-relaxed">
              At G-Click, we're dedicated to transforming lives through innovative web technologies and personalized mentorship, building sustainable pipelines of tech excellence in Ghana.
            </p>
          </div>

          <div className="lg:col-span-3 bg-white border border-brand-sand rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
            <img 
              src="/images/wintima.png" 
              alt="Founder Wintima Akudugu" 
              className="w-36 h-36 rounded-full object-cover border-4 border-brand-cream shadow-md"
            />
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-brand-pink font-bold">Founder's Message</span>
              <blockquote className="text-brand-charcoal/90 italic font-medium">
                "Our goal is not just teaching syntax. We teach problem-solving, collaboration, and provide direct pathways to global tech teams."
              </blockquote>
              <div>
                <p className="text-sm font-bold text-brand-dark">Miss Wintima Akudugu</p>
                <p className="text-xs text-brand-charcoal/50">Founder & CEO, G-Click</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className="bg-white border border-brand-sand rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-cream border border-brand-sand flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-5 w-5 text-brand-purple" />
                </div>
                <p className="text-4xl font-display font-extrabold text-brand-dark">{stat.value}</p>
                <p className="text-brand-charcoal/60 font-medium text-sm mt-1">{stat.name}</p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3 reveal-on-scroll">
            <h3 className="text-3xl font-display font-bold text-brand-dark">Our Leadership</h3>
            <p className="text-brand-charcoal/70">
              Meet the strategic core driving G-Click's educational operations on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className="bg-white border border-brand-sand rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 reveal-on-scroll"
              >
                <img
                  className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-brand-cream shadow-md mb-6"
                  src={member.image}
                  alt={member.name}
                />
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-brand-dark">{member.name}</h4>
                  <p className="text-sm font-semibold text-brand-pink">{member.role}</p>
                </div>
                
                {/* Social Media Icons */}
                <div className="mt-6 flex justify-center space-x-3">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-cream rounded-full text-brand-charcoal/50 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-cream rounded-full text-brand-charcoal/50 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors">
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
