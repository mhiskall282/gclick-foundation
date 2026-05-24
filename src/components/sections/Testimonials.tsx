import React from 'react';
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
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark tracking-tight">
            Community Voice
          </h2>
          <p className="text-brand-charcoal/70">
            Hear from our graduates and project mentors.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{ transitionDelay: `${index * 150}ms` }}
              className="bg-white border border-brand-sand rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-brand-pink/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between reveal-on-scroll"
            >
              <p className="text-brand-charcoal/80 italic leading-relaxed text-base mb-8">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center pt-4 border-t border-brand-sand">
                <img
                  className="h-11 w-11 rounded-full object-cover border border-brand-sand"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-3.5">
                  <h3 className="text-sm font-bold text-brand-dark">{testimonial.name}</h3>
                  <p className="text-xs font-semibold text-brand-pink">{testimonial.role}</p>
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