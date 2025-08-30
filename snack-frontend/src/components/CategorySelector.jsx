import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-700 mb-4 text-lg">Catégories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-3 rounded-lg transition ${
            selectedCategory === null 
              ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          📦 Tous les produits
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              selectedCategory === category.id 
                ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {getCategoryIcon(category.nom)} {category.nom}
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to get icons for categories
const getCategoryIcon = (categoryName) => {
  const icons = {
    'Tacos': '🌮',
    'Panini': '🥪',
    'Pizza': '🍕',
    'Burger': '🍔',
    'Salade': '🥗',
    'Jus': '🥤',
    'Wrap': '🌯',
    'Pâté': '🥟',
    'Sandwich': '🥖',
    'Shawarma': '🥙',
    'Poisson': '🐟'
  };
  
  return icons[categoryName] || '📦';
};

export default CategorySelector;