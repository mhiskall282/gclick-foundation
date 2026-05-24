import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProgramDetailPage from './pages/ProgramDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DonatePage from './pages/DonatePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FCFAF7] flex flex-col font-body">
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