import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-5xl mb-4">💖</div>
          <h2 className="text-2xl font-bold mb-2">
            Tu lista de deseos está vacía
          </h2>
          <p className="text-gray-600 mb-6">
            Agrega productos que te gusten para verlos aquí.
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
      <h1 className="text-3xl font-bold mb-8">Mi Lista de Deseos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((productId) => (
          <div
            key={productId}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${productId}`}>
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <span className="text-gray-400">Imagen del producto</span>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/product/${productId}`}>
                <h3 className="font-semibold text-lg hover:text-emerald-600 mb-2">
                  Producto {productId}
                </h3>
              </Link>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => removeFromWishlist(productId)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar de lista de deseos"
                >
                  <FaHeart className="fill-current" />
                </button>

                <button
                  onClick={() =>
                    handleAddToCart({
                      id: productId,
                      price: 0,
                      name: `Producto ${productId}`,
                    })
                  }
                  className="bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700"
                  aria-label="Añadir al carrito"
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
