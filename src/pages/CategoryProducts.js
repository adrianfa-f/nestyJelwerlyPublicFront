// pages/CategoryProducts.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../componentes/catalog/ProductGrid';
import { getProductsByCategory } from '../services/productService';

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const categoryProducts = await getProductsByCategory(categoryName);
        setProducts(categoryProducts);
      } catch (err) {
        setError('Error al cargar los productos de la categoría');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <Link to="/catalog" className="text-emerald-600 hover:text-emerald-800 mt-4 inline-block">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-emerald-600">Inicio</Link></li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link to="/catalog" className="hover:text-emerald-600">Catálogo</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-400 capitalize">{categoryName}</span>
            </li>
          </ol>
        </nav>
        
        <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
          {categoryName}
        </h1>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </div>
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😞</div>
          <h2 className="text-2xl font-semibold mb-2">No hay productos en esta categoría</h2>
          <p className="text-gray-600 mb-4">Prueba a explorar otras categorías de nuestro catálogo.</p>
          <Link 
            to="/catalog" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Ver Todo el Catálogo
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;