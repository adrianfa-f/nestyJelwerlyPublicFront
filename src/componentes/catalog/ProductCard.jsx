import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        {product.images.length > 0 && (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        )}
      </Link>
      <div className="p-4">
        <Link 
          to={`/product/${product.id}`} 
          className="font-semibold text-lg hover:text-emerald-600 block mb-2"
        >
          {product.name}
        </Link>
        <p className="text-emerald-600 font-bold">${product.price.toFixed(2)}</p>
        <button 
          onClick={() => addToCart(product, 1)}
          className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;