// componentes/catalog/Filters.js
import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const categories = [
    'Anillos compromiso',
    'Anillos matrimonio',
    'Collares y cadenas',
    'Pulseras y brazaletes',
    'Aretes y pendientes',
    'Dijes y charms',
    'Broches y alfileres'
  ];

  const handlePriceChange = (type, value) => {
    const numValue = value === '' ? '' : Number(value);
    setFilters(prev => ({ ...prev, [type]: numValue }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Filtros</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm text-emerald-600 hover:text-emerald-800"
          >
            Limpiar
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat} className="flex items-center">
                <input
                  id={`category-${cat}`}
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor={`category-${cat}`} className="ml-2 text-sm text-gray-700">
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rango de Precio
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="min-price" className="block text-xs text-gray-500 mb-1">Mínimo</label>
              <input
                id="min-price"
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-xs text-gray-500 mb-1">Máximo</label>
              <input
                id="max-price"
                type="number"
                placeholder="1000"
                value={filters.maxPrice || ''}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;