import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle } from 'lucide-react';

const LabsDetailPage = () => {
  const { id } = useParams();
  const [lab, setLab] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/labs/${id}`)
      .then(res => res.json())
      .then(data => { setLab(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Loading lab...</div>;
  if (!lab) return <div className="min-h-screen pt-32 pb-20 text-center text-white font-body">Lab not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark-obsidian text-white font-body">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/#programs" className="inline-flex items-center text-brand-pink hover:text-white transition-colors mb-12">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Labs
        </Link>
        <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <PlayCircle className="h-10 w-10 text-brand-pink" />
            <h1 className="text-3xl md:text-4xl font-display font-extrabold">{lab.title}</h1>
          </div>
          
          {lab.video_url && (
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-brand-dark-border mb-8 shadow-2xl">
              <iframe 
                src={lab.video_url.replace('watch?v=', 'embed/')} 
                title={lab.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}

          <h3 className="text-xl font-bold mb-4">Lab Overview</h3>
          <div className="prose prose-invert max-w-none text-gray-300">
            {lab.description?.split('\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabsDetailPage;
