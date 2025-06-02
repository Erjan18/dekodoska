import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilter from '../components/products/ProductFilter';
import Select from '../components/ui/Select';
import { ArrowUpDown } from 'lucide-react';
import products from '../data/products';
import { Product, FilterOptions, SortOption } from '../types';

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOption, setSortOption] = useState<SortOption>('popularity');
  
  // Extract unique colors and purposes for filter options
  const availableColors = [...new Set(products.map(product => product.color))];
  const availablePurposes = [...new Set(products.flatMap(product => product.purpose))];
  
  // Apply initial filters from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const purposeParam = searchParams.get('purpose');
    const colorParam = searchParams.get('color');
    const sortParam = searchParams.get('sort') as SortOption;
    
    let initialFilters: FilterOptions = {};
    
    if (typeParam) {
      initialFilters.types = [typeParam as 'hollow' | 'solid'];
    }
    
    if (purposeParam) {
      initialFilters.purposes = [purposeParam];
    }
    
    if (colorParam) {
      initialFilters.colors = [colorParam];
    }
    
    if (sortParam) {
      setSortOption(sortParam);
    }
    
    setFilters(initialFilters);
  }, [searchParams]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply filters
    if (filters.types && filters.types.length > 0) {
      result = result.filter(product => filters.types!.includes(product.type));
    }
    
    if (filters.colors && filters.colors.length > 0) {
      result = result.filter(product => filters.colors!.includes(product.color));
    }
    
    if (filters.purposes && filters.purposes.length > 0) {
      result = result.filter(product => 
        product.purpose.some(purpose => filters.purposes!.includes(purpose))
      );
    }
    
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      result = result.filter(product => product.price >= min && product.price <= max);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL params
    const params = new URLSearchParams();
    
    if (filters.types && filters.types.length === 1) {
      params.set('type', filters.types[0]);
    }
    
    if (filters.purposes && filters.purposes.length === 1) {
      params.set('purpose', filters.purposes[0]);
    }
    
    if (filters.colors && filters.colors.length === 1) {
      params.set('color', filters.colors[0]);
    }
    
    if (sortOption) {
      params.set('sort', sortOption);
    }
    
    setSearchParams(params);
  }, [filters, sortOption, setSearchParams]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
  };
  
  return (
    <div className="pt-16">
      {/* Catalog header */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Каталог террасной доски</h1>
          <p className="text-gray-300">
            Выбирайте из широкого ассортимента террасной доски различных типов и цветов
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full md:w-1/4">
            <ProductFilter 
              onFilterChange={handleFilterChange} 
              availableColors={availableColors}
              availablePurposes={availablePurposes}
            />
          </div>
          
          {/* Products list */}
          <div className="w-full md:w-3/4">
            {/* Sort controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
              </p>
              
              <div className="flex items-center">
                <ArrowUpDown size={18} className="mr-2 text-gray-500" />
                <Select
                  options={[
                    { value: 'popularity', label: 'По популярности' },
                    { value: 'price-asc', label: 'Сначала дешевле' },
                    { value: 'price-desc', label: 'Сначала дороже' },
                    { value: 'newest', label: 'Новинки' },
                  ]}
                  value={sortOption}
                  onChange={handleSortChange}
                  className="w-48"
                />
              </div>
            </div>
            
            <ProductGrid products={filteredProducts} columns={{ sm: 1, md: 2, lg: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;