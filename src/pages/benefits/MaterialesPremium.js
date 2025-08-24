// pages/benefits/MaterialesPremium.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGem, FaCheckCircle, FaAward } from 'react-icons/fa';

const MaterialesPremium = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600">Inicio</Link>
            <span>/</span>
            <Link to="/" className="hover:text-emerald-600">Beneficios</Link>
            <span>/</span>
            <span className="text-gray-400">Materiales Premium</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-emerald-900 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-600 p-4 rounded-full">
              <FaGem className="text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Materiales Premium</h1>
          <p className="text-xl max-w-2xl mx-auto">
            La excelencia comienza con los mejores materiales. Descubre por qué nuestra selección marca la diferencia.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1550596445-5aa4e649c3a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              alt="Materiales premium de joyería"
              className="rounded-lg shadow-2xl"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Calidad que Perdura</h2>
            <p className="text-lg text-gray-600 mb-6">
              En nuestra joyería, solo trabajamos con materiales de la más alta calidad. Cada pieza es una inversión en durabilidad, belleza y valor perdurable.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaCheckCircle className="text-emerald-600 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Oro de 18K y 24K</h3>
                  <p className="text-gray-600">Utilizamos oro de la más alta pureza, garantizando brillo y resistencia excepcionales.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaCheckCircle className="text-emerald-600 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Plata Sterling 925</h3>
                  <p className="text-gray-600">Plata de ley con 92.5% de pureza, ideal para piezas que mantienen su belleza con el tiempo.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaCheckCircle className="text-emerald-600 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Diamantes Certificados</h3>
                  <p className="text-gray-600">Todos nuestros diamantes tienen certificación GIA, garantizando calidad y autenticidad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaAward className="text-3xl text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Certificación</h3>
            <p className="text-gray-600">Todos nuestros materiales cuentan con certificados de autenticidad y procedencia.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaCheckCircle className="text-3xl text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Control de Calidad</h3>
            <p className="text-gray-600">Rigurosos controles en cada etapa del proceso para garantizar la excelencia.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaGem className="text-3xl text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trazabilidad</h3>
            <p className="text-gray-600">Conocemos el origen de cada material, asegurando prácticas éticas y sostenibles.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialesPremium;