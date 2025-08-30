import { useState } from 'react';
import api from '../services/api';

export const useOrder = () => {
  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (product) => {
    setOrderItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantite: updatedItems[existingItemIndex].quantite + 1
        };
        return updatedItems;
      } else {
        return [...prev, { 
          ...product, 
          quantite: 1,
          prix_au_moment: product.prix_base
        }];
      }
    });
  };

  const removeFromOrder = (index) => {
    setOrderItems(prev => {
      const updatedItems = [...prev];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    setOrderItems(prev => {
      const updatedItems = [...prev];
      updatedItems[index] = {
        ...updatedItems[index],
        quantite: newQuantity
      };
      return updatedItems;
    });
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  const confirmOrder = async () => {
    try {
      const articles = orderItems.map(item => ({
        produit_id: item.id,
        quantite: item.quantite,
        prix_au_moment: item.prix_au_moment
      }));

      const response = await api.post('/commandes', { articles });
      clearOrder();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la confirmation');
    }
  };

  return {
    orderItems,
    addToOrder,
    removeFromOrder,
    updateQuantity,
    clearOrder,
    confirmOrder
  };
};