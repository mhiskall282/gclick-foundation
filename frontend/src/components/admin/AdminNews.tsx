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
      await fetchApi(url, { method, body: JSON.stringify(formData) });
      setIsModalOpen(false); setCurrentItem(null); setFormData({ title: '', content: '', date: '', image: '' }); fetchItems();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-zinc-50">News & Insights CMS</h3>
        <button onClick={() => { setCurrentItem(null); setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], image: '' }); setIsModalOpen(true); }} className="flex items-center px-4 py-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 rounded-lg text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add News
        </button>
      </div>

      {isLoading ? <div className="text-zinc-550 text-sm">Loading...</div> : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-950 border border-zinc-850 rounded-lg p-4 flex gap-4">
              {item.image && <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover border border-zinc-800" />}
              <div className="flex-1">
                <h4 className="font-semibold text-zinc-100 text-base">{item.title}</h4>
                <p className="text-xs text-zinc-400 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setCurrentItem(item); setFormData({ title: item.title, content: item.content, date: item.date.split('T')[0], image: item.image || '' }); setIsModalOpen(true); }} className="p-1.5 text-zinc-400 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 rounded-lg"><Edit2 className="h-3.5 w-3.5" /></button>
                  <button onClick={async () => { if(confirm('Delete?')){ await fetchApi(`/api/news/${item.id}`, { method: 'DELETE' }); fetchItems(); } }} className="p-1.5 text-red-400 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 rounded-lg"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-xl p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-zinc-50 mb-4">{currentItem ? 'Edit News' : 'Add News'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Title</label>
                <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Date</label>
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Image Upload</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
                  {isUploading && <span className="text-xs text-zinc-450 animate-pulse">Uploading...</span>}
                </div>
                {formData.image && <div className="text-xs text-zinc-500 truncate mt-2">Current: <a href={formData.image} target="_blank" rel="noreferrer" className="text-zinc-450 hover:underline">{formData.image}</a></div>}
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Content</label>
                <textarea required rows={4} placeholder="Content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600" />
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
