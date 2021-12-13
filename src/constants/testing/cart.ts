import type { CartItemsState } from '../../contexts/CartContext/provider';
import { makeMockProduct } from './products';

export const CartMockData = {
  items: {
    1: {
      item: makeMockProduct(1),
      qtd: 2,
    },
  } as CartItemsState,
};
