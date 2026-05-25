import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

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

  const fetchLeaders = async () => {
    try {
      const res = await fetch('/api/leadership');
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

      await fetch(url, {
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
      await fetch(`/api/leadership/${id}`, { method: 'DELETE' });
      fetchLeaders();
    }
  };

  return (
    <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-bold">Leadership CMS</h3>
        <button 
          onClick={() => {
            setCurrentLeader(null);
            setFormData({ name: '', role: '', bio: '', image: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl text-sm font-bold transition-all"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Leader
        </button>
      </div>

      {isLoading ? (
        <div className="text-gray-400">Loading leadership...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-brand-dark-obsidian border border-brand-dark-border rounded-xl p-4 flex gap-4">
              {leader.image && <img src={leader.image} alt={leader.name} className="w-16 h-16 rounded-full object-cover" />}
              <div className="flex-1">
                <h4 className="font-bold text-lg">{leader.name}</h4>
                <p className="text-brand-pink text-xs font-semibold uppercase">{leader.role}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(leader)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-md">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(leader.id)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-dark-card border border-brand-dark-border rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">{currentLeader ? 'Edit Leader' : 'Add New Leader'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Role</label>
                <input required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Image URL</label>
                <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Bio</label>
                <textarea required rows={4} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-xl px-4 py-3 text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
