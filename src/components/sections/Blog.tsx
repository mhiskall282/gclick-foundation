import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { blogData } from '../../data/blogData';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <section id="blog" className="py-32 bg-brand-dark-obsidian text-white border-b border-brand-dark-border/50 relative overflow-hidden supabase-grid">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-pink font-bold bg-brand-pink/10 px-4 py-1.5 rounded-full border border-brand-pink/20">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            News & Insights
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Stay informed with our latest reports, workshop logs, and community updates.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {blogData.map((post, index) => (
            <article 
              key={post.id} 
              style={{ transitionDelay: `${index * 150}ms` }}
              className="bg-brand-dark-card border border-brand-dark-border rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl hover:border-brand-pink/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between reveal-on-scroll group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-70 group-hover:opacity-60 transition-opacity" />
                  <img
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-brand-pink/90 backdrop-blur-sm text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md">
                      Article
                    </span>
                  </div>
                </div>
                
                <div className="p-8 space-y-4 text-left">
                  <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest gap-2.5">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-brand-pink" />
                      {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white leading-snug group-hover:text-brand-pink transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
              </div>
              
              <div className="p-8 pt-0 text-left">
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-xs font-extrabold uppercase tracking-widest text-brand-pink group-hover:text-brand-purple transition-all duration-300"
                >
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;