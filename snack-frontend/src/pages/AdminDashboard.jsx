import React, { useState } from 'react';
import AdminPanel from '../components/AdminPanel';
import Statistics from '../components/Statistics';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const { logout, user } = useAuth();

  const tabs = [
    { id: 'stats', label: 'Statistiques' },
    { id: 'products', label: 'Gestion Produits' },
    { id: 'categories', label: 'Gestion Catégories' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LZ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Snack La Zone - Admin</h1>
                <p className="text-xs text-gray-500">Admin: {user?.code}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Déconnexion
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'stats' && <Statistics />}
        {activeTab === 'products' && <AdminPanel type="products" />}
        {activeTab === 'categories' && <AdminPanel type="categories" />}
      </div>
    </div>
  );
};

export default AdminDashboard;