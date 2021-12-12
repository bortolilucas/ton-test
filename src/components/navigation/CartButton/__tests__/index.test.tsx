import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import CartButton from '..';

describe('CartButton', () => {
  test('should cart button navigate to cart screen when pressed', () => {
    const navigateMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: navigateMock,
    });

    const wrapper = render(<CartButton />);

    const button = wrapper.getByTestId('cart-button');

    fireEvent.press(button);

    expect(navigateMock).toHaveBeenCalledWith('Cart');
  });
});
