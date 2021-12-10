import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type {
  FetchProductsParamsType,
  FetchProductsResponseType,
  ProductType,
} from '../../../api';
import * as Api from '../../../api';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import Title from '../../../components/common/Title';
import ProductListItem from '../../../components/products/ProductListItem';
import SearchProductInput from '../../../components/products/SearchProductInput';
import { Colors } from '../../../constants/colors';
import { isOdd } from '../../../helpers/util';
import useCart from '../../../hooks/useCart';
import styles from './styles';

type FetchDataMode = 'pagination' | 'refresh' | undefined;

const ProductsListScreen = () => {
  const { addItem, removeItem, items } = useCart();
  const { bottom } = useSafeAreaInsets();
  const [data, setData] = useState<FetchProductsResponseType>({});
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fetching = useRef(false);

  const derivedProducts = useMemo(() => {
    if (!data.products) {
      return [];
    }

    // Make sure each row has 2 items
    return isOdd(data.products.length)
      ? data.products.concat({ id: -1, title: '', price: 0, empty: true })
      : data.products;
  }, [data.products]);

  const updateLoading = (value: boolean, mode?: FetchDataMode) => {
    mode === 'pagination'
      ? setLoadingPage(value)
      : mode === 'refresh'
      ? setRefreshing(value)
      : setLoading(value);

    fetching.current = value;
  };

  const updateData = (
    response: FetchProductsResponseType,
    mode?: FetchDataMode,
  ) => {
    mode === 'pagination'
      ? setData(prev => ({
          ...response,
          products: (prev.products || []).concat(response.products || []),
        }))
      : setData(response);
  };

  const fetchData = useCallback(
    async (
      { page = 1, search }: Partial<FetchProductsParamsType> = {},
      mode?: FetchDataMode,
    ) => {
      if (fetching.current) {
        return;
      }

      try {
        updateLoading(true, mode);

        const response = await Api.fetchProducts({ page, search });

        updateData(response, mode);
      } catch (error: any) {
        Alert.alert('Erro', error);
      } finally {
        updateLoading(false, mode);
      }
    },
    [],
  );

  const onEndReached = () => {
    if (!data.next) {
      return;
    }

    fetchData({ page: data.next }, 'pagination');
  };

  const onRefresh = () => fetchData({}, 'refresh');

  const onSearchSubmit = (search: string) => fetchData({ search }, 'refresh');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      testID="products-list-screen"
      numColumns={2}
      keyExtractor={keyExtractor}
      data={derivedProducts}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={[
        styles.flatListContent,
        { paddingBottom: bottom + 15 },
      ]}
      ListHeaderComponent={
        <>
          <SearchProductInput onSubmit={onSearchSubmit} />
          <Title style={styles.title}>
            {derivedProducts.length === 0
              ? 'Nenhum item encontrado'
              : 'Adicione itens ao carrinho'}
          </Title>
        </>
      }
      renderItem={({ item }) => (
        <ProductListItem
          item={item}
          addItem={addItem}
          removeItem={removeItem}
          qtd={items[item.id]?.qtd}
        />
      )}
      ListFooterComponent={
        loadingPage ? (
          <ActivityIndicator
            size="large"
            color={Colors.TEXT}
            style={styles.activityIndicatorPage}
          />
        ) : null
      }
      initialNumToRender={8}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const keyExtractor = (product: ProductType) => product.id.toString();

export default ProductsListScreen;
