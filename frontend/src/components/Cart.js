import React from 'react';

function Cart({ cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) {
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Cart</h5>
      </div>
      <div className="card-body">
        {cartItems.length === 0 ? (
          <p className="text-center text-muted">Cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                <div>
                  <h6 className="mb-0">{item.name}</h6>
                  <small className="text-muted">${item.price} each</small>
                </div>
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                  <button 
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between mb-3">
          <h5>Subtotal:</h5>
          <h5>${subtotal.toFixed(2)}</h5>
        </div>
        <button 
          className="btn btn-success w-100" 
          disabled={cartItems.length === 0}
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;