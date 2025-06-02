import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ДекоДоска</h3>
            <p className="text-gray-400 mb-4">
              Производство качественной террасной доски из древесно-полимерного композита с 2010 года
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-400 hover:text-white transition-colors">
                  Калькулятор
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Продукция</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?type=hollow" className="text-gray-400 hover:text-white transition-colors">
                  Пустотелая доска
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=solid" className="text-gray-400 hover:text-white transition-colors">
                  Полнотелая доска
                </Link>
              </li>
              <li>
                <Link to="/catalog?purpose=Терраса" className="text-gray-400 hover:text-white transition-colors">
                  Для террас
                </Link>
              </li>
              <li>
                <Link to="/catalog?purpose=Бассейн" className="text-gray-400 hover:text-white transition-colors">
                  Для бассейнов
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={20} className="mr-2 flex-shrink-0 mt-1 text-amber-500" />
                <span>+996 550 200 300</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-2 flex-shrink-0 mt-1 text-amber-500" />
                <span>info@dekodoska.kg</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 flex-shrink-0 mt-1 text-amber-500" />
                <span>г. Бишкек, ул. Анкара 70</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ДекоДоска. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;