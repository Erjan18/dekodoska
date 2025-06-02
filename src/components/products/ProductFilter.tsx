import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';
import { FilterOptions } from '../../types';

interface ProductFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableColors: string[];
  availablePurposes: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  onFilterChange, 
  availableColors, 
  availablePurposes 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    colors: [],
    types: [],
    purposes: [],
    priceRange: { min: 0, max: 5000 }
  });

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleColorChange = (color: string) => {
    setFilters(prev => {
      const newColors = prev.colors?.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...(prev.colors || []), color];
      
      return { ...prev, colors: newColors };
    });
  };

  const handleTypeChange = (type: 'hollow' | 'solid') => {
    setFilters(prev => {
      const newTypes = prev.types?.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...(prev.types || []), type];
      
      return { ...prev, types: newTypes };
    });
  };

  const handlePurposeChange = (purpose: string) => {
    setFilters(prev => {
      const newPurposes = prev.purposes?.includes(purpose)
        ? prev.purposes.filter(p => p !== purpose)
        : [...(prev.purposes || []), purpose];
      
      return { ...prev, purposes: newPurposes };
    });
  };

  const handlePriceChange = (value: number, field: 'min' | 'max') => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...(prev.priceRange || { min: 0, max: 5000 }),
        [field]: value
      }
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      colors: [],
      types: [],
      purposes: [],
      priceRange: { min: 0, max: 5000 }
    });
    onFilterChange({});
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Фильтры</h2>
        <Button 
          variant="outline" 
          size="sm" 
          leftIcon={isOpen ? <X size={16} /> : <Filter size={16} />}
          onClick={toggleFilter}
          className="md:hidden"
        >
          {isOpen ? "Скрыть" : "Фильтры"}
        </Button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg shadow`}>
        {/* Price range */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Цена (сом)</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="От"
              value={filters.priceRange?.min || ''}
              onChange={e => handlePriceChange(Number(e.target.value), 'min')}
            />
            <span>—</span>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="До"
              value={filters.priceRange?.max || ''}
              onChange={e => handlePriceChange(Number(e.target.value), 'max')}
            />
          </div>
        </div>

        {/* Types */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Тип доски</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 text-amber-600 rounded"
                checked={filters.types?.includes('hollow') || false}
                onChange={() => handleTypeChange('hollow')}
              />
              <span className="ml-2">Пустотелая</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 text-amber-600 rounded"
                checked={filters.types?.includes('solid') || false}
                onChange={() => handleTypeChange('solid')}
              />
              <span className="ml-2">Полнотелая</span>
            </label>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Цвет</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map(color => (
              <label 
                key={color} 
                className={`
                  cursor-pointer px-3 py-1 border rounded-full text-sm
                  ${filters.colors?.includes(color) 
                    ? 'bg-amber-600 text-white border-amber-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-amber-600'
                  }
                `}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.colors?.includes(color) || false}
                  onChange={() => handleColorChange(color)}
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Purposes */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Назначение</h3>
          <div className="space-y-2">
            {availablePurposes.map(purpose => (
              <label key={purpose} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-amber-600 rounded"
                  checked={filters.purposes?.includes(purpose) || false}
                  onChange={() => handlePurposeChange(purpose)}
                />
                <span className="ml-2">{purpose}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" onClick={applyFilters} fullWidth>
            Применить
          </Button>
          <Button variant="outline" onClick={resetFilters} fullWidth>
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;