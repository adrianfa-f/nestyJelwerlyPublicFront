// componentes/catalog/Filters.js
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Filters = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: false,
    price: false
  });

  const categories = [
    'Anillos compromiso',
    'Anillos matrimonio',
    'Collares y cadenas',
    'Pulseras y brazaletes',
    'Aretes y pendientes',
    'Dijes y charms',
    'Broches y alfileres'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    const numValue = value === '' ? '' : Number(value);
    setFilters(prev => ({ ...prev, [type]: numValue }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Sección de Categoría */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700"
          >
            <span>Categoría</span>
            {expandedSections.category ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {expandedSections.category && (
            <div className="mt-2 space-y-2 pl-2">
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
          )}
        </div>
        
        {/* Sección de Precio */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700"
          >
            <span>Rango de Precio</span>
            {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {expandedSections.price && (
            <div className="mt-2 grid grid-cols-2 gap-3 pl-2">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;