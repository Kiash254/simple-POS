import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = {
  categories: {
    getAll: () => axios.get(`${API_URL}/categories/`),
    create: (data) => axios.post(`${API_URL}/categories/`, data),
  },
  products: {
    getAll: (categoryId = null) => {
      const url = categoryId 
        ? `${API_URL}/products/?category=${categoryId}` 
        : `${API_URL}/products/`;
      return axios.get(url);
    },
    create: (data) => axios.post(`${API_URL}/products/`, data),
    update: (id, data) => axios.put(`${API_URL}/products/${id}/`, data),
    delete: (id) => axios.delete(`${API_URL}/products/${id}/`),
  },
  sales: {
    getAll: () => axios.get(`${API_URL}/sales/`),
    create: (data) => axios.post(`${API_URL}/sales/`, data),
  }
};