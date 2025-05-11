import React, { useState, useEffect } from 'react';
import { api } from '../api';
import CategorySelector from '../components/CategorySelector';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import CheckoutModal from '../components/CheckoutModal';

function POSPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse] = await Promise.all([
          api.categories.getAll()
        ]);
        
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.products.getAll(selectedCategory);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, [selectedCategory]);
  
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCartItems(
          cartItems.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        );
      }
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  
  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    const product = products.find(p => p.id === productId);
    
    if (!product || newQuantity > product.stock) return;
    
    setCartItems(
      cartItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };
  
  const handleConfirmCheckout = async (paymentMethod) => {
    try {
      const subtotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      
      const saleData = {
        total_amount: subtotal,
        payment_method: paymentMethod,
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      
      await api.sales.create(saleData);
      
      // Update products state with new stock values
      const updatedProducts = products.map(product => {
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
          return { ...product, stock: product.stock - cartItem.quantity };
        }
        return product;
      });
      
      setProducts(updatedProducts);
      setCartItems([]);
      setShowCheckoutModal(false);
      
      alert('Sale completed successfully!');
    } catch (error) {
      console.error('Error completing sale:', error);
      alert('Error completing sale. Please try again.');
    }
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
  
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  return (
    <div className="row">
      <div className="col-md-8">
        <h2 className="mb-4">POS Terminal</h2>
        
        <CategorySelector 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="row">
          {products.length === 0 ? (
            <div className="col-12 text-center my-5">
              <p className="text-muted">No products available</p>
            </div>
          ) : (
            products.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>
      
      <div className="col-md-4">
        <Cart 
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      </div>
      
      <CheckoutModal 
        show={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onConfirm={handleConfirmCheckout}
        cartItems={cartItems}
        subtotal={subtotal}
      />
    </div>
  );
}

export default POSPage;