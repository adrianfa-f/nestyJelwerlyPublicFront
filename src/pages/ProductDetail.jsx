import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useQuery } from "@tanstack/react-query";
import {
  FaStar,
  FaShippingFast,
  FaUndo,
  FaShieldAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoverImage, setHoverImage] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // Obtener todos los productos para relaciones
  const { data: allProducts = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: getProducts,
  });

  const handleAddToCart = () => {
    setCartLoading(true);
    try {
      addToCart(product, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    setWishlistLoading(true);
    try {
      if (isInWishlist(product.id)) {
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

  // Función para obtener productos relacionados
  const getRelatedProducts = (currentProduct) => {
    if (!currentProduct || allProducts.length === 0) return [];

    return allProducts
      .filter((p) => p.id !== currentProduct.id)
      .sort((a, b) => {
        // Priorizar misma categoría
        const categoryMatchA = a.category === currentProduct.category ? 3 : 0;
        const categoryMatchB = b.category === currentProduct.category ? 3 : 0;

        // Priorizar mismo material
        const materialMatchA =
          a.material &&
          currentProduct.material &&
          a.material.toLowerCase() === currentProduct.material.toLowerCase()
            ? 2
            : 0;
        const materialMatchB =
          b.material &&
          currentProduct.material &&
          b.material.toLowerCase() === currentProduct.material.toLowerCase()
            ? 2
            : 0;

        // Priorizar mismo género
        const genderMatchA =
          a.gender &&
          currentProduct.gender &&
          a.gender === currentProduct.gender
            ? 1
            : 0;
        const genderMatchB =
          b.gender &&
          currentProduct.gender &&
          b.gender === currentProduct.gender
            ? 1
            : 0;

        // Priorizar mismo color
        const colorMatchA =
          a.color &&
          currentProduct.color &&
          a.color.toLowerCase() === currentProduct.color.toLowerCase()
            ? 1
            : 0;
        const colorMatchB =
          b.color &&
          currentProduct.color &&
          b.color.toLowerCase() === currentProduct.color.toLowerCase()
            ? 1
            : 0;

        // Calcular puntuación total
        const scoreA =
          categoryMatchA + materialMatchA + genderMatchA + colorMatchA;
        const scoreB =
          categoryMatchB + materialMatchB + genderMatchB + colorMatchB;

        return scoreB - scoreA; // Ordenar por mayor puntuación primero
      })
      .slice(0, 8); // Limitar a 4 productos
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <div className="text-5xl mb-4">😞</div>
          <h2 className="text-2xl font-semibold mb-2">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            El producto que buscas no está disponible.
          </p>
          <Link
            to="/catalog"
            className="text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    );

  // Crear array de imágenes no nulas
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter((img) => img !== null && img !== "");
  const isWishlisted = isInWishlist(product.id);

  // Obtener productos relacionados
  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-emerald-600">
              Inicio
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <Link to="/catalog" className="hover:text-emerald-600">
              Catálogo
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-400">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative">
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-96">
            {images.length > 0 && (
              <img
                src={
                  hoverImage !== null
                    ? images[hoverImage]
                    : images[selectedImage]
                }
                alt={product.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {images.length > 1 && (
            <div className="flex justify-center gap-2 py-2 flex-wrap">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  onMouseEnter={() => setHoverImage(index)}
                  onMouseLeave={() => setHoverImage(null)}
                  className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                    index === selectedImage
                      ? "border-emerald-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vista ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Botón de wishlist */}
          <button
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-600 text-xl" />
            )}
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < 4 ? "fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(12 reseñas)</span>
          </div>

          <p className="text-2xl text-emerald-600 font-bold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Detalles del producto:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-medium">Categoría:</span>{" "}
                {product.category}
              </li>
              {product.material && (
                <li>
                  <span className="font-medium">Material:</span>{" "}
                  {product.material}
                </li>
              )}
              {product.color && (
                <li>
                  <span className="font-medium">Color:</span> {product.color}
                </li>
              )}
              {product.gender && (
                <li>
                  <span className="font-medium">Género:</span> {product.gender}
                </li>
              )}
              {product.dimensions && (
                <li>
                  <span className="font-medium">Dimensiones:</span>{" "}
                  {product.dimensions}
                </li>
              )}
              {product.weight && (
                <li>
                  <span className="font-medium">Peso:</span> {product.weight} g
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center mb-8">
            <label className="mr-4 font-medium">Cantidad:</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 bg-white w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md font-medium transition-colors mb-4 disabled:opacity-50"
          >
            {cartLoading ? "Agregando..." : "Añadir al Carrito"}
          </button>

          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <FaShippingFast className="text-emerald-600 mb-1 text-lg" />
                <span>Envío gratis</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUndo className="text-emerald-600 mb-1 text-lg" />
                <span>Devoluciones</span>
              </div>
              <div className="flex flex-col items-center">
                <FaShieldAlt className="text-emerald-600 mb-1 text-lg" />
                <span>Garantía</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to={`/product/${relatedProduct.id}`}>
                  {relatedProduct.image1 && (
                    <img
                      src={relatedProduct.image1}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </Link>
                <div className="p-3">
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="font-semibold text-sm hover:text-emerald-600 block mb-1"
                  >
                    {relatedProduct.name}
                  </Link>
                  <p className="text-emerald-600 font-bold text-sm">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg p-3 animate-pulse">
                <div className="bg-gray-200 h-40 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
