
export enum PhotoStyle {
  RUSTIC = 'Rustic/Dark',
  MODERN = 'Bright/Modern',
  SOCIAL = 'Social Media',
}

export interface Dish {
  name: string;
  description: string;
}

export interface DishWithImage extends Dish {
  id: string;
  imageUrl?: string;
  isLoading: boolean;
}
