import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronRight, Calculator } from 'lucide-react';
import Button from '../components/ui/Button';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const isEmpty = cartItems.length === 0;
  
  return (
    <div className="pt-16">
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Корзина</h1>
          <div className="flex items-center text-gray-300">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={16} className="mx-2" />
            <span>Корзина</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {isEmpty ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 text-gray-500 rounded-full mb-6">
              <ShoppingCart size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Похоже, вы еще не добавили товары в корзину. Перейдите в каталог, чтобы выбрать продукцию.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => navigate('/catalog')}>
                Перейти в каталог
              </Button>
              <Button variant="outline" onClick={() => navigate('/calculator')}>
                <div className="flex items-center">
                  <Calculator size={18} className="mr-2" />
                  <span>Открыть калькулятор</span>
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Товары в корзине</h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Очистить корзину
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Сумма заказа</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Товары ({cartItems.length}):</span>
                    <span>{totalPrice.toLocaleString()} сом</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка:</span>
                    <span>Рассчитывается при оформлении</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center font-bold text-lg">
                    <span>Итого:</span>
                    <span>{totalPrice.toLocaleString()} сом</span>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  onClick={() => navigate('/checkout')}
                >
                  Оформить заказ
                </Button>
                
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями продажи и политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;