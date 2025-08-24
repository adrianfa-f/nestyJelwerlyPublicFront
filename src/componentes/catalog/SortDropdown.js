// componentes/catalog/SortDropdown.js
import React from 'react';

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Ordenar por:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
      >
        <option value="name">Nombre (A-Z)</option>
        <option value="price-low">Precio (Menor a Mayor)</option>
        <option value="price-high">Precio (Mayor a Menor)</option>
      </select>
    </div>
  );
};

export default SortDropdown;