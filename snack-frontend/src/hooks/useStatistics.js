import { useState } from 'react';
import api from '../services/api';

export const useStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStats = async (periode) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/stats/${periode}`);
      setStats(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de chargement des statistiques');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    getStats
  };
};