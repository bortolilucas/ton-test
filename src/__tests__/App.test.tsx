import { render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import App from '../App';
import AppStatusBar from '../components/common/AppStatusBar';
import RootStack from '../components/navigation/RootStack';
import { Colors } from '../constants/colors';
import CartProvider from '../contexts/CartContext/provider';

jest.mock('../components/navigation/RootStack', () =>
  jest.fn().mockReturnValue(null),
);

jest.mock('../components/common/AppStatusBar', () =>
  jest.fn().mockReturnValue(null),
);

jest.mock('../contexts/CartContext/provider', () =>
  jest.fn().mockReturnValue(null),
);

describe('App', () => {
  test('should render cart provider', () => {
    (CartProvider as jest.Mock).mockImplementationOnce(({ children }) => (
      <View testID="mock-cart-provider">{children}</View>
    ));

    const wrapper = render(<App />);

    wrapper.getByTestId('mock-cart-provider');
  });

  test('should render root stack', () => {
    (CartProvider as jest.Mock).mockImplementationOnce(
      ({ children }) => children,
    );

    (RootStack as jest.Mock).mockReturnValueOnce(
      <View testID="mock-root-stack" />,
    );

    const wrapper = render(<App />);

    wrapper.getByTestId('mock-root-stack');
  });

  test('should render status bar with correct props', () => {
    (CartProvider as jest.Mock).mockImplementationOnce(
      ({ children }) => children,
    );

    let statusBarProps!: object;

    (AppStatusBar as jest.Mock).mockImplementationOnce(props => {
      statusBarProps = props;
      return <View testID="mock-status-bar" />;
    });

    const wrapper = render(<App />);

    wrapper.getByTestId('mock-status-bar');

    expect(statusBarProps).toEqual({
      translucent: true,
      backgroundColor: Colors.TRANSPARENT,
      barStyle: 'dark-content',
    });
  });
});
