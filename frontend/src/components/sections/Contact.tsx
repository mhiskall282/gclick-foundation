import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Terminal } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Load from Vite env or fallback to demo key
  const apiKey = import.meta.env.VITE_WEB3FORMS_KEY || '89914e5a-d53c-456d-aac7-9b60bbc68b93';

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const body = JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        access_key: apiKey,
      });

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setError(data.message || 'There was an issue sending your message. Please try again.');
      }
    } catch {
      setError('An error occurred while submitting the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 bg-brand-dark-obsidian text-white relative overflow-hidden supabase-grid">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            Connect With G-Click
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Have questions about our programs, workshops, or sponsorships? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Redesigned Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between reveal-on-scroll">
            
            {/* Email card */}
            <div className="bg-brand-dark-card border border-brand-dark-border p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-pink/30 hover:scale-[1.01] transition-all duration-300 flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-dark-obsidian border border-brand-dark-border flex items-center justify-center flex-shrink-0 group-hover:rotate-3 transition-transform">
                <Mail className="h-5 w-5 text-brand-pink" />
              </div>
              <div className="text-left">
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email Address</h3>
                <p className="mt-1 text-white font-extrabold text-lg break-all">g.click4change@gmail.com</p>
              </div>
            </div>

            {/* Phone card */}
            <div className="bg-brand-dark-card border border-brand-dark-border p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-pink/30 hover:scale-[1.01] transition-all duration-300 flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-dark-obsidian border border-brand-dark-border flex items-center justify-center flex-shrink-0 group-hover:rotate-3 transition-transform">
                <Phone className="h-5 w-5 text-brand-pink" />
              </div>
              <div className="text-left">
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Phone Support</h3>
                <p className="mt-1 text-white font-extrabold text-sm md:text-base leading-normal">
                  +233 24 601 0890 <br />
                  +233 50 709 2947
                </p>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-brand-dark-card border border-brand-dark-border p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-pink/30 hover:scale-[1.01] transition-all duration-300 flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-dark-obsidian border border-brand-dark-border flex items-center justify-center flex-shrink-0 group-hover:rotate-3 transition-transform">
                <MapPin className="h-5 w-5 text-brand-pink" />
              </div>
              <div className="text-left">
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Location</h3>
                <p className="mt-1 text-white font-semibold text-xs leading-relaxed">
                  University of Education, Winneba.<br />
                  P. O. Box 25. Winneba, Ghana.
                </p>
              </div>
            </div>
            
          </div>

          {/* Redesigned Developer Dark-Console Form */}
          <div className="lg:col-span-7 bg-brand-dark-card border border-brand-dark-border rounded-[32px] p-8 shadow-2xl relative overflow-hidden group reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />
            <div className="h-10 border-b border-brand-dark-border flex items-center justify-between pb-4 mb-6">
              <span className="text-white text-sm font-display font-extrabold flex items-center">
                <Terminal className="h-4 w-4 mr-2 text-brand-pink" />
                ContactTerminal.sh
              </span>
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 inline-block" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {error && <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl text-xs font-semibold">{error}</div>}
              {success && <div className="p-4 bg-green-950/40 border border-green-500/20 text-green-400 rounded-xl text-xs font-semibold">{success}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-brand-dark-obsidian border border-brand-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-brand-dark-obsidian border border-brand-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  className="w-full px-4 py-3 bg-brand-dark-obsidian border border-brand-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {validationErrors.subject && <p className="text-red-500 text-xs mt-1">{validationErrors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-brand-dark-obsidian border border-brand-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                  value={formData.message}
                  onChange={handleChange}
                />
                {validationErrors.message && <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>}
              </div>

              <button
                type="submit"
                className={`w-full py-4 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all shadow-lg shadow-brand-pink/15 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
