import React from 'react';

function CategorySelector({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-selector mb-4">
      <div className="d-flex flex-wrap">
        <button 
          className={`btn btn-outline-primary me-2 mb-2 ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          All Products
        </button>
        
        {categories.map(category => (
          <button 
            key={category.id}
            className={`btn btn-outline-primary me-2 mb-2 ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;