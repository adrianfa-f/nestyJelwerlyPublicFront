import { useCart } from '../../context/useCart';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center border-b py-4">
      <div className="w-24 h-24 overflow-hidden rounded mr-4">
        {item.images && item.images.length > 0 && (
          <img 
            src={item.images[0]} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-emerald-600">${item.price.toFixed(2)}</p>
        
        <div className="flex items-center mt-2">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 bg-gray-200 rounded-full"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-200 rounded-full"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 mt-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;