import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

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

  const apiKey = '89914e5a-d53c-456d-aac7-9b60bbc68b93'; // Replace with your Web3Forms API key

  const validateForm = () => {
    const errors: any = {};

    // Validate Name
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Validate Subject
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    }

    // Validate Message
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    }

    setValidationErrors(errors);

    // Return false if there are validation errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data before submitting
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Create the request body in JSON format
      const body = JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        access_key: apiKey,  // Your Web3Forms API key
      });

      // Ensure fetch uses POST method with correct headers and body
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON format for the request body
          Accept: 'application/json',  // Accept JSON responses
        },
        body: body,  // Send the body as JSON
      });

      // Get the response and handle success or error
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-xl text-gray-600">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-pink-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">g.click4change@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-pink-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">+233 246010890 , +233 507092947</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-pink-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                <p className="mt-1 text-gray-600">University of Education, Winneba.<br />P. O. Box 25. Winneba.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={formData.name}
                onChange={handleChange}
              />
              {validationErrors.name && <p className="text-red-600 text-sm">{validationErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && <p className="text-red-600 text-sm">{validationErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={formData.subject}
                onChange={handleChange}
              />
              {validationErrors.subject && <p className="text-red-600 text-sm">{validationErrors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={formData.message}
                onChange={handleChange}
              />
              {validationErrors.message && <p className="text-red-600 text-sm">{validationErrors.message}</p>}
            </div>

            <button
              type="submit"
              className={`w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
