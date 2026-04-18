export interface Product {
  id: number;
  name: string;
  category: 'vegetable' | 'fruit' | 'leafy' | 'flower';
  price: number;
  originalPrice?: number;
  discount?: number;

  unit: 'kg' | 'gm' | 'piece' | 'dozen' | 'bunch';
  quantityLabel: string; // UI display (250g, 1 dozen etc.)

  image: string;

  inStock: boolean;
  available: boolean;

  rating?: number;
}