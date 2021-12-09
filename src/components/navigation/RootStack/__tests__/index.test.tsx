import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RootStack from '..';

describe('RootStack', () => {
  test('Should render products list screen as initial route', async () => {
    const { getByTestId } = render(<RootStack />);

    await waitFor(() => {
      getByTestId('products-list-screen');
    });
  });

  test('Should render cart screen in the cart route', async () => {
    const { getByTestId } = render(<RootStack initialRouteName="Cart" />);

    await waitFor(() => {
      getByTestId('cart-screen');
    });
  });
});
