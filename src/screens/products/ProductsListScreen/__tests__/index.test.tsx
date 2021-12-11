import { act, fireEvent, render } from '@testing-library/react-native';
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

beforeEach(() => {
  (Api.fetchProducts as jest.Mock).mockClear();
});

describe('ProductsListScreen', () => {
  describe('Fetching products fails', () => {
    test('Should show error message', async () => {
      let mockReject!: (error: any) => void;

      (Api.fetchProducts as jest.Mock).mockImplementationOnce(
        () => new Promise((_, reject) => (mockReject = reject)),
      );

      const error = 'Request failed';

      const alertSpy = jest.spyOn(Alert, 'alert');

      const wrapper = render(<ProductsListScreen />, {
        wrapper: TestSafeAreaProvider,
      });

      await wrapper.findByTestId('loading-indicator');

      await act(async () => mockReject(new Error(error)));

      expect(wrapper.queryByTestId('loading-indicator')).toBeNull();

      expect(alertSpy).toHaveBeenCalledWith('Erro', error);
    });
  });

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

    test('Should fetch next products when it reaches the end of list', async () => {
      const firstPageResponse: Api.FetchProductsResponseType = {
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
        next: 2,
      };

      const secondPageResponse: Api.FetchProductsResponseType = {
        products: [
          {
            id: 3,
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
            id: 4,
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
        current: 2,
      };

      let mockSecondPageResolve!: (res: Api.FetchProductsResponseType) => void;

      const fetchProductsMock = (Api.fetchProducts as jest.Mock)
        .mockResolvedValueOnce(firstPageResponse)
        .mockImplementationOnce(
          () => new Promise(resolve => (mockSecondPageResolve = resolve)),
        );

      const wrapper = render(<ProductsListScreen />, {
        wrapper: TestSafeAreaProvider,
      });

      const list = await wrapper.findByTestId('products-list');

      expect((list.props as FlatListProps<Api.ProductType>).data).toHaveLength(
        2,
      );

      fireEvent(list, 'onEndReached');

      wrapper.getByTestId('loading-page-indicator');

      await act(async () => mockSecondPageResolve(secondPageResponse));

      expect(wrapper.queryByTestId('loading-page-indicator')).toBeNull();

      expect((list.props as FlatListProps<Api.ProductType>).data).toHaveLength(
        4,
      );

      fireEvent(list, 'onEndReached');

      expect(fetchProductsMock).toHaveBeenCalledTimes(2);
    });
  });
});
