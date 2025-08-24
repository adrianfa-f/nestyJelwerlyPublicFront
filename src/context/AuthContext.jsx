// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, verifyToken, getProfile } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verificar si el token es válido
          const isValid = await verifyToken();
          
          if (isValid) {
            // Obtener el perfil del usuario
            const userProfile = await getProfile();
            setUser(userProfile);
          } else {
            // Token inválido, limpiar localStorage
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      const { token, user: userData } = response;
      
      localStorage.setItem('token', token);
      setUser(userData);
      
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await registerService(email, password);
      const { token, user: userData } = response;
      
      localStorage.setItem('token', token);
      setUser(userData);
      
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};