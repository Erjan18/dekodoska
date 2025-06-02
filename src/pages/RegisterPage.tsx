import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, укажите корректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пожалуйста, введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password
      );
      
      if (success) {
        navigate('/profile');
      }
    } catch (err) {
      setErrors({ form: 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Создание аккаунта
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Или{' '}
            <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
              войдите, если у вас уже есть аккаунт
            </Link>
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          {errors.form && (
            <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50\" role="alert">
              {errors.form}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Имя и фамилия"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              leftIcon={<User size={18} />}
              error={errors.name}
              fullWidth
              required
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              leftIcon={<Mail size={18} />}
              error={errors.email}
              fullWidth
              required
            />
            
            <Input
              label="Пароль"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              leftIcon={<Lock size={18} />}
              error={errors.password}
              helperText="Минимум 6 символов"
              fullWidth
              required
            />
            
            <Input
              label="Подтверждение пароля"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              leftIcon={<Lock size={18} />}
              error={errors.confirmPassword}
              fullWidth
              required
            />
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Я согласен с <a href="#" className="text-amber-600 hover:text-amber-500">условиями использования</a> и <a href="#" className="text-amber-600 hover:text-amber-500">политикой конфиденциальности</a>
              </label>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
            >
              Зарегистрироваться
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;