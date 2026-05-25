import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowLeft, Send, CheckCircle } from 'lucide-react';

const ProgramDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/programs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProgram(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark-obsidian flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-brand-dark-obsidian text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-4">Program Not Found</h2>
        <p className="text-gray-400 mb-6">The program you are looking for does not exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 bg-brand-pink text-white rounded-full font-medium hover:bg-brand-pink/95 transition-all">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark-obsidian text-white pt-24 pb-20 supabase-grid">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-brand-pink mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Programs
        </Link>

        {/* Hero Card */}
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-left">
            <span className="inline-block text-xs uppercase tracking-widest text-brand-pink font-semibold mb-3 bg-brand-pink/15 px-3 py-1 rounded-full border border-brand-pink/20">
              G-Click Core Program
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-none">
              {program.title}
            </h1>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {program.details || program.description}
              </p>
            </section>

            {/* Syllabus */}
            {program.syllabus && (
              <section className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 text-brand-pink mr-3" />
                  What You Will Learn
                </h2>
                <div className="space-y-4">
                  {program.syllabus.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-dark-obsidian border border-brand-dark-border flex items-center justify-center font-bold text-brand-pink text-sm mr-4 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-300 text-base font-medium pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Action / Meta */}
          <div className="space-y-6">
            <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl space-y-6">
              <h3 className="text-xl font-display font-bold text-white">Program Details</h3>
              
              <div className="flex items-center text-gray-300">
                <Clock className="h-5 w-5 text-brand-pink mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-505 uppercase font-semibold text-gray-500">Duration</p>
                  <p className="font-semibold text-white">{program.duration || 'Flexible'}</p>
                </div>
              </div>

              <div className="border-t border-brand-dark-border pt-6">
                <h4 className="text-lg font-display font-bold text-white mb-4">Register Interest</h4>
                {status === 'success' ? (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-2xl flex flex-col items-center justify-center text-center animate-fade-in">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg mb-1">Interest Registered!</h4>
                    <p className="text-sm">Our admissions team will contact you shortly.</p>
                  </div>
                ) : (
                  <form 
                    className="space-y-4" 
                    onSubmit={(e) => { 
                      e.preventDefault(); 
                      setStatus('success');
                    }}
                  >
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
                      <input type="text" required className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                      <input type="email" required className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" placeholder="jane@example.com" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-pink/20 hover:shadow-brand-pink/40 hover:-translate-y-0.5">
                      Submit Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
