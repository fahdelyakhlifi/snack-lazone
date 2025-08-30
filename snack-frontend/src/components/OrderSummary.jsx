import React from 'react';

const OrderSummary = ({ orderItems, onRemoveItem, onUpdateQuantity, onConfirm, onClear, confirming }) => {
  const total = orderItems.reduce((sum, item) => sum + (item.prix_au_moment * item.quantite), 0);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Commande en cours</h2>
      
      <div className="flex-grow overflow-auto mb-4">
        {orderItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucun article ajouté</p>
        ) : (
          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-grow">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    {item.image_path ? (
                      <img 
                        src={`http://localhost:8000/storage/${item.image_path}`} 
                        alt={item.nom} 
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">Image</span>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium truncate">{item.nom}</h4>
                    <p className="text-sm text-gray-500">{item.prix_au_moment} DH</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(index, item.quantite - 1);
                      }}
                      className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantite}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(index, item.quantite + 1);
                      }}
                      className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold w-16 text-right">
                    {item.prix_au_moment * item.quantite} DH
                  </span>
                  <button 
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-auto pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">{total} DH</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClear}
            disabled={orderItems.length === 0 || confirming}
            className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={orderItems.length === 0 || confirming}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition flex items-center justify-center"
          >
            {confirming ? (
              <span className="animate-spin">⏳</span>
            ) : (
              'Confirmer'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;