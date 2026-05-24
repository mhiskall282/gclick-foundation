import React from 'react';
import { Quote } from 'lucide-react';
import type { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Program Graduate",
    content: "The mentorship program at Gclick transformed my career trajectory. The guidance I received was invaluable, helping me secure my first web developer job.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Lead / Mentor",
    content: "As a mentor, I've seen firsthand how Gclick's programs create real impact in people's lives. The students are highly driven and collaborative.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Student Leader",
    content: "The skills workshops helped me bridge the gap between theory and practical application. Working in squads built real confidence.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-brand-dark-obsidian text-white border-b border-brand-dark-border/50 relative overflow-hidden supabase-grid">
      {/* Background ambient shape */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-20 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Community Voice
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Hear from our graduates and project mentors.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{ transitionDelay: `${index * 150}ms` }}
              className="bg-brand-dark-card border-l-4 border-y border-r border-y-brand-dark-border border-r-brand-dark-border border-l-brand-pink rounded-r-3xl rounded-l-md p-8 shadow-md hover:shadow-2xl hover:border-brand-pink/35 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group reveal-on-scroll"
            >
              {/* Background large quote symbol */}
              <Quote className="absolute top-4 right-4 h-16 w-16 text-brand-pink/5 group-hover:text-brand-pink/10 transition-colors pointer-events-none" />

              <p className="text-gray-300 italic leading-relaxed text-sm md:text-base mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center pt-5 border-t border-brand-dark-border/50 relative z-10">
                <img
                  className="h-12 w-12 rounded-2xl object-cover border-2 border-brand-dark-border shadow-md group-hover:scale-105 transition-transform duration-300"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-3.5 text-left">
                  <h3 className="text-sm font-bold text-white">{testimonial.name}</h3>
                  <p className="text-xs font-semibold text-brand-pink mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;