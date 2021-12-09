import { render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import App from '../App';
import AppStatusBar from '../components/common/AppStatusBar';
import RootStack from '../components/navigation/RootStack';
import CartProvider from '../contexts/CartContext/provider';

jest.mock('../contexts/CartContext/provider.tsx', () => jest.fn());

jest.mock('../components/common/AppStatusBar', () => jest.fn());

jest.mock('../components/navigation/RootStack', () => jest.fn());

describe('App', () => {
  test('Should render cart provider', () => {
    (CartProvider as jest.Mock).mockReturnValueOnce(
      <View testID="mock-cart-provider" />,
    );

    const { getByTestId } = render(<App />);

    getByTestId('mock-cart-provider');
  });

  describe('Cart provider children', () => {
    beforeEach(() => {
      (CartProvider as jest.Mock).mockImplementationOnce(
        ({ children }) => children,
      );

      (RootStack as jest.Mock).mockReturnValueOnce(
        <View testID="mock-root-stack" />,
      );

      (AppStatusBar as jest.Mock).mockReturnValueOnce(
        <View testID="mock-status-bar" />,
      );
    });

    test('Should render status bar', () => {
      const { getByTestId } = render(<App />);

      getByTestId('mock-status-bar');
    });

    test('Should render root stack', () => {
      const { getByTestId } = render(<App />);

      getByTestId('mock-root-stack');
    });
  });
});
