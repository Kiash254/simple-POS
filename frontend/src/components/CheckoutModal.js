import React, { useState } from 'react';

function CheckoutModal({ show, onClose, onConfirm, cartItems, subtotal }) {
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  
  if (!show) return null;
  
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Checkout</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <h6>Order Summary</h6>
            <div className="mb-3">
              {cartItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between mb-2">
                  <span>{item.quantity} x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select 
                className="form-select" 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => onConfirm(paymentMethod)}
            >
              Complete Sale
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </div>
  );
}

export default CheckoutModal;