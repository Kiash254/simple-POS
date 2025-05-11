import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import POSPage from './pages/POSPage';
import ProductsPage from './pages/ProductsPage';
import SalesPage from './pages/SalesPage';
import SignUpPage from './pages/SignUpPage'; // Import the SignUpPage

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<SignUpPage />} /> {/* Default route */}
          <Route path="/pos" element={<POSPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;