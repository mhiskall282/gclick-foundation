import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news/${id}`)
      .then(res => res.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Loading news...</div>;
  if (!news) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Article not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark-obsidian text-white font-body">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/#news" className="inline-flex items-center text-brand-pink hover:text-white transition-colors mb-12">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
        </Link>
        <article className="bg-brand-dark-card border border-brand-dark-border rounded-3xl overflow-hidden shadow-2xl">
          {news.image && (
            <div className="w-full h-64 md:h-96">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8 md:p-12">
            <div className="flex items-center text-brand-pink text-sm font-bold uppercase tracking-wider mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(news.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-8 leading-tight">{news.title}</h1>
            <div className="prose prose-invert prose-brand max-w-none text-gray-300">
              {news.content?.split('\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="leading-relaxed mb-6">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;
