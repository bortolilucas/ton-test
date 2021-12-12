import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ProductListItem from '..';
import { mockProductEmpty, mockProductItem } from '../../../../dto/products';

describe('ProductListItem', () => {
  test('should render empty view', () => {
    const wrapper = render(
      <ProductListItem
        item={mockProductEmpty}
        addItem={jest.fn()}
        removeItem={jest.fn()}
      />,
    );

    wrapper.getByTestId('empty-view');
  });

  describe('With no qtd', () => {
    test('should render properly', () => {
      const wrapper = render(
        <ProductListItem
          item={mockProductItem}
          addItem={jest.fn()}
          removeItem={jest.fn()}
        />,
      );

      wrapper.getByTestId('product-image');
      wrapper.getByText('Mock Title');
      wrapper.getByText('R$ 200,00');
      wrapper.getByText('Adicionar');
    });

    test('should call addItem', async () => {
      const addItemMock = jest.fn();

      const wrapper = render(
        <ProductListItem
          item={mockProductItem}
          addItem={addItemMock}
          removeItem={jest.fn()}
        />,
      );

      const addButton = wrapper.getByTestId('add-button');

      fireEvent.press(addButton);

      expect(addItemMock).toHaveBeenCalledWith(mockProductItem);
    });
  });

  describe('With qtd', () => {
    test('should render properly with qtd', () => {
      const wrapper = render(
        <ProductListItem
          item={mockProductItem}
          addItem={jest.fn()}
          removeItem={jest.fn()}
          qtd={5}
        />,
      );

      wrapper.getByTestId('minus-button');
      wrapper.getByTestId('plus-button');
      wrapper.getByText('5');
    });

    test('should call addItem', () => {
      const addItemMock = jest.fn();

      const wrapper = render(
        <ProductListItem
          item={mockProductItem}
          addItem={addItemMock}
          removeItem={jest.fn()}
          qtd={2}
        />,
      );

      const plusButton = wrapper.getByTestId('plus-button');

      fireEvent.press(plusButton);

      expect(addItemMock).toHaveBeenCalledWith(mockProductItem);
    });

    test('should call removeItem', () => {
      const removeItemMock = jest.fn();

      const wrapper = render(
        <ProductListItem
          item={mockProductItem}
          addItem={jest.fn()}
          removeItem={removeItemMock}
          qtd={2}
        />,
      );

      const minusButton = wrapper.getByTestId('minus-button');

      fireEvent.press(minusButton);

      expect(removeItemMock).toHaveBeenCalledWith(mockProductItem.id);
    });
  });
});
