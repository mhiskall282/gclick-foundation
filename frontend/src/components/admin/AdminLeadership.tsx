import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 , Upload } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export const AdminLeadership = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeader, setCurrentLeader] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
  });

  useEffect(() => {
    fetchLeaders();
  }, []);

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const dataObj = new FormData();
    dataObj.append('image', file);
    try {
      const res = await fetchApi('/api/upload', {
        method: 'POST',
        body: dataObj
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setFormData({ ...formData, image: data.url });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchLeaders = async () => {
    try {
      const res = await fetchApi('/api/leadership');
      const data = await res.json();
      setLeaders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentLeader 
        ? `/api/leadership/${currentLeader.id}` 
        : '/api/leadership';
      
      const method = currentLeader ? 'PUT' : 'POST';

      await fetchApi(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsModalOpen(false);
      setCurrentLeader(null);
      setFormData({ name: '', role: '', bio: '', image: '' });
      fetchLeaders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (leader: any) => {
    setCurrentLeader(leader);
    setFormData({
      name: leader.name,
      role: leader.role,
      bio: leader.bio,
      image: leader.image || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this leader?')) {
      await fetchApi(`/api/leadership/${id}`, { method: 'DELETE' });
      fetchLeaders();
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-zinc-50">Leadership CMS</h3>
        <button 
          onClick={() => {
            setCurrentLeader(null);
            setFormData({ name: '', role: '', bio: '', image: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Leader
        </button>
      </div>

      {isLoading ? (
        <div className="text-zinc-550 text-sm">Loading leadership...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-zinc-950 border border-zinc-850 rounded-lg p-4 flex gap-4">
              {leader.image && <img src={leader.image} alt={leader.name} className="w-14 h-14 rounded-full object-cover border border-zinc-800" />}
              <div className="flex-1">
                <h4 className="font-semibold text-zinc-100 text-base">{leader.name}</h4>
                <p className="text-zinc-400 text-xs mt-0.5">{leader.role}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(leader)} className="p-1.5 text-zinc-400 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 rounded-lg">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(leader.id)} className="p-1.5 text-red-400 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 rounded-lg">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-zinc-50 mb-4">{currentLeader ? 'Edit Leader' : 'Add New Leader'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Role</label>
                <input required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Image Upload</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
                  {isUploading && <span className="text-xs text-zinc-450 animate-pulse">Uploading...</span>}
                </div>
                {formData.image && (
                  <div className="mt-2 text-xs text-zinc-550 truncate">
                    Current: <a href={formData.image} target="_blank" rel="noreferrer" className="text-zinc-450 hover:underline">{formData.image}</a>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Bio</label>
                <textarea required rows={4} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-zinc-800 text-zinc-400 rounded-lg text-sm font-medium hover:bg-zinc-800">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 rounded-lg text-sm font-medium transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
