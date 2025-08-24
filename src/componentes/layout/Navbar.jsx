import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../../context/useCart';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/NestyLuxeLogoAjustado.png'

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={Logo}
              alt="Ernesto Luxe Jewelry" 
              className="h-10 w-10 object-contain"
            />
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/catalog" className="hover:text-emerald-600">
              Catálogo
            </Link>

            <Link to="/ubicaciones" className="hover:text-emerald-600 flex items-center">
              <FaMapMarkerAlt className="text-xl mr-1" />
              <span className="hidden sm:inline">Ubicaciones</span>
            </Link>

            <Link to="/cart" className="relative hover:text-emerald-600">
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <>                
                <div className="relative">
                  <button 
                    className="flex items-center space-x-1 hover:text-emerald-600 z-10"
                    onMouseEnter={() => setIsMenuOpen(true)}
                  >
                    <FaUser className="text-xl" />
                    <span className="hidden md:inline">{user?.email}</span>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mis Pedidos
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Administración
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <FaSignOutAlt className="mr-2" />
                          Cerrar Sesión
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-emerald-600">
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Cerrar menú al hacer clic fuera */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;