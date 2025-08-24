// pages/Profile.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Información Personal</h2>
          <p><span className="font-medium">Email:</span> {user?.email}</p>
          <p><span className="font-medium">Rol:</span> {user?.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Mis Pedidos</h2>
          <p className="text-gray-600">Aquí aparecerá tu historial de pedidos una vez que realices tu primera compra.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;