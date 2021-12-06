import { createContext } from 'react';
import type { ProductType } from '../../api';

export type CartItemType = {
  item: ProductType;
  qtd: number;
};

export type AddItemType = (item: ProductType) => void;

export type RemoveItemType = (id: number) => void;

export type CartContextType = {
  items: Map<number, CartItemType>;
  setItems: (items: Map<number, CartItemType>) => void;
  addItem: AddItemType;
  removeItem: RemoveItemType;
};

export const CartContext = createContext<CartContextType>({
  items: new Map(),
  setItems: () => {},
  addItem: () => {},
  removeItem: () => {},
});
