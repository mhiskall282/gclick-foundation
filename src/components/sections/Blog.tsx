import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { blogData } from '../../data/blogData';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-pink font-bold bg-brand-pink/10 px-4 py-1.5 rounded-full border border-brand-pink/20">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark tracking-tight leading-none">
            News & Insights
          </h2>
          <p className="text-brand-charcoal/70 text-lg">
            Stay informed with our latest reports, workshop logs, and community updates.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {blogData.map((post, index) => (
            <article 
              key={post.id} 
              style={{ transitionDelay: `${index * 150}ms` }}
              className="bg-[#FCFAF7] border border-brand-sand rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brand-pink/30 transition-all duration-300 flex flex-col justify-between reveal-on-scroll"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center text-xs font-semibold text-brand-charcoal/50 uppercase tracking-wider gap-3">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-dark leading-tight">{post.title}</h3>
                  <p className="text-brand-charcoal/75 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-pink hover:text-brand-purple transition-colors"
                >
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
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