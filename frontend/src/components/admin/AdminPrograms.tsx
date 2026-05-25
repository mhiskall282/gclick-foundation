import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X , Upload } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export const AdminPrograms = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<any>({
    title: '', description: '', details: '', duration: '', image: '', syllabus: []
  });
  const [syllabusInput, setSyllabusInput] = useState('');

  
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
      setCurrentProgram({ ...currentProgram, image: data.url });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/api/programs');
      if (!res.ok) throw new Error('Failed to fetch programs');
      const data = await res.json();
      setPrograms(data);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentProgram.id 
        ? `/api/programs/${currentProgram.id}` 
        : '/api/programs';
      const method = currentProgram.id ? 'PUT' : 'POST';
      
      const res = await fetchApi(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProgram)
      });
      
      if (!res.ok) throw new Error('Failed to save program');
      setIsEditing(false);
      fetchPrograms();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addSyllabusItem = () => {
    if (syllabusInput.trim()) {
      setCurrentProgram({ ...currentProgram, syllabus: [...(currentProgram.syllabus || []), syllabusInput.trim()] });
      setSyllabusInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-display font-bold text-white">Manage Programs</h3>
        {!isEditing && (
          <button onClick={() => { setCurrentProgram({ title: '', description: '', details: '', duration: '', image: '', syllabus: [] }); setIsEditing(true); }} className="px-4 py-2 bg-brand-pink text-white rounded-lg flex items-center text-sm font-semibold hover:bg-brand-pink/90">
            <Plus className="h-4 w-4 mr-2" /> Add Program
          </button>
        )}
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

      {isEditing ? (
        <div className="bg-brand-dark-card border border-brand-dark-border rounded-2xl p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
                <input required type="text" value={currentProgram.title} onChange={e => setCurrentProgram({...currentProgram, title: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Duration</label>
                <input required type="text" value={currentProgram.duration} onChange={e => setCurrentProgram({...currentProgram, duration: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Short Description</label>
              <input required type="text" value={currentProgram.description} onChange={e => setCurrentProgram({...currentProgram, description: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Full Details</label>
              <textarea required rows={4} value={currentProgram.details} onChange={e => setCurrentProgram({...currentProgram, details: e.target.value})} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none"></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Image Upload</label>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
                {isUploading && <span className="text-xs text-brand-pink animate-pulse">Uploading...</span>}
              </div>
              {currentProgram.image && (
                <div className="mt-2 text-xs text-gray-400 truncate">
                  Current: <a href={currentProgram.image} target="_blank" rel="noreferrer" className="text-brand-pink hover:underline">{currentProgram.image}</a>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Syllabus</label>
              <div className="flex gap-2 mb-2">
                <input type="text" value={syllabusInput} onChange={e => setSyllabusInput(e.target.value)} placeholder="Add topic..." className="flex-1 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
                <button type="button" onClick={addSyllabusItem} className="px-3 py-2 bg-[#1E1E21] rounded-lg text-sm font-semibold hover:bg-gray-700">Add</button>
              </div>
              <ul className="space-y-1">
                {currentProgram.syllabus?.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 flex items-center bg-brand-dark-obsidian p-2 rounded border border-brand-dark-border">
                    <span className="flex-1">{item}</span>
                    <button type="button" onClick={() => setCurrentProgram({...currentProgram, syllabus: currentProgram.syllabus.filter((_:any, index:number) => index !== i)})} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-brand-dark-border text-gray-400 rounded-lg text-sm font-semibold hover:bg-white/5">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-brand-pink text-white rounded-lg flex items-center text-sm font-semibold hover:bg-brand-pink/90">
                <Save className="h-4 w-4 mr-2" /> Save Program
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {loading ? <p className="text-gray-400">Loading programs...</p> : programs.map(p => (
            <div key={p.id} className="bg-brand-dark-card border border-brand-dark-border p-4 rounded-xl flex justify-between items-center hover:border-brand-pink/50 transition-colors">
              <div>
                <h4 className="font-bold text-white text-lg">{p.title}</h4>
                <p className="text-gray-400 text-sm">{p.duration}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentProgram(p); setIsEditing(true); }} className="p-2 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg text-gray-400 hover:text-brand-pink"><Edit2 className="h-4 w-4" /></button>
                <button 
                  onClick={async () => {
                    if (window.confirm('Delete this program?')) {
                      await fetch(`/api/programs/${p.id}`, { method: 'DELETE' });
                      fetchPrograms();
                    }
                  }} 
                  className="p-2 bg-brand-dark-obsidian border border-brand-dark-border rounded-lg text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {!loading && programs.length === 0 && <p className="text-gray-500 italic text-sm">No programs found.</p>}
        </div>
      )}
    </div>
  );
};
