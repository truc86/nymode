import type { Name } from './Language';

export type Category = {
  id: string;
  parent_category_id: string;
  level: number;
  name: Name;
  categories: Category[];
};
