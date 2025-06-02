import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Calculator } from 'lucide-react';

interface DeckingCalculatorProps {
  products: Product[];
  selectedProductId?: string;
}

const DeckingCalculator: React.FC<DeckingCalculatorProps> = ({ 
  products, 
  selectedProductId 
}) => {
  const { addToCart } = useCart();
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [productId, setProductId] = useState(selectedProductId || '');
  const [boardsNeeded, setBoardsNeeded] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [area, setArea] = useState(0);
  const [calculationDone, setCalculationDone] = useState(false);
  
  useEffect(() => {
    if (selectedProductId) {
      setProductId(selectedProductId);
    }
  }, [selectedProductId]);

  const handleCalculate = () => {
    if (!width || !length || !productId) return;
    
    const numWidth = parseFloat(width);
    const numLength = parseFloat(length);
    
    if (isNaN(numWidth) || isNaN(numLength) || numWidth <= 0 || numLength <= 0) return;
    
    const areaInSquareMeters = (numWidth * numLength) / 10000; // Convert from cm² to m²
    setArea(areaInSquareMeters);
    
    const selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;
    
    const boardWidth = selectedProduct.dimensions.width / 1000; // Convert from mm to m
    const boardLength = selectedProduct.dimensions.length / 1000; // Convert from mm to m
    
    const boardArea = boardWidth * boardLength;
    const boardsCount = Math.ceil(areaInSquareMeters / boardArea);
    
    setBoardsNeeded(boardsCount);
    setTotalPrice(boardsCount * selectedProduct.price);
    setCalculationDone(true);
  };

  const handleReset = () => {
    setWidth('');
    setLength('');
    setBoardsNeeded(0);
    setTotalPrice(0);
    setArea(0);
    setCalculationDone(false);
  };

  const handleAddToCart = () => {
    if (!productId || boardsNeeded <= 0) return;
    
    const selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct) {
      addToCart(selectedProduct, boardsNeeded);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Calculator size={24} className="text-amber-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Калькулятор террасной доски</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Введите размеры вашей площадки, выберите тип доски, и мы рассчитаем необходимое количество материалов.
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Ширина площадки (см)"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Например: 300"
            fullWidth
            min="1"
          />
          
          <Input
            label="Длина площадки (см)"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Например: 500"
            fullWidth
            min="1"
          />
        </div>
        
        <Select
          label="Выберите тип доски"
          options={products.map(p => ({ value: p.id, label: `${p.name} (${p.dimensions.width}×${p.dimensions.length} мм)` }))}
          value={productId}
          onChange={setProductId}
          fullWidth
        />
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button 
            variant="primary" 
            onClick={handleCalculate}
            fullWidth
            disabled={!width || !length || !productId}
          >
            Рассчитать
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleReset}
            fullWidth
          >
            Сбросить
          </Button>
        </div>
      </div>
      
      {calculationDone && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Результаты расчета</h3>
          
          <div className="space-y-2 mb-4">
            <p className="flex justify-between">
              <span className="text-gray-600">Площадь:</span>
              <span className="font-medium">{area.toFixed(2)} м²</span>
            </p>
            
            <p className="flex justify-between">
              <span className="text-gray-600">Количество досок:</span>
              <span className="font-medium">{boardsNeeded} шт.</span>
            </p>
            
            <p className="flex justify-between text-lg">
              <span className="text-gray-800">Общая стоимость:</span>
              <span className="font-bold text-amber-600">{totalPrice.toLocaleString()} сом</span>
            </p>
          </div>
          
          <Button
            variant="primary"
            fullWidth
            leftIcon={<ShoppingCart size={18} />}
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeckingCalculator;