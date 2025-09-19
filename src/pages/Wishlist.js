import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaHeart, FaShoppingCart, FaSpinner } from "react-icons/fa";
import { getProductById } from "../services/productService";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const productPromises = wishlist.map((id) => getProductById(id));
        const productsData = await Promise.all(productPromises);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setLoading(false);
    }
  }, [wishlist]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-4xl text-emerald-600 mr-3" />
          <span>Cargando lista de deseos...</span>
        </div>
      </div>
    );
  }

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
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${product.id}`}>
              {product.image1 ? (
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  <span className="text-gray-400">Imagen no disponible</span>
                </div>
              )}
            </Link>

            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-lg hover:text-emerald-600 mb-2 line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <p className="text-emerald-600 font-bold mb-3">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Eliminar de lista de deseos"
                >
                  <FaHeart className="fill-current" />
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors"
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
