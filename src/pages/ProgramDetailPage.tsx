import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { programsData } from '../data/programsData';
import { Clock, BookOpen, ArrowLeft, Send } from 'lucide-react';

const ProgramDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const programId = parseInt(id || '', 10);
  const program = programsData.find(p => p.id === programId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!program) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">Program Not Found</h2>
        <p className="text-brand-charcoal/70 mb-6">The program you are looking for does not exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 bg-brand-pink text-white rounded-full font-medium hover:bg-brand-pink/95 transition-all">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-brand-charcoal/60 hover:text-brand-pink mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Programs
        </Link>

        {/* Hero Card */}
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <span className="inline-block text-xs uppercase tracking-widest text-brand-pink font-semibold mb-3 bg-brand-pink/15 px-3 py-1 rounded-full border border-brand-pink/20">
              G-Click Core Program
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-none">
              {program.title}
            </h1>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white border border-brand-sand rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-brand-dark mb-4">Overview</h2>
              <p className="text-brand-charcoal/80 leading-relaxed text-lg">
                {program.details || program.description}
              </p>
            </section>

            {/* Syllabus */}
            {program.syllabus && (
              <section className="bg-white border border-brand-sand rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-display font-bold text-brand-dark mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 text-brand-pink mr-3" />
                  What You Will Learn
                </h2>
                <div className="space-y-4">
                  {program.syllabus.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-cream border border-brand-sand flex items-center justify-center font-bold text-brand-purple text-sm mr-4 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-brand-charcoal/80 text-base font-medium pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Action / Meta */}
          <div className="space-y-6">
            <div className="bg-white border border-brand-sand rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-display font-bold text-brand-dark">Program Details</h3>
              
              <div className="flex items-center text-brand-charcoal/85">
                <Clock className="h-5 w-5 text-brand-pink mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-brand-charcoal/50 uppercase font-semibold">Duration</p>
                  <p className="font-semibold">{program.duration || 'Flexible'}</p>
                </div>
              </div>

              <div className="border-t border-brand-sand pt-6">
                <h4 className="text-lg font-display font-bold text-brand-dark mb-4">Register Interest</h4>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you for registering interest! Our team will contact you shortly.'); }}>
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-brand-charcoal/60 mb-1">Full Name</label>
                    <input type="text" id="name" required className="w-full px-4 py-2 border border-brand-sand rounded-xl bg-brand-cream text-sm focus:outline-none focus:border-brand-pink" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-brand-charcoal/60 mb-1">Email Address</label>
                    <input type="email" id="email" required className="w-full px-4 py-2 border border-brand-sand rounded-xl bg-brand-cream text-sm focus:outline-none focus:border-brand-pink" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center py-3 bg-brand-pink text-white rounded-xl font-semibold hover:bg-brand-pink/95 transition-all text-sm">
                    Submit Application
                    <Send className="h-4 w-4 ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
