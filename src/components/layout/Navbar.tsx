import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Update scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || mobileMenuOpen ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className={`font-bold text-2xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              ДекоДоска
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/catalog" 
              className={`transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              Каталог
            </Link>
            <Link 
              to="/calculator" 
              className={`transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              Калькулятор
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              О компании
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              Контакты
            </Link>
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to={isAuthenticated ? "/profile" : "/login"} 
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              <User size={20} />
            </Link>
            <Link 
              to="/cart" 
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/cart" 
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/catalog" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
            >
              Каталог
            </Link>
            <Link 
              to="/calculator" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
            >
              Калькулятор
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
            >
              О компании
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
            >
              Контакты
            </Link>
            <Link 
              to={isAuthenticated ? "/profile" : "/login"} 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
            >
              {isAuthenticated ? "Мой профиль" : "Войти"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;