import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, Trash2, Key, Edit } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetchApi('/api/auth/users');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const path = editingUser ? `/api/auth/users/${editingUser.id}` : '/api/auth/users';
      const method = editingUser ? 'PUT' : 'POST';

      const res = await fetchApi(path, {
        method,
        body: JSON.stringify({ 
          email, 
          // Only send password if we're creating OR if it's filled in when editing
          password: (!editingUser || password.trim() !== '') ? password : undefined 
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(editingUser ? 'Admin updated successfully!' : 'Admin created successfully!');
      setEmail('');
      setPassword('');
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this administrator\'s access?')) return;
    setError('');
    setSuccess('');

    try {
      const res = await fetchApi(`/api/auth/users/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to revoke access');

      setSuccess('Administrator access has been successfully revoked.');
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
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
        
        {/* Create / Edit User Form */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl h-fit">
          <h4 className="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
            {editingUser ? 'Edit Administrator' : 'Create Sub-Admin'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-650 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                {editingUser ? 'New Password (leave empty to keep current)' : 'Temporary Password'}
              </label>
              <input 
                type="password" 
                required={!editingUser}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-650 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" 
              />
            </div>

            {error && <div className="text-xs text-red-400 font-semibold p-2 bg-red-500/10 rounded-lg">{error}</div>}
            {success && <div className="text-xs text-green-400 font-semibold p-2 bg-green-500/10 rounded-lg">{success}</div>}

            <div className="flex gap-2">
              {editingUser && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingUser(null);
                    setEmail('');
                    setPassword('');
                    setError('');
                    setSuccess('');
                  }}
                  className="w-1/2 py-2 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit" 
                disabled={isLoading}
                className={`py-2 text-zinc-900 rounded-lg text-sm font-medium flex items-center justify-center transition-colors disabled:opacity-50 ${editingUser ? 'w-1/2 bg-zinc-50 hover:bg-zinc-200' : 'w-full bg-zinc-50 hover:bg-zinc-200'}`}
              >
                {editingUser ? <Edit className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                {isLoading ? 'Saving...' : (editingUser ? 'Save' : 'Create Account')}
              </button>
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
          <h4 className="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Active Administrators</h4>
          
          <div className="space-y-3">
            {/* Root Admin Placeholder */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex justify-between items-center relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-500" />
              <div>
                <div className="text-sm font-semibold text-zinc-50">Root Master Admin</div>
                <div className="text-xs text-zinc-500 mt-1 font-mono">Managed via .env file</div>
              </div>
              <span className="px-2 py-0.5 bg-zinc-850 text-zinc-400 border border-zinc-700 rounded text-[9px] font-semibold uppercase tracking-wider">
                System
              </span>
            </div>

            {/* Sub Admins */}
            {users.map(u => (
              <div key={u.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex justify-between items-center">
                <div>
                  <div className="text-sm font-semibold text-zinc-50">{u.email}</div>
                  <div className="text-xs text-zinc-500 mt-1">Created: {new Date(u.created_at).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingUser(u);
                      setEmail(u.email);
                      setPassword('');
                      setError('');
                      setSuccess('');
                    }}
                    className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Edit Administrator"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleRevoke(u.id)}
                    className="p-2 bg-zinc-900 border border-zinc-800 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors"
                    title="Revoke Administrator Access"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {users.length === 0 && (
              <div className="text-center p-6 text-sm text-zinc-500 italic">
                No sub-admins created yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
