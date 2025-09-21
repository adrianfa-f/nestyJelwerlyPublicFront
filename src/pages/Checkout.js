import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Carrito vacío</h2>
          <p className="mb-4">No hay productos en tu carrito.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Ir al catálogo
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateOrderNumber = () => {
    return "NL" + Date.now().toString().slice(-8);
  };

  // En el handleSubmit de Checkout.js, añadir:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generar número de pedido
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);

      // Enviar la orden al backend
      const orderData = {
        orderNumber: newOrderNumber,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        customerCity: formData.city,
        customerPostalCode: formData.postalCode,
        items: cart,
        total: totalPrice,
        notes: formData.notes,
        status: "pending",
      };

      // Usar la variable de entorno para la URL del backend
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la orden");
      }

      // Limpiar carrito después de 2 segundos
      setTimeout(() => {
        clearCart();
        setOrderCompleted(true);
        setIsSubmitting(false);
        navigate(`/order-tracking?order=${newOrderNumber}`);
      }, 2000);
    } catch (error) {
      console.error("Error processing order:", error);
      setIsSubmitting(false);
      // Podrías mostrar un mensaje de error al usuario aquí
    }
  };

  if (orderCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <div className="text-5xl text-emerald-500 mb-4">✓</div>
            <h1 className="text-2xl font-bold mb-2">
              ¡Pedido realizado con éxito!
            </h1>
            <p className="text-gray-600 mb-4">
              Tu pedido ha sido registrado correctamente.
            </p>
            <p className="font-semibold">Número de pedido: {orderNumber}</p>
          </div>

          <div className="border rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">
              Instrucciones de pago
            </h2>
            <p className="mb-3">
              Para completar tu pedido, realiza el pago mediante Bizum al
              siguiente número:
            </p>
            <p className="text-center text-xl font-bold text-emerald-600 mb-3">
              +34 123 456 789
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Importante:</strong> Incluye el número de pedido (
              <strong>{orderNumber}</strong>) en el concepto del pago.
            </p>
            <p className="text-sm">
              Una vez confirmado el pago, procederemos a preparar y enviar tu
              pedido.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/catalog")}
              className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                  </div>
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
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Información de envío</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Notas del pedido (opcional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-semibold mb-2">Método de pago: Bizum</h3>
                <p className="text-sm text-gray-600">
                  Después de completar el pedido, recibirás las instrucciones
                  para realizar el pago mediante Bizum.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
