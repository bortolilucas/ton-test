import { createContext } from 'react';
import type { ProductType } from '../../api';

export type CartItemType = {
  item: ProductType;
  qtd: number;
};

export type AddItemType = (item: ProductType) => void;

export type RemoveItemConfig = {
  ignoreQtd?: boolean;
};

export type RemoveItemType = (id: number, config?: RemoveItemConfig) => void;

export type CartContextType = {
  items: { [key: string]: CartItemType };
  itemsArray: CartItemType[];
  setItems: (items: { [key: string]: CartItemType }) => void;
  addItem: AddItemType;
  removeItem: RemoveItemType;
  qtdTotal: number;
};

export const CartContext = createContext<CartContextType>({
  items: {},
  itemsArray: [],
  setItems: () => {},
  addItem: () => {},
  removeItem: () => {},
  qtdTotal: 0,
});
