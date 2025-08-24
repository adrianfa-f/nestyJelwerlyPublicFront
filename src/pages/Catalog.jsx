// pages/Catalog.js
import { useState, useEffect } from 'react';
import ProductGrid from '../componentes/catalog/ProductGrid';
import Filters from '../componentes/catalog/Filters';
import { useProduct } from '../context/ProductContext';
import SortDropdown from '../componentes/catalog/SortDropdown';
import SearchBar from '../componentes/catalog/SearchBar';

const Catalog = () => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Joyería</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="sticky top-4">
            <div className="mb-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
        
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
            </p>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
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