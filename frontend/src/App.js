import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import POSPage from './pages/POSPage';
import ProductsPage from './pages/ProductsPage';
import SalesPage from './pages/SalesPage';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<POSPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;