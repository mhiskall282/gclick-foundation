import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Mail, DollarSign, LogOut, Activity, Database, CheckCircle, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'api-logs'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  
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
    <div className="min-h-screen bg-brand-dark-obsidian text-white pt-32 pb-20 supabase-grid font-body">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Console Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-brand-dark-border">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-brand-pink font-bold bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20 flex items-center">
                <Database className="h-3 w-3 mr-1.5" />
                Cluster-01
              </span>
              <span className="flex items-center text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                Database: Healthy
              </span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white">G-Click Cloud Console</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerRefresh}
              className={`p-2.5 bg-brand-dark-card border border-brand-dark-border hover:bg-[#1E1E21] text-gray-400 hover:text-white rounded-xl transition-all ${isRefreshing ? 'animate-spin text-brand-pink' : ''}`}
              aria-label="Refresh database"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('isAuthenticated');
                navigate('/admin/login');
              }}
              className="flex items-center px-5 py-2.5 bg-brand-dark-card border border-brand-dark-border hover:bg-[#1E1E21] text-white rounded-xl text-sm font-semibold transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-brand-dark-border mb-8 gap-6 text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 font-bold border-b-2 transition-all ${activeTab === 'overview' ? 'border-brand-pink text-brand-pink' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-4 font-bold border-b-2 transition-all ${activeTab === 'submissions' ? 'border-brand-pink text-brand-pink' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            Sponsorship Log
          </button>
          <button
            onClick={() => setActiveTab('api-logs')}
            className={`pb-4 font-bold border-b-2 transition-all ${activeTab === 'api-logs' ? 'border-brand-pink text-brand-pink' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            API Webhooks
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
                      <div>
                        <dt className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {stat.name}
                        </dt>
                        <dd className="text-3xl font-display font-extrabold text-white mt-1">
                          {stat.value}
                        </dd>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-brand-dark-obsidian border border-brand-dark-border flex items-center justify-center">
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
    </div>
  );
};

export default AdminDashboard;