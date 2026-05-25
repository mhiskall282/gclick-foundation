import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

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
      const res = await fetch('/api/tracks');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentItem ? `/api/tracks/${currentItem.id}` : '/api/tracks';
      const method = currentItem ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      setIsModalOpen(false); setCurrentItem(null); setFormData({ title: '', description: '', details: '' }); fetchItems();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-bold">Educational Tracks</h3>
        <button onClick={() => { setCurrentItem(null); setFormData({ title: '', description: '', details: '' }); setIsModalOpen(true); }} className="flex items-center px-4 py-2 bg-brand-pink text-white rounded-xl text-sm font-bold">
          <Plus className="h-4 w-4 mr-2" /> Add Track
        </button>
      </div>

      {isLoading ? <div>Loading...</div> : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-brand-dark-obsidian border border-brand-dark-border rounded-xl p-4">
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setCurrentItem(item); setFormData({ title: item.title, description: item.description, details: item.details || '' }); setIsModalOpen(true); }} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-md"><Edit2 className="h-4 w-4" /></button>
                <button onClick={async () => { if(confirm('Delete?')){ await fetch(`/api/tracks/${item.id}`, { method: 'DELETE' }); fetchItems(); } }} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-brand-dark-card border border-brand-dark-border rounded-2xl w-full max-w-xl p-6">
            <h2 className="text-xl font-bold mb-4">{currentItem ? 'Edit' : 'Add'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-brand-dark-obsidian rounded-xl px-4 py-3 border border-brand-dark-border" />
              <textarea required placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-brand-dark-obsidian rounded-xl px-4 py-3 border border-brand-dark-border" />
              <textarea placeholder="Details" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-brand-dark-obsidian rounded-xl px-4 py-3 border border-brand-dark-border" />
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white/5 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-brand-pink text-white rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
