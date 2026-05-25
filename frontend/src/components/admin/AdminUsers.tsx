import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, Trash2, Key } from 'lucide-react';
import { getApiUrl } from '../../lib/api';
import { fetchApi } from '../../lib/api';

export const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch(getApiUrl('/api/auth/users'), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(getApiUrl('/api/auth/users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess('User created successfully!');
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-display font-bold text-white flex items-center">
          <Shield className="h-5 w-5 mr-2 text-brand-pink" />
          Admin Access Management
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create User Form */}
        <div className="lg:col-span-1 bg-brand-dark-card border border-brand-dark-border rounded-2xl p-6 shadow-xl h-fit">
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Create Sub-Admin</h4>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Temporary Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-brand-pink" 
              />
            </div>

            {error && <div className="text-xs text-red-400 font-semibold p-2 bg-red-500/10 rounded-md">{error}</div>}
            {success && <div className="text-xs text-green-400 font-semibold p-2 bg-green-500/10 rounded-md">{success}</div>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-2 bg-brand-pink text-white rounded-lg text-sm font-bold flex items-center justify-center transition-all hover:bg-brand-pink/90 disabled:opacity-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="lg:col-span-2 bg-brand-dark-card border border-brand-dark-border rounded-2xl p-6 shadow-xl">
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Active Administrators</h4>
          
          <div className="space-y-3">
            {/* Root Admin Placeholder */}
            <div className="p-4 bg-brand-dark-obsidian border border-brand-pink/30 rounded-xl flex justify-between items-center relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-pink" />
              <div>
                <div className="text-sm font-semibold text-white">Root Master Admin</div>
                <div className="text-xs text-brand-pink mt-1 font-mono">Managed via .env file</div>
              </div>
              <span className="px-2.5 py-1 bg-brand-pink/10 text-brand-pink border border-brand-pink/20 rounded-md text-[10px] font-bold uppercase tracking-widest">
                System
              </span>
            </div>

            {/* Sub Admins */}
            {users.map(u => (
              <div key={u.id} className="p-4 bg-brand-dark-obsidian border border-brand-dark-border rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-sm font-semibold text-white">{u.email}</div>
                  <div className="text-xs text-gray-500 mt-1">Created: {new Date(u.created_at).toLocaleDateString()}</div>
                </div>
                <span className="px-2.5 py-1 bg-white/5 text-gray-400 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest">
                  Sub-Admin
                </span>
              </div>
            ))}
            
            {users.length === 0 && (
              <div className="text-center p-6 text-sm text-gray-500 italic">
                No sub-admins created yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
