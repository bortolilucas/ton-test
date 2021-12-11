import { act, render } from '@testing-library/react-native';
import React from 'react';
import ProductsListScreen from '..';
import * as Api from '../../../../api';
import TestSafeAreaProvider from '../../../../components/tests/TestSafeAreaProvider';

jest.mock('../../../../api');

const testFetchProductsResolved = async (options: {
  response: Api.FetchProductsResponseType;
  textToTest: string;
}) => {
  let mockResolve!: (res: Api.FetchProductsResponseType) => void;

  (Api.fetchProducts as jest.Mock).mockImplementationOnce(
    () => new Promise(resolve => (mockResolve = resolve)),
  );

  const { findByTestId, queryByTestId, getByText } = render(
    <ProductsListScreen />,
    { wrapper: TestSafeAreaProvider },
  );

  await findByTestId('loading-indicator');

  await act(async () => mockResolve(options.response));

  expect(queryByTestId('loading-indicator')).toBeNull();

  getByText(options.textToTest);
};

describe('ProductsListScreen', () => {
  describe('Fetching products succeeds', () => {
    test('Should render list when products are not empty', async () => {
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
        textToTest: 'Adicione itens ao carrinho',
      });
    });

    test('Should render list when products are empty', async () => {
      const response: Api.FetchProductsResponseType = {
        products: [],
        current: 1,
      };

      await testFetchProductsResolved({
        response,
        textToTest: 'Nenhum item encontrado',
      });
    });
  });
});
