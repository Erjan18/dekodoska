import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Timer, Leaf } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductGrid from '../components/products/ProductGrid';
import products from '../data/products';

const HomePage: React.FC = () => {
  const popularProducts = products.filter(product => product.isPopular);
  const newProducts = products.filter(product => product.isNew);

  return (
    <div>
      {/* Hero section */}
      <section
        className="relative bg-cover bg-center h-screen min-h-[600px] flex items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/5997977/pexels-photo-5997977.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
            Качественная террасная доска напрямую от производителя
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Долговечность, эстетика и лёгкий уход для вашего загородного дома
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={20} />}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Link to="/catalog" className="block w-full">
                Перейти в каталог
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link to="/calculator" className="block w-full">
                Рассчитать количество
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Доставка по Бишкеку</h3>
              <p className="text-gray-600">Отправляем товары надежными транспортными компаниями</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">На всю продукцию мы предоставляем гарантию до 25 лет</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                <Timer size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Простая укладка</h3>
              <p className="text-gray-600">Террасная доска легко и быстро монтируется без специальных инструментов</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Экологичность</h3>
              <p className="text-gray-600">Наша продукция изготавливается из экологически чистых материалов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular products section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Популярные товары</h2>
            <Link 
              to="/catalog" 
              className="text-amber-600 hover:text-amber-700 flex items-center"
            >
              Смотреть все <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <ProductGrid products={popularProducts} columns={{ sm: 1, md: 2, lg: 3 }} />
        </div>
      </section>

      {/* New products section */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Новинки</h2>
              <Link 
                to="/catalog?filter=new" 
                className="text-amber-600 hover:text-amber-700 flex items-center"
              >
                Смотреть все <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <ProductGrid products={newProducts} columns={{ sm: 1, md: 2, lg: 3 }} />
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы сделать заказ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Воспользуйтесь нашим калькулятором, чтобы точно рассчитать количество необходимых материалов
          </p>
          <Button variant="primary" size="lg" className="bg-amber-600 hover:bg-amber-700">
            <Link to="/calculator" className="block w-full">Открыть калькулятор</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;