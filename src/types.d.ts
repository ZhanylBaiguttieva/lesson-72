

export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface DishesList {
  [id:string]: ApiDish;
}

export interface DishMutation {
  title: string;
  price: string;
  image: string;
}

export interface CartMeat {
  meat: Dish;
  amount: number;
}

export interface Order {
  [id: string]: number;
}

export interface ApiOrder {
  id: string;
  dishes: ApiDish[];
}

