import type { Category } from './Category';
import type { Product } from './Product';
import type { PromotionalSpot } from './PromotionalSpot';

export type DataResponse = {
  products: Product[];
  promotionalSpots: PromotionalSpot[];
  categories: Category;
};
