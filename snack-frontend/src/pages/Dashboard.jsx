import React, { useState } from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductGrid from '../components/ProductGrid';
import OrderSummary from '../components/OrderSummary';
import { useOrder } from '../hooks/useOrder';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products, categories, loading } = useProducts();
  const { orderItems, addToOrder, removeFromOrder, updateQuantity, confirmOrder, clearOrder } = useOrder();
  const { logout, user } = useAuth();
  const [confirming, setConfirming] = useState(false);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.categorie_id === selectedCategory)
    : products;

  const handleConfirmOrder = async () => {
    setConfirming(true);
    try {
      await confirmOrder();
      // Option: show success message
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Catégories */}
      <div className="w-1/4 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">LZ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Snack La Zone</h1>
              <p className="text-xs text-gray-500">Caissier: {user?.code}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="text-gray-500 hover:text-gray-700"
            title="Déconnexion"
          >
            🔓
          </button>
        </div>
        
        <div className="flex-grow overflow-auto">
          <CategorySelector 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Main Content - Produits */}
      <div className="w-2/4 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory 
              ? categories.find(c => c.id === selectedCategory)?.nom 
              : "Tous les produits"}
          </h2>
        </div>
        
        <ProductGrid 
          products={filteredProducts} 
          onAddToOrder={addToOrder}
        />
      </div>

      {/* Order Summary */}
      <div className="w-1/4 bg-white shadow-lg p-6 flex flex-col">
        <OrderSummary 
          orderItems={orderItems}
          onRemoveItem={removeFromOrder}
          onUpdateQuantity={updateQuantity}
          onConfirm={handleConfirmOrder}
          onClear={clearOrder}
          confirming={confirming}
        />
      </div>
    </div>
  );
};

export default Dashboard;