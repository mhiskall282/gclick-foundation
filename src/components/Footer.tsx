import React from 'react';
import { Link } from 'react-router-dom';
import { MousePointerClick, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#090A0F] text-gray-300 border-t border-white/5 relative overflow-hidden ambient-grain">
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center">
              <MousePointerClick className="h-6 w-6 text-brand-pink" />
              <span className="ml-2 text-2xl font-display font-extrabold text-white tracking-tight">
                G-Click<span className="text-brand-pink">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Empowering the next generation of tech leaders in Ghana through practical developer education, structured mentorship, and collaborative innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white font-bold">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#programs" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#blog" className="hover:text-white transition-colors">Latest News</a></li>
              <li><a href="/#resources" className="hover:text-white transition-colors">Resource Hub</a></li>
              <li><Link to="/donate" className="hover:text-white transition-colors">Donate</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white font-bold">Connect With Us</h3>
            <div className="flex space-x-3.5 pb-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>
            <div className="space-y-1.5 text-sm text-gray-400">
              <p className="flex items-center text-xs">
                <Mail className="h-3.5 w-3.5 text-brand-pink mr-2" />
                g.click4change@gmail.com
              </p>
              <p className="text-xs leading-normal">
                Winneba, Central Region, Ghana
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          <p>© {currentYear} G-Click Foundation. Registered Non-Profit NGO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

