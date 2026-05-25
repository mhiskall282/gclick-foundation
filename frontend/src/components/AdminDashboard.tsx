import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Mail, DollarSign, LogOut, Activity, Database, CheckCircle, RefreshCw, PenTool, LayoutTemplate, Star, Video, Newspaper, Archive } from 'lucide-react';
import { AdminPrograms } from './admin/AdminPrograms';
import { AdminBlog } from './admin/AdminBlog';
import { AdminMembers } from './admin/AdminMembers';
import { AdminLeadership } from './admin/AdminLeadership';
import { AdminTracks } from './admin/AdminTracks';
import { AdminLabs } from './admin/AdminLabs';
import { AdminNews } from './admin/AdminNews';
import { AdminResources } from './admin/AdminResources';
import { AdminUsers } from './admin/AdminUsers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'blog' | 'members' | 'leadership' | 'tracks' | 'labs' | 'news' | 'resources' | 'submissions' | 'api-logs' | 'users'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated (using local storage token)
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const stats = [
    { name: 'Cluster Users', value: '1,234', icon: Users, change: '+12% growth' },
    { name: 'Syllabi Modules', value: '12 Active', icon: BookOpen, change: 'All nodes healthy' },
    { name: 'Form Submissions', value: '23 New', icon: Mail, change: 'Web3Forms integrated' },
    { name: 'Total Sponsoring', value: 'GH₵172,830', icon: DollarSign, change: '+$2,100 this week' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark-obsidian text-white flex font-body overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-72 bg-[#121214] border-r border-brand-dark-border flex flex-col shrink-0">
        <div className="p-6 border-b border-brand-dark-border">
          <h1 className="text-xl font-display font-extrabold text-white mb-2">G-Click Console</h1>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-brand-pink font-bold bg-brand-pink/10 px-2 py-1 rounded-full border border-brand-pink/20 inline-flex items-center w-fit">
              <Database className="h-3 w-3 mr-1.5" /> Cluster-01
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 inline-flex items-center w-fit">
              <CheckCircle className="h-3 w-3 mr-1" /> Database: Healthy
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Main Menu</p>
          
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'overview' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Activity className="h-4 w-4 mr-3" /> Overview
          </button>
          
          <div className="pt-4 pb-2"><p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Content Management</p></div>
          
          <button onClick={() => setActiveTab('programs')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'programs' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutTemplate className="h-4 w-4 mr-3" /> Programs
          </button>
          <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'blog' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <PenTool className="h-4 w-4 mr-3" /> Blog
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'news' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Newspaper className="h-4 w-4 mr-3" /> News & Insights
          </button>
          <button onClick={() => setActiveTab('leadership')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'leadership' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Star className="h-4 w-4 mr-3" /> Leadership
          </button>
          <button onClick={() => setActiveTab('tracks')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'tracks' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <BookOpen className="h-4 w-4 mr-3" /> Educational Tracks
          </button>
          <button onClick={() => setActiveTab('labs')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'labs' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Video className="h-4 w-4 mr-3" /> Interactive Labs
          </button>
          <button onClick={() => setActiveTab('resources')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'resources' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Archive className="h-4 w-4 mr-3" /> Resources Hub
          </button>
          
          <div className="pt-4 pb-2"><p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">User Data & Logs</p></div>

          <button onClick={() => setActiveTab('members')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'members' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Users className="h-4 w-4 mr-3" /> Members Directory
          </button>
          <button onClick={() => setActiveTab('submissions')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'submissions' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <DollarSign className="h-4 w-4 mr-3" /> Sponsorship Log
          </button>
          <button onClick={() => setActiveTab('api-logs')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'api-logs' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Activity className="h-4 w-4 mr-3" /> API Webhooks
          </button>
          <div className="pt-4 pb-2"><p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">System Administration</p></div>

          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'users' ? 'bg-brand-pink/10 text-brand-pink' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Shield className="h-4 w-4 mr-3" /> Admin Users
          </button>
        </nav>

        <div className="p-4 border-t border-brand-dark-border">
          <button onClick={() => { localStorage.removeItem('token'); sessionStorage.removeItem('isAuthenticated'); navigate('/admin/login'); }} className="w-full flex items-center justify-center px-4 py-2.5 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-xl text-sm font-semibold transition-all">
            <LogOut className="h-4 w-4 mr-2" /> Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative supabase-grid">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="p-8 lg:p-12 max-w-7xl mx-auto relative z-10">
          
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-brand-dark-border">
            <h2 className="text-2xl font-display font-bold text-white capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
            <button
              onClick={triggerRefresh}
              className={`p-2.5 bg-brand-dark-card border border-brand-dark-border hover:bg-[#1E1E21] text-gray-400 hover:text-white rounded-xl transition-all shadow-sm ${isRefreshing ? 'animate-spin text-brand-pink' : ''}`}
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.name}
                    className="bg-brand-dark-card border border-brand-dark-border p-6 rounded-2xl shadow-2xl flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-4">
                        <dt className="text-xs font-bold text-gray-500 uppercase tracking-wider truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-2xl xl:text-3xl font-display font-extrabold text-white mt-1 truncate" title={stat.value}>
                          {stat.value}
                        </dd>
                      </div>
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-dark-obsidian border border-brand-dark-border flex items-center justify-center">
                        <Icon className="h-5 w-5 text-brand-pink" />
                      </div>
                    </div>
                    <p className="text-[10px] text-brand-pink font-bold mt-4 uppercase tracking-wider">{stat.change}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Metrics */}
            <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center">
                <Activity className="h-5 w-5 text-brand-pink mr-2.5" />
                Live Node Log
              </h2>
              <div className="space-y-4">
                {[
                  { desc: 'MTN MoMo validation payload compiled - transaction ID: tx_89172', node: 'Node-West-02', status: 'SUCCESS' },
                  { desc: 'Form submission received via Web3Forms API endpoint', node: 'Node-Web-01', status: 'SUCCESS' },
                  { desc: 'Cache purge completed for syllabus resource collections', node: 'Node-Cache-01', status: 'COMPLETED' },
                ].map((log, index) => (
                  <div key={index} className="flex justify-between items-center text-xs p-4 bg-brand-dark-obsidian border border-brand-dark-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
                      <span className="text-gray-400 font-mono">{log.node}</span>
                      <span className="text-gray-200">{log.desc}</span>
                    </div>
                    <span className="text-[10px] font-bold text-brand-pink bg-brand-pink/10 px-2.5 py-1 rounded-md border border-brand-pink/20">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'programs' && <AdminPrograms />}
        {activeTab === 'blog' && <AdminBlog />}
        {activeTab === 'members' && <AdminMembers />}
        {activeTab === 'leadership' && <AdminLeadership />}
        {activeTab === 'tracks' && <AdminTracks />}
        {activeTab === 'labs' && <AdminLabs />}
        {activeTab === 'news' && <AdminNews />}
        {activeTab === 'resources' && <AdminResources />}
        {activeTab === 'users' && <AdminUsers />}

        {activeTab === 'submissions' && (
          <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-brand-dark-border flex justify-between items-center">
              <h3 className="text-lg font-display font-bold text-white">Recent Transactions</h3>
              <span className="text-xs text-gray-500 font-semibold">Latest 4 checkouts</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-brand-dark-obsidian/50 text-gray-400 font-semibold border-b border-brand-dark-border text-xs uppercase tracking-wider">
                    <th className="p-4 pl-6">Donor / Student</th>
                    <th className="p-4">Value</th>
                    <th className="p-4">Provider</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-dark-border/50">
                  {[
                    { name: 'Kofi Owusu', amount: 'GH₵1,400', type: 'MTN Mobile Money', date: 'May 24, 2026', status: 'PAID' },
                    { name: 'Ama Serwaa', amount: '$100', type: 'Credit Card', date: 'May 24, 2026', status: 'PAID' },
                    { name: 'John Miller', amount: '$500', type: 'Credit Card', date: 'May 23, 2026', status: 'PAID' },
                    { name: 'Ekow Mensah', amount: 'GH₵350', type: 'Telecel Cash', date: 'May 22, 2026', status: 'PAID' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-brand-dark-obsidian/30 transition-colors">
                      <td className="p-4 pl-6 font-semibold">{row.name}</td>
                      <td className="p-4 text-brand-pink font-bold">{row.amount}</td>
                      <td className="p-4 text-gray-400 font-mono text-xs">{row.type}</td>
                      <td className="p-4 text-gray-400 text-xs">{row.date}</td>
                      <td className="p-4 pr-6">
                        <span className="text-[10px] font-bold text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-2 py-0.5 rounded-full">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'api-logs' && (
          <div className="bg-brand-dark-card border border-brand-dark-border rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-display font-bold">Webhook Registries</h3>
              <span className="text-xs text-gray-500 font-semibold">Web3Forms & Paystack Status</span>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-brand-dark-obsidian border border-brand-dark-border rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white font-mono text-sm">web3forms_contact_v1</span>
                  <span className="text-[10px] font-bold text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-2 py-0.5 rounded-full">ACTIVE</span>
                </div>
                <p className="text-xs text-gray-400">Listens to frontend submissions on `/contact` form and redirects to admin inbox mail.</p>
              </div>

              <div className="p-6 bg-brand-dark-obsidian border border-brand-dark-border rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white font-mono text-sm">paystack_checkout_webhook</span>
                  <span className="text-[10px] font-bold text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-2 py-0.5 rounded-full">ACTIVE</span>
                </div>
                <p className="text-xs text-gray-400">Triggers post-donation status flags on successful mobile money validation transactions.</p>
              </div>
            </div>
          </div>
        )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
