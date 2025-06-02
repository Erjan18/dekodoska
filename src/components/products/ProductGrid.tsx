import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products,
  columns = { sm: 1, md: 2, lg: 3 } 
}) => {
  const getGridCols = () => {
    const sm = columns.sm || 1;
    const md = columns.md || 2;
    const lg = columns.lg || 3;
    
    return `grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg}`;
  };
  
  return (
    <div className={`grid ${getGridCols()} gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      
      {products.length === 0 && (
        <div className="col-span-full py-16 text-center">
          <p className="text-lg text-gray-500">
            Товары не найдены. Попробуйте изменить параметры фильтра.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;