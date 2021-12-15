import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import CartItem from '..';
import { CartMockData } from '../../../../constants/testing/cart';
import { formatCurrency } from '../../../../helpers/currency';

describe('Cart Item', () => {
  test('should call addItem', async () => {
    const addItemMock = jest.fn();

    const wrapper = render(
      <CartItem
        item={CartMockData.baseItem}
        addItem={addItemMock}
        removeItem={jest.fn()}
      />,
    );

    const addButton = wrapper.getByTestId('plus-button');

    fireEvent.press(addButton);

    expect(addItemMock).toHaveBeenCalledWith(CartMockData.baseItem.item);
  });

  test('should call removeItem', () => {
    const removeItemMock = jest.fn();

    const wrapper = render(
      <CartItem
        item={CartMockData.baseItem}
        addItem={jest.fn()}
        removeItem={removeItemMock}
      />,
    );

    const minusButton = wrapper.getByTestId('minus-button');

    fireEvent.press(minusButton);

    expect(removeItemMock).toHaveBeenCalledWith(CartMockData.baseItem.item.id);
  });

  test('should call delete item', () => {
    const removeItemMock = jest.fn();

    const wrapper = render(
      <CartItem
        item={CartMockData.baseItem}
        addItem={jest.fn()}
        removeItem={removeItemMock}
      />,
    );

    const deleteButton = wrapper.getByTestId('delete-button');

    fireEvent.press(deleteButton);

    expect(removeItemMock).toHaveBeenCalledWith(CartMockData.baseItem.item.id, {
      ignoreQtd: true,
    });
  });

  test('should render properly', () => {
    const wrapper = render(
      <CartItem
        item={CartMockData.baseItem}
        addItem={jest.fn()}
        removeItem={jest.fn()}
      />,
    );

    wrapper.getByTestId('cart-product-image');
    wrapper.getByText(CartMockData.baseItem.item.title);
    wrapper.getByText(formatCurrency(CartMockData.baseItem.item.price));
    wrapper.getByText(CartMockData.baseItem.qtd.toString());
  });
});
