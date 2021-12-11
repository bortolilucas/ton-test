import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RootStack from '..';
import ProductsListScreen from '../../../../screens/products/ProductsListScreen';
import { View } from 'react-native';
import CartScreen from '../../../../screens/cart/CartScreen';

jest.mock('../../../../screens/products/ProductsListScreen', () => jest.fn());

jest.mock('../../../../screens/cart/CartScreen', () => jest.fn());

describe('RootStack', () => {
  test('should render products list screen as initial route', async () => {
    (ProductsListScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-products-list-screen" />,
    );

    const { getByTestId } = render(<RootStack />);

    await waitFor(() => {
      getByTestId('mock-products-list-screen');
    });
  });

  test('should render cart screen in the cart route', async () => {
    (CartScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-cart-screen" />,
    );

    const { getByTestId } = render(<RootStack initialRouteName="Cart" />);

    await waitFor(() => {
      getByTestId('mock-cart-screen');
    });
  });
});
