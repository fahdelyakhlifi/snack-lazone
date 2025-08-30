import React from 'react';

const ProductGrid = ({ products, onAddToOrder }) => {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Aucun produit dans cette catégorie</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div 
          key={product.id} 
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1"
          onClick={() => onAddToOrder(product)}
        >
          <div className="h-40 bg-gray-200 flex items-center justify-center">
            {product.image_path ? (
              <img 
                src={`http://localhost:8000/storage/${product.image_path}`} 
                alt={product.nom} 
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-400">🖼️ Pas d'image</span>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{product.nom}</h3>
            <div className="flex justify-between items-center">
              <span className="text-orange-600 font-bold">{product.prix_base} DH</span>
              <button className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;