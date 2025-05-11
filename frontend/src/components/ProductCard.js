import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="col-md-3 mb-3">
      <div className="card product-item h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted mb-1">{product.category_name}</p>
          <h6 className="card-subtitle mb-2 text-primary">${product.price}</h6>
          <p className="card-text small text-muted mt-auto mb-2">
            In stock: {product.stock}
          </p>
          <button 
            className="btn btn-sm btn-primary mt-auto" 
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;