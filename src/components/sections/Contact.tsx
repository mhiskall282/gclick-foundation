import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
  const [validationErrors, setValidationErrors] = useState<any>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Load from Vite env or fallback to demo key
  const apiKey = import.meta.env.VITE_WEB3FORMS_KEY || '89914e5a-d53c-456d-aac7-9b60bbc68b93';

  const validateForm = () => {
    const errors: any = {};

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
    } catch (err) {
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
    <section id="contact" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 reveal-on-scroll">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-bold bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark tracking-tight leading-none">
            Connect With G-Click
          </h2>
          <p className="text-brand-charcoal/70 text-lg">
            Have questions about our programs, workshops, or sponsorships? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8 lg:pr-10 reveal-on-scroll">
            <div className="bg-white border border-brand-sand p-8 rounded-3xl space-y-8 shadow-sm">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-brand-pink" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-brand-charcoal/50 font-bold">Email Address</h3>
                  <p className="mt-1 text-brand-dark font-semibold text-lg">g.click4change@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 text-brand-pink" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-brand-charcoal/50 font-bold">Phone Support</h3>
                  <p className="mt-1 text-brand-dark font-semibold text-base">
                    +233 24 601 0890 <br />
                    +233 50 709 2947 <br />
                    +233 26 448 5766
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-brand-pink" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-brand-charcoal/50 font-bold">Location</h3>
                  <p className="mt-1 text-brand-dark font-semibold leading-relaxed">
                    University of Education, Winneba.<br />
                    P. O. Box 25. Winneba, Ghana.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-brand-sand p-8 rounded-3xl shadow-sm reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold">{error}</div>}
              {success && <div className="p-4 bg-green-50 text-green-600 rounded-xl text-sm font-semibold">{success}</div>}

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-brand-charcoal/60 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 border border-brand-sand rounded-xl bg-brand-cream text-sm focus:outline-none focus:border-brand-pink"
                  value={formData.name}
                  onChange={handleChange}
                />
                {validationErrors.name && <p className="text-red-600 text-xs mt-1">{validationErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-brand-charcoal/60 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-brand-sand rounded-xl bg-brand-cream text-sm focus:outline-none focus:border-brand-pink"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && <p className="text-red-600 text-xs mt-1">{validationErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-brand-charcoal/60 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  className="w-full px-4 py-3 border border-brand-sand rounded-xl bg-brand-cream text-sm focus:outline-none focus:border-brand-pink"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {validationErrors.subject && <p className="text-red-600 text-xs mt-1">{validationErrors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-brand-charcoal/60 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-brand-sand rounded-xl bg-brand-cream text-sm focus:outline-none focus:border-brand-pink"
                  value={formData.message}
                  onChange={handleChange}
                />
                {validationErrors.message && <p className="text-red-600 text-xs mt-1">{validationErrors.message}</p>}
              </div>

              <button
                type="submit"
                className={`w-full py-4 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl text-sm font-bold flex items-center justify-center transition-all shadow-lg shadow-brand-pink/15 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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

