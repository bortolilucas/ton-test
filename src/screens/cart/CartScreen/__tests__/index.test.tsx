import React from 'react';
import type { FlatListProps } from 'react-native';
import CartScreen from '..';
import { CartMockData } from '../../../../constants/testing/cart';
import type { CartItemType } from '../../../../contexts/CartContext';
import { render } from '../../../../helpers/testing';

describe('CartScreen', () => {
  test('should render no item', () => {
    const wrapper = render(<CartScreen />);

    const list = wrapper.getByTestId('cart-list');

    expect((list.props as FlatListProps<CartItemType>).data).toHaveLength(0);
  });

  test('should render items', async () => {
    const wrapper = render(<CartScreen />, {
      cartProviderProps: { defaultItems: CartMockData.items },
    });

    const list = await wrapper.findByTestId('cart-list');

    expect((list.props as FlatListProps<CartItemType>).data).toHaveLength(1);
  });
});
