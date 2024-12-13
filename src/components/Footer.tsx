import React from 'react';
import { Link } from 'react-router-dom';
import { MousePointerClick, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <MousePointerClick className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-2xl font-bold text-pink-500">G-Click</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Empowering the next generation of tech leaders through education, mentorship, and community building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#programs" className="text-gray-400 hover:text-pink-500">Programs</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-pink-500">About Us</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-pink-500">Blog</a></li>
              <li><a href="#resources" className="text-gray-400 hover:text-pink-500">Resources</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-pink-500">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:contact@gclick.com" className="text-gray-400 hover:text-pink-500">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Email: contact@gclick.com</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {currentYear} Blacks Tech Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;