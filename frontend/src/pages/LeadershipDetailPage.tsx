import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LeadershipDetailPage = () => {
  const { id } = useParams();
  const [leader, setLeader] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/leadership/${id}`)
      .then(res => res.json())
      .then(data => { setLeader(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Loading leader profile...</div>;
  if (!leader) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Profile not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark-obsidian text-white font-body">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/#about" className="inline-flex items-center text-brand-pink hover:text-white transition-colors mb-12">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to About Us
        </Link>
        <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-start">
          {leader.image && (
            <img src={leader.image} alt={leader.name} className="w-48 h-48 md:w-64 md:h-64 rounded-3xl object-cover shadow-2xl shadow-brand-pink/20" />
          )}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-2">{leader.name}</h1>
            <p className="text-xl text-brand-pink font-semibold uppercase tracking-wider mb-8">{leader.role}</p>
            <div className="prose prose-invert prose-brand max-w-none">
              {leader.bio.split('\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="text-gray-300 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipDetailPage;
