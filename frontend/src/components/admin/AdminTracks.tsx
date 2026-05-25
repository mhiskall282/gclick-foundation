import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export const AdminTracks = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
  });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await fetchApi('/api/tracks');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentItem ? `/api/tracks/${currentItem.id}` : '/api/tracks';
      const method = currentItem ? 'PUT' : 'POST';
      await fetchApi(url, { method, body: JSON.stringify(formData) });
      setIsModalOpen(false); setCurrentItem(null); setFormData({ title: '', description: '', details: '' }); fetchItems();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-zinc-50">Educational Tracks</h3>
        <button onClick={() => { setCurrentItem(null); setFormData({ title: '', description: '', details: '' }); setIsModalOpen(true); }} className="flex items-center px-4 py-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 rounded-lg text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add Track
        </button>
      </div>

      {isLoading ? <div className="text-zinc-550 text-sm">Loading...</div> : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-950 border border-zinc-850 rounded-lg p-4">
              <h4 className="font-semibold text-zinc-100 text-base">{item.title}</h4>
              <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setCurrentItem(item); setFormData({ title: item.title, description: item.description, details: item.details || '' }); setIsModalOpen(true); }} className="p-1.5 text-zinc-400 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 rounded-lg"><Edit2 className="h-3.5 w-3.5" /></button>
                <button onClick={async () => { if(confirm('Delete?')){ await fetchApi(`/api/tracks/${item.id}`, { method: 'DELETE' }); fetchItems(); } }} className="p-1.5 text-red-400 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 rounded-lg"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-xl p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-zinc-50 mb-4">{currentItem ? 'Edit Track' : 'Add Track'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Title</label>
                <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
                <textarea required placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Details</label>
                <textarea placeholder="Details" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
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
