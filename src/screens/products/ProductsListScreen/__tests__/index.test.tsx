import React from 'react';
import { Alert, FlatListProps } from 'react-native';
import ProductsListScreen from '..';
import * as Api from '../../../../api';
import TestSafeAreaProvider from '../../../../components/testing/TestSafeAreaProvider';
import { ProductsMockData } from '../../../../constants/testing/products';
import { act, fireEvent, render } from '../../../../helpers/testing';

jest.mock('../../../../api');

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
        let mockResolve!: (res: Api.FetchProductsResponseType) => void;

        (Api.fetchProducts as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => (mockResolve = resolve)),
        );

        const wrapper = render(<ProductsListScreen />);

        await wrapper.findByTestId('loading-indicator');

        await act(async () => mockResolve(ProductsMockData.oddLengthResponse));

        expect(wrapper.queryByTestId('loading-indicator')).toBeNull();

        wrapper.getByText('Adicione itens ao carrinho');

        const list = wrapper.getByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);
      });

      test('should render list when products length is an even number', async () => {
        let mockResolve!: (res: Api.FetchProductsResponseType) => void;

        (Api.fetchProducts as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => (mockResolve = resolve)),
        );

        const wrapper = render(<ProductsListScreen />);

        await wrapper.findByTestId('loading-indicator');

        await act(async () => mockResolve(ProductsMockData.evenLengthResponse));

        expect(wrapper.queryByTestId('loading-indicator')).toBeNull();

        wrapper.getByText('Adicione itens ao carrinho');

        const list = wrapper.getByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(4);
      });

      test('should search and render items', async () => {
        let searchText!: string;

        (Api.fetchProducts as jest.Mock)
          .mockResolvedValueOnce(ProductsMockData.evenLengthResponse)
          .mockImplementationOnce(data => {
            searchText = data.search;

            return Promise.resolve(ProductsMockData.oddLengthResponse);
          });

        const wrapper = render(<ProductsListScreen />);

        const input = await wrapper.findByPlaceholderText('Pesquisar...');

        const list = wrapper.getByTestId('products-list');

        fireEvent.changeText(input, 'search text');

        await act(async () => fireEvent(input, 'onSubmitEditing'));

        expect(searchText).toMatch('search text');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);
      });
    });

    describe('Item are empty', () => {
      test('should render empty list', async () => {
        let mockResolve!: (res: Api.FetchProductsResponseType) => void;

        (Api.fetchProducts as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => (mockResolve = resolve)),
        );

        const wrapper = render(<ProductsListScreen />);

        await wrapper.findByTestId('loading-indicator');

        await act(async () => mockResolve(ProductsMockData.emptyResponse));

        expect(wrapper.queryByTestId('loading-indicator')).toBeNull();

        wrapper.getByText('Nenhum item encontrado');

        const list = wrapper.getByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(0);
      });
    });

    describe('Pagination', () => {
      test('should fetch next products when it reaches the end of list', async () => {
        let mockSecondPageResolve!: (
          res: Api.FetchProductsResponseType,
        ) => void;

        const fetchProductsMock = (Api.fetchProducts as jest.Mock)
          .mockResolvedValueOnce(ProductsMockData.firstPageResponse)
          .mockImplementationOnce(
            () => new Promise(resolve => (mockSecondPageResolve = resolve)),
          );

        const wrapper = render(<ProductsListScreen />);

        const list = await wrapper.findByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);

        fireEvent(list, 'onEndReached');

        wrapper.getByTestId('loading-page-indicator');

        await act(async () =>
          mockSecondPageResolve(ProductsMockData.secondPageResponse),
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
          .mockResolvedValueOnce(ProductsMockData.firstPageResponse)
          .mockResolvedValueOnce(ProductsMockData.secondPageResponse)
          .mockImplementationOnce(
            () => new Promise(resolve => (refreshResolve = resolve)),
          );

        const wrapper = render(<ProductsListScreen />);

        const list = await wrapper.findByTestId('products-list');

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);

        await act(async () => fireEvent(list, 'onEndReached'));

        fireEvent(list, 'onRefresh');

        expect(
          (list.props as FlatListProps<Api.ProductType>).refreshing,
        ).toBeTruthy();

        await act(async () =>
          refreshResolve(ProductsMockData.firstPageResponse),
        );

        expect(
          (list.props as FlatListProps<Api.ProductType>).refreshing,
        ).toBeFalsy();

        expect(
          (list.props as FlatListProps<Api.ProductType>).data,
        ).toHaveLength(2);
      });
    });
  });

  describe('Cart', () => {
    test('should add item to cart', async () => {
      (Api.fetchProducts as jest.Mock).mockResolvedValueOnce(
        ProductsMockData.evenLengthResponse,
      );

      const wrapper = render(<ProductsListScreen />);

      const [firstAddButton] = await wrapper.findAllByTestId('add-button');

      await act(async () => fireEvent.press(firstAddButton));

      const [firstQtdText] = wrapper.getAllByText('1');

      expect(firstQtdText).toBeDefined();
    });

    test('should increse item qtd', async () => {
      (Api.fetchProducts as jest.Mock).mockResolvedValueOnce(
        ProductsMockData.evenLengthResponse,
      );

      const [firstProduct] = ProductsMockData.evenLengthResponse.products!;

      const wrapper = render(<ProductsListScreen />, {
        cartProviderProps: {
          defaultItems: {
            [firstProduct.id]: {
              item: firstProduct,
              qtd: 1,
            },
          },
        },
      });

      const [firstPlusButton] = await wrapper.findAllByTestId('plus-button');

      await act(async () => fireEvent.press(firstPlusButton));

      const [firstQtdText] = wrapper.getAllByText('2');

      expect(firstQtdText).toBeDefined();
    });

    test('should decrease item qtd', async () => {
      (Api.fetchProducts as jest.Mock).mockResolvedValueOnce(
        ProductsMockData.evenLengthResponse,
      );

      const [firstProduct] = ProductsMockData.evenLengthResponse.products!;

      const wrapper = render(<ProductsListScreen />, {
        cartProviderProps: {
          defaultItems: {
            [firstProduct.id]: {
              item: firstProduct,
              qtd: 2,
            },
          },
        },
      });

      const [firstMinusButton] = await wrapper.findAllByTestId('minus-button');

      await act(async () => fireEvent.press(firstMinusButton));

      const [firstQtdText] = wrapper.getAllByText('1');

      expect(firstQtdText).toBeDefined();
    });

    test('should remove item from cart', async () => {
      (Api.fetchProducts as jest.Mock).mockResolvedValueOnce(
        ProductsMockData.evenLengthResponse,
      );

      const [firstProduct] = ProductsMockData.evenLengthResponse.products!;

      const wrapper = render(<ProductsListScreen />, {
        cartProviderProps: {
          defaultItems: {
            [firstProduct.id]: {
              item: firstProduct,
              qtd: 1,
            },
          },
        },
      });

      const [firstMinusButton] = await wrapper.findAllByTestId('minus-button');

      await act(async () => fireEvent.press(firstMinusButton));

      const [firstAddButton] = wrapper.getAllByTestId('add-button');

      expect(firstAddButton).toBeDefined();
    });
  });
});
