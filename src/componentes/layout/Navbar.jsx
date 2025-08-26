import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaMapMarkerAlt, FaHeart, FaThList } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import Logo from '../../assets/NestyLuxeLogoAjustado.png';

const Navbar = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={Logo}
              alt="Nesty Luxe Jewelry" 
              className="h-10 w-10 object-contain"
            />
          </Link>
          
          <div className="flex items-center space-x-6">
            {/* Catálogo como icono */}
            <Link to="/catalog" className="hover:text-emerald-600" title="Catálogo">
              <FaThList className="text-xl" />
            </Link>

            {/* Ubicaciones como icono */}
            <Link to="/ubicaciones" className="hover:text-emerald-600" title="Ubicaciones">
              <FaMapMarkerAlt className="text-xl" />
            </Link>
            
            {isAuthenticated ? (
              <>
                {/* Wishlist como icono */}
                <Link to="/wishlist" className="relative hover:text-emerald-600" title="Lista de deseos">
                  <FaHeart className="text-xl" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                
                {/* Carrito como icono */}
                <Link to="/cart" className="relative hover:text-emerald-600" title="Carrito">
                  <FaShoppingCart className="text-xl" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {/* Menú de usuario */}
                <div className="relative" ref={menuRef}>
                  <button 
                    className="flex items-center hover:text-emerald-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    title="Perfil"
                  >
                    <FaUser className="text-xl" />
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b text-sm text-gray-700">
                        {user?.email}
                      </div>
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
    </nav>
  );
};

export default Navbar;