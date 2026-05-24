import React, { useState, useEffect } from 'react';
import { Menu, X, MousePointerClick } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Programs', href: '/#programs' },
    { name: 'About', href: '/#about' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Resources', href: '/#resources' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-5xl px-6 h-16 rounded-full flex items-center justify-between border transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-md border-white/10 shadow-lg' : 'bg-white/80 backdrop-blur-md border-brand-sand shadow-sm'}`}>
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <MousePointerClick className={`h-6 w-6 mr-2 transition-colors ${scrolled ? 'text-brand-pink' : 'text-brand-purple'}`} />
              <span className={`text-xl font-display font-extrabold tracking-tight transition-colors ${scrolled ? 'text-white' : 'text-brand-dark'}`}>
                G-Click<span className="text-brand-pink">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-brand-pink ${scrolled ? 'text-gray-300' : 'text-brand-charcoal/80'}`}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/donate"
              className="px-5 py-2.5 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-brand-pink/15 hover:shadow-brand-pink/30 hover:scale-105"
            >
              Donate
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-brand-dark hover:bg-brand-sand'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden px-4 mt-2">
          <div className="bg-brand-dark/95 backdrop-blur-lg border border-white/10 rounded-3xl px-6 py-6 space-y-4 shadow-2xl">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-xl text-base font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full text-center block px-5 py-3 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-pink/15"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

