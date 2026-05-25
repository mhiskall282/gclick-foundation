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
        <h3 className="text-lg font-semibold text-zinc-50">Manage Programs</h3>
        {!isEditing && (
          <button onClick={() => { setCurrentProgram({ title: '', description: '', details: '', duration: '', image: '', syllabus: [] }); setIsEditing(true); }} className="px-4 py-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 rounded-lg flex items-center text-sm font-semibold transition-colors">
            <Plus className="h-4 w-4 mr-2" /> Add Program
          </button>
        )}
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}

      {isEditing ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Title</label>
                <input required type="text" value={currentProgram.title} onChange={e => setCurrentProgram({...currentProgram, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Duration</label>
                <input required type="text" value={currentProgram.duration} onChange={e => setCurrentProgram({...currentProgram, duration: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Short Description</label>
              <input required type="text" value={currentProgram.description} onChange={e => setCurrentProgram({...currentProgram, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Details</label>
              <textarea required rows={4} value={currentProgram.details} onChange={e => setCurrentProgram({...currentProgram, details: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none"></textarea>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Image Upload</label>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-650 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
                {isUploading && <span className="text-xs text-zinc-400 animate-pulse">Uploading...</span>}
              </div>
              {currentProgram.image && (
                <div className="mt-2 text-xs text-zinc-500 truncate">
                  Current: <a href={currentProgram.image} target="_blank" rel="noreferrer" className="text-zinc-450 hover:underline">{currentProgram.image}</a>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Syllabus</label>
              <div className="flex gap-2 mb-2">
                <input type="text" value={syllabusInput} onChange={e => setSyllabusInput(e.target.value)} placeholder="Add topic..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none" />
                <button type="button" onClick={addSyllabusItem} className="px-3 py-2 bg-zinc-800 rounded-lg text-sm font-semibold hover:bg-zinc-700">Add</button>
              </div>
              <ul className="space-y-1">
                {currentProgram.syllabus?.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-zinc-300 flex items-center bg-zinc-950 p-2 rounded-lg border border-zinc-850">
                    <span className="flex-1">{item}</span>
                    <button type="button" onClick={() => setCurrentProgram({...currentProgram, syllabus: currentProgram.syllabus.filter((_:any, index:number) => index !== i)})} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-zinc-800 text-zinc-400 rounded-lg text-sm font-medium hover:bg-zinc-800">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 rounded-lg flex items-center text-sm font-medium transition-colors">
                <Save className="h-4 w-4 mr-2" /> Save Program
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {loading ? <p className="text-zinc-500 text-sm">Loading programs...</p> : programs.map(p => (
            <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center transition-colors">
              <div>
                <h4 className="font-semibold text-zinc-100 text-base">{p.title}</h4>
                <p className="text-zinc-500 text-xs mt-1">{p.duration}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentProgram(p); setIsEditing(true); }} className="p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-zinc-400 hover:text-zinc-100"><Edit2 className="h-4 w-4" /></button>
                <button 
                  onClick={async () => {
                    if (window.confirm('Delete this program?')) {
                      await fetchApi(`/api/programs/${p.id}`, { method: 'DELETE' });
                      fetchPrograms();
                    }
                  }} 
                  className="p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-zinc-450 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {!loading && programs.length === 0 && <p className="text-zinc-500 italic text-sm">No programs found.</p>}
        </div>
      )}
    </div>
  );
};
