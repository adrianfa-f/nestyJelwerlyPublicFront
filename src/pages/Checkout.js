// pages/Checkout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StripeCheckout from '../components/checkout/StripeCheckout';

const Checkout = () => {
  const { cart, totalPrice } = useCart();
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Necesitas iniciar sesión</h2>
          <p className="mb-4">Para proceder al pago, debes iniciar sesión o registrarte.</p>
          <Link to="/login" className="text-emerald-600 hover:text-emerald-800">
            Ir a inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Carrito vacío</h2>
          <p className="mb-4">No hay productos en tu carrito.</p>
          <Link to="/catalog" className="text-emerald-600 hover:text-emerald-800">
            Ir al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentStatus('success');
    // Aquí podrías redirigir a una página de confirmación
  };

  const handlePaymentError = (message) => {
    setPaymentStatus('error');
    setErrorMessage(message);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
            <div className="space-y-2 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
            
            {paymentStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl text-emerald-500 mb-4">✓</div>
                <h3 className="text-2xl font-semibold mb-2">¡Pago realizado con éxito!</h3>
                <p className="mb-4">Hemos enviado un correo con los detalles de tu compra.</p>
                <Link 
                  to="/" 
                  className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
                >
                  Volver al inicio
                </Link>
              </div>
            ) : paymentStatus === 'error' ? (
              <div className="text-center py-8">
                <div className="text-5xl text-red-500 mb-4">✗</div>
                <h3 className="text-2xl font-semibold mb-2">Error en el pago</h3>
                <p className="mb-4">{errorMessage}</p>
                <button 
                  onClick={() => setPaymentStatus('idle')}
                  className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
                >
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              <StripeCheckout 
                onSuccess={handlePaymentSuccess} 
                onError={handlePaymentError} 
              />
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Información de envío</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Nombre:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Dirección:</span> {user.address?.street}, {user.address?.city}, {user.address?.postalCode}</p>
              <p><span className="font-medium">Teléfono:</span> {user.phone || 'No proporcionado'}</p>
            </div>
            <Link 
              to="/profile" 
              className="inline-block mt-4 text-emerald-600 hover:text-emerald-800"
            >
              Editar información
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;