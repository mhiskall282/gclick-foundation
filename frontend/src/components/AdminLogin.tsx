import React, { useState } from 'react';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark-obsidian text-white py-12 px-6 relative overflow-hidden ambient-grain supabase-grid">
      {/* Decorative backdrop glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-brand-pink transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to site
        </Link>

        <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-extrabold text-white">
              Admin Login
            </h2>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">G-Click Console Access</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-3 pl-10 border border-brand-dark-border rounded-xl bg-brand-dark-obsidian text-sm text-white focus:outline-none focus:border-brand-pink"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 pl-10 border border-brand-dark-border rounded-xl bg-brand-dark-obsidian text-sm text-white focus:outline-none focus:border-brand-pink"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs font-semibold text-center bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-brand-pink text-white rounded-xl text-sm font-bold flex items-center justify-center transition-all shadow-lg shadow-brand-pink/15 hover:bg-brand-pink/90"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;