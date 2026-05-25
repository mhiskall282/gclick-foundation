import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProgramDetailPage from './pages/ProgramDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DonatePage from './pages/DonatePage';
import JoinPage from './pages/JoinPage';
import NotFoundPage from './pages/NotFoundPage';
import LeadershipDetailPage from './pages/LeadershipDetailPage';
import TracksDetailPage from './pages/TracksDetailPage';
import LabsDetailPage from './pages/LabsDetailPage';
import NewsDetailPage from './pages/NewsDetailPage';

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Scroll restoration / anchor scroll
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

    // IntersectionObserver scroll reveal setup
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Once active, stop observing
        }
      });
    }, { threshold: 0.01, rootMargin: '50px 0px 50px 0px' });

    // Initial observation
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Observe dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.classList && el.classList.contains('reveal-on-scroll')) {
              observer.observe(el);
            }
            if (el.querySelectorAll) {
              const children = el.querySelectorAll('.reveal-on-scroll');
              children.forEach(child => observer.observe(child));
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Failsafe & layout settling timers
    const layoutTimer = setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 500);

    const layoutTimer2 = setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 1500);

    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll:not(.active)').forEach(el => {
        el.classList.add('active');
      });
    }, 3000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(layoutTimer);
      clearTimeout(layoutTimer2);
      clearTimeout(safetyTimer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname, hash]);

  return null;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen bg-brand-dark-obsidian text-white flex flex-col font-body">
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/programs/:id" element={<MainLayout><ProgramDetailPage /></MainLayout>} />
          <Route path="/blog/:id" element={<MainLayout><BlogDetailPage /></MainLayout>} />
          <Route path="/leadership/:id" element={<MainLayout><LeadershipDetailPage /></MainLayout>} />
          <Route path="/tracks/:id" element={<MainLayout><TracksDetailPage /></MainLayout>} />
          <Route path="/labs/:id" element={<MainLayout><LabsDetailPage /></MainLayout>} />
          <Route path="/news/:id" element={<MainLayout><NewsDetailPage /></MainLayout>} />
          <Route path="/donate" element={<MainLayout><DonatePage /></MainLayout>} />
          <Route path="/join" element={<MainLayout><JoinPage /></MainLayout>} />
          
          {/* Admin Routes without Navbar and Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
