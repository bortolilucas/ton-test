import React, { useState } from 'react';
import { Alert, FlatListProps, TextInput } from 'react-native';
import ProductsListScreen from '..';
import * as Api from '../../../../api';
import SearchProductInput from '../../../../components/products/SearchProductInput';
import TestSafeAreaProvider from '../../../../components/testing/TestSafeAreaProvider';
import {
  emptyProductsResponse,
  evenProductsResponse,
  firstProductsPageResponse,
  oddProductsResponse,
  secondProductsPageResponse,
} from '../../../../dto/products';
import { act, fireEvent, render } from '../../../../helpers/testing';

jest.mock('../../../../api');

jest.mock('../../../../components/products/SearchProductInput', () =>
  jest.fn().mockReturnValue(null),
);

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

afterEach(() => {
  (Api.fetchProducts as jest.Mock).mockClear();
});

describe('ProductsListScreen', () => {
  describe('Fetching products fails', () => {
    test('should show error message', async () => {
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
    describe('Items are not empty', () => {
      test('should render list when products length is an odd number', async () => {
        await testFetchProductsResolved({
          response: oddProductsResponse,
          textToLookFor: 'Adicione itens ao carrinho',
          listLength: 2,
        });
      });

      test('should render list when products length is an even number', async () => {
        await testFetchProductsResolved({
          response: evenProductsResponse,
          textToLookFor: 'Adicione itens ao carrinho',
          listLength: 4,
        });
      });

      test('should search and render items', async () => {
        (Api.fetchProducts as jest.Mock)
          .mockResolvedValueOnce(evenProductsResponse)
          .mockResolvedValueOnce(oddProductsResponse);

        const wrapper = render(<ProductsListScreen />, {
          wrapper: TestSafeAreaProvider,
        });

        (SearchProductInput as jest.Mock).mockImplementationOnce(
          ({ onSubmit }) => {
            const [value, setValue] = useState('');

            return (
              <TextInput
                placeholder="Pesquisar..."
                onChangeText={setValue}
                onSubmitEditing={() => onSubmit(value)}
                value={value}
              />
            );
          },
        );

        const list = await wrapper.findByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(4);

        const input = wrapper.getByPlaceholderText('Pesquisar...');

        await act(async () => fireEvent(input, 'onSubmitEditing'));

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);
      });
    });

    describe('Item are empty', () => {
      test('should render list properly', async () => {
        await testFetchProductsResolved({
          response: emptyProductsResponse,
          textToLookFor: 'Nenhum item encontrado',
          listLength: 0,
        });
      });
    });

    describe('Pagination', () => {
      test('should fetch next products when it reaches the end of list', async () => {
        let mockSecondPageResolve!: (
          res: Api.FetchProductsResponseType,
        ) => void;

        const fetchProductsMock = (Api.fetchProducts as jest.Mock)
          .mockResolvedValueOnce(firstProductsPageResponse)
          .mockImplementationOnce(
            () => new Promise(resolve => (mockSecondPageResolve = resolve)),
          );

        const wrapper = render(<ProductsListScreen />, {
          wrapper: TestSafeAreaProvider,
        });

        const list = await wrapper.findByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);

        fireEvent(list, 'onEndReached');

        wrapper.getByTestId('loading-page-indicator');

        await act(async () =>
          mockSecondPageResolve(secondProductsPageResponse),
        );

        expect(wrapper.queryByTestId('loading-page-indicator')).toBeNull();

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(4);

        fireEvent(list, 'onEndReached');

        expect(fetchProductsMock).toHaveBeenCalledTimes(2);
      });

      test('should refresh list', async () => {
        let refreshResolve!: (res: Api.FetchProductsResponseType) => void;

        (Api.fetchProducts as jest.Mock)
          .mockResolvedValueOnce(firstProductsPageResponse)
          .mockResolvedValueOnce(secondProductsPageResponse)
          .mockImplementationOnce(
            () => new Promise(resolve => (refreshResolve = resolve)),
          );

        const wrapper = render(<ProductsListScreen />, {
          wrapper: TestSafeAreaProvider,
        });

        const list = await wrapper.findByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);

        await act(async () => fireEvent(list, 'onEndReached'));

        fireEvent(list, 'onRefresh');

        expect(
          (list.props as FlatListProps<Api.ProductType>).refreshing,
        ).toBeTruthy();

        await act(async () => refreshResolve(firstProductsPageResponse));

        expect(
          (list.props as FlatListProps<Api.ProductType>).refreshing,
        ).toBeFalsy();

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);
      });
    });
  });
});
