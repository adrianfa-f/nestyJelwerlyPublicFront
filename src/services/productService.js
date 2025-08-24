import api from './api';

export const getProducts = async () => {
  const response = await api.get('/api/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/api/products/category/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener productos por categoría');
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/api/products/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw new Error('Error al obtener productos destacados');
  }
};