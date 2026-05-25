import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save , Upload } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export const AdminBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>({
    title: '', date: '', author: '', readTime: '', image: '', content: ''
  });

  
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetchApi('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setCurrentPost({ ...currentPost, image: data.url });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/api/blog');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentPost.id 
        ? `/api/blog/${currentPost.id}` 
        : '/api/blog';
      const method = currentPost.id ? 'PUT' : 'POST';
      
      const res = await fetchApi(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPost)
      });
      
      if (!res.ok) throw new Error('Failed to save post');
      setIsEditing(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-display font-bold text-white">Manage Blog Posts</h3>
        {!isEditing && (
          <button onClick={() => { setCurrentPost({ title: '', date: '', author: '', readTime: '', image: '', content: '' }); setIsEditing(true); }} className="px-4 py-2 bg-brand-pink text-white rounded-lg flex items-center text-sm font-semibold hover:bg-brand-pink/90">
            <Plus className="h-4 w-4 mr-2" /> New Post
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-brand-dark-card border border-brand-dark-border rounded-2xl p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
                <input required type="text" value={currentPost.title} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Author</label>
                <input required type="text" value={currentPost.author} onChange={e => setCurrentPost({...currentPost, author: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Read Time</label>
                <input required type="text" value={currentPost.readTime} onChange={e => setCurrentPost({...currentPost, readTime: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" placeholder="e.g. 5 min read" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Date</label>
                <input required type="date" value={currentPost.date} onChange={e => setCurrentPost({...currentPost, date: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Image Upload</label>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
                {isUploading && <span className="text-xs text-brand-pink animate-pulse">Uploading...</span>}
              </div>
              {currentPost.image && (
                <div className="mt-2 text-xs text-gray-400 truncate">
                  Current: <a href={currentPost.image} target="_blank" rel="noreferrer" className="text-brand-pink hover:underline">{currentPost.image}</a>
                </div>
              )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Content (Use \n for paragraphs)</label>
              <textarea required rows={6} value={currentPost.content} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none"></textarea>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-brand-dark-border text-gray-400 rounded-lg text-sm font-semibold hover:bg-white/5">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-brand-pink text-white rounded-lg flex items-center text-sm font-semibold hover:bg-brand-pink/90">
                <Save className="h-4 w-4 mr-2" /> Save Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {loading ? <p className="text-gray-400">Loading posts...</p> : posts.map(p => (
            <div key={p.id} className="bg-brand-dark-card border border-brand-dark-border p-4 rounded-xl flex justify-between items-center hover:border-brand-pink/50 transition-colors">
              <div>
                <h4 className="font-bold text-white text-lg">{p.title}</h4>
                <p className="text-gray-400 text-xs mt-1">By {p.author} • {p.date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentPost(p); setIsEditing(true); }} className="p-2 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg text-gray-400 hover:text-brand-pink"><Edit2 className="h-4 w-4" /></button>
                <button 
                  onClick={async () => {
                    if (window.confirm('Delete this post?')) {
                      await fetchApi(`/api/blog/${p.id}`, { method: 'DELETE' });
                      fetchPosts();
                    }
                  }} 
                  className="p-2 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {!loading && posts.length === 0 && <p className="text-gray-500 italic text-sm">No posts found.</p>}
        </div>
      )}
    </div>
  );
};
