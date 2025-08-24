// services/authService.js
import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error en el inicio de sesión');
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post('/api/auth/register', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error en el registro');
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/api/auth/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener el perfil');
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/api/auth/profile', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al actualizar el perfil');
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('/api/auth/change-password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al cambiar la contraseña');
  }
};

export const verifyToken = async () => {
  try {
    const response = await api.get('/api/auth/verify');
    return response.data.valid;
  } catch (error) {
    return false;
  }
};