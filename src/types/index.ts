export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  pricePerSquareMeter: number;
  images: string[];
  dimensions: {
    width: number;
    length: number;
    thickness: number;
  };
  color: string;
  type: 'hollow' | 'solid';
  purpose: string[];
  inStock: boolean;
  isPopular: boolean;
  isNew: boolean;
  specifications: Record<string, string | number>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'cash' | 'card' | 'bank-transfer';
  deliveryMethod: 'courier' | 'pickup';
  comment?: string;
}

export type FilterOptions = {
  dimensions?: {
    width?: number[];
    length?: number[];
  };
  colors?: string[];
  types?: ('hollow' | 'solid')[];
  purposes?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
};

export type SortOption = 'price-asc' | 'price-desc' | 'popularity' | 'newest';