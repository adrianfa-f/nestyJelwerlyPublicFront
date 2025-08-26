// services/cartService.js
import api from './api';

export const getCart = async () => {
  try {
    const response = await api.get('/api/cart');
    return response.data;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post('/api/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete('/api/cart/item', { data: { productId } });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.put('/api/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// services/cartService.js
export const clearCart = async () => {
  try {
    const response = await api.delete('/api/cart/clear');
    // Asegurarnos de que la respuesta siempre tenga la propiedad items
    return {
      ...response.data,
      items: response.data.items || []
    };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};