import { useState, useEffect } from 'react';
import api from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsResponse, categoriesResponse] = await Promise.all([
        api.get('/produits'),
        api.get('/categories')
      ]);
      
      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const response = await api.post('/produits', productData);
      setProducts(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de l\'ajout');
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await api.put(`/produits/${id}`, productData);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la modification');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/produits/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchData
  };
};