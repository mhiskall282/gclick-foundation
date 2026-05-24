import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { Calendar, User, Clock, ArrowLeft, Heart, Share2 } from 'lucide-react';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '', 10);
  const post = blogData.find(p => p.id === postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">Article Not Found</h2>
        <p className="text-brand-charcoal/70 mb-6">The article you are looking for does not exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 bg-brand-pink text-white rounded-full font-medium hover:bg-brand-pink/95 transition-all">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-brand-charcoal/60 hover:text-brand-pink mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>

        {/* Title Block */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-charcoal/50 uppercase tracking-wider">
            <span className="bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-full border border-brand-purple/20">
              Tech & Education
            </span>
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {post.readTime}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-brand-dark leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center pt-4">
            <div className="w-10 h-10 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink font-bold border border-brand-pink/30">
              {post.author.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-brand-dark">{post.author}</p>
              <p className="text-xs text-brand-charcoal/50">G-Click Leader</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Share Sidebar */}
          <div className="md:col-span-1 flex md:flex-col justify-start gap-4 py-2 border-r border-brand-sand/50 pr-4">
            <button className="flex items-center justify-center p-3 rounded-full bg-white border border-brand-sand hover:border-brand-pink text-brand-charcoal/60 hover:text-brand-pink transition-all shadow-sm" onClick={() => alert('Thanks for liking!')}>
              <Heart className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center p-3 rounded-full bg-white border border-brand-sand hover:border-brand-pink text-brand-charcoal/60 hover:text-brand-pink transition-all shadow-sm" onClick={() => alert('Share link copied to clipboard!')}>
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Reading Content */}
          <div className="md:col-span-3 space-y-6 text-brand-charcoal/85 text-lg leading-relaxed font-normal">
            {post.content.map((paragraph, index) => (
              <p key={index} className="first-of-type:font-medium first-of-type:text-brand-dark">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
