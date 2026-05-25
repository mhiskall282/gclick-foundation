import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Mail, DollarSign, LogOut, Activity, Database, CheckCircle, RefreshCw, PenTool, LayoutTemplate, Star, Video, Newspaper, Archive, Shield } from 'lucide-react';
import { fetchApi } from '../lib/api';
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
  
  const [statsData, setStatsData] = useState({
    membersCount: 0,
    programsCount: 0,
    blogsCount: 0,
    adminsCount: 0,
  });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const loadStats = async () => {
    try {
      const [resMembers, resPrograms, resBlogs, resAdmins] = await Promise.all([
        fetchApi('/api/members'),
        fetchApi('/api/programs'),
        fetchApi('/api/blog'),
        fetchApi('/api/auth/users').catch(() => null)
      ]);

      const members = resMembers && resMembers.ok ? await resMembers.json() : [];
      const programs = resPrograms && resPrograms.ok ? await resPrograms.json() : [];
      const blogs = resBlogs && resBlogs.ok ? await resBlogs.json() : [];
      const admins = resAdmins && resAdmins.ok ? await resAdmins.json() : [];

      setStatsData({
        membersCount: Array.isArray(members) ? members.length : 0,
        programsCount: Array.isArray(programs) ? programs.length : 0,
        blogsCount: Array.isArray(blogs) ? blogs.length : 0,
        adminsCount: Array.isArray(admins) ? admins.length : 0,
      });

      // Construct live audit logs based on real records across database
      const logs: any[] = [];
      if (Array.isArray(members)) {
        members.forEach((m: any) => {
          logs.push({
            desc: `New member registered: ${m.name} (${m.email})`,
            node: m.location || 'Ghana Node',
            status: 'MEMBER',
            time: new Date(m.joined_at).getTime()
          });
        });
      }
      if (Array.isArray(programs)) {
        programs.forEach((p: any) => {
          logs.push({
            desc: `Syllabus program module added: "${p.title}"`,
            node: 'CMS-Engine',
            status: 'PROGRAM',
            time: new Date(p.created_at).getTime()
          });
        });
      }
      if (Array.isArray(blogs)) {
        blogs.forEach((b: any) => {
          logs.push({
            desc: `Blog publication published: "${b.title}"`,
            node: 'Blog-Pub',
            status: 'BLOG',
            time: new Date(b.created_at).getTime()
          });
        });
      }
      if (Array.isArray(admins)) {
        admins.forEach((a: any) => {
          logs.push({
            desc: `Sub-administrator access configured: ${a.email}`,
            node: 'Security-Core',
            status: 'ADMIN',
            time: new Date(a.created_at).getTime()
          });
        });
      }

      const sortedLogs = logs
        .sort((a, b) => b.time - a.time)
        .slice(0, 5);

      if (sortedLogs.length > 0) {
        setRecentLogs(sortedLogs);
      } else {
        setRecentLogs([
          { desc: 'Waiting for database events...', node: 'System-Core', status: 'IDLE' }
        ]);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadStats();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const triggerRefresh = () => {
    setIsRefreshing(true);
    loadStats();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const stats = [
    { name: 'Registered Members', value: isLoadingStats ? '...' : `${statsData.membersCount} Members`, icon: Users, change: 'Live from database' },
    { name: 'Syllabi Modules', value: isLoadingStats ? '...' : `${statsData.programsCount} Programs`, icon: BookOpen, change: 'CMS Active' },
    { name: 'Blog Publications', value: isLoadingStats ? '...' : `${statsData.blogsCount} Posts`, icon: Mail, change: 'Published' },
    { name: 'Console Administrators', value: isLoadingStats ? '...' : `${statsData.adminsCount + 1} Admins`, icon: Shield, change: '1 Root + Sub-admins' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex font-body overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-lg font-semibold text-zinc-50 mb-2">G-Click Console</h1>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700 inline-flex items-center w-fit">
              <Database className="h-3 w-3 mr-1.5" /> Cluster-01
            </span>
            <span className="text-[10px] text-zinc-400 font-semibold bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700 inline-flex items-center w-fit">
              <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" /> Database: Healthy
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-none">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">Main Menu</p>
          
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Activity className="h-4 w-4 mr-3 text-zinc-400" /> Overview
          </button>
          
          <div className="pt-4 pb-2"><p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Content Management</p></div>
          
          <button onClick={() => setActiveTab('programs')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'programs' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <LayoutTemplate className="h-4 w-4 mr-3 text-zinc-400" /> Programs
          </button>
          <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'blog' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <PenTool className="h-4 w-4 mr-3 text-zinc-400" /> Blog
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'news' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Newspaper className="h-4 w-4 mr-3 text-zinc-400" /> News & Insights
          </button>
          <button onClick={() => setActiveTab('leadership')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'leadership' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Star className="h-4 w-4 mr-3 text-zinc-400" /> Leadership
          </button>
          <button onClick={() => setActiveTab('tracks')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'tracks' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <BookOpen className="h-4 w-4 mr-3 text-zinc-400" /> Educational Tracks
          </button>
          <button onClick={() => setActiveTab('labs')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'labs' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Video className="h-4 w-4 mr-3 text-zinc-400" /> Interactive Labs
          </button>
          <button onClick={() => setActiveTab('resources')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'resources' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Archive className="h-4 w-4 mr-3 text-zinc-400" /> Resources Hub
          </button>
          
          <div className="pt-4 pb-2"><p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">User Data & Logs</p></div>

          <button onClick={() => setActiveTab('members')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'members' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Users className="h-4 w-4 mr-3 text-zinc-400" /> Members Directory
          </button>
          <button onClick={() => setActiveTab('submissions')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'submissions' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <DollarSign className="h-4 w-4 mr-3 text-zinc-400" /> Sponsorship Log
          </button>
          <button onClick={() => setActiveTab('api-logs')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'api-logs' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Activity className="h-4 w-4 mr-3 text-zinc-400" /> API Webhooks
          </button>
          <div className="pt-4 pb-2"><p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">System Administration</p></div>

          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'}`}>
            <Shield className="h-4 w-4 mr-3 text-zinc-400" /> Admin Users
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button onClick={() => { localStorage.removeItem('token'); sessionStorage.removeItem('isAuthenticated'); navigate('/admin/login'); }} className="w-full flex items-center justify-center px-3 py-2 bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg text-sm font-medium transition-colors">
            <LogOut className="h-4 w-4 mr-2" /> Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative bg-zinc-950">
        <div className="p-8 lg:p-10 max-w-7xl mx-auto relative z-10">
          
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-50 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
            <button
              onClick={triggerRefresh}
              className={`p-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors ${isRefreshing ? 'animate-spin text-zinc-200' : ''}`}
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.name}
                    className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-4">
                        <dt className="text-xs font-semibold text-zinc-400 uppercase tracking-wider truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-2xl font-bold text-zinc-50 mt-1.5 truncate" title={stat.value}>
                          {stat.value}
                        </dd>
                      </div>
                      <div className="w-9 h-9 shrink-0 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-zinc-400" />
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-medium mt-4 uppercase tracking-wider">{stat.change}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Metrics */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-base font-semibold text-zinc-50 mb-5 flex items-center">
                <Activity className="h-4 w-4 text-zinc-400 mr-2" />
                Live Node Log
              </h2>
              <div className="space-y-3">
                {recentLogs.map((log, index) => (
                  <div key={index} className="flex justify-between items-center text-xs p-3.5 bg-zinc-950 border border-zinc-850 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                      <span className="text-zinc-500 font-mono text-[10px]">{log.node}</span>
                      <span className="text-zinc-300 font-medium">{log.desc}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-850 border border-zinc-700 px-2 py-0.5 rounded">
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
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-2xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 mx-auto bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-zinc-50">Sponsorship Transactions</h3>
              <p className="text-xs text-zinc-450 max-w-md mx-auto">
                The Paystack gateway integration is currently in configuration. Live checkout transactions and sponsorship registrations will populate here once the webhook environment keys are activated.
              </p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-lg inline-flex flex-col gap-1 items-start text-left w-full max-w-md mx-auto">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Gateway Status</span>
              <span className="text-xs text-zinc-300 font-mono">Sandbox Mode: Configured</span>
              <span className="text-[11px] text-zinc-500">Live webhook endpoint: `/api/webhooks/paystack` (Awaiting production keys)</span>
            </div>
          </div>
        )}

        {activeTab === 'api-logs' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="text-base font-semibold text-zinc-50">Webhook Registries</h3>
              <span className="text-xs text-zinc-500 font-medium">Web3Forms & Paystack Status</span>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-zinc-100 font-mono text-sm">web3forms_contact_v1</span>
                  <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-850 border border-zinc-700 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-xs text-zinc-450">Listens to frontend submissions on `/contact` form and redirects to admin inbox mail.</p>
              </div>

              <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-zinc-100 font-mono text-sm">paystack_checkout_webhook</span>
                  <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-850 border border-zinc-700 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-xs text-zinc-450">Triggers post-donation status flags on successful mobile money validation transactions.</p>
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
