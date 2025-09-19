import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const mainImage = product.image1;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          {mainImage && (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}
        </Link>

        <button
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
      </div>

      <div className="p-4">
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-lg hover:text-emerald-600 block mb-2"
        >
          {product.name}
        </Link>

        <p className="text-emerald-600 font-bold">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={cartLoading}
          className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded flex items-center justify-center disabled:opacity-50"
        >
          {cartLoading ? (
            <span>Agregando...</span>
          ) : (
            <>
              <FaShoppingCart className="mr-2" />
              Añadir al Carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
