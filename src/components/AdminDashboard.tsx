import React from 'react';
import { Users, BookOpen, Mail, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  // Check if user is authenticated
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    window.location.href = '/admin/login';
    return null;
  }

  const stats = [
    { name: 'Total Users', value: '1,234', icon: Users },
    { name: 'Active Programs', value: '12', icon: BookOpen },
    { name: 'New Messages', value: '23', icon: Mail },
    { name: 'Total Donations', value: '$12,345', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem('isAuthenticated');
              window.location.href = '/admin/login';
            }}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[
                'New user registration: John Doe',
                'Donation received: $500',
                'New program enrollment: Web Development',
                'Contact form submission from Sarah',
              ].map((activity, index) => (
                <li key={index}>
                  <div className="px-4 py-4 sm:px-6">
                    <p className="text-sm text-gray-600">{activity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;