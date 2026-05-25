import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

const TracksDetailPage = () => {
  const { id } = useParams();
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tracks/${id}`)
      .then(res => res.json())
      .then(data => { setTrack(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Loading track details...</div>;
  if (!track) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Track not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark-obsidian text-white font-body">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/#programs" className="inline-flex items-center text-brand-pink hover:text-white transition-colors mb-12">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Programs
        </Link>
        <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-pink/20">
            <BookOpen className="h-8 w-8 text-brand-pink" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-6">{track.title}</h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-12">{track.description}</p>
          
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-2 h-8 bg-brand-pink rounded-full mr-4"></span>
            Curriculum Details
          </h3>
          <div className="prose prose-invert prose-brand max-w-none bg-brand-dark-obsidian border border-brand-dark-border rounded-2xl p-8">
            {track.details?.split('\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="text-gray-300 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksDetailPage;
