// componentes/catalog/SortDropdown.js
import React from 'react';

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    >
      <option value="name">Ordenar por: Nombre</option>
      <option value="price-low">Precio: Menor a Mayor</option>
      <option value="price-high">Precio: Mayor a Menor</option>
    </select>
  );
};

export default SortDropdown;