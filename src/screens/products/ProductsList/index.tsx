import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Alert, FlatList, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type {
  FetchProductsParamsType,
  FetchProductsResponseType,
  ProductType,
} from '../../../api';
import * as Api from '../../../api';
import ProductListItem from '../../../components/products/ProductListItem';
import ProductsSearchInput from '../../../components/products/ProductsSearchInput';
import { Colors } from '../../../constants/colors';
import { isOdd } from '../../../helpers/util';
import useLoading from '../../../hooks/useLoading';
import styles from './styles';

type FetchDataMode = 'pagination' | 'refresh' | undefined;

const ProductsList = () => {
  const { setLoading } = useLoading();
  const { bottom } = useSafeAreaInsets();
  const [data, setData] = useState<FetchProductsResponseType>({});
  const [loadingPage, setLoadingPage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fetching = useRef(false);

  const derivedProducts = useMemo(() => {
    if (!data.products) {
      return [];
    }

    return isOdd(data.products.length)
      ? data.products.concat({ id: -1, title: '', price: 0, empty: true })
      : data.products;
  }, [data.products]);

  const updateLoading = useCallback(
    (value: boolean, mode?: FetchDataMode) => {
      mode === 'pagination'
        ? setLoadingPage(value)
        : mode === 'refresh'
        ? setRefreshing(value)
        : setLoading(value);

      fetching.current = value;
    },
    [setLoading],
  );

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
      { page = 1, limit = 10 }: Partial<FetchProductsParamsType> = {},
      mode?: FetchDataMode,
    ) => {
      if (fetching.current) {
        return;
      }

      try {
        updateLoading(true, mode);

        const response = await Api.fetchProducts({ page, limit });

        updateData(response, mode);
      } catch (error: any) {
        Alert.alert('Erro', error);
      } finally {
        updateLoading(false, mode);
      }
    },
    [updateLoading],
  );

  const onEndReached = () => {
    if (!data.next) {
      return;
    }

    fetchData({ page: data.next }, 'pagination');
  };

  const onRefresh = () => fetchData({}, 'refresh');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <FlatList
      numColumns={2}
      keyExtractor={keyExtractor}
      data={derivedProducts}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={[
        styles.flatListContent,
        { paddingBottom: bottom },
      ]}
      ListHeaderComponent={
        <>
          <ProductsSearchInput />
          <Text style={styles.title}>Adicione itens ao carrinho</Text>
        </>
      }
      renderItem={({ item }) => <ProductListItem item={item} />}
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

export default ProductsList;
