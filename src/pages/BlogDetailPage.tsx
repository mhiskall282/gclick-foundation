import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { Calendar, Clock, ArrowLeft, Heart, Share2 } from 'lucide-react';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '', 10);
  const post = blogData.find(p => p.id === postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-dark-obsidian text-white flex flex-col items-center justify-center p-6 text-center supabase-grid">
        <h2 className="text-3xl font-display font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-gray-400 mb-6">The article you are looking for does not exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 bg-brand-pink text-white rounded-full font-medium hover:bg-brand-pink/95 transition-all">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark-obsidian text-white pt-24 pb-20 supabase-grid">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-brand-pink mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>

        {/* Title Block */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <span className="bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-full border border-brand-purple/20">
              Tech & Education
            </span>
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-brand-pink" />
              {post.readTime}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center pt-4">
            <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink font-bold border border-brand-pink/30">
              {post.author.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-gray-400">G-Click Leader</p>
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
          <div className="md:col-span-1 flex md:flex-col justify-start gap-4 py-2 border-r border-brand-dark-border pr-4">
            <button className="flex items-center justify-center p-3 rounded-full bg-brand-dark-card border border-brand-dark-border hover:border-brand-pink text-gray-400 hover:text-brand-pink transition-all shadow-sm" onClick={() => alert('Thanks for liking!')}>
              <Heart className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center p-3 rounded-full bg-brand-dark-card border border-brand-dark-border hover:border-brand-pink text-gray-400 hover:text-brand-pink transition-all shadow-sm" onClick={() => alert('Share link copied to clipboard!')}>
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Reading Content */}
          <div className="md:col-span-3 space-y-6 text-gray-300 text-lg leading-relaxed font-normal">
            {post.content.map((paragraph, index) => (
              <p key={index} className="first-of-type:font-medium first-of-type:text-white">
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
