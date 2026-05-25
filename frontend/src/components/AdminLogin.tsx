import React, { useState } from 'react';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getApiUrl } from '../lib/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = getApiUrl('/api/auth/login');
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      localStorage.setItem('token', data.token);
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 py-12 px-6 relative overflow-hidden">
      <div className="max-w-md w-full relative z-10 space-y-6">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to site
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Admin Login
            </h2>
            <p className="text-zinc-500 text-xs font-medium tracking-wide mt-1">G-Click Console Access</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-3 py-2 pl-9 border border-zinc-800 rounded-lg bg-zinc-950 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    placeholder="name@company.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-3 py-2 pl-9 border border-zinc-800 rounded-lg bg-zinc-950 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs font-medium text-center bg-red-500/10 border border-red-500/20 p-3 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-900 rounded-lg text-sm font-medium flex items-center justify-center transition-colors h-10"
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
