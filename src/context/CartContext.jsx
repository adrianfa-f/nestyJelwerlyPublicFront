// context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as cartService from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart({ items: [] });
      setLoading(false);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData || { items: [] });
    } catch (error) {
      console.error('Error loading cart:', error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      const updatedCart = await cartService.addToCart(product.id, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      // Si la cantidad es 0, eliminar el producto del carrito
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      
      const updatedCart = await cartService.updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const updatedCart = await cartService.clearCart();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  // Calcular el precio total
  const totalPrice = (cart.items || []).reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);
  
  // Calcular el número total de items (suma de cantidades)
  const totalItems = (cart.items || []).reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity, // Cambiado de updateCartItem a updateQuantity
    clearCart,
    totalPrice,
    totalItems // Agregado para el contador
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};