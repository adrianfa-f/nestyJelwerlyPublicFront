// pages/benefits/EnvioGratis.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaBox, FaShieldAlt, FaClock } from 'react-icons/fa';

const EnvioGratis = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600">Inicio</Link>
            <span>/</span>
            <Link to="/" className="hover:text-emerald-600">Beneficios</Link>
            <span>/</span>
            <span className="text-gray-400">Envío Gratis</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full">
              <FaShippingFast className="text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Envío Gratis</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Recibe tus joyas artesanales sin costes adicionales. Rapidez, seguridad y comodidad.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Entrega Premium Sin Coste Adicional</h2>
          <p className="text-lg text-gray-600">
            Para pedidos superiores a 50€, ofrecemos envío gratuito con todas las garantías de seguridad y rapidez que merecen nuestras joyas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaShippingFast className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24-48h</h3>
            <p className="text-gray-600">Entrega express en península</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaBox className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Embalaje Premium</h3>
            <p className="text-gray-600">Cajas especiales para joyería</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaShieldAlt className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seguro Incluido</h3>
            <p className="text-gray-600">Protección total durante el transporte</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaClock className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seguimiento</h3>
            <p className="text-gray-600">Localización en tiempo real</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white mt-16">
          <h2 className="text-2xl font-bold mb-4">¿Listo para disfrutar de tu envío gratis?</h2>
          <p className="mb-6">Añade productos a tu carrito y supera los 50€ para activar el envío gratuito</p>
          <Link 
            to="/catalog" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnvioGratis;