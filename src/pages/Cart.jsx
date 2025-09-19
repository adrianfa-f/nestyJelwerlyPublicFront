import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">
            Agrega algunos productos para comenzar a comprar.
          </p>
          <Link
            to="/catalog"
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="p-4 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />

                  <div className="flex-grow">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-medium hover:text-emerald-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-emerald-600 font-bold">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 mr-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FaMinus className="text-sm" />
                    </button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>

                  <div className="ml-4">
                    <p className="font-bold">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 p-2 text-red-500 hover:text-red-700"
                    aria-label="Eliminar producto"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Productos ({totalItems})</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-emerald-600">Gratis</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-emerald-600 text-white text-center py-3 rounded-md font-medium hover:bg-emerald-700"
            >
              Proceder al pago
            </Link>

            <Link
              to="/catalog"
              className="block w-full text-center text-emerald-600 mt-3 hover:text-emerald-800"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
