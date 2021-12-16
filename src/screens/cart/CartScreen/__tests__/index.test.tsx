import React from 'react';
import type { FlatListProps } from 'react-native';
import CartScreen from '..';
import { CartMockData, makeCartItem } from '../../../../constants/testing/cart';
import type { CartItemType } from '../../../../contexts/CartContext';
import type { CartItemsState } from '../../../../contexts/CartContext/provider';
import { render, fireEvent, act } from '../../../../helpers/testing';

describe('CartScreen', () => {
  test('should render no item', () => {
    const wrapper = render(<CartScreen />);

    const list = wrapper.getByTestId('cart-list');

    wrapper.getByText('Nenhum produto adicionado');

    expect((list.props as FlatListProps<CartItemType>).data).toHaveLength(0);
  });

  test('should render items', async () => {
    const wrapper = render(<CartScreen />, {
      cartProviderProps: { defaultItems: CartMockData.defaultItems },
    });

    const list = await wrapper.findByTestId('cart-list');

    wrapper.getByText('4 produtos adicionados');

    expect((list.props as FlatListProps<CartItemType>).data).toHaveLength(2);
  });

  test('should remove item', async () => {
    const wrapper = render(<CartScreen />, {
      cartProviderProps: { defaultItems: CartMockData.defaultItems },
    });

    const list = await wrapper.findByTestId('cart-list');

    const deleteButton = wrapper.getAllByTestId('delete-button')[1];

    await act(async () => fireEvent.press(deleteButton));

    wrapper.getByText('2 produtos adicionados');

    const newData = Object.values(CartMockData.defaultItems).filter(
      ({ item }) => item.id !== CartMockData.defaultItems[2].item.id,
    );

    expect((list.props as FlatListProps<CartItemType>).data).toEqual(newData);
  });

  test('should add 1 to qtd', async () => {
    let items = CartMockData.defaultItems;

    const wrapper = render(<CartScreen />, {
      cartProviderProps: { defaultItems: items },
    });

    const list = await wrapper.findByTestId('cart-list');

    const plusButton = wrapper.getAllByTestId('plus-button')[1];

    await act(async () => fireEvent.press(plusButton));

    wrapper.getByText('5 produtos adicionados');

    const newData = Object.values(CartMockData.defaultItems).map(item =>
      item.item.id === CartMockData.defaultItems[2].item.id
        ? { ...item, qtd: item.qtd + 1 }
        : item,
    );

    expect((list.props as FlatListProps<CartItemType>).data).toEqual(newData);
  });

  test('should remove 1 from qtd when it is 2 or greater', async () => {
    let items = CartMockData.defaultItems;

    const wrapper = render(<CartScreen />, {
      cartProviderProps: { defaultItems: items },
    });

    const list = await wrapper.findByTestId('cart-list');

    const minusButton = wrapper.getAllByTestId('minus-button')[1];

    await act(async () => fireEvent.press(minusButton));

    wrapper.getByText('3 produtos adicionados');

    const newData = Object.values(CartMockData.defaultItems).map(item =>
      item.item.id === CartMockData.defaultItems[2].item.id
        ? { ...item, qtd: item.qtd - 1 }
        : item,
    );

    expect((list.props as FlatListProps<CartItemType>).data).toEqual(newData);
  });

  test('should remove item when qtd equals 1', async () => {
    let items: CartItemsState = {
      1: makeCartItem(1, 1),
      2: makeCartItem(2, 1),
    };

    const wrapper = render(<CartScreen />, {
      cartProviderProps: { defaultItems: items },
    });

    const list = await wrapper.findByTestId('cart-list');

    const minusButton = wrapper.getAllByTestId('minus-button')[1];

    await act(async () => fireEvent.press(minusButton));

    wrapper.getByText('1 produto adicionado');

    const newData = Object.values(items).filter(
      ({ item }) => item.id !== items[2].item.id,
    );

    expect((list.props as FlatListProps<CartItemType>).data).toEqual(newData);
  });
});
