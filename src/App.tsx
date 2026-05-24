import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProgramDetailPage from './pages/ProgramDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DonatePage from './pages/DonatePage';

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll restoration / anchor scroll
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    } else {
      window.scrollTo(0, 0);
    }

    // IntersectionObserver scroll reveal setup
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Wait a brief tick for render updates
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => observer.unobserve(el));
    };
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen bg-brand-dark-obsidian text-white flex flex-col font-body">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programs/:id" element={<ProgramDetailPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;