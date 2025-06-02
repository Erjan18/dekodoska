import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Ruler, Calculator } from 'lucide-react';
import Button from '../components/ui/Button';
import DeckingCalculator from '../components/calculator/DeckingCalculator';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === productId);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
        <p className="mb-8">К сожалению, запрашиваемый товар не существует или был удален.</p>
        <Button variant="primary" onClick={() => navigate('/catalog')}>
          Вернуться в каталог
        </Button>
      </div>
    );
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handlePrevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setActiveImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const toggleCalculator = () => {
    setShowCalculator(prev => !prev);
  };
  
  return (
    <div className="pt-16">
      {/* Product gallery and info */}
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Назад</span>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product gallery */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-1 rounded-full shadow-md transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-1 rounded-full shadow-md transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`
                      w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2
                      ${activeImageIndex === index 
                        ? 'border-amber-600' 
                        : 'border-transparent hover:border-gray-300'}
                    `}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-gray-500">Артикул: {product.id}</p>
              </div>
              
              {(product.isNew || product.isPopular) && (
                <div className="flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                      Новинка
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-md">
                      Популярное
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-lg">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Характеристики</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600">Размеры:</span>
                  <span className="font-medium">{product.dimensions.width}×{product.dimensions.length}×{product.dimensions.thickness} мм</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600">Цвет:</span>
                  <span className="font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600">Тип:</span>
                  <span className="font-medium">{product.type === 'hollow' ? 'Пустотелая' : 'Полнотелая'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600">Назначение:</span>
                  <span className="font-medium">{product.purpose.join(', ')}</span>
                </div>
                
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-gray-600">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{product.price} сом/шт.</p>
                  <p className="text-gray-600">{product.pricePerSquareMeter} сом/м²</p>
                </div>
                
                <div className="flex items-center mt-3 sm:mt-0">
                  <label htmlFor="quantity" className="text-gray-600 mr-2">Количество:</label>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-16 border border-gray-300 rounded-md py-1 px-2 text-center"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="primary" 
                  leftIcon={<ShoppingCart size={20} />}
                  onClick={handleAddToCart}
                  fullWidth
                >
                  В корзину
                </Button>
                
                <Button 
                  variant="outline"
                  leftIcon={<Calculator size={20} />}
                  onClick={toggleCalculator}
                  fullWidth
                >
                  Рассчитать количество
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calculator section */}
      {showCalculator && (
        <div className="container mx-auto px-4 py-8 mt-4">
          <DeckingCalculator products={products} selectedProductId={product.id} />
        </div>
      )}
      
      {/* Related products section */}
      <div className="bg-gray-50 py-12 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Похожие товары</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.type === product.type)
              .slice(0, 4)
              .map(relatedProduct => (
                <div 
                  key={relatedProduct.id} 
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name} 
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {relatedProduct.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {relatedProduct.dimensions.width}×{relatedProduct.dimensions.length} мм, {relatedProduct.color}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">
                        {relatedProduct.price} сом
                      </span>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/catalog/${relatedProduct.id}`)}
                      >
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;