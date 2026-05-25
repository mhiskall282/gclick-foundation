import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 , Upload } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export const AdminNews = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    image: '',
  });

  useEffect(() => { fetchItems(); }, []);

  
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

  const fetchItems = async () => {
    try {
      const res = await fetchApi('/api/news');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentItem ? `/api/news/${currentItem.id}` : '/api/news';
      const method = currentItem ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      setIsModalOpen(false); setCurrentItem(null); setFormData({ title: '', content: '', date: '', image: '' }); fetchItems();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-bold">News & Insights CMS</h3>
        <button onClick={() => { setCurrentItem(null); setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], image: '' }); setIsModalOpen(true); }} className="flex items-center px-4 py-2 bg-brand-pink text-white rounded-xl text-sm font-bold">
          <Plus className="h-4 w-4 mr-2" /> Add News
        </button>
      </div>

      {isLoading ? <div>Loading...</div> : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-brand-dark-obsidian border border-brand-dark-border rounded-xl p-4 flex gap-4">
              {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />}
              <div className="flex-1">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-brand-pink mt-1">{new Date(item.date).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setCurrentItem(item); setFormData({ title: item.title, content: item.content, date: item.date.split('T')[0], image: item.image || '' }); setIsModalOpen(true); }} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-md"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={async () => { if(confirm('Delete?')){ await fetch(`/api/news/${item.id}`, { method: 'DELETE' }); fetchItems(); } }} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md"><Trash2 className="h-4 w-4" /></button>
                </div>
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
              <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-brand-dark-obsidian rounded-xl px-4 py-3 border border-brand-dark-border" />
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-brand-dark-obsidian rounded-xl px-4 py-3 border border-brand-dark-border" />
                {isUploading && <span className="text-xs text-brand-pink animate-pulse">Uploading...</span>}
              </div>
              {formData.image && <div className="text-xs text-gray-400 truncate">Current: <a href={formData.image} target="_blank" rel="noreferrer" className="text-brand-pink">{formData.image}</a></div>}
              <textarea required rows={4} placeholder="Content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-brand-dark-obsidian rounded-xl px-4 py-3 border border-brand-dark-border" />
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
