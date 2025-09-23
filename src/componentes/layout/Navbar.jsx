// Navbar.js - Actualizado
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaThList,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Logo from "../../assets/NestyLuxeLogoAjustado.png";

const Navbar = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

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
            {/* Catálogo */}
            <Link
              to="/catalog"
              className="hover:text-emerald-600"
              title="Catálogo"
            >
              <FaThList className="text-xl" />
            </Link>

            {/* Mis Pedidos (NUEVO) */}
            <Link
              to="/my-orders"
              className="hover:text-emerald-600"
              title="Mis Pedidos"
            >
              <FaBoxOpen className="text-xl" />
            </Link>

            {/* Seguimiento de pedidos (para búsqueda manual) */}
            <Link
              to="/order-tracking"
              className="hover:text-emerald-600"
              title="Buscar Pedido"
            >
              <FaSearch className="text-xl" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative hover:text-emerald-600"
              title="Lista de deseos"
            >
              <FaHeart className="text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Carrito */}
            <Link
              to="/cart"
              className="relative hover:text-emerald-600"
              title="Carrito"
            >
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
