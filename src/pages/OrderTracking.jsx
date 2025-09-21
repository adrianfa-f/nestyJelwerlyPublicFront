import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();

  // Si viene de la página de confirmación, intentar obtener el número de orden de la URL
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderParam = searchParams.get("order");
    if (orderParam) {
      setOrderNumber(orderParam);
    }
  }, [location]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_URL}/api/orders/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderNumber, email }),
      });

      if (!response.ok) {
        throw new Error("No se pudo encontrar la orden");
      }

      const orderData = await response.json();
      setOrder(orderData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente de pago";
      case "paid":
        return "Pagado - En preparación";
      case "shipped":
        return "Enviado";
      case "completed":
        return "Completado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seguimiento de Pedido</h1>

      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Número de Pedido
          </label>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej: NL123456789"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="El email que usaste en tu pedido"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Buscar Pedido"}
        </button>
      </form>

      {error && (
        <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {order && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Pedido #{order.orderNumber}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusText(order.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Información del Pedido
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString("es-ES")}
                </p>
                <p>
                  <strong>Total:</strong> €{order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Método de Pago:</strong> Bizum
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                Información de Envío
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Destinatario:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Dirección:</strong> {order.customerAddress}
                </p>
                <p>
                  <strong>Ciudad:</strong> {order.customerPostalCode}{" "}
                  {order.customerCity}
                </p>
                <p>
                  <strong>Contacto:</strong> {order.customerPhone}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Productos</h3>
            <div className="border rounded divide-y">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {order.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Notas del Pedido</h3>
              <p className="bg-gray-50 p-4 rounded">{order.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
