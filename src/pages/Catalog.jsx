// pages/Catalog.js
import { useState, useEffect } from 'react';
import ProductGrid from '../componentes/catalog/ProductGrid';
import Filters from '../componentes/catalog/Filters';
import { useProduct } from '../context/ProductContext';
import SortDropdown from '../componentes/catalog/SortDropdown';
import SearchBar from '../componentes/catalog/SearchBar';
import { FaFilter, FaTimes } from 'react-icons/fa';

const Catalog = () => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { products } = useProduct();
  
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      setIsLoading(false);
      return;
    }

    let result = [...products];
    
    // Aplicar filtros
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.minPrice) {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }
    
    // Aplicar búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }
    
    // Aplicar ordenamiento
    result.sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
    setIsLoading(false);
  }, [products, filters, sortBy, searchTerm]);

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Joyería</h1>
      
      {/* Barra superior con búsqueda y botones */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
          >
            {showFilters ? <FaTimes /> : <FaFilter />}
            Filtros {hasActiveFilters && '•'}
          </button>
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* Panel de filtros móvil */}
      {showFilters && (
        <div className="md:hidden mb-6">
          <Filters filters={filters} setFilters={setFilters} />
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-2 text-sm text-emerald-600 hover:text-emerald-800"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros para desktop */}
        <div className="hidden md:block md:w-1/4">
          <div className="sticky top-4">
            <Filters filters={filters} setFilters={setFilters} />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-2 text-sm text-emerald-600 hover:text-emerald-800"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
              {hasActiveFilters && ' (filtrados)'}
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-gray-600">Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;