import type { Name } from './Language';

export type Product = {
  id: number;
  brand: Brand;
  price: number;
  stock: number | string;
  color: string;
  size: Array<SizeEnum | number>;
  name: Name;
  images?: string[];
  categories: string[];
  variant?: Variant[];
};

export enum Brand {
  JACKJONES = 'Jack & Jones',
  JJXX = 'JJXX',
  VEROMODA = 'Vero Moda',
}

export type SizeEnum = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Variant = {
  name: string;
  color: string;
  size: Array<SizeEnum | number>;
  images?: string[];
  stock: number | string;
};
