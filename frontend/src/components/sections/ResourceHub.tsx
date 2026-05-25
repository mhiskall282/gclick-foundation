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
  const [toastMsg, setToastMsg] = React.useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <section id="resources" className="py-32 bg-brand-dark-obsidian text-white border-b border-brand-dark-border/50 relative overflow-hidden supabase-grid">
      {/* Decorative backdrop glow */}
      <div className="absolute bottom-12 left-12 w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20">
            Developer Toolkit
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            Resource Hub
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Everything you need to accelerate your learning journey and build projects.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className="bg-brand-dark-card border border-brand-dark-border rounded-[32px] p-8 shadow-md hover:shadow-2xl hover:border-brand-pink/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group reveal-on-scroll"
              >
                {/* Tech Dotted Blueprint Backdrop */}
                <div className="absolute inset-0 supabase-grid opacity-[0.12] pointer-events-none group-hover:opacity-[0.22] transition-opacity" />

                <div className="space-y-4 relative z-10 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-pink/10 to-brand-purple/10 border border-brand-pink/20 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-brand-pink" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white leading-tight group-hover:text-brand-pink transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{resource.description}</p>
                </div>

                <div className="pt-6 relative z-10 text-left">
                  <button
                    onClick={() => showToast('This resource is preparing for release. Join our newsletter to receive it first!')}
                    className="inline-flex items-center text-xs font-extrabold uppercase tracking-widest text-brand-pink group-hover:text-brand-purple transition-all duration-300"
                  >
                    Access Resource
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-pink text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-brand-pink/20 transition-all duration-300 z-50 pointer-events-none ${toastMsg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {toastMsg}
      </div>
    </section>
  );
};

export default ResourceHub;
