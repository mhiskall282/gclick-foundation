import React from 'react';
import { BookOpen, Video, Users, Download, ArrowRight } from 'lucide-react';
import type { Resource } from '../../types/resource';

const resources: Resource[] = [
  {
    id: 1,
    title: "Learning Materials",
    description: "Access our comprehensive library of educational slides, guides, and checklists.",
    icon: BookOpen,
    link: "#"
  },
  {
    id: 2,
    title: "Workshop Videos",
    description: "Watch full recordings of our past software development workshops and panels.",
    icon: Video,
    link: "#"
  },
  {
    id: 3,
    title: "Mentorship Guides",
    description: "Learn how to establish relationships and set roadmap goals with your mentors.",
    icon: Users,
    link: "#"
  },
  {
    id: 4,
    title: "Developer Kits",
    description: "Get started quickly with structured CV templates, Git guides, and IDE setups.",
    icon: Download,
    link: "#"
  }
];

const ResourceHub = () => {
  return (
    <section id="resources" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute bottom-12 left-12 w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20">
            Developer Toolkit
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark tracking-tight leading-none">
            Resource Hub
          </h2>
          <p className="text-brand-charcoal/70 text-lg">
            Everything you need to accelerate your learning journey and build projects.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                className="bg-white border border-brand-sand rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cream border border-brand-sand flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-dark leading-tight">{resource.title}</h3>
                  <p className="text-brand-charcoal/75 text-sm leading-relaxed">{resource.description}</p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => alert(`This resource is preparing for release. Join our newsletter to receive it first!`)}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-pink hover:text-brand-purple transition-colors"
                  >
                    Access Resource
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;