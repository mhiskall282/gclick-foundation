import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const JoinPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', location: '', address: '', employment_status: '', student_year: '', background_info: '' 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    if (formData.name.trim().length < 3) return 'Name must be at least 3 characters.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Please provide a valid email address.';
    if (formData.location.trim().length < 2) return 'Location is required.';
    if (!formData.employment_status) return 'Please select your current status.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setStatus('error');
      setErrorMessage(error);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign up. Please try again later.');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', location: '', address: '', employment_status: '', student_year: '', background_info: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark-obsidian text-white pt-32 pb-20 relative overflow-hidden flex flex-col items-center justify-center supabase-grid">
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-3xl w-full mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-extrabold text-white tracking-tight leading-none mb-3">
            Join the Foundation
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Become a part of our ecosystem and gain exclusive access to resources, events, and mentorship. We want to know a bit more about you so we can tailor our programs to your specific vision.
          </p>
        </div>

        <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Glassmorphic overlay for success state */}
          {status === 'success' && (
            <div className="absolute inset-0 z-20 bg-brand-dark-card/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-fade-in">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-3">Welcome Aboard!</h3>
              <p className="text-gray-400 text-base mb-8 max-w-sm">Your robust membership application has been safely registered in our database. We will be in touch shortly.</p>
              <button 
                onClick={() => setStatus('idle')} 
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-semibold transition-colors"
              >
                Sign up another member
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-semibold flex items-center">
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" 
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-1.5">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" 
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-400 mb-1.5">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" 
                  placeholder="+233 (55) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-xs font-semibold text-gray-400 mb-1.5">City / Region *</label>
                <input 
                  type="text" 
                  id="location" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" 
                  placeholder="Accra, Greater Accra"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-semibold text-gray-400 mb-1.5">Detailed Address (Optional)</label>
              <input 
                type="text" 
                id="address" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" 
                placeholder="123 Independence Ave, Apt 4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employment_status" className="block text-xs font-semibold text-gray-400 mb-1.5">Current Status *</label>
                <select 
                  id="employment_status"
                  required
                  value={formData.employment_status}
                  onChange={(e) => setFormData({...formData, employment_status: e.target.value})}
                  className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all text-gray-300"
                >
                  <option value="" disabled>Select your status...</option>
                  <option value="student">Student</option>
                  <option value="employed">Employed Professional</option>
                  <option value="unemployed">Currently Seeking Opportunities</option>
                  <option value="entrepreneur">Entrepreneur / Founder</option>
                </select>
              </div>

              {formData.employment_status === 'student' && (
                <div className="animate-fade-in">
                  <label htmlFor="student_year" className="block text-xs font-semibold text-gray-400 mb-1.5">Year of Study / Grade</label>
                  <input 
                    type="text" 
                    id="student_year" 
                    value={formData.student_year}
                    onChange={(e) => setFormData({...formData, student_year: e.target.value})}
                    className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600" 
                    placeholder="e.g. University Year 3"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="background_info" className="block text-xs font-semibold text-gray-400 mb-1.5">Why do you want to join G-Click? (Interests & Motivation)</label>
              <textarea 
                id="background_info" 
                rows={4}
                value={formData.background_info}
                onChange={(e) => setFormData({...formData, background_info: e.target.value})}
                className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition-all placeholder:text-gray-600 resize-none" 
                placeholder="Tell us about your tech background, your passions, and what you hope to achieve by joining the foundation..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full md:w-auto md:min-w-[250px] mx-auto flex items-center justify-center py-4 px-8 bg-brand-pink text-white rounded-xl font-bold hover:bg-brand-pink/90 transition-all text-sm shadow-[0_0_20px_rgba(244,114,182,0.3)] hover:shadow-[0_0_25px_rgba(244,114,182,0.5)] disabled:opacity-70 mt-4"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-white transition-colors">
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
