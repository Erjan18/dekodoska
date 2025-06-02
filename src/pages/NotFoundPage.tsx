import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-9xl font-extrabold text-amber-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Страница не найдена</h2>
          <p className="mt-2 text-lg text-gray-600">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => navigate('/')}>
            Вернуться на главную
          </Button>
          <Button variant="outline" onClick={() => navigate('/catalog')}>
            Перейти в каталог
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;