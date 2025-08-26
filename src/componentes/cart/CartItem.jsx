import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  // Acceder a las propiedades del producto a través de item.product
  const product = item.product || item;

  return (
    <div className="flex items-center border-b py-4">
      <div className="w-24 h-24 overflow-hidden rounded mr-4">
        {product.image1 && (
          <img 
            src={product.image1} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-emerald-600">${product.price.toFixed(2)}</p>
        
        <div className="flex items-center mt-2">
          <button 
            onClick={() => updateQuantity(product.id, item.quantity - 1)}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(product.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">${(product.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeFromCart(product.id)}
          className="text-red-500 hover:text-red-700 mt-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;