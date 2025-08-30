import React, { useState, useEffect } from 'react';
import { useStatistics } from '../hooks/useStatistics';

const Statistics = () => {
  const [period, setPeriod] = useState('jour');
  const { stats, loading, error, getStats } = useStatistics();

  useEffect(() => {
    getStats(period);
  }, [period]);

  const periods = [
    { id: 'jour', label: 'Aujourd\'hui' },
    { id: 'semaine', label: 'Cette semaine' },
    { id: 'mois', label: 'Ce mois' },
    { id: 'annee', label: 'Cette année' }
  ];

  if (loading) {
    return <div className="text-center py-8">Chargement des statistiques...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Statistiques</h2>
      
      <div className="mb-6">
        <div className="flex space-x-2">
          {periods.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`px-4 py-2 rounded-lg ${
                period === p.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Chiffre d'affaires</h3>
            <div className="text-3xl font-bold text-green-600">
              {stats.total} DH
            </div>
            <p className="text-gray-500 mt-2">Total des ventes pour la période</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Nombre de commandes</h3>
            <div className="text-3xl font-bold text-blue-600">
              {stats.nombre_commandes}
            </div>
            <p className="text-gray-500 mt-2">Commandes passées</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Détails</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Période:</p>
                <p className="font-medium">{periods.find(p => p.id === period)?.label}</p>
              </div>
              <div>
                <p className="text-gray-600">Moyenne par commande:</p>
                <p className="font-medium">
                  {stats.nombre_commandes > 0 
                    ? (stats.total / stats.nombre_commandes).toFixed(2) 
                    : 0} DH
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;