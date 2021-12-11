import { act, render } from '@testing-library/react-native';
import React from 'react';
import { Alert, FlatListProps } from 'react-native';
import ProductsListScreen from '..';
import * as Api from '../../../../api';
import TestSafeAreaProvider from '../../../../components/tests/TestSafeAreaProvider';

jest.mock('../../../../api');

type TestFetchProductsResolved = {
  response: Api.FetchProductsResponseType;
  textToLookFor: string;
  listLength: number;
};

const testFetchProductsResolved = async ({
  response,
  textToLookFor,
  listLength,
}: TestFetchProductsResolved) => {
  let mockResolve!: (res: Api.FetchProductsResponseType) => void;

  (Api.fetchProducts as jest.Mock).mockImplementationOnce(
    () => new Promise(resolve => (mockResolve = resolve)),
  );

  const wrapper = render(<ProductsListScreen />, {
    wrapper: TestSafeAreaProvider,
  });

  await wrapper.findByTestId('loading-indicator');

  await act(async () => mockResolve(response));

  expect(wrapper.queryByTestId('loading-indicator')).toBeNull();

  wrapper.getByText(textToLookFor);

  const list = wrapper.getByTestId('products-list');

  expect((list.props as FlatListProps<Api.ProductType>).data).toHaveLength(
    listLength,
  );
};

describe('ProductsListScreen', () => {
  describe('Fetching products succeeds', () => {
    test('Should render list when products length is an odd number', async () => {
      const response: Api.FetchProductsResponseType = {
        products: [
          {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
        ],
        current: 1,
      };

      await testFetchProductsResolved({
        response,
        textToLookFor: 'Adicione itens ao carrinho',
        listLength: 2,
      });
    });

    test('Should render list when products length is an even number', async () => {
      const response: Api.FetchProductsResponseType = {
        products: [
          {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
          {
            id: 2,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
        ],
        current: 1,
      };

      await testFetchProductsResolved({
        response,
        textToLookFor: 'Adicione itens ao carrinho',
        listLength: 2,
      });
    });

    test('Should render list when products are empty', async () => {
      const response: Api.FetchProductsResponseType = {
        products: [],
        current: 1,
      };

      await testFetchProductsResolved({
        response,
        textToLookFor: 'Nenhum item encontrado',
        listLength: 0,
      });
    });
  });

  describe('Fetching products fails', () => {
    test('Should show error message', async () => {
      let mockReject!: (error: any) => void;

      (Api.fetchProducts as jest.Mock).mockImplementationOnce(
        () => new Promise((_, reject) => (mockReject = reject)),
      );

      const error = 'Request failed';

      const alertSpy = jest.spyOn(Alert, 'alert');

      const { findByTestId, queryByTestId } = render(<ProductsListScreen />, {
        wrapper: TestSafeAreaProvider,
      });

      await findByTestId('loading-indicator');

      await act(async () => mockReject(new Error(error)));

      expect(queryByTestId('loading-indicator')).toBeNull();

      expect(alertSpy).toHaveBeenCalledWith('Erro', error);
    });
  });
});
