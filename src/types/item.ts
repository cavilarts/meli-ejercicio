export type ItemsSearchResponse = {
  author: Author;
  categories: string[];
  items: Item[];
};

export type Author = {
  name: string;
  lastname: string;
};

export type Item = {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
};

export type ItemExtra = Item & {
  sold_quantity: number;
  description: string;
  pictures: ItenImage[];
  category: string;
};

export type ItenImage = {
  url: string;
  size: string;
  max_size: string;
};

export type Price = {
  currency: string;
  amount: number;
  decimals: number;
};

export type ItemDetails = {
  author: Author;
  item: ItemExtra;
};
