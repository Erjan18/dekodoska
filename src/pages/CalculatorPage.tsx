import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeckingCalculator from '../components/calculator/DeckingCalculator';
import products from '../data/products';

const CalculatorPage: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Калькулятор террасной доски</h1>
          <div className="flex items-center text-gray-300">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={16} className="mx-2" />
            <span>Калькулятор</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <DeckingCalculator products={products} />
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Как пользоваться калькулятором</h2>
              
              <ol className="space-y-4 list-decimal list-inside text-gray-700">
                <li>
                  <span className="font-medium">Введите размеры площадки</span>
                  <p className="ml-6 text-sm text-gray-600 mt-1">
                    Укажите ширину и длину в сантиметрах. Если площадка сложной формы, разбейте её на прямоугольные участки и рассчитайте отдельно.
                  </p>
                </li>
                
                <li>
                  <span className="font-medium">Выберите тип доски</span>
                  <p className="ml-6 text-sm text-gray-600 mt-1">
                    В зависимости от назначения террасы подберите подходящий тип доски. Для участков с высокой нагрузкой рекомендуем полнотелую доску.
                  </p>
                </li>
                
                <li>
                  <span className="font-medium">Получите результат</span>
                  <p className="ml-6 text-sm text-gray-600 mt-1">
                    Калькулятор рассчитает необходимое количество досок и общую стоимость. Мы рекомендуем добавить запас 5-10% на подрезку.
                  </p>
                </li>
                
                <li>
                  <span className="font-medium">Добавьте в корзину</span>
                  <p className="ml-6 text-sm text-gray-600 mt-1">
                    Когда расчет будет готов, вы можете сразу добавить товар в корзину с нужным количеством.
                  </p>
                </li>
              </ol>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Нужна помощь?</h2>
              
              <p className="text-gray-700 mb-4">
                Если у вас возникли вопросы по расчету материалов или вам нужна консультация специалиста, свяжитесь с нами любым удобным способом.
              </p>
              
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">Телефон:</span>
                  <a href="tel:+79991234567" className="text-amber-600 hover:text-amber-700">
                    +996 550 200 300
                  </a>
                </p>
                
                <p className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">Email:</span>
                  <a href="mailto:info@dekodoska.kg" className="text-amber-600 hover:text-amber-700">
                    info@dekodoska.kg
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;