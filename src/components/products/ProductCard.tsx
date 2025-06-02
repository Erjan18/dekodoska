import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <Card 
      className="group h-full flex flex-col" 
      hoverEffect={true} 
      radius="md"
    >
      <div className="relative">
        <Link to={`/catalog/${product.id}`}>
          <div className="aspect-square overflow-hidden rounded-t-md">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          <div className="absolute top-2 right-2 flex flex-col gap-2">
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
        </Link>
      </div>
      
      <div className="flex-grow p-4 flex flex-col">
        <Link to={`/catalog/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-amber-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {product.shortDescription}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xl font-bold text-gray-900">
                {product.price} сом
              </p>
              <p className="text-sm text-gray-500">
                {product.pricePerSquareMeter} сом/м²
              </p>
            </div>
            
            <div className="text-sm text-gray-600">
              {product.dimensions.width}×{product.dimensions.length} мм
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Link to={`/catalog/${product.id}`} className="w-full block">
                Подробнее
              </Link>
            </Button>
            
            <Button 
              variant="primary" 
              className="px-3"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;