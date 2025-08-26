import { Link } from 'react-router-dom';
import CartItem from '../componentes/cart/CartItem';
import CartSummary from '../componentes/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { FaArrowLeft, FaShoppingBag } from 'react-icons/fa';

const Cart = () => {
  const { cart, totalPrice, clearCart, loading } = useCart();
  
  // Si el carrito está cargando, mostrar un spinner
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  // Asegurarse de que cart.items existe y es un array
  const cartItems = cart?.items || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <FaShoppingBag className="text-2xl text-gray-400" />
          </div>
          <h2 className="text-2xl mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Parece que aún no has añadido productos a tu carrito.</p>
          <Link 
            to="/catalog" 
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Link 
                to="/catalog" 
                className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
              >
                <FaArrowLeft className="mr-2" />
                Seguir Comprando
              </Link>
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
          
          <div>
            <CartSummary 
              total={totalPrice} 
              itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;