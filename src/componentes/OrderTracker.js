// components/OrderTracker.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderTracker = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [cancellingOrder, setCancellingOrder] = useState(null);

  // Cargar órdenes del localStorage al montar el componente
  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("nestypasto_orders") || "[]"
    );
    const userEmail = localStorage.getItem("nestypasto_user_email");

    if (userEmail) {
      setEmail(userEmail);
      fetchUserOrders(userEmail);
    } else if (savedOrders.length > 0) {
      // Intentar cargar con el email de la última orden
      const lastOrder = savedOrders[savedOrders.length - 1];
      setEmail(lastOrder.email);
      fetchUserOrders(lastOrder.email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserOrders = async (userEmail) => {
    try {
      setLoading(true);
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_URL}/api/orders/user/${userEmail}`);

      if (response.ok) {
        const orders = await response.json();
        setUserOrders(orders);
      } else {
        setUserOrders([]);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setUserOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("nestypasto_user_email", email);
      fetchUserOrders(email);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("¿Estás seguro de que quieres cancelar este pedido?")) {
      return;
    }

    try {
      setCancellingOrder(orderId);
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "POST",
      });

      if (response.ok) {
        // Actualizar la lista de órdenes
        fetchUserOrders(email);
        alert("Pedido cancelado correctamente");
      } else {
        const error = await response.json();
        alert(error.message || "Error al cancelar el pedido");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Error al cancelar el pedido");
    } finally {
      setCancellingOrder(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente de pago";
      case "paid":
        return "Pagado";
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>

      {!email ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Consultar mis pedidos</h2>
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Ingresa tu email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="tu@email.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700"
            >
              Ver mis pedidos
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            <p>
              Mostrando pedidos para: <strong>{email}</strong>
            </p>
            <button
              onClick={() => {
                setEmail("");
                setUserOrders([]);
                localStorage.removeItem("nestypasto_user_email");
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cambiar email
            </button>
          </div>

          {userOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No tienes pedidos activos.</p>
              <p className="text-sm text-gray-500 mt-2">
                Los pedidos completados o cancelados no se muestran aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {userOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Pedido #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Fecha:{" "}
                        {new Date(order.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Productos</h4>
                      <div className="space-y-2">
                        {Array.isArray(order.items) &&
                          order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span>
                                €{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Total</h4>
                      <p className="text-lg font-bold">
                        €{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {order.status === "pending" && (
                    <div className="border-t pt-4 flex justify-between items-center">
                      <p className="text-sm text-yellow-600">
                        ⚠️ Tienes 24 horas para realizar el pago
                      </p>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingOrder === order.id}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 text-sm"
                      >
                        {cancellingOrder === order.id
                          ? "Cancelando..."
                          : "Cancelar Pedido"}
                      </button>
                    </div>
                  )}

                  {order.status === "shipped" && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-green-600">
                        ✅ Tu pedido está en camino
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-2">¿Buscas un pedido específico?</p>
        <Link
          to="/order-tracking"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Buscar pedido por número y email
        </Link>
      </div>
    </div>
  );
};

export default OrderTracker;
