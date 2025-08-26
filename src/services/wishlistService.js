// services/wishlistService.js
import api from './api';

export const getWishlist = async () => {
  const response = await api.get('/api/wishlist');
  return response.data;
};

export const addToWishlist = async (productId) => {
  const response = await api.post('/api/wishlist', { productId });
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await api.delete('/api/wishlist', { data: { productId } });
  return response.data;
};

export const isInWishlist = async (productId) => {
  const response = await api.get('/api/wishlist/check', { params: { productId } });
  return response.data.isInWishlist;
};