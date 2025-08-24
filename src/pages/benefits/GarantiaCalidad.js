// pages/benefits/GarantiaCalidad.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaSync, FaHeadset } from 'react-icons/fa';

const GarantiaCalidad = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600">Inicio</Link>
            <span>/</span>
            <Link to="/" className="hover:text-emerald-600">Beneficios</Link>
            <span>/</span>
            <span className="text-gray-400">Garantía de Calidad</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 p-4 rounded-full">
              <FaAward className="text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Garantía de Calidad</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Tranquilidad absoluta con nuestra garantía de por vida en todas nuestras piezas.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Compra con Confianza Absoluta</h2>
          <p className="text-lg text-gray-600">
            Cada joya que creamos está respaldada por nuestra garantía de por vida. Creemos tanto en la calidad de nuestro trabajo que nos hacemos responsables de cada pieza para siempre.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500">
            <FaSync className="text-3xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Garantía de Por Vida</h3>
            <p className="text-gray-600 mb-4">Cobertura completa contra defectos de fabricación</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Reparaciones gratuitas</li>
              <li>• Sustitución por defectos</li>
              <li>• Mantenimiento incluido</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500">
            <FaHeadset className="text-3xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Soporte Prioritario</h3>
            <p className="text-gray-600 mb-4">Atención personalizada para clientes con garantía</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Línea directa 24/7</li>
              <li>• Asesoramiento experto</li>
              <li>• Resolución rápida</li>
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Cómo Activar tu Garantía</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Registro</h3>
              <p className="text-gray-600">Registra tu pieza en nuestro sistema online</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Conservación</h3>
              <p className="text-gray-600">Guarda tu certificado de garantía</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Contacto</h3>
              <p className="text-gray-600">Contáctanos para cualquier incidencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarantiaCalidad;