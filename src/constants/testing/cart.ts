import type { CartItemType } from '../../contexts/CartContext';
import type { CartItemsState } from '../../contexts/CartContext/provider';
import { makeMockProduct } from './products';

export const makeCartItem = (id: number, qtd: number): CartItemType => ({
  item: makeMockProduct(id),
  qtd,
});

export const CartMockData = {
  defaultItems: {
    1: makeCartItem(1, 2),
    2: makeCartItem(2, 2),
  } as CartItemsState,
};
