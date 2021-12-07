import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Ionicons';
import type {
  FetchProductsParamsType,
  FetchProductsResponseType,
  ProductType,
} from '../../../api';
import * as Api from '../../../api';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import ProductListItem from '../../../components/products/ProductListItem';
import { Colors } from '../../../constants/colors';
import { withOpacityStyle } from '../../../helpers/ui';
import { isOdd } from '../../../helpers/util';
import useCart from '../../../hooks/useCart';
import styles from './styles';

type FetchDataMode = 'pagination' | 'refresh' | undefined;

const ProductsList = () => {
  const { addItem, removeItem, items } = useCart();
  const { bottom } = useSafeAreaInsets();
  const [data, setData] = useState<FetchProductsResponseType>({});
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fetching = useRef(false);
  const searchValue = useRef('');
  const searchRef = useRef<TextInput | null>(null);

  const derivedProducts = useMemo(() => {
    if (!data.products) {
      return [];
    }

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

  const onSearchSubmit = () =>
    fetchData({ search: searchValue.current }, 'refresh');

  const onChangeSearch = (text: string) => (searchValue.current = text);

  const onSearchClear = () => {
    onRefresh();
    searchRef.current?.setNativeProps({ text: '' });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <LoadingIndicator />;
  }

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
          <View style={styles.containerInput}>
            <Pressable
              onPress={onSearchSubmit}
              style={withOpacityStyle(styles.searchButton)}>
              <FeatherIcon name="search" color={Colors.LIGHT_ICON} size={20} />
            </Pressable>
            <TextInput
              ref={searchRef}
              style={styles.input}
              placeholder="Pesquisar..."
              placeholderTextColor={Colors.TEXT}
              onChangeText={onChangeSearch}
              onSubmitEditing={onSearchSubmit}
              returnKeyType="search"
            />
            <Pressable
              onPress={onSearchClear}
              style={withOpacityStyle(styles.clearButton)}>
              <FeatherIcon name="close" color={Colors.LIGHT_ICON} size={23} />
            </Pressable>
          </View>
          <Text style={styles.title}>
            {derivedProducts.length === 0
              ? 'Nenhum item encontrado'
              : 'Adicione itens ao carrinho'}
          </Text>
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

export default ProductsList;
