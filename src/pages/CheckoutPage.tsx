import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, Home, User, Phone, Mail, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCart } from '../context/CartContext';

type DeliveryMethod = 'courier' | 'pickup';
type PaymentMethod = 'card' | 'cash';

const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });
  
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('courier');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Пожалуйста, укажите корректный номер телефона';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, укажите корректный email';
    }
    
    if (deliveryMethod === 'courier' && !formData.address.trim()) {
      newErrors.address = 'Пожалуйста, укажите адрес доставки';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order submission (in a real app, this would be an API call)
    setTimeout(() => {
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        totalAmount: totalPrice,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        },
        orderDate: new Date().toISOString(),
        status: 'pending',
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        comment: formData.comment,
      };
      
      // Store order in localStorage for demo purposes
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...orders, order]));
      
      // Clear the cart
      clearCart();
      
      // Navigate to success page
      navigate('/checkout/success', { state: { orderId: order.id } });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="pt-16">
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Оформление заказа</h1>
          <div className="flex items-center text-gray-300">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/cart" className="hover:text-white">Корзина</Link>
            <ChevronRight size={16} className="mx-2" />
            <span>Оформление заказа</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Customer info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User size={20} className="mr-2 text-amber-600" />
                Контактная информация
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Имя и фамилия *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  fullWidth
                />
                
                <Input
                  label="Телефон *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  placeholder="+996 (___) ___-___"
                  fullWidth
                />
                
                <Input
                  label="Email *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  fullWidth
                />
              </div>
            </div>
            
            {/* Delivery */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Truck size={20} className="mr-2 text-amber-600" />
                Способ доставки
              </h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-start p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'courier'}
                    onChange={() => setDeliveryMethod('courier')}
                    className="mt-1 h-4 w-4 text-amber-600"
                  />
                  <div className="ml-3">
                    <span className="block font-medium">Курьерская доставка</span>
                    <span className="text-sm text-gray-500">3-5 рабочих дней, стоимость рассчитывается при оформлении</span>
                  </div>
                </label>
                
                <label className="flex items-start p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                    className="mt-1 h-4 w-4 text-amber-600"
                  />
                  <div className="ml-3">
                    <span className="block font-medium">Самовывоз со склада</span>
                    <span className="text-sm text-gray-500">Бишкек, ул Анкара 70. Пн-Пт: 9:00-18:00</span>
                  </div>
                </label>
              </div>
              
              {deliveryMethod === 'courier' && (
                <div>
                  <Input
                    label="Адрес доставки *"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    placeholder="Город, улица, дом, квартира"
                    fullWidth
                    leftIcon={<Home size={18} />}
                  />
                </div>
              )}
            </div>
            
            {/* Payment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard size={20} className="mr-2 text-amber-600" />
                Способ оплаты
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-start p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 h-4 w-4 text-amber-600"
                  />
                  <div className="ml-3">
                    <span className="block font-medium">Оплата картой при получении</span>
                    <span className="text-sm text-gray-500">Visa, MasterCard, МИР</span>
                  </div>
                </label>
                
                <label className="flex items-start p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="mt-1 h-4 w-4 text-amber-600"
                  />
                  <div className="ml-3">
                    <span className="block font-medium">Оплата наличными при получении</span>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Comment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Комментарий к заказу</h2>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                rows={3}
                placeholder="Дополнительная информация о заказе или доставке"
              ></textarea>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Ваш заказ</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <div className="flex-grow">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} шт.</p>
                    </div>
                    <p className="font-medium">{item.totalPrice.toLocaleString()} сом</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Итого:</span>
                  <span>{totalPrice.toLocaleString()} сом</span>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-start">
                <AlertCircle size={20} className="text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями продажи и политикой конфиденциальности
                </p>
              </div>
              
              <Button 
                type="submit"
                variant="primary" 
                fullWidth 
                size="lg"
                isLoading={isSubmitting}
              >
                Оформить заказ
              </Button>
              
              <div className="mt-4">
                <Link 
                  to="/cart" 
                  className="block text-center text-amber-600 hover:text-amber-700"
                >
                  Вернуться в корзину
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;