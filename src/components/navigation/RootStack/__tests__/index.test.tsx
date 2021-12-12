import { render } from '@testing-library/react-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import RootStack from '..';
import CartScreen from '../../../../screens/cart/CartScreen';
import ProductsListScreen from '../../../../screens/products/ProductsListScreen';

jest.mock('../../../../screens/products/ProductsListScreen', () => jest.fn());

jest.mock('../../../../screens/cart/CartScreen', () => jest.fn());

describe('RootStack', () => {
  test('should render products list screen as initial route', async () => {
    (ProductsListScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-products-list-screen" />,
    );

    const wrapper = render(<RootStack />);

    return wrapper.findByTestId('mock-products-list-screen');
  });

  test('should render cart screen in the cart route', async () => {
    (ProductsListScreen as jest.Mock).mockImplementationOnce(
      ({ navigation }) => {
        useEffect(() => {
          navigation.navigate('Cart');
        }, [navigation]);

        return null;
      },
    );

    (CartScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-cart-screen" />,
    );

    const wrapper = render(<RootStack />);

    return wrapper.findByTestId('mock-cart-screen');
  });
});
