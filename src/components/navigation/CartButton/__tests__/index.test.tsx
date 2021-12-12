import { useNavigation } from '@react-navigation/native';
import React from 'react';
import CartButton from '..';
import { fireEvent, render, waitFor } from '../../../../helpers/testing';
import useCart from '../../../../hooks/useCart';

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

  test('should render cart qtd', async () => {
    (useCart as jest.Mock).mockReturnValueOnce({ qtdTotal: 1 });

    const wrapper = render(<CartButton />);

    return wrapper.findByText('1');
  });

  test('should not render cart qtd', async () => {
    (useCart as jest.Mock).mockReturnValueOnce({ qtdTotal: 0 });

    const wrapper = render(<CartButton />);

    await waitFor(() => {
      expect(wrapper.queryByTestId('0')).toBeNull();
      expect(wrapper.queryByTestId('qtd-indicator')).toBeNull();
    });
  });
});
