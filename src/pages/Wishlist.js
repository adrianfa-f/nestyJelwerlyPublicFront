import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../componentes/catalog/ProductCard';

const Wishlist = () => {
  const { wishlist, loading } = useWishlist();
  const { products } = useProduct();

  // Filtrar los productos que están en la wishlist
  const wishlistProducts = products ? products.filter(product => 
    wishlist.some(item => item.productId === product.id)
  ) : [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Lista de Deseos</h1>
      
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold mb-2">Tu lista de deseos está vacía</h2>
          <p className="text-gray-600 mb-4">Agrega productos que te gusten para verlos aquí.</p>
          <Link to="/catalog" className="text-emerald-600 hover:text-emerald-800 font-medium">
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {wishlistProducts.length} producto{wishlistProducts.length !== 1 ? 's' : ''} en tu lista de deseos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;