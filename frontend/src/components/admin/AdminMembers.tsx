import React, { useState, useEffect, useRef } from 'react';
import { Users, Upload, Download, Trash2, Check, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { fetchApi } from '../../lib/api';

export const AdminMembers = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/api/members');
      if (!res.ok) throw new Error('Failed to fetch members');
      const data = await res.json();
      setMembers(data);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSuccess('');
    
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        // Map excel columns to our db columns
        const formattedData = data.map((row: any) => ({
          name: row.Name || row.name || '',
          email: row.Email || row.email || '',
          phone: row.Phone || row.phone || '',
          location: row.Location || row.location || '',
          address: row.Address || row.address || '',
          employment_status: row.Status || row.status || '',
          student_year: row.Year || row.year || '',
          background_info: row.Background || row.background || ''
        })).filter(m => m.name && m.email); // filter invalid

        if (formattedData.length === 0) {
          throw new Error('No valid members found in Excel file. Ensure columns Name and Email exist.');
        }

        const res = await fetchApi('/api/members/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to bulk import members');
        }

        setSuccess(`Successfully imported ${formattedData.length} members!`);
        fetchMembers();
      } catch (err: any) {
        setError(err.message);
      }
    };
    reader.readAsBinaryString(file);
    
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExport = () => {
    try {
      const exportData = members.map(m => ({
        ID: m.id,
        Name: m.name,
        Email: m.email,
        Phone: m.phone,
        Location: m.location,
        Address: m.address,
        Status: m.employment_status,
        Year: m.student_year,
        Motivation: m.background_info,
        'Joined At': new Date(m.joined_at).toLocaleString()
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Members");
      XLSX.writeFile(wb, "gclick_members.xlsx");
      setSuccess('Members exported successfully!');
    } catch (err: any) {
      setError('Failed to export members: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-display font-bold text-white flex items-center">
          <Users className="h-5 w-5 mr-2 text-brand-pink" />
          Member Directory
        </h3>
        <div className="flex space-x-3">
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-brand-dark-border text-gray-300 rounded-lg flex items-center text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            <Upload className="h-4 w-4 mr-2" /> Import Excel
          </button>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-brand-pink text-white rounded-lg flex items-center text-sm font-semibold hover:bg-brand-pink/90 transition-colors shadow-lg shadow-brand-pink/20"
          >
            <Download className="h-4 w-4 mr-2" /> Export to Excel
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" /> {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center">
          <Check className="h-4 w-4 mr-2" /> {success}
        </div>
      )}

      <div className="bg-brand-dark-card border border-brand-dark-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-brand-dark-obsidian/50 text-xs uppercase text-gray-500 border-b border-brand-dark-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Name & Contact</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Joined At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark-border">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading members...</td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">No members found. Add some or import an Excel sheet.</td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-gray-300 text-xs mt-1">{member.email}</div>
                      {member.phone && <div className="text-xs text-gray-500">{member.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{member.location || 'N/A'}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[150px]">{member.address}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs capitalize text-brand-pink">
                        {member.employment_status || 'Unknown'}
                      </span>
                      {member.student_year && <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{member.student_year}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                      {new Date(member.joined_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
