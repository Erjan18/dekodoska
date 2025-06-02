import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/profile');
      } else {
        setError('Неверный email или пароль');
      }
    } catch (err) {
      setError('Произошла ошибка при входе. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Вход в личный кабинет
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Или{' '}
            <Link to="/register" className="font-medium text-amber-600 hover:text-amber-500">
              зарегистрируйтесь, если у вас еще нет аккаунта
            </Link>
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50\" role="alert">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<User size={18} />}
              fullWidth
              required
            />
            
            <Input
              label="Пароль"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={18} />}
              fullWidth
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Запомнить меня
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                  Забыли пароль?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
            >
              Войти
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Вернуться на главную
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Для демонстрации используйте:<br />
            Email: demo@example.com<br />
            Пароль: password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;