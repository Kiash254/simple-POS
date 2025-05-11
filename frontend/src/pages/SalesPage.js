import React, { useState, useEffect } from 'react';
import { api } from '../api';

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSaleId, setExpandedSaleId] = useState(null);
  
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.sales.getAll();
        setSales(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setLoading(false);
      }
    };
    
    fetchSales();
  }, []);
  
  const toggleSaleDetails = (saleId) => {
    if (expandedSaleId === saleId) {
      setExpandedSaleId(null);
    } else {
      setExpandedSaleId(saleId);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Sales History</h2>
      
      {sales.length === 0 ? (
        <div className="alert alert-info">No sales recorded yet.</div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Sales Records</h5>
          </div>
          <div className="card-body">
            <div className="list-group">
              {sales.map((sale) => (
                <div key={sale.id} className="list-group-item list-group-item-action">
                  <div 
                    className="d-flex justify-content-between align-items-center pointer"
                    onClick={() => toggleSaleDetails(sale.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <h6 className="mb-1">Sale #{sale.id}</h6>
                      <small className="text-muted">{formatDate(sale.created_at)}</small>
                    </div>
                    <div className="text-end">
                      <h6 className="mb-1">${sale.total_amount}</h6>
                      <small className="text-muted">{sale.payment_method}</small>
                    </div>
                  </div>
                  
                  {expandedSaleId === sale.id && (
                    <div className="mt-3">
                      <h6 className="mb-2">Items</h6>
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sale.items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.product_name}</td>
                              <td>{item.quantity}</td>
                              <td>${item.price}</td>
                              <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan="3" className="text-end">Total:</th>
                            <th>${sale.total_amount}</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesPage;