import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut, Edit2, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

type Order = {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: Array<{
    product: {
      id: string;
      name: string;
    };
    quantity: number;
  }>;
};

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Load orders from localStorage
  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        try {
          const allOrders = JSON.parse(savedOrders);
          setOrders(allOrders);
        } catch (error) {
          console.error('Failed to parse orders from localStorage:', error);
        }
      }
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    updateUserProfile(userData);
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Ожидает обработки';
      case 'processing': return 'В обработке';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
      default: return 'Статус неизвестен';
    }
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-200 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-amber-100 text-amber-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  return (
    <div className="pt-16">
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
          <p className="text-gray-300">Здравствуйте, {user.name}!</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <User size={20} className="mr-2 text-amber-600" />
                  Профиль
                </h2>
                
                {isEditing ? (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    leftIcon={<Check size={16} />}
                    onClick={handleSaveProfile}
                  >
                    Сохранить
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    leftIcon={<Edit2 size={16} />}
                    onClick={() => setIsEditing(true)}
                  >
                    Изменить
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Имя и фамилия"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    fullWidth
                    disabled
                  />
                  
                  <Input
                    label="Телефон"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Адрес"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Имя и фамилия</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <p className="font-medium">{userData.phone || 'Не указан'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Адрес</p>
                    <p className="font-medium">{userData.address || 'Не указан'}</p>
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  fullWidth 
                  leftIcon={<LogOut size={18} />}
                  onClick={handleLogout}
                >
                  Выйти из аккаунта
                </Button>
              </div>
            </div>
          </div>
          
          {/* Orders */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold flex items-center mb-6">
                <Package size={20} className="mr-2 text-amber-600" />
                История заказов
              </h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">У вас пока нет заказов</h3>
                  <p className="text-gray-500 mb-6">
                    Ваша история заказов будет отображаться здесь после оформления первого заказа
                  </p>
                  <Button variant="primary" onClick={() => navigate('/catalog')}>
                    Перейти в каталог
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Заказ №</p>
                          <p className="font-medium">{order.id}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Дата</p>
                          <p className="font-medium">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Сумма</p>
                          <p className="font-medium">{order.totalAmount.toLocaleString()} сом</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Статус</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium mb-2">Товары:</p>
                        <ul className="space-y-1">
                          {order.items.map(item => (
                            <li key={item.product.id} className="text-sm text-gray-600">
                              {item.product.name} × {item.quantity} шт.
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/catalog`)}>
                          Повторить заказ
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;