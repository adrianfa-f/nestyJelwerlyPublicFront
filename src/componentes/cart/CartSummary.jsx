// componentes/cart/CartSummary.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const CartSummary = ({ total, itemCount }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Productos ({itemCount})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span className="text-emerald-600">Gratis</span>
        </div>
        <div className="flex justify-between border-t pt-3 mt-3 font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <Link 
          to="/checkout" 
          className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md font-medium transition-colors"
        >
          <FaLock className="mr-2" />
          Proceder al Pago
        </Link>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        Al proceder con el pago, aceptas nuestros <a href="/terms" className="text-emerald-600 hover:underline">Términos y Condiciones</a>
      </div>
    </div>
  );
};

export default CartSummary;