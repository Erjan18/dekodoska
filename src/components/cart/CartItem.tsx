import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col md:flex-row items-center py-4 border-b border-gray-200">
      {/* Product image */}
      <div className="w-full md:w-24 h-24 flex-shrink-0 mb-4 md:mb-0">
        <Link to={`/catalog/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>
      
      {/* Product details */}
      <div className="flex-grow md:ml-4 w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <Link 
              to={`/catalog/${product.id}`}
              className="text-lg font-medium text-gray-800 hover:text-amber-600 transition-colors"
            >
              {product.name}
            </Link>
            <p className="text-sm text-gray-500">
              {product.dimensions.width}×{product.dimensions.length} мм, {product.color}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {product.price} сом за шт.
            </p>
          </div>
          
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
            {/* Quantity controls */}
            <div className="flex items-center">
              <button 
                onClick={handleDecrement}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              
              <span className="mx-2 w-8 text-center">{quantity}</span>
              
              <button 
                onClick={handleIncrement}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            
            {/* Total price */}
            <div className="font-semibold text-lg text-gray-800 ml-8 mr-4">
              {(quantity * product.price).toLocaleString()} сом
            </div>
            
            {/* Remove button */}
            <button 
              onClick={handleRemove}
              className="p-1 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
              aria-label="Удалить"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;