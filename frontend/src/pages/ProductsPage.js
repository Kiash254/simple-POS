import React, { useState, useEffect } from 'react';
import { api } from '../api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: ''
  });
  
  const [editingProductId, setEditingProductId] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.products.getAll(),
          api.categories.getAll()
        ]);
        
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      
      if (editingProductId) {
        await api.products.update(editingProductId, productData);
        
        // Get category name for display
        const category = categories.find(c => c.id.toString() === formData.category.toString());
        
        setProducts(products.map(product => 
          product.id === editingProductId ? { 
            ...product, 
            ...productData,
            category_name: category ? category.name : ''
          } : product
        ));
        
        setEditingProductId(null);
      } else {
        const response = await api.products.create(productData);
        
        // Get category name for display
        const category = categories.find(c => c.id.toString() === formData.category.toString());
        response.data.category_name = category ? category.name : '';
        
        setProducts([...products, response.data]);
      }
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        category: '',
        stock: ''
      });
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };
  
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock
    });
    
    setEditingProductId(product.id);
  };
  
  const cancelEdit = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: ''
    });
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.products.delete(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };
  
  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) return;
    
    try {
      const response = await api.categories.create({ name: newCategoryName });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category. Please try again.');
    }
  }

    return (
        <div className="container">
        <h1 className="my-4">Products</h1>
        
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row">
                <div className="col-md-3 mb-3">
                    <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Product Name" 
                    className="form-control" 
                    required
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="Price" 
                    className="form-control" 
                    required
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="form-control" 
                    required
                    >
                    <option value="">Select Category</option>   
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                        {category.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col-md-3 mb-3">
                    <input 
                    type="number" 
                    name="stock" 
                    value={formData.stock} 
                    onChange={handleChange} 
                    placeholder="Stock" 
                    className="form-control" 
                    required
                    />
                </div>
                </div>
                <button type="submit" className="btn btn-primary">
                {editingProductId ? 'Update Product' : 'Add Product'}

                </button>
                {editingProductId && (
                <button type="button" className="btn btn-secondary ms-2" onClick={cancelEdit}>
                    Cancel
                </button>
                )}
            </form>
            <h2 className="mb-4">Product List</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.category_name}</td>
                    <td>{product.stock}</td>
                    <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(product)}>
                        Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>

            </table>
            <h2 className="mb-4">Add Category</h2>
            <form onSubmit={handleAddCategory} className="mb-4">
                <div className="row">
                <div className="col-md-3 mb-3">
                    <input 
                    type="text" 
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)} 
                    placeholder="Category Name" 
                    className="form-control" 
                    required
                    />
                </div>
                </div>
                <button type="submit" className="btn btn-primary">
                Add Category
                </button>
            </form>
            </>
        )}
        </div>
    );
}
export default ProductsPage;